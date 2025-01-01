import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

import { TaskAssignmentService } from '../services/task-assignment.service';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_K,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SEC,
});

// Create the service instance
const taskAssignmentService = new TaskAssignmentService();

export async function POST(req: Request) {
    try {
        // Parse form data from the request
        const formData = await req.formData();
        const image = formData.get('image') as File | null;
        const taskAssignmentId = formData.get('taskAssignmentId') as string | null;

        console.log("AT THE ARRIVAL WE HAVE: ", image, taskAssignmentId); 

        if (!image || !taskAssignmentId) {
            return NextResponse.json(
                { message: 'File and task assignment ID are required' },
                { status: 400 }
            );
        }

        console.log("HAS PASSED THE CHECK"); 

        // // Convert the file into a temporary path
        // const arrayBuffer = await image.arrayBuffer();
        // const buffer = Buffer.from(arrayBuffer);
        // const tempFilePath = `/tmp/${image.name}`;
        // await require('fs/promises').writeFile(tempFilePath, buffer);
        // console.log(arrayBuffer, buffer, tempFilePath, "just checking===========>")

        // Upload the file to Cloudinary
        // const uploadResult = await cloudinary.uploader.upload(tempFilePath, {
        //     folder: 'task_images', 
        //     // timeout: 60000, // 60 seconds
        // });

        // console.log(uploadResult, "THE uploadResult")

        // const picture = {
        //     name: uploadResult.original_filename,
        //     public_id: uploadResult.public_id,
        //     url: uploadResult.secure_url,
        // };

        const picture = {
            name: "test",
            public_id: "vd2tug892hn2ofu2dj",
            url: "uploadResult.secure_url",
        };

        // Update task assignment in the database
        const updatedTaskAssignment = await taskAssignmentService.updateTaskAssignmentWithPicture(
            taskAssignmentId,
            picture
        );

        // await require('fs/promises').unlink(tempFilePath);

        // Respond with success
        return NextResponse.json({
            message: 'Tâche terminée avec succès',
            data: updatedTaskAssignment,
        });
    } catch (error: any) {
        console.log(error, "THE ERROR")
        return NextResponse.json({ message: error }, { status: 500 });
    }
}





// export async function POST(req: Request) {
//     try {
//         // Parse form data from the request
//         const formData = await req.formData();
//         const image = formData.get('image') as File | null;
//         const taskAssignmentId = formData.get('taskAssignmentId') as string | null;

//         console.log("AT THE ARRIVAL WE HAVE: ", image, taskAssignmentId); 

//         if (!image || !taskAssignmentId) {
//             return NextResponse.json(
//                 { message: 'File and task assignment ID are required' },
//                 { status: 400 }
//             );
//         }

//         console.log("HAS PASSED THE CHECK"); 

//         // Convert the file into a temporary path
//         const arrayBuffer = await image.arrayBuffer();
//         const buffer = Buffer.from(arrayBuffer);
//         const tempFilePath = `/tmp/${image.name}`;
//         await require('fs/promises').writeFile(tempFilePath, buffer);
//         console.log(arrayBuffer, buffer, tempFilePath, "just checking===========>")

//         // Upload the file to Cloudinary
//         const uploadResult = await cloudinary.uploader.upload(tempFilePath, {
//             folder: 'task_images', 
//             // timeout: 60000, // 60 seconds
//         });

//         console.log(uploadResult, "THE uploadResult")

//         const picture = {
//             name: uploadResult.original_filename,
//             public_id: uploadResult.public_id,
//             url: uploadResult.secure_url,
//         };

//         // Update task assignment in the database
//         const updatedTaskAssignment = await taskAssignmentService.updateTaskAssignmentWithPicture(
//             taskAssignmentId,
//             picture
//         );

//         await require('fs/promises').unlink(tempFilePath);

//         // Respond with success
//         return NextResponse.json({
//             message: 'Tâche terminée avec succès',
//             data: updatedTaskAssignment,
//         });
//     } catch (error: any) {
//         console.log(error, "THE ERROR")
//         return NextResponse.json({ message: error }, { status: 500 });
//     }
// }








