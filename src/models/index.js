import { sequelize } from '../config/database.js';
import { User } from './User.js';
import { Todo } from './Todo.js';


User.hasMany(Todo,{
    foreignKey:'userId',
    as:'todos',
    onDelete:'CASCADE',
});

Todo.belongsTo(User,{
    foreignKey:'userId',
    as:'user',
});

export {sequelize,User,Todo};