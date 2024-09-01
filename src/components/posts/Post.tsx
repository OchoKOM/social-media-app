"use client";

import { PostData } from "@/lib/types";
import Link from "next/link";
import UserAvatar from "../UserAvatar";
import Time from "../Time";
import { useSession } from "@/app/(main)/SessionProvider";
import PostMoreButton from "./PostMoreButton";
import Linkify from "../Linkify";
import UserTooltip from "../UserTooltip";
import { Media } from "@prisma/client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import LikeButton from "./LikeButton";
import BookmarkButton from "./BookmarkButton";
import { useState } from "react";
import { MessageSquareMore } from "lucide-react";
import Comments from "../comments/Comments";
import { Button } from "../ui/button";

interface PostProps {
  post: PostData;
}

export default function Post({ post }: PostProps) {
  const { user } = useSession();

  const [showComment, setShowComment] = useState(false);
  const [commentCount, setCommentCount] = useState(post._count.comments);

  const timestamp = post.createdAt.getTime();
  const now = Date.now();
  const diffInMs = now - timestamp;

  const relative = diffInMs < Math.abs(48 * 3600 * 1000);

  return (
    <article className="group/post flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <UserTooltip user={post.user}>
            <Link href={`/users/${post.user.username}`}>
              <UserAvatar avatarUrl={post.user.avatarUrl} />
            </Link>
          </UserTooltip>
          <div>
            <UserTooltip user={post.user}>
              <Link
                href={`/users/${post.user.username}`}
                className="block font-medium hover:underline"
              >
                {post.user.displayName}
              </Link>
            </UserTooltip>
            <Link
              href={`/posts/${post.id}`}
              className="block text-sm text-muted-foreground hover:underline"
              suppressHydrationWarning
            >
              <Time time={post.createdAt} relative={relative} />
            </Link>
          </div>
        </div>
        {post.user.id === user.id && (
          <PostMoreButton
            post={post}
            className="opacity-0 transition-opacity group-hover/post:opacity-100 max-sm:opacity-100"
          />
        )}
      </div>
      <Linkify>
        <div className="whitespace-pre-line break-words">
          <p>{post.content}</p>
        </div>
      </Linkify>
      {!!post.attachments.length && (
        <MediaPreviews attachments={post.attachments} />
      )}
      <hr className="text-muted-foreground" />
      <div className="flex justify-between gap-5">
      <div className="flex items-center gap-5">
          <LikeButton
            postId={post.id}
            initialState={{
              likes: post._count.likes,
              isLikedByUser: post.likes.some((like) => like.userId === user.id),
            }}
          />
          <CommentButton comments={commentCount} onClick={()=>setShowComment(!showComment)}/>
      </div>
        <BookmarkButton
          postId={post.id}
          initialState={{
            isBookmarkedByUser: post.bookmarks.some(
              (bookmark) => bookmark.userId === user.id,
            ),
          }}
        />
      </div>
      {showComment && (
        <>
        <Comments post={post} onCountChange={setCommentCount}/>
        <Button variant="link" onClick={()=>setShowComment(false)} className="mx-auto block">
            Masquer les commentaires
        </Button>
        </>
      )}
    </article>
  );
}

interface MediaPreviewsProps {
  attachments: Media[];
}

function MediaPreviews({ attachments }: MediaPreviewsProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        attachments.length > 1 && "sm:grid sm:grid-cols-2",
      )}
    >
      {attachments.map((m) => (
        <MediaPreview key={m.id} media={m} />
      ))}
    </div>
  );
}

interface MediaPreviewProps {
  media: Media;
}

function MediaPreview({ media }: MediaPreviewProps) {
  if (media.type === "IMAGE") {
    return (
      <Image
        src={media.url}
        alt="Attachment"
        width={500}
        height={500}
        className="mx-auto size-fit max-h-[30rem] rounded-2xl"
      />
    );
  }
  if (media.type === "VIDEO") {
    return (
      <div className="">
        <video
          src={media.url}
          controls
          className="mx-auto size-fit max-h-[30rem] rounded-2xl"
        />
      </div>
    );
  }
  return <p className="text-destructive">Format media non supporté</p>;
}

interface CommentButtonProps {
  onClick: () => void;
  comments: number;
}
function CommentButton({ comments, onClick }: CommentButtonProps) {
  return (
    <button
      title="Commentaires"
      onClick={onClick}
      className="flex items-center gap-2"
    >
      <MessageSquareMore />
      {!!comments && (
        <span className="text-sm font-medium tabular-nums">
          {comments}{" "}
          <span className="hidden sm:inline">
            commentaire{comments > 1 ? "s" : ""}
          </span>
        </span>
      )}
    </button>
  );
}