// import { v2 as cloudinary } from 'cloudinary';
// import multer from 'multer';
// import { NextApiRequest } from 'next';
// import { NextResponse } from 'next/server';
// import { Readable } from 'stream';

// import { TaskAssignmentService } from '../services/task-assignment.service';

// export interface NextApiRequestWithFile extends NextApiRequest {
//   file?: Express.Multer.File; // Add the `file` property
// }

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Create the service instance
// const taskAssignmentService = new TaskAssignmentService();

// // Configure Multer in memory storage
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // Helper function to handle Multer in Next.js
// function parseFormData(req: NextApiRequestWithFile): Promise<{ buffer: Buffer; fields: { taskAssignmentId: string } }> {
//     return new Promise((resolve, reject) => {
//         const multerUpload = upload.single('file');
//         const middleware = (req_: any, res_: any, next: any) => multerUpload(req_, res_, next);
//         middleware(req as any, {} as any, (err: any) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 const file = req.file;
//                 if (!file || !file.buffer) {
//                     reject(new Error('File or file buffer not provided'));
//                 } else {
//                     const fields = { taskAssignmentId: req.body.taskAssignmentId };
//                     resolve({ buffer: file.buffer, fields });
//                 }
//             }
//         });
//     });
// }

// // POST handler
// export async function POST(req: any) {
//     try {
//         // Parse form data
//         const { buffer, fields } = await parseFormData(req);
//         const { taskAssignmentId } = fields;

//         console.log("AT THE ARRIVAL WE HAVE: ", taskAssignmentId); 
//         console.log("AT THE ARRIVAL WE HAVE: ", fields)

//         if (!taskAssignmentId) {
//             return NextResponse.json({ message: 'Task assignment ID is required' }, { status: 400 });
//         }

//         // Upload the file to Cloudinary
//         const uploadResult: any = await new Promise((resolve, reject) => {
//             const stream = cloudinary.uploader.upload_stream(
//                 { folder: 'task_images', resource_type: 'image' },
//                 (error, result) => {
//                     if (error) reject(error);
//                     else resolve(result);
//                 }
//             );
//             Readable.from(buffer).pipe(stream);
//         });

//         const picture = {
//             name: uploadResult?.original_filename,
//             public_id: uploadResult.public_id,
//             url: uploadResult.secure_url,
//         };

//         // Update task assignment in database
//         const updatedTaskAssignment = await taskAssignmentService.updateTaskAssignmentWithPicture(
//             taskAssignmentId,
//             picture
//         );

//         // Respond with success
//         return NextResponse.json({
//             message: 'Task assignment updated successfully',
//             data: updatedTaskAssignment,
//         });
//     } catch (error: any) {
//         return NextResponse.json({ message: error.message }, { status: 500 });
//     }
// }
















// import { v2 as cloudinary } from 'cloudinary';
// import { NextResponse, NextRequest } from 'next/server';
// import multer from 'multer';
// // import { TaskAssignmentService } from '@/services/task-assignment.service';
// import { Readable } from 'stream';
// import { TaskAssignmentService } from '../services/task-assignment.service';
// import { NextApiRequest } from 'next';

// export interface NextApiRequestWithFile extends NextApiRequest {
//     file?: Express.Multer.File; // Add the `file` property
// }

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Create the service instance
// const taskAssignmentService = new TaskAssignmentService();

// // Configure Multer in memory storage
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // Helper function to handle Multer in Next.js
// function parseFormData(req: NextApiRequestWithFile): Promise<{ buffer: Buffer; fields: { taskAssignmentId: string } }> {
//   return new Promise((resolve, reject) => {
//     const multerUpload = upload.single('file');
//     const middleware = (req_: any, res_: any, next: any) => multerUpload(req_, res_, next);
//     middleware(req as any, {} as any, (err: any) => {
//       if (err) {
//         reject(err);
//       } else {
//         const file = req.file;
//         if (!file) reject(new Error('File not provided'));
//         const fields = { taskAssignmentId: req.body.taskAssignmentId };
//         resolve({ buffer: file?.buffer, fields });
//       }
//     });
//   });
// }

// // POST handler
// export async function POST(req: NextRequest) {
//   try {
//     // Parse form data
//     const { buffer, fields } = await parseFormData(req);
//     const { taskAssignmentId } = fields;

