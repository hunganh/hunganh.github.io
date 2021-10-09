Datafeeds.UDFCompatibleDatafeed.prototype._requestConfiguration =  function onReady() {
    return new Promise(function (resolve, reject) {
      resolve(cfg.cfgChart);
    })
};

Datafeeds.UDFCompatibleDatafeed.prototype.calculateHistoryDepth = function(period, resolutionBack, intervalBack) {
    return period < 60 ? {resolutionBack: 'M', intervalBack: '1'} : undefined
};


Datafeeds.UDFCompatibleDatafeed.prototype.getBars = function (symbolInfo, resolution, rangeStartDate, rangeEndDate, onResult, onError) {
  this._historyProvider.getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate)
      .then(function (result) {
        console.log(result)
      onResult(result.bars, result.meta);

      try {
        if(typeof result.bars !== 'undefined' && result.bars !== null && $.isArray(result.bars) && result.bars.length > 0){
          let bars = result.bars;
          var lastBar = bars[bars.length - 1];
          lastBarVPS[symbolInfo.name] = lastBar;
        }
      } catch(er) { console.log('VPS err:',er); }

      
  })
      .catch(onError);
};
