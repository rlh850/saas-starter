import { llmClient } from '../llm/client';
import { chatRepository } from '../repository/chat.repository';
import { toolExecutors } from '../llm/tools/tool.index';

export const chatService = {
   async sendMessage(message: string, id: string) {
      const response = await llmClient.generateText({
         prompt: message,
         previousResponseId: chatRepository.getLastResponseId(id),
      });
      chatRepository.setLastResponseId(id, response.id);
      return response;
   },

   async generateFunctionCall(message: string, id: string) {
      try {
         const response = await llmClient.functionCall({
            prompt: message,
            previousResponseId: chatRepository.getLastResponseId(id),
         });

         chatRepository.setLastResponseId(id, response.id);

         // Execute any tool calls that were generated
         const executedTools = [];
         if (response.toolCalls && response.toolCalls.length > 0) {
            for (const toolCall of response.toolCalls) {
               const executionResult = await this.executeTool(
                  toolCall.name,
                  toolCall.arguments as Record<string, unknown>,
                  toolCall.call_id
               );
               executedTools.push(executionResult);
            }
         }

         return {
            id: response.id,
            text: response.text,
            toolCalls: response.toolCalls,
            executedTools,
         };
      } catch (error) {
         console.error('Function call generation error:', error);
         throw error;
      }
   },

   async executeTool(
      toolName: string,
      arguments_: Record<string, unknown>,
      callId?: string
   ) {
      try {
         // Check if the tool exists in our executors
         const executor = toolExecutors[toolName as keyof typeof toolExecutors];

         if (!executor) {
            throw new Error(`Tool '${toolName}' not found`);
         }

         // Execute the tool with the provided arguments
         const result = await executor(arguments_ as any);

         return {
            success: true,
            toolName,
            callId,
            result,
            timestamp: new Date().toISOString(),
         };
      } catch (error) {
         console.error(`Error executing tool ${toolName}:`, error);
         return {
            success: false,
            toolName,
            callId,
            error:
               error instanceof Error
                  ? error.message
                  : 'Unknown error occurred',
            timestamp: new Date().toISOString(),
         };
      }
   },
};
