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
    // const { submitTask } = task;
    const [selectedImage, setSelectedImage] = React.useState<File | null>(null); // State for storing the selected image
    const [uploading, setUploading] = React.useState(false);

    console.log(task, "the task...."); 

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

    const handleImageUpload = async () => {
        if (!selectedImage) return;

        setUploading(true);

        const formData = new FormData();
        formData.append('image', selectedImage);
        formData.append('taskAssignmentId', task?.taskAssignmentId || ""); // Add taskAssignmentId

        try {
            const response = await fetch('/api/cloudinary-upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload image');
            }

            const result = await response.json();
            alert('Image uploaded successfully!');
            console.log(result); // Contains the server response
        } catch (error) {
            console.error(error);
            alert('Error uploading image');
        } finally {
            setUploading(false);
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

                { task?.status === "completed" ? 
                    null
                    :
                    <div className="flex items-center space-x-2">
                        <label
                            htmlFor="imageUpload"
                            className={`flex items-center space-x-2 cursor-pointer`}
                        >
                            <input
                                id="imageUpload"
                                type="file"
                                accept="image/*"
                                className="hidden" // Hide the input visually
                                // onChange={handleImageUpload}
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setSelectedImage(file);
                                    }
                                }}
                            />
                            <div className="w-5 h-5 text-yellow-400">
                                <Camera className="w-full h-full" />
                            </div>
                            <span className="text-sm font-medium text-gray-600">Upload Image</span>
                        </label>
                    </div>
                }


                    <div className="text-xl font-bold text-red-500">XOF : {task?.packageId?.priceEarnedPerTaskDone }</div>
                </div>
                {/* Display the selected image */}
                {selectedImage && (
                <div className="mt-4 flex items-center space-x-2">
                    {/* Small Image Preview */}
                    <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Selected"
                        className="w-12 h-12 object-cover rounded-md shadow-md"
                    />
                    {/* Clear Button */}
                    <button
                        onClick={() => {
                            setSelectedImage(null);
                            // Reset the input value to allow selecting the same image again
                            const input = document.getElementById('imageUpload') as HTMLInputElement;
                            if (input) {
                                input.value = '';
                            }
                        }}
                        className="text-sm text-red-500 hover:underline"
                    >
                        Clear
                    </button>
                </div>
            )}
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

                                    console.log("BEFORE EXECUTING REQUEST"); 

                                    // Call the API to update the status
                                    const response = await fetch(`${BASE_API_URL}/task-assignment/update-status`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({ taskAssignmentId: task?.taskAssignmentId }), // Adjust based on task ID field
                                    });

                                    console.log("AFTER EXECUTING REQUEST"); 

                                    const result = await response.json();

                                    if (!response.ok) {
                                        throw new Error(result.error || 'Failed to update task status');
                                    }

                                    console.log("AFTER REQUEST STATUS REQUEST"); 

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
                        onClick={handleImageUpload}
                        disabled={
                            task?.status === "pending" || uploading
                        } // Disable if in "pending" state or upload is happening
                        className={`${
                            task?.status === "pending" || uploading
                            ? "bg-slate-400 cursor-not-allowed hover:bg-slate-400"
                            : "bg-yellow-500 hover:bg-yellow-600"
                        } text-white px-6 py-2 rounded`}
                        >
                        {uploading ? "En cour..." : "Soumettre"}
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