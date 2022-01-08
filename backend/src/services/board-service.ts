import { Board, BoardModel } from '../model/board';

export class BoardService {
    public async create(board: Board): Promise<Board> {
        let b = new BoardModel(board);
        return await b.save();
    }

    public async find(page: any, search: any) {
        //board 콜렉션과 users 콜렉션의 데이타를 융합하여 가져온다.
        const boardData: any[] = await BoardModel.aggregate([ {$match: {}}, {$lookup: {from: 'users', localField: 'userId', foreignField: 'email', as: 'userinfo'}}] );
        return boardData;
    }

    public async read(email: any): Promise<Board | null> {
        const boardData = await BoardModel.findOne({userId: email});
        return boardData;
    }
}