import { Todo } from '../models/index.js';


export const getTodos = async (req, res, next) => {
  try {
    const { completed } = req.query;


    const filter = { userId: req.user.id };


    if (completed != undefined) {
      filter.isCompleted = completed == 'true';
    }

    const todos = await Todo.findAll({
      where: filter,
      order: [['createdAt', 'DESC']], 
    });

    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    next(error);
  }
};


export const getTodoById = async (req, res, next) => {
  try {
    const { id } = req.params;


    const todo = await Todo.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });


    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'המשימה לא נמצאה',
      });
    }

    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};


export const createTodo = async (req, res, next) => {
  try {
    const { title, description } = req.body;


    if (!title || title.trim() == '') {
      return res.status(400).json({
        success: false,
        message: 'נא להזין כותרת למשימה',
      });
    }

    const newTodo = await Todo.create({
      title: title.trim(),
      description: description ? description.trim() : null,
      userId: req.user.id, 
    });

    res.status(201).json({
      success: true,
      message: 'המשימה נוצרה בהצלחה',
      data: newTodo,
    });
  } catch (error) {
    next(error);
  }
};


export const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, isCompleted } = req.body;

    // איתור המשימה ואימות בעלות
    const todo = await Todo.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'המשימה לא נמצאה',
      });
    }

    
    if (title != undefined) {
      if (title.trim() == '') {
        return res.status(400).json({
          success: false,
          message: 'כותרת המשימה אינה יכולה להיות ריקה',
        });
      }
      todo.title = title.trim();
    }

    if (description != undefined) {
      todo.description = description ? description.trim() : null;
    }

    if (isCompleted != undefined) {
      todo.isCompleted = Boolean(isCompleted);
    }


    await todo.save();

    res.status(200).json({
      success: true,
      message: 'המשימה עודכנה בהצלחה',
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};



export const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;


    const todo = await Todo.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'המשימה לא נמצאה',
      });
    }

    await todo.destroy();

    res.status(200).json({
      success: true,
      message: 'המשימה נמחקה בהצלחה',
    });
  } catch (error) {
    next(error);
  }
};