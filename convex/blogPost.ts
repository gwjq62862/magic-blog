// convex/blogs.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { authComponent } from "./auth";
import { paginationOptsValidator } from "convex/server";
import { Doc } from "./_generated/dataModel";


// 1) Generate upload URL
export const generateCoverUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    // check auth here only logged-in users to upload
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

    // 2) Check role 
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
      //  search-index-based query, then .paginate(...)
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

    // storing image in storage:
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