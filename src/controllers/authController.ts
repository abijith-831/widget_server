import {Request , Response} from 'express'
import pool from '../config/db'
import jwt from 'jsonwebtoken'
const SECRET_KEY = "jwt-secret-key";


export const authLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        
        const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        
        if (userResult.rows.length === 0) {
            res.status(400).json({ error: "Invalid email or password" });
        }

        const user = userResult.rows[0];

        if (password !== user.password) {
            res.status(400).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

        res.json({ message: "Login successful", token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};



export const authSignup = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {

        const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (existingUser.rows.length > 0) {
            res.status(400).json({ error: "Email already exists" });
        }

        const result = await pool.query(
            "INSERT INTO users (name, email, password, widget_preference) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, email, password, JSON.stringify([])]
        );
        

        res.status(201).json({ message: "User registered", user: result.rows[0] });
        
    } catch (error) {
        res.status(500).json({ error: "Error saving user" });
    }
};
