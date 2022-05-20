window.variablesJS = {
    typeDefault : "selfBusiness",
    actionDefault : "netBuy",
    actions : ["netBuy", "netSell"],
    actionSummaryDefault : "netBuy",
    currentPeriod : "today",
    currentSummaryPeriod : "today",
    dataJson : null,
    summaryDataJson : null,
    mappingDataJson : null,
    currentTicker : "",
    olderItem : null,
    statisticsCols : ["order", "ticker", "valueChange", "totalNetBuyTradeValue", "priceChange", "percentPriceChange"],
    statisticsHeadTitle : ["#", "Mã CP", "Ngành <image class='tr-cursor filter-popover float-right' src='../src/images/filter.png' data-bs-toggle='popover' id='statistics-popover' alt='Ngành cần lọc'/>", "Tổng khối lượng", "Tổng giá trị", "Giá đóng cửa", "Thay đổi giá", "Giá vốn"],
    summaryHeadTitle : ["#", "Mã CP", "Ngành <image class='tr-cursor filter-popover float-right' src='../src/images/filter.png' data-bs-toggle='popover' id='summary-popover' alt='Ngành cần lọc'/>", "Giá đóng cửa", "Thay đổi giá", "% Thay đổi giá", "Giá vốn", "Giá trị", "Tổng giá trị"],
    subSummaryHeadTitle : ["Tự doanh", "Khối ngoại"],
    defaultLocale : 'en-GB',
    numberLocale : 'en-US',
    FOREIGN_NET_BUY_VALUE : "foreignNetBuyValue",
    FOREIGN_NET_SELL_VALUE : "foreignNetSellValue",
    TOTAL_NET_BUY_TRADE_VALUE : "totalNetBuyTradeValue",
    TOTAL_NET_SELL_TRADE_VALUE : "totalNetSellTradeValue",
    MATCH_PRICE : "matchPrice",
    REFERENCE_PRICE : "referencePrice",
    TOTAL_NET_BUY_TRADE_VOLUME : "totalNetBuyTradeVolume",
    TOTAL_NET_SELL_TRADE_VOLUME : "totalNetSellTradeVolume",
    TU_DOANH : "tudoanh",
    KHOI_NGOAI : "khoingoai",
    sortFieldDefault : "changePercent1D",
    sortFieldType : "desc",
    headFields : `<table class="left-position table table-bordered table-striped table-hover">
                    <thead class="table-light">
                        <tr>
                            <th rowspan="2">Ngành</th>
                            <th rowspan="2">EPS</th>
                            <th rowspan="2">P/E</th>
                            <th rowspan="2">P/S</th>
                            <th rowspan="2">P/B</th>
                            <th rowspan="2">ROA</th>
                            <th rowspan="2">ROE</th>
                            <th colspan="7">% Tăng/Giảm</th>
                        </tr>  
                        <tr id="sort-column">
                            <th class="tr-cursor" onclick="window.fieldsJS.sortTable('changePercent1D', this)" data-bs-toggle="tooltip" data-bs-placement="top" title="Sort dữ liệu theo 1 ngày">1 ngày <span id="changePercent1D" class="sort desc"></span></th>
                            <th class="tr-cursor" onclick="window.fieldsJS.sortTable('changePercent1W', this)" data-bs-toggle="tooltip" data-bs-placement="top" title="Sort dữ liệu theo 1 tuần">1 tuần <span id="changePercent1W" class="sort"></span></th>
                            <th class="tr-cursor" onclick="window.fieldsJS.sortTable('changePercent1M', this)" data-bs-toggle="tooltip" data-bs-placement="top" title="Sort dữ liệu theo 1 tháng">1 tháng <span id="changePercent1M" class="sort"></span></th>
                            <th class="tr-cursor" onclick="window.fieldsJS.sortTable('changePercent3M', this)" data-bs-toggle="tooltip" data-bs-placement="top" title="Sort dữ liệu theo 3 tháng">3 tháng <span id="changePercent3M" class="sort"></span></th>
                            <th class="tr-cursor" onclick="window.fieldsJS.sortTable('changePercent6M', this)" data-bs-toggle="tooltip" data-bs-placement="top" title="Sort dữ liệu theo 6 tháng">6 tháng <span id="changePercent6M" class="sort"></span></th>
                            <th class="tr-cursor" onclick="window.fieldsJS.sortTable('changePercent1Y', this)" data-bs-toggle="tooltip" data-bs-placement="top" title="Sort dữ liệu theo 1 năm">1 năm <span id="changePercent1Y" class="sort"></span></th>
                            <th class="tr-cursor" onclick="window.fieldsJS.sortTable('changePercentYTD', this)" data-bs-toggle="tooltip" data-bs-placement="top" title="Sort dữ liệu từ đầu năm đến nay">YTD <span id="changePercentYTD" class="sort"></span></th>
                        </tr>             
                    </thead>
                    <tbody>`,
    fieldsDataJson : null,
    evaluationsData : null,
    sortFiltersDefault : "changePercent1D",
    sortFiltersType : "desc",
    filterOptionC : null, 
    filterOptionC1 : null,  
    filterOptionC2 : null, 
    filterOptionC3 : null,  
    filterOptionA : null,  
    filterOptionA1 : null,  
    filterOptionA2 : null,  
    filterOptionA3 : null,  
    filterOptionS : null,  
    filterOptionS : null, 
    arrFilterIds : ["filterOptionC", "filterOptionC1", "filterOptionC2", "filterOptionC3", "filterOptionA", "filterOptionA1", "filterOptionA2", "filterOptionA3", "filterOptionS", "filterOptionL"],
    headFiltersData : `<table class="left-position table table-bordered table-striped table-hover">
                            <thead class="table-light">
                                <tr>
                                    <th rowspan="2">#</th>    
                                    <th rowspan="2">Mã CP</th>
                                    <th rowspan="2">Tên Doanh Nghiệp</th>
                                    <th rowspan="2">Sàn CK</th>
                                    <th colspan="8">% Thay đổi</th>
                                </tr>
                                <tr>
                                    <th class="tr-cursor" onclick="window.variablesJS.sortFiltersTable('changePercent1D', this)" data-bs-toggle="tooltip" data-bs-placement="top" title="Sort dữ liệu theo 1 ngày">1 ngày <span id="changePercent1D" class="sort desc"></span></th>
                                    <th class="tr-cursor" onclick="window.variablesJS.sortFiltersTable('changePercent1W', this)" data-bs-toggle="tooltip" data-bs-placement="top" title="Sort dữ liệu theo 1 tuần">1 tuần <span id="changePercent1W" class="sort"></span></th>
                                    <th class="tr-cursor" onclick="window.variablesJS.sortFiltersTable('changePercent1M', this)" data-bs-toggle="tooltip" data-bs-placement="top" title="Sort dữ liệu theo 1 tháng">1 tháng <span id="changePercent1M" class="sort"></span></th>
                                    <th class="tr-cursor" onclick="window.variablesJS.sortFiltersTable('changePercent3M', this)" data-bs-toggle="tooltip" data-bs-placement="top" title="Sort dữ liệu theo 3 tháng">3 tháng <span id="changePercent3M" class="sort"></span></th>
                                    <th class="tr-cursor" onclick="window.variablesJS.sortFiltersTable('changePercent6M', this)" data-bs-toggle="tooltip" data-bs-placement="top" title="Sort dữ liệu theo 6 tháng">6 tháng <span id="changePercent6M" class="sort"></span></th>
                                    <th class="tr-cursor" onclick="window.variablesJS.sortFiltersTable('changePercentYTD', this)" data-bs-toggle="tooltip" data-bs-placement="top" title="Sort dữ liệu từ đầu năm đến nay">YTD <span id="changePercentYTD" class="sort"></span></th>
                                    <th class="tr-cursor" onclick="window.variablesJS.sortFiltersTable('changePercent1Y', this)" data-bs-toggle="tooltip" data-bs-placement="top" title="Sort dữ liệu theo 1 năm">1 năm <span id="changePercent1Y" class="sort"></span></th>                                    
                                    <th class="tr-cursor" onclick="window.variablesJS.sortFiltersTable('changePercent3Yr', this)" data-bs-toggle="tooltip" data-bs-placement="top" title="Sort dữ liệu theo 3 năm">3 năm <span id="changePercent3Yr" class="sort"></span></th>
                                </tr>       
                            </thead>
                            <tbody>`,
    filtersDataJson : null,
    timeout : null, 
    interval : null
}

