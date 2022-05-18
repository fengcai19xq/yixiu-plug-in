(function() {
    console.log("start");
    // console.log($(".offer-list-container").find('tbody').children('tr'));
    // $(".offer-list-container").find('tbody').children('tr').each(function (index,element){
    //     var obj = $(element).find(".td-actions").children("a.edit-sku");
    //     console.log(obj);
    //     // $(element).find(".td-actions").children("a.edit-sku").click();
    //
    //     // obj.click(function(){
    //     //     setTimeout(() => {
    //     //         copyReplace();
    //     //     },1000);
    //     // });
    //
    //
    //     obj[0].click();
    //     sleep(10000);
    //     console.log("sleep end");
    //     $('.sku-match-container').find('.d-header').children('span')[0].click();
    //     // new Promise((resolve) =>{
    //     //     obj[0].click();
    //     //     console.log("打开第"+index+"行弹窗")
    //     //     resolve();
    //     // }).then(() =>{
    //     //     new Promise((resolve) =>{
    //     //         // copyReplace();
    //     //         console.log("打开第"+index+"行弹窗 内sku复制完成")
    //     //         resolve();
    //     //     }).then(() =>{
    //     //         $('.sku-match-container').find('.d-header').children('span')[0].click();
    //     //         console.log("关闭第"+index+"行弹窗")
    //     //     })
    //     // })
    //
    //
    //     return false;
    //     // if (obj.length==1){
    //     //     $(element).find(".item-amount").children("input").val(2);
    //     //     num =num+1 ;
    //     // }
    // })

    copyReplace();
    console.log("end");
})();

function copyReplace(){
    var isAutoCommit = true ;
    $('div.sku-list').find('.sku-value-tr').each(function (index,element){
        console.log("第"+index+"循环");
        // console.log($(element));
       var targetObj = $(element).find('.offer-sku-value-td').find('td');
       $(element).find('.item-sku-value').find('td').each(function (ind,ele){
           var value = $(ele).text();
           console.log(targetObj.eq(ind).find('span'));
           // if ($('div[data-tag=gateway-wrapper]').length>1){
           //     $('div[data-tag=gateway-wrapper]').eq(1).remove();
           // }
           if (value == targetObj.eq(ind).find('span').attr('value')){
               console.log('1688已经有值，不需要匹配');
               return false ;
           }

           new Promise((resolve) =>{
               // copyReplace();
               targetObj.eq(ind).find('span')[0].click();
               var matchRes =  matchSku(value) ;
               if (matchRes == 0) {
                   isAutoCommit = false ;
               }
               resolve();
           }).then(() =>{
           })
           sleep(1000);

       });
       // return false ;
        sleep(10000);
    });
    console.log("是否自动提交："+isAutoCommit);
}


function matchSku(taobaoSku){
    var num = 0 ;
    $('div[data-tag=gateway-wrapper]').eq(1).find('ul.next-menu-content').children('li').each(function (ine,elem){
        // console.log($(elem).attr('value'));
        if (taobaoSku == $(elem).attr('value')){
            console.log('taobaoSku:'+taobaoSku+',1688:'+$(elem).attr('value'));

            new Promise((resolve) =>{
                $(elem)[0].click();
                resolve();
            }).then(() =>{
            })

            sleep(1000);
            num = 1;
            return false ;
        }
    })
    return num ;

}

function sleep(sleepMillis){
    var now = new Date();
    var exitTime = now.getTime()+sleepMillis;
    while (true){
        now = new Date();
        if (now.getTime()>exitTime){
            return ;
        }
    }
}