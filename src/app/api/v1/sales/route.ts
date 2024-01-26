import axios from 'axios'
import { NextResponse , type NextRequest} from 'next/server'

export async function GET(req: NextRequest) {
  const sendRequest = async (data : any) => {
    try {
      const resp = await axios.post(
        'https://apicieloecommerce.cielo.com.br/1/sales',
        data
      )
      const headerDate =
        resp.headers && resp.headers.date
          ? resp.headers.date
          : 'no response date'
      console.log(headerDate)
      return NextResponse.json(resp.data ,{ status: 200}) 
    } catch (err) {
      console.error(err)
      return NextResponse.json(err ,{ status: 401})
    }
  }
  sendRequest(req.body)
}
 