import React from 'react';

import { TestimonialType } from '@/types/testimonial';
import {
  Avatar,
  Card,
  User,
} from '@nextui-org/react';

interface TestimonialCardProps {
    testimonial: TestimonialType;
    isActive: boolean;
  }

const TestimonialCard = ({ testimonial, isActive }: TestimonialCardProps) => {
    return (
        <Card
          className={`px-4 py-2 transition-all rounded-md duration-500 transform ${
            isActive
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-4 absolute'
          }`}
        >
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12 bg-gray-200">
              <User name={"nice"} />
            </Avatar>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-[13px]">
                  Félicitations {testimonial.name}
                </span>
                <span className="text-yellow-500 font-bold text-[13px]">
                  {testimonial.amount}
                </span>
              </div>
              <p className="text-gray-500 mt-1 text-[12px]">{testimonial.message}</p>
            </div>
          </div>
        </Card>
    );
}

export default TestimonialCard