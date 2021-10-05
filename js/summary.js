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
    resetDataSummary();
    showLoading("showSummaryLoading");
    Promise.all([
        fetchContentByUrl(SYNTHESIS_DATA_URL)
    ]).then((values) => {
        if (values && values.length > 0) {
            setSummaryDataGlobal(values);
        }
        hideLoading("showSummaryLoading");
    }).then(() => {
        //console.log('Done fetching content via JavaScript');
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
                }
                dataObject.sumValue = dataObject.totalNetBuyTradeValue + dataObject.foreignNetBuyValue;
                data.push(dataObject);
            }
        });
    }
    if (data && data.length > 0) {
        // Sort data
        data.sort(function (a, b) {
            return b.sumValue - a.sumValue;
        });
    }
    createSummaryReport(data);
    setSummaryTitle();
    hideLoading("showSummaryLoading");
}

function createSummaryReport(data) {
    var title = "Thống Kê Từ " + new Date(summaryDataJson["foreign"][currentSummaryPeriod].fromDate).toLocaleDateString(locale) + " - " + new Date(summaryDataJson["foreign"][currentSummaryPeriod].toDate).toLocaleDateString(locale);
    var table = document.createElement("table");
    table.classList.add("left-position", "table", "table-bordered", "table-striped", "table-hover");
    var thead = document.createElement("thead");
    var tr = thead.insertRow(-1);                    // table row.
    var thTime = document.createElement("th");
    thTime.setAttribute("colspan", 13);
    thTime.innerHTML = title;
    tr.appendChild(thTime);
    thead.appendChild(tr);
    table.appendChild(thead);
    tr = thead.insertRow(-1);
    for (var i = 0; i < summaryHeadTitle.length; i++) {
        var th = document.createElement("th");      // table header.
        if (i > 1 && i < summaryHeadTitle.length -1) {
            th.setAttribute("colspan", 5);
        } else {
            th.setAttribute("rowspan", 5);
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
    if (data.length > 0) {
        // add json data to the table as rows.
        for (var i = 0; i < data.length; i++) {
            tr = tbody.insertRow(-1);
            tr.setAttribute("onClick", `showTickerInfor("${data[i]["ticker"]}")`);
            tr.classList.add("tr-cursor");
            var selfBusinessClosePrice = data[i]["selfBusinessMatchPrice"];
            var selfBusinessPriceChange = data[i]["selfBusinessPriceChange"];
            var selfBusinessPercentChange = data[i]["selfBusinessPercentPriceChange"] * 100;
            var selfBusinessPrice = selfBusinessPercentChange > 0 || selfBusinessPercentChange < 0 ? (selfBusinessPriceChange/data[i]["selfBusinessPercentPriceChange"]) : data[i]["selfBusinessMatchPrice"];
            var foreignClosePrice = data[i]["foreignMatchPrice"];
            var foreignPriceChange = data[i]["foreignPriceChange"];
            var foreignPercentChange = data[i]["foreignPercentPriceChange"] * 100;
            var foreignPrice = foreignPercentChange > 0 || foreignPercentChange < 0 ? (foreignPriceChange/data[i]["foreignPercentPriceChange"]) : data[i]["foreignMatchPrice"];
            //var avgPrice = (selfBusinessPrice + foreignPriceChange)/2;
            addCell(tr, Number(i + 1));
            addCell(tr, `<b class="top10">${data[i]["ticker"]}</span>`);
            addCell(tr, `<span class='text-right'>${new Intl.NumberFormat().format(data[i]["totalNetBuyTradeValue"])}</span>`);
            addCell(tr, `<span class='${getClassByValue(selfBusinessPriceChange)}'>${new Intl.NumberFormat().format(selfBusinessClosePrice)}</span>`);
            addCell(tr, `<span class='${getClassByValue(selfBusinessPriceChange)}'>${new Intl.NumberFormat().format(selfBusinessPriceChange)}</span>`);
            addCell(tr, `<span class='${getClassByValue(selfBusinessPercentChange)}'>${selfBusinessPercentChange.toFixed(2)}%</span>`);
            addCell(tr, new Intl.NumberFormat().format(selfBusinessPrice.toFixed(0)));

            addCell(tr, `<span class='text-right'>${new Intl.NumberFormat().format(data[i]["foreignNetBuyValue"])}</span>`);
            addCell(tr, `<span class='${getClassByValue(foreignPriceChange)}'>${new Intl.NumberFormat().format(foreignClosePrice)}</span>`);
            addCell(tr, `<span class='${getClassByValue(foreignPriceChange)}'>${new Intl.NumberFormat().format(foreignPriceChange)}</span>`);
            addCell(tr, `<span class='${getClassByValue(foreignPercentChange)}'>${foreignPercentChange.toFixed(2)}%</span>`);
            addCell(tr, new Intl.NumberFormat().format(foreignPrice.toFixed(0)));
            addCell(tr, `<span class='bold text-right top10'>${new Intl.NumberFormat().format(data[i]["sumValue"])}</span>`);
        }
    } else {
        tr = tbody.insertRow(-1);
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = "Không có dữ liệu.";
        cell.colSpan = 13;
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
