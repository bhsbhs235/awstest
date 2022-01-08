import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button"
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import PostAddIcon from '@material-ui/icons/PostAdd';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

import globalStore from '../store/store';
import AccountService from '../services/account-service';

function Header() {
    const navigate = useNavigate();

	const routeChange = (url: string) => {
		navigate(url);
    }

    async function loadProfile() {
        const accountService = new AccountService();
        const result = await accountService.getProfile();
        
        if(result['name']) {
            globalStore.setUserName(result['name']);
        }
    }

    function logout() {
        if (!sessionStorage.getItem("accessToken")) {
            return;
        }
      
        sessionStorage.removeItem("accessToken");
        globalStore.setUserName('');
        routeChange('/');
    }

    useEffect(() => {
        loadProfile();
    }, []);

    return (
        <div>
            <Box m={1}/>
            <Box display="flex" justifyContent="flex-end" alignItems="center">
                {globalStore.userName !== '' ? 
                    <>
                    <Box color={"#707070"} fontSize={14}>
                        {globalStore.userName}님, 환영합니다!
                    </Box>
                    <Box m={1}/>
                    <Button variant="outlined" color="primary" size="small" startIcon={<ExitToAppOutlinedIcon/>} onClick={() => logout()}>로그아웃</Button>
                    <Box m={1}/>
                    <Button variant="outlined" color="primary" size="small" startIcon={<SupervisorAccountIcon/>} onClick={() => routeChange('/admin')}>관리자모드</Button>
                    <Box m={1}/>
                    </> :
                    <>
                    <Button variant="outlined" color="primary" size="small" startIcon={<LockOpenIcon/>} onClick={() => routeChange('/login')}>로그인</Button>
                    <Box m={1}/>
                    <Button variant="outlined" color="primary" size="small" startIcon={<PostAddIcon/>} onClick={() => routeChange('/register')}>회원가입</Button>
                    <Box m={1}/>
                    </>
                }
            </Box>
        </div>
    )
}

//export default Header;

export default inject(({ globalStore }) => ({
    userName: globalStore.userName,
}))(observer(Header));