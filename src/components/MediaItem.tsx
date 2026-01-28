import { Play, X } from "lucide-react";
import clsx from "clsx";

interface MediaItemProps {
  src: string;
  alt: string;
  onRemove: () => void;
  className?: string;
  hideRemove?: boolean;
  imgClass?: string;
  isVideo?: boolean;
  onClick?: () => void;
}

const MediaItem: React.FC<MediaItemProps> = ({
  src,
  alt,
  onRemove,
  className,
  hideRemove,
  imgClass,
  isVideo,
  onClick,
}) => {
  return (
    <div
      className={clsx(
        "relative w-[147px] h-[100px] rounded-lg object-cover overflow-hidden group",
        { "cursor-pointer": onClick },
        className
      )}
      onClick={onClick}
    >
      {isVideo ? (
        <video
          src={src}
          className={`absolute inset-0 w-full h-full object-cover ${imgClass}`}
          muted
          playsInline
          preload="metadata"
        />
      ) : (
        <img
          src={src}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover ${imgClass}`}
        />
      )}

      {isVideo && (
        <div className="absolute inset-0 flex items-center justify-center bg-black-default/20">
          <div className="w-8 h-8 rounded-full bg-black-default/60 flex items-center justify-center">
            <Play className="w-4 h-4 text-white" />
          </div>
        </div>
      )}

      {/* Remove button */}
      {!hideRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
          title="Remove Media"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};

export default MediaItem;
