import PageTitle from "../../../../components/shared/PageTitle";

const AnnouncementInnerLayout: React.FC<{
  children: React.ReactNode;
  title: string;
}> = ({ title, children }) => {
  return (
    <div className="space-y-5">
      <PageTitle as="h1" showBackButton>
        {title}
      </PageTitle>
      {/* <div className="h-[0.5px] bg-[#E9E9E9] w-full" /> */}
      {children}
    </div>
  );
};

export default AnnouncementInnerLayout;
