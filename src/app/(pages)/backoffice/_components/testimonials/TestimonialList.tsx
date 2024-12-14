"use client";
import React from 'react';

import { motion } from 'framer-motion';

import { useTestimonialStore } from '@/store/testimonialStore';

import TestimonialCard from './TestimonialCard';

const TestimonialList = () => {
  const { testimonials } = useTestimonialStore();

  // Repeat the testimonials multiple times to ensure seamless scrolling
  const scrollingTestimonials = [...testimonials, ...testimonials, ...testimonials, ...testimonials, ...testimonials, ...testimonials, ...testimonials, ...testimonials, ...testimonials, ...testimonials];

  return (
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
      >
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Les temoignages
        </h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
        <div className="overflow-hidden h-[300px] relative"> {/* Adjust the height */}
          {/* <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Découvrez comment Global Immo Parc révolutionne l'immobilier en alliant patrimoine et durabilité
          </p> */}
          <div
            className="space-y-2 animate-continuousScroll"
            style={{
              display: 'flex',
              flexDirection: 'column',
              // animationDuration: `${testimonials.length * 10}s`, // Adjust speed based on number of testimonials
            }}
          >
            {scrollingTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={`${testimonial.id}-${index}`}
                testimonial={testimonial}
                isActive={true} // All cards are "active"
              />
            ))}
          </div>
        </div>
      </motion.div>
  );
}

export default TestimonialList;











// "use client"
// import React from 'react';

// import { useTestimonialStore } from '@/store/testimonialStore';

// import TestimonialCard from './TestimonialCard';

// const TestimonialList = () => {
//     const [currentIndex, setCurrentIndex] = React.useState(0);
//     const { testimonials } = useTestimonialStore();
  
//     React.useEffect(() => {
//       const interval = setInterval(() => {
//         setCurrentIndex((prevIndex) => 
//           prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
//         );
//       }, 3000);
  
//       return () => clearInterval(interval);
//     }, [testimonials.length]);
  
//     return (
//       <div className="space-y-4">
//         {testimonials.map((testimonial, index) => (
//           <TestimonialCard
//             key={testimonial.id}
//             testimonial={testimonial}
//             isActive={index === currentIndex}
//           />
//         ))}
//       </div>
//     );
// }

// export default TestimonialList