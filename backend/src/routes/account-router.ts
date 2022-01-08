import express, { Request, Response } from 'express';
import asyncify from 'express-asyncify';
import { hash, compare } from 'bcryptjs'; //암호를 암호화, 비교할 수 있는 모듈.
import jwt from 'jsonwebtoken';

import { verifyToken } from '../authorization';
import { UserService } from '../services/user-service';
import { User } from '../model/user';

//라우터에서 비동기 함수를 사용할 수 있게 한다.
const router = asyncify(express.Router());

//유저 정보 요청.
router.use('/profile', verifyToken);
router.get('/profile', async (request: Request, response: Response) => {
    const userService = new UserService();
    
    try{
        let email: string = response.locals['email'];

        const user: User | null = await userService.read(email);
        if(!user) {
            //해당 유저 없음.
            response.status(400).send('user not exist');
            return;   
        }

        response.status(200).send({ name: user.name });
    }catch(err) {
        response.status(400).send('user error');
    }
});

//유저 로그인 요청.
router.post('/login', async (request: Request, response: Response) => {
    const userService = new UserService();

    try{
        let email: string = request.body.email;
        let password: string = request.body.password;

        const user: User | null = await userService.read(email);
        if(!user) {
            //해당 이메일 주소 없음.
            response.status(400).send('email not exist');
            return;   
        }

        const result = await compare(password, user.password);
        if(!result) {
            //비밀번호 불일치.
            response.status(400).send('password incorrect');
            return;   
        }
        
        //유저 정보를 가지고 토큰을 만들어낸다.
        const token = jwt.sign(
            {
                email: email,
                adminlevel: user.adminlevel,
            },
            process.env.SECRET_KEY || 'secret_key',
            {
                expiresIn: '600m'
            }
        );
        response.json({ 
            name: user.name,
            token: token,
        });
    }catch(err) {
        response.status(400).send('login error');
    }
});

//유저 가입 요청.
router.post('/register', async (request: Request, response: Response) => {
    const userService = new UserService();

    let user: User = request.body;
    
    //유저의 암호를 해쉬화한다.
    user.password = await hash(user.password, 5);

    try{
        const data = await userService.create(user);
    
        if(data) {
            response.status(201).send('success');
        }else{
            response.status(400).send('register error');
        }
    }catch(err) {
        response.status(400).send('register error');
    }
});

export = router;