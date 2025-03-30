import express from "express";
import { getWidgets ,  updateWidget } from "../controllers/widgetController";
    
const router = express.Router();


router.get("/", getWidgets);
router.put("/:id", updateWidget);

export default router;
