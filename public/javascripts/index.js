
function Order(pStoreID, pSalesPersonID, pCdID, pPricePaid) {
    this.storeID= pStoreID;
    this.salesPersonID = pSalesPersonID;
    this.cdID = pCdID;
    this.pricePaid = pPricePaid;
  }


document.addEventListener("DOMContentLoaded", function (event) {

    shuffle();
    document.getElementById("button1").addEventListener("click", function () {
        shuffle();
    });

    document.getElementById("button2").addEventListener("click", function () {
        var tStoreID = document.getElementById("storeid").value;
        var tSalesPersonID = document.getElementById("salespersonid").value;
        var tCdID = document.getElementById("cdid").value;
        var tPricePaid = document.getElementById("pricepaid").value;
        var oneOrder = new Order(tStoreID, tSalesPersonID, tCdID, tPricePaid);

        $.ajax({
            url: '/' ,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(oneOrder),
            success: function (result) {
                console.log("added new Order")
            }

        });
    });

    document.getElementById("button3").addEventListener("click", function () {
        var tStoreID = document.getElementById("storeid").value;
        var tSalesPersonID = document.getElementById("salespersonid").value;
        var tCdID = document.getElementById("cdid").value;
        var tPricePaid = document.getElementById("pricepaid").value;
        var oneOrder = new Order(tStoreID, tSalesPersonID, tCdID, tPricePaid);
        
        $.ajax({
            url: '/NewOrder' ,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(oneOrder),
            success: function (result) {
                console.log("added new Order")
            }

        });
    });

});

function shuffle() {
    var salesPersonID = Math.floor(Math.random() * 24) + 1; 
    var storeID = new Array(98053 , 98007, 98077, 98055, 98011, 98046);
    var cdID = new Array(123456, 123654, 321456, 321654, 654123, 654321, 543216, 354126, 621453, 623451);
    var pricePaid = Math.floor(Math.random() * 11) + 5;

    var storeIndex = (closestInteger(salesPersonID, 4));

    document.getElementById("storeid").defaultValue = storeID[storeIndex];
    document.getElementById("salespersonid").defaultValue = salesPersonID;
    document.getElementById("cdid").defaultValue = cdID[Math.floor(Math.random() * cdID.length)];
    document.getElementById("pricepaid").defaultValue = pricePaid;

}

function closestInteger(a, b) {
    var d;
    var c1 = a - (a % b);
    var c2 = (a + b) - (a % b);
    if (c1 == a) {
        d = (c1 / b) - 1;
    } 
    else {
        d = (c2 / b) - 1
    }
    return ((d < 0) ? 0 : d);
}

