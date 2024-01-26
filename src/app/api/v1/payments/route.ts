import axios from 'axios'
import { NextResponse , type NextRequest} from 'next/server'

export async function GET(req: NextRequest) {
  const data = await req.json()

  try {
    const resp = await axios.get(
      `https://asaas.com/api/v3/payments/${req._parsedUrl.query}`
    )
    const headerDate =
      resp.headers && resp.headers.date
        ? resp.headers.date
        : 'no response date'
    console.log(headerDate)
    return NextResponse.json(resp.data ,{status: 200})
  } catch (err) {
    console.error(err)
    return NextResponse.json(err ,{status: 401}) 
  }
}
export async function POST(req: NextRequest) {

  const data = await req.json()
    const sendCard = async (data: any) => {
      // try {
      //   const resp = await axios.post('https://asaas.com/api/v3/payments', data);
      //   const headerDate = resp.headers && resp.headers.date ? resp.headers.date : 'no response date';
      //   console.log(headerDate)
      //   res.status(200).json(resp.data);
      // } catch (err) {w
      //   //console.log(`error`,err);
      //   res.status(401).json(err);
      // }

      try {
        const resp = await axios.post('https://asaas.com/api/v3/payments', data)
        const headerDate =
          resp.headers && resp.headers.date
            ? resp.headers.date
            : 'no response date'
        //console.log(headerDate)
        if (data.billingType === 'BOLETO' && resp.data.id) {
          //barCode(resp.data.id)
        } else if (data.billingType === 'PIX' && resp.data.id) {
          //pixQrCode(resp.data.id)
        } else {
          return NextResponse.json(resp.data, { status: 200}) 
        }
      } catch (err) {
        const error = err as Error
        return NextResponse.json(error.message, { status: 401}) 
      }
    }

    const sendPayment = async (data : any) => {
      try {
        const resp = await axios.post('https://asaas.com/api/v3/payments', data)
        const headerDate =
          resp.headers && resp.headers.date
            ? resp.headers.date
            : 'no response date'
        //console.log(headerDate)
        //console.log(data.billingType, resp.data)
        //res.status(200).json(resp.data)
        if (data.billingType === 'BOLETO' && resp.data.id) {
          barCode(resp.data)
        }

        if (data.billingType === 'PIX' && resp.data.id) {
          pixQrCode(resp.data)
        }
      } catch (err) {
        const error = err as Error
        return NextResponse.json( error.message ,{ status: 401}) 
      }
    }

    const barCode = async (value: any) => {
      try {
        const resp = await axios.get(
          `https://asaas.com/api/v3/payments/${value.id}/identificationField`
        )
        const headerDate =
          resp.headers && resp.headers.date
            ? resp.headers.date
            : 'no response date'
        console.log(headerDate)
        console.log({ ...value, ...resp.data })
        return NextResponse.json({ ...value, ...resp.data } ,{status: 200} )
      } catch (err) {
        console.error(err)
        return NextResponse.json(err,{status: 401}) 
      }
    }

    const pixQrCode = async (value: any) => {
      try {
        const resp = await axios.get(
          `https://asaas.com/api/v3/payments/${value.id}/pixQrCode`
        )
        const headerDate =
          resp.headers && resp.headers.date
            ? resp.headers.date
            : 'no response date'

        //console.log({ ...value, ...resp.data })
        return NextResponse.json({ ...value, ...resp.data }, {status: 200})
      } catch (err) {
        //console.error(err)
        return NextResponse.json( err, {status: 401}) 
      }
    }

    if (data.billingType === 'CREDIT_CARD') {
      sendCard(data)
    } else if (
      data.billingType === 'PIX' ||
      data.billingType === 'BOLETO'
    ) {
      sendPayment(data)
    }
  }

