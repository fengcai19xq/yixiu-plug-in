(function() {
    console.log("start");

    console.log($(".offer-list-container").find('tbody').children('tr'));
    $(".offer-list-container").find('tbody').children('tr').each(function (index,element){
        var obj = $(element).find(".td-actions").children("a.edit-sku");
        console.log(obj);
        // $(element).find(".td-actions").children("a.edit-sku").click();
        obj.click(function(){
            setTimeout(() => {
                copyReplace();
            },1000);
        });

        return false;
        // if (obj.length==1){
        //     $(element).find(".item-amount").children("input").val(2);
        //     num =num+1 ;
        // }
    })

    console.log("end");
})();

function copyReplace(){
    $('div.sku-list ').find('.sku-value-tr').each(function (index,element){
        // console.log($(element));
       var targetObj = $(element).find('.offer-sku-value-td').find('td');
       $(element).find('.item-sku-value').find('td').each(function (ind,ele){
           var value = $(ele).text();
           targetObj.eq(ind).find('span').attr("value",value);
           targetObj.eq(ind).find('span').children('input').val(value);
           targetObj.eq(ind).find('span').children('span.next-select-inner').text(value);
       });
       return false ;
    });
}
