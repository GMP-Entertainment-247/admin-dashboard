import { X } from "lucide-react";
import clsx from "clsx";

interface ImageItemProps {
  src: string;
  alt: string;
  onRemove: () => void;
  className?: string;
  hideRemove?: boolean;
  imgClass?: string;
}

const ImageItem: React.FC<ImageItemProps> = ({
  src,
  alt,
  onRemove,
  className,
  hideRemove,
  imgClass,
}) => {
  return (
    <div
      className={clsx(
        "relative w-[147px] h-[100px] rounded-lg object-cover overflow-hidden group",
        className
      )}
    >
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover ${imgClass}`}
      />
      {/* Remove button */}
      {!hideRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
          title="Remove image"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};

export default ImageItem;
