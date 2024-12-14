"use client";
import React from 'react';

import Image from 'next/image'; // Use for the icon image (if applicable)
import { useRouter } from 'next/navigation';

import { useTaskStore } from '@/store/task-store';

import { TaskDataType } from './backbone/other_component/data';

type TaskCardType = {
  task: TaskDataType
}

const TaskCardStyled: React.FC<TaskCardType> = ({ task }) => {

  const router = useRouter ()

  const { toggleCategory, toggleTaskSelection, selectTask,  } = useTaskStore();

  return (
    <>
      {/* Left Section with Icon */}
        <div className="flex items-start justify-center pt-4 w-[100px] h-[90px]">
          <Image
            src="/youtube-squared.png" // Example: YouTube icon
            alt="Task Icon"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
      {/* Right Section with Button */}
        <div className='flex flex-row h-[90px]  items-center'>
            <div className=''
              onClick={ () => {
                selectTask (task?.id as number); 
                router?.push(`/backoffice/task-list/${ task?.id }`)
              }}
            >
              {/* <p className="text-sm font-bold">Demande: {task.taskTitle}</p> */}
              <p className="text-sm font-bold">{task.taskShortInstruction}</p>
              {/* <p className="text-sm text-gray-700 overflow-hidden text-ellipsis whitespace-normal line-clamp-2">{task.taskDescription}</p> */}
              {/* <p className="text-lg font-semibold text-primary mt-2">XOF {task.taskRemuneration}</p> */}
              <p className="text-lg font-semibold text-primary mt-2">XOF {task.packageId?.priceEarnedPerTaskDone}</p>
            </div>

            <div className='flex items-center justify-center w-[100px] h-[100px]'>
              <label
                htmlFor={`task-${task.id}`}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  id={`task-${task?.id}`} // Unique ID for each checkbox
                  type="checkbox"
                  hidden
                  checked={task?.isSelected} // Reflect the isSelected state
                  onChange={() => {
                    toggleTaskSelection(task?.id as number); // Toggle selection on change
                    console.log("Toggled task ID:", task?.id); // Debugging log
                  }}
                />
                <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 ${ task?.isSelected ? "bg-yellow-500" : "bg-transparent" } hover:text-white transition duration-300`}>
                    {/* Add any icon or content here */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                </div>
              </label>
            </div>
        </div>
    </>
  );
};

export default TaskCardStyled;












// import React from 'react';

// import { useRouter } from 'next/navigation';

// const TaskCard = ({ task }: any) => {
//     const router = useRouter();

//     // Handler for navigation to task details
//     const handleViewDetails = () => {
//         router.push(`/task-list/${task.id}`);
//     };

//     return (
//         <>
//             <h2 className="text-xl font-bold mb-2">{task.name}</h2>
//             <p className="text-gray-700 mb-4">{task.description}</p>
//             <p className="text-lg font-semibold mb-4">Reward: {task.reward} XAF</p>
//             <button
//                 onClick={handleViewDetails}
//                 className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out"
//             >
//                 View Details
//             </button>
//         </>
//     );
// };

// export default TaskCard;
