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
    $.ajax({
        url: MAPPING_DATA_URL,
        async: false,
        dataType: "json"
    }).done(function (result) {
        if (result) {
            mappingDataJson = result;
            var dataInput1 = result[TU_DOANH][result[TU_DOANH].length - 1];
            var dataInput2 = result[KHOI_NGOAI][result[KHOI_NGOAI].length - 1];
            var URL_TU_DOANH = getRequestUrl(dataInput1.fileName, TU_DOANH);
            var URL_KHOI_NGOAI = getRequestUrl(dataInput2.fileName, KHOI_NGOAI);
            Promise.all([
                fetchContentByUrl(URL_TU_DOANH),
                fetchContentByUrl(URL_KHOI_NGOAI)
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
    });
}

function setSummaryDataGlobal(values) {
    resetDataSummary();
    if (values && values.length > 0) {
        var dataJsonInput = { selfBusiness: values[0] ? JSON.parse(values[0]).items[0] : null, foreign: values[1] ? JSON.parse(values[1]).items[0] : null };
        summaryDataJson = dataJsonInput;
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
                    foreignNetBuyValue: foreignDataObject.foreignNetBuyValue,
                    foreignPercentPriceChange: foreignDataObject.percentPriceChange,
                    sumValue: 0,
                    avgPercent: 0
                }
                var selfBusinessPercentChange = Number(dataObject.selfBusinessPercentPriceChange * 100).toFixed(2);
                var foreignPercentChange = Number(dataObject.foreignPercentPriceChange * 100).toFixed(2);
                var avgPercent = (Number(selfBusinessPercentChange) + Number(foreignPercentChange)) / 2;
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
    var tr = table.insertRow(-1);                   // table row.
    var thTime = document.createElement("th");
    thTime.setAttribute("colspan", 8);
    thTime.innerHTML = title;
    tr.appendChild(thTime);

    tr = table.insertRow(-1);
    for (var i = 0; i < summaryHeadTitle.length; i++) {
        var th = document.createElement("th");      // table header.
        if (i > 1) {
            th.setAttribute("colspan", 2);
        } else {
            th.setAttribute("rowspan", 2);
        }
        th.innerHTML = summaryHeadTitle[i];
        tr.appendChild(th);
    }

    // create span column
    tr = table.insertRow(-1);
    for (var k = 0; k < subSummaryHeadTitle.length; k++) {
        var th = document.createElement("th");
        th.innerHTML = subSummaryHeadTitle[k];
        tr.appendChild(th);
    }

    // add json data to the table as rows.
    for (var i = 0; i < data.length; i++) {
        tr = table.insertRow(-1);
        tr.setAttribute("onClick", `showTickerInfor("${data[i]["ticker"]}")`);
        tr.classList.add("tr-cursor");
        var selfBusinessPercentChange = Number(data[i]["selfBusinessPercentPriceChange"] * 100).toFixed(2);
        var foreignPercentChange = Number(data[i]["foreignPercentPriceChange"] * 100).toFixed(2);
        addCell(tr, Number(i + 1));
        addCell(tr, `<b class="top10">${data[i]["ticker"]}</span>`);
        addCell(tr, new Intl.NumberFormat().format(data[i]["totalNetBuyTradeValue"]));
        addCell(tr, `<span class='${getClassByValue(selfBusinessPercentChange)}'>${selfBusinessPercentChange}</span>`);
        addCell(tr, new Intl.NumberFormat().format(data[i]["foreignNetBuyValue"]));
        addCell(tr, `<span class='${getClassByValue(foreignPercentChange)}'>${foreignPercentChange}</span>`);
        addCell(tr, new Intl.NumberFormat().format(data[i]["sumValue"]));
        addCell(tr, `<span class='${getClassByValue(data[i]["avgPercent"])}'>${data[i]["avgPercent"].toFixed(2)}</span>`);
    }

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
    var updateDateStr = ` ${dataJson && dataJson.items.length > 0 ? "- Dữ liệu cập nhật ngày " + updateDate : ""} `;
    if (updateDate === today) {
        divSummaryTitle.classList.remove("bg-warning");
        divSummaryTitle.classList.add("bg-success");
    } else {
        divSummaryTitle.classList.remove("bg-success");
        divSummaryTitle.classList.add("bg-warning");
    }
    divSummaryTitle.innerHTML = `Mã CP Được Tự Doanh & Khối Ngoại ${actionSummaryDefault === "netBuy" ? "Mua Ròng" : "Bán Ròng"}${updateDateStr}`;
}
