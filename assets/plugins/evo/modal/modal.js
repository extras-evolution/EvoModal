var ET_modal;

(function($){
ET_modal = {
	data:{},
    defaults:
    {	tray:true,
        width: 700,
        height: 600,
        top: 60,
        left: 240,
        overlay: 0,
        iframe: false,
        url: '',
        title: '',
        beforeLoad: function () {},
		animationShow: function(modal){
			if ($(modal).data('gab')){	
				var gab = $(modal).data('gab');
				$(modal).css({opacity:0,display:'block'}).animate({
					width:gab.width,
					height:gab.height,
					top:gab.top,
					left:gab.left,
					opacity:1
				},300);
			}else{
				$(modal).css({opacity:0,display:'block'}).animate({opacity:1},300);
			}
		},
		animationHide: function(modal){
			var gab = {
				top:$(modal).position().top,
				left:$(modal).position().left,
				height:$(modal).height(),
				width:$(modal).width()
			}
			$(modal).data('gab',gab);
			
			var tray_pos = $('.element[modal="'+$(modal).data().el+'"]').position();
		
			$(modal).animate({
				width:100,
				height:25,
				top:$('.tray').position().top,
				left:tray_pos.left,
				opacity:0
			},300,function(){$(this).css({display:'none'})});
		},
		animationClose: function(el){
			$('#'+el).animate({opacity:0},300,function(){$(this).remove()});
			$('.element[modal="'+$('#'+el).attr('id')+'"]').animate({width:0},300,function(){ this.remove();})
		}
    },
    id: null,
    i: 0,
	toTop: function( modal ){
		var id = modal.attr('id');
		$('.element').removeClass('active');
		$('.element[modal="'+id+'"]').addClass('active');
		if ( modal.closest('.ETmodal').hasClass('active')) return;
		$('.ETmodal').removeClass('active');
		modal.closest('.ETmodal').css('z-index','9999').addClass('active');
		
		var i = 0;
		var arr=[];
		$('.ETmodal:visible').each(function(){
			//var sort = [];
			arr.push({z:$(this).css('z-index'),id:$(this).attr('id')});
			i++;
		});
		arr.sort(function(a,b){return a.z-b.z;});
	
		arr.forEach(function(el,i,ar){
			$('#' + el.id).css({'z-index':i+1000});
		});
	},
	init:function(data){
		$('body').append('<div id="ETcontainer"></div>');
		if (data.tray) $('body').append('<div class="tray"></div>');
		
		$(document).on('click','.ETtitle , .ETcontent , .ETmodal iframe',function(){ 
			EVO.modal.toTop( $(this).closest('.ETmodal') );
		});
		$('body').css('overflow', 'hidden');	
	},
	create:function( data ){
		$('#ETcontainer').append(this.tpl(data));
	},
	hide:function(data){
		if ( $('.element[modal="'+data.el+'"]').length < 1 && data.data.tray){
			$('.tray').append('<div class="element" modal="'+data.el+'"><div>'+$('#'+data.el).find('.ETtitle').find('h2').html()+'<span>&times;</span></div></div>');
			
			$('.element[modal="'+data.el+'"]').click(function(){  
				var modal = '#'+$(this).attr('modal');
				if ($(modal).css('display') != 'block') {
					$(modal).data().show($(modal).data().data) 
				}else{
					var max = 0;
					$('.ETmodal:visible').each(function(){
						var zi = $(this).css('z-index');
					   if (zi > max) max = zi;
					});
				
					if ($(modal).css('z-index') == max) {
						$(modal).data().hide($(modal).data())
					} else {
						EVO.modal.toTop( $(modal) );
					}
				}
			});
			
			$('.element[modal="'+data.el+'"]').find('span').click(function(){   
				$('#'+$(this).closest('.element').attr('modal')).data().data.animationClose($(this).closest('.element').attr('modal'));
			});
		}
		$('.element[modal="'+data.el+'"]').removeClass('active');
		data.data.animationHide('#'+data.el);
	},
    show: function (data)
    {
		if (!data) return null;
		var data = $.extend({}, this.defaults, data);
		if (!$('#ETcontainer').length) this.init(data);
        
		if (data.id && $("#ex" + data.id).length > 0){
            var modal = '#ex' + data.id;
			$(modal).data().data.animationShow( '#'+$(modal).data().el )
        } else {
            if (data.url) data.content = '<iframe  src="' + data.url + '" frameborder="0" width="100%" height="100%"></iframe>';
			this.create( data );
            var modal = '#ex' + this.id;
            $(modal).css({position: 'absolute',width: data.width,height: data.height,top: data.top,left: data.left }).jqDrag(".ETdrag").jqResize(".ETresize");
            
            data.beforeLoad(modal, data.code);
			data.animationShow(modal);
			data.id = this.id;
			this.el = 'ex'+this.id;
			this.data = data;
			
			$(modal).data(this);
			
			$(modal).on('click','.EThide',function(){ 
				var data = $(this).closest('.ETmodal').data();
				data.hide(data);
			});
			$(modal).on('click','.ETclose',function(){ 
				$(this).closest('.ETmodal').data().data.animationClose($(this).closest('.ETmodal').attr('id')); 
			});
			$(modal).find('iframe').load(function(){ 
				var modal = $(this).closest('.ETmodal');
				$(this).contents().on('click','body', function() {
					EVO.modal.toTop( modal );
				});
			});
        }
		
		EVO.modal.toTop($(modal))
        return modal;
    },
    tpl: function (data)
    {
        if (data.id){
            this.id = data.id;
        }else{
            this.i++;
            this.id = this.i;
        }
		
        var tpl = this.templates.modal;//$('#tpl_modal').html();
        return tpl.replace('%title%', data.title).replace('%id%', this.id).replace('%content%', data.content);
    },
    templates:
    {
        modal: '<div id="ex%id%" class="ETmodal">\
					<div class="ETtitle ETdrag"><h2>%title%</h2></div>\
					<div class="ETcontent">%content%</div>\
					<div class="ETactions">\
						<span class="EThide"><b> </b></span>\
						<span class="ETclose"><b> </b></span>\
					</div>\
					<div class="ETresize"></div>\
				</div>',
        buttons:
        {
            save: '',
            ok: '',
            cancel: ''
        }
    }
}


})(jQuery);



 /*
   * jqDnR-touch - Minimalistic Drag'n'Resize for jQuery.
   * Licensed under the MIT License: http://www.opensource.org/licenses/mit-license.php
   *
   * http://github.com/gaarf/jqDnR-touch
   *
   */
