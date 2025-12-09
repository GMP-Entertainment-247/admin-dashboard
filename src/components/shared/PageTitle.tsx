import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

type HeadingTag = "h1" | "h2" | "h3";

interface PageTitleProps {
  as?: HeadingTag;
  children: React.ReactNode;
  showBackButton?: boolean;
  className?: string;
}

export default function PageTitle({
  as = "h1",
  children,
  showBackButton = false,
  className = "",
}: PageTitleProps) {
  const navigate = useNavigate();
  const Heading = as;

  return (
    <div className="flex items-center gap-2">
      {showBackButton && (
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="inline-flex items-center justify-center rounded-md hover:bg-gray-100 p-1"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
      )}
      <Heading className={`page-title ${className}`.trim()}>{children}</Heading>
    </div>
  );
}
