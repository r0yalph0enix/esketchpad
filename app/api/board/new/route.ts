import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateId } from '@/lib/id'

export async function POST(req: NextRequest) {
  const { type } = await req.json()

  if (type !== 'draw' && type !== 'notes') {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
  }

  const id = generateId()

  await prisma.board.create({
    data: { id, type, content: type === 'draw' ? '[]' : '' },
  })

  return NextResponse.json({ id })
}