//     if (!taskAssignmentId) {
//       return NextResponse.json({ message: 'Task assignment ID is required' }, { status: 400 });
//     }

//     // Upload the file to Cloudinary
//     const uploadResult: any = await new Promise((resolve, reject) => {
//       const stream = cloudinary.uploader.upload_stream(
//         { folder: 'task_images', resource_type: 'image' },
//         (error, result) => {
//           if (error) reject(error);
//           else resolve(result);
//         }
//       );
//       Readable.from(buffer).pipe(stream);
//     });

//     const picture = {
//       name: uploadResult?.original_filename,
//       public_id: uploadResult.public_id,
//       url: uploadResult.secure_url,
//     };

//     // Update task assignment in database
//     const updatedTaskAssignment = await taskAssignmentService.updateTaskAssignmentWithPicture(
//       taskAssignmentId,
//       picture
//     );

//     // Respond with success
//     return NextResponse.json({
//       message: 'Task assignment updated successfully',
//       data: updatedTaskAssignment,
//     });
//   } catch (error) {
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
// }















// import { v2 as cloudinary } from 'cloudinary';
// import multer from 'multer';
// import type {
//   NextApiRequest,
//   NextApiResponse,
// } from 'next';

// export interface NextApiRequestWithFile extends NextApiRequest {
//     file?: Express.Multer.File; // Add the `file` property
// }

// cloudinary.config({
//     cloud_name: process.env.NEXTPUBLIC_CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.NEXTPUBLIC_CLOUDINARY_API_KEY,
//     api_secret: process.env.NEXTPUBLIC_CLOUDINARY_API_SECRET,
//     // cloud_name: "dkdtowap9",
//     // api_key: "495418925199369",
//     // api_secret: "AOpFjOHadVyUoGJUV_6M27HK3oc",
// });

// const upload = multer();
// const uploadMiddleware = upload.single('image');

// export const config = {
//     api: {
//         bodyParser: false, // Disable default body parser for Multer
//     },
// };

// export default function handler(req: NextApiRequestWithFile, res: NextApiResponse) {
//     return new Promise<void>((resolve, reject) => {
//         uploadMiddleware(req as any, {} as any, async (err) => {
//             if (err) {
//                 console.error(err);
//                 return reject(res.status(500).json({ error: 'Upload failed' }));
//             }

//             try {
//                 if (!req.file) {
//                     return reject(res.status(400).json({ error: 'No file uploaded' }));
//                 }

//                 const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
//                     folder: 'video_screenshots',
//                 });

//                 res.status(200).json({
//                     message: 'Upload successful',
//                     imageUrl: uploadResponse.secure_url,
//                 });
//                 resolve();
//             } catch (uploadError) {
//                 console.error(uploadError);
//                 res.status(500).json({ error: 'Cloudinary upload failed' });
//                 reject(uploadError);
//             }
//         });
//     });
// }











// import type { NextApiRequest, NextApiResponse } from 'next';
// import { v2 as cloudinary } from 'cloudinary';


// export interface NextApiRequestWithFile extends NextApiRequest {
//     file?: Express.Multer.File; // Add the `file` property
// }

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export const config = {
//     api: {
//         bodyParser: false, // Multer handles body parsing
//     },
// };

// import multer from 'multer';
// const upload = multer();
// const uploadMiddleware = upload.single('image');

// export default function handler(req: NextApiRequestWithFile, res: NextApiResponse) {
//     return new Promise<void>((resolve, reject) => {
//         uploadMiddleware(req as any, {} as any, async (err: any) => {
//             if (err) {
//                 console.error(err);
//                 return reject(res.status(500).json({ error: 'Upload failed' }));
//             }

//             try {
//                 const file = req.file;
//                 const uploadResponse = await cloudinary.uploader.upload(file.path, {
//                     folder: 'uploads',
//                 });

//                 res.status(200).json({
//                     message: 'Upload successful',
//                     imageUrl: uploadResponse.secure_url,
//                 });
//                 resolve();
//             } catch (uploadError) {
//                 console.error(uploadError);
//                 res.status(500).json({ error: 'Cloudinary upload failed' });
//                 reject(uploadError);
//             }
//         });
//     });
// }
