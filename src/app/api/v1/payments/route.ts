import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const data = await req.json()
  return NextResponse.json('Validando...', { status: 200 })
}
