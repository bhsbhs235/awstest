"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const mongoose_auto_increment_1 = __importDefault(require("mongoose-auto-increment"));
const schema = new mongoose_1.Schema({
    num: { type: Number, required: true, unique: true, index: true },
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageFile: { type: String, required: false },
    date: { type: Date, required: true },
    count: { type: Number, required: true },
});
mongoose_auto_increment_1.default.initialize(mongoose_1.default.connection);
schema.plugin(mongoose_auto_increment_1.default.plugin, {
    model: 'Board',
    field: 'num',
    startAt: 1,
    increment: 1, //증가.
});
exports.BoardModel = (0, mongoose_1.model)('Board', schema);
//# sourceMappingURL=board.js.map