/**
 *
 *
 * @param {*} msg 提示文字
 * @param {number} [time=3000] 提示显示的时长（几毫秒后消失），默认为3秒
 * @param {string} [bg="blue"] 默认背景颜色
 * @param {boolean} [black=false] 是否显示黑色半透明底
 */
function tip(msg,time=3000,bg="blue",type="tip",black=false){
	//n的值 red black blue	，不填则为blue	
	let name=(new Date()).getTime();	
	if(type == "dialog"){
		$('body').append(
			`<div id="srui_tips_box" class="srui_bg_white srui_border srui_color_black" data-name="dialog${name}">
				<div>${msg}</div>

				<div class="srui_ft">
					<button class="srui_button srui_bg_white srui_color_black srui_border srui_cancel">取消</button>
					<button class="srui_button srui_bg_blue srui_border srui_ok">确定</button>
				</div>
			</div>
		`);

		$(document).on('click','.srui_ft .srui_cancel',function(){
			$(this).parent().parent().remove()
			$('#srui_tmbg').stop().animate({
				opacity:0
			},function(){
				$('#srui_tmbg').hide()
			})
		})
	}
	else{
		$('body').append('<div id="srui_tips_box" class="srui_color_white" data-name="'+ name +'"><span>' + msg + '</span></div>');
	}

	if(black){
		if($('#srui_tmbg').length){
			$('#srui_tmbg').css({
				'opacity':'0.4',
				'display':'block'
			})
		}
		else{
			$('body').append('<div id="srui_tmbg"></div>');
			$('#srui_tmbg').css({
				'opacity':'0.4',
				'display':'block'
			})
		}
	}
	let obj=$('#srui_tips_box[data-name="'+ name +'"]')
	if(type == "dialog"){
		obj=$('#srui_tips_box[data-name="dialog'+ name +'"]')
	}

		obj.css({
			'opacity':'1'
		}).stop().animate({
			top:'40%',
			width:'auto',
			height:'auto'			
		});
	
		bg=bg==''?'blue':bg
		obj.addClass('srui_bg_'+bg)
		setTimeout(function(){
			$('#srui_tmbg').stop().animate({
				opacity:0
			})
			obj.stop().animate({
				opacity:0,
				top:'-40%'
			},function(){
				$('#srui_tmbg').hide()
				obj.remove()
				
			})
		},time)
}


//滚动到页面底部
function scrollToEnd(time=3000){
	var h = $(document).height()-$(window).height();
	if(time==0){
		$(document).scrollTop(h); 
	}
	else{
		//平滑滚动特效
		$('html,body').animate({scrollTop: h +"px"}, time);
	}
}

// 去掉空格
function trim(s){
	return s.replace(/(^\s*)|(\s*$)/g, "");
}

function imgUrl_webp(img){
	if(img.indexOf('//')==0){
		img='https:'+img;
	}
	
	if(img.indexOf('_.webp')>0){
		img=img.replace('_.webp','');
	}
	return img;
}


// 数组内json格式，判断是否存在某值
// 存在则返回 索引值，不存在则返回 -1
function ifArrHasJSON(arr,key,value){
	if(arr.length){
		for(var i = 0;i < arr.length;i++){
				if(arr[i][key] == value){
						return i;//存在
				}
		}
	}
	return -1;//不存在
}

// 数组内的json格式，删除某个值
// 传2个参数，则第二个为index，根据索引删除
// 传3个参数，则第二个为json的key，第三个为value,根据key和value来删除
function deleteValueInJsonArray(arr) {
	if(arguments.length){
		let l=arguments.length
		if(l == 2){
			let index=arguments[1]
			arr=arr.filter((x,i)=>i!=index)
		}
		else if(l == 3){
			let key=arguments[1]
			let value=arguments[2]
			arr=arr.filter((x,i)=>x[key]!=value)
		}
	}
	return arr
}




// 取网址内的get参数
function getUrlParam(name,url=null) {
		url=url || window.location.href
		url=decodeURIComponent(url)
		let reg = new RegExp("([(^|&)|(\?)])" + name + "=([^&]*)(&|$)");
		let r = url.substr(1).match(reg);
		if (r != null) return unescape(r[2]) ; return null; 
}


// 取数组最小值 最大值 平均值，默认为取平均数
function arr_math(arr,type='ave') {
	switch (type) {
		case 'max':
			return Math.max.apply(null, arr);
			break;
		case 'min':
			return Math.min.apply(null, arr);
			break;
	
		default:
				let sum = eval(arr.join("+"));
				return ~~(sum / arr.length * 100) / 100;
			break;
	}	
}


// 取2个数之间的随机数
function my_ROUND(begin,end){
	begin=parseInt(begin)
	end=parseInt(end)
	return Math.round(Math.random()*(end-begin)+begin);
}
// 取1个随机2位数
function my_ROUND_2(){
	return Math.floor(Math.random()*90+10)
}

/*
** 生成任意长度随机字母数字组合

** randomFlag -是否任意长度 
** min        -任意长度最小位[固定位数] 
** max        -任意长度最大位

** 使用方法
** 生成3-32位随机串：randomWord(true, 3, 32)
** 生成43位随机串：randomWord(false, 43)
*/
 
function randomWord(randomFlag, min, max){
	let str = "",
			range = min,
			arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V','W', 'X', 'Y', 'Z'];

	// 随机产生
	if(randomFlag){
			range = Math.round(Math.random() * (max-min)) + min;
	}
	for(var i=0; i<range; i++){
			pos = Math.round(Math.random() * (arr.length-1));
			str += arr[pos];
	}
	return str;
}



// 模拟填充input
function setInputValue(a,b){
	var c = new CustomEvent("change", {
							bubbles: !0
					});
	
	c.simulated = !0;
	if(a.length){
		a.val(b)[0].dispatchEvent(c);
		a.focus().blur()
	}
}

// 统计字符数量
function strlen(str){
  var len = 0;
  for (var i=0; i<str.length; i++) { 
   var c = str.charCodeAt(i); 
  //单字节加1
   if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) { 
     len++; 
   } 
   else { 
    len+=2; 
   } 
  } 
  return len;
}

// 等待几毫秒
function sleep(minsecond) {
	  return new Promise(res=>{
		setTimeout(() => {
		  res()
		}, minsecond);
	  })
}
var jiance
// 等待元素出现
function waitdom(dom) {
	jiance && clearInterval(jiance)
	return new Promise(res =>{
		let max = 20
		jiance = setInterval(() => {
			if($(dom).length){
				clearInterval(jiance)
				res(true)
			}
			else if(max<=0){
				clearInterval(jiance)
				res(false)
			}
			max--
		}, 500);
	})
}
// 等待执行点击事件
async function wait_click(dom,time=500) {
	await waitdom(dom)    
	console.log(dom);
	return new Promise(res =>{
	$(dom).click()
	setTimeout(() => {          
		res()
	}, time);
	
	})
}