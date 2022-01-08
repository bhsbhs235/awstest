import axios from 'axios';
import { Board } from '../model/board';
import config from '../config';

export default class BoardService {
    public getAccessToken() {
        return sessionStorage.getItem('accessToken');
    }

    //글 목록 요청.
    public async find() {
        const accessToken = this.getAccessToken();
        const checkAccessToken = accessToken !== null ? accessToken : '';

        const res = await axios.post(
            config.apiServer + '/board/list', 
            {},
            { 
                headers: {
                    'x-access-token': checkAccessToken
                }
            }
        ).catch(function (error) {
            console.log(error);
            if (error.response) {
              return error;
            }
        });
        
        return res.data as Board[];
    }

    //이미지 업로드 요청.
    public async uploadImage(formData: FormData) {
        const accessToken = this.getAccessToken();
        const checkAccessToken = accessToken !== null ? accessToken : '';

        console.log(formData);
        const res = await axios.post(
            config.apiServer + '/board/uploadImage', 
            formData,
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
        
        return res.data;
    }

    //글쓰기 요청.
    public async write(board: Board) {
        const accessToken = this.getAccessToken();
        const checkAccessToken = accessToken !== null ? accessToken : '';

        const res = await axios.post(
            config.apiServer + '/board/write', 
            board,
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
        
        return res.data;
    }
}