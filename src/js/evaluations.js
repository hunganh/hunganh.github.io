var evaluationsData = null;
$(function () { 
    initSymbolAutocomple("symbol-name-evaluation-autocomplete");
    $('input[type=radio][name=btnEvaluations]').change(function() {
        calculateEvaluation();
    });
    initTooltips();
});

function processEvaluationDataInput() {
    var symbolValue = $('#symbol-name-evaluation-autocomplete').val();
    if (symbolValue === null || symbolValue === "") {
        $("#showLoadingEvaluation").html(`<span class="font-14 down">Vui lòng mã cổ phiếu cần định giá</span>`);
        return;
    }
    $("#showLoadingEvaluation").html(getLoadingHTML());
    $("#symbol-evalutions").text(symbolValue);
    setTimeout(() => {
        $.ajax({
            url: `${STOCK_EVALUATIONS_URL}/${symbolValue}`,
            method: "GET",
            async: false
        }).done(function (response) {
            if (response) {
                evaluationsData = response;
                calculateEvaluation();
            }
            if ($("#stockEvaluationResult").text().trim().toLowerCase() === "n/a") {
                $("#showLoadingEvaluation").html(`<span class="font-14 down">Không đủ dữ liệu để định giá cho cổ phiếu</span> <span class="font-weight-bold font-14 dashed-border-bottom">${symbolValue}</span>`);
            } else {
                $("#showLoadingEvaluation").html("");
            }
        }).fail(function (jqXHR, textStatus, error) {
            $("#showLoadingEvaluation").html(`<span class="font-14 down">Không đủ dữ liệu để định giá cho cổ phiếu</span> <span class="font-weight-bold font-14 dashed-border-bottom">${symbolValue}</span>`);
        });
    }, 100);
}

function calculateEvaluation() {
    resetEvaluation();
    drawBasicEvaluationIndex();
    drawCashFlowDCF();
    showEvaluationResult();
    initTooltips();
}

function resetEvaluation() {
    $("#basic-index-evaluation-value").text("N/A");
    $("#dcf-evaluation-value").text("N/A");
    $("#stockEvaluationResult").text("N/A");
}

function showEvaluationResult() {
    var basicEvaluationValue = $("#basic-index-evaluation-value").text();
    var dcfEvaluationValue = $("#dcf-evaluation-value").text();
    if (basicEvaluationValue.toString().trim().toLowerCase() !== "n/a") {
        basicEvaluationValue = Number(basicEvaluationValue.replaceAll(",", ""));
    } else {
        basicEvaluationValue = 0;
    }
    if (dcfEvaluationValue.toString().trim().toLowerCase() !== "n/a") {
        dcfEvaluationValue = Number(dcfEvaluationValue.replaceAll(",", ""));
    } else {
        dcfEvaluationValue = 0;
    }
    if (basicEvaluationValue === 0 && dcfEvaluationValue === 0) {
        $("#stockEvaluationResult").text("N/A");
    } else {
        var evaluationValue = (basicEvaluationValue + dcfEvaluationValue)/ getTotalItems(basicEvaluationValue,dcfEvaluationValue);
        $("#stockEvaluationResult").text(Intl.NumberFormat().format(evaluationValue.toFixed(0)));
        $("#showLoadingEvaluation").html("");
    }
}

