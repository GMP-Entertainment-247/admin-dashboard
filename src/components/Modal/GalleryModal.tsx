import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Modal } from ".";

type GalleryMediaType = "image" | "video";

export interface GalleryMediaItem {
  src: string;
  type?: GalleryMediaType | null;
}

interface GalleryModalProps {
  show: boolean;
  onClose: () => void;
  media: GalleryMediaItem[];
  initialIndex?: number;
}

const GalleryModal: React.FC<GalleryModalProps> = ({
  show,
  onClose,
  media,
  initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (show) {
      setCurrentIndex(initialIndex);
    }
  }, [show, initialIndex]);

  const total = media.length;

  const goNext = useCallback(() => {
    if (!total) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    if (!total) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (!show) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [show, goNext, goPrev]);

  if (!total) return null;

  const current = media[currentIndex];
  const isVideo = current?.type === "video";

  return (
    <Modal
      show={show}
      onClose={onClose}
      hideButtons
      extraClassname="!bg-transparent !p-0"
    >
      <div className="relative flex flex-col items-center gap-4">
        <div className="relative w-full max-h-[70vh] flex items-center justify-center bg-black-default/90 rounded-md overflow-hidden">
          {isVideo ? (
            <video
              src={current.src}
              controls
              autoPlay
              className="max-h-[70vh] max-w-full"
            />
          ) : (
            <img
              src={current.src}
              alt=""
              className="max-h-[70vh] max-w-full object-contain"
            />
          )}

          {total > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 rounded-full bg-black-default/60 text-white p-2 hover:bg-black-default/80"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 rounded-full bg-black-default/60 text-white p-2 hover:bg-black-default/80"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
        <div className="text-xs md:text-sm text-white bg-black-default/80 px-3 py-1 rounded-full">
          {currentIndex + 1} / {total}
        </div>
      </div>
    </Modal>
  );
};

export default GalleryModal;

