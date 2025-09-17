import { useEffect } from "react";

// Hook to detect outside click
export default function useOutsideClick (
  refOrRefs: React.RefObject<HTMLElement> | React.RefObject<HTMLElement>[],
  callback: () => void
) {
  useEffect(() => {
    const refs = Array.isArray(refOrRefs) ? refOrRefs : [refOrRefs];

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const isOutside = refs.every(
        (ref) => ref.current && !ref.current.contains(event.target as Node)
      );
      if (isOutside) {
        callback();
      }
    };

    // Add event listener
    document.addEventListener("click", handleClickOutside);

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [refOrRefs, callback]); // Dependencies array
};
