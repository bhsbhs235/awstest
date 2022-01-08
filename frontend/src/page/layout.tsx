import React from 'react';
import { Provider } from 'mobx-react';
import { Routes, Route } from 'react-router-dom';

import Header from './header';
import Board from './board';
import BoardWrite from './board-write';
import BoardContent from './board-content';
// import Chat from './chat';
import Admin from './admin/admin';

import globalStore from '../store/store';

function Layout() {
    return (
        <>
        <Provider globalStore={globalStore}>
            <Header/>
            <Routes>
                <Route path='/board' element={<Board />}/>
                <Route path='/board_write' element={<BoardWrite />}/>
                <Route path='/board_content' element={<BoardContent />}/>
                <Route path="/admin" element={<Admin />}/>
                <Route path='/' element={<Board />}/>
            </Routes>
            {/*<Chat/>*/}
        </Provider>
        </>
    )
}

export default Layout;