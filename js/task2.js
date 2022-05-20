(function() {
    console.log("start");
    // console.log($(".offer-list-container").find('tbody').children('tr'));
    $(".offer-list-container").find('tbody').children('tr').each(function (index,element){
        var obj = $(element).find(".td-actions").children("a.edit-sku");
        // console.log(obj);
        // $(element).find(".td-actions").children("a.edit-sku").click();

        obj.click(function(){
            setTimeout(() => {
                copyReplace();
            },1000);
        });


        // $('.sku-match-container').find('.d-header').children('span')[0].click();


        // return false;
    })

    // copyReplace();
    console.log("end");
})();

function copyReplace(){
    var indexNum = 0 ;
    var reverseEach = 0 ;
    $('div.sku-list').find('.sku-value-tr').each(function (index,element){
        console.log("第"+index+"循环");
        // console.log($(element));
        // indexNum=indexNum+1 ;
        var offer1688Obj = $(element).find('.offer-sku-value-td').find('td');
        var tdlength = offer1688Obj.length;
        if (tdlength>2) return false;
          var taobaoTd = $(element).find('.item-sku-value').find('td') ;
         //----- 判断1688 sku td 是否有关联顺序
        if (reverseEach == 0){
            offer1688Obj.eq(0).find('span').click();
            indexNum =indexNum+1;
            var leng = $('div[data-tag=gateway-wrapper]').eq(indexNum).find('ul.next-menu-content').children('li').length;
            if (leng<1){// 代表需要倒着循环
                reverseEach = 1;
                offer1688Obj= offer1688Obj.get().reverse();
            }
            else{
                reverseEach = 2 ;
            }
        }
        console.log("reverseEach:"+reverseEach);
        //----- end------------
            offer1688Obj.each(function (inde,elem){
                if ($(elem).find('span').attr('value')){
                    console.log('1688已经有值，不需要匹配,'+$(elem).find('span').attr('value'));
                }else {
                    indexNum =indexNum+1;
                    $(elem).find('span').click();
                    var skutaobao = taobaoTd.eq(tdlength-1-inde);
                    if (reverseEach==1){
                        skutaobao = taobaoTd.eq(inde)
                    }
                    console.log(skutaobao.text());
                    var resNum = matchSku(skutaobao.text(),indexNum) ;
                    if (resNum == -1){//ui li 没有值，需要手动失去焦点, 需要倒着循环
                        // console.log("失去焦点");
                        // targetObj.eq(ind).find('span')[0].blur();
                        skutaobao.click();
                        // indexNum = indexNum-1;
                    }
                    console.log("indexNum:"+indexNum,"gateway-wrapper:"+$('div[data-tag=gateway-wrapper]').length);
                }
                // return false ;
            });

       // return false ;
    });
    console.log("替换完成");
}

function execClickMatch(){
         new Promise((resolve) =>{
                // copyReplace();
                console.log("打开第"+index+"行弹窗 内sku复制完成")
                resolve();
            }).then(() =>{
                $('.sku-match-container').find('.d-header').children('span')[0].click();
                console.log("关闭第"+index+"行弹窗")
            })}

function matchSku(taobaoSku,indexNum){
    // console.log("gateway-wrapper"+indexNum);
    var num = 0 ;
    var leng = $('div[data-tag=gateway-wrapper]').eq(indexNum).find('ul.next-menu-content').children('li').length;
    // console.log("ul 长度"+leng);
    if (leng< 1) return -1 ;
    $('div[data-tag=gateway-wrapper]').eq(indexNum).find('ul.next-menu-content').children('li').each(function (ine,elem){
        // console.log($(elem).attr('value'));
        if ($(elem).attr('value') && ($(elem).attr('value').indexOf(taobaoSku)>0||
            taobaoSku == $(elem).attr('value'))){
            console.log('taobaoSku:'+taobaoSku+',1688:'+$(elem).attr('value'));

            new Promise((resolve) =>{
                $(elem)[0].click();
                resolve();
            }).then(() =>{
            })

            // sleep(100);
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
