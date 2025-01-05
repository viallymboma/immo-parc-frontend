"use client";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'; // Add this import if Swiper's CSS for autoplay is needed.

import React from 'react';

import Image from 'next/image';
import {
  Autoplay,
  Navigation,
  Pagination,
} from 'swiper/modules';
import {
  Swiper,
  SwiperSlide,
} from 'swiper/react';

import {
  TaskDataType,
} from '@/components/common/backbone/other_component/data';
import TaskCardStyled from '@/components/common/TaskCard';
import useFetchTaskAssigments from '@/hooks/useFetchTaskAssigment';
import useFetchTasks from '@/hooks/useFetchTasks';
import { useTaskStore } from '@/store/task-store';

import PackagesListModule
  from '../packages-display/_components/PackagesListModule';
import AboutUs from './about-us/AboutUs';
import { SkeletonSmallTask } from './SkeletonSmallTask';
import TestimonialList from './testimonials/TestimonialList';

// Image paths (Assumed to be in public directory)
const Parking1 = '/products/car-park/parking1.jpg';
const House1 = '/products/houses/house1.jpg';
const Warehouse1 = '/products/warehouses/warehouse1.jpg';

const images = [
  Warehouse1, House1, Parking1
];

const BackofficeModule = () => {

  const { tasksDataSet, error, isValidating, refetchTasks } = useFetchTasks (); 
  const { taskAssignment, refetchTaskAssignments } = useFetchTaskAssigments (); 

  const { tasks_, filteredTasksFromBackend } = useTaskStore(); 

  function replaceById(arr1: any, arr2: any) {
    // Create a map of objects from arr2, indexed by _id
    const map = arr2.reduce((acc: any, obj: any) => {
        acc[obj._id] = obj;
        return acc;
    }, {});

    // Replace the elements in arr1 with corresponding objects from arr2
    return arr1.map((item: any) => {
        if (map[item._id]) {
            return map[item._id]; // Replace with matching object from arr2
        }
        return item; // Return the original item if no match is found
    });
  }

  const handleRefresh = React.useCallback(async () => {
    try {
      await Promise.all([refetchTasks(), refetchTaskAssignments()]);
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  }, []);

  const intermediateObjects = React.useMemo(
    () => replaceById(tasks_, filteredTasksFromBackend),
    [tasks_, filteredTasksFromBackend]
  );

  console.log(intermediateObjects, "before all")

  return (
    <div>
      <section className='w-full'>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 3000, // 3-second auto-cycle
            disableOnInteraction: false,
          }}
          loop={true} // Infinite loop
          navigation
          pagination={{ clickable: true }}
          className="w-full h-[200px] lg:h-screen" // Make it take full width and height of the viewport
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <Image
                width={1920} // Adjust as needed for responsive design
                height={500} // Adjust as needed for responsive design
                src={image}
                alt={`image ${index + 1}`}
                className="w-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section>
        <div className='my-5'>
          <h1 className='text-primary text-[20px] font-bold'>Tâches pour aujourd'hui</h1>
        </div>

        <div className='grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-3'>
          {
            isValidating ? 
              (
                <div className='flex flex-col gap-4'>
                  <SkeletonSmallTask />
                  <SkeletonSmallTask />
                  <SkeletonSmallTask />
                  <SkeletonSmallTask />
                  <SkeletonSmallTask />
                  <SkeletonSmallTask />
                </div>
              )
              :
              intermediateObjects?.map((property: TaskDataType) => {
                return (
                    <div key={ property?._id } className='flex flex-row gap-1 items-center justify-between dark:bg-[#122031] bg-white shadow-lg rounded-lg  max-w-sm'>
                        <TaskCardStyled 
                          task={ property } 
                          onRefresh={handleRefresh} // Pass refresh handler to child
                        />
                    </div>
                )
              })
          }
        </div>
      </section>

      <section className="w-full max-w-2xl my-5 mx-auto">
        <TestimonialList />
      </section>
      <section>
        <AboutUs />
      </section>
      <section>
        <PackagesListModule />
      </section>
    </div>
  );
}

export default BackofficeModule;

















// "use client";

// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// import React from 'react';

// import Image from 'next/image';
// import {
//   Navigation,
//   Pagination,
// } from 'swiper/modules';
// import {
//   Swiper,
//   SwiperSlide,
// } from 'swiper/react';

// import {
//   TaskDataType,
//   tasks,
// } from '@/components/common/backbone/other_component/data';

// // ../../../../../public
// const Parking1 = '/products/car-park/parking1.jpg';
// // ../../../../../public
// const House1 = '/products/houses/house1.jpg';
// const Warehouse1 = '/products/warehouses/warehouse1.jpg';

// // ../../../../../public

// const images = [
//   Warehouse1, House1, Parking1
// ]

// const BackofficeModule = () => {
//   const extractCategories = Array.from(new Set(
//     tasks.map((prop: TaskDataType) => prop?.taskStatus)
//   ));
//   return (
//     <div>
//       <div className='w-[150px]'>
//         <Swiper
//             modules={[Navigation, Pagination]}
//             spaceBetween={10}
//             slidesPerView={1}
//             autoplay
//             navigation
//             pagination={{ clickable: true }}
//             className="w-full h-48"
//         >
//             {images && images.map((image, index) => (
//                 <SwiperSlide key={index}>
//                     <Image
//                       width={100}
//                       height={100}
//                       src={image}
//                       alt={`image ${index + 1}`}
//                       className="w-[100vw] h-48 object-cover"
//                     />
//                 </SwiperSlide>
//             ))}
//         </Swiper>
//       </div>
//     </div>
//   )
// }

// export default BackofficeModule