import type { CommentProps } from "../../../components/Comment";
import commenter from "../../../images/commenter.png";

const SingleComment: CommentProps = {
  id: "4",
  name: "John Doe",
  text: "Lorem ipsum dolor sit amet consectetur. Facilisi nisl tortor mattis nisl ipsum aliquam vestibulum a ut. Neque non nec morbi.",
  likes: 10,
  dislikes: 2,
  profile_picture: commenter,
  timestamp: "2021-01-01",
};

const comments: CommentProps[] = [
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

export { comments };
