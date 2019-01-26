function reservesData() {
    $.get("/lister/coinsData", function(result) {
        Object.keys(result).sort()
        .forEach(function (key, i) {
            var coinData = result[key];
            var html = `<div class="listedTokenBox">
                            <div class="logoNameBox">
                                <div class="logoBox">
                                    <img src="logos/${key}.svg" style="width:64px; height:64px">
                                </div>
                                <div class="nameCodeBox">
                                    <div class="listerNameBox">${coinData.symbol}</div>
                                    <div class="listerNameToken">${coinData.name}</div>
                                </div>
                            </div>
                            <div class="btnAddOrderbook">
                                <a href="/orderbook/${coinData.symbol}">
                                    <button class="btn btn-warning animation-on-hover btn-lg h2" type="button">VIEW ORDERBOOK</button>
                                </a>
                            </div>
                        </div>`;
            $('.listedTokensContainer').append(html); 
        });
    }).fail(function() {
        console.log('Error getting data from database');
    });
}

reservesData();


$('.listBut').click(function() {
    listCoinAdd = $('#listerInput').val();
    reserveListingStage(listCoinAdd);
});

function startListing(num) {
    console.log(num);
    if (num == 0) {
        addOrderbookContract(listCoinAdd);
    } else if (num == 1) {
        initOrderbookContract(listCoinAdd);
    } else if (num == 2) {
        listOrderbookContract(listCoinAdd);
    } else {
        console.log("already listed");
    }
}

function updateListedToken(coinAddress) {
    var etherscanAPI = `https://api-ropsten.etherscan.io/api?module=account&action=tokentx&contractaddress=${coinAddress}&page=1&offset=1`;
    $.get(etherscanAPI, function(result) {
        var data = result.result[0];
        var coinData = {
            "cmcName" : data.tokenSymbol,
            "contractAddress" : data.contractAddress,
            "decimals" : data.tokenDecimal,
            "name" : data.tokenName,
            "symbol" : data.tokenSymbol
        }
        console.log(coinData);
        $.ajax({
            url: "/lister/add",
            type: 'POST',
            contentType:'application/json',
            data: JSON.stringify(coinData),
            dataType:'json',
            success: function (data) { 
                console.log(data);
            }
        });
	}).fail(function() {
		alert("[ERROR] Token Addresses Not Loaded");
	});
}