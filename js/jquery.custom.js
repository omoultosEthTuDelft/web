$(document).ready(function() {

/***************************************************
		FORM VALIDATION JAVASCRIPT
***************************************************/
$(document).ready(function() {
	$('form.form-horizontal').submit(function() {
		$('form.form-horizontal .error').remove();
		var hasError = false;
		$('.requiredField').each(function() {
			if(jQuery.trim($(this).val()) == '') {
            	var labelText = $(this).prev('label').text();
            	$(this).parent().append('<span class="error">Please enter your '+labelText+'</span>');
            	$(this).addClass('inputError');
            	hasError = true;
            } else if($(this).hasClass('email')) {
            	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            	if(!emailReg.test(jQuery.trim($(this).val()))) {
            		var labelText = $(this).prev('label').text();
            		$(this).parent().append('<span class="error">Please a valid '+labelText+'</span>');
            		$(this).addClass('inputError');
            		hasError = true;
            	}
            }
		});
		if(!hasError) {
			$('form.form-horizontal input.submit').fadeOut('normal', function() {
				$(this).parent().append('');
			});
			var formInput = $(this).serialize();
			$.post($(this).attr('action'),formInput, function(data){
				$('form.form-horizontal').slideUp("fast", function() {
					$(this).before('<p class="success">Thank you!<br/>Your email was sent successfully.<br/>We will contact you as soon as possible.</p>');
				});
			});
		}

		return false;
	});
});

/***************************************************
		SCROLL TO
***************************************************/
	$('.brand a, .main-nav a, .scroll a, .scroll,  #to-top').live('click', function() {
		var thehref = $(this).attr('href');
		if ( thehref == '#intro' ) {
			$.scrollTo( 0, 800 );
		} else {
			$.scrollTo( thehref, 800, {offset:-95} );
		}
		return false;
	});
/**
 * Copyright (c) 2007-2012 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.3.1
 */
;(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,e,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

/***************************************************
		GOOGLE MAP
***************************************************/			
/*! jquery-ui-map rc1 | Johan Säll Larsson */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('(3(d){d.a=3(a,b){j c=a.v(".")[0],a=a.v(".")[1];d[c]=d[c]||{};d[c][a]=3(a,b){I.O&&2.1i(a,b)};d[c][a].K=d.n({1s:c,1u:a},b);d.N[a]=3(b){j g="1p"===1k b,f=L.K.X.W(I,1),i=2;l(g&&"1j"===b.1l(0,1))6 i;2.18(3(){j h=d.1b(2,a);h||(h=d.1b(2,a,k d[c][a](b,2)));g&&(i=h[b].14(h,f))});6 i}};d.a("1J.1G",{u:{1A:"1x",1y:5},1B:3(a,b){6 b?(2.u[a]=b,2.4("9").x(a,b),2):2.u[a]},1i:3(a,b){2.E=b;a=a||{};m.n(2.u,a,{1h:2.w(a.1h)});2.1g();2.1f&&2.1f()},1g:3(){j a=2;2.o={9:k 8.7.1D(a.E,a.u),M:[],p:[],q:[]};8.7.G.1C(a.o.9,"1F",3(){d(a.E).19("1E",a.o.9)});a.C(a.u.1t,a.o.9)},Z:3(a){j b=2.4("12",k 8.7.1z);b.n(2.w(a));2.4("9").1M(b);6 2},1L:3(a){j b=2.4("9").1O();6 b?b.1N(a.Y()):!1},1K:3(a,b){2.4("9").1H[b].J(2.F(a));6 2},1I:3(a,b){a.9=2.4("9");a.13=2.w(a.13);j c=k(a.1n||8.7.1o)(a),e=2.4("M");c.16?e[c.16]=c:e.J(c);c.12&&2.Z(c.Y());2.C(b,a.9,c);6 d(c)},z:3(a){2.B(2.4(a));2.x(a,[]);6 2},B:3(a){y(j b Q a)a.11(b)&&(a[b]r 8.7.17?(8.7.G.1v(a[b]),a[b].A&&a[b].A(t)):a[b]r L&&2.B(a[b]),a[b]=t)},1w:3(a,b,c){a=2.4(a);b.s=d.1m(b.s)?b.s:[b.s];y(j e Q a)l(a.11(e)){j g=!1,f;y(f Q b.s)l(-1<d.1r(b.s[f],a[e][b.1q]))g=!0;10 l(b.V&&"1P"===b.V){g=!1;2c}c(a[e],g)}6 2},4:3(a,b){j c=2.o;l(!c[a]){l(-1<a.2e(">")){y(j e=a.T(/ /g,"").v(">"),d=0;d<e.O;d++){l(!c[e[d]])l(b)c[e[d]]=d+1<e.O?[]:b;10 6 t;c=c[e[d]]}6 c}b&&!c[a]&&2.x(a,b)}6 c[a]},2g:3(a,b,c){j d=2.4("H",a.2f||k 8.7.2i);d.R(a);d.2h(2.4("9"),2.F(b));2.C(c,d);6 2},2b:3(){t!=2.4("H")&&2.4("H").2a();6 2},x:3(a,b){2.o[a]=b;6 2},2d:3(){j a=2.4("9"),b=a.2o();d(a).1e("2q");a.2p(b);6 2},2k:3(){2.z("M").z("q").z("p").B(2.o);m.2n(2.E,2.1W)},C:3(a){a&&d.1X(a)&&a.14(2,L.K.X.W(I,1))},w:3(a){l(!a)6 k 8.7.P(0,0);l(a r 8.7.P)6 a;a=a.T(/ /g,"").v(",");6 k 8.7.P(a[0],a[1])},F:3(a){6!a?t:a r m?a[0]:a r 1Q?a:d("#"+a)[0]},1S:3(a,b,c){j d=2,g=2.4("q > U",k 8.7.U),f=2.4("q > S",k 8.7.S);b&&f.R(b);g.1U(a,3(a,b){"1T"===b?(f.26(a),f.A(d.4("9"))):f.A(t);c(a,b)})},27:3(a,b){2.4("9").29(2.4("q > 1d",k 8.7.1d(2.F(a),b)))},28:3(a,b){2.4("q > 1a",k 8.7.1a).21(a,b)},20:3(a,b){j c=k 8.7[a](m.n({9:2.4("9")},b));2.4("p > "+a,[]).J(c);6 d(c)},22:3(a,b){(!b?2.4("p > D",k 8.7.D):2.4("p > D",k 8.7.D(b,a))).R(m.n({9:2.4("9")},a))},23:3(a,b,c){2.4("p > "+a,k 8.7.1Y(b,m.n({9:2.4("9")},c)))}});m.N.n({1e:3(a){8.7.G.19(2[0],a);6 2},15:3(a,b,c){8.7&&2[0]r 8.7.17?8.7.G.24(2[0],a,b):c?2.1c(a,b,c):2.1c(a,b);6 2}});m.18("25 1R 1Z 1V 2m 2l 2j".v(" "),3(a,b){m.N[b]=3(a,d){6 2.15(b,a,d)}})})(m);',62,151,'||this|function|get||return|maps|google|map||||||||||var|new|if|jQuery|extend|instance|overlays|services|instanceof|value|null|options|split|_latLng|set|for|clear|setMap|_c|_call|FusionTablesLayer|el|_unwrap|event|iw|arguments|push|prototype|Array|markers|fn|length|LatLng|in|setOptions|DirectionsRenderer|replace|DirectionsService|operator|call|slice|getPosition|addBounds|else|hasOwnProperty|bounds|position|apply|addEventListener|id|MVCObject|each|trigger|Geocoder|data|bind|StreetViewPanorama|triggerEvent|_init|_create|center|_setup|_|typeof|substring|isArray|marker|Marker|string|property|inArray|namespace|callback|pluginName|clearInstanceListeners|find|roadmap|zoom|LatLngBounds|mapTypeId|option|addListenerOnce|Map|init|bounds_changed|gmap|controls|addMarker|ui|addControl|inViewport|fitBounds|contains|getBounds|AND|Object|rightclick|displayDirections|OK|route|mouseover|name|isFunction|KmlLayer|dblclick|addShape|geocode|loadFusion|loadKML|addListener|click|setDirections|displayStreetView|search|setStreetView|close|closeInfoWindow|break|refresh|indexOf|infoWindow|openInfoWindow|open|InfoWindow|dragend|destroy|drag|mouseout|removeData|getCenter|setCenter|resize'.split('|'),0,{}))

/***************************************************
		GALLERY QUICKSAND
***************************************************/
var $filterType = $('#filterOptions li.active a').attr('class');
var $holder = $('ul.holder');
var $data = $holder.clone();

$('#filterOptions li a').click(function(e) {
	
	$('#filterOptions li').removeClass('active');
	
	var $filterType = $(this).attr('class');
	$(this).parent().addClass('active');
	
	if ($filterType == 'all') {
		var $filteredData = $data.find('li');
	} 
	else {
		var $filteredData = $data.find('li[data-type~=' + $filterType + ']');
	}
	
	// call quicksand
	$holder.quicksand($filteredData, {
		duration: 800,
		easing: 'easeInOutQuad'
		},
		function() {
			galleryHover();
	});
	return false;
});

/***************************************************
		TOOLTIP
***************************************************/
$("[rel=tooltip]").tooltip();
$("[rel=popover]").hover(function(){
	$(this).popover('toggle');
	});
	
/***************************************************
		BACK TO TOP
***************************************************/
	$('#to-top').hide();
	
	var offset = $(document).scrollTop();
	var offsetBottom = offset + ($(window).height() - 70);
		
	$('#to-top').css({
		'top':offsetBottom
	});
	if(offset > 10){
		$('#to-top').fadeIn(900);	
	}
	$(window).scroll(function(){
		
		var offset = $(document).scrollTop();
			offsetBottom = offset + ($(window).height() - 70);
		
		if(offset > 1){
			$('#to-top').fadeIn(900);	
		}
		else{
			$('#to-top').fadeOut(900);	
		}
			
		$('#to-top').animate({
			top:offsetBottom
		},{duration:500,queue:false});
	});
	
/***************************************************
		FANCYBOX
***************************************************/
 /*! fancyBox v2.0.3 fancyapps.com | fancyapps.com/fancybox/#license */
(function(r,n,d){var i=d(r),o=d(n),a=d.fancybox=function(){a.open.apply(this,arguments)},p=!1,q=null;d.extend(a,{version:"2.0.3",defaults:{padding:15,margin:20,width:800,height:600,minWidth:200,minHeight:200,maxWidth:9999,maxHeight:9999,autoSize:!0,fitToView:!0,aspectRatio:!1,topRatio:0.5,fixed:!d.browser.msie||6<d.browser.version,scrolling:"auto",wrapCSS:"fancybox-default",arrows:!0,closeBtn:!0,closeClick:!1,nextClick:!1,mouseWheel:!0,autoPlay:!1,playSpeed:3E3,modal:!1,loop:!0,ajax:{},keys:{next:[13,
32,34,39,40],prev:[8,33,37,38],close:[27]},index:0,type:null,href:null,content:null,title:null,tpl:{wrap:'<div class="fancybox-wrap"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div>',image:'<img class="fancybox-image" src="{href}" alt="" />',iframe:'<iframe class="fancybox-iframe" name="fancybox-frame{rnd}" frameborder="0" hspace="0" '+(d.browser.msie?'allowtransparency="true""':"")+' scrolling="{scrolling}" src="{href}"></iframe>',swf:'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="wmode" value="transparent" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{href}" /><embed src="{href}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="100%" height="100%" wmode="transparent"></embed></object>',
error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',closeBtn:'<div title="Close" class="fancybox-item fancybox-close"></div>',next:'<a title="Next" class="fancybox-item fancybox-next"><span></span></a>',prev:'<a title="Previous" class="fancybox-item fancybox-prev"><span></span></a>'},openEffect:"fade",openSpeed:500,openEasing:"swing",openOpacity:!0,openMethod:"zoomIn",closeEffect:"fade",closeSpeed:500,closeEasing:"swing",closeOpacity:!0,closeMethod:"zoomOut",
nextEffect:"elastic",nextSpeed:300,nextEasing:"swing",nextMethod:"changeIn",prevEffect:"elastic",prevSpeed:300,prevEasing:"swing",prevMethod:"changeOut",helpers:{overlay:{speedIn:0,speedOut:0,opacity:0.85,css:{cursor:"pointer","background-color":"rgba(0, 0, 0, 0.85)"},closeClick:!0},title:{type:"float"}}},group:{},opts:{},coming:null,current:null,isOpen:!1,isOpened:!1,wrap:null,outer:null,inner:null,player:{timer:null,isActive:!1},ajaxLoad:null,imgPreload:null,transitions:{},helpers:{},open:function(b,
c){d.isArray(b)||(b=[b]);if(b.length)a.close(!0),a.opts=d.extend(!0,{},a.defaults,c),a.group=b,a._start(a.opts.index||0)},cancel:function(){if(!(a.coming&&!1===a.trigger("onCancel"))&&(a.coming=null,a.hideLoading(),a.ajaxLoad&&a.ajaxLoad.abort(),a.ajaxLoad=null,a.imgPreload))a.imgPreload.onload=a.imgPreload.onabort=a.imgPreload.onerror=null},close:function(b){a.cancel();if(a.current&&!1!==a.trigger("beforeClose"))a.unbindEvents(),!a.isOpen||b&&!0===b[0]?(d(".fancybox-wrap").stop().trigger("onReset").remove(),
a._afterZoomOut()):(a.isOpen=a.isOpened=!1,d(".fancybox-item").remove(),a.wrap.stop(!0).removeClass("fancybox-opened"),a.inner.css("overflow","hidden"),a.transitions[a.current.closeMethod]())},play:function(b){var c=function(){clearTimeout(a.player.timer)},e=function(){c();if(a.current&&a.player.isActive)a.player.timer=setTimeout(a.next,a.current.playSpeed)},g=function(){c();d("body").unbind(".player");a.player.isActive=!1;a.trigger("onPlayEnd")};if(a.player.isActive||b&&!1===b[0])g();else if(a.current&&
(a.current.loop||a.current.index<a.group.length-1))a.player.isActive=!0,e(),d("body").bind({"onCancel.player afterShow.player onUpdate.player":e,"beforeClose.player":g,"beforeLoad.player":c}),a.trigger("onPlayStart")},next:function(){a.current&&a.jumpto(a.current.index+1)},prev:function(){a.current&&a.jumpto(a.current.index-1)},jumpto:function(b){a.current&&(b=parseInt(b,10),1<a.group.length&&a.current.loop&&(b>=a.group.length?b=0:0>b&&(b=a.group.length-1)),"undefined"!==typeof a.group[b]&&(a.cancel(),
a._start(b)))},reposition:function(b){a.isOpen&&a.wrap.css(a._getPosition(b))},update:function(){a.isOpen&&(p||(q=setInterval(function(){if(p&&(p=!1,clearTimeout(q),a.current)){if(a.current.autoSize)a.inner.height("auto"),a.current.height=a.inner.height();a._setDimension();a.current.canGrow&&a.inner.height("auto");a.reposition();a.trigger("onUpdate")}},100)),p=!0)},toggle:function(){if(a.isOpen)a.current.fitToView=!a.current.fitToView,a.update()},hideLoading:function(){d("#fancybox-loading").remove()},
showLoading:function(){a.hideLoading();d('<div id="fancybox-loading"></div>').click(a.cancel).appendTo("body")},getViewport:function(){return{x:i.scrollLeft(),y:i.scrollTop(),w:i.width(),h:i.height()}},unbindEvents:function(){a.wrap&&a.wrap.unbind(".fb");o.unbind(".fb");i.unbind(".fb")},bindEvents:function(){var b=a.current,c=b.keys;b&&(i.bind("resize.fb, orientationchange.fb",a.update),c&&o.bind("keydown.fb",function(b){-1<d.inArray(b.target.tagName.toLowerCase(),["input","textarea","select","button"])||
(-1<d.inArray(b.keyCode,c.close)?(a.close(),b.preventDefault()):-1<d.inArray(b.keyCode,c.next)?(a.next(),b.preventDefault()):-1<d.inArray(b.keyCode,c.prev)&&(a.prev(),b.preventDefault()))}),d.fn.mousewheel&&b.mouseWheel&&1<a.group.length&&a.wrap.bind("mousewheel.fb",function(b,c){if(0===d(b.target).get(0).clientHeight||d(b.target).get(0).scrollHeight===d(b.target).get(0).clientHeight)b.preventDefault(),a[0<c?"prev":"next"]()}))},trigger:function(b){var c,e=-1<d.inArray(b,["onCancel","beforeLoad",
"afterLoad"])?"coming":"current";if(a[e]){d.isFunction(a[e][b])&&(c=a[e][b].apply(a[e],Array.prototype.slice.call(arguments,1)));if(!1===c)return!1;a[e].helpers&&d.each(a[e].helpers,function(c,e){if(e&&"undefined"!==typeof a.helpers[c]&&d.isFunction(a.helpers[c][b]))a.helpers[c][b](e)});d.event.trigger(b+".fb")}},isImage:function(a){return a&&a.match(/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i)},isSWF:function(a){return a&&a.match(/\.(swf)(.*)?$/i)},_start:function(b){var c=a.group[b]||null,e,g,h,f=d.extend(!0,
{},a.opts,d.isPlainObject(c)?c:{},{index:b,element:c});if("number"===typeof f.margin)f.margin=[f.margin,f.margin,f.margin,f.margin];f.modal&&d.extend(!0,f,{closeBtn:!1,closeClick:!1,nextClick:!1,arrows:!1,mouseWheel:!1,keys:null,helpers:{overlay:{css:{cursor:"auto"},closeClick:!1}}});a.coming=f;if(!1===a.trigger("beforeLoad"))a.coming=null;else{if("object"===typeof c&&(c.nodeType||c instanceof d))e=!0,f.href=d(c).attr("href")||f.href,f.title=d(c).attr("title")||f.title,d.metadata&&d.extend(f,d(c).metadata());
g=f.type;b=f.href;if(!g)e&&(h=d(c).data("fancybox-type"),!h&&c.className&&(h=(h=c.className.match(/fancybox\.(\w+)/))?h[1]:!1)),h?g=h:b&&(a.isImage(b)?g="image":a.isSWF(b)?g="swf":b.match(/^#/)&&(g="inline")),g||(g=e?"inline":"html"),f.type=g;if("inline"===g||"html"===g){if(!f.content)f.content="inline"===g&&b?d(b):c;f.content.length||(g=null)}else f.href=b||c,f.href||(g=null);f.group=a.group;"image"===g?a._loadImage():"ajax"===g?a._loadAjax():g?a._afterLoad():a._error()}},_error:function(){a.coming.type=
"html";a.coming.minHeight=0;a.coming.autoSize=!0;a.coming.content=a.coming.tpl.error;a._afterLoad()},_loadImage:function(){a.imgPreload=new Image;a.imgPreload.onload=function(){this.onload=this.onerror=null;a.coming.width=this.width;a.coming.height=this.height;a._afterLoad()};a.imgPreload.onerror=function(){this.onload=this.onerror=null;a._error()};a.imgPreload.src=a.coming.href;a.imgPreload.complete||a.showLoading()},_loadAjax:function(){a.showLoading();a.ajaxLoad=d.ajax(d.extend({},a.coming.ajax,
{url:a.coming.href,error:function(b,c,e){"abort"!==c?(a.coming.content=e,a._error()):a.hideLoading()},success:function(b,c){if("success"===c)a.coming.content=b,a._afterLoad()}}))},_afterLoad:function(){a.hideLoading();!a.coming||!1===a.trigger("afterLoad",a.current)?a.coming=!1:(a.isOpened?(d(".fancybox-item").remove(),a.wrap.stop(!0).removeClass("fancybox-opened"),a.inner.css("overflow","hidden"),a.transitions[a.current.prevMethod]()):(d(".fancybox-wrap").stop().trigger("onReset").remove(),a.trigger("afterClose")),
a.unbindEvents(),a.isOpen=!1,a.current=a.coming,a.coming=!1,a.wrap=d(a.current.tpl.wrap).addClass("fancybox-tmp "+a.current.wrapCSS).appendTo("body"),a.outer=d(".fancybox-outer",a.wrap).css("padding",a.current.padding+"px"),a.inner=d(".fancybox-inner",a.wrap),a._setContent(),a.trigger("beforeShow"),a._setDimension(),a.wrap.hide().removeClass("fancybox-tmp"),a.bindEvents(),a.transitions[a.isOpened?a.current.nextMethod:a.current.openMethod]())},_setContent:function(){var b,c,e=a.current,g=e.type;switch(g){case "inline":case "ajax":case "html":"inline"===
g?(b=e.content.show().detach(),b.parent().hasClass("fancybox-inner")&&b.parents(".fancybox-wrap").trigger("onReset").remove(),d(a.wrap).bind("onReset",function(){b.appendTo("body").hide()})):b=e.content;if(e.autoSize)c=d('<div class="fancybox-tmp"></div>').appendTo(d("body")).append(b),e.width=c.outerWidth(),e.height=c.outerHeight(!0),b=c.contents().detach(),c.remove();break;case "image":b=e.tpl.image.replace("{href}",e.href);e.aspectRatio=!0;break;case "swf":b=e.tpl.swf.replace(/\{width\}/g,e.width).replace(/\{height\}/g,
e.height).replace(/\{href\}/g,e.href);break;case "iframe":b=e.tpl.iframe.replace("{href}",e.href).replace("{scrolling}",e.scrolling).replace("{rnd}",(new Date).getTime())}if(-1<d.inArray(g,["image","swf","iframe"]))e.autoSize=!1,e.scrolling=!1;a.inner.append(b)},_setDimension:function(){var b=a.current,c=a.getViewport(),e=b.margin,g=2*b.padding,h=b.width+g,f=b.height+g,m=b.width/b.height,j=b.maxWidth,k=b.maxHeight,i=b.minWidth,l=b.minHeight;c.w-=e[1]+e[3];c.h-=e[0]+e[2];-1<h.toString().indexOf("%")&&
(h=c.w*parseFloat(h)/100);-1<f.toString().indexOf("%")&&(f=c.h*parseFloat(f)/100);b.fitToView&&(j=Math.min(c.w,j),k=Math.min(c.h,k));j=Math.max(i,j);k=Math.max(l,k);b.aspectRatio?(h>j&&(h=j,f=(h-g)/m+g),f>k&&(f=k,h=(f-g)*m+g),h<i&&(h=i,f=(h-g)/m+g),f<l&&(f=l,h=(f-g)*m+g)):(h=Math.max(i,Math.min(h,j)),f=Math.max(l,Math.min(f,k)));h=Math.round(h);f=Math.round(f);d(a.wrap.add(a.outer).add(a.inner)).width("auto").height("auto");a.inner.width(h-g).height(f-g);a.wrap.width(h);e=a.wrap.height();if(h>j||
e>k)for(;(h>j||e>k)&&h>i&&e>l;)f-=10,b.aspectRatio?(h=Math.round((f-g)*m+g),h<i&&(h=i,f=(h-g)/m+g)):h-=10,a.inner.width(h-g).height(f-g),a.wrap.width(h),e=a.wrap.height();b.dim={width:h,height:e};b.canGrow=b.autoSize&&f>l&&f<k;b.canShrink=!1;b.canExpand=!1;if(h-g<b.width||f-g<b.height)b.canExpand=!0;else if((h>c.w||e>c.h)&&h>i&&f>l)b.canShrink=!0;b=e-g;a.innerSpace=b-a.inner.height();a.outerSpace=b-a.outer.height()},_getPosition:function(b){var c=a.getViewport(),e=a.current.margin,d=a.wrap.width()+
e[1]+e[3],h=a.wrap.height()+e[0]+e[2],f={position:"absolute",top:e[0]+c.y,left:e[3]+c.x};if(a.current.fixed&&(!b||!1===b[0])&&h<=c.h&&d<=c.w)f={position:"fixed",top:e[0],left:e[3]};f.top=Math.ceil(Math.max(f.top,f.top+(c.h-h)*a.current.topRatio))+"px";f.left=Math.ceil(Math.max(f.left,f.left+0.5*(c.w-d)))+"px";return f},_afterZoomIn:function(){var b=a.current;a.isOpen=a.isOpened=!0;a.wrap.addClass("fancybox-opened").css("overflow","visible");a.update();a.inner.css("overflow","auto"===b.scrolling?"auto":
"yes"===b.scrolling?"scroll":"hidden");if(b.closeClick||b.nextClick)a.inner.bind("click.fb",b.nextClick?a.next:a.close);b.closeBtn&&d(a.current.tpl.closeBtn).appendTo(a.wrap).bind("click.fb",a.close);b.arrows&&1<a.group.length&&((b.loop||0<b.index)&&d(b.tpl.prev).appendTo(a.wrap).bind("click.fb",a.prev),(b.loop||b.index<a.group.length-1)&&d(b.tpl.next).appendTo(a.wrap).bind("click.fb",a.next));a.trigger("afterShow");if(a.opts.autoPlay&&!a.player.isActive)a.opts.autoPlay=!1,a.play()},_afterZoomOut:function(){a.trigger("afterClose");
a.wrap.trigger("onReset").remove();d.extend(a,{group:{},opts:{},current:null,isOpened:!1,isOpen:!1,wrap:null,outer:null,inner:null})}});a.transitions={getOrigPosition:function(){var b=a.current.element,c={},e=50,g=50,h;b&&b.nodeName&&d(b).is(":visible")?(h=d(b).find("img:first"),h.length?(c=h.offset(),e=h.outerWidth(),g=h.outerHeight()):c=d(b).offset()):(b=a.getViewport(),c.top=b.y+0.5*(b.h-g),c.left=b.x+0.5*(b.w-e));return c={top:Math.ceil(c.top)+"px",left:Math.ceil(c.left)+"px",width:Math.ceil(e)+
"px",height:Math.ceil(g)+"px"}},step:function(b,c){var e,d,h;if("width"===c.prop||"height"===c.prop)d=h=Math.ceil(b-2*a.current.padding),"height"===c.prop&&(e=(b-c.start)/(c.end-c.start),c.start>c.end&&(e=1-e),d-=a.innerSpace*e,h-=a.outerSpace*e),a.inner[c.prop](d),a.outer[c.prop](h)},zoomIn:function(){var b=a.current,c,e;c=b.dim;if("elastic"===b.openEffect){e=d.extend({},c,a._getPosition(!0));delete e.position;c=this.getOrigPosition();if(b.openOpacity)c.opacity=0,e.opacity=1;a.wrap.css(c).show().animate(e,
{duration:b.openSpeed,easing:b.openEasing,step:this.step,complete:a._afterZoomIn})}else a.wrap.css(d.extend({},c,a._getPosition())),"fade"===b.openEffect?a.wrap.fadeIn(b.openSpeed,a._afterZoomIn):(a.wrap.show(),a._afterZoomIn())},zoomOut:function(){var b=a.current,c;if("elastic"===b.closeEffect){"fixed"===a.wrap.css("position")&&a.wrap.css(a._getPosition(!0));c=this.getOrigPosition();if(b.closeOpacity)c.opacity=0;a.wrap.animate(c,{duration:b.closeSpeed,easing:b.closeEasing,step:this.step,complete:a._afterZoomOut})}else a.wrap.fadeOut("fade"===
b.closeEffect?b.closeSpeed:0,a._afterZoomOut)},changeIn:function(){var b=a.current,c;"elastic"===a.current.nextEffect?(c=a._getPosition(!0),c.opacity=0,c.top=parseInt(c.top,10)-200+"px",a.wrap.css(c).show().animate({opacity:1,top:"+=200px"},{duration:b.nextSpeed,complete:a._afterZoomIn})):(a.wrap.css(a._getPosition()),"fade"===b.nextEffect?a.wrap.hide().fadeIn(b.nextSpeed,a._afterZoomIn):(a.wrap.show(),a._afterZoomIn()))},changeOut:function(){function b(){d(this).trigger("onReset").remove()}a.wrap.removeClass("fancybox-opened");
"elastic"===a.current.prevEffect?a.wrap.animate({opacity:0,top:"+=200px"},{duration:a.current.prevSpeed,complete:b}):a.wrap.fadeOut("fade"===a.current.prevEffect?a.current.prevSpeed:0,b)}};a.helpers.overlay={overlay:null,update:function(){var a,c;this.overlay.width(0).height(0);d.browser.msie?(a=Math.max(n.documentElement.scrollWidth,n.body.scrollWidth),c=Math.max(n.documentElement.offsetWidth,n.body.offsetWidth),a=a<c?i.width():a):a=o.width();this.overlay.width(a).height(o.height())},beforeShow:function(b){if(!this.overlay)this.overlay=
d('<div id="fancybox-overlay"></div>').css(b.css||{background:"black"}).appendTo("body"),this.update(),b.closeClick&&this.overlay.bind("click.fb",a.close),i.bind("resize.fb",d.proxy(this.update,this)),this.overlay.fadeTo(b.speedIn||"fast",b.opacity||1)},onUpdate:function(){this.update()},afterClose:function(a){this.overlay&&this.overlay.fadeOut(a.speedOut||"fast",function(){d(this).remove()});this.overlay=null}};a.helpers.title={beforeShow:function(b){var c;if(c=a.current.title)c=d('<div class="fancybox-title fancybox-title-'+
b.type+'-wrap">'+c+"</div>").appendTo("body"),"float"===b.type&&(c.width(c.width()),c.wrapInner('<span class="child"></span>'),a.current.margin[2]+=Math.abs(parseInt(c.css("margin-bottom"),10))),c.appendTo("over"===b.type?a.inner:"outside"===b.type?a.wrap:a.outer)}};d.fn.fancybox=function(b){function c(b){var c=[],i=!1,j=d(this).data("fancybox-group");b.preventDefault();if("undefined"!==typeof j)i=j?"data-fancybox-group":!1;else if(this.rel&&""!==this.rel&&"nofollow"!==this.rel)j=this.rel,i="rel";
i&&(c=g.length?d(g).filter("["+i+'="'+j+'"]'):d("["+i+'="'+j+'"]'));c.length?(e.index=c.index(this),a.open(c.get(),e)):a.open(this,e);return!1}var e=b||{},g=this.selector||"";g?o.undelegate(g,"click.fb-start").delegate(g,"click.fb-start",c):d(this).unbind("click.fb-start").bind("click.fb-start",c);return this}})(window,document,jQuery);
$(document).ready(function() {
	$(".various").fancybox({
		maxWidth	: 800,
		maxHeight	: 600,
		fitToView	: false,
		width		: '70%',
		height		: '70%',
		autoSize	: false,
		closeClick	: false,
		openEffect	: 'fade',
		openSpeed: 500,
			openEasing: 'easeInQuad',
			openOpacity: true,
			openMethod: 'zoomIn',
		closeEffect	: 'none'
	});
});
$(".fancybox-effects").fancybox({
				padding: 0,
				closeClick : true,
				helpers : {
					speedOut : 0
				}
			});
			
			});
 
/***************************************************
		GALLERY
***************************************************/
(function(a){var r=a.fn.domManip,d="_tmplitem",q=/^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,b={},f={},e,p={key:0,data:{}},h=0,c=0,l=[];function g(e,d,g,i){var c={data:i||(d?d.data:{}),_wrap:d?d._wrap:null,tmpl:null,parent:d||null,nodes:[],calls:u,nest:w,wrap:x,html:v,update:t};e&&a.extend(c,e,{nodes:[],parent:d});if(g){c.tmpl=g;c._ctnt=c._ctnt||c.tmpl(a,c);c.key=++h;(l.length?f:b)[h]=c}return c}a.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(f,d){a.fn[f]=function(n){var g=[],i=a(n),k,h,m,l,j=this.length===1&&this[0].parentNode;e=b||{};if(j&&j.nodeType===11&&j.childNodes.length===1&&i.length===1){i[d](this[0]);g=this}else{for(h=0,m=i.length;h<m;h++){c=h;k=(h>0?this.clone(true):this).get();a.fn[d].apply(a(i[h]),k);g=g.concat(k)}c=0;g=this.pushStack(g,f,i.selector)}l=e;e=null;a.tmpl.complete(l);return g}});a.fn.extend({tmpl:function(d,c,b){return a.tmpl(this[0],d,c,b)},tmplItem:function(){return a.tmplItem(this[0])},template:function(b){return a.template(b,this[0])},domManip:function(d,l,j){if(d[0]&&d[0].nodeType){var f=a.makeArray(arguments),g=d.length,i=0,h;while(i<g&&!(h=a.data(d[i++],"tmplItem")));if(g>1)f[0]=[a.makeArray(d)];if(h&&c)f[2]=function(b){a.tmpl.afterManip(this,b,j)};r.apply(this,f)}else r.apply(this,arguments);c=0;!e&&a.tmpl.complete(b);return this}});a.extend({tmpl:function(d,h,e,c){var j,k=!c;if(k){c=p;d=a.template[d]||a.template(null,d);f={}}else if(!d){d=c.tmpl;b[c.key]=c;c.nodes=[];c.wrapped&&n(c,c.wrapped);return a(i(c,null,c.tmpl(a,c)))}if(!d)return[];if(typeof h==="function")h=h.call(c||{});e&&e.wrapped&&n(e,e.wrapped);j=a.isArray(h)?a.map(h,function(a){return a?g(e,c,d,a):null}):[g(e,c,d,h)];return k?a(i(c,null,j)):j},tmplItem:function(b){var c;if(b instanceof a)b=b[0];while(b&&b.nodeType===1&&!(c=a.data(b,"tmplItem"))&&(b=b.parentNode));return c||p},template:function(c,b){if(b){if(typeof b==="string")b=o(b);else if(b instanceof a)b=b[0]||{};if(b.nodeType)b=a.data(b,"tmpl")||a.data(b,"tmpl",o(b.innerHTML));return typeof c==="string"?(a.template[c]=b):b}return c?typeof c!=="string"?a.template(null,c):a.template[c]||a.template(null,q.test(c)?c:a(c)):null},encode:function(a){return(""+a).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")}});a.extend(a.tmpl,{tag:{tmpl:{_default:{$2:"null"},open:"if($notnull_1){_=_.concat($item.nest($1,$2));}"},wrap:{_default:{$2:"null"},open:"$item.calls(_,$1,$2);_=[];",close:"call=$item.calls();_=call._.concat($item.wrap(call,_));"},each:{_default:{$2:"$index, $value"},open:"if($notnull_1){$.each($1a,function($2){with(this){",close:"}});}"},"if":{open:"if(($notnull_1) && $1a){",close:"}"},"else":{_default:{$1:"true"},open:"}else if(($notnull_1) && $1a){"},html:{open:"if($notnull_1){_.push($1a);}"},"=":{_default:{$1:"$data"},open:"if($notnull_1){_.push($.encode($1a));}"},"!":{open:""}},complete:function(){b={}},afterManip:function(f,b,d){var e=b.nodeType===11?a.makeArray(b.childNodes):b.nodeType===1?[b]:[];d.call(f,b);m(e);c++}});function i(e,g,f){var b,c=f?a.map(f,function(a){return typeof a==="string"?e.key?a.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g,"$1 "+d+'="'+e.key+'" $2'):a:i(a,e,a._ctnt)}):e;if(g)return c;c=c.join("");c.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/,function(f,c,e,d){b=a(e).get();m(b);if(c)b=j(c).concat(b);if(d)b=b.concat(j(d))});return b?b:j(c)}function j(c){var b=document.createElement("div");b.innerHTML=c;return a.makeArray(b.childNodes)}function o(b){return new Function("jQuery","$item","var $=jQuery,call,_=[],$data=$item.data;with($data){_.push('"+a.trim(b).replace(/([\\'])/g,"\\$1").replace(/[\r\t\n]/g," ").replace(/\$\{([^\}]*)\}/g,"{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,function(m,l,j,d,b,c,e){var i=a.tmpl.tag[j],h,f,g;if(!i)throw"Template command not found: "+j;h=i._default||[];if(c&&!/\w$/.test(b)){b+=c;c=""}if(b){b=k(b);e=e?","+k(e)+")":c?")":"";f=c?b.indexOf(".")>-1?b+c:"("+b+").call($item"+e:b;g=c?f:"(typeof("+b+")==='function'?("+b+").call($item):("+b+"))"}else g=f=h.$1||"null";d=k(d);return"');"+i[l?"close":"open"].split("$notnull_1").join(b?"typeof("+b+")!=='undefined' && ("+b+")!=null":"true").split("$1a").join(g).split("$1").join(f).split("$2").join(d?d.replace(/\s*([^\(]+)\s*(\((.*?)\))?/g,function(d,c,b,a){a=a?","+a+")":b?")":"";return a?"("+c+").call($item"+a:d}):h.$2||"")+"_.push('"})+"');}return _;")}function n(c,b){c._wrap=i(c,true,a.isArray(b)?b:[q.test(b)?b:a(b).html()]).join("")}function k(a){return a?a.replace(/\\'/g,"'").replace(/\\\\/g,"\\"):null}function s(b){var a=document.createElement("div");a.appendChild(b.cloneNode(true));return a.innerHTML}function m(o){var n="_"+c,k,j,l={},e,p,i;for(e=0,p=o.length;e<p;e++){if((k=o[e]).nodeType!==1)continue;j=k.getElementsByTagName("*");for(i=j.length-1;i>=0;i--)m(j[i]);m(k)}function m(j){var p,i=j,k,e,m;if(m=j.getAttribute(d)){while(i.parentNode&&(i=i.parentNode).nodeType===1&&!(p=i.getAttribute(d)));if(p!==m){i=i.parentNode?i.nodeType===11?0:i.getAttribute(d)||0:0;if(!(e=b[m])){e=f[m];e=g(e,b[i]||f[i],null,true);e.key=++h;b[h]=e}c&&o(m)}j.removeAttribute(d)}else if(c&&(e=a.data(j,"tmplItem"))){o(e.key);b[e.key]=e;i=a.data(j.parentNode,"tmplItem");i=i?i.key:0}if(e){k=e;while(k&&k.key!=i){k.nodes.push(j);k=k.parent}delete e._ctnt;delete e._wrap;a.data(j,"tmplItem",e)}function o(a){a=a+n;e=l[a]=l[a]||g(e,b[e.parent.key+n]||e.parent,null,true)}}}function u(a,d,c,b){if(!a)return l.pop();l.push({_:a,tmpl:d,item:this,data:c,options:b})}function w(d,c,b){return a.tmpl(a.template(d),c,b,this)}function x(b,d){var c=b.options||{};c.wrapped=d;return a.tmpl(a.template(b.tmpl),b.data,c,b.item)}function v(d,c){var b=this._wrap;return a.map(a(a.isArray(b)?b.join(""):b).filter(d||"*"),function(a){return c?a.innerText||a.textContent:a.outerHTML||s(a)})}function t(){var b=this.nodes;a.tmpl(null,null,null,this).insertBefore(b[0]);a(b).remove()}})(jQuery)

$(function () {
	// ======================= imagesLoaded Plugin ===============================
	// https://github.com/desandro/imagesloaded
	// $('#my-container').imagesLoaded(myFunction)
	// execute a callback when all images have loaded.
	// needed because .load() doesn't work on cached images
	// callback function gets image collection as argument
	//  this is the container
	// original: mit license. paul irish. 2010.
	// contributors: Oren Solomianik, David DeSandro, Yiannis Chatzikonstantinou
	$.fn.imagesLoaded = function (callback) {
		var $images = this.find('img'),
			len = $images.length,
			_this = this,
			blank = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

		function triggerCallback() {
			callback.call(_this, $images);
		}

		function imgLoaded() {
			if(--len <= 0 && this.src !== blank) {
				setTimeout(triggerCallback);
				$images.off('load error', imgLoaded);
			}
		}
		if(!len) {
			triggerCallback();
		}
		$images.on('load error', imgLoaded).each(function () {
			// cached images don't fire load sometimes, so we reset src.
			if(this.complete || this.complete === undefined) {
				var src = this.src;
				// webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
				// data uri bypasses webkit log warning (thx doug jones)
				this.src = blank;
				this.src = src;
			}
		});
		return this;
	};
	// gallery container
	var $rgGallery = $('#rg-gallery'),
		// carousel container
		$esCarousel = $rgGallery.find('div.es-carousel-wrapper'),
		// the carousel items
		$items = $esCarousel.find('ul > li'),
		// total number of items
		itemsCount = $items.length;
	Gallery = (function () {
		// index of the current item
		var current = 0,
			// mode : carousel || fullview
			mode = 'carousel',
			// control if one image is being loaded
			anim = false,
			init = function () {
				// (not necessary) preloading the images here...
				$items.add('<img src="images/ajax-loader.gif"/><img src="images/black.png"/>').imagesLoaded(function () {
					// add options
					_addViewModes();
					// add large image wrapper
					_addImageWrapper();
					// show first image
					_showImage($items.eq(current));
				});
				// initialize the carousel
				if(mode === 'carousel') _initCarousel();
			},
			_initCarousel = function () {
				// we are using the elastislide plugin:
				// http://tympanus.net/codrops/2011/09/12/elastislide-responsive-carousel/
				$esCarousel.show().elastislide({
					imageW: 65,
					onClick: function ($item) {
						if(anim) return false;
						anim = true;
						// on click show image
						_showImage($item);
						// change current
						current = $item.index();
					}
				});
				// set elastislide's current to current
				$esCarousel.elastislide('setCurrent', current);
			},
			_addViewModes = function () {
				// top right buttons: hide / show carousel
				var $viewfull = $('<a href="#" class="rg-view-full"></a>'),
					$viewthumbs = $('<a href="#" class="rg-view-thumbs rg-view-selected"></a>');
				$rgGallery.prepend($('<div class="rg-view"/>').append($viewfull).append($viewthumbs));
				$viewfull.on('click.rgGallery', function (event) {
					if(mode === 'carousel') $esCarousel.elastislide('destroy');
					$esCarousel.hide();
					$viewfull.addClass('rg-view-selected');
					$viewthumbs.removeClass('rg-view-selected');
					mode = 'fullview';
					return false;
				});
				$viewthumbs.on('click.rgGallery', function (event) {
					_initCarousel();
					$viewthumbs.addClass('rg-view-selected');
					$viewfull.removeClass('rg-view-selected');
					mode = 'carousel';
					return false;
				});
				if(mode === 'fullview') $viewfull.trigger('click');
			},
			_addImageWrapper = function () {
				// adds the structure for the large image and the navigation buttons (if total items > 1)
				// also initializes the navigation events
				$('#img-wrapper-tmpl').tmpl({
					itemsCount: itemsCount
				}).appendTo($rgGallery);
				if(itemsCount > 1) {
					// addNavigation
					var $navPrev = $rgGallery.find('a.rg-image-nav-prev'),
						$navNext = $rgGallery.find('a.rg-image-nav-next'),
						$imgWrapper = $rgGallery.find('div.rg-image');
					$navPrev.on('click.rgGallery', function (event) {
						_navigate('left');
						return false;
					});
					$navNext.on('click.rgGallery', function (event) {
						_navigate('right');
						return false;
					});
					// add touchwipe events on the large image wrapper
					$imgWrapper.touchwipe({
						wipeLeft: function () {
							_navigate('right');
						},
						wipeRight: function () {
							_navigate('left');
						},
						preventDefaultEvents: false
					});
					$(document).on('keyup.rgGallery', function (event) {
						if(event.keyCode == 39) _navigate('right');
						else if(event.keyCode == 37) _navigate('left');
					});
				}
			},
			_navigate = function (dir) {
				// navigate through the large images
				if(anim) return false;
				anim = true;
				if(dir === 'right') {
					if(current + 1 >= itemsCount) current = 0;
					else ++current;
				} else if(dir === 'left') {
					if(current - 1 < 0) current = itemsCount - 1;
					else --current;
				}
				_showImage($items.eq(current));
			},
			_showImage = function ($item) {
				// shows the large image that is associated to the $item
				var $loader = $rgGallery.find('div.rg-loading').show();
				$items.removeClass('selected');
				$item.addClass('selected');
				var $thumb = $item.find('img'),
					largesrc = $thumb.data('large'),
					title = $thumb.data('description');
				$('<img/>').load(function () {
					$rgGallery.find('div.rg-image').empty().append('<img src="' + largesrc + '"/>');
					if(title) $rgGallery.find('div.rg-caption').show().children('p').empty().text(title);
					$loader.hide();
					if(mode === 'carousel') {
						$esCarousel.elastislide('reload');
						$esCarousel.elastislide('setCurrent', current);
					}
					anim = false;
				}).attr('src', largesrc);
			},
			addItems = function ($new) {
				$esCarousel.find('ul').append($new);
				$items = $items.add($($new));
				itemsCount = $items.length;
				$esCarousel.elastislide('add', $new);
			};
		return {
			init: init,
			addItems: addItems
		};
	})();
	Gallery.init();
	/*
	Example to add more items to the gallery:
	
	var $new  = $('<li><a href="#"><img src="images/thumbs/1.jpg" data-large="images/1.jpg" alt="image01" data-description="From off a hill whose concave womb reworded" /></a></li>');
	Gallery.addItems( $new );
	*/
});

/***
 * Twitter JS v2.0.0
 * http://code.google.com/p/twitterjs/
 * Copyright (c) 2009 Remy Sharp / MIT License
 * $Date$
 */
 /*
  MIT (MIT-LICENSE.txt)
 */
typeof getTwitters!="function"&&function(){var a={},b=0;!function(a,b){function m(a){l=1;while(a=c.shift())a()}var c=[],d,e,f=!1,g=b.documentElement,h=g.doScroll,i="DOMContentLoaded",j="addEventListener",k="onreadystatechange",l=/^loade|c/.test(b.readyState);b[j]&&b[j](i,e=function(){b.removeEventListener(i,e,f),m()},f),h&&b.attachEvent(k,d=function(){/^c/.test(b.readyState)&&(b.detachEvent(k,d),m())}),a.domReady=h?function(b){self!=top?l?b():c.push(b):function(){try{g.doScroll("left")}catch(c){return setTimeout(function(){a.domReady(b)},50)}b()}()}:function(a){l?a():c.push(a)}}(a,document),window.getTwitters=function(c,d,e,f){b++,typeof d=="object"&&(f=d,d=f.id,e=f.count),e||(e=1),f?f.count=e:f={},!f.timeout&&typeof f.onTimeout=="function"&&(f.timeout=10),typeof f.clearContents=="undefined"&&(f.clearContents=!0),f.twitterTarget=c,typeof f.enableLinks=="undefined"&&(f.enableLinks=!0),a.domReady(function(a,b){return function(){function f(){a.target=document.getElementById(a.twitterTarget);if(!!a.target){var f={limit:e};f.includeRT&&(f.include_rts=!0),a.timeout&&(window["twitterTimeout"+b]=setTimeout(function(){twitterlib.cancel(),a.onTimeout.call(a.target)},a.timeout*1e3));var g="timeline";d.indexOf("#")===0&&(g="search"),d.indexOf("/")!==-1&&(g="list"),a.ignoreReplies&&(f.filter={not:new RegExp(/^@/)}),twitterlib.cache(!0),twitterlib[g](d,f,function(d,e){clearTimeout(window["twitterTimeout"+b]);var f=[],g=d.length>a.count?a.count:d.length;f=["<ul>"];for(var h=0;h<g;h++){d[h].time=twitterlib.time.relative(d[h].created_at);for(var i in d[h].user)d[h]["user_"+i]=d[h].user[i];a.template?f.push("<li>"+a.template.replace(/%([a-z_\-\.]*)%/ig,function(b,c){var e=d[h][c]+""||"";c=="text"&&(e=twitterlib.expandLinks(d[h])),c=="text"&&a.enableLinks&&(e=twitterlib.ify.clean(e));return e})+"</li>"):a.bigTemplate?f.push(twitterlib.render(d[h])):f.push(c(d[h]))}f.push("</ul>"),a.clearContents?a.target.innerHTML=f.join(""):a.target.innerHTML+=f.join(""),a.callback&&a.callback(d)})}}function c(b){var c=a.enableLinks?twitterlib.ify.clean(twitterlib.expandLinks(b)):twitterlib.expandLinks(b),d="<li>";a.prefix&&(d+='<li><span className="twitterPrefix">',d+=a.prefix.replace(/%(.*?)%/g,function(a,c){return b.user[c]}),d+=" </span></li>"),d+='<span className="twitterStatus">'+twitterlib.time.relative(b.created_at)+"</span> ",d+='<span className="twitterTime">'+b.text+"</span>",a.newwindow&&(d=d.replace(/<a href/gi,'<a target="_blank" href'));return d}typeof twitterlib=="undefined"?setTimeout(function(){var a=document.createElement("script");a.onload=a.onreadystatechange=function(){typeof window.twitterlib!="undefined"&&f()},a.src="http://remy.github.com/twitterlib/twitterlib.js";var b=document.head||document.getElementsByTagName("head")[0];b.insertBefore(a,b.firstChild)},0):f()}}(f,b))}}()

/* Modernizr 2.0.6 (Custom Build) | MIT & BSD */
;window.Modernizr=function(a,b,c){function D(a,b){var c=a.charAt(0).toUpperCase()+a.substr(1),d=(a+" "+o.join(c+" ")+c).split(" ");return C(d,b)}function C(a,b){for(var d in a)if(k[a[d]]!==c)return b=="pfx"?a[d]:!0;return!1}function B(a,b){return!!~(""+a).indexOf(b)}function A(a,b){return typeof a===b}function z(a,b){return y(n.join(a+";")+(b||""))}function y(a){k.cssText=a}var d="2.0.6",e={},f=!0,g=b.documentElement,h=b.head||b.getElementsByTagName("head")[0],i="modernizr",j=b.createElement(i),k=j.style,l,m=Object.prototype.toString,n=" -webkit- -moz- -o- -ms- -khtml- ".split(" "),o="Webkit Moz O ms Khtml".split(" "),p={},q={},r={},s=[],t=function(a,c,d,e){var f,h,j,k=b.createElement("div");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:i+(d+1),k.appendChild(j);f=["&shy;","<style>",a,"</style>"].join(""),k.id=i,k.innerHTML+=f,g.appendChild(k),h=c(k,a),k.parentNode.removeChild(k);return!!h},u=function(b){if(a.matchMedia)return matchMedia(b).matches;var c;t("@media "+b+" { #"+i+" { position: absolute; } }",function(b){c=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle).position=="absolute"});return c},v,w={}.hasOwnProperty,x;!A(w,c)&&!A(w.call,c)?x=function(a,b){return w.call(a,b)}:x=function(a,b){return b in a&&A(a.constructor.prototype[b],c)},p.rgba=function(){y("background-color:rgba(150,255,150,.5)");return B(k.backgroundColor,"rgba")},p.boxshadow=function(){return D("boxShadow")},p.csstransitions=function(){return D("transitionProperty")};for(var E in p)x(p,E)&&(v=E.toLowerCase(),e[v]=p[E](),s.push((e[v]?"":"no-")+v));e.addTest=function(a,b){if(typeof a=="object")for(var d in a)x(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return;b=typeof b=="boolean"?b:!!b(),g.className+=" "+(b?"":"no-")+a,e[a]=b}return e},y(""),j=l=null,a.attachEvent&&function(){var a=b.createElement("div");a.innerHTML="<elem></elem>";return a.childNodes.length!==1}()&&function(a,b){function s(a){var b=-1;while(++b<g)a.createElement(f[b])}a.iepp=a.iepp||{};var d=a.iepp,e=d.html5elements||"abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",f=e.split("|"),g=f.length,h=new RegExp("(^|\\s)("+e+")","gi"),i=new RegExp("<(/*)("+e+")","gi"),j=/^\s*[\{\}]\s*$/,k=new RegExp("(^|[^\\n]*?\\s)("+e+")([^\\n]*)({[\\n\\w\\W]*?})","gi"),l=b.createDocumentFragment(),m=b.documentElement,n=m.firstChild,o=b.createElement("body"),p=b.createElement("style"),q=/print|all/,r;d.getCSS=function(a,b){if(a+""===c)return"";var e=-1,f=a.length,g,h=[];while(++e<f){g=a[e];if(g.disabled)continue;b=g.media||b,q.test(b)&&h.push(d.getCSS(g.imports,b),g.cssText),b="all"}return h.join("")},d.parseCSS=function(a){var b=[],c;while((c=k.exec(a))!=null)b.push(((j.exec(c[1])?"\n":c[1])+c[2]+c[3]).replace(h,"$1.iepp_$2")+c[4]);return b.join("\n")},d.writeHTML=function(){var a=-1;r=r||b.body;while(++a<g){var c=b.getElementsByTagName(f[a]),d=c.length,e=-1;while(++e<d)c[e].className.indexOf("iepp_")<0&&(c[e].className+=" iepp_"+f[a])}l.appendChild(r),m.appendChild(o),o.className=r.className,o.id=r.id,o.innerHTML=r.innerHTML.replace(i,"<$1font")},d._beforePrint=function(){p.styleSheet.cssText=d.parseCSS(d.getCSS(b.styleSheets,"all")),d.writeHTML()},d.restoreHTML=function(){o.innerHTML="",m.removeChild(o),m.appendChild(r)},d._afterPrint=function(){d.restoreHTML(),p.styleSheet.cssText=""},s(b),s(l);d.disablePP||(n.insertBefore(p,n.firstChild),p.media="print",p.className="iepp-printshim",a.attachEvent("onbeforeprint",d._beforePrint),a.attachEvent("onafterprint",d._afterPrint))}(a,b),e._version=d,e._prefixes=n,e._domPrefixes=o,e.mq=u,e.testProp=function(a){return C([a])},e.testAllProps=D,e.testStyles=t,g.className=g.className.replace(/\bno-js\b/,"")+(f?" js "+s.join(" "):"");return e}(this,this.document),function(a,b){function u(){r(!0)}a.respond={},respond.update=function(){},respond.mediaQueriesSupported=b;if(!b){var c=a.document,d=c.documentElement,e=[],f=[],g=[],h={},i=30,j=c.getElementsByTagName("head")[0]||d,k=j.getElementsByTagName("link"),l=[],m=function(){var b=k,c=b.length,d=0,e,f,g,i;for(;d<c;d++)e=b[d],f=e.href,g=e.media,i=e.rel&&e.rel.toLowerCase()==="stylesheet",!!f&&i&&!h[f]&&(!/^([a-zA-Z]+?:(\/\/)?(www\.)?)/.test(f)||f.replace(RegExp.$1,"").split("/")[0]===a.location.host?l.push({href:f,media:g}):h[f]=!0);n()},n=function(){if(l.length){var a=l.shift();s(a.href,function(b){o(b,a.href,a.media),h[a.href]=!0,n()})}},o=function(a,b,c){var d=a.match(/@media[^\{]+\{([^\{\}]+\{[^\}\{]+\})+/gi),g=d&&d.length||0,b=b.substring(0,b.lastIndexOf("/")),h=function(a){return a.replace(/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,"$1"+b+"$2$3")},i=!g&&c,j=0,k,l,m,n,o;b.length&&(b+="/"),i&&(g=1);for(;j<g;j++){k=0,i?(l=c,f.push(h(a))):(l=d[j].match(/@media ([^\{]+)\{([\S\s]+?)$/)&&RegExp.$1,f.push(RegExp.$2&&h(RegExp.$2))),n=l.split(","),o=n.length;for(;k<o;k++)m=n[k],e.push({media:m.match(/(only\s+)?([a-zA-Z]+)(\sand)?/)&&RegExp.$2,rules:f.length-1,minw:m.match(/\(min\-width:[\s]*([\s]*[0-9]+)px[\s]*\)/)&&parseFloat(RegExp.$1),maxw:m.match(/\(max\-width:[\s]*([\s]*[0-9]+)px[\s]*\)/)&&parseFloat(RegExp.$1)})}r()},p,q,r=function(a){var b="clientWidth",h=d[b],l=c.compatMode==="CSS1Compat"&&h||c.body[b]||h,m={},n=c.createDocumentFragment(),o=k[k.length-1],s=(new Date).getTime();if(a&&p&&s-p<i)clearTimeout(q),q=setTimeout(r,i);else{p=s;for(var t in e){var u=e[t];if(!u.minw&&!u.maxw||(!u.minw||u.minw&&l>=u.minw)&&(!u.maxw||u.maxw&&l<=u.maxw))m[u.media]||(m[u.media]=[]),m[u.media].push(f[u.rules])}for(var t in g)g[t]&&g[t].parentNode===j&&j.removeChild(g[t]);for(var t in m){var v=c.createElement("style"),w=m[t].join("\n");v.type="text/css",v.media=t,v.styleSheet?v.styleSheet.cssText=w:v.appendChild(c.createTextNode(w)),n.appendChild(v),g.push(v)}j.insertBefore(n,o.nextSibling)}},s=function(a,b){var c=t();if(!!c){c.open("GET",a,!0),c.onreadystatechange=function(){c.readyState==4&&(c.status==200||c.status==304)&&b(c.responseText)};if(c.readyState==4)return;c.send()}},t=function(){var a=!1,b=[function(){return new ActiveXObject("Microsoft.XMLHTTP")},function(){return new XMLHttpRequest}],c=b.length;while(c--){try{a=b[c]()}catch(d){continue}break}return function(){return a}}();m(),respond.update=m,a.addEventListener?a.addEventListener("resize",u,!1):a.attachEvent&&a.attachEvent("onresize",u)}}(this,Modernizr.mq("only all")),function(a,b,c){function k(a){return!a||a=="loaded"||a=="complete"}function j(){var a=1,b=-1;while(p.length- ++b)if(p[b].s&&!(a=p[b].r))break;a&&g()}function i(a){var c=b.createElement("script"),d;c.src=a.s,c.onreadystatechange=c.onload=function(){!d&&k(c.readyState)&&(d=1,j(),c.onload=c.onreadystatechange=null)},m(function(){d||(d=1,j())},H.errorTimeout),a.e?c.onload():n.parentNode.insertBefore(c,n)}function h(a){var c=b.createElement("link"),d;c.href=a.s,c.rel="stylesheet",c.type="text/css";if(!a.e&&(w||r)){var e=function(a){m(function(){if(!d)try{a.sheet.cssRules.length?(d=1,j()):e(a)}catch(b){b.code==1e3||b.message=="security"||b.message=="denied"?(d=1,m(function(){j()},0)):e(a)}},0)};e(c)}else c.onload=function(){d||(d=1,m(function(){j()},0))},a.e&&c.onload();m(function(){d||(d=1,j())},H.errorTimeout),!a.e&&n.parentNode.insertBefore(c,n)}function g(){var a=p.shift();q=1,a?a.t?m(function(){a.t=="c"?h(a):i(a)},0):(a(),j()):q=0}function f(a,c,d,e,f,h){function i(){!o&&k(l.readyState)&&(r.r=o=1,!q&&j(),l.onload=l.onreadystatechange=null,m(function(){u.removeChild(l)},0))}var l=b.createElement(a),o=0,r={t:d,s:c,e:h};l.src=l.data=c,!s&&(l.style.display="none"),l.width=l.height="0",a!="object"&&(l.type=d),l.onload=l.onreadystatechange=i,a=="img"?l.onerror=i:a=="script"&&(l.onerror=function(){r.e=r.r=1,g()}),p.splice(e,0,r),u.insertBefore(l,s?null:n),m(function(){o||(u.removeChild(l),r.r=r.e=o=1,j())},H.errorTimeout)}function e(a,b,c){var d=b=="c"?z:y;q=0,b=b||"j",C(a)?f(d,a,b,this.i++,l,c):(p.splice(this.i++,0,a),p.length==1&&g());return this}function d(){var a=H;a.loader={load:e,i:0};return a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=r&&!s,u=s?l:n.parentNode,v=a.opera&&o.call(a.opera)=="[object Opera]",w="webkitAppearance"in l.style,x=w&&"async"in b.createElement("script"),y=r?"object":v||x?"img":"script",z=w?"img":y,A=Array.isArray||function(a){return o.call(a)=="[object Array]"},B=function(a){return Object(a)===a},C=function(a){return typeof a=="string"},D=function(a){return o.call(a)=="[object Function]"},E=[],F={},G,H;H=function(a){function f(a){var b=a.split("!"),c=E.length,d=b.pop(),e=b.length,f={url:d,origUrl:d,prefixes:b},g,h;for(h=0;h<e;h++)g=F[b[h]],g&&(f=g(f));for(h=0;h<c;h++)f=E[h](f);return f}function e(a,b,e,g,h){var i=f(a),j=i.autoCallback;if(!i.bypass){b&&(b=D(b)?b:b[a]||b[g]||b[a.split("/").pop().split("?")[0]]);if(i.instead)return i.instead(a,b,e,g,h);e.load(i.url,i.forceCSS||!i.forceJS&&/css$/.test(i.url)?"c":c,i.noexec),(D(b)||D(j))&&e.load(function(){d(),b&&b(i.origUrl,h,g),j&&j(i.origUrl,h,g)})}}function b(a,b){function c(a){if(C(a))e(a,h,b,0,d);else if(B(a))for(i in a)a.hasOwnProperty(i)&&e(a[i],h,b,i,d)}var d=!!a.test,f=d?a.yep:a.nope,g=a.load||a.both,h=a.callback,i;c(f),c(g),a.complete&&b.load(a.complete)}var g,h,i=this.yepnope.loader;if(C(a))e(a,0,i,0);else if(A(a))for(g=0;g<a.length;g++)h=a[g],C(h)?e(h,0,i,0):A(h)?H(h):B(h)&&b(h,i);else B(a)&&b(a,i)},H.addPrefix=function(a,b){F[a]=b},H.addFilter=function(a){E.push(a)},H.errorTimeout=1e4,b.readyState==null&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",G=function(){b.removeEventListener("DOMContentLoaded",G,0),b.readyState="complete"},0)),a.yepnope=d()}(this,this.document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};


