import { create } from 'zustand';

import { TestimonialType } from '@/types/testimonial';

// import { Testimonial } from '@/types/testimonial';

interface TestimonialStore {
  testimonials: TestimonialType[];
}

const defaultTestimonials: TestimonialType[] = [
  {
    id: "4051",
    name: "****4051",
    message: "Complétez la liste de 300 aujourd'hui",
    amount: "3052500XOF"
  },
  {
    id: "3973",
    name: "****3973",
    message: "Complétez la liste de 50 aujourd'hui",
    amount: "66000XOF"
  },
  {
    id: "2962",
    name: "****2962",
    message: "Complétez la liste de 300 aujourd'hui",
    amount: "3052500XOF"
  },
  {
    id: "9744",
    name: "****9744",
    message: "Complétez la liste de 50 aujourd'hui",
    amount: "66000XOF"
  }
];

export const useTestimonialStore = create<TestimonialStore>(() => ({
  testimonials: defaultTestimonials,
}));