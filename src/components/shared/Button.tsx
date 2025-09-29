import clsx from "clsx";
import loader from "../../images/gif/white-loader.gif";
import { Link } from "react-router-dom";
interface IButtonProps {
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
  extraClassName?: string;
  isLoading?: boolean;
  text: string;
  onClick?: () => void;
  href?: string;
}

export default function Button({
  variant = "primary",
  type = "button",
  ...props
}: IButtonProps) {
  const content = (
    <>
      {props.text}
      {props.isLoading && (
        <img
          src={loader}
          alt="loader"
          className="absolute top-[calc(50%-12px)] left-[calc(50%-12px)] w-[24px]"
        />
      )}
    </>
  );

  return props.href ? (
    <Link
      to={props.href}
      className={clsx(
        "text-center rounded-[16px] text-sm font-medium cursor-pointer py-2.5 relative w-full min-h-[50px]",
        props.extraClassName,
        variant === "primary"
          ? "bg-primary text-white"
          : "bg-grey-1 text-black-1",
        props.isLoading && "opacity-70"
      )}
    >
      {content}
    </Link>
  ) : (
    <button
      type={type}
      className={clsx(
        "text-center rounded-[16px] text-sm font-medium cursor-pointer py-2.5 relative w-full min-h-[50px]",
        props.extraClassName,
        variant === "primary"
          ? "bg-primary text-white"
          : "bg-grey-1 text-black-1",
        props.isLoading && "opacity-70"
      )}
      disabled={props.isLoading}
      onClick={props.onClick}
    >
      {content}
    </button>
  );
}
