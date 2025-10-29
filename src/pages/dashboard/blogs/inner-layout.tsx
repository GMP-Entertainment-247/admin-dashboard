const BlogInnerLayout: React.FC<{ children: React.ReactNode; title: string }> = ({
  title,
  children,
}) => {
  return (
    <div className="bg-white p-5 rounded-2xl">
      <h2 className="page-title">{title}</h2>
      <div className="h-[0.5px] bg-[#E9E9E9] my-5 w-[calc(100%+40px)] mx-[-20px]" />
      {children}
    </div>
  );
};

export default BlogInnerLayout;
