import { NextResponse, type NextRequest } from 'next/server'
import api from '@/app/utils/api'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const id = searchParams.has('id')

  if (!id) {
    return NextResponse.json(`Preconditions`, { status: 422 })
  }
  try {
    const resp = await api.get('accounts', { params: searchParams })
    const headerDate =
      resp.headers && resp.headers.date ? resp.headers.date : 'no response date'
    if (resp.data !== undefined) {
      return NextResponse.json(resp.data, { status: 200 })
    } else {
      return NextResponse.json('not found', { status: 404 })
    }
  } catch (err) {
    const error = err as any
    return NextResponse.json(error.response.data.errors[0].description, {
      status: error.response.status
    })
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json()

  try {
    const resp = await api.post('accounts', data)
    const headerDate =
      resp.headers && resp.headers.date ? resp.headers.date : 'no response date'

    return NextResponse.json(resp.data, { status: 201 })
  } catch (err) {
    const error = err as any
    return NextResponse.json(error.response.data.errors[0].description, {
      status: error.response.status
    })
  }
}
