import { useState } from 'react'

import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import Login from "./components/Login"
import { ThemeProvider } from './components/ThemeProvider';
import { LogIn } from 'react-feather'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


const MainRoute = ({ setActiveBoard, activeBoard }) => {
  if (!localStorage.getItem("user_id")) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Sidebar  setActiveBoard={setActiveBoard} />
      <Main activeBoard={activeBoard} />
    </>
  );
};


function App() {
  const [count, setCount] = useState(0)
  const [activeBoard, setActiveBoard] = useState(null);
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("user_id"));

  const handleLogin = () => {
    setIsLogin(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    setIsLogin(false);
  };

  const boards = useSelector((state) => state.board?.boards || []);
  const dispatch = useDispatch();

  const addBoard = () => {
    const newBoard = {id: Date.now(), name: 'New Board'};
    dispatch({ type: 'ADD_BOARD', payload: newBoard});
  };

  const selectBoard = (board) => {
    setActiveBoard(board);
  };

  return (
    <>
      <ThemeProvider>
        {isLogin && <Header onLogout={handleLogout} />}
        


        <div className="content">

          <BrowserRouter>

            <Routes>
              <Route path="/" element={<Login onLogin={handleLogin}/>} />
              <Route
                path="/main"
                element={
                  
                    isLogin
                      ? <MainRoute setActiveBoard={setActiveBoard} activeBoard={activeBoard} />
                      : <Navigate to="/" replace />
                  
                } />
            </Routes>

          </BrowserRouter>


        </div>
      </ThemeProvider>
    </>
  )
}

export default App
