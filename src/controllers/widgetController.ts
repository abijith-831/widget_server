import { Request, Response, RequestHandler } from "express";
import pool from '../config/db'


export const getWidgets = async (req: Request, res: Response) => {
  try {
    
    const result = await pool.query("SELECT * FROM widgets ORDER BY id ASC");
    
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching widgets:", error);
    res.status(500).json({ message: "Error fetching widgets", error });
  }
};


export const updateWidget: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { visible } = req.body;

    const widgetId = parseInt(id, 10);
    if (isNaN(widgetId)) {
      res.status(400).json({ message: "Invalid widget ID" });
      return;
    }

    const result = await pool.query(
      "UPDATE widgets SET visible = $1 WHERE id = $2 RETURNING *",
      [visible, widgetId]
    );

    if (result.rowCount === 0) {
      res.status(404).json({ message: "Widget not found" });
      return;
    }

    res.json({ message: "Widget updated successfully", updatedWidget: result.rows[0] });
  } catch (error: any) {
    console.error("Error updating widget:", error);
    res.status(500).json({ message: "Error updating widget", error: error.message });
  }
};