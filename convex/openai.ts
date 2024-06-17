// "use node";
// import { action } from "./_generated/server";
// import { v } from "convex/values";
// import { api } from "./_generated/api";

// export const chat = action({
//     args: { 
//         messageBody: v.string(),
//         userId: v.any(),
//      },
//      handler: async (ctx, args) => {
//       const response = await fetch("https://summarizeanything.azurewebsites.net/query", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           messages: [
//             { role: "human", content: args.messageBody }
//           ]
//         }),
//       });
  
//       const data = await response.json();

//         // Send the message to the chat
//         await ctx.runMutation(api.chats.send, { 
//             body: data.response || "Sorry, I don't have an answer for that.",
//             author: "HealthXAI",
//             userId: args.userId,
//         });
//       },
// })


"use node";
import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

export const chat = action({
  args: {
    messageBody: v.string(),
    userId: v.any(),
  },
  handler: async (ctx, args) => {
    // Fetch the chat history for the user
    const messages = await ctx.runQuery(api.chats.list, { userId: args.userId });

    // Format the chat history as per API requirements
    const formattedMessages = messages.map(message => ({
      role: message.author === "You" ? "human" : "ai",
      content: message.body,
    }));

    // Add the new user message to the history
    formattedMessages.push({ role: "human", content: args.messageBody });

    // Call the GPT-3.5 API
    const response = await fetch("https://summarizeanything.azurewebsites.net/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: formattedMessages,
      }),
    });

    const data = await response.json();

    // Save the AI's response
    await ctx.runMutation(api.chats.send, {
      body: data.response || "Sorry, I don't have an answer for that.",
      author: "HealthXAI",
      userId: args.userId,
    });
  },
});
