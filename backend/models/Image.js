import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js'; // Updated import

const Image = sequelize.define('Image', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Image;
