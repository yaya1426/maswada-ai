import { Note } from '../models/Note';
import { CreateNoteInput, UpdateNoteInput } from '../validators/notes.schema';
import { AppError } from '../middlewares/errorHandler';

export class NotesService {
  async findAllByUserId(userId: string): Promise<Note[]> {
    return Note.findAll({
      where: { userId },
      order: [['updatedAt', 'DESC']],
    });
  }

  async findByIdAndUserId(id: string, userId: string): Promise<Note> {
    const note = await Note.findOne({
      where: { id, userId },
    });

    if (!note) {
      throw new AppError(404, 'Note not found');
    }

    return note;
  }

  async create(userId: string, data: CreateNoteInput): Promise<Note> {
    return Note.create({
      userId,
      ...data,
    });
  }

  async update(id: string, userId: string, data: UpdateNoteInput): Promise<Note> {
    const note = await this.findByIdAndUserId(id, userId);
    await note.update(data);
    return note;
  }

  async delete(id: string, userId: string): Promise<void> {
    const note = await this.findByIdAndUserId(id, userId);
    await note.destroy();
  }
}

export const notesService = new NotesService();
