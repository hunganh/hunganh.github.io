var divSummaryShowData = document.getElementById('showSummaryData');
var divSummaryTitle = document.getElementById('showSummaryTitle');
$(document).ready(function () {
    initSummaryData();
});

function resetDataSummary() {
    summaryDataJson = null;
    divSummaryShowData.innerHTML = "";
}

function refreshSummaryData() {
    resetDataSummary();
    initSummaryData();
}

function initSummaryData() {
    showLoading("showSummaryLoading");
     Promise.all([
        fetchContentByUrl(SYNTHESIS_DATA_URL)
    ]).then((values) => {
        if (values && values.length > 0) {
            setSummaryDataGlobal(values);
        }
        hideLoading("showSummaryLoading");
    }).then(() => {
        console.log('Done fetching content via JavaScript');
    }).catch((err) => {
        console.error(err);
    });
}

function setSummaryDataGlobal(values) {
    resetDataSummary();
    if (values && values.length > 0) {
        summaryDataJson = JSON.parse(values);
        processSummaryDataInput();
    }
}

function processSummaryDataInput() {
    var data = [];
    var selfBusinessData = summaryDataJson.selfBusiness[currentSummaryPeriod][actionSummaryDefault];
    var foreignData = summaryDataJson.foreign[currentSummaryPeriod][actionSummaryDefault];
    var selfBusinessCodes = selfBusinessData.map(x => x.ticker);
    var foreignCodes = foreignData.map(x => x.ticker);
    var codes = selfBusinessCodes.filter(x => foreignCodes.indexOf(x) !== -1);
    if (codes && codes.length > 0) {
        codes.forEach(code => {
            var selfBusinessDataObject = selfBusinessData.find(x => x.ticker === code);
            var foreignDataObject = foreignData.find(x => x.ticker === code);
            if (selfBusinessDataObject && foreignDataObject) {
                var dataObject = {
                    ticker: code,
                    totalNetBuyTradeValue: selfBusinessDataObject.totalNetBuyTradeValue,
                    selfBusinessPercentPriceChange: selfBusinessDataObject.percentPriceChange,
                    selfBusinessPriceChange: selfBusinessDataObject.priceChange,
                    selfBusinessMatchPrice: selfBusinessDataObject.matchPrice,
                    foreignNetBuyValue: foreignDataObject.foreignNetBuyValue,
                    foreignPercentPriceChange: foreignDataObject.percentPriceChange,
                    foreignPriceChange: foreignDataObject.priceChange,
                    foreignMatchPrice: foreignDataObject.matchPrice,
                    sumValue: 0,
                    avgPercent: 0
                }
                var avgPercent = (dataObject.selfBusinessPercentPriceChange + dataObject.foreignPercentPriceChange) / 2;
                dataObject.sumValue = dataObject.totalNetBuyTradeValue + dataObject.foreignNetBuyValue;
                dataObject.avgPercent = avgPercent;
                data.push(dataObject);
            }
        });
    }
    if (data && data.length > 0) {
        // Sort data
        data.sort(function (a, b) {
            return b.sumValue - a.sumValue;
        });
        createSummaryReport(data);
        setSummaryTitle();
    }
    hideLoading("showSummaryLoading");
}

