"use client";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import React, { useState } from 'react';

import Link from 'next/link';
import {
  Navigation,
  Pagination,
} from 'swiper/modules';
import {
  Swiper,
  SwiperSlide,
} from 'swiper/react';

import { PropertyDataType } from './property_data';

interface PropertyCardProps {
    property: PropertyDataType;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
    const [isFavorited, setIsFavorited] = useState(false);

    const toggleFavorite = () => setIsFavorited(!isFavorited);

    return (
        <div className="flex flex-row rounded-lg overflow-hidden shadow-lg border border-gray-200">
            <div className="relative">
                <div className='w-[150px]'>
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={10}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        className="w-full h-48"
                    >
                        {property?.pircture && property?.pircture.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={image}
                                    alt={`${property.location} image ${index + 1}`}
                                    className="w-full h-48 object-cover"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </div>

                <button
                    onClick={toggleFavorite}
                    className="absolute top-2 right-2 text-white bg-gray-900 bg-opacity-50 p-1 rounded-full"
                >
                    {isFavorited ? '❤️' : '🤍'}
                </button>
            </div>

            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">${ property?.price && property?.price.toLocaleString()}</h3>
                <p className="text-sm text-gray-500">{property.location}, {property.city}, {property.country}</p>
                <div className="text-sm mt-2">
                    <p><strong>Dimension:</strong> {property.size} m²</p>
                    <p><strong>Chambres:</strong> {property.bedrooms}</p>
                    <p><strong>Toilette:</strong> {property.bathrooms}</p>
                </div>
                <div className='flex flex-col md:flex-row'>
                    {/* <Link href={`/dashboard/properties/${property.id}`}>
                        <button className="mt-4 px-2 py-1 bg-blue-500 text-white text-[12px] rounded hover:bg-blue-600">
                            Commender
                        </button>
                    </Link> */}
                    <Link href={`/dashboard/properties/${property.id}`}>
                        <button className="mt-4 px-2 py-1 bg-blue-500 text-white text-[12px] rounded hover:bg-blue-600">
                            Voir Details
                        </button>
                    </Link>
                </div>
            </div>

            {/* Add custom styles for the navigation arrows */}
            <style jsx>{`
                .swiper-button-next,
                .swiper-button-prev {
                    width: 25px;
                    height: 25px;
                    background-color: rgba(0, 0, 0, 0.5);
                    border-radius: 50%;
                }
                .swiper-button-next::after,
                .swiper-button-prev::after {
                    font-size: 12px;
                }
            `}</style>
        </div>
    );
};

export default PropertyCard;


















// import React, { useState } from 'react';

// import { PropertyDataType } from './property_data';

// // import PhotoOne from "../../../../../../public/products/room3.jpg"

// const PhotoOneUrl = "/products/room3.jpg"; // Use the relative path as a string



// interface PropertyCardProps {
//     property: PropertyDataType;
// }

// const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
//     const [isFavorited, setIsFavorited] = useState(false);

//     const toggleFavorite = () => setIsFavorited(!isFavorited);

//     return (
//         <div className="max-w-xs rounded-lg overflow-hidden shadow-lg border border-gray-200">
//             <div className="relative">
//                 {/* <img
//                     // src={ property?.pircture && property?.pircture[0] }
//                     src={ "https://photos.fife.usercontent.google.com/pw/AP1GczNn8f-e2RcJeILo1LxSGXMT2a1EOJlOw2MRlRwe1l4wnKnL-3kRagk=w802-h1080-s-no-gm?authuser=1"}
//                     // src={ PhotoOne }
//                     alt={property.location}
//                     className="w-full h-48 object-cover"
//                 /> */}
//                 <img
//                     src={PhotoOneUrl}
//                     alt={property.location}
//                     className="w-full h-48 object-cover"
//                 />
//                 {/* <Image 
//                     src={ "https://photos.fife.usercontent.google.com/pw/AP1GczNn8f-e2RcJeILo1LxSGXMT2a1EOJlOw2MRlRwe1l4wnKnL-3kRagk=w802-h1080-s-no-gm?authuser=1"}
//                     alt={property?.location!}
//                     width={100}
//                     height={100}
//                     className="w-full h-48 object-cover"
//                 /> */}
//                 <button
//                     onClick={toggleFavorite}
//                     className="absolute top-2 right-2 text-white bg-gray-900 bg-opacity-50 p-1 rounded-full"
//                 >
//                     {isFavorited ? '❤️' : '🤍'}
//                 </button>
//             </div>

//             <div className="p-4">
//                 <h3 className="text-lg font-semibold text-gray-800">${ property?.price && property?.price.toLocaleString()}</h3>
//                 <p className="text-sm text-gray-500">{property.location}, {property.city}, {property.country}</p>
//                 <div className="text-sm mt-2">
//                     <p><strong>Size:</strong> {property.size} m²</p>
//                     <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
//                     <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PropertyCard;
