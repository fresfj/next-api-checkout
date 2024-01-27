import api from '@/app/utils/api'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  if (!id) {
    return NextResponse.json(`Preconditions`, { status: 422 })
  }

  try {
    const resp = await api.get(`payments/${id}/status`)
    const headerDate =
      resp.headers && resp.headers.date ? resp.headers.date : 'no response date'
    return NextResponse.json(resp.data, { status: 200 })
  } catch (err) {
    const error = err as Error
    return NextResponse.json(error.message, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json()

  const barCode = async (value: any) => {
    try {
      const resp = await api.get(`payments/${value.id}/identificationField`)
      return { ...value, ...resp.data }
    } catch (err) {
      return false
    }
  }

  const pixQrCode = async (value: any) => {
    try {
      const resp = await api.get(`payments/${value.id}/pixQrCode`)
      return { ...value, ...resp.data }
    } catch (err) {
      return false
    }
  }

  try {
    const resp = await api.post('payments', data)
    const headerDate =
      resp.headers && resp.headers.date ? resp.headers.date : 'no response date'

    if (resp.data.billingType === 'PIX') {
      const qrcode = await pixQrCode(resp.data)
      if (qrcode) {
        return NextResponse.json(qrcode, { status: 201 })
      } else {
        return NextResponse.json('Condition not met', { status: 400 })
      }
    } else if (resp.data.billingType === 'BOLETO') {
      const code = await barCode(resp.data)
      if (code) {
        return NextResponse.json(code, { status: 201 })
      } else {
        return NextResponse.json('Condition not met', { status: 400 })
      }
    } else {
      return NextResponse.json(resp.data, { status: 201 })
    }
  } catch (err) {
    const error = err as any
    return NextResponse.json(error.response.data.errors[0].description, {
      status: error.response.status
    })
  }
}
