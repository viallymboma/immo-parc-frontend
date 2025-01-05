import toast from 'react-hot-toast';
// "use client";
import { create } from 'zustand';

import {
  TaskDataType,
  tasks,
  TransactionType,
  UserProspectType,
} from '@/components/common/backbone/other_component/data';
// import { useUserInfo } from '@/hooks/useUserInfo';
import { BASE_API_URL } from '@/lib/constants';

interface TaskState {
  tasks_: TaskDataType[]; // Store the list of tasks
  selectedTask: TaskDataType | null; // Store the currently selected task
  selectedTasks: TaskDataType[]; // Array of selected tasks
  selectedCategory?: string; // Array of selected tasks
  filteredTasks?: TaskDataType[]; // Array of selected tasks
  filteredTasksFromBackend?: TaskDataType[]; // Array of selected tasks
  allSelecTasksForUsers?: TaskDataType[];
  taskPage?: number; 
  tasksNumberPerPage?: number; 
  totalEarnings?: number, 
  totalEarningsToday?: number, 
  completedTasks?: TaskDataType[], 
  todayCompletedTasks?: TaskDataType[], 
  packageAmounts?: any, 
  walletBalance?: number;
  selectedPackageAmounts?: any, 
  totalRechargeInStore?: number, 
  totalWithdrawalInStore?: number, 
  totalEarningsInStore?: number, 
  totalInvestmentInStore?: number, 
  packagesInStore: any [], 
  allEarningTransactionsInStore: TransactionType [], 
  allFundingTransactionsInStore: TransactionType [], 
  allWithdrawalTransactionsInStore: TransactionType [], 
  allInvestmentTransactionsInStore: TransactionType [], 
  loggedInUserFamilyTreeInStore: UserProspectType, 
  setEarningTransactionsInStore: (allEarningTransactionsInStore: any []) => void; 
  setFundingTransactionsInStore: (allFundingTransactionsInStore: any []) => void; 
  setWithdrawalTransactionsInStore: (allWithdrawalTransactionsInStore: any []) => void; 
  setInvestmentTransactionsInStore: (allInvestmentTransactionsInStore: any []) => void; 
  setTasks: (tasks_: TaskDataType[]) => void; // Load all tasks
  toggleTaskSelection: (id: number | string, numberOfTaskPerDay: number) => void; // Add or remove a task from the selection
  toggleTaskSelectionV2: (id: number | string, numberOfTaskPerDay: number, userId: string) => void; // Add or remove a task from the selection
  setSelectedTaskFromBack: (filteredTasks: TaskDataType) => void;
  setPackageAmountsFromBack: (packageAmounts: any []) => void; 
  setSelectedPackageAmount?: (selectedPackageAmounts: number) => void; 
  setWalletBalance: (walletBalance: number) => void; 
  setTotalRechargeInStore: (totalRechargeInStore: number) => void; 
  setTotalWithdrawalInStore: (totalWithdrawalInStore: number) => void; 
  setTotalEarningsInStore: (totalEarningsInStore: number) => void; 
  setTotalInvestmentInStore: (totalInvestmentInStore: number) => void; 
  setPackagesInStore: (packagesInStore: TransactionType []) => void; 
  setLoggedInUserFamilyTreeInStore: (loggedInUserFamilyTreeInStore: UserProspectType) => void; 
  
  setAllSelectedTaskFromBack: ({ 
    allSelecTasksForUsers, 
    completedTasks, 
    todayCompletedTasks, totalEarnings, totalEarningsToday }: { 
      allSelecTasksForUsers?: TaskDataType, 
      completedTasks?: TaskDataType, 
      todayCompletedTasks?: TaskDataType, 
      totalEarnings?: number, 
      totalEarningsToday?: number, 
    }) => void;
  toggleCategory: (category: string, taskAssignment: TaskDataType[]) => void; 
  clearTaskSelection: () => void; // Clear all selected tasks
  setTaskNumberAndPage: (taskPage: number, tasksNumberPerPagetaskPage: number) => void; 
  selectTask: (id: number | string) => void; // Select a specific task by ID
  submitTask: () => void; // Mark the selected task as submitted
}