window.apiConfigs = {
    API_CRAWL_SERVER : "https://data-statistics-api.herokuapp.com",
    // API_CRAWL_SERVER : "http://localhost:3001",
    API_DATA_SERVER_1 : "https://fwtapi1.fialda.com",
    API_DATA_SERVER_2 : "https://fwtapi2.fialda.com",
    ATTACHMENT_URL : "https://cdn.fialda.com/Attachment",
    IMAGE_NEWS_URL : "https://cdn.fialda.com/Images/News/",
    CHART_URL_V1 : "https://chart.vps.com.vn/tv/",
    CHART_URL_V2 : "https://iboard.ssi.com.vn/chart/"
}

window.apiUrlDefined = {
    FILES_DATA_URL : `${window.apiConfigs.API_CRAWL_SERVER}/files`,
    UPLOAD_DATA_URL : `${window.apiConfigs.API_CRAWL_SERVER}/upload`,
    CORS_PROXY_URL : `${window.apiConfigs.API_CRAWL_SERVER}/fetch`,
    SYNTHESIS_DATA_URL : `${window.apiConfigs.API_CRAWL_SERVER}/synthesis`,
    STATISTICS_DATA_URL : `${window.apiConfigs.API_CRAWL_SERVER}/statistics`,
    STOCK_INFOR_DATA_OF_FIELD_URL : `${window.apiConfigs.API_CRAWL_SERVER}/fields/symbols`,
    STOCK_FILTERS_URL : `${window.apiConfigs.API_CRAWL_SERVER}/filters`,
    STOCK_LIVE_BOARD_URL : `${window.apiConfigs.API_CRAWL_SERVER}/boards`,
    STOCK_EVALUATIONS_URL : `${window.apiConfigs.API_CRAWL_SERVER}/evaluations`,
    FIALDA_API_V1_URL : `${window.apiConfigs.API_DATA_SERVER_1}/api/services/app`,
    FIALDA_API_V2_URL : `${window.apiConfigs.API_DATA_SERVER_2}/api/services/app`,
    FIALDA_GET_STOCK_INFO_PATH : "/Common/GetStockInfos",
    FIALDA_GET_REPORT_PATH : "/AnalysisReport/GetByFilter",
    FIALDA_GET_FIELDS_REPORT_PATH : "/Market/GetICBInfos",
    FIALDA_STOCK_TA_RATINGS_PATH : "/TechnicalAnalysis/GetStockTARatings",
    FIALDA_STOCK_FILTERS_PATH : "/Stock/GetByFilter",
    FIALDA_STOCK_DEVIDENT_PATH : "/Stock/GetBonusEvents",
    FIALDA_STOCK_EVENT_PATH : "/Event/GetAll",
    FIALDA_STOCK_COMPANY_NEWS : "/StockInfo/GetCompanyNews",
    FIALDA_ANALYSIS_REPORT_URL : `${window.apiConfigs.ATTACHMENT_URL}/AnalysisReport/`,
    FIALDA_NEWS_URL : `${window.apiConfigs.ATTACHMENT_URL}/News/`
}

