import axios from 'axios';
import { User } from '../model/user';
import config from '../config';

export default class AccountService {
    public getAccessToken() {
        return sessionStorage.getItem('accessToken');
    }

    //프로필 요청.
    public async getProfile() {
        const accessToken = this.getAccessToken();
        const checkAccessToken = accessToken !== null ? accessToken : '';

        const res = await axios.get(
            config.apiServer + '/account/profile', 
            { 
                headers: {
                    'x-access-token': checkAccessToken
                }
            }
        ).catch(function (error) {
            console.log(error);
          if (error.response) {
            return error.response;
          }
        });
        
        console.log(res);
        return res.data;
    }

    //가입 요청.
    public async register(user: User) {
        const res = await axios.post(
            config.apiServer + '/account/register', 
            user
        ).catch(function (error) {
            console.log(error);
          if (error.response) {
            return error.response;
          }
        });
        
        return res.data;
    }

    //로그인 요청.
    public async login(email: string, password: string) {
        try{
            const res = await axios.post(
                config.apiServer + '/account/login', 
                {email: email, password: password}
            );

            if(res.data) {
                let token: string = res.data['token'];

                //얻어온 토큰을 세션 스토리지에 보관.
                sessionStorage.setItem("accessToken", token);

                return {
                    type: 'success',
                    name: res.data['name'],
                    message: token,
                }
            }
            
            return {
                type: 'error',
                message: 'no token'
            }
        }catch(error) {
            console.log(error);
            return { 
                type: 'error',
                message: 'error.response.data'
            };
        }
    }
}