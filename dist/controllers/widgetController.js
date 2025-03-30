"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWidget = exports.getWidgets = void 0;
const db_1 = require("../config/db");
const widget_1 = require("../models/widget");
const drizzle_orm_1 = require("drizzle-orm");
// Fetch all widgets
const getWidgets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield db_1.db.select().from(widget_1.widgets);
        res.json(results);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching widgets", error });
    }
});
exports.getWidgets = getWidgets;
// Update widget visibility
const updateWidget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { visible } = req.body;
        yield db_1.db.update(widget_1.widgets).set({ visible }).where((0, drizzle_orm_1.eq)(widget_1.widgets.id, Number(id)));
        res.json({ message: "Widget updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating widget", error });
    }
});
exports.updateWidget = updateWidget;
