window.variablesJS.divSummaryShowData = document.getElementById('showSummaryData');
window.variablesJS.divSummaryTitle = document.getElementById('showSummaryTitle');

window.summaryJS = {
    resetDataSummary : function () {
        window.variablesJS.summaryDataJson = null;
        window.variablesJS.divSummaryShowData.innerHTML = "";
    },
    
    refreshSummaryData : function () {
        window.summaryJS.resetDataSummary();
        window.summaryJS.initSummaryData();
    },
    
    initSummaryData : function () {
        window.summaryJS.resetDataSummary();
        window.commonJS.showLoading("showSummaryLoading");
        Promise.all([
            window.commonJS.fetchContentByUrl(window.apiUrlDefined.SYNTHESIS_DATA_URL)
        ]).then((values) => {
            if (values && values.length > 0) {
                window.summaryJS.setSummaryDataGlobal(values);
            }
            window.commonJS.hideLoading("showSummaryLoading");
        }).then(() => {
            //console.log('Done fetching content via JavaScript');
        }).catch((err) => {
            console.error(err);
        });
    },
    
    setSummaryDataGlobal : function (values) {
        window.summaryJS.resetDataSummary();
        if (values && values.length > 0) {
            window.variablesJS.summaryDataJson = values[0];
            window.summaryJS.processSummaryDataInput();
        }
    },
    
    processSummaryDataInput : function () {
        var data = [];
        var selfBusinessData = window.variablesJS.summaryDataJson.selfBusiness[variablesJS.currentSummaryPeriod][variablesJS.actionSummaryDefault];
        var foreignData = window.variablesJS.summaryDataJson.foreign[variablesJS.currentSummaryPeriod][variablesJS.actionSummaryDefault];
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
        window.summaryJS.createSummaryReport(data);
        window.summaryJS.setSummaryTitle();
        window.commonJS.hideLoading("showSummaryLoading");
    },
    
    createSummaryReport : function (data) {
        var title = "Thống Kê Từ " + new Date(window.variablesJS.summaryDataJson["foreign"][variablesJS.currentSummaryPeriod].fromDate).toLocaleDateString(window.variablesJS.defaultLocale) + " - " + new Date(window.variablesJS.summaryDataJson["foreign"][variablesJS.currentSummaryPeriod].toDate).toLocaleDateString(window.variablesJS.defaultLocale);
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
        for (var i = 0; i < variablesJS.summaryHeadTitle.length; i++) {
            var th = document.createElement("th");      // table header.
            if (i == variablesJS.summaryHeadTitle.length - 2) {
                th.setAttribute("colspan", 2);
            } else {
                th.setAttribute("rowspan", 2);
            }
            th.innerHTML = variablesJS.summaryHeadTitle[i];
            tr.appendChild(th);
        }
    
        // create span column
        tr = thead.insertRow(-1);
        for (var k = 0; k < variablesJS.subSummaryHeadTitle.length; k++) {
            var th = document.createElement("th");
            th.innerHTML = variablesJS.subSummaryHeadTitle[k];
            tr.appendChild(th);
        }
    
        var tbody = document.createElement("tbody");
        tbody.setAttribute("id","table-summary-popover");
        if (data.length > 0) {
            // add json data to the table as rows.
            for (var i = 0; i < data.length; i++) {
                tr = tbody.insertRow(-1);
                tr.setAttribute("onClick", `window.commonJS.showTickerInfor("${data[i]["ticker"]}")`);
                tr.classList.add("tr-cursor");
                //var selfBusinessClosePrice = data[i]["selfBusinessMatchPrice"];
                //var selfBusinessPriceChange = data[i]["selfBusinessPriceChange"];
                //var selfBusinessPercentChange = data[i]["selfBusinessPercentPriceChange"] * 100;
                //var selfBusinessPrice = selfBusinessPercentChange > 0 || selfBusinessPercentChange < 0 ? (selfBusinessPriceChange/data[i]["selfBusinessPercentPriceChange"]) : data[i]["selfBusinessMatchPrice"];
                var foreignClosePrice = data[i]["foreignMatchPrice"];
                var foreignPriceChange = data[i]["foreignPriceChange"];
                var foreignPercentChange = data[i]["foreignPercentPriceChange"] * 100;
                var foreignPrice = foreignPercentChange > 0 || foreignPercentChange < 0 ? (foreignPriceChange/data[i]["foreignPercentPriceChange"]) : data[i]["foreignMatchPrice"];
                //var avgPrice = (selfBusinessPrice + foreignPriceChange)/2;
                window.commonJS.addCell(tr, Number(i + 1));
                window.commonJS.addCell(tr, `<b class="top10">${data[i]["ticker"]}</span>`);
                window.commonJS.addCell(tr, '<div class="text-left">' + window.commonJS.getIcbNameBySymbol(data[i]["ticker"]) + '</div>');
                // window.commonJS.addCell(tr, `<span class='text-right'>${new Intl.NumberFormat(window.variablesJS.numberLocale).format(data[i]["totalNetBuyTradeValue"])}</span>`);
                // window.commonJS.addCell(tr, `<span class='${window.commonJS.getClassByValue(selfBusinessPriceChange)}'>${new Intl.NumberFormat(window.variablesJS.numberLocale).format(selfBusinessClosePrice)}</span>`);
                // window.commonJS.addCell(tr, `<span class='${window.commonJS.getClassByValue(selfBusinessPriceChange)}'>${new Intl.NumberFormat(window.variablesJS.numberLocale).format(selfBusinessPriceChange)}</span>`);
                // window.commonJS.addCell(tr, `<span class='${window.commonJS.getClassByValue(selfBusinessPercentChange)}'>${selfBusinessPercentChange.toFixed(2)}%</span>`);
                
                window.commonJS.addCell(tr, `<span class='${window.commonJS.getClassByValue(foreignPriceChange)}'>${new Intl.NumberFormat(window.variablesJS.numberLocale).format(foreignClosePrice)}</span>`);
                window.commonJS.addCell(tr, `<span class='${window.commonJS.getClassByValue(foreignPriceChange)}'>${new Intl.NumberFormat(window.variablesJS.numberLocale).format(foreignPriceChange)}</span>`);
                window.commonJS.addCell(tr, `<span class='${window.commonJS.getClassByValue(foreignPercentChange)}'>${foreignPercentChange.toFixed(2)}%</span>`);
                window.commonJS.addCell(tr, new Intl.NumberFormat(window.variablesJS.numberLocale).format(foreignPrice.toFixed(0)));
                window.commonJS.addCell(tr, `<span class='text-right'>${new Intl.NumberFormat(window.variablesJS.numberLocale).format(data[i]["totalNetBuyTradeValue"])}</span>`);
                window.commonJS.addCell(tr, `<span class='text-right'>${new Intl.NumberFormat(window.variablesJS.numberLocale).format(data[i]["foreignNetBuyValue"])}</span>`);
                window.commonJS.addCell(tr, `<span class='bold text-right top10'>${new Intl.NumberFormat(window.variablesJS.numberLocale).format(data[i]["sumValue"])}</span>`);
            }
        } else {
            tr = tbody.insertRow(-1);
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = "Không có dữ liệu.";
            cell.colSpan = 10;
        }
    
        table.appendChild(tbody);
        // Now, add the newly created table with json data, to a container.
        window.variablesJS.divSummaryShowData.appendChild(table);
    },
    
    changePeriodAction : function (period) {
        variablesJS.currentSummaryPeriod = period;
        if (window.variablesJS.summaryDataJson !== null) {
            window.variablesJS.divSummaryShowData.innerHTML = "";
            window.commonJS.showLoading("showSummaryLoading");
            window.summaryJS.processSummaryDataInput();
        } else {
            window.summaryJS.initSummaryData();
        }
    },
    
    changeSummaryAction : function (action) {
        variablesJS.actionSummaryDefault = action;
        if (window.variablesJS.summaryDataJson !== null) {
            window.variablesJS.divSummaryShowData.innerHTML = "";
            window.commonJS.showLoading("showSummaryLoading");
            window.summaryJS.processSummaryDataInput();
        } else {
            window.summaryJS.initSummaryData();
        }
    },
    
    setSummaryTitle : function () {
        var today = new Date().toLocaleDateString(window.variablesJS.defaultLocale);
        var updateDate = new Date(window.variablesJS.summaryDataJson["foreign"][variablesJS.currentSummaryPeriod].toDate).toLocaleDateString(window.variablesJS.defaultLocale);
        var updateDateStr = ` ${window.variablesJS.dataJson && window.variablesJS.dataJson.items.length > 0 ? "- Dữ liệu ngày " + updateDate : ""} `;
        if (updateDate === today) {
            window.variablesJS.divSummaryTitle.classList.remove("bg-out-of-date");
            window.variablesJS.divSummaryTitle.classList.add("bg-latest");
        } else {
            window.variablesJS.divSummaryTitle.classList.remove("bg-latest");
            window.variablesJS.divSummaryTitle.classList.add("bg-out-of-date");
        }
        window.variablesJS.divSummaryTitle.innerHTML = `Mã CP Được Tự Doanh & Khối Ngoại ${variablesJS.actionSummaryDefault === "netBuy" ? "Mua Ròng" : "Bán Ròng"}${updateDateStr}`;
        // Init Industries Filter Popover
        window.commonJS.closePopover();
        window.commonJS.initIndustriesSelectionPopover('summary-popover');
    }
}

document.addEventListener("DOMContentLoaded", function(e) {
    window.summaryJS.initSummaryData();
});
