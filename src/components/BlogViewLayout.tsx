import image from "../images/rap-battle.jpg";
import PostActions from "./PostActions";
import Comment from "./Comment";
import { type CommentProps } from "./Comment";

interface BlogViewLayoutProps {
  title: string;
  content: string;
  images: string[];
  likes: number;
  comments: CommentProps[];
  disableActions?: boolean;
  noCommentsMessage?: string;
}

const BlogViewLayout: React.FC<BlogViewLayoutProps> = ({
  title,
  content,
  images,
  likes,
  comments,
  disableActions = false,
  noCommentsMessage = "No comments to display.",
}) => {
  const imagesToShow =
    images.length > 0 ? images.slice(0, 3) : [image, image, image].slice(0, 3);

  return (
    <div className="bg-white p-5 rounded-2xl w-full max-w-full flex flex-col lg:flex-row gap-7 lg:gap-10">
      <article className="lg:w-[56%]">
        <h3 className="text-xl md:text-2xl font-semibold text-grey-normal mb-5 line-clamp-2">
          {title}
        </h3>
        <div
          className="text-xs md:text-sm text-grey-normal font-normal mb-8"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <PostActions
          likes={likes}
          dislikes={0}
          comments={comments.length}
          disabled={disableActions}
        />
      </article>
      <aside className="lg:flex-1 space-y-10 lg:mt-4">
        <div className="w-full flex gap-3">
          {imagesToShow.map((src, idx) => (
            <div
              key={idx}
              className="flex-1 aspect-[1.47] rounded-lg overflow-hidden relative"
            >
              <img
                src={typeof src === "string" ? src : image}
                alt="blog"
                className="w-full h-full object-cover absolute inset-0"
              />
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-base md:text-lg font-semibold text-[#000] mb-5">
            Comments
          </h3>
          <div className="my-5 h-[1px] bg-[#E9E9E9]" />
          <div>
            {comments.length === 0 ? (
              <p className="text-gray-600 text-sm">{noCommentsMessage}</p>
            ) : (
              comments.map((comment, idx) => (
                <div key={comment.id}>
                  <Comment {...comment} disabled={disableActions} />
                  {idx !== comments.length - 1 && (
                    <div className="h-[1px] bg-[#E9E9E9] w-full my-5" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default BlogViewLayout;
