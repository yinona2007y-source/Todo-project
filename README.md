Markdown
# Todo App - Backend API Testing Guide
הרצת השרת
npm run dev
השרת רץ בכתובת: http://localhost:8000 (קובץ database.sqlite נוצר ומסונכרן אוטומטית).

2. סדר הפעולות לבדיקת ה-API
כתובת בסיס: http://localhost:8000/api

שלב א': הרשמת משתמש (Register)
Method: POST

URL: http://localhost:8000/api/auth/register

Body (JSON):

JSON
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
הערה: יש להעתיק את הטוקן שחוזר בתשובה לשימוש בשלבים הבאים.

שלב ב': התחברות (Login)
Method: POST

URL: http://localhost:8000/api/auth/login

Body (JSON):

JSON
{
  "email": "test@example.com",
  "password": "password123"
}
שלב ג': יצירת משימה (Create Todo)
Method: POST

URL: http://localhost:8000/api/todos

Headers: Authorization: Bearer <TOKEN>

Body (JSON):

JSON
{
  "title": "משימה לבדיקה",
  "description": "תיאור קצר למשימה"
}
שלב ד': שליפת כל המשימות (Get Todos)
Method: GET

URL: http://localhost:8000/api/todos

Headers: Authorization: Bearer <TOKEN>

מחזיר רק את המשימות ששייכות למשתמש המחובר.

שלב ה': עדכון משימה (Update Todo)
Method: PUT

URL: http://localhost:8000/api/todos/1 (לפי ה-ID שהתקבל)

Headers: Authorization: Bearer <TOKEN>

Body (JSON):

JSON
{
  "isCompleted": true
}
שלב ו': מחיקת משימה (Delete Todo)
Method: DELETE

URL: http://localhost:8000/api/todos/1

Headers: Authorization: Bearer <TOKEN>