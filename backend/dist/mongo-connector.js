"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoConnector = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class MongoConnector {
    constructor() {
    }
    connect() {
        return new Promise((resolve, reject) => {
            mongoose_1.default.connection.once('open', function () {
                console.log('MongoDB event open');
                mongoose_1.default.connection.on('connected', () => {
                    console.log('MongoDB event connected');
                });
                mongoose_1.default.connection.on('disconnected', () => {
                    console.log('MongoDB event disconnected');
                });
                mongoose_1.default.connection.on('reconnected', () => {
                    console.log('MongoDB event reconnected');
                });
                mongoose_1.default.connection.on('error', (err) => {
                    console.log('MongoDB event error: ' + err);
                });
                return resolve(null);
            });
            // all executed methods log output to console
            mongoose_1.default.set('debug', true);
            // disable colors in debug mode
            mongoose_1.default.set('debug', { color: false });
            // get mongodb-shell friendly output (ISODate)
            mongoose_1.default.set('debug', { shell: true });
            //db setting
            this.mongoConnection = mongoose_1.default.connection;
            mongoose_1.default.connect(process.env.MONGO_URL, {
                keepAlive: true,
                // useNewUrlParser: true, 
                // useUnifiedTopology: true, 
                // autoReconnect: false,
                // useCreateIndex: true 
            }).then(() => {
                console.log('MongoDB Connected.');
                resolve(null);
            }).catch(reject);
        });
    }
    disconnect() {
        return this.mongoConnection.close();
    }
}
exports.MongoConnector = MongoConnector;
//# sourceMappingURL=mongo-connector.js.map