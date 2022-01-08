"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardService = void 0;
const board_1 = require("../model/board");
class BoardService {
    async create(board) {
        let b = new board_1.BoardModel(board);
        return await b.save();
    }
    async find(page, search) {
        //board 콜렉션과 users 콜렉션의 데이타를 융합하여 가져온다.
        const boardData = await board_1.BoardModel.aggregate([{ $match: {} }, { $lookup: { from: 'users', localField: 'userId', foreignField: 'email', as: 'userinfo' } }]);
        return boardData;
    }
    async read(email) {
        const boardData = await board_1.BoardModel.findOne({ userId: email });
        return boardData;
    }
}
exports.BoardService = BoardService;
//# sourceMappingURL=board-service.js.map