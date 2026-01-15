import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db/sequelize';

interface NoteAttributes {
  id: string;
  userId: string;
  title: string;
  content: string;
  summary: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface NoteCreationAttributes extends Optional<NoteAttributes, 'id' | 'summary' | 'createdAt' | 'updatedAt'> {}

export class Note extends Model<NoteAttributes, NoteCreationAttributes> implements NoteAttributes {
  declare id: string;
  declare userId: string;
  declare title: string;
  declare content: string;
  declare summary: string | null;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Note.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'user_id',
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'notes',
    underscored: true,
    timestamps: true,
  }
);
