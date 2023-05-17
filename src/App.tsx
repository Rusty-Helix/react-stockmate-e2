import {useEffect} from 'react'
import Navbar from "./sections/Navbar";
import Wrapper from "./sections/Wrapper";
import Footer from "./sections/Footer";
import Background from "./components/Background";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {ToastContainer, ToastOptions, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import {clearToasts, setUserStatus} from "./app/slices/AppSlice";


import "./scss/index.scss";
import Search from "./pages/Search";
import UserStrategies from "./pages/UserStrategies";
import About from "./pages/About";
import Compare from "./pages/Compare";
import Strategy from "./pages/Strategy";
// @ts-ignore
import Playground from "./pages/Playground";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {onAuthStateChanged} from "firebase/auth";
import {firebaseAuth} from "./utils/FirebaseConfig";


function App() {

  const {toasts} = useAppSelector(({app})=>app);
  const dispatch = useAppDispatch();


  useEffect(()=>{
    onAuthStateChanged(firebaseAuth, (currentUser)=> {
      if(currentUser){
        dispatch(setUserStatus({email: currentUser.email}))
      }
    });
  }, [dispatch]);

  useEffect(()=>{
    if(toasts.length){
      const toastOptions: ToastOptions = {
        position:"bottom-right",
        autoClose: 2000,
        pauseOnHover:true,
        draggable:true,
        theme: "dark"
      }
      toasts.forEach((message:string)=>{
        toast(message, toastOptions);
      });
      dispatch(clearToasts())
    }
  },[toasts, dispatch]);

  return (
      <div className="main-container">
        <Background />
        <BrowserRouter>
        <div className="app">
          <Navbar />
          <Routes>
            <Route element={<Search />} path="/search" />
            <Route element={<UserStrategies />} path="/user-strategies" />
            <Route element={<About />} path="/about" />
            <Route element={<Compare />} path="/compare" />
            <Route element={<Strategy />} path="/strategy/:id" />
            <Route element={<Navigate to="/about"/>} path="*"/>
          </Routes>
          <Footer />
          <ToastContainer />
        </div>
        </BrowserRouter>
      </div>
    )
}

export default App