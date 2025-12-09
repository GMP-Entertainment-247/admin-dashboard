import clsx from "clsx";
import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

interface ITab {
  tabs: {
    label: string;
    key: string;
    hide?: boolean;
  }[];
  useAsLink?: boolean;
  tabName?: string;
  className?: string;
  slot?: React.ReactNode;
}

export default function Tabs({
  tabs,
  useAsLink = false,
  tabName = "tab",
  className,
  slot,
}: ITab) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const initialTab = searchParams.get(tabName);
    if (!initialTab && !useAsLink) {
      searchParams.set(tabName, tabs[0].key);
      setSearchParams(searchParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changePath = (value: string) => {
    if (useAsLink) {
      navigate(value);
    } else {
      searchParams.set(tabName, value);
      setSearchParams(searchParams);
    }
  };

  return (
    <div className={clsx("flex gap-5 overflow-auto box-border border-b-[1px] border-solid border-[#E9E9E9]", className)}>
      {tabs.map((item) => (
        <div key={item.key}>
          <p
            className={clsx(
              "whitespace-nowrap pb-1 cursor-pointer text-base text-[#212121]",
              (location?.pathname === item?.key ||
                searchParams.get(tabName) === item?.key) &&
                "text-[#998100] font-semibold",
              item?.hide && "hidden"
            )}
            onClick={() => changePath(item.key)}
            key={item.key}
          >
            {item.label}
          </p>
          <div
            className={clsx(
              "h-1 w-full rounded-t-lg",
              (location?.pathname === item?.key ||
                searchParams.get(tabName) === item?.key) &&
                "bg-[#998100]"
            )}
          />
        </div>
      ))}
      {slot}
    </div>
  );
}
