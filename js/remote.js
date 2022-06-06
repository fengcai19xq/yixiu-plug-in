
function getAccountid(){
    var accountId = $('.thumb-box').children("span").text();
    console.log(accountId);
    return accountId;
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
            }else if (data.code == 1001){
                ret= "额度不足，请联系管理员充值!"
            }else {
                if(data.message){
                    ret= data.message+"（"+data.code+"）";
                }else
                ret= "服务异常，请联系管理员（"+data.code+"）";
            }
        },
        error:function (e){
            ret= "网络异常，请重试";
        }
    });
    return ret ;

}
