import model from "../../models";

const noteModel = model.note;
const shareNotesModel = model.share_note;

export const findOneNote = async (payload) => {
  const note = await noteModel.findOne({
    where: payload,
  });

  return note;
};

export const findAllNotes = async (payload) => {
  const notes = await noteModel.findAll({
    where: {
      userId: payload.userId,
    },
  });

  return notes;
};

export const createNote = async (payload) => {
  return noteModel.create({ ...payload });
};

export const updateNoteById = async (noteId, payload) => {
  const [updatedRowsCount] = await noteModel.update(payload, {
    where: { id: noteId },
  });

  if (updatedRowsCount === 0) {
    return null;
  }

  const updatedNote = await noteModel.findByPk(noteId);
  return updatedNote;
};

export const deleteNoteById = async (noteId) => {
  const deletedRowsCount = await noteModel.destroy({
    where: { id: noteId },
  });

  if (deletedRowsCount === 0) {
    return false;
  }

  return true;
};

export const createShareNote = async (payload) => {
  return shareNotesModel.create({ ...payload });
};
