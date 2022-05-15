chrome.runtime.sendMessage({todo:"showPageAction"});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse){
    if (message == "startAction"){

        alert(23);
        console.log($(".offer-list-container").find('tbody').children('tr'));
        $(".offer-list-container").find('tbody').children('tr').each(function (index,element){
            var obj = $(element).find(".td-actions").children("a.edit-sku");
            console.log(obj);
            // $(element).find(".td-actions").children("a.edit-sku").click();
            obj.click();
            // obj.click(function(){
            //     setTimeout(() => {
            //         copyReplace();
            //     },1000);
            // });

            return false;
            // if (obj.length==1){
            //     $(element).find(".item-amount").children("input").val(2);
            //     num =num+1 ;
            // }
        })
    }
});
