export type UserType = {
    _id: string;
    username?: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    password: string;
    parent?: string | ParentUser;
    children: User[];
    funds: number;
    selectedTasksCount?: number;
    accountType: string;
    role: string;
    status: string;
    package?: string | Package;
    internshipExpiry?: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

export type ParentUserType = {
    _id: string;
    email: string;
    phone: string;
    password: string;
    children: string[];
    funds: number;
    accountType: string;
    role: string;
    status: string;
    firstName: string;
    lastName: string;
    package?: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    selectedTasksCount?: number;
};

export type PackageType = {
    _id: string;
    name: string;
    level: number;
    inverstment: number;
    numberOfTaskPerDay: number;
    priceEarnedPerTaskDone: number;
    priceEarnedForAllTaskDonePerDay: number;
    priceEarnedForAllTaskDonePerMonth: number;
    priceEarnedForAllTaskDonePerYear: number;
    description: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    listOfTasks: string[];
};

export type UserInfoType = {
    children: User[];
    funds: number;
    accountType: 'internship' | 'regular'; // Enum for account type
    role: 'super_admin' | 'regular_user'; // Enum for user roles
    status: 'active' | 'inactive'; // Enum for status
    firstName: string;
    lastName: string;
    _id: string;
    sub: string;
    email: string;
    parent: ParentUser;
    phone: string;
    package: Package;
    createdAt: string;
    updatedAt: string;
    iat: number;
    exp: number;
};

export type UserVerificationResponseType = {
    message: string;
    userInfo: UserInfo;
};
