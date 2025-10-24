import DashboardLayout from "./DashboardLayout";
// import BlogCard from "../../components/BlogCard";
// import image from "../../images/rap-battle.jpg";

export default function DashboardHome() {
  return (
    <DashboardLayout>
      Hello World
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <BlogCard
            key={index}
            image={image}
            title="GMP Entertainment 247 to commence 4th Rap Battle Audition"
            description="The audition for the 4th edition for the rap battle challenge will start very soon. Ensure you stay logged in to get the latest updates."
            time="20 Secs ago"
          />
        ))}
      </div> */}
    </DashboardLayout>
  );
}
