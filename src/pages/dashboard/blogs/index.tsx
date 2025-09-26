import Button from "../../../components/shared/Button";

export default function BlogsHome() {
  return (
    <div>
      <div className="flex justify-between items-center py-5">
        <h1 className="page-title">News & Blogs</h1>

        <Button
          text="Create Blog"
          href="/blogs/create-blog"
          extraClassName="rounded-[8px] font-bold !w-fit px-5"
        />
      </div>
    </div>
  );
}
