"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.widgets = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.widgets = (0, pg_core_1.pgTable)("widgets", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    visible: (0, pg_core_1.boolean)("visible").default(true),
});
