"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/routes/setup.route.ts
const express_1 = require("express");
const db_1 = require("../database/db");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    try {
        const rows = db_1.decisionsDB.prepare('SELECT * FROM decisions').all();
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});
exports.default = router;
