import {
   chatController,
   FunctionCallRequestBody,
} from '@/app/controllers/chat.controller';
import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/generate/function-call
 *
 * Generates function calls using the LLM and executes them automatically.
 * This endpoint takes a message and uses the LLM to determine what tools to call,
 * then executes those tools and returns the results.
 *
 * Request body:
 * {
 *   message: string,        // User message that may require tool execution
 *   id: string            // Chat session ID (UUID)
 * }
 *
 * Response:
 * {
 *   id: string,           // LLM response ID
 *   text?: string,         // LLM text response
 *   toolCalls?: Array<{    // Generated tool calls
 *     name: string,
 *     arguments: any,
 *     call_id?: string
 *   }>,
 *   executedTools?: Array<{ // Results of executed tools
 *     success: boolean,
 *     toolName: string,
 *     callId?: string,
 *     result?: any,
 *     error?: string,
 *     timestamp: string
 *   }>
 * }
 */
export async function POST(req: NextRequest) {
   try {
      const body: FunctionCallRequestBody = await req.json();
      const response = await chatController.generateFunctionCall(body);

      // Return appropriate HTTP status based on success/failure
      const status = (response as any).error ? 400 : 200;
      return NextResponse.json(response, { status });
   } catch (error) {
      console.error('Function call route error:', error);
      return NextResponse.json(
         { error: 'Internal server error' },
         { status: 500 }
      );
   }
}
