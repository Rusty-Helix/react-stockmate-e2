

  // TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';

function BacktestingWidget() {
  const contariner = useRef();

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "symbols": [
            [
              "Apple",
              "AAPL|12M"
            ],
            [
              "Google",
              "GOOGL|12M"
            ],
            [
              "Microsoft",
              "MSFT|12M"
            ]
          ],
          "chartOnly": false,
          "width": "100%",
          "height": "100%",
          "locale": "en",
          "colorTheme": "dark",
          "autosize": true,
          "showVolume": true,
          "showMA": true,
          "hideDateRanges": false,
          "hideMarketStatus": false,
          "hideSymbolLogo": false,
          "scalePosition": "right",
          "scaleMode": "Normal",
          "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
          "fontSize": "10",
          "noTimeScale": false,
          "valuesTracking": "1",
          "changeMode": "price-and-percent",
          "chartType": "candlesticks",
          "maLineColor": "#2962FF",
          "maLineWidth": 1,
          "maLength": 9,
          "lineType": 0,
          "dateRanges": [
            "12m|1D",
            "60m|1W",
            "all|1M"
          ],
          "upColor": "rgba(247, 82, 95, 1)",
          "downColor": "rgba(34, 171, 148, 1)",
          "borderUpColor": "rgba(247, 82, 95, 1)",
          "borderDownColor": "rgba(34, 171, 148, 1)",
          "wickUpColor": "rgba(247, 82, 95, 1)",
          "wickDownColor": "rgba(34, 171, 148, 1)"
        }`;
      contariner.current.appendChild(script);
    },
    []
  );

  return (
    <div className="tradingview-widget-container" ref={contariner}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow noreferrer" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a></div>
    </div>
  );
}

export default memo(BacktestingWidget);
