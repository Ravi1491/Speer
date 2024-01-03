import model from "../../models";
const { Op } = require("sequelize");

const noteModel = model.note;

export const searchNotes = async (query) => {
  try {
    const matchingNotes = await noteModel.findAll({
      where: {
        description: { [Op.like]: `%${query}%` },
      },
    });

    return matchingNotes;
  } catch (error) {
    throw error;
  }
};
