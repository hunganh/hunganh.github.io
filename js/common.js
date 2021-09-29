var typeDefault = "selfBusiness";
var actionDefault = "netBuy";
var actionSummaryDefault = "netBuy";
var currentPeriod = "today";
var currentSummaryPeriod = "today";
var dataJson = null;
var summaryDataJson = null;
var mappingDataJson = null;
var currentTicker = "";
var olderItem = null;
const statisticsCols = ["order", "ticker", "valueChange", "totalNetBuyTradeValue", "percentPriceChange"];
const statisticsHeadTitle = ["#", "Mã CP", "Biến động trong phiên", "Tổng khối lượng", "Tổng giá trị", "Lãi/Lỗ (%)"];
const subStatisticsHeadTitle = ["Khối lượng", "Giá trị"];
const summaryHeadTitle = ["#", "Mã CP", "Tự doanh", "Khối ngoại", "Tổng"];
const subSummaryHeadTitle = ["Giá trị", "Lãi/Lỗ (%)", "Giá trị", "Lãi/Lỗ (%)", "Giá trị", "Lãi/Lỗ (%)"];
const locale = 'en-GB';
const FOREIGN_NET_BUY_VALUE = "foreignNetBuyValue";
const FOREIGN_NET_SELL_VALUE = "foreignNetSellValue";
const TOTAL_NET_BUY_TRADE_VALUE = "totalNetBuyTradeValue";
const TOTAL_NET_SELL_TRADE_VALUE = "totalNetSellTradeValue";
const MATCH_PRICE = "matchPrice";
const REFERENCE_PRICE = "referencePrice";
const TOTAL_NET_BUY_TRADE_VOLUME = "totalNetBuyTradeVolume";
const TOTAL_NET_SELL_TRADE_VOLUME = "totalNetSellTradeVolume";
const TU_DOANH = "tudoanh";
const KHOI_NGOAI = "khoingoai";
const DATA_URL = "http://data-statistics-api.herokuapp.com";
// const DATA_URL = "http://localhost:3001";
const FILES_DATA_URL = `${DATA_URL}/files`;
const UPLOAD_DATA_URL = `${DATA_URL}/upload`;
const CORS_PROXY_URL = `${DATA_URL}/fetch`;
const SYNTHESIS_DATA_URL = `${DATA_URL}/synthesis`;
const STATISTICS_DATA_URL = `${DATA_URL}/statistics`;
const FIALDA_API_V1_URL = `https://fwtapi1.fialda.com/api/services/app`;
const FIALDA_API_V2_URL = `https://fwtapi2.fialda.com/api/services/app`;
const FIALDA_GET_STOCK_INFO_PATH = "/Common/GetStockInfos";
const FIALDA_GET_REPORT_PATH = "/AnalysisReport/GetByFilter";
const FIALDA_GET_FIELDS_REPORT_PATH = "/Market/GetICBInfos";
const FIALDA_STOCK_FILTERS_PATH = "/Stock/GetByFilter";
const FIALDA_ANALYSIS_REPORT_URL = "https://cdn.fialda.com/Attachment/AnalysisReport/";

$(document).on("contextmenu", function (e) {        
    e.preventDefault();
});

$(document).keydown(function (event) {
    // Prevent F12
    if (event.keyCode == 123) 
    { 
        return false;
    } 
    else if(event.ctrlKey && event.shiftKey && event.keyCode == 73)
    // Prevent Ctrl+Shift+I
    {         
        return false;
    }
    else if(event.ctrlKey && event.keyCode == 83)
    // Prevent Ctrl+S
    {         
        return false;
    }
});

function fetchContentByUrl(url) {
    return new Promise((resolve, reject) => {
        window.fetch(url,
            {
                method: 'GET'
            }
        ).then((response) => {
            if (response.status === 200) {
                resolve(response.text());
            }
        }, (err) => {
            reject(err);
        }).catch(error => {
            console.log(error);
        });
    });
};

