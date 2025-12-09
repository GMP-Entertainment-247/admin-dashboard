import Button from "../../../components/shared/Button";
import PageTitle from "../../../components/shared/PageTitle";
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
import { BLOG_TABS } from "./data";

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

  if (selectedDate && selectedDate !== "all") {
    queryParams.date = selectedDate;
  }

  const {
    data: blogData,
    loading,
    error,
  } = useFetch<BlogListData>("/admin/blog/list", queryParams);

  // Type assertion to help TypeScript understand the structure
  // const blogData = data as BlogListData | undefined;

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
        <PageTitle as="h1">News & Blogs</PageTitle>
        <Button
          text="Create Blog"
          href="/blogs/create-blog"
          extraClassName="rounded-[8px] font-bold !w-fit px-5 !min-h-[unset]"
        />
      </div>

      <div className="bg-white px-3 md:px-4 lg:px-5 py-4 md:py-5 lg:py-7 rounded-xl">
        <Tabs
          tabs={BLOG_TABS}
          className="!border-b-0"
          tabName="tab"
          slot={
            <div className="ml-auto flex gap-4">
              <Dropdown
                triggerText="Date"
                paramKey="date"
                options={[
                  { label: "All", value: "all" },
                  { label: "Today", value: "today" },
                  { label: "This week", value: "this-week" },
                  { label: "This month", value: "this-month" },
                  { label: "This year", value: "this-year" },
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
