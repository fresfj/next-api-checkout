import api from '@/app/utils/api'
import { db } from '@/app/utils/data/firebase-admin-config'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  return NextResponse.json('method unavailable', { status: 200 })
}

export async function POST(req: NextRequest) {
  try {
    const {
      bankAccount,
      description,
      operationType,
      pixAddressKey,
      pixAddressKeyType,
      scheduleDate,
      value,
      indicationId,
      userId
    } = await req.json()

    const dataSend = {
      description,
      operationType,
      scheduleDate,
      value,
      ...(operationType === 'PIX'
        ? { pixAddressKey, pixAddressKeyType }
        : { bankAccount })
    }

    const response = await api.post('transfers', dataSend)

    const transfer = await db
      .collection('users')
      .doc(userId)
      .collection('transfers')
      .add(response.data)

    await db.collection('indications').doc(indicationId).update({
      tid: response.data.id,
      redeemId: transfer.id,
      redeem: true,
      redeemAt: new Date()
    })

    return NextResponse.json('Tranferência pedida com sucesso', { status: 201 })
  } catch (err) {
    const error = err as any

    if (error.response.data.errors) {
      return NextResponse.json(error.response.data.errors[0].description, {
        status: error.response.status
      })
    }

    return NextResponse.json(error.message || 'Erro durante a transferência.', {
      status: error.status || 500
    })
  }
}
