/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/variables.js":
/*!*****************************!*\
  !*** ./src/js/variables.js ***!
  \*****************************/
/***/ (() => {

eval("window.variablesJS = {\r\n    typeDefault : \"selfBusiness\",\r\n    actionDefault : \"netBuy\",\r\n    actions : [\"netBuy\", \"netSell\"],\r\n    actionSummaryDefault : \"netBuy\",\r\n    currentPeriod : \"today\",\r\n    currentSummaryPeriod : \"today\",\r\n    dataJson : null,\r\n    summaryDataJson : null,\r\n    mappingDataJson : null,\r\n    currentTicker : \"\",\r\n    olderItem : null,\r\n    statisticsCols : [\"order\", \"ticker\", \"valueChange\", \"totalNetBuyTradeValue\", \"priceChange\", \"percentPriceChange\"],\r\n    statisticsHeadTitle : [\"#\", \"Mã CP\", \"Ngành <image class='tr-cursor filter-popover float-right' src='../src/images/filter.png' data-bs-toggle='popover' id='statistics-popover' alt='Ngành cần lọc'/>\", \"Tổng khối lượng\", \"Tổng giá trị\", \"Giá đóng cửa\", \"Thay đổi giá\", \"Giá vốn\"],\r\n    summaryHeadTitle : [\"#\", \"Mã CP\", \"Ngành <image class='tr-cursor filter-popover float-right' src='../src/images/filter.png' data-bs-toggle='popover' id='summary-popover' alt='Ngành cần lọc'/>\", \"Giá đóng cửa\", \"Thay đổi giá\", \"% Thay đổi giá\", \"Giá vốn\", \"Giá trị\", \"Tổng giá trị\"],\r\n    subSummaryHeadTitle : [\"Tự doanh\", \"Khối ngoại\"],\r\n    defaultLocale : 'en-GB',\r\n    numberLocale : 'en-US',\r\n    FOREIGN_NET_BUY_VALUE : \"foreignNetBuyValue\",\r\n    FOREIGN_NET_SELL_VALUE : \"foreignNetSellValue\",\r\n    TOTAL_NET_BUY_TRADE_VALUE : \"totalNetBuyTradeValue\",\r\n    TOTAL_NET_SELL_TRADE_VALUE : \"totalNetSellTradeValue\",\r\n    MATCH_PRICE : \"matchPrice\",\r\n    REFERENCE_PRICE : \"referencePrice\",\r\n    TOTAL_NET_BUY_TRADE_VOLUME : \"totalNetBuyTradeVolume\",\r\n    TOTAL_NET_SELL_TRADE_VOLUME : \"totalNetSellTradeVolume\",\r\n    TU_DOANH : \"tudoanh\",\r\n    KHOI_NGOAI : \"khoingoai\",\r\n    sortFieldDefault : \"changePercent1D\",\r\n    sortFieldType : \"desc\",\r\n    headFields : `<table class=\"left-position table table-bordered table-striped table-hover\">\r\n                    <thead class=\"table-light\">\r\n                        <tr>\r\n                            <th rowspan=\"2\">Ngành</th>\r\n                            <th rowspan=\"2\">EPS</th>\r\n                            <th rowspan=\"2\">P/E</th>\r\n                            <th rowspan=\"2\">P/S</th>\r\n                            <th rowspan=\"2\">P/B</th>\r\n                            <th rowspan=\"2\">ROA</th>\r\n                            <th rowspan=\"2\">ROE</th>\r\n                            <th colspan=\"7\">% Tăng/Giảm</th>\r\n                        </tr>  \r\n                        <tr id=\"sort-column\">\r\n                            <th class=\"tr-cursor\" onclick=\"window.fieldsJS.sortTable('changePercent1D', this)\" data-bs-toggle=\"tooltip\" data-bs-placement=\"top\" title=\"Sort dữ liệu theo 1 ngày\">1 ngày <span id=\"changePercent1D\" class=\"sort desc\"></span></th>\r\n                            <th class=\"tr-cursor\" onclick=\"window.fieldsJS.sortTable('changePercent1W', this)\" data-bs-toggle=\"tooltip\" data-bs-placement=\"top\" title=\"Sort dữ liệu theo 1 tuần\">1 tuần <span id=\"changePercent1W\" class=\"sort\"></span></th>\r\n                            <th class=\"tr-cursor\" onclick=\"window.fieldsJS.sortTable('changePercent1M', this)\" data-bs-toggle=\"tooltip\" data-bs-placement=\"top\" title=\"Sort dữ liệu theo 1 tháng\">1 tháng <span id=\"changePercent1M\" class=\"sort\"></span></th>\r\n                            <th class=\"tr-cursor\" onclick=\"window.fieldsJS.sortTable('changePercent3M', this)\" data-bs-toggle=\"tooltip\" data-bs-placement=\"top\" title=\"Sort dữ liệu theo 3 tháng\">3 tháng <span id=\"changePercent3M\" class=\"sort\"></span></th>\r\n                            <th class=\"tr-cursor\" onclick=\"window.fieldsJS.sortTable('changePercent6M', this)\" data-bs-toggle=\"tooltip\" data-bs-placement=\"top\" title=\"Sort dữ liệu theo 6 tháng\">6 tháng <span id=\"changePercent6M\" class=\"sort\"></span></th>\r\n                            <th class=\"tr-cursor\" onclick=\"window.fieldsJS.sortTable('changePercent1Y', this)\" data-bs-toggle=\"tooltip\" data-bs-placement=\"top\" title=\"Sort dữ liệu theo 1 năm\">1 năm <span id=\"changePercent1Y\" class=\"sort\"></span></th>\r\n                            <th class=\"tr-cursor\" onclick=\"window.fieldsJS.sortTable('changePercentYTD', this)\" data-bs-toggle=\"tooltip\" data-bs-placement=\"top\" title=\"Sort dữ liệu từ đầu năm đến nay\">YTD <span id=\"changePercentYTD\" class=\"sort\"></span></th>\r\n                        </tr>             \r\n                    </thead>\r\n                    <tbody>`,\r\n    fieldsDataJson : null,\r\n    evaluationsData : null,\r\n    sortFiltersDefault : \"changePercent1D\",\r\n    sortFiltersType : \"desc\",\r\n    filterOptionC : null, \r\n    filterOptionC1 : null,  \r\n    filterOptionC2 : null, \r\n    filterOptionC3 : null,  \r\n    filterOptionA : null,  \r\n    filterOptionA1 : null,  \r\n    filterOptionA2 : null,  \r\n    filterOptionA3 : null,  \r\n    filterOptionS : null,  \r\n    filterOptionS : null, \r\n    arrFilterIds : [\"filterOptionC\", \"filterOptionC1\", \"filterOptionC2\", \"filterOptionC3\", \"filterOptionA\", \"filterOptionA1\", \"filterOptionA2\", \"filterOptionA3\", \"filterOptionS\", \"filterOptionL\"],\r\n    headFiltersData : `<table class=\"left-position table table-bordered table-striped table-hover\">\r\n                            <thead class=\"table-light\">\r\n                                <tr>\r\n                                    <th rowspan=\"2\">#</th>    \r\n                                    <th rowspan=\"2\">Mã CP</th>\r\n                                    <th rowspan=\"2\">Tên Doanh Nghiệp</th>\r\n                                    <th rowspan=\"2\">Sàn CK</th>\r\n                                    <th colspan=\"8\">% Thay đổi</th>\r\n                                </tr>\r\n                                <tr>\r\n                                    <th class=\"tr-cursor\" onclick=\"window.variablesJS.sortFiltersTable('changePercent1D', this)\" data-bs-toggle=\"tooltip\" data-bs-placement=\"top\" title=\"Sort dữ liệu theo 1 ngày\">1 ngày <span id=\"changePercent1D\" class=\"sort desc\"></span></th>\r\n                                    <th class=\"tr-cursor\" onclick=\"window.variablesJS.sortFiltersTable('changePercent1W', this)\" data-bs-toggle=\"tooltip\" data-bs-placement=\"top\" title=\"Sort dữ liệu theo 1 tuần\">1 tuần <span id=\"changePercent1W\" class=\"sort\"></span></th>\r\n                                    <th class=\"tr-cursor\" onclick=\"window.variablesJS.sortFiltersTable('changePercent1M', this)\" data-bs-toggle=\"tooltip\" data-bs-placement=\"top\" title=\"Sort dữ liệu theo 1 tháng\">1 tháng <span id=\"changePercent1M\" class=\"sort\"></span></th>\r\n                                    <th class=\"tr-cursor\" onclick=\"window.variablesJS.sortFiltersTable('changePercent3M', this)\" data-bs-toggle=\"tooltip\" data-bs-placement=\"top\" title=\"Sort dữ liệu theo 3 tháng\">3 tháng <span id=\"changePercent3M\" class=\"sort\"></span></th>\r\n                                    <th class=\"tr-cursor\" onclick=\"window.variablesJS.sortFiltersTable('changePercent6M', this)\" data-bs-toggle=\"tooltip\" data-bs-placement=\"top\" title=\"Sort dữ liệu theo 6 tháng\">6 tháng <span id=\"changePercent6M\" class=\"sort\"></span></th>\r\n                                    <th class=\"tr-cursor\" onclick=\"window.variablesJS.sortFiltersTable('changePercentYTD', this)\" data-bs-toggle=\"tooltip\" data-bs-placement=\"top\" title=\"Sort dữ liệu từ đầu năm đến nay\">YTD <span id=\"changePercentYTD\" class=\"sort\"></span></th>\r\n                                    <th class=\"tr-cursor\" onclick=\"window.variablesJS.sortFiltersTable('changePercent1Y', this)\" data-bs-toggle=\"tooltip\" data-bs-placement=\"top\" title=\"Sort dữ liệu theo 1 năm\">1 năm <span id=\"changePercent1Y\" class=\"sort\"></span></th>                                    \r\n                                    <th class=\"tr-cursor\" onclick=\"window.variablesJS.sortFiltersTable('changePercent3Yr', this)\" data-bs-toggle=\"tooltip\" data-bs-placement=\"top\" title=\"Sort dữ liệu theo 3 năm\">3 năm <span id=\"changePercent3Yr\" class=\"sort\"></span></th>\r\n                                </tr>       \r\n                            </thead>\r\n                            <tbody>`,\r\n    filtersDataJson : null,\r\n    timeout : null, \r\n    interval : null\r\n}\r\n\r\nwindow.apiConfigs = {\r\n    API_CRAWL_SERVER : \"https://data-statistics-api.herokuapp.com\",\r\n    // API_CRAWL_SERVER : \"http://localhost:3001\",\r\n    API_DATA_SERVER_1 : \"https://fwtapi1.fialda.com\",\r\n    API_DATA_SERVER_2 : \"https://fwtapi2.fialda.com\",\r\n    ATTACHMENT_URL : \"https://cdn.fialda.com/Attachment\",\r\n    IMAGE_NEWS_URL : \"https://cdn.fialda.com/Images/News/\",\r\n    CHART_URL_V1 : \"https://chart.vps.com.vn/tv/\",\r\n    CHART_URL_V2 : \"https://iboard.ssi.com.vn/chart/\"\r\n}\r\n\r\nwindow.apiUrlDefined = {\r\n    FILES_DATA_URL : `${window.apiConfigs.API_CRAWL_SERVER}/files`,\r\n    UPLOAD_DATA_URL : `${window.apiConfigs.API_CRAWL_SERVER}/upload`,\r\n    CORS_PROXY_URL : `${window.apiConfigs.API_CRAWL_SERVER}/fetch`,\r\n    SYNTHESIS_DATA_URL : `${window.apiConfigs.API_CRAWL_SERVER}/synthesis`,\r\n    STATISTICS_DATA_URL : `${window.apiConfigs.API_CRAWL_SERVER}/statistics`,\r\n    STOCK_INFOR_DATA_OF_FIELD_URL : `${window.apiConfigs.API_CRAWL_SERVER}/fields/symbols`,\r\n    STOCK_FILTERS_URL : `${window.apiConfigs.API_CRAWL_SERVER}/filters`,\r\n    STOCK_LIVE_BOARD_URL : `${window.apiConfigs.API_CRAWL_SERVER}/boards`,\r\n    STOCK_EVALUATIONS_URL : `${window.apiConfigs.API_CRAWL_SERVER}/evaluations`,\r\n    FIALDA_API_V1_URL : `${window.apiConfigs.API_DATA_SERVER_1}/api/services/app`,\r\n    FIALDA_API_V2_URL : `${window.apiConfigs.API_DATA_SERVER_2}/api/services/app`,\r\n    FIALDA_GET_STOCK_INFO_PATH : \"/Common/GetStockInfos\",\r\n    FIALDA_GET_REPORT_PATH : \"/AnalysisReport/GetByFilter\",\r\n    FIALDA_GET_FIELDS_REPORT_PATH : \"/Market/GetICBInfos\",\r\n    FIALDA_STOCK_TA_RATINGS_PATH : \"/TechnicalAnalysis/GetStockTARatings\",\r\n    FIALDA_STOCK_FILTERS_PATH : \"/Stock/GetByFilter\",\r\n    FIALDA_STOCK_DEVIDENT_PATH : \"/Stock/GetBonusEvents\",\r\n    FIALDA_STOCK_EVENT_PATH : \"/Event/GetAll\",\r\n    FIALDA_STOCK_COMPANY_NEWS : \"/StockInfo/GetCompanyNews\",\r\n    FIALDA_ANALYSIS_REPORT_URL : `${window.apiConfigs.ATTACHMENT_URL}/AnalysisReport/`,\r\n    FIALDA_NEWS_URL : `${window.apiConfigs.ATTACHMENT_URL}/News/`\r\n}\r\n\r\nwindow.webSocketConfigs = {\r\n    version: \"2.7.3\",\r\n    authenType: \"M\",\r\n    warningMsg: \"\",\r\n    channel: \"I\",\r\n    listPermission: \"\",\r\n    loadchangeTimeout: \"\",\r\n    loadchangePsTimeout: \"\",\r\n    loadchangeIndexTimeout: \"\",\r\n    loadorderTimeout: \"\",\r\n    listAccount: [],\r\n    listShare: [],\r\n    listStock: [],\r\n    listStockPs: [],\r\n    listStockAll: [],\r\n    ListPortfolio: [],\r\n    listDatePs: {},\r\n    loadOne: false,\r\n    confirmOrder: \"0\",\r\n    lang: \"vi-VN\",\r\n    liveboard: { Socket: -1, Result: -1, Link: \"https://wtapidatafeed.vps.com.vn\", LinkSocket: \"https://bgdatafeed.vps.com.vn\", listStock: [] },\r\n    HostPSA: \"https://psaapi.vps.com.vn\", //Prod: http://103.131.76.25:8080\r\n    liveboardps: { Socket: -1, Result: -1, Link: \"\" },\r\n    decimalRound: 2,\r\n    fsCancelTime: 5,\r\n    conditionOrderDescriptions: {},\r\n    isDontRemindMM: false,\r\n    listDateSMOTP: {},\r\n    pwdRemainDay: \"103\",\r\n    notiChangePass: \"0\",\r\n    hostdeposit: \"https://apideposit.vps.com.vn\", //Prod:https://apideposittest.vps.com.vn\r\n    hostbond: \"https://apibond.vps.com.vn\", //Prod:https://apibondtest.vps.com.vn\r\n    hostmm: \"https://apimm.vps.com.vn\", //Prod:https://apimmtest.vps.com.vn\r\n    hostPaygate: \"https://eweb-pg.vps.com.vn\", //Prod: https://ewebtest-pg.vps.com.vn\r\n    hostwatchlist: \"https://histdatafeed.vps.com.vn\", //Prod: http://10.32.79.12\r\n    hostimg: \"https://soapidatafeed.vps.com.vn/bankicon\"\r\n}\n\n//# sourceURL=webpack:///./src/js/variables.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/variables.js"]();
/******/ 	
/******/ })()
;