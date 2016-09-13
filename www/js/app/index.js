if(typeof StatusBar != 'undefined') StatusBar.backgroundColorByHexString('#2196f3');

// vars
var $$ = Dom7;
var myApp = new Framework7({
    modalTitle: '笑笑',
    material: true,
    onAjaxStart: function(){
    	myApp.showIndicator();
    },
    onAjaxComplete: function(){
    	myApp.hideIndicator();
    }
});
var mainView = myApp.addView('.view-main', {});

// binds
$$('.panel-left').on('open', function () {
    $$('.statusbar-overlay').addClass('with-panel-left');
});
$$('.panel-left').on('close', function () {
    $$('.statusbar-overlay').removeClass('with-panel-left with-panel-right');
});
$$('#toimg').on('click', function(){
	infiniteurl = infiniteurl2;
	infinitereset();
	$$('.icon-close').trigger('click');
});
$$('#totxt').on('click', function(){
	infiniteurl = infiniteurl1;
	infinitereset();
	$$('.icon-close').trigger('click');
});

// infinite scroll
var infinitepage 	= 1;
var infinitepagesize= 20;
var infinitekey		= 'abaf6784cfbed433873c724ebe5f6d5e';
var infiniteloading = false;
var infiniteurl		= 'http://japi.juhe.cn/joke/content/text.from';
var infiniteurl1	= 'http://japi.juhe.cn/joke/content/text.from';
var infiniteurl2	= 'http://japi.juhe.cn/joke/img/text.from';
$$('.infinite-scroll').on('infinite', infiniteit);
infinitereset();

// infinite reset
function infinitereset(){
	$$('.infinite-scroll').html('');
	infinitepage = 1;
	infiniteit();
}

// infinite it
function infiniteit(){
	if(infiniteloading) return;
	infiniteloading = true;
	myApp.showIndicator();
	
	$$.get(infiniteurl, {
		key : infinitekey,
		page : infinitepage,
		pagesize : infinitepagesize
	}, function(data) {
		infiniteloading = false;
		myApp.hideIndicator();
		
		if(data){
			var json = JSON.parse(data);
			if(json && json['error_code'] == 0){
				infinitepage++;
				
				var ss = [];
				for(var i=0; i<json.result.data.length; i++){
					ss.push(infiniterow(json.result.data[i]));
				}
				$$('.infinite-scroll').append(ss.join(''));
			}else{
				myApp.detachInfiniteScroll($$('.infinite-scroll'));
			}
		}
	});
}

// infinite row
function infiniterow(item){
	var ss = [];

	ss.push('<div class="card ks-facebook-card">');
	ss.push('	<div class="card-content">');
	ss.push('		<div class="card-content-inner">');
	ss.push('			<p>' + item.content + '</p>');
	if(item.url)
	ss.push('			<img src="' + item.url + '"/>');
	ss.push('			<p class="color-gray">' + item.updatetime + '</p>');
	ss.push('		</div>');
	ss.push('	</div>');
	ss.push('</div>');
	
	return ss.join('');
}