function createSummaryReport(data) {
    var title = "Thống Kê Từ " + new Date(summaryDataJson["foreign"][currentSummaryPeriod].fromDate).toLocaleDateString(locale) + " - " + new Date(summaryDataJson["foreign"][currentSummaryPeriod].toDate).toLocaleDateString(locale);
    var table = document.createElement("table");
    table.classList.add("left-position", "table", "table-bordered", "table-striped", "table-hover");
    var thead = document.createElement("thead");
    var tr = thead.insertRow(-1);                    // table row.
    var thTime = document.createElement("th");
    thTime.setAttribute("colspan", 10);
    thTime.innerHTML = title;
    tr.appendChild(thTime);
    thead.appendChild(tr);
    table.appendChild(thead);
    tr = thead.insertRow(-1);
    for (var i = 0; i < summaryHeadTitle.length; i++) {
        var th = document.createElement("th");      // table header.
        if (i > 1) {
            th.setAttribute("colspan", 3);
        } else {
            th.setAttribute("rowspan", 3);
        }
        th.innerHTML = summaryHeadTitle[i];
        tr.appendChild(th);
    }

    // create span column
    tr = thead.insertRow(-1);
    for (var k = 0; k < subSummaryHeadTitle.length; k++) {
        var th = document.createElement("th");
        th.innerHTML = subSummaryHeadTitle[k];
        tr.appendChild(th);
    }

    var tbody = document.createElement("tbody");
    // add json data to the table as rows.
    for (var i = 0; i < data.length; i++) {
        tr = tbody.insertRow(-1);
        tr.setAttribute("onClick", `showTickerInfor("${data[i]["ticker"]}")`);
        tr.classList.add("tr-cursor");
        var selfBusinessPercentChange = data[i]["selfBusinessPercentPriceChange"] * 100;
        var foreignPercentChange = data[i]["foreignPercentPriceChange"] * 100;
        var selfBusinessPriceChange = data[i]["selfBusinessPriceChange"];
        var foreignPriceChange = data[i]["foreignPriceChange"];
        var selfBusinessPrice = selfBusinessPercentChange > 0 || selfBusinessPercentChange < 0 ? (selfBusinessPriceChange/data[i]["selfBusinessPercentPriceChange"]) : data[i]["selfBusinessMatchPrice"];
        var foreignPrice = foreignPercentChange > 0 || foreignPercentChange < 0 ? (foreignPriceChange/data[i]["foreignPercentPriceChange"]) : data[i]["foreignMatchPrice"];
        var avgPercent = data[i]["avgPercent"] * 100;
        var avgPrice = (selfBusinessPrice + foreignPriceChange)/2;
        addCell(tr, Number(i + 1));
        addCell(tr, `<b class="top10">${data[i]["ticker"]}</span>`);
        addCell(tr, new Intl.NumberFormat().format(data[i]["totalNetBuyTradeValue"]));
        addCell(tr, `<span class='${getClassByValue(selfBusinessPercentChange)}'>${selfBusinessPercentChange.toFixed(2)}</span>`);
        addCell(tr, new Intl.NumberFormat().format(selfBusinessPrice.toFixed(0)));
        addCell(tr, new Intl.NumberFormat().format(data[i]["foreignNetBuyValue"]));
        addCell(tr, `<span class='${getClassByValue(foreignPercentChange)}'>${foreignPercentChange.toFixed(2)}</span>`);
        addCell(tr, new Intl.NumberFormat().format(foreignPrice.toFixed(0)));
        addCell(tr, new Intl.NumberFormat().format(data[i]["sumValue"]));
        addCell(tr, `<span class='${getClassByValue(avgPercent)}'>${avgPercent.toFixed(2)}</span>`);
    }
    table.appendChild(tbody);
    // Now, add the newly created table with json data, to a container.
    divSummaryShowData.appendChild(table);
}

function changePeriodAction(period) {
    currentSummaryPeriod = period;
    if (summaryDataJson !== null) {
        divSummaryShowData.innerHTML = "";
        showLoading("showSummaryLoading");
        processSummaryDataInput();
    } else {
        initSummaryData();
    }
}

function changeSummaryAction(action) {
    actionSummaryDefault = action;
    if (summaryDataJson !== null) {
        divSummaryShowData.innerHTML = "";
        showLoading("showSummaryLoading");
        processSummaryDataInput();
    } else {
        initSummaryData();
    }
}

function setSummaryTitle() {
    var today = new Date().toLocaleDateString(locale);
    var updateDate = new Date(summaryDataJson["foreign"][currentSummaryPeriod].toDate).toLocaleDateString(locale);
    var updateDateStr = ` ${dataJson && dataJson.items.length > 0 ? "- Dữ liệu ngày " + updateDate : ""} `;
    if (updateDate === today) {
        divSummaryTitle.classList.remove("bg-out-of-date");
        divSummaryTitle.classList.add("bg-latest");
    } else {
        divSummaryTitle.classList.remove("bg-latest");
        divSummaryTitle.classList.add("bg-out-of-date");
    }
    divSummaryTitle.innerHTML = `Mã CP Được Tự Doanh & Khối Ngoại ${actionSummaryDefault === "netBuy" ? "Mua Ròng" : "Bán Ròng"}${updateDateStr}`;
}
