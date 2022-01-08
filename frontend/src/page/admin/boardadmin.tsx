import React from 'react';
import { useNavigate } from 'react-router-dom';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
//import TableFooter from '@material-ui/core/TableFooter';
import Pagination from '@material-ui/lab/Pagination';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"

import CreateIcon from '@material-ui/icons/Create';

//import { withStyles } from "@material-ui/core/styles";

// const styles = {
//   input1: {
//     height: 50
//   },
//   input2: {
//     height: 200,
//     fontSize: "3em"
//   }
// };

// const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
	
// };

// const handleChangeRowsPerPage = (event: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>) => {
	
// };

function BoardAdmin() {
	const height = 30;
	const navigate = useNavigate();

	const routeChange = (url: string) => {
		navigate(url);
	}

	function onClickItem(num: number) {
		routeChange('/board_content/' + num);
	}

	return(
		<div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
			<div style={{width: '90%'}}>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell align="center">번호</TableCell>
								<TableCell align="center">이미지</TableCell>
								<TableCell align="center">상품명</TableCell>
								<TableCell align="center">작성자</TableCell>
								<TableCell align="center">날짜</TableCell>
								<TableCell align="center">동작</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow style={{cursor: 'pointer'}} onClick={() => onClickItem(0)}>
								<TableCell align="center">1</TableCell>
								<TableCell align="center"></TableCell>
								<TableCell align="center">아아</TableCell>
								<TableCell align="center">홍길동</TableCell>
								<TableCell align="center">2020.09.14</TableCell>
								<TableCell align="center">
									<Box display="flex" flexDirection="row" justifyContent="center">
										<Button variant="outlined" color="primary" size="small">댓글 관리</Button>
										<Box m={0.2}/>
										<Button variant="outlined" color="primary" size="small">삭제</Button>
									</Box>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
				<Box m={2}/>
				<Box display="flex" justifyContent="space-between">
					<Box m={1}/>
					<Box>
						<Pagination count={11} defaultPage={1} siblingCount={0} variant="outlined" color="primary"/>
					</Box>
					<Box display="flex">
						<Button variant="outlined" color="primary" size="small" startIcon={<CreateIcon/>} onClick={() => routeChange('/board_write')}>
							글쓰기
						</Button>
						<Box m={1}/>
					</Box>
				</Box>
				<Box m={2}/>
				<Box display="flex" flexDirection="row" justifyContent="center" height="30px">
					<TextField variant="outlined" rows={1} placeholder="검색어를 입력해주세요" InputProps={{style: {height, padding: '0 14px'}}}/>
					<Box m={1}/>
					<Button variant="outlined" color="primary" size="small">검색</Button>
				</Box>
			</div>
		</div>
	);
}

export default BoardAdmin;