function drawBasicEvaluationIndex() {
    var data = evaluationsData;
    var symbolInfo = getSymbolInfor(data.symbol);
    $("#evaluation-symbol").text(`${symbolInfo.symbol}`);
    $("#evaluation-exchange").text(`${symbolInfo.exchange}`);
    $("#evaluation-industry").text(`${symbolInfo.icbName}`);
    $("#evaluation-pe").text(`${data.pe !== null ? Intl.NumberFormat().format(data.pe) : "N/A"}`);
    $("#evaluation-pb").text(`${data.pb !== null ? Intl.NumberFormat().format(data.pb) : "N/A"}`);
    $("#evaluation-eps").text(`${data.eps !== null ? Intl.NumberFormat().format(data.eps) : "N/A"}`);
    $("#evaluation-bvps").text(`${data.bvps !== null ? Intl.NumberFormat().format(data.bvps) : "N/A"}`);
    $("#evaluation-ebitda").text(`${data.ebitda !== null ? Intl.NumberFormat().format(data.ebitda) : "N/A"}`);
    var res = "";
    var type = $("input[name='btnEvaluations']:checked").val();
    if (type === "top5") {
        if (data[type] !== null) {
            data[type].forEach(item => {
                res += `<tr>
                            <td class="text-left"><span class="font-weight-bold">${item.ticker}</span></td>
                            <td class="text-right"><span class="bold-text dashed-border-bottom">${item.pe !== null && item.pe > 0 ? Intl.NumberFormat().format(item.pe) : "N/A"}</td>
                            <td class="text-right"><span class="bold-text dashed-border-bottom">${item.pb !== null && item.pb > 0? Intl.NumberFormat().format(item.pb) : "N/A"}</td>
                            <td class="text-right"><span class="bold-text dashed-border-bottom">${item.evebitda !== null  && item.evebitda > 0 ? Intl.NumberFormat().format(item.evebitda) : "N/A"}</td>
                        </tr>`;
            });
        } else {
            for (let index = 0; index < 5; index++) {
                res += `<tr>
                            <td class="text-left"><span class="font-weight-bold">N/A</span></td>
                            <td class="text-right"><span class="bold-text dashed-border-bottom">N/A</td>
                            <td class="text-right"><span class="bold-text dashed-border-bottom">N/A</td>
                            <td class="text-right"><span class="bold-text dashed-border-bottom">N/A</td>
                        </tr>`;
            }
        }
    } else {
        res += `<tr>
                    <td class="text-left"><span class="font-weight-bold">${type === "index" ? "VN-Index" : type === "industry" ? "Ngành" : type}</span></td>
                    <td class="text-right"><span class="bold-text dashed-border-bottom">${data[type].pe !== null && data[type].pe > 0? data[type].pe : "N/A"}</td>
                    <td class="text-right"><span class="bold-text dashed-border-bottom">${data[type].pb !== null && data[type].pb > 0? data[type].pb : "N/A"}</td>
                    <td class="text-right"><span class="bold-text dashed-border-bottom">${data[type].evebitda !== null && data[type].evebitda > 0 ? data[type].evebitda : "N/A"}</td>
                </tr>`;
    }
    res += `<tr class="avg-value-area">
                <td class="text-left"><span class="font-weight-bold text-white">Hệ số trung bình</span></td>
                <td class="text-right"><span class="bold-text text-white dashed-border-bottom">${data.avg[type].pe !== null && data.avg[type].pe > 0 ? data.avg[type].pe.toFixed(1) : "N/A"}</td>
                <td class="text-right"><span class="bold-text text-white dashed-border-bottom">${data.avg[type].pb !== null && data.avg[type].pb > 0 ? (data.avg[type].pb).toFixed(1) : "N/A"}</td>
                <td class="text-right"><span class="bold-text text-white dashed-border-bottom">${data.avg[type].evebitda !== null && data.avg[type].evebitda > 0 ? data.avg[type].evebitda.toFixed(1) : "N/A"}</td>
            </tr>`;
    res += ` <tr class="sum-value-area">
                <td class="text-left"><span class="font-weight-bold text-white">Giá trị CP theo từng hệ số</span></td>
                <td class="text-right"><span class="bold-text dashed-border-bottom text-white">${data.coefficient[type].pe !== null && data.coefficient[type].pe > 0 ? Intl.NumberFormat().format(data.coefficient[type].pe.toFixed(0)) : "N/A"}</td>
                <td class="text-right"><span class="bold-text dashed-border-bottom text-white">${data.coefficient[type].pb !== null && data.coefficient[type].pb  > 0 ? Intl.NumberFormat().format(data.coefficient[type].pb.toFixed(0)) : "N/A"}</td>
                <td class="text-right"><span class="bold-text dashed-border-bottom text-white">${data.coefficient[type].evebitda !== null && data.coefficient[type].evebitda > 0 ? Intl.NumberFormat().format(data.coefficient[type].evebitda.toFixed(0)) : "N/A"}</td> 
            </tr>`;
    $("#basic-index-evaluation-value").text(`${data.evaluation[type] !== null && data.evaluation[type] > 0 ? Intl.NumberFormat().format(data.evaluation[type].toFixed(0)) : "N/A"}`);
    $("#stock-evaluation-table-body").html(res);
}

