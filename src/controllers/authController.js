import bcrypt from 'bcryptjs';
import { User } from '../models/index.js';
import { generateToken } from '../utils/generateToken.js';

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'נא למלא את כל השדות: username, email, password',
      });
    }

    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: 'כתובת האימייל כבר רשומה במערכת',
      });
    }

    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: 'שם המשתמש כבר תפוס',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = generateToken(newUser.id);

    return res.status(201).json({
      success: true,
      message: 'המשתמש נרשם בהצלחה',
      data: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        token,
      },
    });
  } catch (error) {
    console.error('Registration Error:', error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'נא לספק אימייל וסיסמה',
      });
    }

    // חיפוש המשתמש לפי אימייל
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'פרטי התחברות שגויים',
      });
    }

    // השוואת סיסמה
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'פרטי התחברות שגויים',
      });
    }

    // הפקת טוקן
    const token = generateToken(user.id);

    return res.status(200).json({
      success: true,
      message: 'התחברת בהצלחה',
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    console.error('Login Error:', error);
    next(error);
  }
};