"use client";

import React from 'react';

const NavigateCategories = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {

    // Reference to the category container
    const categoryContainerRef = React.useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = React.useState(false);
    const [showRightArrow, setShowRightArrow] = React.useState(true);

    // Handle scroll
    const handleScroll = (direction: "left" | "right") => {
        if (categoryContainerRef.current) {
            const { scrollLeft, clientWidth, scrollWidth } = categoryContainerRef.current;
            const scrollAmount = 150;  // Adjust scroll amount as needed

            if (direction === "left") {
                categoryContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                categoryContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }

            // Update arrow visibility
            setTimeout(() => {
                const newScrollLeft = categoryContainerRef.current?.scrollLeft || 0;
                setShowLeftArrow(newScrollLeft > 0);
                setShowRightArrow(newScrollLeft + clientWidth < scrollWidth);
            }, 300);
        }
    };

    return (
        <div className="relative mb-6">
            {showLeftArrow && (
                <button
                    onClick={() => handleScroll("left")}
                    className="absolute left-[-1%] z-10 h-full bg-gradient-to-r rounded-l-3xl from-white/90 to-transparent dark:from-slate-600 dark:to-transparent w-8 flex items-center justify-center"
                >
                    &#9664;
                </button>
            )}
            <div
                ref={categoryContainerRef}
                className="flex space-x-4 border-b overflow-x-auto scrollbar-hide"
            >
                { children }
            </div>
            {showRightArrow && (
                <button
                    onClick={() => handleScroll("right")}
                    className="absolute right-[-1%] bottom-1 z-10 h-full bg-gradient-to-l rounded-r-3xl from-white/90 to-transparent dark:from-slate-600 dark:to-transparent w-8 flex items-center justify-center"
                >
                    &#9654;
                </button>
            )}
        </div>
    );
}

export default NavigateCategories