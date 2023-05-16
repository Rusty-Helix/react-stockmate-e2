import React, {useEffect} from "react"
import stockmateLogo from "../assets/stockmate-logo.png"
import {GiHamburgerMenu} from "react-icons/gi";
import {Link, useLocation} from "react-router-dom";

function Navbar() {

    const location = useLocation();

    const navigationRoutes = [
        {
            name: "交易紀錄",
            route: "/compare",
        },{
            name: "策略圖鑑",
            route: "/search",
        },{
            name: "你的策略",
            route: "/user-strategies",
        },{
            name: "投資筆記",
            route: "/strategy/:id",
        },{
            name: "檢討報告",
            route: "/about",
        },
    ]

    useEffect(()=>{
        const index = navigationRoutes.findIndex(({route})=>
        location.pathname.includes(route));
        ul(index)
    }, [location.pathname, navigationRoutes]);

    function ul(index:number) {
        const underlines = document.querySelectorAll<HTMLElement>(".underline")
        for (let i = 0; i < underlines.length; i++){
            underlines[i].style.transform=`translate3d(${index*100}%,0,0)`
        }
    }
    // console.log({stockmateLogo})

    return <nav>
        <div className="block">
        <img src={stockmateLogo} alt="stockmate logo" />
        </div>

        <div className="data">
            <ul>
                <div className="underline"></div>
                <div className="underline"></div>
                <div className="underline"></div>
                {navigationRoutes.map(({name,route}, index)=>{
                        return (
                            <Link to={route} key={index}>
                                <li>{name}</li>
                            </Link>
                        )       
                    })}
            </ul>
        </div>

        <div className="block">
            <GiHamburgerMenu />
        </div>
    </nav>;
}

export default Navbar