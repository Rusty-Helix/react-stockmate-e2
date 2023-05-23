import {useEffect} from 'react'
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import Background from "./components/Background";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {ToastContainer, ToastOptions, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import {clearToasts, setUserStatus} from "./app/slices/AppSlice";


import "./scss/index.scss";
import Strategies from "./pages/Strategies";
import UserStrategies from "./pages/UserStrategies";
import Review from "./pages/Review";
import Stock from "./pages/Stock";
import Strategy from "./pages/Strategy";
import Simulation from "./pages/Simulation";
// @ts-ignore
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
            <Route element={<Strategies />} path="/strategies" />
            <Route element={<UserStrategies />} path="/user-strategies" />
            <Route element={<Review />} path="/review" />
            <Route element={<Stock />} path="/stock" />
            <Route element={<Strategy />} path="/strategy/:id" />
            <Route element={<Strategy />} path="/strategy/" />
            <Route element={<Simulation />} path="/simulation/" />
            <Route element={<Navigate to="/strategies"/>} path="*"/>
          </Routes>
         {/* {
            true?
            (
            <Footer />
              ):(
            <Footer />
            )
          }  */}
          <Footer />
          <ToastContainer />
        </div>
        </BrowserRouter>
      </div>
    )
}

export default App