import { imageController, ImageRequestBody } from '@/app/controllers/image.controller';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body: ImageRequestBody = await req.json();
    const response = await imageController.generateImage(body);

    // Return appropriate HTTP status based on success/failure
    const status = (response as any).error ? 400 : 200;
    return NextResponse.json(response, { status });
  } catch (error) {
    console.error('Image generation route error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
