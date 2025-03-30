"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const widgetController_1 = require("../controllers/widgetController");
const router = express_1.default.Router();
router.get("/", widgetController_1.getWidgets);
router.put("/:id", widgetController_1.updateWidget);
exports.default = router;
