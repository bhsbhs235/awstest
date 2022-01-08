import express, { Request, Response } from 'express';
import asyncify from 'express-asyncify';
import moment from 'moment'; //시간/날짜 관련 모듈.
import multer from 'multer';
import fs from 'fs';
import path from 'path';

import { verifyToken } from '../authorization';
import { BoardService } from '../services/board-service';
import { Board } from '../model/board';

//라우터에서 비동기 함수를 사용할 수 있게 한다.
const router = asyncify(express.Router());

fs.readdir('uploads', (error) => {
    // uploads 폴더 없으면 생성
    if (error) {
        fs.mkdirSync('uploads');
    }
})

//업로드 규약을 정한다.
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
})

//게시판 목록 요청.
router.post('/list', async (request: Request, response: Response) => {
    const boardService = new BoardService();

    try{
        let search: String = request.body.search;
        let page: number = request.body.page;

        const boardList: Board[] | null = await boardService.find(page, search);
        if(!boardList) {
            response.status(400).send('board list not exist');
            return;   
        }

        response.json(boardList);
    }catch(err) {
        response.status(400).send('board list error');
    }
});

//게시판 글쓰기 요청.
router.use('/write', verifyToken);
router.post('/write', async (request: Request, response: Response) => {
    const boardService = new BoardService();

    try{
        let board: Board = {
            userId: response.locals.email,
            title: request.body.title,
            content: request.body.content,
            imageFile: request.body.imageFile,
            date: moment().toDate(),
            count: 0,
        };
        const result = await boardService.create(board);
        console.log(result);
        response.status(201).send('success');
    }catch(err) {
        response.status(400).send('write error');
    }
});

//게시판 이미지 업로드 요청.
router.use('/uploadImage', verifyToken);
router.post('/uploadImage', upload.single('file'), async (request: Request, response: Response) => {
    response.json({ url : `/img/${request.file.filename}`});
});

export = router;