"use client";
import React from 'react';

import Image from 'next/image'; // Use for the icon image (if applicable)
import { useRouter } from 'next/navigation';

import { useUserInfo } from '@/hooks/useUserInfo';
import { useTaskStore } from '@/store/task-store';

import { TaskDataType } from './backbone/other_component/data';

type TaskCardType = {
  task: TaskDataType;
  onRefresh: () => void; // Callback to trigger refresh
};
const TaskCardStyled: React.FC<TaskCardType> = ({ task, onRefresh }) => {

  const router = useRouter ()

  const { user } = useUserInfo();

  const numberOfTaskPerDay = user?.userInfo?.package?.numberOfTaskPerDay || 0;

  const { toggleTaskSelectionV2  } = useTaskStore();

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
              router?.push(`/backoffice/task-list/${ task?._id }`)
            }}
          >
            <p className="text-sm font-bold">{task.taskShortInstruction}</p>
            <p className="text-lg font-semibold text-primary mt-2">XOF {task.packageId?.priceEarnedPerTaskDone}</p>
          </div>

          <div className='flex items-center justify-center w-[100px] h-[100px]'>
            <label
              htmlFor={`task-${task._id}`}
              className="flex items-center space-x-2 cursor-pointer"
            >

              <input
                id={`task-${task?._id}`} // Unique ID for each checkbox
                type="checkbox"
                hidden
                checked={task?.isSelected} // Reflect the isSelected state
                onChange={async () => {
                  await toggleTaskSelectionV2(task?._id as string, numberOfTaskPerDay, user?.userInfo?._id) // Toggle selection on change
                  onRefresh(); // Trigger refresh after toggling
                  console.log("Toggled task ID:", task?._id); // Debugging log
                }}
              />

              <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 ${ task?.status ? "bg-yellow-500" : "bg-transparent" } hover:text-white transition duration-300`}>
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

export default React.memo(TaskCardStyled);





