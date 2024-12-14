'use client';

import { motion } from 'framer-motion';
import {
  Award,
  Building2,
  HandshakeIcon,
  Lightbulb,
  Users,
} from 'lucide-react';

import { Card } from '@/components/ui/Card';

// import { Card } from '@/components/ui/card';

const features = [
  {
    icon: Building2,
    title: "Notre Mission",
    description: "Global Immo Parc est une société d'achat et de revente des contrats de location de biens immobiliers aux particuliers."
  },
  {
    icon: Users,
    title: "Partenariats Stratégiques",
    description: "Les partenaires de GIC participent à un projet de restauration et de valorisation des biens immobiliers anciens."
  },
  {
    icon: Lightbulb,
    title: "Notre Vision",
    description: "Notre objectif est de préserver l'architecture unique de ces propriétés tout en intégrant des solutions d'efficacité énergétique modernes afin d'attirer une clientèle haut de gamme soucieuse de l'histoire et de la durabilité."
  },
  {
    icon: Award,
    title: "Éducation et Sensibilisation",
    description: "GIC c'est aussi des ateliers de sensibilisation pour les propriétaires sur l'importance de la préservation architecturale et des pratiques durables."
  },
  {
    icon: HandshakeIcon,
    title: "Engagement Patrimonial",
    description: "Nous garantissons des partenariats avec des experts en patrimoine pour garantir que nos rénovations respectent les normes historiques et culturelles, tout en collaborant avec les associations locales."
  }
];

export default function AboutUs() {
    return (
        <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        À Propos de Nous
                    </h2>
                    <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Découvrez comment Global Immo Parc révolutionne l'immobilier en alliant patrimoine et durabilité
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <Card className="p-6 h-full bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300">
                                    <div className="flex flex-col h-full">
                                        <div className="rounded-full bg-[#FFFBEB]  dark:bg-blue-900 p-3 w-12 h-12 flex items-center justify-center mb-4">
                                            {/* bg-blue-100 */}
                                            <Icon className="w-6 h-6 text-[#FCD34D] dark:text-blue-400" />
                                            {/* text-blue-600 */}
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 flex-grow">
                                            {feature.description}
                                        </p>
                                    </div>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}