import {
  NextRequest,
  NextResponse,
} from 'next/server';

import { TaskAssignmentService } from '../../services/task-assignment.service';

export const runtime = "edge"

const taskAssignmentService = new TaskAssignmentService();

export async function DELETE(req: NextRequest) {
    try {
        const { userId, taskId } = await req.json();

        if (!userId || !taskId) {
            return NextResponse.json({ error: "Entrée invalide : l'ID utilisateur et l'ID de tâche sont requis" }, { status: 400 });
        }

        const deletedAssignment = await taskAssignmentService.deleteTaskAssignment(userId, taskId);

        if (!deletedAssignment) {
            return NextResponse.json({ error: 'Affectation de tâche introuvable ou déjà supprimée' }, { status: 404 });
        }

        return NextResponse.json({
            message: 'Affectation de tâche supprimée avec succès',
            deletedAssignment,
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Échec de la suppression de l'affectation de tâche" },
            { status: 400 }
        );
    }
}
