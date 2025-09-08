import {
  functionCallController,
  FunctionCallRequestBody,
} from '@/app/controllers/function-call.controller';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body: FunctionCallRequestBody = await req.json();
    const response = await functionCallController.generateFunctionCall(body);

    // Return appropriate HTTP status based on success/failure
    const status = (response as any).error ? 400 : 200;
    return NextResponse.json(response, { status });
  } catch (error) {
    console.error('Function call route error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
