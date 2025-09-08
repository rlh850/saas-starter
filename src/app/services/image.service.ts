import { llmClient } from '../llm/client';

export const imageService = {
  async generateImage(prompt: string, id?: string) {
    const response = await llmClient.generateImage({
      prompt,
      previousImageId: id,
    });
    return response;
  },
};
