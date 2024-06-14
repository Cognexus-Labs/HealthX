import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getSummary = query({
    args: { _id: v.any() },
    handler: async (ctx, args) => {
        const summary = await ctx.db.query("summary")
        .filter((q) => q.eq(q.field("_id"), args._id))
        .collect();
        return summary;
        },
    });

export const getSummaries = query({
    args: {},
    handler: async (ctx) => {
        const summarys = await ctx.db.query("summary").collect();
        return summarys;
    },
    });

export const createSummary = mutation({
    args: { body: v.any() },
    handler: async (ctx, args) => {
        const { body } = args;
        const summaryId = await ctx.db.insert("summary", {
            body,
        });
        return summaryId;
    },
});

export const updateSummary = mutation({
    args: { id: v.id("summary"), body: v.string()},
    handler: async (ctx, args) => {
        const { id, body } = args;
        await ctx.db.patch(id, {
           body,
        })
    }
});

export const deleteSummary = mutation({
    args: { id: v.id("summary") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});


