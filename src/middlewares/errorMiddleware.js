export const notFound = (req,res,next) => {
    const error = new Error(`הנתיב המבוקש לא נמצא: ${req.originalUrl}`);
    res.status(404);
    next(error);
};

export const errorHandler = (req , res , next) => {
    let statusCode = res.statusCode == 200 ? 500 : res.statusCode;
    let message = err.message || 'שגיאת שרת פנימית';

    if (err.name == 'SequelizeValidationError' || err.name == 'SequelizeUniqueConstraintError'){
        statusCode = 400;

        message = err.errors.map((e)=> e.message).join(', ');
    };

    res.status(statusCode).json({
        success : false ,
        message,
        stack : process.env.NODE_ENV == 'production' ? null : err.stack,
    });
};