/**
 * LLM Tools Index
 *
 * Central export point for all LLM tools and their implementations.
 */

import { exampleTool, executeExampleTool } from './example.tool';

// Export all tool definitions for LLM function calling
export const tools = [
  exampleTool,
  // Add more tools here as they are created
];

// Export tool execution functions
export const toolExecutors = {
  get_horoscope: executeExampleTool,
  // Add more tool executors here
};
