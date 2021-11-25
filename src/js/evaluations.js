window.evaluationsJS = {
    processEvaluationDataInput : function () {
        var symbolValue = $('#symbol-name-evaluation-autocomplete').val();
        if (symbolValue === null || symbolValue === "") {
            $("#showLoadingEvaluation").html(`<span class="font-14 down">Vui lòng mã cổ phiếu cần định giá</span>`);
            return;
        }
        $("#showLoadingEvaluation").html(window.commonJS.getLoadingHTML());
        $("#symbol-evalutions").text(symbolValue);
        setTimeout(() => {
            $.ajax({
                url: `${window.apiUrlDefined.STOCK_EVALUATIONS_URL}/${symbolValue}`,
                method: "GET",
                async: false
            }).done(function (response) {
                if (response) {
                    window.variablesJS.evaluationsData = response;
                    window.evaluationsJS.calculateEvaluation();
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
    },
    
    calculateEvaluation : function () {
        window.evaluationsJS.resetEvaluation();
        window.evaluationsJS.drawBasicEvaluationIndex();
        window.evaluationsJS.drawCashFlowDCF();
        window.evaluationsJS.showEvaluationResult();
        window.commonJS.initTooltips();
        window.evaluationsJS.getDataCompanysecuritiesRecommendation();
    },
    
    resetEvaluation : function () {
        $("#basic-index-evaluation-value").text("N/A");
        $("#dcf-evaluation-value").text("N/A");
        $("#stockEvaluationResult").text("N/A");
        $("#company-securities-table-body").html("");
        $("#avgPriceTargetSecuritiesCompany").text("N/A");
        $("#sellSecuritiesCompany").text("N/A");
        $("#holdSecuritiesCompany").text("N/A");
        $("#buySecuritiesCompany").text("N/A");
    },
    
    showEvaluationResult : function () {
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
            var evaluationValue = (basicEvaluationValue + dcfEvaluationValue)/ window.commonJS.getTotalItems(basicEvaluationValue,dcfEvaluationValue);
            $("#stockEvaluationResult").text(Intl.NumberFormat(window.variablesJS.numberLocale).format(evaluationValue.toFixed(0)));
            $("#showLoadingEvaluation").html("");
        }
    },
    
    drawBasicEvaluationIndex : function () {
        var data = window.variablesJS.evaluationsData;
        var symbolInfo = window.commonJS.getSymbolInfor(data.symbol);
        $("#evaluation-symbol").text(`${symbolInfo.symbol}`);
        $("#evaluation-exchange").text(`${symbolInfo.exchange}`);
        $("#evaluation-industry").text(`${symbolInfo.icbName}`);
        $("#evaluation-pe").text(`${data.pe !== null ? Intl.NumberFormat(window.variablesJS.numberLocale).format(data.pe) : "N/A"}`);
        $("#evaluation-pb").text(`${data.pb !== null ? Intl.NumberFormat(window.variablesJS.numberLocale).format(data.pb) : "N/A"}`);
        $("#evaluation-eps").text(`${data.eps !== null ? Intl.NumberFormat(window.variablesJS.numberLocale).format(data.eps) : "N/A"}`);
        $("#evaluation-bvps").text(`${data.bvps !== null ? Intl.NumberFormat(window.variablesJS.numberLocale).format(data.bvps) : "N/A"}`);
        $("#evaluation-ebitda").text(`${data.ebitda !== null ? Intl.NumberFormat(window.variablesJS.numberLocale).format(data.ebitda) : "N/A"}`);
        var res = "";
        var type = $("input[name='btnEvaluations']:checked").val();
        if (type === "top5") {
            if (data[type] !== null) {
                data[type].forEach(item => {
                    res += `<tr>
                                <td class="text-left"><span class="font-weight-bold">${item.ticker}</span></td>
                                <td class="text-right"><span class="bold-text dashed-border-bottom">${item.pe !== null && item.pe > 0 ? Intl.NumberFormat(window.variablesJS.numberLocale).format(item.pe) : "N/A"}</td>
                                <td class="text-right"><span class="bold-text dashed-border-bottom">${item.pb !== null && item.pb > 0? Intl.NumberFormat(window.variablesJS.numberLocale).format(item.pb) : "N/A"}</td>
                                <td class="text-right"><span class="bold-text dashed-border-bottom">${item.evebitda !== null  && item.evebitda > 0 ? Intl.NumberFormat(window.variablesJS.numberLocale).format(item.evebitda) : "N/A"}</td>
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
                    <td class="text-right"><span class="bold-text dashed-border-bottom text-white">${data.coefficient[type].pe !== null && data.coefficient[type].pe > 0 ? Intl.NumberFormat(window.variablesJS.numberLocale).format(data.coefficient[type].pe.toFixed(0)) : "N/A"}</td>
                    <td class="text-right"><span class="bold-text dashed-border-bottom text-white">${data.coefficient[type].pb !== null && data.coefficient[type].pb  > 0 ? Intl.NumberFormat(window.variablesJS.numberLocale).format(data.coefficient[type].pb.toFixed(0)) : "N/A"}</td>
                    <td class="text-right"><span class="bold-text dashed-border-bottom text-white">${data.coefficient[type].evebitda !== null && data.coefficient[type].evebitda > 0 ? Intl.NumberFormat(window.variablesJS.numberLocale).format(data.coefficient[type].evebitda.toFixed(0)) : "N/A"}</td> 
                </tr>`;
        $("#basic-index-evaluation-value").text(`${data.evaluation[type] !== null && data.evaluation[type] > 0 ? Intl.NumberFormat(window.variablesJS.numberLocale).format(data.evaluation[type].toFixed(0)) : "N/A"}`);
        $("#stock-evaluation-table-body").html(res);
    },
    
    drawCashFlowDCF : function () {
        if (window.variablesJS.evaluationsData && window.variablesJS.evaluationsData.cashFlow && window.variablesJS.evaluationsData.cashFlow.length > 0) {
            var discountFactor = 1/Math.pow((1+window.variablesJS.evaluationsData.wacc), 5); //1/(1+r)^n
            var terminalValue = (window.variablesJS.evaluationsData.cashFlow[window.variablesJS.evaluationsData.cashFlow.length - 1].freeCashFlow * 1000000000 * (1 + window.variablesJS.evaluationsData.growth)/(window.variablesJS.evaluationsData.wacc-window.variablesJS.evaluationsData.growth))*discountFactor; // Terminal Value = CF*(1 + g)/(WACC-g)
            var enterpriseValue = 0; //((window.variablesJS.evaluationsData.cashFlow[0].freeCashFlow / Math.pow(1 + window.variablesJS.evaluationsData.growth, 1)) + (window.variablesJS.evaluationsData.cashFlow[1].freeCashFlow / Math.pow(1 + window.variablesJS.evaluationsData.growth, 2)) + (window.variablesJS.evaluationsData.cashFlow[2].freeCashFlow / Math.pow(1 + window.variablesJS.evaluationsData.growth, 3)) + (window.variablesJS.evaluationsData.cashFlow[3].freeCashFlow / Math.pow(1 + window.variablesJS.evaluationsData.growth, 4)) + (window.variablesJS.evaluationsData.cashFlow[4].freeCashFlow / Math.pow(1 + window.variablesJS.evaluationsData.growth, 5))) + terminalValue; // (CF1/(1+r)^1 + CF2/(1+r)^2 + CF3/(1+r)^3 + CF4/(1+r)^4 + CF5/(1+r)^5) + terminalValue
            for (let index = 0; index < window.variablesJS.evaluationsData.cashFlow.length; index++) {
                enterpriseValue += (window.variablesJS.evaluationsData.cashFlow[index].freeCashFlow*1000000000/Math.pow(1 + window.variablesJS.evaluationsData.growth, index))      
            }
            enterpriseValue += terminalValue;
            var capitalizationValue = enterpriseValue + window.variablesJS.evaluationsData.cash + window.variablesJS.evaluationsData.shortTermDebt + window.variablesJS.evaluationsData.longTermDebt;
            var cashFlowItems = window.variablesJS.evaluationsData.cashFlow;
            var res = `<p class="font-weight-bold" style="margin-bottom: 10px !important;">Với giả định như sau: Tăng trưởng <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" style="background: #0d6efd; border-radius: 50%; cursor: pointer;" class="bi bi-info-circle" viewBox="0 0 16 16" data-bs-toggle="tooltip" data-bs-html="true" data-bs-placement="right" title="" data-bs-original-title="<div class='text-left'><p>Giả định này thể hiện tốc độ tăng trưởng trung bình hàng năm khi doanh nghiệp đã đi vào hoạt động ổn định sau kỳ dự báo (hay còn gọi là [Tỉ lệ tăng trưởng trong vô hạn] hay Terminal Growth Rate). Thông thường trong giai đoạn này, công suất sản xuất đã đạt mức tối đa, tăng trưởng của doanh nghiệp chủ yếu đến từ tăng giá bán. Do đó, giả định này thường có giá trị tương đương với lạm phát (khoảng 3%-5%).</p></div>">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path><path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path></svg> <input type="number" class="percent dcf-variable" value="${window.variablesJS.evaluationsData.growth * 100}" id="evaluation-growth" onchange="window.evaluationsJS.setValueInputGrowthAndWACCVariable('growth', this.value)">% và WACC <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" style="background: #0d6efd; border-radius: 50%; cursor: pointer;" class="bi bi-info-circle" viewBox="0 0 16 16" data-bs-toggle="tooltip" data-bs-html="true" data-bs-placement="right" title="" data-bs-original-title="<div class='text-left'><p>WACC (Weighted Average Cost of Capital) là chi phí sử dụng vốn trung bình của doanh nghiệp, cho biết một doanh nghiệp sẽ phải tốn bao nhiêu chi phí cho mỗi đồng tiền được tài trợ (từ vốn CSH và/hay vay mượn). WACC được tính bằng trung bình của tỷ suất sinh lời cổ phiếu và lãi suất doanh nghiệp đang đi vay.</p></div>">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                    </svg> <input type="number" value="${window.variablesJS.evaluationsData.wacc * 100}" class="percent dcf-variable" id="evaluation-wacc" onchange="window.evaluationsJS.setValueInputGrowthAndWACCVariable('wacc', this.value)">% </p> 
                    <div class="table-responsive">
                        ${window.evaluationsJS.getAssumptionEV(cashFlowItems)}
                    </div>
                    <table style="border: none;">
                    <tr>
                        <td class="text-left pd-evaluation"><span class="font-weight-bold">Giá trị doanh nghiệp EV: </span></td>
                        <td class="text-right pd-evaluation-value"><span class="bold-text dashed-border-bottom">${window.variablesJS.evaluationsData.cashFlow[0].freeCashFlow !== null ? Intl.NumberFormat(window.variablesJS.numberLocale).format(enterpriseValue.toFixed(0)) : "N/A"}</span</td>
                    </tr>
                    <tr>
                        <td class="text-left pd-evaluation"><span class="font-weight-bold">Tiền & tương đương tiền: </span></td>
                        <td class="text-right pd-evaluation-value"><span class="bold-text dashed-border-bottom">${Intl.NumberFormat(window.variablesJS.numberLocale).format(window.variablesJS.evaluationsData.cash)}</span</td>
                    </tr>
                    <tr>
                        <td class="text-left pd-evaluation"><span class="font-weight-bold">Nợ: </span></td>
                        <td class="text-right pd-evaluation-value"><span class="bold-text dashed-border-bottom">${Intl.NumberFormat(window.variablesJS.numberLocale).format(window.variablesJS.evaluationsData.shortTermDebt + window.variablesJS.evaluationsData.longTermDebt)}</span</td>
                    </tr>
                    <tr>
                        <td class="text-left pd-evaluation"><span class="font-weight-bold">Lợi ích CĐ thiểu số: </span></td>
                        <td class="text-right pd-evaluation-value"><span class="bold-text dashed-border-bottom">${Intl.NumberFormat(window.variablesJS.numberLocale).format(window.variablesJS.evaluationsData.minorityInterest)}</span</td>
                    </tr>
                    <tr>
                        <td class="text-left pd-evaluation"><span class="font-weight-bold">Giá trị vốn hóa DN: </span></td>
                        <td class="text-right pd-evaluation-value"><span class="bold-text dashed-border-bottom">${window.variablesJS.evaluationsData.cashFlow[0].freeCashFlow !== null && capitalizationValue > 0 ? Intl.NumberFormat(window.variablesJS.numberLocale).format(capitalizationValue.toFixed(0)) : "N/A"}</span</td>
                    </tr>
                    <tr>
                        <td class="text-left pd-evaluation"><span class="font-weight-bold">SL cổ phiếu lưu hành: </span></td>
                        <td class="text-right pd-evaluation-value"><span class="bold-text dashed-border-bottom">${Intl.NumberFormat(window.variablesJS.numberLocale).format(window.variablesJS.evaluationsData.shareOutstanding)}</span</td>
                    </tr>
                      </table>`;
            $("#dcf-evaluation").html(res);
            $("#dcf-evaluation-value").text(`${capitalizationValue > 0 ? Intl.NumberFormat(window.variablesJS.numberLocale).format((capitalizationValue/window.variablesJS.evaluationsData.shareOutstanding).toFixed(0)) : "N/A"}`);
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
        
    },
    
    getDataCompanysecuritiesRecommendation: function () {
        var res = "";
        if (window.variablesJS.evaluationsData && window.variablesJS.evaluationsData.securities_company && window.variablesJS.evaluationsData.securities_company.length > 0) {
            var index = 1;
            var firms = [...new Set(window.variablesJS.evaluationsData.securities_company.map(item => item.firm))];
            var data = [];
            if (firms && firms.length > 0) {
                firms.forEach(firm => {
                    var item = window.variablesJS.evaluationsData.securities_company.find(x => x.firm === firm);
                    if (item) {
                        data.push(item);
                    }
                });
            }
            else {
                return;
            }
            if (data.length === 0) return;
            data = data.filter(d => 
                {   
                    var time = new Date(d.reportDate).getTime();
                    var sixMonthsAgo = new Date(); 
                    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
                    sixMonthsAgo.setDate(1);
                    return (time >= sixMonthsAgo);
                });
            if (data != null && data.length > 0) {
                data.forEach(item => {
                    res += `<tr>
                                <td class="text-center"><span>${index++}</span></td>
                                <td class="text-center"><span>${new Date(item.reportDate).toLocaleDateString(window.variablesJS.defaultLocale)}</span></td>
                                <td class="text-center"><span class="font-weight-bold">${item.firm}</span></td>
                                <td class="text-center"><span class="${item.type === 'BUY' ? 'up' : item.type === 'SELL' ? 'down' : item.type === 'HOLD' ? 'reference' : item.type === ''} dashed-border-bottom">${item.type === 'BUY' ? 'Mua' : item.type === 'SELL' ? 'Bán' : item.type === 'HOLD' ? 'Giữ' : item.type === 'N/A'}</td>
                                <td class="text-right"><span class="bold-text dashed-border-bottom">${item.reportPrice === 0 || item.reportPrice === undefined ? "N/A" : new Intl.NumberFormat(window.variablesJS.numberLocale).format(item.reportPrice * 1000)}</td>
                                <td class="text-right"><span class="badge bg-primary font-weight-bold font-12 dashed-border-bottom">${item.targetPrice === 0 || item.targetPrice === undefined ? "N/A" : new Intl.NumberFormat(window.variablesJS.numberLocale).format(item.targetPrice * 1000)}</td>
                                <td class="text-left"><span class="bold-text dashed-border-bottom">${item.analyst}</td>
                            </tr>`;
                });
                var lstCompany = [...new Set(data.map(item => item.firm))];
                var sell = 0;
                var hold = 0;
                var buy = 0;
                var sum = 0;
                var total = 0;
                if (lstCompany && lstCompany.length > 0) {
                    data.forEach(item => {
                        if (item) {
                            if (item.type === "BUY") {
                                buy++;
                            }
                            else if (item.type === "HOLD") {
                                hold++;
                            }
                            else if (item.type === "SELL") {
                                sell++;
                            }
                            if (item.targetPrice !== null && item.targetPrice !== "N/A" && item.targetPrice !== undefined && item.targetPrice > 0) {
                                sum += item.targetPrice;
                                total++;
                            }
                        }
                    });
                }
                $("#avgPriceTargetSecuritiesCompany").text(`${sum > 0 ? Intl.NumberFormat(window.variablesJS.numberLocale).format((sum/total * 1000).toFixed(0)) : "N/A"}`);
                $("#sellSecuritiesCompany").text(sell);
                $("#holdSecuritiesCompany").text(hold);
                $("#buySecuritiesCompany").text(buy);
            }
        } else {
            res += "<tr><td colspan='7'>Chưa có dữ liệu</td></tr>";
        }
        $("#company-securities-table-body").html(res);
    },

    getAssumptionEV: function (cashFlow) {
        var times = "";
        var values = "";
        cashFlow.forEach(item => {                          
            times += `<th>${item.year}F</th>`;
            values +=  `<td class="text-center"><span class="bold-text"><input type="number" class="money-flow dcf-variable" value="${item.freeCashFlow != null ? item.freeCashFlow : 0}" onchange="window.evaluationsJS.setValueInputDCFVariable(${item.year},this.value)"></td>`;
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
    },
    
    setValueInputDCFVariable: function (year, value) {
        if (window.variablesJS.evaluationsData && window.variablesJS.evaluationsData.cashFlow !== null) {
            window.variablesJS.evaluationsData.cashFlow.find(x => x.year === year).freeCashFlow = value;
            window.evaluationsJS.calculateEvaluation();
        }
    },
    
    setValueInputGrowthAndWACCVariable : function (property, value) {
        if (window.variablesJS.evaluationsData !== null) {
            window.variablesJS.evaluationsData[property] = value/100;
            window.evaluationsJS.calculateEvaluation();
        }
    }
}

document.addEventListener("DOMContentLoaded", function(e) { 
    window.commonJS.initSymbolAutocomple("symbol-name-evaluation-autocomplete");
    $('input[type=radio][name=btnEvaluations]').change(function() {
        window.evaluationsJS.calculateEvaluation();
    });
    window.commonJS.initTooltips();
});
