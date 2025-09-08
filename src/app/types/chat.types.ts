import OpenAI from 'openai';

export interface OpenAIResponse {
  id: string;
  output?: unknown;
  output_text?: string;
}

export interface FunctionCallItem {
  type: 'function_call';
  name: string;
  call_id?: string;
  arguments: string | object;
}

export type GenerateTextOptions = {
  model?: string;
  prompt: string;
  instructions?: string;
  maxTokens?: number;
  previousResponseId?: string;
};

export type GenerateFunctionOptions = {
  model?: string;
  prompt: string;
  tools?: OpenAI.Responses.FunctionTool[];
  instructions?: string;
  maxTokens?: number;
  previousResponseId?: string;
};

export type GenerateImageOptions = {
  model?: string;
  prompt: string;
  instructions?: string;
  previousImageId?: string;
};

export type GenerateFunctionResult = {
  id: string;
  text?: string;
  toolCalls?: Array<{
    name: string;
    arguments: unknown;
    call_id?: string;
  }>;
};

export type GenerateTextResult = {
  id: string;
  text: string;
};

export type GenerateImageResult = {
  b64_image: string | null;
};

export type toolCall = {
  name: string;
  arguments: unknown;
  call_id?: string;
};

export interface ImageRequestBody {
  id?: string;
  prompt: string;
}
