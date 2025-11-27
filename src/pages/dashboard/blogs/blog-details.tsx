import BlogInnerLayout from "./inner-layout";
import image from "../../../images/rap-battle.jpg";
import { comments, getBlogDetails } from "./data";
import Comment from "../../../components/Comment";
import PostActions from "../../../components/PostActions";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import StateContainer from "../../../components/shared/StateContainer";
import { toast } from "react-toastify";
import { flattenErrorMessage } from "../../../utils/errorHelpers";
import Button from "../../../components/shared/Button";

const BlogDetails = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [pictures, setPictures] = useState<{ file: string }[]>([]);

  useEffect(() => {
    let isMounted = true;
    const run = async () => {
      if (!blogId) return;
      setLoading(true);
      setError(null);
      try {
        const response = await getBlogDetails(blogId);
        if (response.status && response.data) {
          if (!isMounted) return;
          setTitle(response.data.title);
          setContent(response.data.content || "");
          setPictures(response.data.pictures || []);
        } else {
          const errorMessage = flattenErrorMessage(
            response.message,
            "Failed to load blog details"
          );
          toast.error(errorMessage);
          if (isMounted) setError(errorMessage);
        }
      } catch (err: any) {
        const errorMessage = err?.response?.data?.message
          ? flattenErrorMessage(
              err.response.data.message,
              "Failed to load blog details"
            )
          : "Failed to load blog details";
        toast.error(errorMessage);
        if (isMounted) setError(errorMessage);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    run();
    return () => {
      isMounted = false;
    };
  }, [blogId]);

  const imagesToShow =
    pictures.length > 0 ? pictures.map((p) => p.file) : [image, image, image];

  const handleEdit = () => {
    if (!blogId) return;
    navigate(`/blogs/edit-blog/${blogId}`);
  };

  const handleDelete = () => {
    // TODO: Wire to real delete endpoint when available
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog post?"
    );
    if (!confirmed) return;
    toast.info("Delete blog functionality is not implemented yet.");
  };

  return (
    <BlogInnerLayout title="Details">
      {loading ? (
        <LoadingSpinner message="Loading blog..." />
      ) : error ? (
        <StateContainer>
          <p className="text-red-600 mb-4">Error loading blog</p>
          <p className="text-gray-600">{error}</p>
        </StateContainer>
      ) : (
        <>
          <div className="w-full max-w-full flex flex-col lg:flex-row gap-7 lg:gap-10">
            <article className="lg:w-[56%]">
              <h3 className="text-sm md:text-base font-semibold text-grey-normal mb-5 line-clamp-2">
                {title}
              </h3>
              <div
                className="text-xs md:text-sm text-grey-normal font-normal mb-8"
                dangerouslySetInnerHTML={{ __html: content }}
              />
              <PostActions likes={10} dislikes={2} comments={10} />
            </article>
            <aside className="lg:flex-1 space-y-10 lg:mt-4">
              <div className="w-full flex gap-3">
                {imagesToShow.slice(0, 3).map((src, idx) => (
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
                  {comments.map((comment, idx) => (
                    <div key={comment.id + idx * Math.random() + Math.random()}>
                      <Comment {...comment} />
                      {idx !== comments.length - 1 && (
                        <>
                          <div className="h-[1px] bg-[#E9E9E9] w-full my-5" />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          {/* Bottom action bar */}
          <div className="mt-6 bg-white p-5 rounded-2xl flex items-center justify-end gap-4">
            <Button
              text="Delete Post"
              type="button"
              extraClassName="!w-fit !min-h-[unset] py-2 md:py-4 px-3 md:px-5 bg-red-light !text-red-normal !rounded-[8px] !font-bold"
              onClick={handleDelete}
            />
            <Button
              text="Edit Post"
              type="button"
              extraClassName="!w-fit !min-h-[unset] py-2 md:py-4 px-3 md:px-5 !rounded-[8px] !font-bold"
              onClick={handleEdit}
            />
          </div>
        </>
      )}
    </BlogInnerLayout>
  );
};

export default BlogDetails;
