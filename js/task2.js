(function() {
    console.log("start");
    // console.log($(".offer-list-container").find('tbody').children('tr'));
    $(".offer-list-container").find('tbody').children('tr').each(function (index,element){
        var obj = $(element).find(".td-actions").children("a.edit-sku");
        // console.log(obj);
        // $(element).find(".td-actions").children("a.edit-sku").click();

        obj.click(function(){
            setTimeout(() => {
                createDiv();
            },500);
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

function createDiv(){
    var para = document.createElement("h1");
    var html = "<p id='execText' style='color: blue;font-size: x-large'>正在执行中，请勿关闭页面！！！</p>" +
        "<p id='tipTextP' style='color: cadetblue;font-size: large;display: none'><span id='tipText'></span></p>";
    para.innerHTML = html ;
    $('div[data-tag=gateway-wrapper]').find('div.d-header')[0].appendChild(para);
}

function copyReplace(){
    var indexNum = 0 ;
    var reverseEach = 0 ;
    var isFirst = false ;
    var matchSuccess=0;
    $('div.sku-list').find('.sku-value-tr').each(function (index,element){
        console.log("第"+index+"循环");
        // console.log($(element));
        // indexNum=indexNum+1 ;
        var offer1688Obj = $(element).find('.offer-sku-value-td').find('td');
        var tdlength = offer1688Obj.length;
        if (tdlength>2) return false;
          var taobaoTd = $(element).find('.item-sku-value').find('td') ;
         //----- 判断1688 sku td 是否有关联，需要倒着循环
        if (tdlength==2 &&reverseEach == 0){
            offer1688Obj.eq(0).find('span').click();
            indexNum =indexNum+1;
            var leng = $('div[data-tag=gateway-wrapper]').eq(indexNum).find('ul.next-menu-content').children('li').length;
            if (leng<1){// 代表需要倒着循环
                reverseEach = 1;
                // taobaoTd.eq(0).click();
            }
            else{
                reverseEach = 2 ;
            }
            // console.log("reverseEach:"+reverseEach);
        }
        if(reverseEach==1){
            offer1688Obj= offer1688Obj.get().reverse();
        }else {
            offer1688Obj=offer1688Obj.get();
        }
        //----- end------------
            $.each(offer1688Obj,function (inde,elem){
                if ($(elem).find('span').attr('value')){
                    console.log('1688已经有值，不需要匹配,'+$(elem).find('span').attr('value'));
                }else {

                    if (index ==0 && reverseEach==1 && inde==1){
                        isFirst = true ;
                        console.log("倒序循环第2个元素，其实就是页面第一个td元素，已经触发生成过gateway-wrapper")
                    }else {
                        isFirst =false
                        indexNum =indexNum+1;
                    }
                    $(elem).find('span').click();
                    var skutaobao = taobaoTd.eq(tdlength-1-inde);
                    if (reverseEach==1){
                        skutaobao = taobaoTd.eq(inde)
                    }
                    // console.log(skutaobao.text());
                    var resNum = matchSku(skutaobao.text(),indexNum,isFirst) ;
                    if (resNum == -1){//ui li 没有值，需要手动失去焦点, 需要倒着循环
                        // console.log("失去焦点");
                        // targetObj.eq(ind).find('span')[0].blur();
                        // skutaobao.click();
                        // indexNum = indexNum-1;
                    }else if (resNum==1){
                        matchSuccess=matchSuccess+1;
                    }
                    // console.log($(elem).find('span').attr("value"));
                    // console.log($(elem).find('span').children('input').attr("value"));
                    // console.log($(elem).find('span').children('span').text());

                    if (isFirst) {
                        console.log("indexNum:" + 1, "gateway-wrapper:" + $('div[data-tag=gateway-wrapper]').length);
                    }else {
                        console.log("indexNum:"+indexNum,"gateway-wrapper:"+$('div[data-tag=gateway-wrapper]').length);
                    }
                    $('#tipText').html("共执行："+indexNum+"，匹配成功："+matchSuccess+"条");
                    $('#tipTextP').css('display','');
                }
                // return false ;
            });

        // sleep(100);
       // return false ;
    });
    $('#execText').text("执行完成，请点击确定按钮！！！");
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

function matchSku(taobaoSku,indexNum,isFirst){
    // console.log("gateway-wrapper"+indexNum);
    var num = 0 ;
    var liObj = $('div[data-tag=gateway-wrapper]').eq(indexNum).find('ul.next-menu-content').children('li');
    if (isFirst){
        liObj = $('div[data-tag=gateway-wrapper]').eq(1).find('ul.next-menu-content').children('li')
    }
    // console.log(liObj);
    var leng = liObj.length;
    // console.log("ul 长度"+leng);
    if (leng< 1) return -1 ;
    var value1688 ;
    liObj.each(function (ine,elem){
        // console.log($(elem).attr('value'));
        value1688 = $(elem).attr('value');
        if (value1688&& (value1688.indexOf(taobaoSku.replace('cm',''))>0||
            taobaoSku ==value1688||value1688==taobaoSku.replace('cm',''))){
            // console.log('taobaoSku:'+taobaoSku+',1688:'+value1688);

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
