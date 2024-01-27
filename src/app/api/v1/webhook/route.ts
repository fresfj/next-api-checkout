
import {type NextRequest, NextResponse } from "next/server"
import { db } from "@/app/utils/data/firebase-admin-config"

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (data.event === "PAYMENT_RECEIVED" && data.payment?.billingType === 'PIX') {     
      const indicationsQuery = await db.collection('indications').where('payment.id', '==', data.payment.id).get();
      
      indicationsQuery.docs.map(async (indicationDoc) => {
        await db.collection('indications').doc(indicationDoc.id).update({
          payment: data.payment,
          status: true
        })
      });
    }

    return NextResponse.json('Efetuado com sucesso', { status: 200 })
  } catch (err) {
    const error = err as Error
    return NextResponse.json(error.message, { status: 500 })
  }
}