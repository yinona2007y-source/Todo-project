import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import { ExclusionConstraintError } from 'sequelize';


export const protect = async (req ,res , next) => {
    let token ; 

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        try{
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token,process.env.JWT_SECRET);

            req.user = await User.findByPk(decoded.id,{
                attributes :{ exclude : ['paasword']},
            })

            if (!req.user){
                return res.status(401).json({
                    success : false , 
                    message : "המשתמש שמשויך לטוקן זה אינו קיים עוד במערכת",
                });
            };

            return next();
                
        }   catch(error){
            if (error.name=='TokenExpiredError'){
                return res.status(401).json({
                    success : false , 
                    message : "פג תוקף החיבור נא להתחבר מחדש",
                });  
            };

            return res.status(401).json({
                success : false , 
                message : "טוקן אינו חוקי או שגוי",
            })
        };
    };

    if (!token){
        return res.status(401).json({
            success:false,
            message:"לא סופק טוקן התחברות",
        });
    };
};