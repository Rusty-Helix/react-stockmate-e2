// import ScriptTag from 'react-script-tag';
// import {require} from 'require';

export function HighCharts() {

  var Highcharts = require('highcharts');
  require('highcharts/modules/exporting')(Highcharts);

  function addPopupEvents(chart) {
     var closePopupButtons = document.getElementsByClassName('highcharts-close-popup')
    // Close popup button:
    Highcharts.addEvent(
        closePopupButtons[0],
        'click',
        function () {
            this.parentNode.style.display = 'none'
        }
    )

    Highcharts.addEvent(
        closePopupButtons[1],
        'click',
        function () {
            this.parentNode.style.display = 'none'
        }
    )

    // Add an indicator from popup
    Highcharts.addEvent(
        document.querySelectorAll('.highcharts-popup-indicators button')[0],
        'click',
        function () {
             const typeSelect = document.querySelectorAll(
                    '.highcharts-popup-indicators select'
                )[0],
                type = typeSelect.options[typeSelect.selectedIndex].value,
                period = document.querySelectorAll(
                    '.highcharts-popup-indicators input'
                )[0].value || 14

            chart.addSeries({
                linkedTo: 'aapl-ohlc',
                type: type,
                params: {
                    period: parseInt(period, 10)
                }
            })

            chart.stockToolbar.indicatorsPopupContainer.style.display = 'none'
        }
    )

    // Update an annotaiton from popup
    Highcharts.addEvent(
        document.querySelectorAll('.highcharts-popup-annotations button')[0],
        'click',
        function () {
             var strokeWidth = parseInt(
                    document.querySelectorAll(
                        '.highcharts-popup-annotations input[name="stroke-width"]'
                    )[0].value,
                    10
                ),
                strokeColor = document.querySelectorAll(
                    '.highcharts-popup-annotations input[name="stroke"]'
                )[0].value

            // Stock/advanced annotations have common options under typeOptions
            if (chart.currentAnnotation.options.typeOptions) {
                chart.currentAnnotation.update({
                    typeOptions: {
                        lineColor: strokeColor,
                        lineWidth: strokeWidth,
                        line: {
                            strokeWidth: strokeWidth,
                            stroke: strokeColor
                        },
                        background: {
                            strokeWidth: strokeWidth,
                            stroke: strokeColor
                        },
                        innerBackground: {
                            strokeWidth: strokeWidth,
                            stroke: strokeColor
                        },
                        outerBackground: {
                            strokeWidth: strokeWidth,
                            stroke: strokeColor
                        },
                        connector: {
                            strokeWidth: strokeWidth,
                            stroke: strokeColor
                        }
                    }
                })
            } else {
                // Basic annotations:
                chart.currentAnnotation.update({
                    shapes: [{
                        'stroke-width': strokeWidth,
                        stroke: strokeColor
                    }],
                    labels: [{
                        borderWidth: strokeWidth,
                        borderColor: strokeColor
                    }]
                })
            }
            chart.stockToolbar.annotationsPopupContainer.style.display = 'none'
        }
    )
}

Highcharts.getJSON('https://demo-live-data.highcharts.com/aapl-ohlcv.json', function (data) {

    // split the data set into ohlc and volume
        var ohlc = []
        var volume = []
        var dataLength = data.length
        let i = 0

    for (; i < dataLength; i += 1) {
        ohlc.push([
            data[i][0], // the date
            data[i][1], // open
            data[i][2], // high
            data[i][3], // low
            data[i][4] // close
        ])

        volume.push([
            data[i][0], // the date
            data[i][5] // the volume
        ])
    }

    Highcharts.stockChart('container', {
        chart: {
            events: {
                load: function () {
                    addPopupEvents(this)
                }
            }
        },
        yAxis: [{
            labels: {
                align: 'left'
            },
            height: '80%',
            resize: {
                enabled: true
            }
        }, {
            labels: {
                align: 'left'
            },
            top: '80%',
            height: '20%',
            offset: 0
        }],
        navigationBindings: {
            events: {
                selectButton: function (event) {
                        var newClassName = event.button.className + ' highcharts-active'
                        var topButton = event.button.parentNode.parentNode

                    if (topButton.classList.contains('right')) {
                        newClassName += ' right'
                    }

                    // If this is a button with sub buttons,
                    // change main icon to the current one:
                    if (!topButton.classList.contains('highcharts-menu-wrapper')) {
                        topButton.className = newClassName
                    }

                    // Store info about active button:
                    this.chart.activeButton = event.button
                },
                deselectButton: function (event) {
                    event.button.parentNode.parentNode.classList.remove('highcharts-active')

                    // Remove info about active button:
                    this.chart.activeButton = null
                },
                showPopup: function (event) {

                    if (!this.indicatorsPopupContainer) {
                        this.indicatorsPopupContainer = document
                            .getElementsByClassName('highcharts-popup-indicators')[0]
                    }

                    if (!this.annotationsPopupContainer) {
                        this.annotationsPopupContainer = document
                            .getElementsByClassName('highcharts-popup-annotations')[0]
                    }

                    if (event.formType === 'indicators') {
                        this.indicatorsPopupContainer.style.display = 'block'
                    } else if (event.formType === 'annotation-toolbar') {
                        // If user is still adding an annotation, don't show popup:
                        if (!this.chart.activeButton) {
                            this.chart.currentAnnotation = event.annotation
                            this.annotationsPopupContainer.style.display = 'block'
                        }
                    }

                },
                closePopup: function () {
                    this.indicatorsPopupContainer.style.display = 'none'
                    this.annotationsPopupContainer.style.display = 'none'
                }
            }
        },
        stockTools: {
            gui: {
                enabled: false
            }
        },
        series: [{
            type: 'candlestick',
            id: 'aapl-ohlc',
            name: 'AAPL Stock Price',
            data: ohlc
        }, {
            type: 'column',
            id: 'aapl-volume',
            name: 'AAPL Volume',
            data: volume,
            yAxis: 1
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 800
                },
                chartOptions: {
                    rangeSelector: {
                        inputEnabled: false
                    }
                }
            }]
        }
    })
})


  // var getStrokePaths = document.querySelectorAll("g.g.path")
  // var test = document.querySelector("div.chart-wrapper > div.chart > div#container")
  // var container = document.body.querySelector("div#container")
  var container = document.body.querySelector("div")
  container.addEventListener('click', function(){
    // alert('hello')
    var shapePaths = document.querySelectorAll("div.highcharts-container > svg > g.highcharts-annotation > g.highcharts-annotation-shapes > path")
    // console.log(shapePaths)

    for (let i = 0; i < shapePaths.length; i+=2){
      // shapeFillings1 = shapePaths[i]
      // shapeFillings2 = shapePaths[i+1]
      shapePaths[i].style.fill = "rgba(255, 255, 255, 0)"
      shapePaths[i].style.stroke = "rgba(255, 255, 255, 0)"
      shapePaths[i+1].style.fill = "rgba(0, 240, 240, 0.1)"
      shapePaths[i+1].style.stroke = "rgba(0, 170, 170, 0.1)"
    }
    

  })
  // getStrokePaths = document.querySelectorAll(`[fill="rgba(0, 0, 0.75)"]`)
  // console.log(getStrokePaths)
  // console.log(test)

  // let testArray = test.children
  // console.log(testArray) 

