import { chatController, RequestBody } from '@/app/controllers/chat.controller';
import { NextRequest, NextResponse } from 'next/server';

// const chatId = useRef(crypto.randomUUID());
// Use this in a client react component to generate a UUID ChatId and then pass.

export async function POST(req: NextRequest) {
   const body: RequestBody = await req.json();
   const response = await chatController.sendMessage(body);
   return NextResponse.json(response);
}
