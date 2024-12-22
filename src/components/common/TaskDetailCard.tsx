"use client";
import React from 'react';

import {
  Camera,
  Copy,
  ExternalLink,
  Headphones,
  Youtube,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import { BASE_API_URL } from '@/lib/constants';

import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '../ui/Card';
import { Separator } from '../ui/Seperator';
import { TaskDataType } from './backbone/other_component/data';

type TaskDetailCardProps = {
  task: TaskDataType;
};

const TaskDetailCard: React.FC<TaskDetailCardProps> = ({ task }) => {
    const { submitTask } = task;
    console.log(task, "the task....")
    const router = useRouter ()
    // Function to copy the URL to clipboard
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(task?.taskLink);
            alert("URL copied to clipboard!");
        } catch (error) {
            console.error("Failed to copy URL:", error);
            alert("Failed to copy URL");
        }
    };
    return (
        <Card className="w-full max-w-xl bg-white rounded-xl shadow-lg overflow-hidden">
            <CardHeader className="space-y-4 p-6">
                <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <Youtube className="w-6 h-6 text-red-600" />
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-semibold text-gray-900 leading-tight">
                            {task?.taskTitle}
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">{task?.taskDescription}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between">

                    <div className="flex items-center space-x-2">
                        <label
                            htmlFor="imageUpload"
                            className="flex items-center space-x-2 cursor-pointer"
                        >
                            <input
                                id="imageUpload"
                                type="file"
                                accept="image/*"
                                className="hidden" // Hide the input visually
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        alert(`Selected file: ${file.name}`); // Handle file selection
                                    }
                                }}
                            />
                            <div className="w-5 h-5 text-yellow-400">
                                <Camera className="w-full h-full" />
                            </div>
                            <span className="text-sm font-medium text-gray-600">Upload Image</span>
                        </label>
                    </div>

                    <div className="text-xl font-bold text-red-500">XOF : {task?.packageId?.priceEarnedPerTaskDone }</div>
                </div>
            </CardHeader>

            <Separator />

            <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Créer :</span>
                        <span>{task?.createdAt}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Audit :</span>
                        <Button 
                        onClick={async () => {
                            // router.push(`${ task?.taskLink }`)
                            if (task?.taskLink) {
                                window.open(task.taskLink, '_blank');

                                // Call the API to update the status
                                const response = await fetch(`${BASE_API_URL}/task-assignment/update-status`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({ taskAssignmentId: task?.id }), // Adjust based on task ID field
                                    });

                                    const result = await response.json();

                                    if (!response.ok) {
                                    throw new Error(result.error || 'Failed to update task status');
                                    }

                                    alert('Task status updated to in-progress');
                            }
                        }}
                        variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-700">
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Ouvrir le lien
                        </Button>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Lien :</span>
                        <Button
                        onClick={ copyToClipboard }
                        variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-700">
                            <Copy className="w-4 h-4 mr-1" />
                            Copiez le lien
                        </Button>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="p-6 bg-gray-50">
                <div className="w-full flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                            <Headphones className="w-5 h-5 text-orange-600" />
                        </div>
                        <span className="ml-3 text-sm text-gray-600">Service</span>
                    </div>
                    <Button
                        onClick={submitTask}
                        disabled={task?.isSubmitted}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-6"
                    >
                        {task?.isSubmitted ? 'Soumis' : 'Soumettre'}
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default TaskDetailCard;















// import React from 'react';

// import {
//   Camera,
//   Copy,
//   ExternalLink,
//   Headphones,
//   Youtube,
// } from 'lucide-react';

// import { useTaskStore } from '@/store/task-store';

// import { Button } from '../ui/button';
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
// } from '../ui/Card';
// import { Separator } from '../ui/Seperator';

// const TaskDetailCard = () => {
//     const { title, description, xofPoints, createdAt, isSubmitted, submitTask } = useTaskStore();
//     return (
//         <Card className="w-full max-w-xl bg-white rounded-xl shadow-lg overflow-hidden">
//                 <CardHeader className="space-y-4 p-6">
//                     <div className="flex items-start space-x-4">
//                     <div className="flex-shrink-0">
//                         <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
//                         <Youtube className="w-6 h-6 text-red-600" />
//                         </div>
//                     </div>
//                     <div className="flex-1 min-w-0">
//                         <h2 className="text-lg font-semibold text-gray-900 leading-tight">
//                         {title}
//                         </h2>
//                         <p className="mt-1 text-sm text-gray-500">
//                         {description}
//                         </p>
//                     </div>
//                     </div>
                    
//                     <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-2">
//                         <Camera className="w-5 h-5 text-yellow-400" />
//                         <span className="text-sm font-medium text-gray-600">
//                         Capture d'écran requise
//                         </span>
//                     </div>
//                     <div className="text-xl font-bold text-red-500">
//                         XOF : {xofPoints}
//                     </div>
//                     </div>
//                 </CardHeader>

//                 <Separator />

//                 <CardContent className="p-6 space-y-4">
//                     <div className="space-y-2">
//                     <div className="flex items-center justify-between text-sm text-gray-500">
//                         <span>Créer :</span>
//                         <span>{createdAt}</span>
//                     </div>
                    
//                     <div className="flex items-center justify-between text-sm text-gray-500">
//                         <span>Audit :</span>
//                         <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-700">
//                         <ExternalLink className="w-4 h-4 mr-1" />
//                         Ouvrir le lien
//                         </Button>
//                     </div>

//                     <div className="flex items-center justify-between text-sm text-gray-500">
//                         <span>Lien :</span>
//                         <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-700">
//                         <Copy className="w-4 h-4 mr-1" />
//                         Copiez le lien
//                         </Button>
//                     </div>
//                     </div>
//                 </CardContent>

//                 <CardFooter className="p-6 bg-gray-50">
//                     <div className="w-full flex items-center justify-between">
//                     <div className="flex items-center">
//                         <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
//                         <Headphones className="w-5 h-5 text-orange-600" />
//                         </div>
//                         <span className="ml-3 text-sm text-gray-600">Service</span>
//                     </div>
//                     <Button
//                         onClick={submitTask}
//                         disabled={isSubmitted}
//                         className="bg-yellow-500 hover:bg-yellow-600 text-white px-6"
//                     >
//                         {isSubmitted ? "Soumis" : "Soumettre"}
//                     </Button>
//                     </div>
//                 </CardFooter>
//         </Card>
//     )
// }

// export default TaskDetailCard