function drawCashFlowDCF() {
    if (evaluationsData && evaluationsData.cashFlow && evaluationsData.cashFlow.length > 0) {
        var discountFactor = 1/Math.pow((1+evaluationsData.wacc), 5); //1/(1+r)^n
        var terminalValue = (evaluationsData.cashFlow[evaluationsData.cashFlow.length - 1].freeCashFlow * 1000000000 * (1 + evaluationsData.growth)/(evaluationsData.wacc-evaluationsData.growth))*discountFactor; // Terminal Value = CF*(1 + g)/(WACC-g)
        var enterpriseValue = 0; //((evaluationsData.cashFlow[0].freeCashFlow / Math.pow(1 + evaluationsData.growth, 1)) + (evaluationsData.cashFlow[1].freeCashFlow / Math.pow(1 + evaluationsData.growth, 2)) + (evaluationsData.cashFlow[2].freeCashFlow / Math.pow(1 + evaluationsData.growth, 3)) + (evaluationsData.cashFlow[3].freeCashFlow / Math.pow(1 + evaluationsData.growth, 4)) + (evaluationsData.cashFlow[4].freeCashFlow / Math.pow(1 + evaluationsData.growth, 5))) + terminalValue; // (CF1/(1+r)^1 + CF2/(1+r)^2 + CF3/(1+r)^3 + CF4/(1+r)^4 + CF5/(1+r)^5) + terminalValue
        for (let index = 0; index < evaluationsData.cashFlow.length; index++) {
            enterpriseValue += (evaluationsData.cashFlow[index].freeCashFlow*1000000000/Math.pow(1 + evaluationsData.growth, index))      
        }
        enterpriseValue += terminalValue;
        var capitalizationValue = enterpriseValue + evaluationsData.cash + evaluationsData.shortTermDebt + evaluationsData.longTermDebt;
        var cashFlowItems = evaluationsData.cashFlow;
        var res = `<p class="font-weight-bold" style="margin-bottom: 10px !important;">Với giả định như sau: Tăng trưởng <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" style="background: #0d6efd; border-radius: 50%; cursor: pointer;" class="bi bi-info-circle" viewBox="0 0 16 16" data-bs-toggle="tooltip" data-bs-html="true" data-bs-placement="right" title="" data-bs-original-title="<div class='text-left'><p>Giả định này thể hiện tốc độ tăng trưởng trung bình hàng năm khi doanh nghiệp đã đi vào hoạt động ổn định sau kỳ dự báo (hay còn gọi là [Tỉ lệ tăng trưởng trong vô hạn] hay Terminal Growth Rate). Thông thường trong giai đoạn này, công suất sản xuất đã đạt mức tối đa, tăng trưởng của doanh nghiệp chủ yếu đến từ tăng giá bán. Do đó, giả định này thường có giá trị tương đương với lạm phát (khoảng 3%-5%).</p></div>">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path><path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path></svg> <input type="number" class="percent dcf-variable" value="${evaluationsData.growth * 100}" id="evaluation-growth" onchange="setValueInputGrowthAndWACCVariable('growth', this.value)">% và WACC <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" style="background: #0d6efd; border-radius: 50%; cursor: pointer;" class="bi bi-info-circle" viewBox="0 0 16 16" data-bs-toggle="tooltip" data-bs-html="true" data-bs-placement="right" title="" data-bs-original-title="<div class='text-left'><p>WACC (Weighted Average Cost of Capital) là chi phí sử dụng vốn trung bình của doanh nghiệp, cho biết một doanh nghiệp sẽ phải tốn bao nhiêu chi phí cho mỗi đồng tiền được tài trợ (từ vốn CSH và/hay vay mượn). WACC được tính bằng trung bình của tỷ suất sinh lời cổ phiếu và lãi suất doanh nghiệp đang đi vay.</p></div>">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                </svg> <input type="number" value="${evaluationsData.wacc * 100}" class="percent dcf-variable" id="evaluation-wacc" onchange="setValueInputGrowthAndWACCVariable('wacc', this.value)">% </p> 
                <div class="table-responsive">
                    ${getAssumptionEV(cashFlowItems)}
                </div>
                <table style="border: none;">
                <tr>
                    <td class="text-left pd-evaluation"><span class="font-weight-bold">Giá trị doanh nghiệp EV: </span></td>
                    <td class="text-right pd-evaluation-value"><span class="bold-text dashed-border-bottom">${evaluationsData.cashFlow[0].freeCashFlow !== null ? Intl.NumberFormat().format(enterpriseValue.toFixed(0)) : "N/A"}</span</td>
                </tr>
                <tr>
                    <td class="text-left pd-evaluation"><span class="font-weight-bold">Tiền & tương đương tiền: </span></td>
                    <td class="text-right pd-evaluation-value"><span class="bold-text dashed-border-bottom">${Intl.NumberFormat().format(evaluationsData.cash)}</span</td>
                </tr>
                <tr>
                    <td class="text-left pd-evaluation"><span class="font-weight-bold">Nợ: </span></td>
                    <td class="text-right pd-evaluation-value"><span class="bold-text dashed-border-bottom">${Intl.NumberFormat().format(evaluationsData.shortTermDebt + evaluationsData.longTermDebt)}</span</td>
                </tr>
                <tr>
                    <td class="text-left pd-evaluation"><span class="font-weight-bold">Lợi ích CĐ thiểu số: </span></td>
                    <td class="text-right pd-evaluation-value"><span class="bold-text dashed-border-bottom">${Intl.NumberFormat().format(evaluationsData.minorityInterest)}</span</td>
                </tr>
                <tr>
                    <td class="text-left pd-evaluation"><span class="font-weight-bold">Giá trị vốn hóa DN: </span></td>
                    <td class="text-right pd-evaluation-value"><span class="bold-text dashed-border-bottom">${evaluationsData.cashFlow[0].freeCashFlow !== null && capitalizationValue > 0 ? Intl.NumberFormat().format(capitalizationValue.toFixed(0)) : "N/A"}</span</td>
                </tr>
                <tr>
                    <td class="text-left pd-evaluation"><span class="font-weight-bold">SL cổ phiếu lưu hành: </span></td>
                    <td class="text-right pd-evaluation-value"><span class="bold-text dashed-border-bottom">${Intl.NumberFormat().format(evaluationsData.shareOutstanding)}</span</td>
                </tr>
                  </table>`;
        $("#dcf-evaluation").html(res);
        $("#dcf-evaluation-value").text(`${capitalizationValue > 0 ? Intl.NumberFormat().format((capitalizationValue/evaluationsData.shareOutstanding).toFixed(0)) : "N/A"}`);
    } else {
        $("#dcf-evaluation").html(`<p class="font-weight-bold" style="margin-bottom: 10px !important;">Với giả định như sau: Tăng trưởng <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" style="background: #0d6efd; border-radius: 50%; cursor: pointer;" class="bi bi-info-circle" viewBox="0 0 16 16" data-bs-toggle="tooltip" data-bs-html="true" data-bs-placement="right" title="" data-bs-original-title="<div class='text-left'><p>Giả định này thể hiện tốc độ tăng trưởng trung bình hàng năm khi doanh nghiệp đã đi vào hoạt động ổn định sau kỳ dự báo (hay còn gọi là [Tỉ lệ tăng trưởng trong vô hạn] hay Terminal Growth Rate). Thông thường trong giai đoạn này, công suất sản xuất đã đạt mức tối đa, tăng trưởng của doanh nghiệp chủ yếu đến từ tăng giá bán. Do đó, giả định này thường có giá trị tương đương với lạm phát (khoảng 3%-5%).</p></div>">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path><path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path></svg> <input type="number" class="percent" value="">% và WACC <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" style="background: #0d6efd; border-radius: 50%; cursor: pointer;" class="bi bi-info-circle" viewBox="0 0 16 16" data-bs-toggle="tooltip" data-bs-html="true" data-bs-placement="right" title="" data-bs-original-title="<div class='text-left'><p>WACC (Weighted Average Cost of Capital) là chi phí sử dụng vốn trung bình của doanh nghiệp, cho biết một doanh nghiệp sẽ phải tốn bao nhiêu chi phí cho mỗi đồng tiền được tài trợ (từ vốn CSH và/hay vay mượn). WACC được tính bằng trung bình của tỷ suất sinh lời cổ phiếu và lãi suất doanh nghiệp đang đi vay.</p></div>">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
        </svg> <input type="number" value="" class="percent">% </p> 
                    <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead class="table-light" style="word-wrap: break-word !important;">
                            <tr>
                                <th>Năm</th>
                                <th>N/A</th>
                                <th>N/A</th>
                                <th>N/A</th>
                                <th>N/A</th>
                                <th>N/A</th>
                            </tr>
                        </thead>
                        <tbody id="stock-evaluation-table-body" class="price-table-content ui-sortable">
                            <tr>
                                <td class="text-left"><span class="font-weight-bold">Dòng tiền (tỷ)</span></td>
                                <td class="text-center"><span class="bold-text"><input type="number" class="money-flow" value=""></td>
                                <td class="text-center"><span class="bold-text"><input type="number" class="money-flow" value=""></td>
                                <td class="text-center"><span class="bold-text"><input type="number" class="money-flow" value=""></td>
                                <td class="text-center"><span class="bold-text"><input type="number" class="money-flow" value=""></td>
                                <td class="text-center"><span class="bold-text"><input type="number" class="money-flow" value=""></td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    <table style="border: none;">
                    <tr>
                        <td class="text-left pd-evaluation"><span class="font-weight-bold">Giá trị doanh nghiệp EV (tỷ): </span></td>
                        <td class="text-right pd-evaluation-value"><span class="bold-text dashed-border-bottom">N/A</span</td>
                    </tr>
                    <tr>
                        <td class="text-left pd-evaluation"><span class="font-weight-bold">Tiền & tương đương tiền (tỷ): </span></td>
                        <td class="text-right pd-evaluation-value"><span class="bold-text dashed-border-bottom">N/A</span</td>
                    </tr>
                    <tr>
                        <td class="text-left pd-evaluation"><span class="font-weight-bold">Nợ (tỷ): </span></td>
                        <td class="text-right pd-evaluation-value"><span class="bold-text dashed-border-bottom">N/A</span</td>
                    </tr>
                    <tr>
                        <td class="text-left pd-evaluation"><span class="font-weight-bold">Lợi ích CĐ thiểu số (tỷ): </span></td>
                        <td class="text-right pd-evaluation-value"><span class="bold-text dashed-border-bottom">N/A</span</td>
                    </tr>
                    <tr>
                        <td class="text-left pd-evaluation"><span class="font-weight-bold">Giá trị vốn hóa DN (tỷ): </span></td>
                        <td class="text-right pd-evaluation-value"><span class="bold-text dashed-border-bottom">N/A</span</td>
                    </tr>
                    <tr>
                        <td class="text-left pd-evaluation"><span class="font-weight-bold">SL cổ phiếu lưu hành (triệu): </span></td>
                        <td class="text-right pd-evaluation-value"><span class="bold-text dashed-border-bottom">N/A</span</td>
                    </tr>
        </table>`);
    }
    
}

