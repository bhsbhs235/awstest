"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongo_connector_1 = require("./mongo-connector");
const account_router_1 = __importDefault(require("./routes/account-router"));
const board_router_1 = __importDefault(require("./routes/board-router"));
class MainServer {
    constructor() {
        dotenv_1.default.config();
        this.app = (0, express_1.default)();
    }
    async start() {
        const mongoConnector = new mongo_connector_1.MongoConnector();
        await mongoConnector.connect();
        this.app.use('/uploads', express_1.default.static('uploads'));
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)()); //cors를 allow한다.
        this.app.use("/account", account_router_1.default);
        this.app.use("/board", board_router_1.default);
        this.app.listen(5000, () => {
            console.log('Server Opened.');
        });
    }
}
exports.MainServer = MainServer;
//# sourceMappingURL=mainserver.js.map