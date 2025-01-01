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
import toast from 'react-hot-toast';

import useFetchTaskAssigments from '@/hooks/useFetchTaskAssigment';
import useFetchTasks from '@/hooks/useFetchTasks';
import { BASE_API_URL } from '@/lib/constants';

import LoadingSpinner from '../Loaders/LoadingSpinner';
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
    const [selectedImage, setSelectedImage] = React.useState<File | null>(null); // State for storing the selected image
    const [uploading, setUploading] = React.useState(false);
    const { refetchTasks } = useFetchTasks (); 
    const { refetchTaskAssignments } = useFetchTaskAssigments ()

    const router = useRouter ()

    const copyToClipboard = React.useCallback(async () => {
        try {
            await navigator.clipboard.writeText(task?.taskLink);
            toast.success('URL copiée dans le presse-papier!'); 
        } catch (error) {
            console.error("Failed to copy URL:", error);
            toast.error("Échec de la copie de l'URL"); 
        }
    }, [])

    const clearImage = React.useCallback(() => {
        setSelectedImage(null);
        // Reset the input value to allow selecting the same image again
        const input = document.getElementById('imageUpload') as HTMLInputElement;
        if (input) {
            input.value = '';
        }
    }, [])

    // const handleImageUpload = React.useCallback(async () => {
    //     if (!selectedImage) return;

    //     setUploading(true);

    //     const formData = new FormData();
    //     formData.append('image', selectedImage);
    //     formData.append('taskAssignmentId', task?.taskAssignmentId || ""); // Add taskAssignmentId

    //     try {
    //         const response = await fetch('/api/cloudinary-upload', {
    //             method: 'POST',
    //             body: formData,
    //         });

    //         if (!response.ok) {
    //             throw new Error('Failed to upload image');
    //         }

    //         const result = await response.json();

    //         try {
    //             await Promise.all([refetchTasks(), refetchTaskAssignments()]);
    //         } catch (error) {
    //             toast.error("Erreur lors de l'actualisation des données"); 
    //             console.error("Erreur lors de l'actualisation des données :", error);
    //         }

    //         // alert('Tâche terminée avec succès!!');
    //         clearImage (); 
    //         toast.success('Tâche terminée avec succès!!'); 
    //         console.log(result); // Contains the server response
    //     } catch (error) {
    //         console.error(error);
    //         // alert('Error uploading image');
    //     } finally {
    //         setUploading(false);
    //     }
    // }, [])

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

            // console.log(response, "yyyyyyyyyyy")
            if (!response.ok) {
                const res = await response.json(); 
                console.log(res, "yyyyyyresyyyyy"); 
                throw new Error('Failed to upload image'); 
            }

            const result = await response.json();

            console.log(result, "this is the result=======>")

            try {
                await Promise.all([refetchTasks(), refetchTaskAssignments()]);
            } catch (error) {
                toast.error("Erreur lors de l'actualisation des données"); 
                console.error("Erreur lors de l'actualisation des données :", error);
            }

            // alert('Tâche terminée avec succès!!');
            clearImage (); 
            toast.success('Tâche terminée avec succès!!'); 
            console.log(result); // Contains the server response
        } catch (error) {
            console.error(error);
            toast.error(`${error}`)
            // alert('Error uploading image');
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

                <div className="flex flex-col items-start gap-3 justify-between">
                    <div className="text-xl font-bold text-red-500">XOF : {task?.packageId?.priceEarnedPerTaskDone }</div>
                    { task?.status === "completed" ? 
                        null
                        :
                        <div className="flex items-center space-x-2">
                            <label
                                htmlFor="imageUpload"
                                className={`flex items-center justify-between cursor-pointer`}
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
                                <span className="text-sm ml-3 font-medium text-gray-600 truncate">Télécharger une image</span>
                            </label>
                        </div>
                    }
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
                        onClick={ clearImage }
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
                                        toast.error("Échec de la mise à jour de l'état de la tâche")
                                        throw new Error(result.error || 'Failed to update task status');
                                    }

                                    console.log("AFTER REQUEST STATUS REQUEST"); 

                                    // alert('Task status updated to in-progress');
                                    // onRefresh(); // Trigger refresh after toggling
                                    try {
                                        await Promise.all([refetchTasks(), refetchTaskAssignments()]);
                                    } catch (error) {
                                        console.error("Error refreshing data:", error);
                                    }
                                    toast.success("Statut de la tâche mis à jour comme étant en cours")
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
                            variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-700"
                        >
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
                    {
                        task?.status === "completed" ? 
                            <Button
                                onClick={handleImageUpload}
                                disabled={true} // Disable if in "pending" state or upload is happening
                                className={`bg-slate-400 cursor-not-allowed hover:bg-slate-400 text-white px-6 py-2 rounded`}
                                >
                                Tâche accomplie
                            </Button>
                            :
                            <Button
                                onClick={handleImageUpload}
                                disabled={
                                    task?.status === "pending" || uploading || task?.status === "in-progress" && !selectedImage ? true : false
                                } // Disable if in "pending" state or upload is happening
                                className={`${
                                    task?.status === "pending" || uploading || task?.status === "in-progress" && !selectedImage
                                    ? "bg-slate-400 cursor-not-allowed hover:bg-slate-400"
                                    : "bg-yellow-500 hover:bg-yellow-600"
                                } text-white px-6 py-2 rounded`}
                                >
                                {task?.status === "pending" ? "Cliquez le lien" : uploading ? (<LoadingSpinner />) : task?.status === "in-progress" && !selectedImage ? "Selectionner image" : "Soumettre"}
                            </Button>
                    }
                </div>
            </CardFooter>
        </Card>
    );
};

