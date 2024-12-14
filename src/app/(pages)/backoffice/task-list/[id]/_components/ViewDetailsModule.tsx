"use client";
import React from 'react';

import TaskDetailCard from '@/components/common/TaskDetailCard';
import { useTaskStore } from '@/store/task-store';

const sampleTasks = [
    {
      title: "Regardez une vidéo éducative",
      description: "Regardez une vidéo éducative et capturez un écran de votre progression.",
      xofPoints: 500,
      createdAt: "2024-11-20",
      isSubmitted: false,
      submitTask: () => alert("Tâche soumise !"),
    },
    {
      title: "Complétez un quiz en ligne",
      description: "Passez un quiz de 10 questions sur les concepts récemment appris.",
      xofPoints: 300,
      createdAt: "2024-11-18",
      isSubmitted: true,
      submitTask: () => alert("Cette tâche a déjà été soumise."),
    },
    {
      title: "Téléchargez une ressource",
      description: "Téléchargez le document de formation disponible et confirmez la réception.",
      xofPoints: 200,
      createdAt: "2024-11-19",
      isSubmitted: false,
      submitTask: () => alert("Tâche soumise avec succès !"),
    },
    {
      title: "Participation à un webinaire",
      description: "Rejoignez et assistez au webinaire prévu pour obtenir un certificat de participation.",
      xofPoints: 1000,
      createdAt: "2024-11-15",
      isSubmitted: false,
      submitTask: () => alert("Soumission du webinaire confirmée !"),
    },
    {
      title: "Feedback d'un cours",
      description: "Remplissez le formulaire de retour d'expérience après avoir suivi le cours.",
      xofPoints: 150,
      createdAt: "2024-11-12",
      isSubmitted: true,
      submitTask: () => alert("Feedback déjà soumis."),
    },
  ];


export type TaskDetailType = {
    title: string;
    description: string;
    xofPoints: number;
    createdAt: string;
    isSubmitted: boolean;
    submitTask: () => void;
};

const ViewDetailsModule = () => {
    const { selectedTask, submitTask } = useTaskStore();
    return (
        <>
            <TaskDetailCard key={selectedTask?.id} task={selectedTask!} />
        </>
    )
}

export default ViewDetailsModule