(function($){

  var DOWN = 'mousedown touchstart', 
      MOVE = 'mousemove touchmove', 
      STOP = 'mouseup touchend',
      E, M = {};

  function xy(v) {
    var y = v.pageY, 
        x = v.pageX, 
        t = v.originalEvent.targetTouches;
    if(t) {
      x = t[0]['pageX'];
      y = t[0]['pageY'];
    }
    return {x:x,y:y};
  }

  function toTop($e) {
    /*var z = 1;
    $e.siblings().each(function(){
      z = Math.max(parseInt($(this).css("z-index"),10) || 1,z);
    });*/
    return $e;/*.css('z-index', z+1);*/
  }

  function init(e,h,k) {
    return e.each( function() {
      var $box = $(this),
          $handle = (h) ? $(h,this).css('cursor',k) : $box;
      $handle.bind(DOWN, {e:$box,k:k}, onGripStart);
      if(k=='move') {
        $box.bind(DOWN,{},function(){toTop($box).trigger('jqDnRtop')});
      }
    });
  };
 function getZ(){
 
 }
 
 
  function onGripStart(v) {

  /* bumkaka add */
	$(v.data.e).closest('div').find('#ETcontent').append('<div class="blank" style="position:absolute;top:0;left:0;width:100%;height:100%"></div>');
	$('body').append('<div class="blank" style="z-index:9998;position:absolute;top:0;left:0;width:100%;height:100%"></div>');
	
	EVO.modal.toTop( $(v.data.e) );
	
	/*$('.ETmodal').removeClass('active');
	$(v.data.e).closest('div').css('z-index','9999').addClass('active');
				
	var i = 0;
	var arr=[];
	$('.ETmodal:visible').each(function(){
		var sort = [];
		arr.push({z:$(this).css('z-index'),id:$(this).attr('id')});
		i++;
	});
	arr.sort(function(a,b){return a.z-b.z;});
	
	
	arr.forEach(function(el,i,ar){
		$('#' + el.id).css({'z-index':i+1000});
	});
  /* ------------  */
    var p = xy(v), f = function(k) { return parseInt(E.css(k))||false; };
    E = toTop(v.data.e);
    M = {
      X:f('left')||0, Y:f('top')||0, 
      W:f('width')||E[0].scrollWidth||0, H:f('height')||E[0].scrollHeight||0,
      pX:p.x, pY:p.y, k:v.data.k, o:E.css('opacity')
    };
    E.css({opacity:0.9}).trigger('jqDnRstart');
    $(document).bind(MOVE,onGripDrag).bind(STOP,onGripEnd);
    return false;
  };

  function onGripDrag(v) {
    var p = xy(v);
    if(M.k == 'move') { 
      if(!E.css('position').match(/absolute|fixed/)) {
        E.css({position:'absolute'});
      }
      E.css({ left:M.X+p.x-M.pX, top:M.Y+p.y-M.pY } );
    }
    else { // resize
      E.css({ width:Math.max(p.x-M.pX+M.W,0), height:Math.max(p.y-M.pY+M.H,0) });
    }
    return false;
  };

  function onGripEnd() {
	$j('.blank').remove();
    $(document).unbind(MOVE,onGripDrag).unbind(STOP,onGripEnd);
    E.css({opacity:M.o}).trigger('jqDnRend');
  };

  $.fn.jqDrag = function(h) { return init(this, h, 'move'); };
  $.fn.jqResize = function(h) { return init(this, h, 'se-resize'); };

})(jQuery);