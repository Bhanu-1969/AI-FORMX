import { useState,useEffect } from 'react';
import './App.css';
import FormBuilder from "./components/FormBuilder";
import Home from "./components/Home";
import Login from "./components/Login";
import UserForm from './components/UserForm';
import Register from "./components/Register";
import Thankyou from './components/Thankyou';
import React from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
function App() {
  const [isAuthenticated, setAuth] = useState(!!localStorage.getItem("token"));
  const [userid,setuserid]=useState("")
  useEffect(() => {
    const storedUserId = localStorage.getItem("userid");
    if (storedUserId) {
      setuserid(storedUserId);
    }
  }, []);

  return(
    <Router>
      <Routes>
      <Route path="/register" element={<Register setAuth={setAuth} />} />
        <Route path="/login" element={<Login setAuth={setAuth} setuserid={setuserid} />} />
        <Route path="/" element={<Login setAuth={setAuth} setuserid={setuserid} />} />
        <Route path='/createform' element={<FormBuilder userid={userid}/>}/>
        <Route path="/home" element={isAuthenticated ? <Home userid={userid}/>: <Login setAuth={setAuth} />} />
        <Route path='/userform/:id' element={<UserForm/>}/>
        <Route path='/thankyou' element={<Thankyou/>}/>
      </Routes>
    </Router>

  )
}

export default App
