import OpenAI from 'openai';
import { config } from 'dotenv';
import path from 'path';
import { systemPrompt } from './prompts/systemInstructions';
import { GenerateFunctionOptions, GenerateFunctionResult, toolCall } from '../types/chat.types';
import { tools } from './tools/tool.index';

config.dotenv();

// Define proper types for OpenAI response structure
interface OpenAIResponse {
  id: string;
  output?: unknown;
  output_text?: string;
}

interface FunctionCallItem {
  type: 'function_call';
  name: string;
  call_id?: string;
  arguments: string | object;
}

// Debug environment variable loading
// console.log('Environment check:', process.env.OPENAI_API_KEY);
// console.log('OPENAI_API_KEY exists:', !!process.env.OPENAI_API_KEY);
// console.log('OPENAI_API_KEY length:', process.env.OPENAI_API_KEY?.length);
// console.log(
//    'OPENAI_API_KEY starts with sk-:',
//    process.env.OPENAI_API_KEY?.startsWith('sk-')
// );

const openAIClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type GenerateTextOptions = {
  model?: string;
  prompt: string;
  instructions?: string;
  maxTokens?: number;
  previousResponseId?: string;
};

export type GenerateTextResult = {
  id: string;
  text: string;
};

export const llmClient = {
  async generateText({
    model = process.env.MODEL,
    prompt,
    instructions = systemPrompt,
    maxTokens = 12000,
    previousResponseId,
  }: GenerateTextOptions): Promise<GenerateTextResult> {
    const response = await openAIClient.responses.create({
      model,
      input: prompt,
      instructions,
      max_output_tokens: maxTokens,
      reasoning: { effort: 'medium' },
      previous_response_id: previousResponseId,
    });

    return {
      id: response.id,
      text: response.output_text,
    };
  },
  async functionCall({
    model = process.env.MODEL,
    prompt,
    previousResponseId,
  }: GenerateFunctionOptions): Promise<GenerateFunctionResult> {
    const response = await openAIClient.responses.create({
      model,
      input: prompt,
      tools: tools,
      reasoning: { effort: 'medium' },
      previous_response_id: previousResponseId,
    });

    const openAIResponse = response as OpenAIResponse;
    // Attempt to access output object, else return undefined
    const output = openAIResponse?.output;
    const toolCalls: toolCall[] = [];

    if (Array.isArray(output)) {
      for (const item of output) {
        if (
          item &&
          typeof item === 'object' &&
          (item as FunctionCallItem).type === 'function_call'
        ) {
          const functionCallItem = item as FunctionCallItem;
          const { name, call_id, arguments: rawArgs } = functionCallItem;

          let parsedArgs: unknown = rawArgs;
          if (typeof rawArgs === 'string') {
            try {
              parsedArgs = JSON.parse(rawArgs);
            } catch {
              // Keep as string if JSON parsing fails
              parsedArgs = rawArgs;
            }
          }

          if (name) {
            toolCalls.push({
              name,
              arguments: parsedArgs,
              call_id,
            });
          }
        }
      }
    }

    return {
      id: response.id,
      text: openAIResponse?.output_text,
      toolCalls,
    };
  },
};
