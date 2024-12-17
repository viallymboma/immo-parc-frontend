import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import {
  TaskDataType,
  tasks,
} from '@/components/common/backbone/other_component/data';
// import { useUserInfo } from '@/hooks/useUserInfo';
import { BASE_API_URL } from '@/lib/constants';

interface TaskState {
  tasks_: TaskDataType[]; // Store the list of tasks
  selectedTask: TaskDataType | null; // Store the currently selected task
  selectedTasks: TaskDataType[]; // Array of selected tasks
  selectedCategory?: string; // Array of selected tasks
  filteredTasks?: TaskDataType[]; // Array of selected tasks
  setTasks: (tasks_: TaskDataType[]) => void; // Load all tasks
  toggleTaskSelection: (id: number | string, numberOfTaskPerDay: number) => void; // Add or remove a task from the selection
  toggleCategory: (category: string) => void 
  clearTaskSelection: () => void; // Clear all selected tasks
  selectTask: (id: number | string) => void; // Select a specific task by ID
  submitTask: () => void; // Mark the selected task as submitted
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => {
      return ({
        tasks_: tasks, // Initialize tasks
        filteredTasks: get()?.filteredTasks || [], // Initialize filteredtasks
        selectedTask: null, // No task selected by default
        selectedTasks: get()?.selectedTasks || [], // Array of selected tasks

        // Load all tasks
        setTasks: (tasks) =>
          set((state) => {
            // Get selectedTasks from the current state if any selectedTasks from our persistant
            const selectedTaskIds = state.selectedTasks.map((task) => task._id);

            return {
              tasks_: tasks.map((task) => ({
                ...task,
                isSelected: selectedTaskIds.includes(task._id) || task.isSelected || false, // Mark as selected if in selectedTasks
              })),
            };
          }),

        // Select a specific task by ID
        selectTask: (id) =>
          set((state) => ({
            selectedTask: state.tasks_.find((task) => task._id === id) || null,
            tasks_: state.tasks_.map((task) =>
              task._id === id ? { ...task, isSelected: true } : { ...task, isSelected: false }
            ),
          })),

        // Add or remove a task from the selection
        toggleTaskSelection: (id, maxTasks) =>
          set((state) => {
            const taskIndex = state.tasks_.findIndex((task) => task._id === id);
            if (taskIndex === -1) return state; // Task not found

            const task = state.tasks_[taskIndex];
            const isSelected = !task.isSelected;

            console.log(state.selectedTasks, "hellooooouuuuuuu")

            // Check the limit
            if (isSelected && (state.selectedTasks.length || get().selectedTasks.length) >= maxTasks) {
              alert(`You can only select up to ${maxTasks} tasks per day.`);
              return state;
            }

            // Update task selection
            const updatedTasks = state.tasks_.map((t) =>
              t._id === id ? { ...t, isSelected } : t
            );

            const updatedSelectedTasks = isSelected
              ? [...state.selectedTasks, { ...task, isSelected }]
              : state.selectedTasks.filter((t) => t._id !== id);

            return { tasks_: updatedTasks, selectedTasks: updatedSelectedTasks };
          }),

        // Fetch tasks from server
        setTasksFromServer: async () => {
          try {
            const response = await fetch(`${BASE_API_URL}/tasks/users-tasks`); // Replace with your API endpoint
            if (!response.ok) {
              throw new Error('Failed to fetch tasks');
            }
            const tasks: TaskDataType[] = await response.json();
            set({
              tasks_: tasks.map((task) => ({
                ...task,
                isSelected: false, // Ensure a clean slate for selections
              })),
              filteredTasks: tasks, // Sync filtered tasks with the fetched tasks
            });
          } catch (error) {
            console.error('Error fetching tasks:', error);
          }
        },

        // Add or remove a task from the selection
        toggleCategory: (category: string) =>
          set((state) => {
            let updatedSelectedTasks = state?.selectedTasks?.filter((task) => task?.taskStatus === category);
            if (category === "Toutes") {
              updatedSelectedTasks = state?.tasks_
            }
            // console.log(updatedSelectedTasks, "jjjjjjjjjj"); 
            return { ...state, filteredTasks: updatedSelectedTasks, selectedCategory: category };
          }),

        // Clear all selected tasks
        clearTaskSelection: () =>
          set((state) => ({
            tasks_: state.tasks_.map((task) => ({ ...task, isSelected: false })),
            selectedTasks: [],
          })),

        // Mark the selected task as submitted
        submitTask: () =>
          set((state) => {
            if (!state.selectedTask) return state;
            const updatedTasks = state.tasks_.map((task) =>
              task.id === state.selectedTask!.id
                ? { ...task, taskStatus: 'submitted' }
                : task
            );
            return {
              tasks_: updatedTasks,
              selectedTask: {
                ...state.selectedTask,
                taskStatus: 'submitted',
                isSelected: false, // Optionally deselect after submission
              },
            };
          }),
    })},
    {
      name: 'task-store', // Name for localStorage key
      partialize: (state) => ({ 
        // tasks_: state.tasks_, 
        // selectedTasks: state.selectedTasks 
        tasks_: state.tasks_,
        selectedTasks: state.selectedTasks,
        selectedCategory: state.selectedCategory,
        filteredTasks: state.filteredTasks,
      }), // Only persist relevant state
    }
  )
);














