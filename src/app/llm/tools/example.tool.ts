export const exampleTool = {
   type: 'function',
   name: 'get_horoscope',
   description: "Get today's horoscope for an astrological sign.",
   strict: true,
   parameters: {
      type: 'object',
      properties: {
         sign: {
            type: 'string',
            description: 'An astrological sign like Taurus or Aquarius',
         },
      },
      required: ['sign'],
      additionalProperties: false,
   },
};

export const executeExampleTool = (args: { sign: string }) => {
   console.log(
      `Random Horoscope for ${args.sign}: Today is a great day for new beginnings!`
   );
   return `Your horoscope for ${args.sign}: Today brings opportunities for growth and positive changes.`;
};
