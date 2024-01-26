import axios from 'axios'
import { NextResponse ,type NextRequest } from 'next/server'
 
export async function GET(req: NextRequest) { 
  const searchParams = req.nextUrl.searchParams
  const cpfCnpj = searchParams.get('cpfCnpj')
  const email = searchParams.get('email')

  const sendRequest = async () => {
    try {
      const resp = await axios.get(
        `https://asaas.com/api/v3/customers?email=${email}&cpfCnpj=${cpfCnpj}`
      )
      const headerDate =
        resp.headers && resp.headers.date
          ? resp.headers.date
          : 'no response date'
      console.log(headerDate)
      if (resp.data.data[0] !== undefined) {
        return NextResponse.json(resp.data.data[0], {status: 200}) 
      } else {
        return NextResponse.json('not found', { status: 404 }) 
      }
    } catch (err) {
      console.error(err)
      return NextResponse.json('', { status: 401})
    }
  }
  sendRequest()
}

export async function POST(req: NextRequest) { 
  
  const data = await req.json()

  const sendRequest = async (data: any ) => {
    try {
      const resp = await axios.post(
        'https://asaas.com/api/v3/customers',
        data
      )
      const headerDate =
        resp.headers && resp.headers.date
          ? resp.headers.date
          : 'no response date'
      console.log(headerDate)
      return NextResponse.json(resp.data, { status: 200})
    } catch (err) {
      console.error(err)
      return NextResponse.json(err, { status: 200 })
    }
  }
  sendRequest(data)
}

