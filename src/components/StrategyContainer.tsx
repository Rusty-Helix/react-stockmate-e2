import React from "react";

export default function StrategyContainer({ image }: { image: string }) {
  return (
    <>
      <div className="circle-container">
        <div className="outer-circle">
          <div className="inner-circle">
            <img src={image} alt="" />
          </div>
          <div className="lines">
            <div className="line line-1"></div>
            <div className="line line-2"></div>
          </div>
        </div>
      </div>
      {/* <div className="circle-container circle-container-2">
        <div className="outer-circle">
          <div className="inner-circle">
            <img src={pikachu} alt="" />
          </div>
          <div className="lines">
            <div className="line line-1"></div>
            <div className="line line-2"></div>
          </div>
        </div>
      </div>
      <div className="circle-container circle-container-3">
        <div className="outer-circle">
          <div className="inner-circle">
            <img src={charlizard} alt="" />
          </div>
          <div className="lines">
            <div className="line line-1"></div>
            <div className="line line-2"></div>
          </div>
        </div>
      </div> */}
    </>
  );
}
