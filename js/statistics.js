var divStatisticsShowData = document.getElementById('showStatisticsData');
var divStatisticsTitle = document.getElementById('showStatisticsTitle');
$(document).ready(function () {
    initStatisticsData();
});

window.addEventListener('load', function () {
    var upload = document.getElementById('fileInput');
    // Make sure the DOM element exists
    if (upload) {
        upload.addEventListener('change', function () {
            // Make sure a file was selected
            if (upload.files.length > 0) {
                dataJson = null;
                divStatisticsShowData.innerHTML = "";
                showLoading("showStatisticsLoading");
                let readers = [];
                for (let index = 0; index <= upload.files.length - 1; index++) {
                    readers.push(readFileAsText(upload.files[index]));
                }
                // Trigger Promises
                Promise.all(readers).then((values) => {
                    var data = values.map(x => JSON.parse(x));
                    olderItem = null;
                    processDataInput(data);
                });
            }
        }, false);
    }
});

function initStatisticsData() {
    showLoading("showStatisticsLoading");
    var nodeName = typeDefault === "selfBusiness" ? TU_DOANH : KHOI_NGOAI;
    $.ajax({
        url: `${STATISTICS_DATA_URL}/${nodeName}`,
        async: false,
        dataType: "json"
    }).done(function (result) {
        if (result) {
            var dataInput = [];
            var keys = Object.keys(result);
            if (keys && keys.length > 0) {
                keys.forEach(key => {
                    if (key === "olderItem") {
                        olderItem = result[key];
                    } else {
                        dataInput.push(result[key]);
                    }
                });
                processDataInput(dataInput);
            }
            hideLoading("showStatisticsLoading");
        }
    });
}

function processDataInput(values) {
    divStatisticsShowData.innerHTML = "";
    if (values && values.length > 0) {
        values.forEach((content) => {
            if (!dataJson) {
                dataJson = content;
                dataJson.totalCount = values.length;
            } else {
                dataJson.items.push(content.items[0]);
            }
        });
        // Sort data
        dataJson.items.sort(function (a, b) {
            var c = new Date(a.today.toDate);
            var d = new Date(b.today.toDate);
            return d - c;
        });
        for (let index = 0; index < dataJson.items.length; index++) {
            createStatisticsReport(currentPeriod, dataJson.items[index], index);
        }
        setStatisticsTitle();
    }
    hideLoading("showStatisticsLoading");
}

function resetStatisticsData() {
    dataJson = null;
    mappingDataJson = null;
    divStatisticsShowData.innerHTML = "";
    document.getElementById("fileInput").value = null;
}

function refreshStatisticsData() {
    resetStatisticsData();
    initStatisticsData();
}

function readFileAsText(file) {
    return new Promise(function (resolve, reject) {
        let fr = new FileReader();
        fr.onload = function () {
            resolve(fr.result);
        };
        fr.onerror = function () {
            reject(fr);
        };
        fr.readAsText(file);
    });
}

function changeStatisticsType(type) {
    resetStatisticsData();
    typeDefault = type;
    initStatisticsData();
}

function changeStatisticsAction(action) {
    showLoading("showStatisticsLoading");
    actionDefault = action;
    processStatisticsData(currentPeriod);
    hideLoading("showStatisticsLoading");
}

function processStatisticsData(period) {
    currentPeriod = period;
    if (dataJson && dataJson.items && dataJson.items.length > 0) {
        divStatisticsShowData.innerHTML = "";
        for (let index = 0; index < dataJson.items.length; index++) {
            createStatisticsReport(period, dataJson.items[index], index);
        }
    }
    setStatisticsTitle();
}

