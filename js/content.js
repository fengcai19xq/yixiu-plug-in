chrome.runtime.sendMessage({todo:"showPageAction"});

// 接收消息
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse){

    if (message == "startAction"){
        console.log("content-startAction");
        // chrome.storage.local.set({"ces":"12"}, function (){
        //     console.log('key is '+"ces",'\n Value is set to ' + 12);
        // });
        // chrome.storage.local.get("ces", function (data){
        //     console.log('key is '+"ces",'\n value is '+data);
        //     alert(data.ces);
        // });


    }
});
function getStoreid(){
    var storeid = $('.site-nav-user').children("a").text();
    console.log(storeid);
    return storeid;
}
function savelocalStoreid(storeid){
    console.log("savelocalStoreid");
    var mydate = new Date();
    var str = "" + mydate.getFullYear() + "-";
    str += (mydate.getMonth()+1) + "-";
    str += mydate.getDate() ;
    var keyToken = "accountId"+storeid;
    var value = {"mydate":str};
    // var value2 = {[storeid]:storeid,"mydate":mydate};
    // var value3 = {"storeid":storeid,"mydate":mydate};
    // console.log(value2);
    // console.log(value3);
    chrome.storage.sync.set({[keyToken]:value}, function (){
        console.log('key is '+[keyToken],'\n Value is set to ' + value);
    });
}
function validateToken(tokenDate){
    console.log(tokenDate)
    if (tokenDate == null) return false ;
    var mydate = new Date();
    var str = "" + mydate.getFullYear() + "-";
    str += (mydate.getMonth()+1) + "-";
    str += mydate.getDate() ;
    if(tokenDate==str){//token 默认一天有效
        console.log("同一天 ")
        return true;
    }else {//token 失效
        return  false ;
    }
}
function copyReplace(){
    var toltal = $(".order-content").length;
    console.log("复制开始:"+toltal);
    var num =0;
    $(".order-content").each(function (index,element){
        var obj = $(element).find(".item-amount").children("input");
        if (obj.length==1){
            $(element).find(".item-amount").children("input").val(2);
            num =num+1 ;
        }
    })
    console.log("复制结束："+num);

    return "共:"+toltal+",成功："+num;
}