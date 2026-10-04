import bcrypt from 'bcryptjs';
import { User } from '../models/index.js';
import { generateToken } from '../utils/generateToken.js';
import { where } from 'sequelize';

export const register = async (req , res , next) => {
    try{
        const {username , email , password} = req.body;

        const existingUser = await User.findOne({
            where : {email},     
        });

        if (existingUser){
            return res.status(400).json({
                success:false,
                message:"כתובת האימייל כבר קיימת במערכת"
            });
        };

        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password,salt);

        const newUser = await User.create({
            username,
            email,
            password:hashedpassword,
        });

        const token = generateToken(newUser.id);

        return res.status(201).json({
            success : true , 
            message : "המשתמש נוצר בהצלחה",
            data:{
                id:newUser.id,
                username : newUser.username,
                email:newUser.email,
                token,
            },
        });
    }catch(error){
        next(error)
    };
};

export const login = async (req,res,next) =>{
    try{
        const {email , password} = req.body;

        if (!email || !password){
            return res.status(400).json({
                success : false ,
                message : "נא להכניס אימייל וסיסמה "
            });
        };

        const user = await User.findOne({where:{email}});
        if (!user){
            return res.status(401).json({
                success : false , 
                message:"פרטי ההתחברות שגויים",
            });
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if (!isMatch){
            return res.status(401).json({
                success : falsae ,
                message:"פרטי ההתחברות שגויים",
            })
        };

        const token = generateToken(user.id);

        return res.status(200).json({
            success:true,
            message:"התחברת בהצלחה",
            data : {
                id : user.id,
                username: user,username,
                email : user.email,
                token,
            }
        });
        
    }catch(error){
        next(error)
    };
};