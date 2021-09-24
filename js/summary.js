var divSummaryShowData = document.getElementById('showSummaryData');
var divSummaryTitle = document.getElementById('showSummaryTitle');

function resetDataSummary() {
    divSummaryShowData.innerHTML = "";
}

function refreshDataSummary() {
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
                    processSummaryDataInput(values);
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

function processSummaryDataInput(values) {
    resetDataSummary();
    if (values && values.length > 0) {
        var jsonObject = { tudoanh: values[0] ? JSON.parse(values[0]).items[0] : null, khoingoai: values[1] ? JSON.parse(values[1]).items[0] : null };
        createSummaryReport(jsonObject);
        setSummaryTitle();
    }
    hideLoading("showSummaryLoading");
}

function createSummaryReport(data) {

}

function setSummaryTitle() {

}