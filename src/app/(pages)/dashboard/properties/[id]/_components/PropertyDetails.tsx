"use client";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// pages/properties/[id].tsx
import {
  usePathname,
  useRouter,
} from 'next/navigation';
import {
  Navigation,
  Pagination,
} from 'swiper/modules';
// import { propertyData } from '../property_data';  // Adjust path as needed
import {
  Swiper,
  SwiperSlide,
} from 'swiper/react';

import { propertyData } from '../../_components/property_data';

const PropertyDetails = () => {
    const router = useRouter();
    // const { id } = router.query;
    const pathName = usePathname (); 
    const id = pathName?.split("/")[pathName?.split("/").length - 1]
    const property = propertyData.find(p => p.id === id);

    if (!property) return <p>Property not found.</p>;

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">{property.location}</h1>
            
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={10}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                className="w-full h-96"
            >
                {property.pircture.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img src={image} alt={`${property.location} image ${index + 1}`} className="w-full h-96 object-cover" />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="mt-4">
                <h2 className="text-xl font-semibold">${property.price.toLocaleString()}</h2>
                <p className="text-sm text-gray-500 mb-4">{property.city}, {property.country}</p>
                <div className="mt-4">
                    <p><strong>Size:</strong> {property.size} m²</p>
                    <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
                    <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
                </div>
                <p className='mt-4'>{property.description}</p>
            </div>
        </div>
    );
};

export default PropertyDetails;
