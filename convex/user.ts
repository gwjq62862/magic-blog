// convex/users.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";


export const ensureUserProfile = mutation({
  args: {
    authUserId: v.string(), // matches schema
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("profiles")
      .withIndex("by_authUserId", q => q.eq("authUserId", args.authUserId))
      .unique();

    if (existing) return existing;

    const now = Date.now();
    const profileId = await ctx.db.insert("profiles", {
      authUserId: args.authUserId,
      name: args.name,
      role: "user",
      profileImage: `https://avatar.iran.liara.run/username?username=${args.name}`,
      createdAt: now,
    });

    return await ctx.db.get(profileId);
  },
});


export const getUserProfile = query({
  args: {
    authUserId: v.string(),
  }, handler: async (ctx, args) => {
    const userData = await ctx.db.query("profiles").withIndex("by_authUserId", q => q.eq("authUserId", args.authUserId)).unique();
    return userData;
  }
})