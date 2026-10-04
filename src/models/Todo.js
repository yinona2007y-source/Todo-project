import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Todo = sequelize.define('Todo', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'כותרת המשימה היא שדה חובה' },
      notEmpty: { msg: 'כותרת המשימה אינה יכולה להיות ריקה' },
      len: {
        args: [2, 100],
        msg: 'כותרת המשימה חייבת להכיל בין 2 ל-100 תווים',
      },
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
});