function getAssumptionEV(cashFlow) {
    var times = "";
    var values = "";
    cashFlow.forEach(item => {                          
        times += `<th>${item.year}F</th>`;
        values +=  `<td class="text-center"><span class="bold-text"><input type="number" class="money-flow dcf-variable" value="${item.freeCashFlow != null ? item.freeCashFlow : 0}" onchange="setValueInputDCFVariable(${item.year},this.value)"></td>`;
    })
    return `<table class="table table-bordered">
                <thead class="table-light" style="word-wrap: break-word !important;">
                    <tr>
                        <th>Năm</th>
                        ${times}
                    </tr>
                </thead>
                <tbody id="stock-evaluation-table-body" class="price-table-content ui-sortable">
                    <tr>
                        <td class="text-left"><span class="font-weight-bold">Dòng tiền (tỷ)</span></td>
                        ${values}
                    </tr>
                </tbody>
            </table>`;
}

function setValueInputDCFVariable(year, value) {
    if (evaluationsData && evaluationsData.cashFlow !== null) {
        evaluationsData.cashFlow.find(x => x.year === year).freeCashFlow = value;
        calculateEvaluation();
    }
}

function setValueInputGrowthAndWACCVariable(property, value) {
    if (evaluationsData !== null) {
        evaluationsData[property] = value/100;
        calculateEvaluation();
    }
}