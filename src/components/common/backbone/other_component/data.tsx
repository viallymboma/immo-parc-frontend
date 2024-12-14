import {
  CalendarSvgIcon,
  Dashboard2SvgIcon,
  DashboardSvgIcon,
  FormsSvgIcon,
  ProductsSvgIcon,
  ProfileSvgIcon,
  SettingSvgIcon,
  TablesSvgIcon,
  WaletSvgIcon,
} from '@/components/svgs/SvgIcons';

export type BottomElemenetType = {
    id?: number | string, 
    icon: any, 
    tooltip: string, 
    route: string,
}

export const bottomNavElement: BottomElemenetType [] = [
    {
        id: 1,
        icon: (
            <Dashboard2SvgIcon />
        ), 
        tooltip: "Accueil", 
        route: "/backoffice"
    }, 
    {
        id: 2,
        icon: (
            <ProductsSvgIcon />
        ), 
        tooltip: "Tâches", 
        route: "/backoffice/task-list"
    }, 
    {
        id: 3,
        icon: (
            <WaletSvgIcon />
        ), 
        tooltip: "Portefeuille", 
        route: "/backoffice/wallet"
    }, 
    {
        id: 4,
        icon: (
            <SettingSvgIcon />
        ), 
        tooltip: "Mon compte", 
        route: "/backoffice/my-account"
    }
]

const addElement = [
    ...bottomNavElement, 
    {
        id: 5,
        icon: (
            <SettingSvgIcon />
        ), 
        tooltip: "Inviter quelqu'un", 
        route: "/backoffice/invite-friends"
    }
]

// Create bottomNavElementInAccount based on bottomNavElement with modified route for the fourth element
export const bottomNavElementInAccount: BottomElemenetType[] = addElement.map((element) =>
    element.id === 4
        ? { ...element, route: "/backoffice/financial-accounts" }
        : element
);

export const menuGroups = [
    {
        name: "MENU PRINCIPAL",
        menuItems: [
            {
                icon: (
                    <DashboardSvgIcon />
                ),
                label: "Tableau de Bord",
                route: "/backoffice",
            },
            {
                icon: (
                    <CalendarSvgIcon />
                ),
                label: "Commissions",
                route: "/backoffice/commissions"
            },
            {
                icon: (
                    <FormsSvgIcon />
                ),
                label: "Team",
                route: "#",
                children: [
                    { label: "Mon équipe", route: "/backoffice/teams/view" },
                    { label: "Tree View", route: "/backoffice/teams/tree-view" },
                    { label: "Folder View", route: "/backoffice/teams/folder-view" },
                ],
            },
            {
                icon: (
                    <TablesSvgIcon />
                ),
                label: "Transactions",
                route: "#",
                children: [
                    { label: "Commissions", route: "/backoffice/transactions/commissions" },
                    { label: "Withdrawals", route: "/backoffice/transactions/withdrawals" },
                    { label: "Investissements", route: "/backoffice/transactions/investments" },
                ],
            },
        ],
    },
    {
        name: "REGLAGES",
        menuItems: [
            {
                icon: (
                    <ProfileSvgIcon />
                ),
                label: "Profile",
                route: "/backoffice/profile",
            }, 
            {
                icon: (
                    <CalendarSvgIcon />
                ),
                label: "Utilisateurs",
                route: "/backoffice/utilisateurs",
            },
        ],
    },
];

export const taskStatus = [
    "Toutes", 
    "Sélectionnées", 
    "Completée", 
    "Echouée", 
    "Abandonné", 
    "Expirée"
]

const getRandomTaskStatus = () => {
    const randomIndex = Math.floor(Math.random() * taskStatus.length);
    return taskStatus[randomIndex];
};

export type PackageObjectType = {
    _id: string;
    name: string;
    level: number;
    investment: number; // Fixed typo from "inverstment" to "investment"
    numberOfTaskPerDay: number;
    priceEarnedPerTaskDone: number;
    priceEarnedForAllTaskDonePerDay: number;
    priceEarnedForAllTaskDonePerMonth: number;
    priceEarnedForAllTaskDonePerYear: number;
    description: string;
    createdAt: string; // Could be a Date if you prefer Date objects
    updatedAt: string; // Could be a Date if you prefer Date objects
    __v: number;
    listOfTasks: string[]; // Array of task IDs, assuming these are ObjectId references
  }
  