export const useTaskStore = create<TaskState>((set, get) => {
  return ({
    tasks_: tasks, // Initialize tasks
    filteredTasks: get()?.filteredTasks || [], // Initialize filteredtasks
    selectedTask: null, // No task selected by default
    selectedTasks: get()?.selectedTasks || [], // Array of selected tasks
    filteredTasksFromBackend: get()?.filteredTasksFromBackend || [],
    allSelecTasksForUsers: get()?.allSelecTasksForUsers || [],
    taskPage: 1, 
    tasksNumberPerPage: 10, 
    completedTasks: get()?.completedTasks || [], 
    todayCompletedTasks: get()?.todayCompletedTasks || [], 
    totalEarnings: get()?.totalEarnings || 0, 
    totalEarningsToday: get()?.totalEarningsToday || 0, 
    packageAmounts: get()?.packageAmounts || 0, 
    selectedPackageAmounts: get()?.selectedPackageAmounts || 0,
    walletBalance: get()?.walletBalance || 0,
    totalRechargeInStore: get()?.totalRechargeInStore || 0,
    totalWithdrawalInStore: get()?.totalWithdrawalInStore || 0,
    packagesInStore: get()?.packagesInStore || [], 
    totalEarningsInStore: get()?.totalEarningsInStore || 0, 
    totalInvestmentInStore: get()?.totalInvestmentInStore || 0,

    allEarningTransactionsInStore: get()?.allEarningTransactionsInStore || [], 
    allFundingTransactionsInStore: get()?.allFundingTransactionsInStore || [], 
    allWithdrawalTransactionsInStore: get()?.allWithdrawalTransactionsInStore || [], 
    allInvestmentTransactionsInStore: get()?.allInvestmentTransactionsInStore || [], 

    loggedInUserFamilyTreeInStore: get()?.loggedInUserFamilyTreeInStore || [], 

    setEarningTransactionsInStore: (allEarningTransactionsInStore: TransactionType []) =>
      set((state) => {
        return {
          ...state,
          allEarningTransactionsInStore, 
        };
      }), 

    setLoggedInUserFamilyTreeInStore: (loggedInUserFamilyTreeInStore: UserProspectType) =>
      set((state) => {
        return {
          ...state,
          loggedInUserFamilyTreeInStore, 
        };
      }),
    
    setFundingTransactionsInStore: (allFundingTransactionsInStore: TransactionType []) =>
      set((state) => {
        return {
          ...state,
          allFundingTransactionsInStore, 
        };
      }),

    setWithdrawalTransactionsInStore: (allWithdrawalTransactionsInStore: TransactionType []) =>
      set((state) => {
        return {
          ...state,
          allWithdrawalTransactionsInStore, 
        };
      }),

    setInvestmentTransactionsInStore: (allInvestmentTransactionsInStore: TransactionType []) =>
      set((state) => {
        return {
          ...state,
          allInvestmentTransactionsInStore, 
        };
      }),

    setTotalInvestmentInStore: (totalInvestmentInStore: number) =>
      set((state) => {
        return {
          ...state,
          totalInvestmentInStore, 
        };
      }),

    setTotalEarningsInStore: (totalEarningsInStore: number) =>
      set((state) => {
        return {
          ...state,
          totalEarningsInStore, 
        };
      }),

    setPackagesInStore: (packagesInStore: any []) =>
      set((state) => {
        return {
          ...state,
          packagesInStore, 
        };
      }),

    setTotalRechargeInStore: (totalRechargeInStore: number) =>
      set((state) => {
        return {
          ...state,
          totalRechargeInStore, 
        };
      }),

    setTotalWithdrawalInStore: (totalWithdrawalInStore: number) =>
      set((state) => {
        return {
          ...state,
          totalWithdrawalInStore, 
        };
      }),

    setWalletBalance: (walletBalance: number) =>
      set((state) => {
        return {
          ...state,
          walletBalance, 
        };
      }),

    setPackageAmountsFromBack: (packageAmounts: any []) =>
      set((state) => {
        return {
          ...state,
          packageAmounts, 
        };
      }),

    setSelectedPackageAmount: (selectedPackageAmounts: number) =>
      set((state) => {
        return {
          ...state,
          selectedPackageAmounts, 
        };
      }),

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

    // Load all tasks
    setTaskNumberAndPage: (taskPage, tasksNumberPerPagetaskPage) =>
      set((state) => {
        return {
          ...state,
          taskPage,
          tasksNumberPerPagetaskPage,
        };
      }),

    // NOT USED
    refetchTasks: async () => {
      try {
        const response = await fetch(`${BASE_API_URL}/tasks`);
        const tasks = await response.json();
        set((state) => ({
          ...state,
          tasks_: tasks.map((task: TaskDataType) => ({
            ...task,
            isSelected: state.tasks_.find((t) => t._id === task._id)?.isSelected || false,
          })),
        }));
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },

    // Load all tasks
    setSelectedTaskFromBack: (filteredTasksFromBackend: any) =>
      set((state) => {
        return {
          ...state,
          filteredTasksFromBackend,
          filteredTasks: filteredTasksFromBackend, 
        };
      }),

    setAllSelectedTaskFromBack: ({ 
      allSelecTasksForUsers, 
      completedTasks, 
      todayCompletedTasks, totalEarnings, totalEarningsToday }: any) =>
      set((state) => {
        return {
          ...state, 
          allSelecTasksForUsers, 
          completedTasks, 
          todayCompletedTasks, 
          totalEarnings, 
          totalEarningsToday, 
          // filteredTasks: allSelecTasksForUsers, 
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

    toggleTaskSelectionV2: async (id: any, maxTasks: any, userId: any) => {

      const { filteredTasksFromBackend } = get();

      // Safely determine the source of tasks
      let taskSource = 
        filteredTasksFromBackend && filteredTasksFromBackend.length > 0
          ? filteredTasksFromBackend
          : get().tasks_;

      if (!taskSource || taskSource.length === 0) {
        console.log("Task source is undefined or empty.");
        return;
      }

      let taskIndex = taskSource.findIndex((task) => task?._id === id);

      if (taskIndex === -1) {
        console.log("Task not found in the first source. Trying fallback source");
        taskSource = get().tasks_;
        taskIndex = taskSource.findIndex((task) => task?._id === id);
        if (taskIndex === -1) {
          console.log("Task not found in the source.");
          return;
        }
      }

      const task = taskSource[taskIndex];

      if (!task) {
        console.log("Task is undefined.");
        return;
      }

      let isSelected = false

      // Check for the `status` property
      if (typeof task.status !== "undefined") {
        // Perform unassignment logic if status exists and is "pending"
        if (task.status === "pending") {
          // Unassignment is allowed
          isSelected = false
        } else {
          // Cannot unassign non-pending tasks
          toast.error(`Vous ne pouvez pas désélectionner une tâche déjà en cours.`);
          return;
        }
      } else if (typeof task.isSelected !== "undefined") {
        // Perform selection/assignment logic if `isSelected` exists
        isSelected = !task.isSelected;
      }

      // Check the maxTasks limit
      if (isSelected && get().selectedTasks?.length >= maxTasks) {
        toast.error(`Vous ne pouvez sélectionner que jusqu'à ${maxTasks} tâches par jour.`);
        return;
      }

      try {
        const endpoint = isSelected
          ? `${BASE_API_URL}/task-assignment/assign`
          : `${BASE_API_URL}/task-assignment/unassign`;
        const method = isSelected ? 'POST' : 'DELETE';
  
        // Assign or unassign task via API call
        const data = await fetch(endpoint, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, taskId: id }),
        });

        const response = await data?.json();

        if (!data.ok) {
          toast.error(`${response?.error}`);
          throw new Error('API request failed');
        } else {
          toast.success(`${response?.message}`);
        }

        // Update state after successful API call
        set((state) => {
          const updateTaskSelection = (tasks: any[]) =>
            tasks.map((t) =>
              t._id === id ? { ...t, isSelected } : t
            );

          const updateTaskSelection2 = (tasks: any[]) =>
            isSelected
              ? tasks.map((t) =>
                  t._id === id ? { ...t, isSelected } : t
                )
              : tasks?.filter((t) => t._id !== id);

          const updatedTasks = updateTaskSelection(state.tasks_);
          const updatedFilteredTasks = updateTaskSelection2(state?.filteredTasks || []);
          const updatedFilteredTasksFromBackend = updateTaskSelection2(
            state?.filteredTasksFromBackend || []
          );

          const updatedSelectedTasks = isSelected
            ? [...(state.selectedTasks || []), { ...task, isSelected }]
            : (state.selectedTasks || []).filter((t) => t._id !== id);

          return {
            tasks_: updatedTasks,
            filteredTasks: updatedFilteredTasks,
            filteredTasksFromBackend: updatedFilteredTasksFromBackend,
            selectedTasks: updatedSelectedTasks,
          };
        });
      } catch (error: any) {
        console.error(error.message);
        toast.error(`Échec de la mise à jour de la sélection de tâches. Veuillez réessayer.`);
      }
    },


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
    toggleCategory: (category: string, taskAssignment: TaskDataType[]) =>
      set((state) => {
        console.log("state?.filteredTasks", state?.filteredTasks, category)
        let updatedSelectedTasks = state?.filteredTasksFromBackend?.filter((task) => task?.status === category);
        if (category === "Toutes") {
          updatedSelectedTasks = state?.filteredTasksFromBackend!
        }
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
})});
































    // toggleTaskSelectionV2: async (id: any, maxTasks: any, userId: any) => {
    //   const { filteredTasksFromBackend } = get();
    //   const taskIndex = get().tasks_.findIndex((task) => task._id === id);
    //   if (taskIndex === -1) return; // Task not found

    //   const task = get().tasks_[taskIndex];
    //   const isSelected = !task.isSelected;

    //   // Check if this task exist in the assigned task and if it is already in-progress
    //   const checkIfTaskInProgress = filteredTasksFromBackend?.filter((t) => t._id === id && t.status !== "pending");

    //   console.log(checkIfTaskInProgress, "okay")

    //   if (checkIfTaskInProgress && checkIfTaskInProgress?.length > 0) {
    //     // alert(`Vous ne pouvez pas deselectionner une tache deja en cour.`);
    //     toast.error(`Vous ne pouvez pas désélectionner une tâche deja en cour.`)
    //     return
    //   }
    
    //   // Check the maxTasks limit
    //   if (isSelected && get().selectedTasks.length >= maxTasks) {
    //     // alert(`You can only select up to ${maxTasks} tasks per day.`);
    //     toast.error(`Vous ne pouvez sélectionner que jusqu'à ${maxTasks} tâches par jour.`)
    //     return;
    //   }

    //   try {
    //     const endpoint = isSelected
    //       ? `${BASE_API_URL}/task-assignment/assign`
    //       : `${BASE_API_URL}/task-assignment/unassign`;
    //     const method = isSelected ? 'POST' : 'DELETE';

    //     // Assign or unassign task via API call
    //     const data = await fetch(endpoint, {
    //       method,
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({ userId, taskId: id }),
    //     });

    //     const response = await data?.json()

    //     if (!data.ok){ 
    //       toast.error(`${response?.error}`)
    //       // alert(response?.error)
    //       throw new Error('API request failed'); 
    //     } else {
    //       toast.success(`${response?.message}`)
    //       // alert(response?.message)
    //     };

    //     // Update state after successful API call
    //     set((state) => {
    //       const updateTaskSelection = (tasks: any[]) =>
    //         tasks.map((t) =>
    //           t._id === id ? { ...t, isSelected } : t
    //         );
    //       const updateTaskSelection2 = (tasks: any[]) => isSelected ? 
    //         tasks.map((t) =>
    //           t._id === id ? { ...t, isSelected } : t
    //         ) : 
    //         tasks?.filter((t) => t._id !== id);

    //       const updatedTasks = updateTaskSelection(state.tasks_);
    //       const updatedFilteredTasks = updateTaskSelection2(state?.filteredTasks!);
    //       const updatedFilteredTasksFromBackend = updateTaskSelection2(
    //         state?.filteredTasksFromBackend!
    //       );

    //       const updatedSelectedTasks = isSelected
    //         ? [...state.selectedTasks, { ...task, isSelected }]
    //         : state.selectedTasks.filter((t) => t._id !== id);

    //       return {
    //         tasks_: updatedTasks,
    //         filteredTasks: updatedFilteredTasks,
    //         filteredTasksFromBackend: updatedFilteredTasksFromBackend,
    //         selectedTasks: updatedSelectedTasks,
    //       };
    //     });
    //   } catch (error: any) {
    //     console.error(error.message);
    //     // alert('Failed to update task selection. Please try again.');
    //     toast.error(`Échec de la mise à jour de la sélection de tâches. Veuillez réessayer.`)
    //   }
    // },
    


    // Add or remove a task from the selection
    
    
    // toggleTaskSelectionV2: async (id: any, maxTasks: any, userId: any) => {
    //   const { filteredTasksFromBackend } = get();
    //   const taskIndex = get().tasks_.findIndex((task) => task._id === id);
    //   if (taskIndex === -1) return; // Task not found
      
    //   const task = get().tasks_[taskIndex];
    //   console.log(task, "in zustang, ===========>")
      
    //   // Check if `isSelected` exists
    //   const isSelected = typeof task.isSelected !== "undefined" ? !task.isSelected : false;
    
    //   // If `isSelected` exists, perform assignment logic
    //   if (typeof task.isSelected !== "undefined") {
    //     // Check the maxTasks limit
    //     if (isSelected && get().selectedTasks.length >= maxTasks) {
    //       toast.error(`Vous ne pouvez sélectionner que jusqu'à ${maxTasks} tâches par jour.`);
    //       return;
    //     }
    //   } 
    //   // If `task.exist` and `status === "pending"`, perform unassignment logic
    //   else if (task.status === "pending") {
    //     // Allow unassignment
    //   } else {
    //     // Invalid condition: cannot perform unassignment for non-pending tasks
    //     toast.error(`Vous ne pouvez pas désélectionner une tâche déjà en cours.`);
    //     return;
    //   }
    
    //   try {
    //     const endpoint = isSelected
    //       ? `${BASE_API_URL}/task-assignment/assign`
    //       : `${BASE_API_URL}/task-assignment/unassign`;
    //     const method = isSelected ? 'POST' : 'DELETE';
    
    //     // Assign or unassign task via API call
    //     const data = await fetch(endpoint, {
    //       method,
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({ userId, taskId: id }),
    //     });
    
    //     const response = await data?.json();
    
    //     if (!data.ok) {
    //       toast.error(`${response?.error}`);
    //       throw new Error('API request failed');
    //     } else {
    //       toast.success(`${response?.message}`);
    //     }
    
    //     // Update state after successful API call
    //     set((state) => {
    //       const updateTaskSelection = (tasks: any[]) =>
    //         tasks.map((t) =>
    //           t._id === id ? { ...t, isSelected } : t
    //         );
    
    //       const updateTaskSelection2 = (tasks: any[]) =>
    //         isSelected
    //           ? tasks.map((t) =>
    //               t._id === id ? { ...t, isSelected } : t
    //             )
    //           : tasks?.filter((t) => t._id !== id);
    
    //       const updatedTasks = updateTaskSelection(state.tasks_);
    //       const updatedFilteredTasks = updateTaskSelection2(state?.filteredTasks!);
    //       const updatedFilteredTasksFromBackend = updateTaskSelection2(
    //         state?.filteredTasksFromBackend!
    //       );
    
    //       const updatedSelectedTasks = isSelected
    //         ? [...state.selectedTasks, { ...task, isSelected }]
    //         : state.selectedTasks.filter((t) => t._id !== id);
    
    //       return {
    //         tasks_: updatedTasks,
    //         filteredTasks: updatedFilteredTasks,
    //         filteredTasksFromBackend: updatedFilteredTasksFromBackend,
    //         selectedTasks: updatedSelectedTasks,
    //       };
    //     });
    //   } catch (error: any) {
    //     console.error(error.message);
    //     toast.error(`Échec de la mise à jour de la sélection de tâches. Veuillez réessayer.`);
    //   }
    // },






    // // Load all tasks
    // setFilteredTasks: (filteredTasks: any) =>
    //   set((state) => {
    //     // Get filteredTasks from the current state if any filteredTasks from our persistant
    //     const filteredTasksIds = state.selectedTasks.map((task) => task._id);

    //     return {
    //       tasks_: filteredTasks.map((filteredTask: any) => ({
    //         ...filteredTask,
    //         isSelected: filteredTasksIds.includes(filteredTasks._id) || filteredTasks.isSelected || false, // Mark as selected if in selectedTasks
    //       })),
    //     };
    //   }),



    // // Add or remove a task from the selection
    // toggleCategory: (category: string) =>
    //   set((state) => {
    //     let updatedSelectedTasks = state?.selectedTasks?.filter((task) => task?.taskStatus === category);
    //     if (category === "Toutes") {
    //       updatedSelectedTasks = state?.tasks_
    //     }
    //     return { ...state, filteredTasks: updatedSelectedTasks, selectedCategory: category };
    //   }),


    // toggleTaskSelectionV2: async (id: any, maxTasks: any, userId: any) => {
    //   const taskIndex = get().tasks_.findIndex((task) => task._id === id);
    //   if (taskIndex === -1) return; // Task not found

    //   const task = get().tasks_[taskIndex];
    //   const isSelected = !task.isSelected;

    //   // console.log(get().selectedTasks, isSelected, 'hellooooouuuuuuu');

    //   // Check the maxTasks limit
    //   if (isSelected && get().selectedTasks.length >= maxTasks) {
    //     alert(`You can only select up to ${maxTasks} tasks per day.`);
    //     return;
    //   }

    //   try {
    //     if (isSelected) {
    //       // // Unassign task by calling the DELETE endpoint
    //       const data = await fetch(`${BASE_API_URL}/task-assignment/assign`, {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ userId, taskId: id }),
    //       });
  
    //       // Update state after successful request
    //       set((state) => {
    //         const updatedTasks = state.tasks_.map((t) =>
    //           t._id === id ? { ...t, isSelected: true } : t
    //         );
  
    //         // const updatedSelectedTasks = state.selectedTasks.filter(
    //         //   (t) => t._id !== id
    //         // );
    //         const updatedSelectedTasks = isSelected
    //         ? [...state.selectedTasks, { ...task, isSelected }]
    //         : state.selectedTasks.filter((t) => t._id !== id);
  
    //         return { tasks_: updatedTasks, selectedTasks: updatedSelectedTasks };
    //       });
    //     } else {
    //       // // Unassign task by calling the DELETE endpoint
    //       const data = await fetch(`${BASE_API_URL}/task-assignment/unassign`, {
    //         method: 'DELETE',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ userId, taskId: id }),
    //       });
  
    //       // Update state after successful request
    //       set((state) => {
    //         const updatedTasks = state.tasks_.map((t) =>
    //           t._id === id ? { ...t, isSelected: false } : t
    //         );
  
    //         // const updatedSelectedTasks = [
    //         //   ...state.selectedTasks,
    //         //   { ...task, isSelected: true },
    //         // ];
    //         const updatedSelectedTasks = isSelected
    //         ? [...state.selectedTasks, { ...task, isSelected }]
    //         : state.selectedTasks.filter((t) => t._id !== id);

    //         return { tasks_: updatedTasks, selectedTasks: updatedSelectedTasks };
    //       });
          
    //     }
    //   } catch (error: any) {
    //     console.error(error.message);
    //     alert('Failed to update task selection. Please try again.');
    //   }
    // },









// export const useTaskStore = create<TaskState>()(
//   persist(
//     (set, get) => {
//       return ({
//         tasks_: tasks, // Initialize tasks
//         filteredTasks: get()?.filteredTasks || [], // Initialize filteredtasks
//         selectedTask: null, // No task selected by default
//         selectedTasks: get()?.selectedTasks || [], // Array of selected tasks
//         filteredTasksFromBackend: get()?.filteredTasksFromBackend || [],

//         // Load all tasks
//         setTasks: (tasks) =>
//           set((state) => {
//             // Get selectedTasks from the current state if any selectedTasks from our persistant
//             const selectedTaskIds = state.selectedTasks.map((task) => task._id);

//             return {
//               tasks_: tasks.map((task) => ({
//                 ...task,
//                 isSelected: selectedTaskIds.includes(task._id) || task.isSelected || false, // Mark as selected if in selectedTasks
//               })),
//             };
//           }),

//         // Load all tasks
//         setSelectedTaskFromBack: (filteredTasksFromBackend: any) =>
//           set((state) => {
//             console.log(filteredTasksFromBackend, "in the store==============>")
//             return {
//               ...state,
//               filteredTasksFromBackend,
//               filteredTasks: filteredTasksFromBackend, 
//             };
//           }),

//         // // Load all tasks
//         // setFilteredTasks: (filteredTasks: any) =>
//         //   set((state) => {
//         //     // Get filteredTasks from the current state if any filteredTasks from our persistant
//         //     const filteredTasksIds = state.selectedTasks.map((task) => task._id);

//         //     return {
//         //       tasks_: filteredTasks.map((filteredTask: any) => ({
//         //         ...filteredTask,
//         //         isSelected: filteredTasksIds.includes(filteredTasks._id) || filteredTasks.isSelected || false, // Mark as selected if in selectedTasks
//         //       })),
//         //     };
//         //   }),

//         // Select a specific task by ID
//         selectTask: (id) =>
//           set((state) => ({
//             selectedTask: state.tasks_.find((task) => task._id === id) || null,
//             tasks_: state.tasks_.map((task) =>
//               task._id === id ? { ...task, isSelected: true } : { ...task, isSelected: false }
//             ),
//           })),

//         // toggleTaskSelectionV2: async (id: any, maxTasks: any, userId: any) => {
//         //   const taskIndex = get().tasks_.findIndex((task) => task._id === id);
//         //   if (taskIndex === -1) return; // Task not found

//         //   const task = get().tasks_[taskIndex];
//         //   const isSelected = !task.isSelected;

//         //   // console.log(get().selectedTasks, isSelected, 'hellooooouuuuuuu');

//         //   // Check the maxTasks limit
//         //   if (isSelected && get().selectedTasks.length >= maxTasks) {
//         //     alert(`You can only select up to ${maxTasks} tasks per day.`);
//         //     return;
//         //   }

//         //   try {
//         //     if (isSelected) {
//         //       // // Unassign task by calling the DELETE endpoint
//         //       const data = await fetch(`${BASE_API_URL}/task-assignment/assign`, {
//         //         method: 'POST',
//         //         headers: { 'Content-Type': 'application/json' },
//         //         body: JSON.stringify({ userId, taskId: id }),
//         //       });
      
//         //       // Update state after successful request
//         //       set((state) => {
//         //         const updatedTasks = state.tasks_.map((t) =>
//         //           t._id === id ? { ...t, isSelected: true } : t
//         //         );
      
//         //         // const updatedSelectedTasks = state.selectedTasks.filter(
//         //         //   (t) => t._id !== id
//         //         // );
//         //         const updatedSelectedTasks = isSelected
//         //         ? [...state.selectedTasks, { ...task, isSelected }]
//         //         : state.selectedTasks.filter((t) => t._id !== id);
      
//         //         return { tasks_: updatedTasks, selectedTasks: updatedSelectedTasks };
//         //       });
//         //     } else {
//         //       // // Unassign task by calling the DELETE endpoint
//         //       const data = await fetch(`${BASE_API_URL}/task-assignment/unassign`, {
//         //         method: 'DELETE',
//         //         headers: { 'Content-Type': 'application/json' },
//         //         body: JSON.stringify({ userId, taskId: id }),
//         //       });
      
//         //       // Update state after successful request
//         //       set((state) => {
//         //         const updatedTasks = state.tasks_.map((t) =>
//         //           t._id === id ? { ...t, isSelected: false } : t
//         //         );
      
//         //         // const updatedSelectedTasks = [
//         //         //   ...state.selectedTasks,
//         //         //   { ...task, isSelected: true },
//         //         // ];
//         //         const updatedSelectedTasks = isSelected
//         //         ? [...state.selectedTasks, { ...task, isSelected }]
//         //         : state.selectedTasks.filter((t) => t._id !== id);

//         //         return { tasks_: updatedTasks, selectedTasks: updatedSelectedTasks };
//         //       });
              
//         //     }
//         //   } catch (error: any) {
//         //     console.error(error.message);
//         //     alert('Failed to update task selection. Please try again.');
//         //   }
//         // },


//         toggleTaskSelectionV2: async (id: any, maxTasks: any, userId: any) => {
//           const { filteredTasksFromBackend } = get();
//           const taskIndex = get().tasks_.findIndex((task) => task._id === id);
//           if (taskIndex === -1) return; // Task not found

//           const task = get().tasks_[taskIndex];
//           const isSelected = !task.isSelected;

//           // Check if this task exist in the assigned task and if it is already in-progress
//           const checkIfTaskInProgress = filteredTasksFromBackend?.filter((t) => t._id === id && t.status !== "pending");

//           console.log(checkIfTaskInProgress, "okay")

//           if (checkIfTaskInProgress && checkIfTaskInProgress?.length > 0) {
//             alert(`Vous ne pouvez pas deselectionner une tache deja en cour.`);
//             return
//           }
        
//           // Check the maxTasks limit
//           if (isSelected && get().selectedTasks.length >= maxTasks) {
//             alert(`You can only select up to ${maxTasks} tasks per day.`);
//             return;
//           }

//           try {
//             const endpoint = isSelected
//               ? `${BASE_API_URL}/task-assignment/assign`
//               : `${BASE_API_URL}/task-assignment/unassign`;
//             const method = isSelected ? 'POST' : 'DELETE';

//             // Assign or unassign task via API call
//             const data = await fetch(endpoint, {
//               method,
//               headers: { 'Content-Type': 'application/json' },
//               body: JSON.stringify({ userId, taskId: id }),
//             });

//             const response = await data?.json()

//             if (!data.ok){ 
//               alert(response?.error)
//               throw new Error('API request failed'); 
//             };

//             // Update state after successful API call
//             set((state) => {
//               const updateTaskSelection = (tasks: any[]) =>
//                 tasks.map((t) =>
//                   t._id === id ? { ...t, isSelected } : t
//                 );
//               const updateTaskSelection2 = (tasks: any[]) => isSelected ? 
//                 tasks.map((t) =>
//                   t._id === id ? { ...t, isSelected } : t
//                 ) : 
//                 tasks?.filter((t) => t._id !== id);

//               const updatedTasks = updateTaskSelection(state.tasks_);
//               const updatedFilteredTasks = updateTaskSelection2(state?.filteredTasks!);
//               const updatedFilteredTasksFromBackend = updateTaskSelection2(
//                 state?.filteredTasksFromBackend!
//               );

//               const updatedSelectedTasks = isSelected
//                 ? [...state.selectedTasks, { ...task, isSelected }]
//                 : state.selectedTasks.filter((t) => t._id !== id);

//               return {
//                 tasks_: updatedTasks,
//                 filteredTasks: updatedFilteredTasks,
//                 filteredTasksFromBackend: updatedFilteredTasksFromBackend,
//                 selectedTasks: updatedSelectedTasks,
//               };
//             });
//           } catch (error: any) {
//             console.error(error.message);
//             alert('Failed to update task selection. Please try again.');
//           }
//         },
        


//         // Add or remove a task from the selection
//         toggleTaskSelection: (id, maxTasks) =>
//           set((state) => {
//             const taskIndex = state.tasks_.findIndex((task) => task._id === id);
//             if (taskIndex === -1) return state; // Task not found

//             const task = state.tasks_[taskIndex];
//             const isSelected = !task.isSelected;

//             console.log(state.selectedTasks, "hellooooouuuuuuu")

//             // Check the limit
//             if (isSelected && (state.selectedTasks.length || get().selectedTasks.length) >= maxTasks) {
//               alert(`You can only select up to ${maxTasks} tasks per day.`);
//               return state;
//             }

//             // Update task selection
//             const updatedTasks = state.tasks_.map((t) =>
//               t._id === id ? { ...t, isSelected } : t
//             );

//             const updatedSelectedTasks = isSelected
//               ? [...state.selectedTasks, { ...task, isSelected }]
//               : state.selectedTasks.filter((t) => t._id !== id);

//             return { tasks_: updatedTasks, selectedTasks: updatedSelectedTasks };
//           }),

//         // Fetch tasks from server
//         setTasksFromServer: async () => {
//           try {
//             const response = await fetch(`${BASE_API_URL}/tasks/users-tasks`); // Replace with your API endpoint
//             if (!response.ok) {
//               throw new Error('Failed to fetch tasks');
//             }
//             const tasks: TaskDataType[] = await response.json();
//             set({
//               tasks_: tasks.map((task) => ({
//                 ...task,
//                 isSelected: false, // Ensure a clean slate for selections
//               })),
//               filteredTasks: tasks, // Sync filtered tasks with the fetched tasks
//             });
//           } catch (error) {
//             console.error('Error fetching tasks:', error);
//           }
//         },

//         // Add or remove a task from the selection 
//         toggleCategory: (category: string, taskAssignment: TaskDataType[]) =>
//           set((state) => {
//             console.log("state?.filteredTasks", state?.filteredTasks, category)
//             let updatedSelectedTasks = state?.filteredTasksFromBackend?.filter((task) => task?.status === category);
//             if (category === "Toutes") {
//               updatedSelectedTasks = state?.filteredTasksFromBackend!
//             }
//             return { ...state, filteredTasks: updatedSelectedTasks, selectedCategory: category };
//           }),

//         // // Add or remove a task from the selection
//         // toggleCategory: (category: string) =>
//         //   set((state) => {
//         //     let updatedSelectedTasks = state?.selectedTasks?.filter((task) => task?.taskStatus === category);
//         //     if (category === "Toutes") {
//         //       updatedSelectedTasks = state?.tasks_
//         //     }
//         //     return { ...state, filteredTasks: updatedSelectedTasks, selectedCategory: category };
//         //   }),

//         // Clear all selected tasks
//         clearTaskSelection: () =>
//           set((state) => ({
//             tasks_: state.tasks_.map((task) => ({ ...task, isSelected: false })),
//             selectedTasks: [],
//           })),

//         // Mark the selected task as submitted
//         submitTask: () =>
//           set((state) => {
//             if (!state.selectedTask) return state;
//             const updatedTasks = state.tasks_.map((task) =>
//               task.id === state.selectedTask!.id
//                 ? { ...task, taskStatus: 'submitted' }
//                 : task
//             );
//             return {
//               tasks_: updatedTasks,
//               selectedTask: {
//                 ...state.selectedTask,
//                 taskStatus: 'submitted',
//                 isSelected: false, // Optionally deselect after submission
//               },
//             };
//           }),
//     })},
//     {
//       name: 'task-store', // Name for localStorage key
//       partialize: (state) => ({ 
//         // tasks_: state.tasks_, 
//         // selectedTasks: state.selectedTasks 
//         tasks_: state.tasks_,
//         selectedTasks: state.selectedTasks,
//         selectedCategory: state.selectedCategory,
//         filteredTasks: state.filteredTasks,
//         filteredTasksFromBackend: state.filteredTasksFromBackend
//       }), // Only persist relevant state
//     }
//   )
// );































