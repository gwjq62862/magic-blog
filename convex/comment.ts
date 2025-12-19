import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./auth";
import { paginationOptsValidator } from "convex/server";

export const createComment = mutation({
    args: {
        blogId: v.id("blogs"),
       
        text: v.string(),
        parentCommentId: v.optional(v.id("comments")),
    },
    handler: async (ctx, args) => {
        const user = await authComponent.safeGetAuthUser(ctx);
        if (!user) throw new Error("Unauthorized");
        const profile = await ctx.db.query("profiles").withIndex("by_authUserId", q => q.eq("authUserId", user._id)).unique();
        if (!profile) throw new Error("No profile found for user");
        const comment = await ctx.db.insert("comments", {
            blogId: args.blogId,
            authorId: profile._id,
            text: args.text,
            createdAt: Date.now(),
            likesCount: 0,
            parentCommentId: args.parentCommentId ?? undefined,
        })
        return comment
    }
})

export const getCommentByPostId = query({
    args: {
        blogId: v.id("blogs"),
        paginationOpts: paginationOptsValidator,
    },
    handler: async (ctx, args) => {
        const results = await ctx.db
            .query("comments")
            .withIndex("by_blogId", q => q.eq("blogId", args.blogId))
            .order("desc")
            .paginate(args.paginationOpts);

        return results;
    }
})

export const likeComment = mutation({
  args: {
    commentId: v.id("comments"),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) throw new Error("Unauthorized");

    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_authUserId", q => q.eq("authUserId", user._id))
      .unique();
    if (!profile) throw new Error("No profile found for user");

    const comment = await ctx.db.get(args.commentId);
    if (!comment) throw new Error("Comment does not exist");

    const existingLike = await ctx.db
      .query("commentLikes")
      .withIndex("by_commentdId_and_profileId", q =>
        q.eq("commentId", args.commentId).eq("profileId", profile._id),
      )
      .unique();

    if (existingLike) {
      // Unlike
      await ctx.db.delete(existingLike._id);
      await ctx.db.patch(args.commentId, {
        likesCount: Math.max((comment.likesCount ?? 0) - 1, 0),
      });
      return { liked: false };
    }

    // Like
    await ctx.db.insert("commentLikes", {
      commentId: args.commentId,
      profileId: profile._id,
      createdAt: Date.now(),
    });

    await ctx.db.patch(args.commentId, {
      likesCount: (comment.likesCount ?? 0) + 1,
    });

    return { liked: true };
  },
});