Highcharts.getJSON('https://demo-live-data.highcharts.com/aapl-ohlcv.json', function (data) {

    // split the data set into ohlc and volume
        var ohlc = [];
        var volume = [];
        var dataLength = data.length;
        var i = 0;

    for (i; i < dataLength; i += 1) {
        ohlc.push([
            data[i][0], // the date
            data[i][1], // open
            data[i][2], // high
            data[i][3], // low
            data[i][4] // close
        ]);

        volume.push([
            data[i][0], // the date
            data[i][5] // the volume
        ]);
    }

    Highcharts.stockChart('container', {
        chart: {
            events: {
                load: function () {
                    addPopupEvents(this);
                }
            }
        },
        yAxis: [{
            labels: {
                align: 'left'
            },
            height: '80%',
            resize: {
                enabled: true
            }
        }, {
            labels: {
                align: 'left'
            },
            top: '80%',
            height: '20%',
            offset: 0
        }],
        navigationBindings: {
            events: {
                selectButton: function (event) {
                        var newClassName = event.button.className + ' highcharts-active';
                        var topButton = event.button.parentNode.parentNode;

                    if (topButton.classList.contains('right')) {
                        newClassName += ' right';
                    }

                    // If this is a button with sub buttons,
                    // change main icon to the current one:
                    if (!topButton.classList.contains('highcharts-menu-wrapper')) {
                        topButton.className = newClassName;
                    }

                    // Store info about active button:
                    this.chart.activeButton = event.button;
                },
                deselectButton: function (event) {
                    event.button.parentNode.parentNode.classList.remove('highcharts-active');

                    // Remove info about active button:
                    this.chart.activeButton = null;
                },
                showPopup: function (event) {

                    if (!this.indicatorsPopupContainer) {
                        this.indicatorsPopupContainer = document
                            .getElementsByClassName('highcharts-popup-indicators')[0];
                    }

                    if (!this.annotationsPopupContainer) {
                        this.annotationsPopupContainer = document
                            .getElementsByClassName('highcharts-popup-annotations')[0];
                    }

                    if (event.formType === 'indicators') {
                        this.indicatorsPopupContainer.style.display = 'block';
                    } else if (event.formType === 'annotation-toolbar') {
                        // If user is still adding an annotation, don't show popup:
                        if (!this.chart.activeButton) {
                            this.chart.currentAnnotation = event.annotation;
                            this.annotationsPopupContainer.style.display = 'block';
                        }
                    }

                },
                closePopup: function () {
                    this.indicatorsPopupContainer.style.display = 'none';
                    this.annotationsPopupContainer.style.display = 'none';
                }
            }
        },
        stockTools: {
            gui: {
                enabled: false
            }
        },
        series: [{
            type: 'candlestick',
            id: 'aapl-ohlc',
            name: 'AAPL Stock Price',
            data: ohlc
        }, {
            type: 'column',
            id: 'aapl-volume',
            name: 'AAPL Volume',
            data: volume,
            yAxis: 1
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 800
                },
                chartOptions: {
                    rangeSelector: {
                        inputEnabled: false
                    }
                }
            }]
        }
    });
});

 
 return (
  <div>
    {/* <ScriptTag type="text/javascript" src="https://code.highcharts.com/stock/highstock.js" />
    <ScriptTag type="text/javascript" src="https://code.highcharts.com/stock/modules/data.js" />

    <ScriptTag type="text/javascript" src="https://code.highcharts.com/stock/modules/drag-panes.js" />

    <ScriptTag type="text/javascript" src="https://code.highcharts.com/stock/indicators/indicators.js" />
    <ScriptTag type="text/javascript" src="https://code.highcharts.com/stock/indicators/bollinger-bands.js" />
    <ScriptTag type="text/javascript" src="https://code.highcharts.com/stock/indicators/ema.js" />

    <ScriptTag type="text/javascript" src="https://code.highcharts.com/stock/modules/annotations-advanced.js" />

    <ScriptTag type="text/javascript" src="https://code.highcharts.com/stock/modules/full-screen.js" />
    <ScriptTag type="text/javascript" src="https://code.highcharts.com/stock/modules/price-indicator.js" />
    <ScriptTag type="text/javascript" src="https://code.highcharts.com/stock/modules/stock-tools.js" />
    <ScriptTag type="text/javascript" src="https://code.highcharts.com/modules/accessibility.js" /> */}
    <div className="chart-wrapper">
  <div className="s-popup s-popup-indicators">
    <span className="highcharts-close-popup">&times</span>
    <div className="highcharts-popup-wrapper">
      <label htmlFor="indicator-list">Indicator</label>
      <select name="indicator-list">
        <option defaultValue="sma">SMA</option>
        <option defaultValue="ema">EMA</option>
        <option defaultValue="bb">Bollinger bands</option>
      </select>
      <label htmlFor="stroke">Period</label>
      <input type="text" name="period" defaultValue="14"/>
    </div>
    <button>Add</button>
  </div>
  <div className="highcharts-popup highcharts-popup-annotations">
    <span className="highcharts-close-popup">&times</span>
    <div className="highcharts-popup-wrapper">
      <label htmlFor="stroke">Color</label>
      <input type="text" name="stroke"/>
      <label htmlFor="stroke-width">Width</label>
      <input type="text" name="stroke-width"/>
    </div>
    <button>Save</button>
  </div>
  <div className="highcharts-stocktools-wrapper highcharts-bindings-container highcharts-bindings-wrapper">
    <div className="highcharts-menu-wrapper">
      <ul className="highcharts-stocktools-toolbar stocktools-toolbar">
        <li className="highcharts-indicators" title="Indicators">
        	<span className="highcharts-menu-item-btn"></span>
          <span className="highcharts-menu-item-title">Indicators</span>
        </li>
        <li className="highcharts-label-annotation" title="Simple shapes">
        	<span className="highcharts-menu-item-btn"></span>
          <span className="highcharts-menu-item-title">Shapes</span>
        	<span className="highcharts-submenu-item-arrow highcharts-arrow-right"></span>
          <ul className="highcharts-submenu-wrapper">
            <li className="highcharts-label-annotation" title="Label">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Label</span>
            </li>
            <li className="highcharts-circle-annotation" title="Circle">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Circle</span>
            </li>
            <li className="highcharts-rectangle-annotation " title="Rectangle">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Rectangle</span>
            </li>
            <li className="highcharts-ellipse-annotation" title="Ellipse">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Ellipse</span>
            </li>
          </ul>
        </li>
        <li className="highcharts-segment" title="Lines">
        	<span className="highcharts-menu-item-btn"></span>
          <span className="highcharts-menu-item-title">Lines</span>
        	<span className="highcharts-submenu-item-arrow highcharts-arrow-right"></span>
          <ul className="highcharts-submenu-wrapper">
            <li className="highcharts-segment" title="Segment">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Segment</span>
            </li>
            <li className="highcharts-arrow-segment" title="Arrow segment">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Arrow segment</span>
            </li>
            <li className="highcharts-ray" title="Ray">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Ray</span>
            </li>
            <li className="highcharts-arrow-ray" title="Arrow ray">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Arrow ray</span>
            </li>
            <li className="highcharts-infinity-line" title="Line">
            	<span className="highcharts-menu-item-btn" ></span>
              <span className="highcharts-menu-item-title">Line</span>
            </li>
            <li className="highcharts-arrow-infinity-line" title="Arrow line">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Arrow</span>
            </li>
            <li className="highcharts-horizontal-line" title="Horizontal line">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Horizontal</span>
            </li>
            <li className="highcharts-vertical-line" title="Vertical line">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Vertical</span>
            </li>
          </ul>
        </li>
        <li className="highcharts-elliott3" title="Crooked lines">
        	<span className="highcharts-menu-item-btn"></span>
          <span className="highcharts-menu-item-title">Crooked lines</span>
        	<span className="highcharts-submenu-item-arrow highcharts-arrow-right"></span>
          <ul className="highcharts-submenu-wrapper">
            <li className="highcharts-elliott3" title="Elliott 3 line">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Elliot 3</span>
            </li>
            <li className="highcharts-elliott5" title="Elliott 5 line">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Elliot 5</span>
            </li>
            <li className="highcharts-crooked3" title="Crooked 3 line">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Crooked 3</span>
            </li>
            <li className="highcharts-crooked5" title="Crooked 5 line">
            	<span className="highcharts-menu-item-btn" ></span>
              <span className="highcharts-menu-item-title">Crooked 5</span>
            </li>
          </ul>
        </li>
      
        <li className="highcharts-vertical-counter" title="Vertical labels">
        	<span className="highcharts-menu-item-btn"></span>
          <span className="highcharts-menu-item-title">Counters</span>
        	<span className="highcharts-submenu-item-arrow highcharts-arrow-right"></span>
          <ul className="highcharts-submenu-wrapper">
            <li className="highcharts-vertical-counter" title="Vertical counter">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Counter</span>
            </li>
            <li className="highcharts-vertical-label" title="Vertical label">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Label</span>
            </li>
            <li className="highcharts-vertical-arrow" title="Vertical arrow">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Arrow</span>
            </li>
          </ul>
        </li>
        <li className="highcharts-flag-circlepin" title="Flags">
          <span className="highcharts-menu-item-btn"></span>
          <span className="highcharts-menu-item-title">Flags</span>
          <span className="highcharts-submenu-item-arrow highcharts-arrow-right"></span>
          <ul className="highcharts-submenu-wrapper">
            <li className="highcharts-flag-circlepin" title="Flag circle">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Circle</span>
            </li>
            <li className="highcharts-flag-diamondpin" title="Flag diamond">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Diamond</span>
            </li>
            <li className="highcharts-flag-squarepin" title="Flag square">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Square</span>
            </li>
            <li className="highcharts-flag-simplepin" title="Flag simple">
            	<span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Simple</span>
            </li>
          </ul>
        </li>
        <li className="highcharts-series-type-ohlc" title="Type change">
          <span className="highcharts-menu-item-btn"></span>
          <span className="highcharts-menu-item-title">Series type</span>
          <span className="highcharts-submenu-item-arrow highcharts-arrow-right"></span>
          <ul className="highcharts-submenu-wrapper">
            <li className="highcharts-series-type-ohlc" title="OHLC">
              <span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">OHLC</span>
            </li>
            <li className="highcharts-series-type-line" title="Line">
              <span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Line</span>
            </li>
            <li className="highcharts-series-type-candlestick" title="Candlestick">
              <span className="highcharts-menu-item-btn"></span>
              <span className="highcharts-menu-item-title">Candlestick</span>
            </li>
          </ul>
        </li>
        <li className="highcharts-save-chart right" title="Save chart">
          <span className="highcharts-menu-item-btn"></span>
        </li>
        <li className="highcharts-full-screen right" title="Fullscreen">
          <span className="highcharts-menu-item-btn"></span>
        </li>
       

      </ul>
    </div>
  </div>
  <div id="container" className="chart">
    {/* where the world */}
  </div>
</div>
  </div>
  )
}

export default HighCharts