// CODE WITHOUT PERSISTANCE
// import { create } from 'zustand';

// import {
//   TaskDataType,
//   tasks,
// } from '@/components/common/backbone/other_component/data';

// interface TaskState {
//   tasks_: TaskDataType[]; // Store the list of tasks
//   selectedTask: TaskDataType | null; // Store the currently selected task
//   selectedTasks: TaskDataType[]; // Array of selected tasks
//   setTasks: (tasks_: TaskDataType[]) => void; // Load all tasks
//   toggleTaskSelection: (id: number) => void; // Add or remove a task from the selection
//   clearTaskSelection: () => void; // Clear all selected tasks
//   selectTask: (id: number) => void; // Select a specific task by ID
//   submitTask: () => void; // Mark the selected task as submitted
// }

// export const useTaskStore = create<TaskState>((set) => ({
//   tasks_: tasks, // Initialize tasks as an empty array
//   selectedTask: null, // No task selected by default
//   selectedTasks: [], // Array of selected tasks

//   // Load all tasks
//   setTasks: (tasks) =>
//     set({
//       tasks_: tasks.map((task) => ({
//         ...task,
//         isSelected: task.isSelected ?? false, // Default to false if not set
//       })),
//     }),

//   // Select a specific task by ID
//   selectTask: (id) =>
//     set((state) => ({
//       selectedTask: state.tasks_.find((task) => task.id === id) || null,
//       tasks: state.tasks_.map((task) =>
//         task.id === id ? { ...task, isSelected: true } : { ...task, isSelected: false }
//       ),
//     })),

//   // Add or remove a task from the selection
//   toggleTaskSelection: (id) =>
//     set((state) => {
//       const updatedTasks = state.tasks_.map((task) => task.id === id ? 
//         { ...task, isSelected: !task.isSelected }
//         : 
//         task
//       );

//       const updatedSelectedTasks = updatedTasks.filter((task) => task.isSelected);
//       // console.log(updatedTasks, updatedSelectedTasks, "pppoooiiiuuuyyytttrrreeewwwqqq")

//       return { tasks_: updatedTasks, selectedTasks: updatedSelectedTasks };
//     }),


//   // Clear all selected tasks
//   clearTaskSelection: () =>
//     set((state) => ({
//       tasks: state.tasks_.map((task) => ({ ...task, isSelected: false })),
//       selectedTasks: [],
//     })),

//   // Mark the selected task as submitted
//   submitTask: () =>
//     set((state) => {
//       if (!state.selectedTask) return state;
//       const updatedTasks = state.tasks_.map((task) =>
//         task.id === state.selectedTask!.id
//           ? { ...task, taskStatus: "submitted" }
//           : task
//       );
//       return {
//         tasks: updatedTasks,
//         selectedTask: {
//           ...state.selectedTask,
//           taskStatus: "submitted",
//           isSelected: false, // Optionally deselect after submission
//         },
//       };
//     }),
// }));














