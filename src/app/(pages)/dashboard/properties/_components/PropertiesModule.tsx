"use client";
import React, {
  useRef,
  useState,
} from 'react';

import {
  propertyData,
  PropertyDataType,
} from './property_data';
import PropertyCard from './PropertyCard';

const PropertiesModule = () => {
    // const categories = ["All", "Apartment", "House", "Villa", "Estate", "Mansion"];
    // const categories_ = propertyData?.map((prop: PropertyDataType) => {
    //     return prop?.category
    // })

    const categories_ = Array.from(new Set(
        propertyData.map((prop: PropertyDataType) => prop?.category)
    ));
    const categories = ["All", ...categories_ ]
    const [selectedCategory, setSelectedCategory] = useState<any>("All");

    // Reference to the category container
    const categoryContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

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

    const filteredProperties = selectedCategory === "All"
        ? propertyData
        : propertyData.filter(property => property.category === selectedCategory);

    return (
        <div className="p-4">
            {/* <h1 className="text-2xl font-semibold mb-6">Properties</h1> */}

            {/* Category Tab Navigation */}
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
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`py-2 px-4 whitespace-nowrap ${
                                selectedCategory === category
                                    ? 'border-b-2 border-blue-500 text-blue-500'
                                    : 'text-gray-600'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
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

            {/* Properties List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property: PropertyDataType) => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </div>
        </div>
    );
};

export default PropertiesModule;


















// "use client";
// import React from 'react';

// import {
//   propertyData,
//   PropertyDataType,
// } from './property_data';
// import PropertyCard from './PropertyCard';

// const PropertiesModule = () => {
    
//     const categories = ["All", "Apartment", "House", "Villa", "Estate", "Mansion"];
//     const [selectedCategory, setSelectedCategory] = React.useState("All");

//     const filteredProperties = selectedCategory === "All"
//         ? propertyData
//         : propertyData.filter(property => property.category === selectedCategory);

//     return (
//         <div className="p-4">
//             <h1 className="text-2xl font-semibold mb-6">Properties</h1>

//             {/* Category Tab Navigation */}
//             <div className="flex space-x-4 border-b mb-6 overflow-x-auto">
//                 {categories.map((category) => (
//                     <button
//                         key={category}
//                         onClick={() => setSelectedCategory(category)}
//                         className={`py-2 px-4 ${
//                             selectedCategory === category
//                                 ? 'border-b-2 border-blue-500 text-blue-500'
//                                 : 'text-gray-600'
//                         }`}
//                     >
//                         {category}
//                     </button>
//                 ))}
//             </div>

//             {/* Properties List */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredProperties.map((property: PropertyDataType, index: number) => (
//                     <PropertyCard key={property.id} property={property} />
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default PropertiesModule