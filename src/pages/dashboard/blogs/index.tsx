import Button from "../../../components/shared/Button";
import Tabs from "../../../components/shared/Tabs";
import AutoResizingGrid from "../../../components/shared/AutoResizingGrid";
import BlogCard from "../../../components/BlogCard";
import Pagination from "../../../components/Table/Pagination";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import StateContainer from "../../../components/shared/StateContainer";
import { Link, useSearchParams } from "react-router-dom";
import Dropdown from "../../../components/shared/Dropdown";
import useFetch from "../../../utils/hooks/useFetch";
import { BlogListData } from "../../../interface/blog.interface";

export default function BlogsHome() {
  const [searchParams] = useSearchParams();

  const currentPage = searchParams.get("page") || "1";
  const selectedCategory = searchParams.get("tab") || "all";
  const selectedDate = searchParams.get("date") || "";

  // Build query parameters
  const queryParams: Record<string, any> = {
    page: currentPage,
  };

  if (selectedCategory !== "all") {
    queryParams.category = selectedCategory;
  }

  if (selectedDate) {
    queryParams.date = selectedDate;
  }

  const { data, loading, error } = useFetch<BlogListData>(
    "/admin/blog/list",
    queryParams
  );

  // Type assertion to help TypeScript understand the structure
  const blogData = data as BlogListData | undefined;

  const renderContent = () => {
    if (loading) {
      return <LoadingSpinner message="Loading blogs..." />;
    }

    if (error) {
      return (
        <StateContainer>
          <p className="text-red-600 mb-4">Error loading blogs</p>
          <p className="text-gray-600">
            {error.message || "Something went wrong"}
          </p>
        </StateContainer>
      );
    }

    if (!blogData?.data || blogData.data.length === 0) {
      return (
        <StateContainer>
          <p className="text-gray-600">No blogs found</p>
          <p className="text-sm text-gray-500 mt-2">
            {selectedCategory !== "all"
              ? `No blogs found in the ${selectedCategory} category`
              : "No blogs available at the moment"}
          </p>
        </StateContainer>
      );
    }

    return (
      <>
        <AutoResizingGrid minWidth={300}>
          {blogData.data.map((blog) => (
            <Link key={blog.id} to={`/blogs/${blog.id}`}>
              <BlogCard blog={blog} />
            </Link>
          ))}
        </AutoResizingGrid>

        {blogData.last_page > 1 && (
          <div className="flex justify-center mt-8">
            <Pagination totalPages={blogData.last_page} />
          </div>
        )}
      </>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="page-title">News & Blogs</h1>
        <Button
          text="Create Blog"
          href="/blogs/create-blog"
          extraClassName="rounded-[8px] font-bold !w-fit px-5 !min-h-[unset]"
        />
      </div>

      <div className="bg-white px-3 md:px-4 lg:px-5 py-4 md:py-5 lg:py-7 rounded-xl">
        <Tabs
          tabs={[
            { label: "All Blogs", key: "all" },
            { label: "Rap Battle", key: `rap-battle` },
            { label: "Artists", key: "artists" },
            { label: "Celebrities", key: "celebrities" },
            { label: "Investors", key: "investors" },
          ]}
          className="!border-b-0"
          tabName="tab"
          slot={
            <div className="ml-auto flex gap-4">
              <Dropdown
                triggerText="Date"
                paramKey="date"
                options={[
                  { label: "Today", value: "today" },
                  { label: "This week", value: "this-week" },
                  { label: "This month", value: "this-month" },
                  { label: "This year", value: "this-year" },
                ]}
              />
              <Dropdown
                triggerText="All Activities"
                options={[
                  { label: "All Blogs", value: "all" },
                  { label: "Rap Battle", value: `rap-battle` },
                  { label: "Artists", value: "artists" },
                  { label: "Celebrities", value: "celebrities" },
                  { label: "Investors", value: "investors" },
                ]}
              />
            </div>
          }
        />
      </div>

      {renderContent()}
    </div>
  );
}
