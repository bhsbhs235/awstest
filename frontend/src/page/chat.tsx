import React from 'react';

import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import TextField from "@material-ui/core/TextField"

import CloseIcon from '@material-ui/icons/Close';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SendIcon from '@material-ui/icons/Send';

import makeStyles from "@material-ui/core/styles/makeStyles";

const chattingStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        border: "1px solid #dfdfdf",
        top: "calc(90% - 400px)",
        position: "fixed",
        right: "15px",
        width: "300px",
        height: "400px",
        backgroundColor: "#FFFFFF",
    },
});

function Chat() {
    return (
        <Box zIndex="modal" className={chattingStyles().container}>
            <Box bgcolor="primary.light" color="primary.contrastText" height="30px" p={0.5} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                <Box/>
                <Box>실시간 상담톡</Box>
                <IconButton color="inherit" size="small">
                    <CloseIcon/>
                </IconButton>
            </Box>
            {/*대화 내용*/}
            <Box overflow="auto" height="100%">
                <Box display="flex" flexDirection="row" alignItems="flex-start">
                    <Box p={0.5} m={0.5}>
                        <AccountCircleIcon/>
                    </Box>
                    <Box display="flex" flexDirection="column" justifyContent="flex-start" >
                        <Box width="90%" border="1px solid #dfdfdf" borderRadius="20px" p={0.5} m={0.5} fontSize={12} textAlign="left" style={{wordWrap: 'break-word'}}>
                            안녕하세요. 상담원입니다. 문의 내용을 남겨주세요.
                        </Box>
                        <Box width="90%" p={0.5} m={0.5} fontSize={12} color={'#707070'} textAlign="left">
                            2020.09.16. 22:54:33
                        </Box>
                    </Box>
                </Box>
                <Box display="flex" flexDirection="row" alignItems="flex-end" justifyContent="flex-end">
                    <Box display="flex" flexDirection="column" alignItems="flex-end">
                        <Box width="90%" border="1px solid #dfdfdf" borderRadius="20px" p={0.5} m={0.5} fontSize={12} textAlign="left" style={{wordWrap: 'break-word'}}>
                            테스트
                        </Box>
                        <Box width="90%" p={0.5} m={0.5} fontSize={12} color={'#707070'} textAlign="right">
                            2020.09.16. 22:54:33
                        </Box>
                    </Box>
                    <Box p={0.5} m={0.5}>
                        <AccountCircleIcon/>
                    </Box>
                </Box>
            </Box>
            <Box color="primary.contrastText" height="30px" p={0.5} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                <TextField variant="outlined" size="small" fullWidth={true} placeholder="메세지를 입력해주세요."></TextField>
                <IconButton color="primary" size="small">
                    <SendIcon/>
                </IconButton>
            </Box>
        </Box>
    )
}

export default Chat;