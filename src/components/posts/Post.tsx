import { PostData } from "@/lib/types";
import Link from "next/link";
import UserAvatar from "../UserAvatar";
import Time from "../Time";


interface PostProps {
    post: PostData;
}

export default function Post({ post }: PostProps) {

    const timestamp = post.createdAt.getTime();
    const now = Date.now();
    const diffInMs = now - timestamp;

    const relative = (diffInMs < Math.abs(48 * 3600 * 1000))

    return <article className="flex flex-col p-5 rounded-2xl bg-card shadow-sm gap-5">
        <div className="flex flex-wrap gap-3">
            <Link href={`/users/${post.user.username}`}>
                <UserAvatar avatarUrl={post.user.avatarUrl} />
            </Link>
            <div>
                <Link href={`/users/${post.user.username}`} className="block font-medium hover:underline">
                    {post.user.displayName}
                </Link>
                <Link href={`/posts/${post.id}`} className="block text-sm text-muted-foreground hover:underline">
                    <Time time={post.createdAt} relative={relative} />
                </Link>
            </div>
        </div>
        <div className="whitespace-pre-line break-words">
            <p>{post.content}</p>
        </div>
    </article>
};
