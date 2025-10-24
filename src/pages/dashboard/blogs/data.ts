import type { CommentProps } from "../../../components/Comment";
import commenter from "../../../images/commenter.png";
import { createApiClient } from "../../../utils/api";

// API Response Types
export interface ApiResponse<T = any> {
  status: boolean;
  message: string | Record<string, string | string[]>;
  data: T;
}

export interface BlogCreateResponse extends ApiResponse<null> {}

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
export const createBlog = async (
  formData: FormData
): Promise<BlogCreateResponse> => {
  const response = await createApiClient().post("/admin/blog/store", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
