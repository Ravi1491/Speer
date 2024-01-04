import model from "../../models";
import { Op } from "sequelize";
const noteModel = model.note;

export const searchNotes = async (query) => {
  const matchingNotes = await noteModel.findAll({
    where: {
      description: { [Op.like]: `%${query}%` },
    },
  });
  return matchingNotes;
};
