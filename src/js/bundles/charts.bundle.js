window.chartsJS={technicalAnalysics:function(){$("#accordionTAChart").find(".collapse").collapse("hide"),$("#showTechnicalAnalysisContent").css("height","200px");var e=window.commonJS.getLoadingHTML(),t=[],n=$("#btnFilterHSXChartOption:checked").val(),a=$("#btnFilterHNXChartOption:checked").val(),l=$("#btnFilterUPCChartOption:checked").val();n&&t.push(n),a&&t.push(a),l&&t.push(l);var i=$("#chart-fields-selection-options").val(),o="null"!==i?[i]:null,c=$("input[name='btnCandleStickTAOption']:checked").val(),r={filterByKeys:[],filterByKeyAndValues:{},compareResultOfTwoSMAs:null},h=[],d={},s={AvailableForFASearching:!0,Has5ConsecutiveTradingDays:!0},p=$("#btnFilterSMA20UpChartOption:checked").val();p&&h.push(window.commonJS.getValueByCandleStickType(p,c));var w=$("#btnFilterSMA50UpChartOption:checked").val();w&&h.push(window.commonJS.getValueByCandleStickType(w,c));var S=$("#btnFilterSMA200UpChartOption:checked").val();S&&h.push(window.commonJS.getValueByCandleStickType(S,c));var u=$("#btnFilterSMA20DownChartOption:checked").val();u&&h.push(window.commonJS.getValueByCandleStickType(u,c));var m=$("#btnFilterSMA50DownChartOption:checked").val();m&&h.push(window.commonJS.getValueByCandleStickType(m,c));var C=$("#btnFilterSMA200DownChartOption:checked").val();C&&h.push(window.commonJS.getValueByCandleStickType(C,c));var v=$("#btnFilterSMA20UpSMA50ChartOption:checked").val();v&&h.push(window.commonJS.getValueByCandleStickType(v,c));var y=$("#btnFilterSMA50UpSMA200ChartOption:checked").val();y&&h.push(window.commonJS.getValueByCandleStickType(y,c));var g=$("#btnFilterSMA20DownSMA50ChartOption:checked").val();g&&h.push(window.commonJS.getValueByCandleStickType(g,c));var k=$("#btnFilterSMA50DownSMA200ChartOption:checked").val();k&&h.push(window.commonJS.getValueByCandleStickType(k,c));var T=$("#btnFilterSMA20CompareSMA50ChartOption:checked").val();T&&(d[window.commonJS.getValueByCandleStickType(T,c)]=$("select#btnFilterSMA20CompareSMA50ChartSelection option:checked").val());var b=$("#btnFilterSMA50CompareSMA200ChartOption:checked").val();b&&(d[window.commonJS.getValueByCandleStickType(b,c)]=$("select#btnFilterSMA50CompareSMA200ChartSelection option:checked").val()),null!==d&&(r.compareResultOfTwoSMAs=d);var A=$("#btnFilterTenkanUpChartOption:checked").val();A&&h.push(window.commonJS.getValueByCandleStickType(A,c));var F=$("#btnFilterKijunUpChartOption:checked").val();F&&h.push(window.commonJS.getValueByCandleStickType(F,c));var O=$("#btnFilterCloudUpChartOption:checked").val();O&&h.push(window.commonJS.getValueByCandleStickType(O,c));var f=$("#btnFilterTenkanDownChartOption:checked").val();f&&h.push(window.commonJS.getValueByCandleStickType(f,c));var J=$("#btnFilterKijunDownChartOption:checked").val();J&&h.push(window.commonJS.getValueByCandleStickType(J,c));var B=$("#btnFilterCloudDownChartOption:checked").val();B&&h.push(window.commonJS.getValueByCandleStickType(B,c));var V=$("#btnFilterMACDUpChartOption:checked").val();V&&h.push(window.commonJS.getValueByCandleStickType(V,c));var M=$("#btnFilterMACDDownChartOption:checked").val();M&&h.push(window.commonJS.getValueByCandleStickType(M,c));var D=$("#btnFilterRSIOverBuyChartOption:checked").val();D&&h.push(window.commonJS.getValueByCandleStickType(D,c));var U=$("#btnFilterRSIOverSellChartOption:checked").val();if(U&&h.push(window.commonJS.getValueByCandleStickType(U,c)),$("#btnFilterRSIRangeValueChartOption:checked").val()){var I=$("select#btnFilterRSIRangeValueChartOptionSelection option:checked").val(),R=I.slice(0,I.length-3),x=I.slice(I.length-2);r.filterByKeyAndValues[window.commonJS.getValueByCandleStickType(R,c)]=parseInt(x)}var H=$("#btnFilterBollingerUpperBandChartOption:checked").val(),L=$("#btnFilterBollingerLowerBandChartOption:checked").val();H&&h.push(window.commonJS.getValueByCandleStickType(H,c)),L&&h.push(window.commonJS.getValueByCandleStickType(L,c)),r.filterByKeys=h;var K=$("#btnChartOverTop:checked").val();K&&(s[K]=!0);var _={faFilter:null,taFilter:r,booleanFilter:s,pageNumber:1,pageSize:1e4,exchanges:t,icbCodes:o,sortColumn:"Symbol",isDesc:!1};$("#showTechnicalAnalysisContent").html(`</br>${e}`),setTimeout((()=>{var e=encodeURIComponent(`${window.apiUrlDefined.FIALDA_API_V2_URL}${window.apiUrlDefined.FIALDA_STOCK_FILTERS_PATH}`),t='<table class="table table-bordered table-striped table-hover fixTableHead">\n                    <thead class="table-light">\n                        <tr>\n                            <th>#</th> \n                            <th>Mã</th>\n                            <th>Tên Doanh Nghiệp</th>\n                            <th>Sàn</th>\n                        </tr>          \n                    </thead>\n                    <tbody>';$.ajax({url:`${window.apiUrlDefined.CORS_PROXY_URL}/${e}`,method:"POST",data:JSON.stringify(_),headers:{"content-type":"application/json;charset=UTF-8"}}).done((function(e){if(e&&e.result)if(e.result.items.length>0){var n=e.result.items;if(n.length>0){var a=0;n.forEach((e=>{var n=window.stockData.find((t=>t.symbol===e));t+=`<tr class="tr-cursor" onclick=window.chartsJS.generateChartIframe("${e}")>\n                                            <td>${a+1}</td>\n                                            <td class="bold-text">${e}</td>\n                                            <td class="text-left">${n&&void 0!==n.name?n.name:""}</td>\n                                            <td>${n&&void 0!==n.exchange?n.exchange:""}</td>\n                                        </tr>`,a++}))}else t+='<tr><td colspan="4" class="bold-text">Không có mã nào thỏa mãn tiêu chí.</td></tr>'}else t+='<tr><td colspan="4" class="bold-text">Không có mã nào thỏa mãn tiêu chí.</td></tr>';else t+='<tr><td colspan="4">Không có dữ liệu. Vui lòng thử lại sau!</td></tr>';t+="</tbody></table>",$("#showTechnicalAnalysisContent").html(t),window.chartsJS.setTATableHeight()})).fail((function(e,t,n){$("#showTechnicalAnalysisContent").html("Có lỗi khi tải dữ liệu. Vui lòng thử lại sau!")}))}),100)},setTATableHeight:function(){setTimeout((()=>{var e=$(window).height()-$("#accordionTAChart").height()-100;$("#showTechnicalAnalysisContent").css("height",parseInt(e)+"px")}),200)},generateChartIframe:function(e){$(".chartContainer").html(`</br>${window.commonJS.getLoadingHTML()}`),setTimeout((()=>{var t=$("input[name='btnCandleStickTAOption']:checked").val(),n="";"_15m"===t?n="15":"Hourly"===t?n="60":"Daily"===t?n="1D":"Weekly"===t&&(n="1W");var a=$(window).height()-50,l=`<iframe id="ifrTACharts" src="tv-chart.html?symbol=${e}&allowFullscreen=true&resolution=${n}&lang=vi" frameborder="0" allowtransparency="true" scrolling="no" allowfullscreen="" style="display: block; width: 100%; height:${a}px"></iframe>`;$(".chartContainer").html(l)}),500)}},document.addEventListener("DOMContentLoaded",(function(e){window.chartsJS.generateChartIframe("VNINDEX");var t=window.commonJS.getSelectionFieldsHTML("chart-fields-selection-options");$("#chart-fields-selection").html(t),$(window).resize((function(){$("#ifrTACharts").css("height",parseInt($(window).height()-50)+"px"),window.chartsJS.setTATableHeight()})),$("#accordionTAChart").click((function(){window.chartsJS.setTATableHeight()}))}));