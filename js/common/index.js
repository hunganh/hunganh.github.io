var init = {};
var symbol, allowFullscreen, user, session,lang,resolution, disabled, enabled, version;
let _activeChart;

var initOnReady = function()
{
    init.fnGetParam();
    init.fnInitChart();
    realtime.fnInitSocket();
    
    init.fnProcessMessage();

    chartTV.onChartReady(init.onChartReady);
                                                 
    utils.sendMessage("Loaded");  // send Load success to parent
    version =  TradingView.version();
};
window.addEventListener('DOMContentLoaded', initOnReady, false);


init.fnGetParam = function(){
    cfg.symChart = utils.getParameterByName('symbol') || cfg.symChart;
    allowFullscreen = utils.getParameterByName('allowFullscreen') || 'false';
    cfg.theme = utils.getParameterByName('theme') || cfg.theme;
    user = utils.getParameterByName('u') || "public";
    session = utils.getParameterByName('s') || "public";
    lang = utils.getParameterByName('lang') || "vi";
    resolution = utils.getParameterByName('resolution') || "1D";
    disabled = utils.getParameterByName('disabled') || "";
    enabled = utils.getParameterByName('enabled') || "";
}

init.fnInitChart = function(){
    dtfeed = new Datafeeds.UDFCompatibleDatafeed(cfg.snapshotUrl,cfg.updateFrequency);

    cfg.TVObj = {
        debug: false,
        fullscreen: true,
        symbol: cfg.symChart,
        interval: resolution,
        container_id: "tv_chart_container",
        timezone: 'Asia/Bangkok',
        datafeed: dtfeed,
        library_path: "charting_library/",
        locale: lang,
        symbol_search_request_delay: 500,
        time_frames: [
            { text: "5Y", resolution: "W"},
            { text: "1Y", resolution: "W"},
            { text: "1W", resolution: "W"},
            { text: "1D", resolution: "1D"},
            { text: "1h", resolution: "60"},
            { text: "5m", resolution: "5"},
            { text: "1m", resolution: "1"},
        ],
        theme: cfg.theme,
        loading_screen: { backgroundColor: "#000000" },
        disabled_features: ['volume_force_overlay','use_localstorage_for_settings'],
        enabled_features: [],
        custom_css_url: '../common/css/style.css',
    };
    
    if(window.isMobile()) {
        //cfg.TVObj.preset = "mobile";
        cfg.TVObj.disabled_features = ['volume_force_overlay','use_localstorage_for_settings',"left_toolbar","header_compare","header_indicators","header_undo_redo","header_saveload","header_settings","header_fullscreen_button","header_screenshot","edit_buttons_in_legend","context_menus","control_bar","border_around_the_chart"];
        cfg.TVObj.enabled_features = ["header_symbol_search","header_resolutions","timeframes_toolbar"];
    }

    if(enabled !=""){
        arrEn = enabled.split(",");
        cfg.TVObj.enabled_features = cfg.TVObj.enabled_features.concat(arrEn);
        
        cfg.TVObj.disabled_features = cfg.TVObj.disabled_features.filter( function( el ) {
            return arrEn.indexOf( el ) < 0;
        });
    }

    if(disabled !=""){
        arrDis = disabled.split(",");
        cfg.TVObj.disabled_features = cfg.TVObj.disabled_features.concat(arrDis);

        cfg.TVObj.enabled_features = cfg.TVObj.enabled_features.filter( function( el ) {
            return arrDis.indexOf( el ) < 0;
        });
    }

    
    if(cfg.theme == 'Dark') {
        cfg.TVObj.overrides = {
            "mainSeriesProperties.candleStyle.upColor": "#008F06",
            "mainSeriesProperties.candleStyle.downColor": "#FF0200",
            "mainSeriesProperties.candleStyle.borderUpColor": "#008F06",
            "mainSeriesProperties.candleStyle.borderDownColor": "#FF0200",
            "mainSeriesProperties.candleStyle.wickDownColor": '#FF0200',
            "mainSeriesProperties.candleStyle.wickUpColor": '#008F06',
            "paneProperties.background": "#000000",
            "paneProperties.vertGridProperties": {
                "color": "#656565",
                "style": 1
            },
            "paneProperties.horzGridProperties": {
                "color": "#656565",
                "style": 1
            }
        };
    } else {
        cfg.TVObj.overrides = {
            "mainSeriesProperties.candleStyle.upColor": "#6BA583",
            "mainSeriesProperties.candleStyle.downColor": "#D75442",
            "mainSeriesProperties.candleStyle.borderUpColor": "green",
            "mainSeriesProperties.candleStyle.borderDownColor": "red",
            "mainSeriesProperties.candleStyle.wickUpColor": '#6BA583',
            "mainSeriesProperties.candleStyle.wickDownColor": '#D75442'
        };
    }


    if(cfg.saveChart) {
        cfg.TVObj.charts_storage_url = cfg.saveChartUrl;
        cfg.TVObj.charts_storage_api_version = cfg.charts_storage_api_version;
        cfg.TVObj.client_id = cfg.client_id;
        cfg.TVObj.user_id = user + '_' + session;
    }

    chartTV = new TradingView.widget(cfg.TVObj);
}


init.fnAddBtn = function(){
    if(allowFullscreen == 'true'){
        utils.createHeaderButton(txtFS,txtFSTitle, function() {
            if(!cfg.isTVFullscreen){
                utils.sendMessage(cfg.cmd.VIEWFULL);
                cfg.isTVFullscreen = true;
            } else {
                utils.sendMessage(cfg.cmd.VIEWNORMAL);
                cfg.isTVFullscreen = false;
            }
            
        }, { align: 'right' });
    }

    utils.createHeaderButton(cfg.logo ,'NhaDauTu198x', function() {
        alert('Copyright © 2021 NhaDauTu198x.com, All rights reserved');
    }, { align: 'right' });
}

// Listen to messages from parent window
init.fnProcessMessage = function(){
    utils.bindEvent(window, 'message', function (dt) {
        var parseData = dt;
        try{
            parseData = JSON.parse(dt.data);
        } catch(e){
        }

        if(parseData.hasOwnProperty('symbolChart')){    // parent change sym
            var sym = parseData.symbolChart;
            _activeChart.setSymbol(sym);
            realtime.fnChangeSymbol(sym);
        } else if(parseData.hasOwnProperty('t')){       // parent send realtime chart data
            realtime.updateRealtime(parseData);
        }
    });
}


init.onChartReady = function(){
    init.fnAddBtn();
    _activeChart = chartTV.activeChart();

    _activeChart.onSymbolChanged().subscribe(null, function() {
        var newSym =  _activeChart.symbol();
        realtime.fnChangeSymbol(newSym);

        utils.sendMessage(cfg.cmd.CHANGESYM + newSym);
    });

    _activeChart.createStudy('Bollinger Bands', true, true);
    _activeChart.createStudy('Relative Strength Index', true, true);
    _activeChart.createStudy('MACD', true, true);
    _activeChart.createStudy('Ichimoku Cloud', true, true);
};











