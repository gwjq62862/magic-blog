// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  blogs: defineTable({
    title: v.string(),
    description: v.string(),
    // combined lowercased text for search
    searchText: v.string(),
    coverImageStorageId: v.optional(v.id("_storage")),
    authorId: v.string(), // Better Auth user _id as string
    createdAt: v.number(),
  }).searchIndex("search_text", {
    searchField: "searchText",

  }),

  comments: defineTable({
    blogId: v.id("blogs"),
    authorId: v.id("profiles"),
    text: v.string(),
    createdAt: v.number(),
    likesCount: v.number(), // default 0 in  mutation

    parentCommentId: v.optional(v.id("comments")),

  }).index("by_blogId", {
    fields: ["blogId"],
  }),

  commentLikes: defineTable({
    commentId: v.id("comments"),
    profileId: v.id("profiles"),
    createdAt: v.number(),
  }).index("by_commentdId_and_profileId", {
    fields: ["commentId", "profileId"],
  }),


  profiles: defineTable({
    authUserId: v.string(),
    name: v.string(),
    profileImage: v.string(),
    role: v.string(),          // "user", "admin", etc.
    createdAt: v.float64(),
  }).index("by_authUserId", {
    fields: ["authUserId"],
  }),
});


