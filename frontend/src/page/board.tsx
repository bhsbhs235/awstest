import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

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

import { dateFormatter } from '../utils';
import globalStore from '../store/store';
import BoardService from '../services/board-service';
import { Board as BoardModel } from '../model/board';

import config from '../config';

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

function Board() {
	const height = 30;
	const navigate = useNavigate();
	const [boardList, setBoardList] = useState<any[]>([]);

	const routeChange = (url: string) => {
		navigate(url);
	}

	function onClickItem(num: number) {
		routeChange('/board_content?num=' + num);
	}

	async function loadBoardList() {
        const boardService = new BoardService();
        const result: BoardModel[] = await boardService.find();
		
        if(result) {
			result.sort((a: BoardModel, b: BoardModel) => {
				if(a.date && b.date){
					const aDate = new Date(a.date).getTime();
					const bDate = new Date(b.date).getTime();
					return bDate - aDate;
				}
				return 0;
			});
			setBoardList(result);
        }
	}
	
	useEffect(() => {
        loadBoardList();
    }, []);

	return(
		<div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
			<div style={{width: '90%'}}>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>번호</TableCell>
								<TableCell>이미지</TableCell>
								<TableCell>상품명</TableCell>
								<TableCell>작성자</TableCell>
								<TableCell>날짜</TableCell>
								<TableCell>조회수</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{boardList.map((data, i) => (
								<TableRow style={{cursor: 'pointer'}} key={i} onClick={() => onClickItem(0)}>
									<TableCell>{data.num}</TableCell>
									<TableCell>{data.imageFile && <img src={config.apiServer + '/uploads/' + data.imageFile} alt=" " width="50px" height="50px"  />}</TableCell>
									<TableCell>{data.title}</TableCell>
									<TableCell>{data.userinfo[0].name}</TableCell>
									<TableCell>{data.date && dateFormatter(data.date)}</TableCell>
									<TableCell>{data.count}</TableCell>
								</TableRow>
							))}
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
						{globalStore.userName !== '' &&
							<Button variant="outlined" color="primary" size="small" startIcon={<CreateIcon/>} onClick={() => routeChange('/board_write')}>
								글쓰기
							</Button>
						}
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

//export default Board;
export default inject(({ globalStore }) => ({
    userName: globalStore.userName,
}))(observer(Board));