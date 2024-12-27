import {
  Dashboard2SvgIcon,
  MomoSvgIcon,
  OrangeMoneySvgIcon,
  ProductsSvgIcon,
  SettingSvgIcon,
  WaletSvgIcon,
} from '../svgs/SvgIcons';

// import OrangeMoneySvgIcon from "@/components/svgs/SvgIcons/OrangeMoneySvgIcon"


export type WalletElemenetType = {
    id?: number | string; 
    // icon: any, 
    amount?: number;
    tooltip: string; 
    route: string;
}

export const walletNavElement: WalletElemenetType [] = [
    {
        id: 1,
        // icon: (
        //     <Dashboard2SvgIcon />
        // ), 
        amount: 50000, 
        tooltip: "Total des gains", 
        route: "/backoffice/transactions/commissions"
    }, 
    {
        id: 2,
        // icon: (
        //     <ProductsSvgIcon />
        // ), 
        amount: 50000, 
        tooltip: "Totals des retraits", 
        route: "/backoffice/transactions/withdrawals"
    }, 
    {
        id: 3,
        // icon: (
        //     <WaletSvgIcon />
        // ), 
        amount: 50000, 
        tooltip: "Total des recharges", 
        route: "/backoffice/transactions/funding-account/"
    }, 
    // {
    //     id: 4,
    //     // icon: (
    //     //     <SettingSvgIcon />
    //     // ), 
    //     amount: 50000, 
    //     tooltip: "Mon compte", 
    //     route: "/dashboard/my-account"
    // }
]



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
        route: "/dashboard"
    }, 
    {
        id: 2,
        icon: (
            <ProductsSvgIcon />
        ), 
        tooltip: "Produits", 
        route: "/dashboard/properties"
    }, 
    {
        id: 3,
        icon: (
            <WaletSvgIcon />
        ), 
        tooltip: "Portefeuille", 
        route: "/dashboard/wallet"
    }, 
    {
        id: 4,
        icon: (
            <SettingSvgIcon />
        ), 
        tooltip: "Mon compte", 
        route: "/dashboard/my-account"
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
        route: "/dashboard/invite-friends"
    }
]

// Create bottomNavElementInAccount based on bottomNavElement with modified route for the fourth element
export const bottomNavElementInAccount: BottomElemenetType[] = addElement.map((element) =>
    element.id === 4
        ? { ...element, route: "/dashboard/financial-accounts" }
        : element
);



// route: "/dashboard/financial-accounts"


export type AccountType = {
    id?: string | number, 
    operator: string, 
    service: string, 
    abreviation: string, 
    balance?: number, 
    phone_number: number
}

export type AccountTypeM = {
    id: string | number, 
    name: string, 
    service?: string, 
    abreviation?: string, 
}


export const my_accounts: AccountType [] = [
    {
        id: 1,
        operator: "Orange", 
        service: "Orange Money", 
        abreviation: "OM", 
        balance: 50000, 
        phone_number: 237695500474
    }, 
    {
        id: 2,
        operator: "MTN", 
        service: "Mobile Money", 
        abreviation: "MoMo", 
        balance: 60000, 
        phone_number: 237675500474
    }
]


export type SuggestedAmounts = {
    id: string | number, 
    amount: number, 
}

export const suggestedAmounts: SuggestedAmounts [] = [
    {
        id: 1, 
        amount: 5000, 
    }, 
    {
        id: 2, 
        amount: 20000, 
    }, 
    {
        id: 3, 
        amount: 58000, 
    }, 
    {
        id: 4, 
        amount: 168000, 
    }, 
    {
        id: 5, 
        amount: 398000, 
    }, 
]

export const accounts: AccountTypeM [] = [
    {
        id: 1,
        name: "Orange", 
        service: "Orange Money", 
        abreviation: "OM", 
    }, 
    {
        id: 2,
        name: "MTN", 
        service: "Mobile Money", 
        abreviation: "MoMo", 
    }
]

export type AllAccountsType = {
    id?: string | number;
    name?: string; 
    service?: string;  
    abreviation?: string; 
    operator?: string; 
    balance?: number; 
    phone_number?: number; 
    image?: any; 
    primaryColor?: string;
    secondaryColor?: string; 
}

export const allAccounts: AllAccountsType [] = [
    {
        id: 1,
        operator: "Orange", 
        service: "Orange Money", 
        abreviation: "OM", 
        balance: 50000, 
        phone_number: 237695500474,
        image: (
            <OrangeMoneySvgIcon height='72' width='128' />
        ),
        primaryColor: "#ff7903", 
        secondaryColor: "#000", 
    }, 
    {
        id: 2,
        operator: "MTN", 
        service: "Mobile Money", 
        abreviation: "MoMo", 
        balance: 60000, 
        phone_number: 237675500474, 
        image: (
            <MomoSvgIcon height='72' width='128' />
        ),
        primaryColor: "#facd0d", 
        secondaryColor: "#005074", 
    }, 
    {
        id: 3,
        name: "Orange", 
        service: "Orange Money", 
        abreviation: "OM", 
        image: (
            <OrangeMoneySvgIcon height='72' width='128' />
        ),
        primaryColor: "#ff7903", 
        secondaryColor: "#000", 
    }, 
    {
        id: 4,
        name: "MTN", 
        service: "Mobile Money", 
        abreviation: "MoMo", 
        image: (
            <MomoSvgIcon height='72' width='128' />
        ),
        primaryColor: "#facd0d", 
        secondaryColor: "#005074", 
    }
]



// export type BottomElemenetType = {
//     id?: number;
//     icon?: any, 
//     tooltip: string, 
//     route: string,
// }

// export const bottomNavElement: BottomElemenetType [] = [
//     {
//         id: 1, 
//         tooltip: "Mes compte financier", 
//         route: "/dashboard/financial-accounts"
//     }, 
//     {
//         id: 2, 
//         tooltip: "Mon Profile", 
//         route: "/dashboard/profile"
//     }, 
//     {
//         id: 3, 
//         tooltip: "Inviter un ami", 
//         route: "/dashboard/invite-friends"
//     }, 
//     {
//         id: 4, 
//         tooltip: "Mes Infos", 
//         route: "/dashboard/settings"
//     }
// ]