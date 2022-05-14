chrome.runtime.sendMessage({todo:"showPageAction"});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse){
    if (message == "startAction"){
       $(".offer-list-container").children('tbody').each(function (index,element){
           var obj = $(element).find(".item-amount").children("input");
           if (obj.length==1){
               $(element).find(".item-amount").children("input").val(2);
               num =num+1 ;
           }
       })
    }
});
