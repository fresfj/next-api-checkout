import api from "@/app/utils/api"
import { db } from "@/app/utils/data/firebase-admin-config"
import {type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const data = await req.json()
  try { 

    const response = await api.post('transfers', data)
     
    return NextResponse.json(response.data , {  status: 201 })
  } catch (err) {
    const error = err as any
    return NextResponse.json(error.response.data.errors[0].description, {
      status: error.response.status
    })
  }
}