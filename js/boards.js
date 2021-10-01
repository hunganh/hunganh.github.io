function decodeBoardBaseStock(data) {
    try {
        const arrData = data.split("|");
        var lastprice = "";
        for (let i = 0; i < arrData.length; i++) {
            if (arrData[i] !== "") {
                try {
                    const subData = arrData[i].split("*");
                    const tagEl0 = subData[0];
                    var symbol = tagEl0.substr(0, tagEl0.indexOf("_"));
                    var lastprice = Number(subData[1].replace(",",".")) * 1000;
                    var colorId = subData[3];
                    
                } catch (e) {
                    //console.log(e);
                }
            }
        }
    } catch (e) {
        //console.log(e);
    }
}