export type TaskDataType = {
    _id?: string, 
    id?: string | number;
    taskTitle: string;
    taskMission: string; 
    taskDescription: string;
    taskRemuneration: number;
    taskShortInstruction: string;
    taskCategory?: string; 
    taskLink: string;
    taskStatus: string;
    imageUrl?: string | null;
    createdAt?: string; // Optional field
    isSelected?: boolean; // New property to indicate selection state
    isSubmitted: boolean;
    packageId?: PackageObjectType,
    submitTask?: () => void;
    // id: number | string, 
    // taskTitle?: string, 
    // taskMission?: string,
    // taskShortInstruction?: string;
    // taskRemuneration: number, 
    // taskDescription: string, 
    // taskStatus: string, 
    // taskCategory?: string,
    // taskLink: string, 
}

export const tasks: TaskDataType [] = [
    {
        _id: "1", 
        taskTitle: "View Like & Comment", 
        taskMission: "View Like & Comment",
        taskShortInstruction: "Demande: Regarder la video, aimer et abonnez-vous", 
        taskRemuneration: 800, 
        taskDescription: "Inscrivez-vous et connectez-vous avec votre compte YouTube, puis prenez des captures d'écran et téléchargez des images si nécessaire.", 
        taskCategory: "", 
        taskStatus: taskStatus[0],
        createdAt: '2024.11.20-01:12:01',
        imageUrl: null,
        isSelected: false, 
        isSubmitted: false, 
        taskLink: "https://www.youtube.com/watch?v=_M3bAO6JG_c", 
    }, 
    {
        _id: "2", 
        taskTitle: "View Like & Comment", 
        taskMission: "View Like & Comment", 
        taskShortInstruction: "Demande: Regarder la video, aimer et abonnez-vous", 
        taskRemuneration: 700, 
        taskDescription: "Inscrivez-vous et connectez-vous avec votre compte YouTube, puis prenez des captures d'écran et téléchargez des images si nécessaire.", 
        taskCategory: "", 
        taskStatus: taskStatus[0],
        createdAt: '2024.11.20-01:12:01',
        imageUrl: null,
        isSelected: false, 
        isSubmitted: false, 
        taskLink: "https://www.youtube.com/watch?v=_M3bAO6JG_c", 
    }, 
    {
        _id: "3", 
        taskTitle: "View Like & Comment", 
        taskMission: "View Like & Comment", 
        taskShortInstruction: "Demande: Regarder la video, aimer et abonnez-vous", 
        taskRemuneration: 600, 
        taskDescription: "Inscrivez-vous et connectez-vous avec votre compte YouTube, puis prenez des captures d'écran et téléchargez des images si nécessaire.", 
        taskCategory: "", 
        taskStatus: taskStatus[0],
        createdAt: '2024.11.20-01:12:01',
        imageUrl: null,
        isSelected: false, 
        isSubmitted: false, 
        taskLink: "https://www.youtube.com/watch?v=_M3bAO6JG_c", 
    }, 
    {
        _id: "4", 
        taskTitle: "View Like & Comment", 
        taskMission: "View Like & Comment", 
        taskShortInstruction: "Demande: Regarder la video, aimer et abonnez-vous", 
        taskRemuneration: 500, 
        taskDescription: "Inscrivez-vous et connectez-vous avec votre compte YouTube, puis prenez des captures d'écran et téléchargez des images si nécessaire.", 
        taskCategory: "", 
        taskStatus: taskStatus[0],
        createdAt: '2024.11.20-01:12:01',
        imageUrl: null,
        isSelected: false, 
        isSubmitted: false, 
        taskLink: "https://www.youtube.com/watch?v=_M3bAO6JG_c", 
    }, 
]





// Description de la tâche：
// Description de la tâche：
// Description de la tâche：
// Description de la tâche：