import OpenAI from 'openai';
import dotenv from 'dotenv';
import { systemPrompt } from './prompts/systemInstructions';
import {
  GenerateFunctionOptions,
  GenerateFunctionResult,
  toolCall,
  OpenAIResponse,
  GenerateTextOptions,
  GenerateTextResult,
  FunctionCallItem,
  GenerateImageResult,
  GenerateImageOptions,
} from '../types/chat.types';
import { tools } from './tools/tool.index';

dotenv.config();

const openAIClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const llmClient = {
  async generateText({
    model = process.env.TEXT_MODEL,
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
    model = process.env.TEXT_MODEL,
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
  async generateImage({
    model = process.env.IMAGE_MODEL,
    prompt,
    previousImageId,
  }: GenerateImageOptions): Promise<GenerateImageResult> {
    const response = await openAIClient.images.generate({
      model,
      prompt,
    });

    const b64_json = response.data?.[0]?.b64_json;

    if (!b64_json) {
      throw new Error('No image data received from provider');
    }

    return {
      b64_image: b64_json,
    };
  },
};
