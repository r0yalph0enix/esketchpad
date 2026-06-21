import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { newId } = await req.json()

  if (!newId || !/^[a-zA-Z0-9-]{3,30}$/.test(newId)) {
    return NextResponse.json(
      { error: 'Invalid id. Use 3-30 letters, numbers, or dashes.' },
      { status: 400 }
    )
  }

  const existing = await prisma.board.findUnique({ where: { id: newId } })
  if (existing) {
    return NextResponse.json({ error: 'That link is already taken.' }, { status: 409 })
  }

  const board = await prisma.board.findUnique({ where: { id } })
  if (!board) {
    return NextResponse.json({ error: 'Original board not found.' }, { status: 404 })
  }

  await prisma.board.create({
    data: {
      id: newId,
      type: board.type,
      content: board.content,
    },
  })
  await prisma.board.delete({ where: { id } })

  return NextResponse.json({ id: newId })
}