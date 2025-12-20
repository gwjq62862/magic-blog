import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { authComponent } from "./auth";
import { paginationOptsValidator } from "convex/server";
import { Doc } from "./_generated/dataModel";
export const generateCoverUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) throw new Error("Unauthorized");
    return await ctx.storage.generateUploadUrl();
  },
});


export const createBlogPost = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    coverImageStorageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const userMetadata = await authComponent.safeGetAuthUser(ctx);
    if (!userMetadata) {
      throw new Error("Unauthorized");
    }
    const userId = userMetadata._id;
    if (!userId) {

      throw new Error("Authenticated user has no userId");
    }

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_authUserId", q => q.eq("authUserId", userId))
      .unique();

    if (!profile) {
      throw new Error("No profile found for user");
    }

    if (profile.role !== "admin") {

      throw new Error("You do not have permission to create posts");
    }
    const searchText =
      (args.title + " " + args.description).toLowerCase();
    const postId = await ctx.db.insert("blogs", {
      title: args.title,
      searchText,
      description: args.description,
      coverImageStorageId: args.coverImageStorageId,
      authorId: userId,
      createdAt: Date.now(),
    });

    return postId;
  },
});



export const listPaginated = query({
  args: {
    paginationOpts: paginationOptsValidator,
    search: v.optional(v.string()),
  },
  handler: async (ctx, { paginationOpts, search }) => {
    const trimmed = search?.trim();
    let page;

    if (trimmed && trimmed.length > 0) {
      page = await ctx.db
        .query("blogs")
        .withSearchIndex("search_text", (q) =>
          q.search("searchText", trimmed.toLowerCase()),
        )

        .paginate(paginationOpts);
    } else {
      page = await ctx.db
        .query("blogs")
        .order("desc")
        .paginate(paginationOpts);
    }


    const enrichedPage = await Promise.all(
      page.page.map(async (blog: Doc<"blogs">) => ({
        ...blog,
        imageUrl: blog.coverImageStorageId
          ? await ctx.storage.getUrl(blog.coverImageStorageId)
          : null,
      })),
    );
    return {
      ...page,
      page: enrichedPage,
    };
  },
})



export const getById = query({
  args: { id: v.id("blogs") },
  async handler(ctx, { id }) {
    const blog = await ctx.db.get(id);
    if (!blog) return null;

    const imageUrl = blog.coverImageStorageId
      ? await ctx.storage.getUrl(blog.coverImageStorageId)
      : null;
    const profile = await ctx.db.query("profiles").withIndex("by_authUserId", q => q.eq("authUserId", blog.authorId)).unique();
    return {
      ...blog,
      imageUrl,
      author: profile
        ? { name: profile.name, role: profile.role, profileImage: profile.profileImage }
        : null,
    };
  },
});


export const deleteBlogPost = mutation({
  args: { id: v.id("blogs") },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) throw new Error("Unauthorized");

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_authUserId", q => q.eq("authUserId", user._id))
      .unique();

    if (!profile || profile.role !== "admin") {
      throw new Error("You do not have permission to delete posts");
    }

    const blog = await ctx.db.get(args.id);
    if (!blog) return;


    const comments = await ctx.db
      .query("comments")
      .withIndex("by_blogId", q => q.eq("blogId", args.id))
      .collect();

    for (const comment of comments) {

      const likes = await ctx.db
        .query("commentLikes")
        .withIndex("by_commentdId_and_profileId", q =>
          q.eq("commentId", comment._id)
        )
        .collect();

      for (const like of likes) {
        await ctx.db.delete(like._id);
      }


      await ctx.db.delete(comment._id);
    }


    if (blog.coverImageStorageId) {
      await ctx.storage.delete(blog.coverImageStorageId);
    }


    await ctx.db.delete(args.id);
  },
});


export const updateBlogPost = mutation({
  args: {
    id: v.id("blogs"),
    title: v.string(),
    description: v.string(),
    coverImageStorageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const userMetadata = await authComponent.safeGetAuthUser(ctx);
    if (!userMetadata) throw new Error("Unauthorized");

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_authUserId", q => q.eq("authUserId", userMetadata._id))
      .unique();

    if (!profile || profile.role !== "admin") {
      throw new Error("You do not have permission to update posts");
    }

    const blog = await ctx.db.get(args.id);
    if (!blog) throw new Error("Post not found");

    const searchText = (args.title + " " + args.description).toLowerCase();

    await ctx.db.patch(args.id, {
      title: args.title,
      description: args.description,
      coverImageStorageId: args.coverImageStorageId ?? blog.coverImageStorageId,
      searchText,
    });
  },
});
