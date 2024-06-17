import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

export const list = query({
  args: { userId: v.any() },
  handler: async (ctx, args) => {
    const messages = await ctx.db.query("chats")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .order("desc").take(100);
    return messages.reverse();
  },
});

export const send = mutation({
  args: { body: v.string(), author: v.string(), userId: v.any() },
  handler: async (ctx, args) => {
    const { body, author, userId } = args;
//  Schedule the chat action to run immediately
  if ( author !== "HealthXAI") {
    await ctx.scheduler.runAfter(0, api.openai.chat, {
    messageBody: body,
    userId: userId,
    });
    }    
   
    await ctx.db.insert("chats", { body, author, userId });

  },
});


// function to delete all the chats of a user
export const deleteAll = mutation({
  args: { userId: v.any() },
  handler: async (ctx, args) => {
    const chatsToDelete = await ctx.db.query("chats")
      .filter((q) => q.eq(q.field("userId"), args.userId)).collect();
    for (const chat of chatsToDelete) {
      await ctx.db.delete(chat._id);
    }
  },
});
