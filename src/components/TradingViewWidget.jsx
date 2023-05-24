// TradingViewWidget.jsx

import React, { useEffect, useRef } from 'react';

let tvScriptLoadingPromise;

export default function TradingViewWidget() {
  const onLoadScriptRef = useRef();

  useEffect(
    () => {
      onLoadScriptRef.current = createWidget;

      if (!tvScriptLoadingPromise) {
        tvScriptLoadingPromise = new Promise((resolve) => {
          const script = document.createElement('script');
          script.id = 'tradingview-widget-loading-script';
          script.src = 'https://s3.tradingview.com/tv.js';
          script.type = 'text/javascript';
          script.onload = resolve;

          document.head.appendChild(script);
        });
      }

      tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

      return () => onLoadScriptRef.current = null;

      function createWidget() {
        if (document.getElementById('tradingview_118be') && 'TradingView' in window) {
          new window.TradingView.widget({
            autosize: true,
            symbol: "BCBA:TSMC",
            timezone: "Asia/Taipei",
            theme: "dark",
            style: "1",
            locale: "en",
            toolbar_bg: "#f1f3f6",
            enable_publishing: true,
            withdateranges: true,
            range: "YTD",
            hide_side_toolbar: false,
            allow_symbol_change: true,
            watchlist: ["TWSE:2412","NYSE:TSM","BCBA:TSMC"],
            details: true,
            hotlist: true,
            calendar: true,
            studies: ["STD;Average%Day%Range"],
            container_id: "tradingview_118be"
          });
        }
      }
    },
    []
  );

  return (
    <div className='tradingview-widget-container'>
      <div id='tradingview_118be' />
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow noreferrer" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a>
      </div>
    </div>
  );
}
