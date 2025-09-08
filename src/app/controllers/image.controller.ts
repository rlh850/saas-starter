import z from 'zod';
import { imageService } from '../services/image.service';
import fs from "fs";

const generateImageSchema = z.object({
  prompt: z.string().min(1, 'Prompt cannot be empty').max(1000, 'Prompt too long'),
  id: z.string().optional(),
});

export interface ImageRequestBody {
  id?: string;
  prompt: string;
}

export const imageController = {
  async generateImage(body: ImageRequestBody) {
    try {
      const validatedData = generateImageSchema.safeParse(body);

      if (!validatedData.success) {
        return {
          error: 'Validation failed',
          details: validatedData.error.errors.map((err: any) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        };
      }

      const response = await imageService.generateImage(
        validatedData.data.prompt,
        validatedData.data.id
      );
      /* We will use this to return the image to the user
      const image_bytes = Buffer.from(response.b64_image, "base64");
      fs.writeFileSync("image.png",image_bytes)
      */
      return response;
    } catch (error) {
      console.error('Image generation error:', error);
      return { error: 'Failed to generate image.' };
    }
  },
};
