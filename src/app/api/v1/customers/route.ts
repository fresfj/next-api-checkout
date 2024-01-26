import { NextResponse, type NextRequest } from 'next/server'
import api from '@/app/utils/api'
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  if (searchParams === null) {
    return NextResponse.json(`Preconditions`, { status: 422 })
  }

  try {
    const resp = await api.get('customers', { params: searchParams })
    const headerDate =
      resp.headers && resp.headers.date ? resp.headers.date : 'no response date'
    if (resp.data.data[0] !== undefined) {
      return NextResponse.json(resp.data.data[0], { status: 200 })
    } else {
      return NextResponse.json('not found', { status: 404 })
    }
  } catch (err) {
    const error = err as Error
    return NextResponse.json(error.message, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  try {
    const resp = await api.post('customers', data)
    const headerDate =
      resp.headers && resp.headers.date ? resp.headers.date : 'no response date'
    return NextResponse.json(resp.data, { status: 201 })
  } catch (err) {
    const error = err as Error
    return NextResponse.json(error.message, { status: 500 })
  }
}
