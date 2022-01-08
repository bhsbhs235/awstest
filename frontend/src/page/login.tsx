import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Container from '@material-ui/core/Container';

import makeStyles from "@material-ui/core/styles/makeStyles";

import AccountService from '../services/account-service';

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

function Login() {
	const navigate = useNavigate();
	const classes = useStyles();
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string>('');

	async function onSubmit() {
		const accountService = new AccountService();

		if(email === '' || password === '') {
			alert('입력되지 않은 정보가 있습니다.');
			return;
		}
		
		const result = await accountService.login(email, password);
		if(result.type === 'success') {
			navigate('/');
		}else{
			console.log(result);
			setError(result['message']);
		}
	}

	return(
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
				로그인을 해주세요.
				</Typography>
				<form className={classes.form} noValidate method='post'>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="이메일 주소"
						autoFocus
						value={email}
						onChange={e => {
							setEmail(e.target.value);
						}}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="비밀번호"
						type="password"
						value={password}
						onChange={e => {
							setPassword(e.target.value);
						}}
					/>
					<Button type="button" fullWidth variant="contained" color="primary" className={classes.button} onClick={onSubmit}>로그인</Button>
					<Button type="button" fullWidth variant="contained" color="primary" className={classes.button} onClick={() => navigate('/register')}>회원가입</Button>
					{error !== '' && 
					<Box color={'#FF0000'} padding={1}>
						{
							error === 'email not exist' ? '이메일 주소가 일치하지 않습니다.' : 
							error === 'password incorrect' ? '비밀번호가 일치하지 않습니다.' :
							'로그인 오류가 발생하였습니다.'
						}
					</Box>
					}
				</form>
			</div>
		</Container>
	);
}

export default Login;