"use client";
import React from 'react';

import { useTaskStore } from '@/store/task-store';

import NavigateCategories from './NavigateCategories';

// import { taskStatus } from '../backbone/other_component/data';

const NavigationContent = ({
    children, buttonList, 
    listClass,
  }: Readonly<{
    children: React.ReactNode; 
    buttonList: any [];
    listClass?: string
  }>) => {

    const categories = [...buttonList ]
    const [selectedCategory, setSelectedCategory] = React.useState<any>("All");
    const { toggleCategory,  } = useTaskStore();
    return (
        <div className="p-4">
            <NavigateCategories>
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => {
                            setSelectedCategory(category)
                            toggleCategory (category)
                        }}
                        className={`py-2 px-4 whitespace-nowrap ${
                            selectedCategory === category
                                ? 'border-b-2 border-blue-500 text-blue-500'
                                : 'text-gray-600'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </NavigateCategories>
            {/* Properties List */}
            <div className={`${ listClass ? listClass : "grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 items-start" } `}>
                { children }
            </div>
        </div>
    )
}

export default NavigationContent