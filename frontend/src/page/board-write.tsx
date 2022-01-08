import React, { useState } from 'react';

// v5 react-router-dom
// import { useHistory } from 'react-router-dom';
// https://www.digitalocean.com/community/tutorials/react-react-router-v6
// https://stackoverflow.com/questions/65948671/how-to-go-back-to-previous-route-in-react-router-dom-v6
import { useNavigate } from 'react-router-dom';

import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
// import TextareaAutosize from "@material-ui/core/TextareaAutosize"
// import Typography from "@material-ui/core/Typography"
import Container from '@material-ui/core/Container';

import makeStyles from "@material-ui/core/styles/makeStyles";

import BoardService from '../services/board-service';
import { Board } from '../model/board';
// import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
	paper: {
	  marginTop: theme.spacing(8),
	  display: 'flex',
	  flexDirection: 'column',
	  alignItems: 'center',
	},
	form: {
	  width: '100%', // Fix IE 11 issue.
	  marginTop: theme.spacing(1),
	},
	submit: {
	  margin: theme.spacing(1.5, 0, 0),
	},
  }));

function BoardWrite() {
	const navigate = useNavigate();
	const classes = useStyles();
	const [board, setBoard] = useState<Board>({title: '', content: '', imageFile: ''});
	const [file, setFile] = useState<any>(null);

	async function onSubmit() {
		if(board.title === '' || board.content === '') {
			alert('입력되지 않은 정보가 있습니다.');
			return;
		}
		
		const boardService = new BoardService();		

		//이미지 업로드.
		const formData = new FormData();
		formData.append("file", file); 
		
		// const fileResult = await boardService.uploadImage(formData);
		await boardService.uploadImage(formData);

		const result = await boardService.write(board);
		if(result === 'success') {
			navigate('/board');
		}else{
			alert('등록 중 오류가 발생하였습니다.');
		}
	}

	return(
		<Container component="main" maxWidth="md">
			<div className={classes.paper}>
				<form className={classes.form} noValidate method='post'>
				<TextField
					variant="outlined"
					margin="normal"
					fullWidth
					label="상품명"
					autoFocus
					value={board.title}
					onChange={e => {
						let tempBoard = {...board};
						tempBoard.title = e.target.value;
						setBoard(tempBoard);
					}}
				/>
				<TextField
					variant="outlined"
					margin="normal"
                    multiline
                    rows={15}
					fullWidth
					label="내용을 입력하세요."
					value={board.content}
					onChange={e => {
						let tempBoard = {...board};
						tempBoard.content = e.target.value;
						setBoard(tempBoard);
					}}
				/>
				<Box display='flex' flexDirection='row'>
					<Button variant="contained" component="label" style={{minWidth: '100px'}}>파일 선택
						<input type="file" accept="image/*" style={{ display: 'none' }} 
							onChange={e => {
								if(e.target.files) 
									setFile(e.target.files[0]);

									let tempBoard = {...board};
									tempBoard.imageFile = e.target.value.split('\\')[e.target.value.split('\\').length - 1];
									setBoard(tempBoard);
							}}/>
					</Button>
					<TextField
						variant="outlined"
						margin="normal"
						type="text"
						fullWidth
						value={board.imageFile}
					/>
				</Box>
				{/*}
                <TextField
					variant="outlined"
					margin="normal"
					accep
                    type="file"
					fullWidth
					value={board.imageFile}
					onChange={e => {
						let tempBoard = {...board};
						tempBoard.imageFile = e.target.files[0];
						setBoard(tempBoard);
					}}
				/>
				*/}
				<Button
					type="button"
					fullWidth
					variant="contained"
					color="primary"
					className={classes.submit}
					onClick={onSubmit}
				>
					글쓰기
				</Button>
				<Button
					type="button"
					fullWidth
					variant="contained"
					color="primary"
					className={classes.submit}
					onClick={() => navigate(-1)}
				>
					취소
				</Button>
				</form>
			</div>
		</Container>
	);
}

export default BoardWrite;