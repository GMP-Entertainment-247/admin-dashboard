import { useState } from "react";
import { Play } from "lucide-react";
import PostActions from "./PostActions";
import Comment from "./Comment";
import { type CommentProps } from "./Comment";
import GalleryModal from "./Modal/GalleryModal";

type BlogMediaType = "image" | "video";

interface BlogMediaItem {
  src: string;
  type?: BlogMediaType | null;
}

interface BlogViewLayoutProps {
  title: string;
  content: string;
  images: BlogMediaItem[];
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
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleOpenGallery = (index: number) => {
    if (!images.length) return;
    setActiveIndex(index);
    setIsGalleryOpen(true);
  };

  const hasMore = images.length > 3;
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
          {images.slice(0, 3).map((media, idx) => {
            const isVideo = media.type === "video";
            const src = media.src;
            const isLastVisible = idx === 2 && hasMore;
            const remainingCount = images.length - 3;

            return (
              <div
                key={idx}
                className="flex-1 aspect-[1.47] rounded-lg overflow-hidden relative cursor-pointer"
                onClick={() => handleOpenGallery(idx)}
              >
                {isVideo ? (
                  <video
                    src={src}
                    className="w-full h-full object-cover absolute inset-0"
                    muted
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <img
                    src={src}
                    alt="blog"
                    className="w-full h-full object-cover absolute inset-0"
                  />
                )}

                {isLastVisible ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black-default/40">
                    <span className="px-3 py-1 rounded-full bg-black-default/80 text-white text-xs md:text-sm font-medium">
                      +{remainingCount} more
                    </span>
                  </div>
                ) : (
                  isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black-default/20">
                      <div className="w-10 h-10 rounded-full bg-black-default/60 flex items-center justify-center">
                        <Play className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  )
                )}
              </div>
            );
          })}
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

      <GalleryModal
        show={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        media={images}
        initialIndex={activeIndex}
      />
    </div>
  );
};

export default BlogViewLayout;