function fetchContentByUrlWithCORSProxy(url, method, body) {
    return new Promise((resolve, reject) => {
        if (method === "GET") {
            fetch(`${CORS_PROXY_URL}/${url}`)
                .then(response => {
                    if (response.ok) return resolve(response.json())
                    throw new Error('Network response was not ok.')
                }, err => {
                    reject(err);
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            fetch(`${CORS_PROXY_URL}/${url}`, {
                method: 'POST', headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
                .then(response => {
                    if (response.ok) return resolve(response.json())
                    throw new Error('Network response was not ok.')
                }, err => {
                    reject(err);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    });
}

function getDateInput(date) {
    const dateInput = new Date(date);
    var dateInputStr = `${dateInput.getFullYear()}_${("0" + (dateInput.getMonth() + 1)).slice(-2)}_${("0" + dateInput.getDate()).slice(-2)}`;
    return dateInputStr;
}

function checkUrlExists(fileName) {
    var http = new XMLHttpRequest();
    http.open('HEAD', getRequestUrl(fileName), false);
    http.send();
    if (http.status != 404)
        return true;
    else
        return false;
}

function getFirstItemData(date) {
    var res = null;
    var url = getUrlPreviousElementByDate(date);
    if (url === "") return res;
    $.ajax({
        url: url,
        async: false,
        dataType: "json"
    }).done(function (result) {
        if (result && result.items.length > 0) {
            res = result.items[0];
        }
    });
    return res;
}

function addCell(tr, cellData) {
    var tabCell = tr.insertCell(-1);
    tabCell.innerHTML = cellData;
}

function getPositionIcon(prvPosition, currentPosition) {
    var iconString = "<span class='reference'> &#8722;</span>";
    if (currentPosition < prvPosition) {
        iconString = "<span class='up'> &#8593;(" + Number(prvPosition + 1) + ")</span>";
    } else if (currentPosition > prvPosition) {
        iconString = "<span class='down'> &#8595;(" + Number(prvPosition + 1) + ")</span>";
    }
    return iconString;
}

function getColumnName() {
    if (typeDefault === "selfBusiness") {
        return TOTAL_NET_BUY_TRADE_VALUE;
        // if (actionDefault === "netBuy") {
        //     return TOTAL_NET_BUY_TRADE_VALUE;
        // } else {
        //     return TOTAL_NET_SELL_TRADE_VALUE;
        // }
    } else {
        return FOREIGN_NET_BUY_VALUE;
        // if (actionDefault === "netBuy") {
        //     return FOREIGN_NET_BUY_VALUE;
        // } else {
        //     return FOREIGN_NET_SELL_VALUE;
        // }
    }
}

function getVolumeColumnName() {
    if (typeDefault === "selfBusiness") {
        return TOTAL_NET_BUY_TRADE_VOLUME;
        // if (actionDefault === "netBuy") {
        //     return TOTAL_NET_BUY_TRADE_VOLUME;
        // } else {
        //     return TOTAL_NET_SELL_TRADE_VOLUME;
        // }
    } else {
        return "";
    }
}

function getVolatilityValue(data) {
    if (typeDefault === "selfBusiness") {
        return Intl.NumberFormat().format(data["totalBuyTradeValue"] - data["totalSellTradeValue"]);
    } else {
        return Intl.NumberFormat().format(data["foreignBuyValue"] - data["foreignSellValue"]);
    }
}

function getNetTradeValueColumn() {
    if (typeDefault === "selfBusiness") {
        if (actionDefault === "netBuy") {
            return TOTAL_NET_BUY_TRADE_VALUE;
        } else {
            return TOTAL_NET_SELL_TRADE_VALUE;
        }
    } else {
        if (actionDefault === "netBuy") {
            return FOREIGN_NET_BUY_VALUE;
        } else {
            return FOREIGN_NET_SELL_VALUE;
        }
    }
}

function getUrlPreviousElementByDate(date) {
    var fileName = `${getDateInput(date)}.json`;
    var index = mappingDataJson.findIndex(x => x.name === fileName);
    if (index <= 0) return "";
    return mappingDataJson[index + 1].url;
}

function showLoading(elementId) {
    var loadingElement = document.getElementById(elementId);
    loadingElement.style.display = "block";
}

function hideLoading(elementId) {
    var loadingElement = document.getElementById(elementId);
    loadingElement.style.setProperty("display", "none", "important");
}

function getClassByValue(value) {
    return value > 0 ? "up" : value < 0 ? "down" : "reference";
}

function showTickerInfor(code) {
    currentTicker = code;
    var loadingHTML = getLoadingHTML();
    $("#tickerDetailLabel").html(code);
    $("#tickerDetail").html(loadingHTML);
    processTickerData(code);
    $("#tickerDetailModal").modal('show');
}

function processTickerData(code) {
    var currentDate = new Date();
    var prvDate = new Date();
    prvDate.setMonth(prvDate.getMonth() - 3);
    var toDate = `${currentDate.getFullYear()}-${("0" + (currentDate.getMonth() + 1)).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}`;
    var fromDate = `${prvDate.getFullYear()}-${("0" + (prvDate.getMonth() + 1)).slice(-2)}-${("0" + prvDate.getDate()).slice(-2)}`;

    var RECOMMENDATIONS_URL = encodeURIComponent(`${FIALDA_API_V2_URL}${FIALDA_GET_REPORT_PATH}?fromDate=${fromDate}&toDate=${toDate}&symbols=${code}`);
    var STOCK_INFO_URL = encodeURIComponent(`${FIALDA_API_V1_URL}${FIALDA_GET_STOCK_INFO_PATH}`);
    Promise.all([
        fetchContentByUrlWithCORSProxy(RECOMMENDATIONS_URL, "GET", ""),
        fetchContentByUrlWithCORSProxy(STOCK_INFO_URL, "POST", [{ symbol: code }])
    ]).then((values) => {
        if (values && values.length > 0) {
            setTimeout(() => {
                var content = drawRecommendationsDataToHTML(values, code);
                $("#tickerDetail").html(content);
            }, 50);
        }
    }).then(() => {
        console.log('Done fetching content via JavaScript');
    }).catch((err) => {
        console.error(err);
    });
}

function drawRecommendationsDataToHTML(data, code) {
    var res = "";
    var recommendationsData = data[0];
    var tickerData = data[1];
    if (tickerData && tickerData["result"]) {
        var firstKey = Object.keys(tickerData["result"])[0];
        if (firstKey !== undefined) {
            var tickerObject = tickerData["result"][firstKey];
            var lastPrice = tickerObject.PriceInfo.lastPrice !== null ? tickerObject.PriceInfo.lastPrice * 1000 : tickerObject.BasicPriceInfo.prevClose * 1000;
            var pe = $.isNumeric(tickerObject.BasicInfo.eps_TTM) ? (lastPrice / tickerObject.BasicInfo.eps_TTM).toFixed(2) : "N/A";
            var pb = $.isNumeric(tickerObject.BasicInfo.bookValuePerShare) ? (lastPrice / tickerObject.BasicInfo.bookValuePerShare).toFixed(2) : "N/A";
            var ps = $.isNumeric(tickerObject.BasicInfo.salePerShare) ? (lastPrice / tickerObject.BasicInfo.salePerShare).toFixed(2) : "N/A";
            var valuePercentChange = $.isNumeric(tickerObject.PriceInfo.priceChangePercent) ? `(${(tickerObject.PriceInfo.priceChangePercent * 100).toFixed(2)}%)` : "";
            $("#tickerDetailLabel").html(`${code} - ${tickerObject.BasicInfo.name}`);
            res += `<div class="card mb-3">
                        <div class="row g-0">
                        <div class="col-md-3 text-center">
                            <div class="card-body ${tickerObject.PriceInfo.openPrice === null ? "bg-reference" : tickerObject.PriceInfo.priceChange > 0 ? "bg-up" : tickerObject.PriceInfo.priceChange < 0 ? "bg-down" : "bg-reference" }">
                                <h5 class="card-title">${new Intl.NumberFormat().format(lastPrice)} ${valuePercentChange}</h5>
                                <h6>Sàn: ${tickerObject.BasicInfo.exchange}</h6>
                            </div>               
                        </div>
                        <div class="col-md-9">
                            <div class="card-body price-info">
                                <table class="table table-responsive" style="border: none">
                                    <tbody>
                                        <tr>
                                            <td><span class="font-weight-bold">Vốn hóa:</span> ${$.isNumeric(tickerObject.PriceInfo.marketCap) ? new Intl.NumberFormat().format(tickerObject.PriceInfo.marketCap) : "N/A"}</td>    
                                            <td><span class="font-weight-bold">EPS(TTM):</span> ${$.isNumeric(tickerObject.BasicInfo.eps_TTM) ? new Intl.NumberFormat().format(tickerObject.BasicInfo.eps_TTM.toFixed(0)) : "N/A"}</td>
                                            <td><span class="font-weight-bold">P/E:</span> ${pe}</td>
                                            <td><span class="font-weight-bold">P/S:</span> ${ps}</td>
                                            <td><span class="font-weight-bold">P/B:</span> ${pb} </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        </div>
                    </div>`;
        } else {
            res += "";
        }
    } else {
        res += "";
    }
    res += `<table class="table table-bordered table-responsive">
                <thead class="table-light">
                    <tr><th>Ngày báo cáo</th><th>Đơn vị phát hành</th><th>Tiêu đề</th><th>#</th></tr>              
                </thead>
                <tbody>`;
    if (recommendationsData && recommendationsData["result"]) {
        var firstKey = Object.keys(recommendationsData["result"])[0];
        if (firstKey !== undefined) {
            recommendationsData["result"][firstKey].forEach(item => {
                res += `<tr><td>${new Date(item.reportDate).toLocaleDateString(locale)}</td><td><b class="top10">${item.reporter}</b></td><td class="text-left">${item.title}</td><td><a href="${FIALDA_ANALYSIS_REPORT_URL}${code}_-_${item.attachment}" target="_blank">Xem báo cáo</a></td></tr>`;
            });
        } else {
            res += `<tr><td colspan="4">Chưa có dữ liệu cho mã <b class="top10">${code}</b>. Vui lòng thử lại sau!</td></tr>`;
        }
    } else {
        res += `<tr><td colspan="4">Chưa có dữ liệu cho mã <b class="top10">${code}</b>. Vui lòng thử lại sau!</td></tr>`;
    }
    res += `</tbody></table>`;
    return res;
}

function getLoadingHTML() {
    return `<div class="d-flex justify-content-center">
                <div class="spinner-border text-success" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <span class="loadingTitle">Đang tải dữ liệu...</span>
            </div>`;
}

function refreshTickerDetailData() {
    var loadingHTML = getLoadingHTML();
    $("#tickerDetail").html(loadingHTML);
    processTickerData(currentTicker);
}

function loadSynthesisData() {
    initSummaryData();
}

function initTooltips() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    })
    const $tooltip = $('[data-bs-toggle="tooltip"]');
    $tooltip.tooltip({
        html: true,
        trigger: 'click',
        placement: 'bottom',
    });
    $tooltip.on('show.bs.tooltip', () => {
        $('.tooltip').not(this).remove();
    });
}
