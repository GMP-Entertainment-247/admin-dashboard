import Button from "../../../components/shared/Button";
import Tabs from "../../../components/shared/Tabs";
import AutoResizingGrid from "../../../components/shared/AutoResizingGrid";
import BlogCard from "../../../components/BlogCard";
import image from "../../../images/rap-battle.jpg";
import { Link } from "react-router-dom";

export default function BlogsHome() {
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
      <div className="bg-white px-5 py-7 rounded-t-xl">
        <Tabs
          tabs={[
            { label: "All Blogs", key: "all" },
            { label: "Rap Battle", key: `rap-battle` },
            { label: "Artists", key: "artists" },
            { label: "Investors", key: "investors" },
          ]}
          // useAsLink
        />
      </div>
      <AutoResizingGrid minWidth={344}>
        {Array.from({ length: 10 }).map((_, index) => (
          <Link key={index} to={`/blogs/${index}`}>
            <BlogCard
              image={image}
              title="GMP Entertainment 247 to commence 4th Rap Battle Audition"
              description="The audition for the 4th edition for the rap battle challenge will start very soon. Ensure you stay logged in to get the latest updates."
              time="20 Secs ago"
            />
          </Link>
        ))}
      </AutoResizingGrid>
    </div>
  );
}
