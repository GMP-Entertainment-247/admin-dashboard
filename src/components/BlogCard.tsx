import { Play } from "lucide-react";
import { Blog } from "../interface/blog.interface";
import { formatTimeAgo } from "../utils/helpers";

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  // Get the first media from the pictures array, or use a default image
  const firstMedia = blog.pictures && blog.pictures.length > 0
    ? blog.pictures[0]
    : undefined;

  const isVideo = firstMedia?.type === "video";

  const coverUrl = firstMedia?.file || "/images/no-image-found.jpeg";

  return (
    <div className="w-full aspect-[1.054] rounded-2xl bg-white p-3 overflow-hidden">
      <div className="w-full h-[51%] object-cover rounded-xl mb-4 relative overflow-hidden">
        {isVideo ? (
          <video
            src={coverUrl}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            playsInline
            preload="metadata"
          />
        ) : (
          <img
            src={coverUrl}
            alt="cover"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-black-default/20">
            <div className="w-10 h-10 rounded-full bg-black-default/60 flex items-center justify-center">
              <Play className="w-5 h-5 text-white" />
            </div>
          </div>
        )}
        <p className="bg-white rounded-lg text-center absolute left-2 bottom-2 p-2 text-[#212121] text-xs font-medium capitalize shadow">
          {blog.category}
        </p>
      </div>
      <h3 className="text-base font-semibold text-[#212121] mb-3 line-clamp-2">
        {blog.title}
      </h3>
      <div
        className="text-sm text-[#212121] mb-[10px] max-h-[30%] text-clamp-2"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
      <p className="text-sm text-[#999999] text-right">
        {formatTimeAgo(blog.created_at)}
      </p>
    </div>
  );
}


