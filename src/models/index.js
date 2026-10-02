JavaScript
import { sequelize } from '../config/database.js';
import { User } from './User.js';
import { Todo } from './Todo.js';


User.hasMany(Todo,{
    foreignKey:'userId',
    as:'todos',
    onDelete:'CACADE',
});

Todo.belongTO(User,{
    foreignKey:'userId',
    as:'user',
});

export {sequelize,User,Todo};