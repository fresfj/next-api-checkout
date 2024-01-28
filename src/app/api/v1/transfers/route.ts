import api from "@/app/utils/api"
import { db } from "@/app/utils/data/firebase-admin-config";

import {type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const data = await req.json()
  try { 
   
      await api.post('transfers', data)
        .then(async response => {         
           
          await db.collection('users').doc(data.userId).collection('transfers').add(response.data());

        })
        .catch((err) => {
          const error = err as any
          return NextResponse.json(error.response.data.errors[0].description, {
            status: error.response.status
          })
        })
        
        await db.collection('indications').doc(data.indicationId).update({
          redeem: true,
          redeemAt: new Date()
        })
  
 

    return NextResponse.json('Tranferência pedida com sucesso' , {  status: 201 })
  } catch (err) {
    const error = err as any
    return NextResponse.json(error.message, {status: 500})
  }
}