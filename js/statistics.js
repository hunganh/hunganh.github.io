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
    setTimeout(() => {
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
    }, 100);
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
    var thead = document.createElement("thead");
    var tr = thead.insertRow(-1);                   // table row.
    var thTime = document.createElement("th");
    thTime.setAttribute("colspan", 9);
    thTime.innerHTML = title;
    tr.appendChild(thTime);
    thead.appendChild(tr);
    table.appendChild(thead);
    tr = thead.insertRow(-1);
    for (var i = 0; i < statisticsHeadTitle.length; i++) {
        var th = document.createElement("th");      // table header.
        // if (i === 2) {
        //     th.setAttribute("colspan", 2);
        // } else {
        //     th.setAttribute("rowspan", 2);
        // }
        th.innerHTML = statisticsHeadTitle[i];
        tr.appendChild(th);
    }

    // create span column
    // tr = thead.insertRow(-1);
    // for (var k = 0; k < subStatisticsHeadTitle.length; k++) {
    //     var th = document.createElement("th");
    //     th.innerHTML = subStatisticsHeadTitle[k];
    //     tr.appendChild(th);
    // }
    
    var tbody = document.createElement("tbody");
    // add json data to the table as rows.
    for (var i = 0; i < data.length; i++) {
        tr = tbody.insertRow(-1);
        tr.setAttribute("onClick", `showTickerInfor("${data[i]["ticker"]}")`);
        tr.classList.add("tr-cursor");
        var prvItem = dataIndex === 0 && dataJson.items.length > 1 ? dataJson.items[dataIndex + 1] : olderItem; //getFirstItemData(dataJsonInput[period].toDate);
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
        }
        var priceChange = data[i]["priceChange"];
        var percentPriceChange = data[i]["percentPriceChange"] * 100;
        var price = percentPriceChange > 0 || percentPriceChange < 0 ? (priceChange/data[i]["percentPriceChange"]).toFixed(0) : data[i]["matchPrice"];
        var closePrice = data[i]["matchPrice"];

        addCell(tr, Number(i + 1) <= 10 ? '<b class="top10">' + data[i]["ticker"] + '</b>' : data[i]["ticker"]);
        addCell(tr, volumeColumnName !== "" ? new Intl.NumberFormat().format(data[i][volumeColumnName]) : "&#8722;");
        addCell(tr, new Intl.NumberFormat().format(data[i][columnName]));
        addCell(tr, '<span class="' + (Number(priceChange) > 0 ? "up" : Number(priceChange) < 0 ? "down" : "reference") + '">' + new Intl.NumberFormat().format(closePrice) + '</span>');
        addCell(tr, '<span class="' + (Number(priceChange) > 0 ? "up" : Number(priceChange) < 0 ? "down" : "reference") + '">' + new Intl.NumberFormat().format(priceChange) + '</span>');
        addCell(tr, '<span class="' + (Number(percentPriceChange) > 0 ? "up" : Number(percentPriceChange) < 0 ? "down" : "reference") + '">' + Number(percentPriceChange).toFixed(2) + "%" + '</span>');
        addCell(tr, new Intl.NumberFormat().format(price));
    }
    table.appendChild(tbody);
    // Now, add the newly created table with json data, to a container.
    divStatisticsShowData.appendChild(table);
}

function setStatisticsTitle() {
    var today = new Date().toLocaleDateString(locale);
    var updateDate = new Date(dataJson.items[0]["today"].toDate).toLocaleDateString(locale);
    var updateDateStr = ` ${dataJson && dataJson.items.length > 0 ? "- Dữ liệu ngày " + updateDate : ""} `;
    if (updateDate === today) {
        divStatisticsTitle.classList.remove("bg-out-of-date");
        divStatisticsTitle.classList.add("bg-latest");
    } else {
        divStatisticsTitle.classList.remove("bg-latest");
        divStatisticsTitle.classList.add("bg-out-of-date");
    }
    divStatisticsTitle.innerHTML = "Thống Kê ".concat(typeDefault === "selfBusiness" ? "Tự Doanh " : "Khối Ngoại ", actionDefault === "netBuy" ? "Mua Ròng" : "Bán Ròng") + updateDateStr;
}