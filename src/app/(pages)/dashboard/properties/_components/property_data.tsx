

// export type PropertyDataType = {
//     id: number;
//     price?: number; 
//     location?: string; 
//     size?: number; 
//     bedrooms?: number; 
//     bathrooms?: number; 
//     city?: string; 
//     country?: string; 
//     pircture?: string []; 
// }

export type PropertyDataType = {
    id: string;  // Add an ID for dynamic routing
    price: number; 
    location: string; 
    size: number; 
    bedrooms?: number; 
    bathrooms?: number; 
    sections?: number;
    category?: string;
    city: string; 
    country: string; 
    pircture: string[]; 
    description: string;  // New property for description
};


const PhotoOneUrl1 = "/products/room1.jpg"; // Use the relative path as a string
const PhotoOneUrl2 = "/products/room2.jpg"; // Use the relative path as a string
const PhotoOneUrl3 = "/products/room3.jpg"; // Use the relative path as a string
const PhotoOneUrl4 = "/products/room4.jpg"; // Use the relative path as a string
const PhotoOneUrl5 = "/products/room5.jpg"; // Use the relative path as a string
const PhotoOneUrl6 = "/products/room6.jpg"; // Use the relative path as a string
const PhotoOneUrl7 = "/products/room7.jpg"; // Use the relative path as a string

const HousePhoto1 = "/products/houses/house1.jpg"; // Use the relative path as a string
const HousePhoto2 = "/products/houses/house2.jpg"; // Use the relative path as a string
const HousePhoto3 = "/products/houses/house3.jpg"; // Use the relative path as a string
const HousePhoto4 = "/products/houses/house4.jpg"; // Use the relative path as a string
const HousePhoto5 = "/products/houses/house5.jpg"; // Use the relative path as a string
const HousePhoto6 = "/products/houses/house6.jpeg"; // Use the relative path as a string
const HousePhoto7 = "/products/houses/house7.jpg"; // Use the relative path as a string
const HousePhoto8 = "/products/houses/house8.jpg"; // Use the relative path as a string

const ParkingPhoto1 = "/products/car-park/parking1.jpg"; // Use the relative path as a string
const ParkingPhoto2 = "/products/car-park/parking2.jpg"; // Use the relative path as a string
const ParkingPhoto3 = "/products/car-park/parking3.jpeg"; // Use the relative path as a string
const ParkingPhoto4 = "/products/car-park/parking4.jpg"; // Use the relative path as a string
const ParkingPhoto5 = "/products/car-park/parking5.jpg"; // Use the relative path as a string
const ParkingPhoto6 = "/products/car-park/parking6.jpg"; // Use the relative path as a string

const WarehousePhoto1 = "/products/warehouses/warehouse1.jpg"; // Use the relative path as a string
const WarehousePhoto2 = "/products/warehouses/warehouse2.jpg"; // Use the relative path as a string
const WarehousePhoto3 = "/products/warehouses/warehouse3.jpg"; // Use the relative path as a string
const WarehousePhoto4 = "/products/warehouses/warehouse4.jpg"; // Use the relative path as a string
const WarehousePhoto5 = "/products/warehouses/warehouse5.jpg"; // Use the relative path as a string
const WarehousePhoto6 = "/products/warehouses/warehouse6.jpg"; // Use the relative path as a string
const WarehousePhoto7 = "/products/warehouses/warehouse7.jpg"; // Use the relative path as a string



