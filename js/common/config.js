var cfg = {}
cfg.saveChart = true;

cfg.snapshotUrl = "https://histdatafeed.vps.com.vn/tradingview";
cfg.socketLink = 'https://tradingviewrealtime.vps.com.vn';
cfg.saveChartUrl = "https://histdatafeed.vps.com.vn/tradingview";
cfg.updateFrequency = 24 * 60 * 60 * 1000; /* 24hours */
cfg.cfgChart = { "supports_search": true, "supports_group_request": false, "supports_marks": false, "supports_timescale_marks": false, "supports_time": true, "exchanges": [{ "value": "", "name": "Tất cả", "desc": "" }, { "value": "HNX", "name": "HNX", "desc": "HNX" }, { "value": "UPCOM", "name": "UPCOM", "desc": "UPCOM" }, { "value": "HOSE", "name": "HOSE", "desc": "HOSE" }], "symbolsTypes": [{ "name": "Tất cả", "value": "" }, { "name": "Cổ phiếu", "value": "stock" }, { "name": "Chỉ số", "value": "index" }], "supportedResolutions": ["1", "5", "15", "30", "60", "D", "W", "M"] };
cfg.symChart = 'VPS';
cfg.theme = "Light";
cfg.isTVFullscreen = false; /* Don't change */
cfg.charts_storage_api_version = '1.1';
cfg.client_id = 'VPSWeb';
cfg.logo = '<img src="file:///D:/AnhTH27/Chung%20Khoan/Tool%20Thong%20Ke/hunganh.github.io/images/logo2.png" style="height: 65px;">';
cfg.TVObj = {};

var chartTV;
var dtfeed;
var _socket;
var lastBarVPS = {};

cfg.cmd = {};
cfg.cmd.VIEWFULL = '#VIEWFULL#';
cfg.cmd.VIEWNORMAL = '#VIEWNORMAL#';
cfg.cmd.CHANGESYM = '#CHANGESYM#';


let txtFS = '<img style="width:20px; background-color:grey;" src="../common/img/expand.svg" />';
let txtFSTitle = 'Chế độ Mở rộng/Thu nhỏ biểu đồ';

