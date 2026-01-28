import type { CommentProps } from "../../../components/Comment";
import commenter from "../../../images/commenter.png";
import { createApiClient, type ApiResponse } from "../../../utils/api";

// Centralized blog categories and tabs
export const BLOG_CATEGORIES: { value: string; label: string }[] = [
  { value: "rap-battle", label: "Rap Battle" },
  { value: "artists", label: "Artists" },
  { value: "celebrities", label: "Celebrities" },
  { value: "investors", label: "Investors" },
];

export const BLOG_TABS: { label: string; key: string }[] = [
  { label: "All Blogs", key: "all" },
  ...BLOG_CATEGORIES.map((c) => ({ label: c.label, key: c.value })),
];

const SingleComment: CommentProps = {
  id: "4",
  name: "John Doe",
  text: "Lorem ipsum dolor sit amet consectetur. Facilisi nisl tortor mattis nisl ipsum aliquam vestibulum a ut. Neque non nec morbi.",
  likes: 10,
  dislikes: 2,
  profile_picture: commenter,
  timestamp: "2021-01-01",
};

export const comments: CommentProps[] = [
  {
    id: "1",
    name: "John Doe",
    text: "Lorem ipsum dolor sit amet consectetur. Facilisi nisl tortor mattis nisl ipsum aliquam vestibulum a ut. Neque non nec morbi.",
    likes: 10,
    dislikes: 2,
    // replies: [SingleComment],
    profile_picture: commenter,
    timestamp: "2021-01-01",
  },
  {
    id: "2",
    name: "John Doe",
    text: "Lorem ipsum dolor sit amet consectetur. Facilisi nisl tortor mattis nisl ipsum aliquam vestibulum a ut. Neque non nec morbi.",
    likes: 10,
    dislikes: 2,
    replies: [SingleComment, SingleComment, SingleComment],
    profile_picture: commenter,
    timestamp: "2021-01-01",
  },
  {
    id: "3",
    name: "John Doe",
    text: "Lorem ipsum dolor sit amet consectetur. Facilisi nisl tortor mattis nisl ipsum aliquam vestibulum a ut. Neque non nec morbi.",
    likes: 10,
    dislikes: 2,
    // replies: [SingleComment],
    profile_picture: commenter,
    timestamp: "2021-01-01",
  },
];

// Blog API functions
export const createBlog = async (formData: FormData): Promise<ApiResponse<null>> => {
  const response = await createApiClient().post("/admin/blog/store", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Update blog
export const updateBlog = async (formData: FormData): Promise<ApiResponse<null>> => {
  const response = await createApiClient().post(
  "/admin/blog/update",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

// export const addBlogImages = async (
//   formData: FormData
// ): Promise<ApiResponse<null>> => {
//   const response = await createApiClient().post(
//     "/admin/blog/add-image",
//     formData,
//     {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );
//   return response.data;
// };

// Delete existing blog image by image id
export const deleteBlogImage = async (
  imageId: number | string
): Promise<ApiResponse<null>> => {
  const response = await createApiClient().post("/admin/blog/delete-image", {
    id: imageId,
  });
  return response.data;
};

export const deleteBlog = async (
  blogId: string
): Promise<ApiResponse<null>> => {
  const response = await createApiClient().post("/admin/blog/delete", {
    id: blogId,
  });
  return response.data;
};
