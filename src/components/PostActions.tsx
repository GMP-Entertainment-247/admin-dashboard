import { ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
import clsx from "clsx";

interface PostActionsProps {
  likes: number;
  dislikes: number;
  comments?: number;
  replyText?: boolean;
  sm?: boolean;
  onReplyClick?: () => void;
  disabled?: boolean;
}

const PostActions: React.FC<PostActionsProps> = ({
  likes,
  dislikes,
  comments,
  replyText,
  sm,
  onReplyClick,
  disabled = false,
}) => {
  return (
    <div className={clsx("flex items-center", sm ? "gap-3" : "gap-6")}>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          title="like"
          disabled={disabled}
          className={clsx(disabled && "cursor-not-allowed opacity-50")}
        >
          <ThumbsUp className={clsx(sm ? "w-5 h-5" : "w-6 h-6")} />
        </button>
        <p className={clsx(sm ? "text-sm" : "text-lg")}>{likes}</p>
      </div>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          title="dislike"
          disabled={disabled}
          className={clsx(disabled && "cursor-not-allowed opacity-50")}
        >
          <ThumbsDown className={clsx(sm ? "w-5 h-5" : "w-6 h-6")} />
        </button>
        <p className={clsx(sm ? "text-sm" : "text-lg")}>{dislikes}</p>
      </div>
      {comments !== undefined && comments !== null && (
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            title="comments"
            disabled={disabled}
            className={clsx(disabled && "cursor-not-allowed opacity-50")}
          >
            <MessageCircle className={clsx(sm ? "w-5 h-5" : "w-6 h-6")} />
          </button>
          <p className={clsx(sm ? "text-sm" : "text-lg")}>{comments}</p>
        </div>
      )}
      {replyText && (
        <button
          type="button"
          onClick={onReplyClick}
          disabled={disabled}
          className={clsx(
            sm ? "text-sm" : "text-lg",
            "text-[#998100] font-medium",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          Reply
        </button>
      )}
    </div>
  );
};

export default PostActions;