// interface TaskDataType {
//   id: string | number;
//   taskTitle: string;
//   taskMission: string; 
//   taskDescription: string;
//   taskRemuneration: number;
//   taskShortInstruction: string;
//   taskCategory?: string; 
//   taskLink: string;
//   taskStatus: string;
//   imageUrl?: string | null;
//   createdAt?: string; // Optional field
//   isSubmitted: boolean;
//   submitTask?: () => void;
// }



// export const useTaskStore = create<TaskState>((set) => ({
//   tasks: [], // Initialize tasks as an empty array
//   selectedTask: null, // No task selected by default
//   selectedTasks: [], // Array of selected tasks

//   // Load all tasks
//   setTasks: (tasks) => set({ tasks }),

//   // Select a specific task by ID
//   selectTask: (id) =>
//     set((state: TaskState) => ({
//       selectedTask: state.tasks.find((task: TaskDataType) => task?.id === id) || null,
//     })),

//   // Add or remove a task from the selection
//   toggleTaskSelection: (id) =>
//     set((state: TaskState) => {
//       const task = state?.tasks.find((task: TaskDataType) => task?.id === id);
//       if (!task) return state;

//       const isSelected = state?.selectedTasks.some((selectedTask) => selectedTask?.id === id);

//       // Add the task if it's not already selected, otherwise remove it
//       const updatedSelection = isSelected
//         ? state?.selectedTasks.filter((selectedTask) => selectedTask.id !== id)
//         : [...state?.selectedTasks, task];

//       return { selectedTasks: updatedSelection };
//     }),

//   // Clear all selected tasks
//   clearTaskSelection: () => set({ selectedTasks: [] }),

//   // Mark the selected task as submitted
//   submitTask: () =>
//     set((state) => {
//       if (!state.selectedTask) return state;
//       const updatedTasks = state.tasks.map((task) =>
//         task.id === state.selectedTask!.id
//           ? { ...task, taskStatus: "submitted" }
//           : task
//       );
//       return { tasks: updatedTasks, selectedTask: { ...state.selectedTask, taskStatus: "submitted" } };
//     }),
// }));



  // toggleTaskSelection: (id) =>
  //   set((state) => {
  //     console.log(state.tasks_, "lllllllll")
  //     const taskIndex = state.tasks_.findIndex((task) => task.id === id);
  //     if (taskIndex === -1) return state;
  //     console.log(taskIndex, "lllltaskIndexlllll")

  //     const updatedTasks = [...state.tasks_];
  //     const task = updatedTasks[taskIndex];

  //     updatedTasks[taskIndex] = {
  //       ...task,
  //       isSelected: !task.isSelected,
  //     };
  //     console.log(updatedTasks, "iibue")

  //     const updatedSelectedTasks = task.isSelected
  //       ? state.selectedTasks.filter((selectedTask) => selectedTask.id !== id)
  //       : [...state.selectedTasks, task];
  //     console.log(updatedSelectedTasks, "ejrfnjrfio")

  //     return { tasks: updatedTasks, selectedTasks: updatedSelectedTasks };
  //   }),


// import { create } from 'zustand';

// interface TaskState {
//   taskId: string;
//   title: string;
//   description: string;
//   xofPoints: number;
//   createdAt: string;
//   imageUrl: string | null;
//   isSubmitted: boolean;
//   submitTask: () => void;
//   setTaskDetails: (details: Partial<TaskState>) => void;
// }

// export const useTaskStore = create<TaskState>((set) => ({
//   taskId: '',
//   title: 'YouTubeExigences de la tâche : Regardez la vidéo Aimez et abonnez-vous',
//   description: '(Téléchargez des images de tâches en fonction du processus de tâche.)',
//   xofPoints: 800,
//   createdAt: '2024.11.20-01:12:01',
//   imageUrl: null,
//   isSubmitted: false,
//   submitTask: () => set({ isSubmitted: true }),
//   setTaskDetails: (details) => set((state) => ({ ...state, ...details })),
// }));