function updateMainUI(num){
    
    var i = 0;
    for (i = 0; i < num; i++){
        if(kyberRopstenTokenList[i].pml){
            
            var BOX_sname = kyberRopstenTokenList[i].cmcName;
            var BOX_lname = kyberRopstenTokenList[i].name;
            var iconFileName = BOX_sname.toString().toLowerCase();

            var logoBox = $('<div></div>')
            .addClass("logoBox")
            .append("<img src='logos/" + iconFileName + ".svg' style='width:64px; height:64px'>");

            var nameCodeBox = $('<div></div>')
            .addClass("nameCodeBox")
            .append("<div class='listerNameBox'>" + BOX_sname + "</div>")
            .append("<div class='listerNameToken'>" + BOX_lname + "</div>");

            var logoNameBox = $('<div></div>')
            .addClass("logoNameBox")
            .append(logoBox, nameCodeBox);

            var btnAddOrder = $('<div></div>')
            .addClass("btnAddOrderbook")
            .append("<a href='/orderbook/" + BOX_sname + "'><button class='btn btn-warning animation-on-hover btn-lg h2' type='button'>VIEW ORDERBOOK</button></a>");

            var listedTokenBox = $('<div></div>')
            .addClass("listedTokenBox")
            .append(logoNameBox, btnAddOrder);

            $('.listedTokensContainer').append(listedTokenBox); 

            // Navigation

            var reserveToNavBar = `<li><a href="/orderbook/${kyberRopstenTokenList[i].cmcName}">
                                    <span class="sidebar-mini-icon">${(kyberRopstenTokenList[i].cmcName).slice(0,1)}</span>
                                    <span class="sidebar-normal">${kyberRopstenTokenList[i].cmcName} ORDERBOOK</span>
                                </a></li>`;

            // var li = $('<li></li>')
            // .append("<a href='/orderbook/" + kyberRopstenTokenList[i].cmcName + "'><span class='sidebar-mini-icon'>D</span><span class='sidebar-normal'>" + kyberRopstenTokenList[i].cmcName + " ORDERBOOK</span></a>");

            $('#orderbooks').append(reserveToNavBar);
        }
    }
}

$('.listBut').click(function () {
    if(getTokenDetailsContract($('#listerInput').val())){
        var t= getTokenDetailsContract($('#listerInput').val());
        createOrderBook(t.cmcName);
    }else{
        addToken($('#listerInput').val());
        console.log("2");
    }
})