export const propertyData: PropertyDataType [] = [
    {
        id: "ycbuy2gd23h8dj298u204902ruhuu",
        price: 50000000,
        location: "Bastos",
        size: 360,
        bedrooms: 8,
        bathrooms: 7,
        city: "Paris",
        country: "France",
        category: "Entrepôt",  // New category
        pircture: [
            WarehousePhoto1,
            WarehousePhoto2,
            // WarehousePhoto3,
            // WarehousePhoto4,
            // WarehousePhoto5,
            // WarehousePhoto6,
            // WarehousePhoto7,
        ],
        description: "Beautiful, spacious property located in the heart of Paris with modern amenities and a fantastic view.",
    }, 
    {
        id: "ycbuy2gd92378djklj298u902287uu",
        price: 40000000,
        location: "Paris",
        size: 360,
        bedrooms: 7,
        bathrooms: 6,
        city: "Paris",
        country: "France",
        category: "Entrepôt",  // New category
        pircture: [
            // WarehousePhoto1,
            // WarehousePhoto2,
            WarehousePhoto3,
            WarehousePhoto4,
            // WarehousePhoto5,
            // WarehousePhoto6,
            // WarehousePhoto7,
        ],
        description: "Beautiful, spacious property located in the heart of Paris with modern amenities and a fantastic view.",
    }, 
    {
        id: "ycfy76t87y79hh898u98u9u902287uu",
        price: 60000000,
        location: "Paris",
        size: 360,
        bedrooms: 0,
        bathrooms: 0,
        city: "Paris",
        country: "France",
        category: "Entrepôt",  // New category
        pircture: [
            // WarehousePhoto1,
            // WarehousePhoto2,
            // WarehousePhoto3,
            // WarehousePhoto4,
            WarehousePhoto5,
            WarehousePhoto6,
            WarehousePhoto7,
        ],
        description: "Beautiful, spacious property located in the heart of Paris with modern amenities and a fantastic view.",
    }, 
    // HOUSE
    {
        id: "bed24h92ud8j029jwi7fyo2h49h29294e8",
        price: 75000000,
        location: "Mbankolo",
        size: 420,
        bedrooms: 4,
        bathrooms: 3,
        city: "Paris",
        country: "France",
        category: "Maison",
        pircture: [
            HousePhoto1, 
            HousePhoto2, 
            // HousePhoto3, 
            // HousePhoto4, 
            // HousePhoto5, 
            // HousePhoto6, 
            // HousePhoto7, 
            // HousePhoto8, 
        ],
        description: "Beautiful, spacious property located in the heart of Paris with modern amenities and a fantastic view.",
    }, 
    {
        id: "bed24h92ud8j02hirfu89jo2h49h29294e8",
        price: 80000000,
        location: "Mbankolo",
        size: 420,
        bedrooms: 6,
        bathrooms: 6,
        city: "Paris",
        country: "France",
        category: "Maison",
        pircture: [
            // HousePhoto1, 
            // HousePhoto2, 
            HousePhoto3, 
            HousePhoto4, 
            // HousePhoto5, 
            // HousePhoto6, 
            // HousePhoto7, 
            // HousePhoto8, 
        ],
        description: "Beautiful, spacious property located in the heart of Paris with modern amenities and a fantastic view.",
    }, 
    {
        id: "bwifhu4809-4i5935fu89jo2h49h29294e8",
        price: 85000000,
        location: "Paris",
        size: 420,
        bedrooms: 6,
        bathrooms: 6,
        city: "Paris",
        country: "France",
        category: "Maison",
        pircture: [
            // HousePhoto1, 
            // HousePhoto2, 
            // HousePhoto3, 
            // HousePhoto4, 
            HousePhoto5, 
            HousePhoto6, 
            HousePhoto7, 
            HousePhoto8, 
        ],
        description: "Beautiful, spacious property located in the heart of Paris with modern amenities and a fantastic view.",
    }, 
    // HOUSE
    {
        id: "bedj98uf3094i-949329294e8",
        price: 75000000,
        location: "Paris",
        size: 420,
        bedrooms: 4,
        bathrooms: 3,
        city: "Paris",
        country: "France",
        category: "Parking",
        pircture: [
            ParkingPhoto1, 
            ParkingPhoto2, 
            ParkingPhoto3, 
            // ParkingPhoto4, 
            // ParkingPhoto5, 
            // ParkingPhoto6, 
        ],
        description: "Beautiful, spacious property located in the heart of Paris with modern amenities and a fantastic view.",
    }, 
    {
        id: "entiuj3930i0-34892j4-9294e8",
        price: 80000000,
        location: "Paris",
        size: 420,
        bedrooms: 5,
        bathrooms: 6,
        city: "Paris",
        country: "France",
        category: "Parking",
        pircture: [
            // ParkingPhoto1, 
            // ParkingPhoto2, 
            // ParkingPhoto3, 
            ParkingPhoto4, 
            ParkingPhoto5, 
            ParkingPhoto6, 
        ],
        description: "Beautiful, spacious property located in the heart of Paris with modern amenities and a fantastic view.",
    }, 
    // {
    //     id: 1, 
    //     price: 50000000, 
    //     location: "Bastos", 
    //     size: 360,  
    //     bedrooms: 3, 
    //     bathrooms: 2, 
    //     city: "Yaounde", 
    //     country: "Cameroun", 
    //     pircture: [
    //         "https://photos.fife.usercontent.google.com/pw/AP1GczNn8f-e2RcJeILo1LxSGXMT2a1EOJlOw2MRlRwe1l4wnKnL-3kRagk=w802-h1080-s-no-gm?authuser=1", 
    //         "https://photos.fife.usercontent.google.com/pw/AP1GczMLPyVkC7KLGTL5RuLNgVFkMldWsRsbU7PkHBPXEQhYsWxlqZIU5Cc=w804-h1080-s-no-gm?authuser=1"
    //     ], 
    // }, 
    // {
    //     id: 2, 
    //     price: 50000000, 
    //     location: "Bastos", 
    //     size: 360,  
    //     bedrooms: 3, 
    //     bathrooms: 2, 
    //     city: "Yaounde", 
    //     country: "Cameroun", 
    //     pircture: [
    //         "https://photos.fife.usercontent.google.com/pw/AP1GczNn8f-e2RcJeILo1LxSGXMT2a1EOJlOw2MRlRwe1l4wnKnL-3kRagk=w802-h1080-s-no-gm?authuser=1", 
    //         "https://photos.fife.usercontent.google.com/pw/AP1GczMLPyVkC7KLGTL5RuLNgVFkMldWsRsbU7PkHBPXEQhYsWxlqZIU5Cc=w804-h1080-s-no-gm?authuser=1"
    //     ], 
    // }, 
    // {
    //     id: 3, 
    //     price: 50000000, 
    //     location: "Bastos", 
    //     size: 360,  
    //     bedrooms: 3, 
    //     bathrooms: 2, 
    //     city: "Yaounde", 
    //     country: "Cameroun", 
    //     pircture: [
    //         "https://photos.fife.usercontent.google.com/pw/AP1GczNn8f-e2RcJeILo1LxSGXMT2a1EOJlOw2MRlRwe1l4wnKnL-3kRagk=w802-h1080-s-no-gm?authuser=1", 
    //         "https://photos.fife.usercontent.google.com/pw/AP1GczMLPyVkC7KLGTL5RuLNgVFkMldWsRsbU7PkHBPXEQhYsWxlqZIU5Cc=w804-h1080-s-no-gm?authuser=1"
    //     ], 
    // }
]