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
        var storeid = getStoreid();
        if (storeid == 'undefined' || storeid == ''){
            var ret = "获取店铺id失败";
            sendResponse( {
                farewell: "处理失败："+ret
            });
        }else{
            var keyToken = "storeid"+storeid;
            chrome.storage.local.get([keyToken], function (data){
                console.log('key is '+[keyToken],'\n value is '+data);
                var resValue = data["storeid"+storeid];
                console.log(resValue);
                var validate = false ;
                if(resValue!=undefined){
                    console.log(resValue.mydate)
                    validate = validateToken(resValue.mydate);
                }
                console.log(validate);
                if (!validate){
                    var ret = remoteGet("http://localhost:8299/plug/bill?storeid=1");
                    console.log(ret);
                    if (ret == true){
                        //请求成功后保存token，有效期为一天
                        savelocalStoreid(storeid);
                        var res = copyReplace();
                        sendResponse( {
                            farewell: "处理成功："+res
                        });
                    }else {
                        sendResponse( {
                            farewell: "处理失败："+ret
                        });
                    }
                }else {//token 有效
                    var res = copyReplace();
                    sendResponse( {
                        farewell: "处理成功："+res
                    });
                }
            });

        }

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
    var keyToken = "storeid"+storeid;
    var value = {"mydate":str};
    // var value2 = {[storeid]:storeid,"mydate":mydate};
    // var value3 = {"storeid":storeid,"mydate":mydate};
    // console.log(value2);
    // console.log(value3);
    chrome.storage.local.set({[keyToken]:value}, function (){
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
function remoteGet(url){
    console.log("content-remoteGet");
    var ret="服务异常，请联系管理员！";
    $.ajax({
        type:"get",
        url:url,
        async:false,
        dataType: "json",
        success:function(data){
            if (data == null){
                ret= "服务异常，请联系管理员！";
            }
            if (data.code == 1000){//服务端处理成功
                ret= true ;
            }else if (data.code == 1002){
                ret= "额度不足，请联系管理员充值!"
            }else {
                ret= "服务异常，请联系管理员（"+data.code+"）";
            }
        },
        error:function (e){
            ret= "网络异常，请重试";
        }
    });
    return ret ;

}
