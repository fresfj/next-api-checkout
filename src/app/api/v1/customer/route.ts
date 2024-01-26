import { type NextRequest,  NextResponse } from "next/server"

export async function GET(req: NextRequest) { 
  // const searchParams = req.nextUrl.searchParams
  // const query = searchParams

  

  return NextResponse.json('teste' ,{ status: 200})
}
export async function POST(req: NextRequest) { 
  const searchParams = req.nextUrl.searchParams
  const query = searchParams

  

  return NextResponse.json('teste' ,{ status: 200})
}
