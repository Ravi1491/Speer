"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class share_note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  share_note.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "user_id",
        references: {
          model: "users",
          key: "id",
        },
      },
      noteId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "note_id",
        references: {
          model: "notes",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "created_at",
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "updated_at",
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
        field: "deleted_at",
      },
    },
    {
      paranoid: true,
      timestamps: true,
      deletedAt: "deleted_at",
      sequelize,
      modelName: "share_note",
    }
  );

  share_note.associate = function (models) {
    // associations can be defined here
  };

  return share_note;
};
