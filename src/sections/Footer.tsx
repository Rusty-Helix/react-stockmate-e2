import React from "react"
import { MdOutlinePowerSettingsNew } from "react-icons/md"
import {signOut} from "firebase/auth";
import {firebaseAuth} from "../utils/FirebaseConfig";
import {useAppDispatch} from "../app/hooks";
import {setToast, setUserStatus} from "../app/slices/AppSlice";
import {Link, useLocation} from "react-router-dom";

function Footer() {

    const stockNavigationRoutes = [
        {
            name: "股市資訊",
            route: "/stock",
        },{
            name: "股市資訊",
            route: "/stock",
        },{
            name: "股市資訊",
            route: "/stock",
        },{
            name: "股市資訊",
            route: `/stock`,
        },{
            name: "股市資訊",
            route: "/stock",
        },
    ]
    const strategyNavigationRoutes = [
        {
            name: "你的策略",
            route: "/user-strategies",
        },{
            name: "策略圖鑑",
            route: "/strategies",
        },{
            name: "策略分析",
            route: "/strategies",
        },{
            name: "經典策略",
            route: "/strategies",
        },
        {
            name: "熱門策略",
            route: "/strategies",
        },
    ]
     const simulationNavigationRoutes = [
        {
            name: "交易紀錄",
            route: "/history",
        },{
            name: "手動回測",
            route: "/strategies",
        },{
            name: "手動前測",
            route: "/simulation",
        },{
            name: "自動回測",
            route: `/strategies`,
        },{
            name: "自動前測",
            route: "/review",
        },
    ]
    const notesNavigationRoutes = [
        {
            name: "投資筆記",
            route: "/notes",
        },{
            name: "投資筆記",
            route: "/notes",
        },{
            name: "模擬交易",
            route: "/notes",
        },{
            name: "投資筆記",
            route: `/notes`,
        },{
            name: "檢討報告",
            route: "/notes",
        },
    ]
    const reviewNavigationRoutes = [
        {
            name: "績效報表",
            route: "/review",
        },{
            name: "策略心智圖",
            route: "/review",
        },{
            name: "交易折線圖",
            route: "/review",
        },{
            name: "投資筆記",
            route: `/review`,
        },{
            name: "檢討報告",
            route: "/review",
        },
    ]
    
    const dispatch = useAppDispatch();
    const handleLogOut = () => {
        signOut(firebaseAuth);
        dispatch(setUserStatus(undefined));
        dispatch(setToast("登出股伴"));
    }
    const location = useLocation();
    // if (location.pathname=="")
    interface NavigationObject {
        [history:string]: Array<object>;
        // [strategies: string]: string;
        // simulation: string;
        // notes: string;
        // review: string;
    }
    const navigationObject:NavigationObject = {
        stock: stockNavigationRoutes,
        // stock: stockNavigationRoutes,
        // stock: stockNavigationRoutes,
        // stock: stockNavigationRoutes,
        // stock: stockNavigationRoutes,


        strategies: strategyNavigationRoutes,
        "user-strategies": strategyNavigationRoutes,
        "": strategyNavigationRoutes,
        // strategies: strategyNavigationRoutes,
        // strategies: strategyNavigationRoutes,
        // strategies: strategyNavigationRoutes,

        simulation: simulationNavigationRoutes,
        // simulation: simulationNavigationRoutes,
        // simulation: simulationNavigationRoutes,
        // simulation: simulationNavigationRoutes,
        // simulation: simulationNavigationRoutes,

        notes: notesNavigationRoutes,
        // notes: notesNavigationRoutes,
        // notes: notesNavigationRoutes,
        // notes: notesNavigationRoutes,
        // notes: notesNavigationRoutes,
        
        review: reviewNavigationRoutes
        // review: reviewNavigationRoutes
        // review: reviewNavigationRoutes
        // review: reviewNavigationRoutes
        // review: reviewNavigationRoutes
    }
    // const navigationRoutes = navigationObject[location.pathname.substring(1)]
    
    // const key = (location.pathname==="/") ? "strategies" : location.pathname.substring(1)
    const key = location.pathname.substring(location.pathname.lastIndexOf('/')+1)
    const navigationRoutes = navigationObject[key]
    
    return <footer>
        <div className="block">
            {/* <MdOutlinePowerSettingsNew /> */}
        </div>
             <div className="data">
            <ul>
                {/* <div className="underline"></div>
                <div className="underline"></div>
                <div className="underline"></div> */}

                
                {navigationRoutes.map(
                // @ts-ignore
                ({name,route}, index)=>{
                // {navigationObject[`$`].map(({name,route}, index)=>{
                        return (
                            <Link to={route} key={index}>
                                <li>{name}</li>
                            </Link>
                        )       
                    })}
            </ul>
        </div>
        {/* <div className="data"></div> */}
        <div className="block">
            <MdOutlinePowerSettingsNew onClick={handleLogOut}/>
        </div>

    </footer>;
}

export default Footer