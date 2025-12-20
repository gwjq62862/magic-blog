import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { authComponent } from "./auth";


export const ensureUserProfile = mutation({
  args: {
    authUserId: v.string(),
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

export const updateUserRole = mutation({
  args: {
    profileId: v.id("profiles"),
    role: v.union(v.literal("user"), v.literal("admin")),
  },
  handler: async (ctx, { profileId, role }) => {
    const authUser = await authComponent.safeGetAuthUser(ctx);
    if (!authUser) {
      throw new Error("Unauthorized");
    }

    const actingProfile = await ctx.db
      .query("profiles")
      .withIndex("by_authUserId", q => q.eq("authUserId", authUser._id))
      .unique();

    if (!actingProfile || actingProfile.role !== "admin") {
      throw new Error("You do not have permission to change roles");
    }

    const existing = await ctx.db.get(profileId);
    if (!existing) {
      throw new Error("Profile not found");
    }

    await ctx.db.patch(profileId, { role });
  },
});


export const listProfiles = query({
  args: {},
  handler: async (ctx) => {
    const authUser = await authComponent.safeGetAuthUser(ctx);
    if (!authUser) return [];

    const actingProfile = await ctx.db
      .query("profiles")
      .withIndex("by_authUserId", q => q.eq("authUserId", authUser._id))
      .unique();

    if (!actingProfile || actingProfile.role !== "admin") {
      return [];
    }

    return await ctx.db.query("profiles").order("desc").collect();
  },
});


export const getCurrentUserWithProfile = query({
  args: {},
  handler: async (ctx) => {
    const authUser = await authComponent.safeGetAuthUser(ctx);
    if (!authUser) return null;

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_authUserId", q => q.eq("authUserId", authUser._id))
      .unique();

    return { user: authUser, profile };
  },
});