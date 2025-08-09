"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decisionsDB = exports.setsDB = void 0;
// backend/src/database/db.ts
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const path_1 = __importDefault(require("path"));
const dbPath = path_1.default.join(__dirname, 'sets.db'); // or 'decisions.db', etc.
exports.setsDB = new better_sqlite3_1.default(path_1.default.join(__dirname, 'sets.db'));
exports.decisionsDB = new better_sqlite3_1.default(path_1.default.join(__dirname, 'decisions.db'));
