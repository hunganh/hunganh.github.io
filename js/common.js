var typeDefault = "selfBusiness";
var actionDefault = "netBuy";
var actionSummaryDefault= "netBuy";
var currentPeriod = "yearToDate";
var currentSummaryPeriod = "yearToDate";
var dataJson = null;
var summaryDataJson = null;
var mappingDataJson = null;
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
const DATA_URL = "https://hunganh.github.io/";
const MAPPING_DATA_URL = `${DATA_URL}mapping/data_mapping.json`;
const TU_DOANH = "tudoanh";
const KHOI_NGOAI = "khoingoai";

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
