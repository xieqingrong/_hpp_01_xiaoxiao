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
});
$$('#totxt').on('click', function(){
	infiniteurl = infiniteurl1;
	infinitereset();
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
				
				console.log(ss.join(''));
			}else{
				myApp.detachInfiniteScroll($$('.infinite-scroll'));
			}
		}
	});
}

// infinite row
function infiniterow(item){
	var ss = [];

	ss.push('<div class="card ks-card-header-pic">');
	if(item.url){
		ss.push('	<div class="card-header color-white no-border lazy" valign="bottom" data-background="' + item.url + '">');
		ss.push('		' + item.content);
		ss.push('	</div>');
		ss.push('	<div class="card-content">');
		ss.push('		<div class="card-content-inner">');
		ss.push('			<p class="color-gray">' + item.updatetime + '</p>');
		ss.push('		</div>');
		ss.push('	</div>');
	}else{
		ss.push('	<div class="card-content">');
		ss.push('		<div class="card-content-inner">');
		ss.push('			<p class="color-gray">' + item.updatetime + '</p>');
		ss.push('			<p>' + item.content + '</p>');
		ss.push('		</div>');
		ss.push('	</div>');
	}
	ss.push('</div>');
	
	return ss.join('');
}