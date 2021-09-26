var typeDefault = "selfBusiness";
var actionDefault = "netBuy";
var actionSummaryDefault= "netBuy";
var currentPeriod = "yearToDate";
var currentSummaryPeriod = "yearToDate";
var dataJson = null;
var summaryDataJson = null;
var mappingDataJson = null;
var currentTicker = "";
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
const DATA_URL = "https://hunganh.github.io/";
const MAPPING_DATA_URL = `${DATA_URL}mapping/data_mapping.json`;
const CORS_PROXY_URL = "http://api.allorigins.win/get?url=";
const FIALDA_API_URL_WITH_CORS_PROX_YURL = `${CORS_PROXY_URL}https://fwtapi2.fialda.com/api/services/app/`;
const FIALDA_API_URL= `https://fwtapi2.fialda.com/api/services/app/`;
const FIALDA_ANALYSIS_REPORT_URL = "https://cdn.fialda.com/Attachment/AnalysisReport/";

// $(document).on("contextmenu", function (e) {        
//     e.preventDefault();
// });

// $(document).keydown(function (event) {
//     // Prevent F12
//     if (event.keyCode == 123) 
//     { 
//         return false;
//     } 
//     else if(event.ctrlKey && event.shiftKey && event.keyCode == 73)
//     // Prevent Ctrl+Shift+I
//     {         
//         return false;
//     }
//     else if(event.ctrlKey && event.keyCode == 83)
//     // Prevent Ctrl+S
//     {         
//         return false;
//     }
// });

function fetchContent(fileName) {
    return new Promise((resolve, reject) => {
        window.fetch(getRequestUrl(fileName,""),
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

function fetchContentByUrlWithCORSProxy(url) {
    return new Promise((resolve, reject) => {
        // window.fetch(url,
        //     {
        //         method: 'GET'
        //     }
        // ).then((response) => {
        //     if (response.status === 200) {
        //         resolve(response.text());
        //     }
        // }, (err) => {
        //     reject(err);
        // }).catch(error => {
        //     console.log(error);
        // });
        fetch(`${CORS_PROXY_URL}${url}`)
        .then(response => {
            if (response.ok) return resolve(response.json())
            throw new Error('Network response was not ok.')
        }, err => {
            reject(err);
        })
        .then(data => console.log(data.contents))
        .catch(error => {
            console.log(error);
        });
    });
}

function getDateInput(date) {
    const dateInput = new Date(date);
    var dateInputStr = `${("0" + dateInput.getDate()).slice(-2)}${("0" + (dateInput.getMonth() + 1)).slice(-2)}${dateInput.getFullYear()}`;
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
    var fileName = getMappingDataFileNameByDate(date);
    if (fileName === "") return res;
    $.ajax({
        url: getRequestUrl(fileName, ""),
        async: false,
        dataType: "json"
    }).done(function (result) {
        if (result && result.items.length > 0) {
            res = result.items[0];
        }
    });
    return res;
}

function getRequestUrl(fileName, type) {
    return `${DATA_URL}/${type !== "" ? type : (typeDefault === "selfBusiness" ? TU_DOANH : KHOI_NGOAI)}/${fileName}.json`
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

function getMappingDataFileNameByDate(date) {
    var fileName = `data_${getDateInput(date)}`;
    var nodeName = typeDefault === "selfBusiness" ? TU_DOANH : KHOI_NGOAI;
    var index = mappingDataJson[nodeName].findIndex(x => x.fileName === fileName);
    if (index <= 0) return "";
    return mappingDataJson[nodeName][index - 1].fileName;
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
    prvDate.setMonth(prvDate.getMonth()-3);
    var toDate = `${currentDate.getFullYear()}-${("0" + (currentDate.getMonth() + 1)).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}`;
    var fromDate = `${prvDate.getFullYear()}-${("0" + (prvDate.getMonth() + 1)).slice(-2)}-${("0" + prvDate.getDate()).slice(-2)}`;
    
    var URL_RECOMMENDATIONS = encodeURIComponent(`${FIALDA_API_URL}AnalysisReport/GetByFilter?fromDate=${fromDate}&toDate=${toDate}&symbols=${code}`);
    Promise.all([
        fetchContentByUrlWithCORSProxy(URL_RECOMMENDATIONS),
        //fetchContentByUrl(URL_KHOI_NGOAI)
    ]).then((values) => {
        if (values && values.length > 0) {
            var data = JSON.parse(values[0].contents);
            setTimeout(() => {
                var content = drawRecommendationsDataToHTML(data, code);
                $("#tickerDetail").html(content);
                $("#tickerDetailLabel").html(code);
            }, 50);
        }
    }).then(() => {
        console.log('Done fetching content via JavaScript');
    }).catch((err) => {
        console.error(err);
    });
}

function drawRecommendationsDataToHTML(data, code) {
    var res = `<table class="table table-bordered table-responsive">
                <thead class="table-light">
                    <th>Ngày báo cáo</th><th>Đơn vị phát hành</th><th>Tiêu đề</th><th>#</th>
                </thead>
                <tbody>`;
    if (data && data["result"]) {
        var firstKey = Object.keys(data["result"])[0];
        if (firstKey !== undefined) {
            data["result"][firstKey].forEach(item => {
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