import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const User = sequelize.define('User',{
    id:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true,
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:{
            msg:'שם המשתמש קיים במערכת',
        },
        validate:{
            notNull:{msg:"שם משתמש הוא שדה חובה"},
            notEmpty:{msg:""},
            len:{
                args:[3,30],
                msg:"",
            },
        },
    },
    email:{
        type:DataTypes.STRING,
        allowNull : false,
        unique:{
            msg:"כתובת האימייל כבר קיימת במערכת",
        },
        validate:{
            notNull:{msg:"אימייל הוא שדה חובה"},
            isEmail:{msg:"כתובת האימייל אינה תקינה"},
        },   
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{msg:"סיסמה היא שדה חובה"},
            len:{
                args :[6,100],
                msg:"הסיסמה חייבת להכיל לפחות 6 תווים ",
            },
        },
    },
    timestamps:true,
});