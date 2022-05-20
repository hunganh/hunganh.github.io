window.variablesJS.divStatisticsShowData = document.getElementById('showStatisticsData');
window.variablesJS.divStatisticsTitle = document.getElementById('showStatisticsTitle');

window.statisticsJS = {
    initStatisticsData : function () {
        window.commonJS.showLoading("showStatisticsLoading");
        setTimeout(() => {
            var nodeName = document.getElementById("selfBusinessStatistics").checked === true ? window.variablesJS.TU_DOANH : window.variablesJS.KHOI_NGOAI;
            //var nodeName = window.variablesJS.typeDefault === "selfBusiness" ? window.variablesJS.TU_DOANH : window.variablesJS.KHOI_NGOAI;
            $.ajax({
                url: `${window.apiUrlDefined.STATISTICS_DATA_URL}/${nodeName}`,
                async: false,
                dataType: "json"
            }).done(function (result) {
                if (result) {
                    var dataInput = [];
                    var keys = Object.keys(result);
                    if (keys && keys.length > 0) {
                        keys.forEach(key => {
                            if (key === "olderItem") {
                                variablesJS.olderItem = result[key];
                            } else {
                                dataInput.push(result[key]);
                            }
                        });
                        window.statisticsJS.processDataInput(dataInput);
                    }
                    window.commonJS.hideLoading("showStatisticsLoading");
                }
            });
        }, 100);
    },
    
    processDataInput : function (values) {
        window.variablesJS.divStatisticsShowData.innerHTML = "";
        if (values && values.length > 0) {
            values.forEach((content) => {
                if (!window.variablesJS.dataJson) {
                    window.variablesJS.dataJson = content;
                    window.variablesJS.dataJson.totalCount = values.length;
                } else {
                    window.variablesJS.dataJson.items.push(content.items[0]);
                }
            });
            // Sort data
            window.variablesJS.dataJson.items.sort(function (a, b) {
                var c = new Date(a.today.toDate);
                var d = new Date(b.today.toDate);
                return d - c;
            });
            for (let index = 0; index < window.variablesJS.dataJson.items.length; index++) {
                //window.statisticsJS.createStatisticsReport(window.variablesJS.currentPeriod, window.variablesJS.dataJson.items[index], index);
                for (let i = 0; i < window.variablesJS.actions.length; i++) {
                    window.statisticsJS.createStatisticsReport(window.variablesJS.currentPeriod, window.variablesJS.dataJson.items[index], window.variablesJS.actions[i], index);
                }
            }
            window.statisticsJS.setStatisticsTitle();
        }
        window.commonJS.hideLoading("showStatisticsLoading");
    },
    
    resetStatisticsData : function () {
        window.commonJS.closePopover();
        window.variablesJS.dataJson = null;
        window.variablesJS.mappingDataJson = null;
        window.variablesJS.divStatisticsShowData.innerHTML = "";
        // document.getElementById("fileInput").value = null;
    },
    
    refreshStatisticsData : function () {
        window.statisticsJS.resetStatisticsData();
        window.statisticsJS.initStatisticsData();
    },
    
    readFileAsText : function (file) {
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
    },
    
    changeStatisticsType : function (type) {
        window.statisticsJS.resetStatisticsData();
        window.variablesJS.typeDefault = type;
        window.statisticsJS.initStatisticsData();
    },
    
    changeStatisticsAction : function (action) {
        window.commonJS.closePopover();
        window.commonJS.showLoading("showStatisticsLoading");
        window.variablesJS.actionDefault = action;
        window.statisticsJS.processStatisticsData(variablesJS.currentPeriod);
        window.commonJS.hideLoading("showStatisticsLoading");
    },
    
    processStatisticsData : function (period) {
        window.variablesJS.currentPeriod = period;
        if (window.variablesJS.dataJson && window.variablesJS.dataJson.items && window.variablesJS.dataJson.items.length > 0) {
            window.variablesJS.divStatisticsShowData.innerHTML = "";
            for (let index = 0; index < window.variablesJS.dataJson.items.length; index++) {
                //window.statisticsJS.createStatisticsReport(period, window.variablesJS.dataJson.items[index], index);
                for (let i = 0; i < window.variablesJS.actions.length; i++) {
                    window.statisticsJS.createStatisticsReport(period, window.variablesJS.dataJson.items[index], window.variablesJS.actions[i], index);
                }
            }
        }
        window.statisticsJS.setStatisticsTitle();
    },
    
    createStatisticsReport : function (period, dataJsonInput, action, dataIndex) {
        var data = action === "netBuy" ? dataJsonInput[period].netBuy : dataJsonInput[period].netSell;
        var netTradeValueColumn = window.commonJS.getNetTradeValueColumnByActionValue(action);
        var title = " (" + new Date(dataJsonInput[period].fromDate).toLocaleDateString(window.variablesJS.defaultLocale) + " - " + new Date(dataJsonInput[period].toDate).toLocaleDateString(window.variablesJS.defaultLocale) + ") - " + `Tổng Giá Trị ${action === "netBuy" ? "Mua Ròng: <span class='badge sum-value-area font-weight-bold font-14 dashed-border-bottom'>" : "Bán Ròng: <span class='badge bg-danger font-weight-bold font-14 dashed-border-bottom'>"}` + new Intl.NumberFormat(window.variablesJS.numberLocale).format(dataJsonInput[period][netTradeValueColumn]) + " đ </span>";
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
        for (var i = 0; i < window.variablesJS.statisticsHeadTitle.length; i++) {
            var th = document.createElement("th");      // table header.
            th.innerHTML = window.variablesJS.statisticsHeadTitle[i].indexOf("statistics-popover") > -1 ? window.variablesJS.statisticsHeadTitle[i].replace("statistics-popover", "statistics-popover-" + action) : window.variablesJS.statisticsHeadTitle[i];
            tr.appendChild(th);
        }
        
        var tbody = document.createElement("tbody");
        tbody.setAttribute("id","table-statistics-popover-" + action);
        // add json data to the table as rows.
        for (var i = 0; i < data.length; i++) {
            tr = tbody.insertRow(-1);
            tr.setAttribute("onClick", `window.commonJS.showTickerInfor("${data[i]["ticker"]}")`);
            tr.classList.add("tr-cursor");
            var prvItem = dataIndex === 0 && window.variablesJS.dataJson.items.length > 1 ? window.variablesJS.dataJson.items[dataIndex + 1] : window.variablesJS.olderItem; //window.commonJS.getFirstItemData(dataJsonInput[period].toDate);
            var columnName = window.commonJS.getColumnName();
            var volumeColumnName = window.commonJS.getVolumeColumnName();
            if (!prvItem) {
                window.commonJS.addCell(tr, Number(i + 1));
            } else {
                var prvPosition = action === "netBuy" ? prvItem[period].netBuy.findIndex(x => x.ticker === (data[i][window.variablesJS.statisticsCols[1]])) : prvItem[period].netSell.findIndex(x => x.ticker === (data[i][window.variablesJS.statisticsCols[1]]));
                if (prvPosition > -1) {
                    window.commonJS.addCell(tr, Number(i + 1) + window.commonJS.getPositionIcon(prvPosition, i));
                } else {
                    window.commonJS.addCell(tr, Number(i + 1));
                }
            }
            var priceChange = data[i]["priceChange"];
            var percentPriceChange = data[i]["percentPriceChange"] * 100;
            var price = percentPriceChange > 0 || percentPriceChange < 0 ? (priceChange/data[i]["percentPriceChange"]).toFixed(0) : data[i]["matchPrice"];
            var closePrice = data[i]["matchPrice"];
    
            window.commonJS.addCell(tr, Number(i + 1) <= 10 ? '<b class="top10">' + data[i]["ticker"] + '</b>' : data[i]["ticker"]);
            window.commonJS.addCell(tr, '<div class="text-left">' + window.commonJS.getIcbNameBySymbol(data[i]["ticker"]) + '</div>');
            window.commonJS.addCell(tr, volumeColumnName !== "" ? new Intl.NumberFormat(window.variablesJS.numberLocale).format(data[i][volumeColumnName]) : "&#8722;");
            window.commonJS.addCell(tr, new Intl.NumberFormat(window.variablesJS.numberLocale).format(data[i][columnName]));
            window.commonJS.addCell(tr, '<span class="' + (Number(priceChange) > 0 ? "up" : Number(priceChange) < 0 ? "down" : "reference") + '">' + new Intl.NumberFormat(window.variablesJS.numberLocale).format(closePrice) + '</span>');
            window.commonJS.addCell(tr, '<span class="' + (Number(priceChange) > 0 ? "up" : Number(priceChange) < 0 ? "down" : "reference") + '">' + new Intl.NumberFormat(window.variablesJS.numberLocale).format(priceChange) + ' ('+ Number(percentPriceChange).toFixed(2) + "%" + ')</span>');
            // window.commonJS.addCell(tr, '<span class="' + (Number(percentPriceChange) > 0 ? "up" : Number(percentPriceChange) < 0 ? "down" : "reference") + '">' + Number(percentPriceChange).toFixed(2) + "%" + '</span>');
            window.commonJS.addCell(tr, new Intl.NumberFormat(window.variablesJS.numberLocale).format(price));
        }
        table.appendChild(tbody);
        // Now, add the newly created table with json data, to a container.
        window.variablesJS.divStatisticsShowData.appendChild(table);
    },
    
    setStatisticsTitle : function (action) {
        var today = new Date().toLocaleDateString(window.variablesJS.defaultLocale);
        var updateDate = new Date(window.variablesJS.dataJson.items[0]["today"].toDate).toLocaleDateString(window.variablesJS.defaultLocale);
        var updateDateStr = ` ${window.variablesJS.dataJson && window.variablesJS.dataJson.items.length > 0 ? "- Dữ liệu ngày " + updateDate : ""} `;
        if (updateDate === today) {
            window.variablesJS.divStatisticsTitle.classList.remove("bg-out-of-date");
            window.variablesJS.divStatisticsTitle.classList.add("bg-latest");
        } else {
            window.variablesJS.divStatisticsTitle.classList.remove("bg-latest");
            window.variablesJS.divStatisticsTitle.classList.add("bg-out-of-date");
        }
        window.variablesJS.divStatisticsTitle.innerHTML = "Thống Kê ".concat(window.variablesJS.typeDefault === "selfBusiness" ? "Tự Doanh " : "Khối Ngoại ", "Mua/Bán Ròng") + updateDateStr;
        // Init Industries Filter Popover
        window.commonJS.closePopover();
        for (let i = 0; i < window.variablesJS.actions.length; i++) {
            window.commonJS.initIndustriesSelectionPopover('statistics-popover-' + window.variablesJS.actions[i]);
        }
    }
}

document.addEventListener("DOMContentLoaded", function(e) {
    window.statisticsJS.initStatisticsData();
});

window.addEventListener('load', function () {
    var upload = document.getElementById('fileInput');
    // Make sure the DOM element exists
    if (upload) {
        upload.addEventListener('change', function () {
            // Make sure a file was selected
            if (upload.files.length > 0) {
                window.variablesJS.dataJson = null;
                window.variablesJS.divStatisticsShowData.innerHTML = "";
                window.commonJS.showLoading("showStatisticsLoading");
                let readers = [];
                for (let index = 0; index <= upload.files.length - 1; index++) {
                    readers.push(window.statisticsJS.readFileAsText(upload.files[index]));
                }
                // Trigger Promises
                Promise.all(readers).then((values) => {
                    var data = values.map(x => JSON.parse(x));
                    window.variablesJS.olderItem = null;
                    window.statisticsJS.processDataInput(data);
                });
            }
        }, false);
    }
});