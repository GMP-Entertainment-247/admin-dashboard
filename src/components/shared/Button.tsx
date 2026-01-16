
import clsx from "clsx";
import loader from "../../images/gif/white-loader.gif";
import { Link } from "react-router-dom";
import { ReactNode } from "react";
interface IButtonProps {
  variant?: "primary" | "secondary" | "cancel";
  type?: "button" | "submit";
  extraClassName?: string;
  isLoading?: boolean;
  text: ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
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

  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-primary text-white";
      case "secondary":
        return "bg-grey-1 text-black-1";
      case "cancel":
        return "bg-[#FFE5E5] text-[#FF0000]";
      default:
        return "bg-primary text-white";
    }
  };

  return props.href ? (
    <Link
      to={props.href}
      className={clsx(
        "text-center rounded-[16px] text-sm font-medium cursor-pointer py-2.5 relative w-full min-h-[50px]",
        props.extraClassName,
        getVariantClasses(),
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
        getVariantClasses(),
        props.isLoading && "opacity-70"
      )}
      disabled={props.isLoading || props.disabled}
      onClick={props.onClick}
    >
      {content}
    </button>
  );
}
