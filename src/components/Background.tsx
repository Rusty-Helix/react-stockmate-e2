import React from "react"
import bullishIcon from "../assets/bullish-icon.png"
import bearishIcon from "../assets/bearish-icon.png"

function Background() {
    return (
            <div className="background">
                <img src={bullishIcon} alt="bullish" className="bullish-icon" />
                <img src={bearishIcon} alt="bearish" className="bearish-icon" />
                {/* <img src={bullishIcon} alt="bullish" className="bullish-icon" />
                <img src={bearishIcon} alt="bearish" className="bearish-icon" />
                <img src={bullishIcon} alt="bullish" className="bullish-icon" />
                <img src={bearishIcon} alt="bearish" className="bearish-icon" />
                <img src={bullishIcon} alt="bullish" className="bullish-icon" />
                <img src={bearishIcon} alt="bearish" className="bearish-icon" /> */}
            </div>
        )
}

export default Background