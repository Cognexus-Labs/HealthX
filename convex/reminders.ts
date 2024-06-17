import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getReminder = query({
    args: { _id: v.any() },
    handler: async (ctx, args) => {
        const reminder = await ctx.db.query("reminder")
        .filter((q) => q.eq(q.field("_id"), args._id))
        .collect();
        return reminder;
        },
    });

export const getReminders = query({
    args: {},
    handler: async (ctx) => {
        const reminders = await ctx.db.query("reminder").collect();
        return reminders;
    },
    });

export const createReminder = mutation({
    args: { body: v.any(), title: v.string(), date: v.string(), time: v.string(), frequency: v.string()},
    handler: async (ctx, args) => {
        const { body, title, date, time, frequency } = args;
        const reminderId = await ctx.db.insert("reminder", {
            body,
            title,
            date,
            time,
            frequency,
        });
        return reminderId;
    },
});

export const updateReminder = mutation({
    args: { id: v.id("reminder"), body: v.string(), title: v.string(), date: v.string(), time: v.string(), frequency: v.string()},
    handler: async (ctx, args) => {
        const { id, body, title, date, time, frequency } = args;
        await ctx.db.patch(id, {
            body,
            title,
            date,
            time,
            frequency,
        })
    }
});

export const deleteReminder = mutation({
    args: { id: v.id("reminder") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});


