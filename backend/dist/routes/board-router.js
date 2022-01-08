"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const express_asyncify_1 = __importDefault(require("express-asyncify"));
const moment_1 = __importDefault(require("moment")); //시간/날짜 관련 모듈.
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const authorization_1 = require("../authorization");
const board_service_1 = require("../services/board-service");
//라우터에서 비동기 함수를 사용할 수 있게 한다.
const router = (0, express_asyncify_1.default)(express_1.default.Router());
fs_1.default.readdir('uploads', (error) => {
    // uploads 폴더 없으면 생성
    if (error) {
        fs_1.default.mkdirSync('uploads');
    }
});
//업로드 규약을 정한다.
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            const ext = path_1.default.extname(file.originalname);
            cb(null, path_1.default.basename(file.originalname, ext) + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});
//게시판 목록 요청.
router.post('/list', async (request, response) => {
    const boardService = new board_service_1.BoardService();
    try {
        let search = request.body.search;
        let page = request.body.page;
        const boardList = await boardService.find(page, search);
        if (!boardList) {
            response.status(400).send('board list not exist');
            return;
        }
        response.json(boardList);
    }
    catch (err) {
        response.status(400).send('board list error');
    }
});
//게시판 글쓰기 요청.
router.use('/write', authorization_1.verifyToken);
router.post('/write', async (request, response) => {
    const boardService = new board_service_1.BoardService();
    try {
        let board = {
            userId: response.locals.email,
            title: request.body.title,
            content: request.body.content,
            imageFile: request.body.imageFile,
            date: (0, moment_1.default)().toDate(),
            count: 0,
        };
        const result = await boardService.create(board);
        console.log(result);
        response.status(201).send('success');
    }
    catch (err) {
        response.status(400).send('write error');
    }
});
//게시판 이미지 업로드 요청.
router.use('/uploadImage', authorization_1.verifyToken);
router.post('/uploadImage', upload.single('file'), async (request, response) => {
    response.json({ url: `/img/${request.file.filename}` });
});
module.exports = router;
//# sourceMappingURL=board-router.js.map