export default TaskDetailCard;




















// {
//     "message": "Tâche terminée avec succès",
//     "data": {
//         "picture": {
//             "name": "Screenshot from 2024-12-29 04-07-19",
//             "public_id": "task_images/utdl4oudem8mridxp1iw",
//             "url": "https://res.cloudinary.com/dkdtowap9/image/upload/v1735442553/task_images/utdl4oudem8mridxp1iw.png"
//         },
//         "_id": "6770aee140265ff84925ee28",
//         "user": "676ed1e9c3d355b932b6e626",
//         "task": {
//             "_id": "675d8d2d754f14b62aa05831",
//             "taskTitle": "Join Online Forum",
//             "taskMission": "Register & Post",
//             "taskShortInstruction": "Demande: Rejoignez le forum et postez un message",
//             "taskDescription": "Créez un compte sur le forum, publiez un message dans une section pertinente, puis capturez une preuve.",
//             "taskLink": "https://www.youtube.com/watch?v=t8kyljswKrk",
//             "taskCategory": "video",
//             "imageUrl": null,
//             "taskStatus": "unassigned",
//             "assignedTo": [],
//             "completedBy": [],
//             "packageId": {
//                 "_id": "6755d9705e0073d8be0b1461",
//                 "name": "Agent Eco niveau 0",
//                 "level": 0,
//                 "inverstment": 1,
//                 "numberOfTaskPerDay": 5,
//                 "priceEarnedPerTaskDone": 80,
//                 "priceEarnedForAllTaskDonePerDay": 480,
//                 "priceEarnedForAllTaskDonePerMonth": 1,
//                 "priceEarnedForAllTaskDonePerYear": 1,
//                 "description": "",
//                 "createdAt": "2024-12-08T17:37:52.427Z",
//                 "updatedAt": "2024-12-14T13:52:08.208Z",
//                 "__v": 8,
//                 "listOfTasks": [
//                     "675d8cd3754f14b62aa0582d",
//                     "675d8d2d754f14b62aa05831",
//                     "675d8d36754f14b62aa05835",
//                     "675d8d40754f14b62aa05839",
//                     "675d8d52754f14b62aa0583d",
//                     "675d8d73754f14b62aa05841",
//                     "675d8d7d754f14b62aa05845",
//                     "675d8d87754f14b62aa05849"
//                 ]
//             },
//             "createdAt": "2024-12-14T13:50:37.405Z",
//             "updatedAt": "2024-12-14T13:50:37.405Z",
//             "__v": 0
//         },
//         "status": "completed",
//         "createdAt": "2024-12-29T02:07:29.498Z",
//         "updatedAt": "2024-12-29T03:22:34.391Z",
//         "__v": 0,
//         "startTime": "Sun Dec 29 2024 04:21:23 GMT+0100 (West Africa Standard Time)",
//         "endTime": "Sun Dec 29 2024 04:22:34 GMT+0100 (West Africa Standard Time)"
//     }
// }












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