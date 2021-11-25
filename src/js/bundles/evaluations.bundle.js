window.evaluationsJS={processEvaluationDataInput:function(){var t=$("#symbol-name-evaluation-autocomplete").val();null!==t&&""!==t?($("#showLoadingEvaluation").html(window.commonJS.getLoadingHTML()),$("#symbol-evalutions").text(t),setTimeout((()=>{$.ajax({url:`${window.apiUrlDefined.STOCK_EVALUATIONS_URL}/${t}`,method:"GET",async:!1}).done((function(a){a&&(window.variablesJS.evaluationsData=a,window.evaluationsJS.calculateEvaluation()),"n/a"===$("#stockEvaluationResult").text().trim().toLowerCase()?$("#showLoadingEvaluation").html(`<span class="font-14 down">Không đủ dữ liệu để định giá cho cổ phiếu</span> <span class="font-weight-bold font-14 dashed-border-bottom">${t}</span>`):$("#showLoadingEvaluation").html("")})).fail((function(a,e,n){$("#showLoadingEvaluation").html(`<span class="font-14 down">Không đủ dữ liệu để định giá cho cổ phiếu</span> <span class="font-weight-bold font-14 dashed-border-bottom">${t}</span>`)}))}),100)):$("#showLoadingEvaluation").html('<span class="font-14 down">Vui lòng mã cổ phiếu cần định giá</span>')},calculateEvaluation:function(){window.evaluationsJS.resetEvaluation(),window.evaluationsJS.drawBasicEvaluationIndex(),window.evaluationsJS.drawCashFlowDCF(),window.evaluationsJS.showEvaluationResult(),window.commonJS.initTooltips(),window.evaluationsJS.getDataCompanysecuritiesRecommendation()},resetEvaluation:function(){$("#basic-index-evaluation-value").text("N/A"),$("#dcf-evaluation-value").text("N/A"),$("#stockEvaluationResult").text("N/A"),$("#company-securities-table-body").html(""),$("#avgPriceTargetSecuritiesCompany").text("N/A"),$("#sellSecuritiesCompany").text("N/A"),$("#holdSecuritiesCompany").text("N/A"),$("#buySecuritiesCompany").text("N/A")},showEvaluationResult:function(){var t=$("#basic-index-evaluation-value").text(),a=$("#dcf-evaluation-value").text();if(t="n/a"!==t.toString().trim().toLowerCase()?Number(t.replaceAll(",","")):0,a="n/a"!==a.toString().trim().toLowerCase()?Number(a.replaceAll(",","")):0,0===t&&0===a)$("#stockEvaluationResult").text("N/A");else{var e=(t+a)/window.commonJS.getTotalItems(t,a);$("#stockEvaluationResult").text(Intl.NumberFormat(window.variablesJS.numberLocale).format(e.toFixed(0))),$("#showLoadingEvaluation").html("")}},drawBasicEvaluationIndex:function(){var t=window.variablesJS.evaluationsData,a=window.commonJS.getSymbolInfor(t.symbol);$("#evaluation-symbol").text(`${a.symbol}`),$("#evaluation-exchange").text(`${a.exchange}`),$("#evaluation-industry").text(`${a.icbName}`),$("#evaluation-pe").text(`${null!==t.pe?Intl.NumberFormat(window.variablesJS.numberLocale).format(t.pe):"N/A"}`),$("#evaluation-pb").text(`${null!==t.pb?Intl.NumberFormat(window.variablesJS.numberLocale).format(t.pb):"N/A"}`),$("#evaluation-eps").text(`${null!==t.eps?Intl.NumberFormat(window.variablesJS.numberLocale).format(t.eps):"N/A"}`),$("#evaluation-bvps").text(`${null!==t.bvps?Intl.NumberFormat(window.variablesJS.numberLocale).format(t.bvps):"N/A"}`),$("#evaluation-ebitda").text(`${null!==t.ebitda?Intl.NumberFormat(window.variablesJS.numberLocale).format(t.ebitda):"N/A"}`);var e="",n=$("input[name='btnEvaluations']:checked").val();if("top5"===n)if(null!==t[n])t[n].forEach((t=>{e+=`<tr>\n                                <td class="text-left"><span class="font-weight-bold">${t.ticker}</span></td>\n                                <td class="text-right"><span class="bold-text dashed-border-bottom">${null!==t.pe&&t.pe>0?Intl.NumberFormat(window.variablesJS.numberLocale).format(t.pe):"N/A"}</td>\n                                <td class="text-right"><span class="bold-text dashed-border-bottom">${null!==t.pb&&t.pb>0?Intl.NumberFormat(window.variablesJS.numberLocale).format(t.pb):"N/A"}</td>\n                                <td class="text-right"><span class="bold-text dashed-border-bottom">${null!==t.evebitda&&t.evebitda>0?Intl.NumberFormat(window.variablesJS.numberLocale).format(t.evebitda):"N/A"}</td>\n                            </tr>`}));else for(let t=0;t<5;t++)e+='<tr>\n                                <td class="text-left"><span class="font-weight-bold">N/A</span></td>\n                                <td class="text-right"><span class="bold-text dashed-border-bottom">N/A</td>\n                                <td class="text-right"><span class="bold-text dashed-border-bottom">N/A</td>\n                                <td class="text-right"><span class="bold-text dashed-border-bottom">N/A</td>\n                            </tr>';else e+=`<tr>\n                        <td class="text-left"><span class="font-weight-bold">${"index"===n?"VN-Index":"industry"===n?"Ngành":n}</span></td>\n                        <td class="text-right"><span class="bold-text dashed-border-bottom">${null!==t[n].pe&&t[n].pe>0?t[n].pe:"N/A"}</td>\n                        <td class="text-right"><span class="bold-text dashed-border-bottom">${null!==t[n].pb&&t[n].pb>0?t[n].pb:"N/A"}</td>\n                        <td class="text-right"><span class="bold-text dashed-border-bottom">${null!==t[n].evebitda&&t[n].evebitda>0?t[n].evebitda:"N/A"}</td>\n                    </tr>`;e+=`<tr class="avg-value-area">\n                    <td class="text-left"><span class="font-weight-bold text-white">Hệ số trung bình</span></td>\n                    <td class="text-right"><span class="bold-text text-white dashed-border-bottom">${null!==t.avg[n].pe&&t.avg[n].pe>0?t.avg[n].pe.toFixed(1):"N/A"}</td>\n                    <td class="text-right"><span class="bold-text text-white dashed-border-bottom">${null!==t.avg[n].pb&&t.avg[n].pb>0?t.avg[n].pb.toFixed(1):"N/A"}</td>\n                    <td class="text-right"><span class="bold-text text-white dashed-border-bottom">${null!==t.avg[n].evebitda&&t.avg[n].evebitda>0?t.avg[n].evebitda.toFixed(1):"N/A"}</td>\n                </tr>`,e+=` <tr class="sum-value-area">\n                    <td class="text-left"><span class="font-weight-bold text-white">Giá trị CP theo từng hệ số</span></td>\n                    <td class="text-right"><span class="bold-text dashed-border-bottom text-white">${null!==t.coefficient[n].pe&&t.coefficient[n].pe>0?Intl.NumberFormat(window.variablesJS.numberLocale).format(t.coefficient[n].pe.toFixed(0)):"N/A"}</td>\n                    <td class="text-right"><span class="bold-text dashed-border-bottom text-white">${null!==t.coefficient[n].pb&&t.coefficient[n].pb>0?Intl.NumberFormat(window.variablesJS.numberLocale).format(t.coefficient[n].pb.toFixed(0)):"N/A"}</td>\n                    <td class="text-right"><span class="bold-text dashed-border-bottom text-white">${null!==t.coefficient[n].evebitda&&t.coefficient[n].evebitda>0?Intl.NumberFormat(window.variablesJS.numberLocale).format(t.coefficient[n].evebitda.toFixed(0)):"N/A"}</td> \n                </tr>`,$("#basic-index-evaluation-value").text(`${null!==t.evaluation[n]&&t.evaluation[n]>0?Intl.NumberFormat(window.variablesJS.numberLocale).format(t.evaluation[n].toFixed(0)):"N/A"}`),$("#stock-evaluation-table-body").html(e)},drawCashFlowDCF:function(){if(window.variablesJS.evaluationsData&&window.variablesJS.evaluationsData.cashFlow&&window.variablesJS.evaluationsData.cashFlow.length>0){var t=1/Math.pow(1+window.variablesJS.evaluationsData.wacc,5),a=1e9*window.variablesJS.evaluationsData.cashFlow[window.variablesJS.evaluationsData.cashFlow.length-1].freeCashFlow*(1+window.variablesJS.evaluationsData.growth)/(window.variablesJS.evaluationsData.wacc-window.variablesJS.evaluationsData.growth)*t,e=0;for(let t=0;t<window.variablesJS.evaluationsData.cashFlow.length;t++)e+=1e9*window.variablesJS.evaluationsData.cashFlow[t].freeCashFlow/Math.pow(1+window.variablesJS.evaluationsData.growth,t);var n=(e+=a)+window.variablesJS.evaluationsData.cash+window.variablesJS.evaluationsData.shortTermDebt+window.variablesJS.evaluationsData.longTermDebt,o=window.variablesJS.evaluationsData.cashFlow,l=`<p class="font-weight-bold" style="margin-bottom: 10px !important;">Với giả định như sau: Tăng trưởng <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" style="background: #0d6efd; border-radius: 50%; cursor: pointer;" class="bi bi-info-circle" viewBox="0 0 16 16" data-bs-toggle="tooltip" data-bs-html="true" data-bs-placement="right" title="" data-bs-original-title="<div class='text-left'><p>Giả định này thể hiện tốc độ tăng trưởng trung bình hàng năm khi doanh nghiệp đã đi vào hoạt động ổn định sau kỳ dự báo (hay còn gọi là [Tỉ lệ tăng trưởng trong vô hạn] hay Terminal Growth Rate). Thông thường trong giai đoạn này, công suất sản xuất đã đạt mức tối đa, tăng trưởng của doanh nghiệp chủ yếu đến từ tăng giá bán. Do đó, giả định này thường có giá trị tương đương với lạm phát (khoảng 3%-5%).</p></div>">\n                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path><path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path></svg> <input type="number" class="percent dcf-variable" value="${100*window.variablesJS.evaluationsData.growth}" id="evaluation-growth" onchange="window.evaluationsJS.setValueInputGrowthAndWACCVariable('growth', this.value)">% và WACC <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" style="background: #0d6efd; border-radius: 50%; cursor: pointer;" class="bi bi-info-circle" viewBox="0 0 16 16" data-bs-toggle="tooltip" data-bs-html="true" data-bs-placement="right" title="" data-bs-original-title="<div class='text-left'><p>WACC (Weighted Average Cost of Capital) là chi phí sử dụng vốn trung bình của doanh nghiệp, cho biết một doanh nghiệp sẽ phải tốn bao nhiêu chi phí cho mỗi đồng tiền được tài trợ (từ vốn CSH và/hay vay mượn). WACC được tính bằng trung bình của tỷ suất sinh lời cổ phiếu và lãi suất doanh nghiệp đang đi vay.</p></div>">\n                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>\n                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>\n                    </svg> <input type="number" value="${100*window.variablesJS.evaluationsData.wacc}" class="percent dcf-variable" id="evaluation-wacc" onchange="window.evaluationsJS.setValueInputGrowthAndWACCVariable('wacc', this.value)">% </p> \n                    <div class="table-responsive">\n                        ${window.evaluationsJS.getAssumptionEV(o)}\n                    </div>\n                    <table style="border: none;">\n                    <tr>\n                        <td class="text-left pd-evaluation"><span class="font-weight-bold">Giá trị doanh nghiệp EV: </span></td>\n                        <td class="text-right pd-evaluation-value"><span class="bold-text dashed-border-bottom">${null!==window.variablesJS.evaluationsData.cashFlow[0].freeCashFlow?Intl.NumberFormat(window.variablesJS.numberLocale).format(e.toFixed(0)):"N/A"}</span</td>\n                    </tr>\n                    <tr>\n                        <td class="text-left pd-evaluation"><span class="font-weight-bold">Tiền & tương đương tiền: </span></td>\n                        <td class="text-right pd-evaluation-value"><span class="bold-text dashed-border-bottom">${Intl.NumberFormat(window.variablesJS.numberLocale).format(window.variablesJS.evaluationsData.cash)}</span</td>\n                    </tr>\n                    <tr>\n                        <td class="text-left pd-evaluation"><span class="font-weight-bold">Nợ: </span></td>\n                        <td class="text-right pd-evaluation-value"><span class="bold-text dashed-border-bottom">${Intl.NumberFormat(window.variablesJS.numberLocale).format(window.variablesJS.evaluationsData.shortTermDebt+window.variablesJS.evaluationsData.longTermDebt)}</span</td>\n                    </tr>\n                    <tr>\n                        <td class="text-left pd-evaluation"><span class="font-weight-bold">Lợi ích CĐ thiểu số: </span></td>\n                        <td class="text-right pd-evaluation-value"><span class="bold-text dashed-border-bottom">${Intl.NumberFormat(window.variablesJS.numberLocale).format(window.variablesJS.evaluationsData.minorityInterest)}</span</td>\n                    </tr>\n                    <tr>\n                        <td class="text-left pd-evaluation"><span class="font-weight-bold">Giá trị vốn hóa DN: </span></td>\n                        <td class="text-right pd-evaluation-value"><span class="bold-text dashed-border-bottom">${null!==window.variablesJS.evaluationsData.cashFlow[0].freeCashFlow&&n>0?Intl.NumberFormat(window.variablesJS.numberLocale).format(n.toFixed(0)):"N/A"}</span</td>\n                    </tr>\n                    <tr>\n                        <td class="text-left pd-evaluation"><span class="font-weight-bold">SL cổ phiếu lưu hành: </span></td>\n                        <td class="text-right pd-evaluation-value"><span class="bold-text dashed-border-bottom">${Intl.NumberFormat(window.variablesJS.numberLocale).format(window.variablesJS.evaluationsData.shareOutstanding)}</span</td>\n                    </tr>\n                      </table>`;$("#dcf-evaluation").html(l),$("#dcf-evaluation-value").text(`${n>0?Intl.NumberFormat(window.variablesJS.numberLocale).format((n/window.variablesJS.evaluationsData.shareOutstanding).toFixed(0)):"N/A"}`)}else $("#dcf-evaluation").html('<p class="font-weight-bold" style="margin-bottom: 10px !important;">Với giả định như sau: Tăng trưởng <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" style="background: #0d6efd; border-radius: 50%; cursor: pointer;" class="bi bi-info-circle" viewBox="0 0 16 16" data-bs-toggle="tooltip" data-bs-html="true" data-bs-placement="right" title="" data-bs-original-title="<div class=\'text-left\'><p>Giả định này thể hiện tốc độ tăng trưởng trung bình hàng năm khi doanh nghiệp đã đi vào hoạt động ổn định sau kỳ dự báo (hay còn gọi là [Tỉ lệ tăng trưởng trong vô hạn] hay Terminal Growth Rate). Thông thường trong giai đoạn này, công suất sản xuất đã đạt mức tối đa, tăng trưởng của doanh nghiệp chủ yếu đến từ tăng giá bán. Do đó, giả định này thường có giá trị tương đương với lạm phát (khoảng 3%-5%).</p></div>">\n            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path><path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path></svg> <input type="number" class="percent" value="">% và WACC <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" style="background: #0d6efd; border-radius: 50%; cursor: pointer;" class="bi bi-info-circle" viewBox="0 0 16 16" data-bs-toggle="tooltip" data-bs-html="true" data-bs-placement="right" title="" data-bs-original-title="<div class=\'text-left\'><p>WACC (Weighted Average Cost of Capital) là chi phí sử dụng vốn trung bình của doanh nghiệp, cho biết một doanh nghiệp sẽ phải tốn bao nhiêu chi phí cho mỗi đồng tiền được tài trợ (từ vốn CSH và/hay vay mượn). WACC được tính bằng trung bình của tỷ suất sinh lời cổ phiếu và lãi suất doanh nghiệp đang đi vay.</p></div>">\n            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>\n            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>\n            </svg> <input type="number" value="" class="percent">% </p> \n                        <div class="table-responsive">\n                        <table class="table table-bordered">\n                            <thead class="table-light" style="word-wrap: break-word !important;">\n                                <tr>\n                                    <th>Năm</th>\n                                    <th>N/A</th>\n                                    <th>N/A</th>\n                                    <th>N/A</th>\n                                    <th>N/A</th>\n                                    <th>N/A</th>\n                                </tr>\n                            </thead>\n                            <tbody id="stock-evaluation-table-body" class="price-table-content ui-sortable">\n                                <tr>\n                                    <td class="text-left"><span class="font-weight-bold">Dòng tiền (tỷ)</span></td>\n                                    <td class="text-center"><span class="bold-text"><input type="number" class="money-flow" value=""></td>\n                                    <td class="text-center"><span class="bold-text"><input type="number" class="money-flow" value=""></td>\n                                    <td class="text-center"><span class="bold-text"><input type="number" class="money-flow" value=""></td>\n                                    <td class="text-center"><span class="bold-text"><input type="number" class="money-flow" value=""></td>\n                                    <td class="text-center"><span class="bold-text"><input type="number" class="money-flow" value=""></td>\n                                </tr>\n                            </tbody>\n                        </table>\n                        </div>\n                        <table style="border: none;">\n                        <tr>\n                            <td class="text-left pd-evaluation"><span class="font-weight-bold">Giá trị doanh nghiệp EV (tỷ): </span></td>\n                            <td class="text-right pd-evaluation-value"><span class="bold-text dashed-border-bottom">N/A</span</td>\n                        </tr>\n                        <tr>\n                            <td class="text-left pd-evaluation"><span class="font-weight-bold">Tiền & tương đương tiền (tỷ): </span></td>\n                            <td class="text-right pd-evaluation-value"><span class="bold-text dashed-border-bottom">N/A</span</td>\n                        </tr>\n                        <tr>\n                            <td class="text-left pd-evaluation"><span class="font-weight-bold">Nợ (tỷ): </span></td>\n                            <td class="text-right pd-evaluation-value"><span class="bold-text dashed-border-bottom">N/A</span</td>\n                        </tr>\n                        <tr>\n                            <td class="text-left pd-evaluation"><span class="font-weight-bold">Lợi ích CĐ thiểu số (tỷ): </span></td>\n                            <td class="text-right pd-evaluation-value"><span class="bold-text dashed-border-bottom">N/A</span</td>\n                        </tr>\n                        <tr>\n                            <td class="text-left pd-evaluation"><span class="font-weight-bold">Giá trị vốn hóa DN (tỷ): </span></td>\n                            <td class="text-right pd-evaluation-value"><span class="bold-text dashed-border-bottom">N/A</span</td>\n                        </tr>\n                        <tr>\n                            <td class="text-left pd-evaluation"><span class="font-weight-bold">SL cổ phiếu lưu hành (triệu): </span></td>\n                            <td class="text-right pd-evaluation-value"><span class="bold-text dashed-border-bottom">N/A</span</td>\n                        </tr>\n            </table>')},getDataCompanysecuritiesRecommendation:function(){var t="";if(window.variablesJS.evaluationsData&&window.variablesJS.evaluationsData.securities_company&&window.variablesJS.evaluationsData.securities_company.length>0){var a=1,e=[...new Set(window.variablesJS.evaluationsData.securities_company.map((t=>t.firm)))],n=[];if(!(e&&e.length>0))return;if(e.forEach((t=>{var a=window.variablesJS.evaluationsData.securities_company.find((a=>a.firm===t));a&&n.push(a)})),0===n.length)return;if(null!=(n=n.filter((t=>{var a=new Date(t.reportDate).getTime(),e=new Date;return e.setMonth(e.getMonth()-6),e.setDate(1),a>=e})))&&n.length>0){n.forEach((e=>{t+=`<tr>\n                                <td class="text-center"><span>${a++}</span></td>\n                                <td class="text-center"><span>${new Date(e.reportDate).toLocaleDateString(window.variablesJS.defaultLocale)}</span></td>\n                                <td class="text-center"><span class="font-weight-bold">${e.firm}</span></td>\n                                <td class="text-center"><span class="${"BUY"===e.type?"up":"SELL"===e.type?"down":"HOLD"===e.type?"reference":""===e.type} dashed-border-bottom">${"BUY"===e.type?"Mua":"SELL"===e.type?"Bán":"HOLD"===e.type?"Giữ":"N/A"===e.type}</td>\n                                <td class="text-right"><span class="bold-text dashed-border-bottom">${0===e.reportPrice||void 0===e.reportPrice?"N/A":new Intl.NumberFormat(window.variablesJS.numberLocale).format(1e3*e.reportPrice)}</td>\n                                <td class="text-right"><span class="badge bg-primary font-weight-bold font-12 dashed-border-bottom">${0===e.targetPrice||void 0===e.targetPrice?"N/A":new Intl.NumberFormat(window.variablesJS.numberLocale).format(1e3*e.targetPrice)}</td>\n                                <td class="text-left"><span class="bold-text dashed-border-bottom">${e.analyst}</td>\n                            </tr>`}));var o=[...new Set(n.map((t=>t.firm)))],l=0,s=0,i=0,r=0,d=0;o&&o.length>0&&n.forEach((t=>{t&&("BUY"===t.type?i++:"HOLD"===t.type?s++:"SELL"===t.type&&l++,null!==t.targetPrice&&"N/A"!==t.targetPrice&&void 0!==t.targetPrice&&t.targetPrice>0&&(r+=t.targetPrice,d++))})),$("#avgPriceTargetSecuritiesCompany").text(`${r>0?Intl.NumberFormat(window.variablesJS.numberLocale).format((r/d*1e3).toFixed(0)):"N/A"}`),$("#sellSecuritiesCompany").text(l),$("#holdSecuritiesCompany").text(s),$("#buySecuritiesCompany").text(i)}}else t+="<tr><td colspan='7'>Chưa có dữ liệu</td></tr>";$("#company-securities-table-body").html(t)},getAssumptionEV:function(t){var a="",e="";return t.forEach((t=>{a+=`<th>${t.year}F</th>`,e+=`<td class="text-center"><span class="bold-text"><input type="number" class="money-flow dcf-variable" value="${null!=t.freeCashFlow?t.freeCashFlow:0}" onchange="window.evaluationsJS.setValueInputDCFVariable(${t.year},this.value)"></td>`})),`<table class="table table-bordered">\n                    <thead class="table-light" style="word-wrap: break-word !important;">\n                        <tr>\n                            <th>Năm</th>\n                            ${a}\n                        </tr>\n                    </thead>\n                    <tbody id="stock-evaluation-table-body" class="price-table-content ui-sortable">\n                        <tr>\n                            <td class="text-left"><span class="font-weight-bold">Dòng tiền (tỷ)</span></td>\n                            ${e}\n                        </tr>\n                    </tbody>\n                </table>`},setValueInputDCFVariable:function(t,a){window.variablesJS.evaluationsData&&null!==window.variablesJS.evaluationsData.cashFlow&&(window.variablesJS.evaluationsData.cashFlow.find((a=>a.year===t)).freeCashFlow=a,window.evaluationsJS.calculateEvaluation())},setValueInputGrowthAndWACCVariable:function(t,a){null!==window.variablesJS.evaluationsData&&(window.variablesJS.evaluationsData[t]=a/100,window.evaluationsJS.calculateEvaluation())}},document.addEventListener("DOMContentLoaded",(function(t){window.commonJS.initSymbolAutocomple("symbol-name-evaluation-autocomplete"),$("input[type=radio][name=btnEvaluations]").change((function(){window.evaluationsJS.calculateEvaluation()})),window.commonJS.initTooltips()}));