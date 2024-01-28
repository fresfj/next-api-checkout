import api from "@/app/utils/api"
import { db } from "@/app/utils/data/firebase-admin-config";

import {type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const data = await req.json()
  try { 
  console.log('try',data)
    // const response = await api.post('transfers', data)

    db.collection('indications').doc(data.indicationId).update({
      redeem: true,
      redeemAt: new Date()
    })

    db.collection('users').doc(data.userId).collection('transfers').add({      
        "event": "TRANSFER_CREATED",
        "transfer": {
            "object": "transfer",
            "id": "777eb7c8-b1a2-4356-8fd8-a1b0644b5282",
            "dateCreated": "2019-05-02",
            "status": "PENDING",
            "effectiveDate": null,
            "endToEndIdentifier": null,
            "type": "BANK_ACCOUNT",
            "value": 1000,
            "netValue": 1000,
            "transferFee": 0,
            "scheduleDate": "2019-05-02",
            "authorized": true,
            "failReason": null,
            "transactionReceiptUrl": null,
            "bankAccount": {
                "bank": {
                    "ispb": "00000000",
                    "code": "001",
                    "name": "Banco do Brasil"
                },
                "accountName": "Conta Banco do Brasil",
                "ownerName": "Marcelo Almeida",
                "cpfCnpj": "***.143.689-**",
                "agency": "1263",
                "agencyDigit": "1",
                "account": "26544",
                "accountDigit": "1",
                "pixAddressKey": null
            },
            "operationType": "TED",
            "description": null
          }});


     console.log('data', data)
    return NextResponse.json(data , {  status: 201 })
  } catch (err) {
    const error = err as any
    return NextResponse.json(error.response.data.errors[0].description, {
      status: error.response.status
    })
  }
}