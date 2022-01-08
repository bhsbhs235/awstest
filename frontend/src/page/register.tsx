import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Container from '@material-ui/core/Container';
import makeStyles from "@material-ui/core/styles/makeStyles";

import AccountService from '../services/account-service';
import { User } from '../model/user';

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
	button: {
	  margin: theme.spacing(1.5, 0, 0),
	},
}));

function Register() {
	const navigate = useNavigate();
	const classes = useStyles();
	const [user, setUser] = useState<User>({email: '', name: '', password: '', adminlevel: 0});
	const [passwordCheck, setPasswordCheck] = useState<string>('');
	const [error, setError] = useState<boolean>(false);

	async function onSubmit() {
		if(user.email === '' || user.name === '' || user.password === '') {
			alert('입력되지 않은 정보가 있습니다.');
			return;
		}

		if(passwordCheck !== user.password) {
			alert('비밀번호가 일치하지 않습니다.');
			return;
		}
		
		const accountService = new AccountService();
		const result = await accountService.register(user);
		if(result === 'success') {
			navigate('/login');
		}else{
			setError(true);
		}
	}

	return(
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
				회원가입을 해주세요.
				</Typography>
				<form className={classes.form} noValidate method='post'>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="이메일 주소"
						autoFocus
						value={user.email}
						onChange={e => {
							let tempUser = {...user};
							tempUser.email = e.target.value;
							setUser(tempUser);
						}}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="성명"
						value={user.name}
						onChange={e => {
							let tempUser = {...user};
							tempUser.name = e.target.value;
							setUser(tempUser);
						}}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="비밀번호"
						type="password"
						value={user.password}
						onChange={e => {
							let tempUser = {...user};
							tempUser.password = e.target.value;
							setUser(tempUser);
						}}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="비밀번호 확인"
						type="password"
						value={passwordCheck}
						onChange={e => {
							setPasswordCheck(e.target.value);
						}}
					/>
					<Button type="button" fullWidth variant="contained" color="primary" className={classes.button} onClick={onSubmit}>회원가입</Button>
					<Button type="button" fullWidth variant="contained" color="primary" className={classes.button} onClick={() => navigate(-1)}>취소</Button>
					{error && 
					<Box color={'#FF0000'} padding={1}>
						가입에 실패하였습니다.
					</Box>
					}
				</form>
			</div>
		</Container>
	);
}

export default Register;