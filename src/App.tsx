import {useEffect} from 'react'
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import Background from "./components/Background";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {ToastContainer, ToastOptions, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import {clearToasts, setUserStatus} from "./app/slices/AppSlice";


import "./scss/index.scss";
import Strategies from "./pages/Strategies/Strategies";
import UserStrategies from "./pages/Strategies/UserStrategies";
import Strategy from "./pages/Strategy";

// 1 Stock
import MarketOverview from "./pages/Stock/MarketOverview";
import Heatmaps from "./pages/Stock/Heatmaps";
import Rankings from "./pages/Stock/Rankings";
import News from "./pages/Stock/News";
import Encyclopedia from "./pages/Stock/Encyclopedia";

// 3 Paper Trading
import TradingHistory from "./pages/Simulation/TradingHistory";
import ManualBacktesting from "./pages/Simulation/ManualBacktesting";
import AutoBacktesting from "./pages/Simulation/AutoBacktesting";
import ManualForwardTesting from "./pages/Simulation/ManualForwardTesting";
import AutoForwardTesting from "./pages/Simulation/AutoForwardTesting";

// 5 Review
import Review from "./pages/Review/Review";

import Notes from "./pages/Notes/Notes";

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

            <Route element={<MarketOverview />} path="/market-overview" />
            <Route element={<Heatmaps />} path="/heatmaps" />
            <Route element={<Rankings />} path="/rankings" />
            <Route element={<News />} path="/news" />
            <Route element={<Encyclopedia />} path="/encyclopedia" />

            <Route element={<Strategy />} path="/strategy/:id" />
            <Route element={<Strategy />} path="/strategy/" />
            {/* <Route element={<Simulation />} path="/simulation/" /> */}

            <Route element={<TradingHistory />} path="/trading-history/" />
            <Route element={<ManualBacktesting />} path="/manual-backtesting/" />
            <Route element={<AutoBacktesting />} path="/auto-backtesting/" />
            <Route element={<ManualForwardTesting />} path="/manual-forward-testing/" />
            <Route element={<AutoForwardTesting />} path="/auto-forward-testing/" />

            <Route element={<Notes />} path="/notes/" />
            
            <Route element={<Review />} path="/review" />

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