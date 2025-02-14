import express, { request } from "express";
import pool from "../db.js";

const router = express.Router();


// Get all todos from the database 

router.get("/all-todos", async (req, res) => {

    try {
        const [rows] = await pool.query("SELECT * FROM todos");
        res.json(rows);
    } catch(err){
        res.status(500).json({message: err.message});
    }   

}); 

// Get a single todo from the database by ID 
// /todo/1
router.get("/todo/:id", async (req, res)=> {

    try {

        const [rows] = await pool.query("SELECT * FROM todos WHERE id = ?", [req.params.id]);
        if (rows.length === 0) return res.status(404).json({message: "Todo not found"});
        res.json(rows[0]);

    } catch (err) {
        res.status(500).json({message: err.message});
    }

});

// Add a new todo to the database 

router.post("/add-todo", async (req, res) => {

    const {title} = req.body;

    if (!title) return res.status(400).json({message: "Title is required"});

    try {

        const [result] = await pool.query("INSERT INTO todos (title) VALUES (?)", [title]);
        res.status(201).json({id: result.insertId, title});

    } catch (error) {
        res.status(500).json({message: err.message});
    }

});


// Update  todo by ID in the database and return the updated data

router.put("/update-todo/:id", async (req, res) => {
    const {title, completed} = req.body; 

    try {

        const [result] = await pool.query("UPDATE todos SET title = ?, completed = ? WHERE id = ?", [title, completed, req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({message: "Todo not found"});
        res.json({id: req.params.id, title, completed});

    } catch (error) {
        res.status(500).json({message: err.message});
    }
});

// Delete a todo by ID from the database

router.delete("/delete-todo/:id", async (req, res) => {

    try {

        const [result] = await pool.query("DELETE FROM todos WHERE id = ?", [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({message: "Todo not found"});
        res.json({message: "Todo deleted"}); 


    } catch (error) {
        res.status(500).json({message: err.message});
    }

}); 

export default router;