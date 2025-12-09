import { useState } from "react";
import PostActions from "./PostActions";
import Input from "./Form/Input";
import { formatTimestamp } from "../utils/formatTimestamp";

export interface CommentProps {
  id: string;
  name: string;
  text: string;
  likes: number;
  dislikes: number;
  replies?: CommentProps[];
  profile_picture: string;
  timestamp?: string;
  disabled?: boolean;
}

const Comment: React.FC<CommentProps> = ({
  id,
  name,
  text,
  likes,
  dislikes,
  replies,
  profile_picture,
  timestamp,
  disabled = false,
}) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReplyClick = () => {
    if (!disabled) {
      setShowReplyInput(!showReplyInput);
    }
  };

  const handleReplySubmit = () => {
    if (replyText.trim()) {
      // Here you would typically handle the reply submission
      console.log("Reply submitted:", replyText);
      setReplyText("");
      setShowReplyInput(false);
    }
  };

  return (
    <div className="relative">
      {/* Vertical line from parent comment to replies */}
      {replies && replies.length > 0 && (
        <div className="absolute left-4 top-10 bottom-0 w-px bg-[#E9E9E9]" />
      )}
      <div className="w-full flex gap-3 mb-5">
        <div className="w-8 h-8 rounded-full bg-grey-1 overflow-hidden relative">
          <img
            src={profile_picture}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-2 justify-between">
            <p className="text-xs md:text-sm font-semibold text-black-default">
              {name}
            </p>
            <p className="text-xs text-[#999999] font-normal">
              {formatTimestamp(timestamp)}
            </p>
          </div>
          <p className="text-xs text-grey-normal font-normal">{text}</p>
          <PostActions
            sm
            likes={likes}
            dislikes={dislikes}
            replyText
            onReplyClick={handleReplyClick}
            disabled={disabled}
          />
        </div>
      </div>
      {replies && replies.length > 0 && (
        <div className="ml-11 relative">
          <div className="space-y-4">
            {replies.map((reply, index) => (
              <div key={reply.id}>
                <Comment {...reply} disabled={disabled} />
                {index !== replies.length - 1 && (
                  <div className="h-[1px] bg-[#E9E9E9] w-full my-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reply Input Field */}
      {showReplyInput && !disabled && (
        <div className="ml-11 mt-4">
          <Input
            id="reply-input"
            placeholder="Type here..."
            value={replyText}
            onChange={setReplyText}
            className="mb-3"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleReplySubmit}
              className="px-4 py-2 bg-[#998100] text-white rounded-md text-sm font-medium hover:bg-[#7a6600] transition-colors"
            >
              Reply
            </button>
            <button
              type="button"
              onClick={() => setShowReplyInput(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