window.webSocketConfigs = {
    version: "2.7.3",
    authenType: "M",
    warningMsg: "",
    channel: "I",
    listPermission: "",
    loadchangeTimeout: "",
    loadchangePsTimeout: "",
    loadchangeIndexTimeout: "",
    loadorderTimeout: "",
    listAccount: [],
    listShare: [],
    listStock: [],
    listStockPs: [],
    listStockAll: [],
    ListPortfolio: [],
    listDatePs: {},
    loadOne: false,
    confirmOrder: "0",
    lang: "vi-VN",
    liveboard: { Socket: -1, Result: -1, Link: "https://wtapidatafeed.vps.com.vn", LinkSocket: "https://bgdatafeed.vps.com.vn", listStock: [] },
    HostPSA: "https://psaapi.vps.com.vn", //Prod: http://103.131.76.25:8080
    liveboardps: { Socket: -1, Result: -1, Link: "" },
    decimalRound: 2,
    fsCancelTime: 5,
    conditionOrderDescriptions: {},
    isDontRemindMM: false,
    listDateSMOTP: {},
    pwdRemainDay: "103",
    notiChangePass: "0",
    hostdeposit: "https://apideposit.vps.com.vn", //Prod:https://apideposittest.vps.com.vn
    hostbond: "https://apibond.vps.com.vn", //Prod:https://apibondtest.vps.com.vn
    hostmm: "https://apimm.vps.com.vn", //Prod:https://apimmtest.vps.com.vn
    hostPaygate: "https://eweb-pg.vps.com.vn", //Prod: https://ewebtest-pg.vps.com.vn
    hostwatchlist: "https://histdatafeed.vps.com.vn", //Prod: http://10.32.79.12
    hostimg: "https://soapidatafeed.vps.com.vn/bankicon"
}