function createStatisticsReport(period, dataJsonInput, dataIndex) {
    var data = actionDefault === "netBuy" ? dataJsonInput[period].netBuy : dataJsonInput[period].netSell;
    var netTradeValueColumn = getNetTradeValueColumn();
    var title = " (" + new Date(dataJsonInput[period].fromDate).toLocaleDateString(locale) + " - " + new Date(dataJsonInput[period].toDate).toLocaleDateString(locale) + ") - " + `Tổng Giá Trị ${actionDefault === "netBuy" ? "Mua Ròng: " : "Bán Ròng: "}` + new Intl.NumberFormat().format(dataJsonInput[period][netTradeValueColumn]) + " đ";
    var table = document.createElement("table");
    table.classList.add("left-position", "table", "table-bordered", "table-striped", "table-hover");
    var tr = table.insertRow(-1);                   // table row.
    var thTime = document.createElement("th");
    thTime.setAttribute("colspan", 7);
    thTime.innerHTML = title;
    tr.appendChild(thTime);

    tr = table.insertRow(-1);
    for (var i = 0; i < statisticsHeadTitle.length; i++) {
        var th = document.createElement("th");      // table header.
        if (i === 2) {
            th.setAttribute("colspan", 2);
        } else {
            th.setAttribute("rowspan", 2);
        }
        th.innerHTML = statisticsHeadTitle[i];
        tr.appendChild(th);
    }

    // create span column
    tr = table.insertRow(-1);
    for (var k = 0; k < subStatisticsHeadTitle.length; k++) {
        var th = document.createElement("th");
        th.innerHTML = subStatisticsHeadTitle[k];
        tr.appendChild(th);
    }

    // add json data to the table as rows.
    for (var i = 0; i < data.length; i++) {
        tr = table.insertRow(-1);
        tr.setAttribute("onClick", `showTickerInfor("${data[i]["ticker"]}")`);
        tr.classList.add("tr-cursor");
        var prvItem = dataIndex === 0 && dataJson.items.length > 1 ? dataJson.items[dataIndex + 1] : olderItem; //getFirstItemData(dataJsonInput[period].toDate);
        var valueChange = 0;
        var percentChange = 0;
        var volumeValueChange = 0;
        var volumePercentChange = 0;
        var columnName = getColumnName();
        var volumeColumnName = getVolumeColumnName();
        if (!prvItem) {
            addCell(tr, Number(i + 1));
        } else {
            var prvPosition = actionDefault === "netBuy" ? prvItem[period].netBuy.findIndex(x => x.ticker === (data[i][statisticsCols[1]])) : prvItem[period].netSell.findIndex(x => x.ticker === (data[i][statisticsCols[1]]));
            if (prvPosition > -1) {
                addCell(tr, Number(i + 1) + getPositionIcon(prvPosition, i));
            } else {
                addCell(tr, Number(i + 1));
            }
            try {
                valueChange = currentPeriod === "today" ?  Number(data[i][columnName]) : actionDefault === "netBuy" ? (Number(data[i][columnName]) - Number(prvItem[period].netBuy[prvPosition][columnName])) : (Number(data[i][columnName]) - Number(prvItem[period].netSell[prvPosition][columnName]));
                percentChange = currentPeriod === "today" ? "" : actionDefault === "netBuy" ? (valueChange / Number(prvItem[period].netBuy[prvPosition][columnName]) * 100).toFixed(2) : (valueChange / Number(prvItem[period].netSell[prvPosition][typeDefault === "selfBusiness" ? TOTAL_NET_SELL_TRADE_VALUE : FOREIGN_NET_SELL_VALUE]) * 100).toFixed(2);
                volumeValueChange = currentPeriod === "today" ?  Number(data[i][volumeColumnName]) : actionDefault === "netBuy" ? (Number(data[i][volumeColumnName]) - Number(prvItem[period].netBuy[prvPosition][volumeColumnName])) : (Number(data[i][volumeColumnName]) - Number(prvItem[period].netSell[prvPosition][volumeColumnName]));
                volumePercentChange = currentPeriod === "today" ? "" : actionDefault === "netBuy" ? (volumeValueChange / Number(prvItem[period].netBuy[prvPosition][volumeColumnName]) * 100).toFixed(2) : (volumeValueChange / Number(prvItem[period].netSell[prvPosition][TOTAL_NET_SELL_TRADE_VOLUME]) * 100).toFixed(2);
            } catch (error) {
                valueChange = 0;
                percentChange = 0;
            }
        }
        addCell(tr, Number(i + 1) <= 10 ? '<b class="top10">' + data[i][statisticsCols[1]] + '</b>' : data[i][statisticsCols[1]]);
        // addCell(tr, '<span class="' + (data[i][MATCH_PRICE] === data[i][REFERENCE_PRICE] ? "reference" : data[i][MATCH_PRICE] > data[i][REFERENCE_PRICE]? "up" : "down") + '">' + new Intl.NumberFormat().format(data[i][MATCH_PRICE]) + '</span>');
        if (typeDefault !== "selfBusiness" || prvItem === null) {
            addCell(tr, '<span class="reference"> &#8722; </span>');
        } else {
            addCell(tr, `<span class=${(volumeValueChange >= 0 ? "up" : "down")}> ${new Intl.NumberFormat().format(volumeValueChange)} ${volumePercentChange === "" ? "" : "(" + volumePercentChange + "%)"}</span>`);
        }
        if (prvItem === null) {
            addCell(tr, '<span class="reference"> &#8722; </span>');
        } else {
            addCell(tr, `<span class=${(valueChange >= 0 ? "up" : "down")}> ${new Intl.NumberFormat().format(valueChange)} ${percentChange === "" ? "" : "(" + percentChange + "%)"}</span>`);
        }

        addCell(tr, volumeColumnName !== "" ? new Intl.NumberFormat().format(data[i][volumeColumnName]) : "&#8722;");
        addCell(tr, new Intl.NumberFormat().format(data[i][columnName]));
        addCell(tr, '<span class="' + (Number(data[i][statisticsCols[4]] * 100) >= 0 ? "up" : "down") + '">' + Number(data[i][statisticsCols[4]] * 100).toFixed(2) + '</span>');
    }

    // Now, add the newly created table with json data, to a container.
    divStatisticsShowData.appendChild(table);
}

function setStatisticsTitle() {
    var today = new Date().toLocaleDateString(locale);
    var updateDate = new Date(dataJson.items[0]["today"].toDate).toLocaleDateString(locale);
    var updateDateStr = ` ${dataJson && dataJson.items.length > 0 ? "- Dữ liệu cập nhật ngày " + updateDate : ""} `;
    if (updateDate === today) {
        divStatisticsTitle.classList.remove("bg-warning");
        divStatisticsTitle.classList.add("bg-success");
    } else {
        divStatisticsTitle.classList.remove("bg-success");
        divStatisticsTitle.classList.add("bg-warning");
    }
    divStatisticsTitle.innerHTML = "Thống Kê ".concat(typeDefault === "selfBusiness" ? "Tự Doanh " : "Khối Ngoại ", actionDefault === "netBuy" ? "Mua Ròng" : "Bán Ròng") + updateDateStr;
}
