(function() {
    console.log("start");
    console.log($(".order-content").length);
    $(".order-content").each(function (index,element){
        var obj = $(element).find(".item-amount").children("input");
        if (obj.length==1){
            $(element).find(".item-amount").children("input").val(2);
        }
    })
    console.log("end");
})();
