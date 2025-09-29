"use client";

import React, { useEffect, useRef, useState } from "react";

// Imports
import { debounce } from "../../utils/debounce";
import clsx from "clsx";

interface AutoResizingGridProps {
  gap?: number;
  gapX?: number;
  gapY?: number;
  minWidth?: number;
  children: React.ReactNode;
  containerClassName?: string;
}

/**
 * AutoResizingGrid component that adjusts its grid layout based on the container's width.
 *
 * @param {number} [minWidth=250] - The minimum width for each grid item.
 * @param {number} [gap=20] - The gap between the grid items (used if gapX/gapY not specified).
 * @param {number} [gapX] - The horizontal gap between columns (takes precedence over gap).
 * @param {number} [gapY] - The vertical gap between rows (takes precedence over gap).
 * @param {React.ReactNode} children - The child elements to be displayed in the grid.
 * @returns JSX.Element - The dynamically resizing grid container.
 */
const AutoResizingGrid: React.FC<AutoResizingGridProps> = ({
  minWidth = 250,
  gap = 20,
  gapX,
  gapY,
  children,
  containerClassName,
}) => {
  const [columns, setColumns] = useState(1); // State to track the number of columns
  const gridRef = useRef<HTMLDivElement>(null); // Ref for the grid container
  const [hasCalculated, setHasCalculated] = useState(false); // State to track if columns have been calculated

  useEffect(() => {
    const observer = gridRef.current;

    // Function to calculate and set the number of columns based on container width
    const handleResize = ([entry]: ResizeObserverEntry[]) => {
      const columnGap = gapX ?? gap; // Use gapX if specified, otherwise use gap
      const newColumns = Math.max(
        Math.floor(
          (entry.contentRect.width + columnGap) / (minWidth + columnGap)
        ),
        1
      ); // Ensure at least 1 column

      setHasCalculated(true); // Set state to true after calculating columns
      setColumns((prev) => (prev !== newColumns ? newColumns : prev));
    };

    // Debounced version of handleResize to minimize frequent state updates
    const debouncedResize = debounce(handleResize as (...args: unknown[]) => void, 300);

    const resizeObserver = new ResizeObserver(debouncedResize); // Observe grid container size changes
    if (observer) {
      resizeObserver.observe(observer);
    }

    // Cleanup observer
    return () => {
      if (observer) {
        resizeObserver.unobserve(observer);
      }
    };
  }, [gap, gapX, minWidth]); // Effect re-runs if minWidth or gap values change

  return (
    // The grid container with dynamic column count and custom gap
    <div
      ref={gridRef}
      className={clsx(
        "grid duration-300",
        {
          "opacity-0": !hasCalculated, // Hide grid while columns are being calculated
        },
        containerClassName
      )}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        columnGap: gapX !== undefined ? `${gapX}px` : `${gap}px`,
        rowGap: gapY !== undefined ? `${gapY}px` : `${gap}px`,
      }}
    >
      {columns > 0 ? children : null} {/* Render children if columns exist */}
    </div>
  );
};

export default AutoResizingGrid;
