(function($){

"use strict";

$(document).ready(function() {


	var win_h = $(window).height(),
		win_w = $(window).width();

	$("body").queryLoader2({
		barColor: "#ffffff",
	    backgroundColor: "#121212",
	    percentage: true,
	    barHeight: 1,
	    fadeOutTime: 500,
	    maxTime: 500000,
	    onComplete: function(){
	    	show_bar();
	    	play_animation();
	    }
	});

	$("body").fitVids();

	if(!$(".gallery-masonry-h, .portfolio-striped, .page-fullscreen, .gallery-slideshow").is(':visible')) {

		$("body").imagesLoaded(function(){

			$("body").mCustomScrollbar({

				scrollInertia:800,
				mouseWheelPixels:400,
				contentTouchScroll: 400,
				keyboard:{ 
					enable: true,
					scrollAmount: 400,
					scrollType: "stepped"
				},
			    callbacks:{
			        whileScrolling:function(el){
			            $.force_appear();
			        },
			        onScrollStart:function(el){
						var body_sb = $("body .mCSB_scrollTools");
			        	body_sb.addClass('active');
			        },
			        onScroll:function(el){
						var body_sbb = $("body .mCSB_scrollTools");
			        	body_sbb.removeClass('active');
			        },
			    }
			});
		});
	}


/*==========================================================================================================================================
/*==========================================================================================================================================
	Header - Menu
============================================================================================================================================
============================================================================================================================================*/
	
	// =========== Responsive ===========
	function header_resize() {
		$("header .header-container").height($(window).height());
	}
	function show_bar(){
		$(".header-bar").css('display', 'block');
	}

	header_resize();
	$("header").mCustomScrollbar({
		scrollInertia:300,
		contentTouchScroll: 100,
	    callbacks:{
	        onScrollStart:function(el){
				var header_sb = $("header .mCSB_scrollTools");
	        	header_sb.addClass('active');
	        },
	        onScroll:function(el){
				var header_sbb = $("header .mCSB_scrollTools");
	        	header_sbb.removeClass('active');
	        }
	    }
	});

	// =========== Dropdown Effect ===========
	$("header nav a").click(function(event) {
	 	
	 	var elem = $(this);
	    if ($(this).parent().children('ul').length > 0) {

	    	event.preventDefault();

        	if (!$(this).parent().find('> ul a').hasClass('active')) {
        		elem.toggleClass('active');
        	}

	        $(this).parent().find('> ul').stop().slideToggle(300,function(){

        		$('header').mCustomScrollbar("update");
	        });
	    }
	});

	//=========== Refresh ===========
	$(window).resize(function(event) {
        $('header').mCustomScrollbar("update");
	});

	// =========== Header Buttons ===========
	$("header .close-btn, .header-bar .menu-nav").click(function(event) {
		
		event.preventDefault();

		$("header, .header-bar").toggleClass('active');
		$("body").toggleClass('menu-visible');
	});

	$(".filter-mini .filter").click(function(event) {
		
		event.preventDefault();

		$(this).next().stop().fadeToggle(200);
	});

	$(".share-mini .show").click(function(event) {
		
		event.preventDefault();

		$(this).next().stop().fadeToggle(200);
	});


/*==========================================================================================================================================
/*==========================================================================================================================================
	Gallery
============================================================================================================================================
============================================================================================================================================*/
	
	// =========== Masonry Horizontal ===========
	$(".gallery-masonry-h").imagesLoaded(function(){

		var windowWidth = $(window).width(),
			windowHeight = $(window).height();

		//IE bug
	    var ua = window.navigator.userAgent;
	    var msie = ua.indexOf('MSIE ');
	    var trident = ua.indexOf('Trident/');
	    var edge = ua.indexOf('Edge/');

	    if ((msie > 0 || trident > 0 || edge > 0) && windowWidth > 768) {

	        $(".gallery-masonry-h .images").height($(".gallery-masonry-h .cat-wrapper").height());
	        $(".gallery-masonry-h .cat-wrapper").each(function(index, el) {
	        	
	        	var h_width = $(this).find('.header').width();

	        	$(this).find('.images').css('margin-left', h_width+'px');

	        	$(this).find('.images').css('float', 'none');
	        });
	    }

		

		$(".gallery-masonry-h .container").width(99999);
		$(".gallery-masonry-h .gallery-item").each(function(index, el) {

			var img = $(this).find('img'),
				ratio = img.width() / img.height();

			img.attr('data-ratio', ratio);
			var img_w = img.attr('data-ratio') * img.height()
			img.width(img_w);
			$(this).width(img_w);
		});


		if(windowWidth > 768 ) {

			$('.gallery-masonry-h .images').isotope({

				layoutMode: 'masonryHorizontal',
				itemSelector: '.gallery-item'
			});
			$('.gallery-masonry-h').attr('data-sort', 'horizontal');

			var container = $(".gallery-masonry-h .inner-container").width();
			$(".gallery-masonry-h .container").width(container+1);
		}
		else if(windowWidth > 480 && windowWidth <= 768 ) {

			var colWidth = $(".gallery-masonry-h").width() / 2;

			$('.gallery-masonry-h .images').isotope({

				layoutMode: 'masonry',
				masonry: {
				  columnWidth: colWidth
				}
			});
			$('.gallery-masonry-h').attr('data-sort', 'vertical');
		}
		else if(windowWidth <= 480 ) {

			var colWidth = $(".gallery-masonry-h").width();

			$('.gallery-masonry-h .images').isotope({

				layoutMode: 'masonry',
				masonry: {
				  columnWidth: colWidth
				}
			});
			$('.gallery-masonry-h').attr('data-sort', 'vertical');
		}
		
		$.force_appear();

		$(".gallery-masonry-h").mCustomScrollbar({

			scrollInertia:800,
			mouseWheelPixels:400,
			horizontalScroll:true,
			contentTouchScroll: 400,
			keyboard:{ 
				enable: true,
				scrollAmount: 600,
				scrollType: "stepped"
			},
		    callbacks:{
		        whileScrolling:function(el){
		            $.force_appear();
		        },
		        onScrollStart:function(el){
					var gallery_sb = $(".gallery-masonry-h .mCSB_scrollTools");
		        	gallery_sb.addClass('active');
		        },
		        onScroll:function(el){
					var gallery_sbb = $(".gallery-masonry-h .mCSB_scrollTools");
		        	gallery_sbb.removeClass('active');
		        },
		    }
		});

		$(".filter-mini.gallery-masonry-filter .categories a").click(function(event) {
			
			event.preventDefault();

			$(this).parent().find('.active').removeClass('active');
			$(this).addClass('active');
			var selector = "#"+$(this).attr('data-filter');


			if(windowWidth > 768 ) {

				$(".gallery-masonry-h").mCustomScrollbar("scrollTo",selector);
			}
			else if(windowWidth <= 768 ) {

				if(selector.length > 1) {

					$(".gallery-masonry-h .cat-wrapper").fadeOut(300);
					$(".gallery-masonry-h .cat-wrapper"+selector+"").fadeIn(300);
				}
				else {
					$(".gallery-masonry-h .cat-wrapper").fadeIn(300);
				}

				// Just in case
				setTimeout(function(){
					$.force_appear();
				},310);
			}
		});
	});

	function gallery_m_h_resize() {

		var windowWidth = $(window).width(),
			layout = $('.gallery-masonry-h').attr('data-sort');

		if(windowWidth > 768 ) {

			$(".gallery-masonry-h .container").width(99999);

			$(".gallery-masonry-h .gallery-item").each(function(index, el) {

				var img = $(this).find('img'),
					img_w = img.attr('data-ratio') * img.height();

				img.width(img_w);
				$(this).width(img_w);
			});

			if(layout == "vertical") {
				$('.gallery-masonry-h .images').isotope("destroy");
			}

			$('.gallery-masonry-h .images').isotope({

				layoutMode: 'masonryHorizontal',
				itemSelector: '.gallery-item'
			});
			$('.gallery-masonry-h').attr('data-sort', 'horizontal');

			var containerr = $(".gallery-masonry-h .inner-container").width()+1;
			$(".gallery-masonry-h .container").width(containerr);
		}
		else if(windowWidth <= 768 ) {

			var colWidth = $(".gallery-masonry-h").width() / 2;

			if(layout == "horizontal") {
				$('.gallery-masonry-h .images').isotope("destroy");
			}

			$('.gallery-masonry-h .images').isotope({

				layoutMode: 'masonry',
				masonry: {
				  columnWidth: colWidth
				}
			});
			$('.gallery-masonry-h').attr('data-sort', 'vertical');
		}

		$('.gallery-masonry-h .images').isotope('bindResize');
		$(".gallery-masonry-h").mCustomScrollbar("update");
		$.force_appear();
	}


	// =========== Albums ===========
	var hover;
	$(".gallery-albums .group .inner").hover(function() {

		var elem = $(this),
			count = (elem.find('.img').length * 1000)+1;

		elem.parent().removeClass('active');
		elem.parent().addClass('active');

		hover = setTimeout(function() { elem.parent().removeClass('active'); }, count);
	}, function(){
		clearTimeout(hover);
		$(this).parent().removeClass('active');
	});


	// =========== Slideshow ===========
	$(".gallery-slideshow").flexslider({
	  
	    prevText: "",
	    nextText: "",
	    slideshow: true,
	    slideshowSpeed: 6000,
	    animationSpeed: 1000,
	    controlNav: "thumbnails",
	    directionNav: false,

	    start: function(slider){
	    	$(".gallery-slideshow .flex-control-thumbs li:first-child").addClass('active');
	    },
	    before: function(slider){

	    	var current = parseInt(slider.animatingTo);

	    	$(".gallery-slideshow .flex-control-thumbs li.active").removeClass('active');
	    	$(".gallery-slideshow .flex-control-thumbs li:eq("+current+")").addClass('active');
	    }
	});

	// Controls
	$(".gallery-slideshow .flex-control-thumbs, .gallery-slideshow .controls").hover(function() {
		$(this).parent().addClass('hovered');
	}, function() {
		$(this).parent().removeClass('hovered');
	});

	$(".gallery-slideshow .controls .prev").click(function(event) {
		event.preventDefault();

		$(".gallery-slideshow").flexslider('prev');

		$(".gallery-slideshow .pause").fadeOut(200,function(){
			$(".gallery-slideshow .play").fadeIn(200);
		});
	});

	$(".gallery-slideshow .controls .next").click(function(event) {
		event.preventDefault();

		$(".gallery-slideshow").flexslider('next');

		$(".gallery-slideshow .pause").fadeOut(200,function(){
			$(".gallery-slideshow .play").fadeIn(200);
		});
	});

	$(".gallery-slideshow .controls .play").click(function(event) {
		event.preventDefault();

		$(".gallery-slideshow").flexslider('play');

		$(this).fadeOut(200,function(){
			$(".gallery-slideshow .pause").fadeIn(200);
		});
	});

	$(".gallery-slideshow .controls .pause").click(function(event) {
		event.preventDefault();

		$(".gallery-slideshow").flexslider('pause');

		$(this).fadeOut(200,function(){
			$(".gallery-slideshow .play").fadeIn(200);
		});
	});

	$(".gallery-slideshow .flex-control-thumbs li").click(function(event) {

		$(".gallery-slideshow .pause").fadeOut(200,function(){
			$(".gallery-slideshow .play").fadeIn(200);
		});
	});


	// =========== Slider ===========
	$(".gallery-slider").flexslider({
	  
	    prevText: "",
	    nextText: "",
	    slideshow: true,
	    slideshowSpeed: 4000,
	    animationSpeed: 1000,
	    controlNav: false,
	    directionNav: true,
	});
	
	$(".gallery-masonry-h .images .overlay, .gallery-grid .overlay, .gallery-grid-2 .overlay").magnificPopup({
	 
	    type: 'image',
	    closeOnContentClick: true,
	    mainClass: 'mfp-fade',
	    preloader: true,

	    gallery: {
		    enabled: true,
			navigateByImgClick: true,
			arrowMarkup: '<button title="%title%" type="button" class="arrow-%dir%"></button>', // markup of an arrow button
			tPrev: 'Previous (Left arrow key)', // title for left button
			tNext: 'Next (Right arrow key)', // title for right button
			tCounter: '<span class="mfp-counter">%curr% of %total%</span>' // markup of counter
		}
	});


	// =========== Love icon ===========
	$(".gallery-item .icon1-heart-empty").click(function(event) {
		event.preventDefault();

		var elem = $(this);

		elem.parent().addClass('active active2');
		$(this).next().fadeIn(300, function() {
			var value = parseInt(elem.next().next().text());
			elem.next().next().text(value+1);
			elem.fadeOut(1);
		});
	});
	$(".gallery-item .icon1-heart").click(function(event) {
		event.preventDefault();
	});

	$(".gallery-item .icon1-heart-empty, .gallery-item .icon1-heart").hover(function() {
		$(this).parent().addClass('active');
	}, function() {
		$(this).parent().removeClass('active');
	});


	// =========== Responsive ===========
	function gallery_s_resize() {

		var win_h = $(window).height(),
			win_w = $(window).width(),
			thumbs_h = $(".gallery-slideshow .flex-control-thumbs").outerHeight(),
			thumbs_b = thumbs_h - 75;

		$(".gallery-slideshow .flex-control-thumbs").css('bottom', '-'+thumbs_b+'px');
	}

/*==========================================================================================================================================
/*==========================================================================================================================================
	Portfolio
============================================================================================================================================
============================================================================================================================================*/

	// =========== Stiped ===========
	$(".portfolio-striped").imagesLoaded(function(){

		var cols,
			wrapperWidth,
			windowWidth = $(window).width();

		if(windowWidth > 1024 ) {
			cols = parseInt($(".portfolio-striped").attr('data-cols'));
		}
		else if(windowWidth > 768 && windowWidth <= 1024 ) {
			cols = 3;
		}
		else if(windowWidth > 480 && windowWidth <= 768 ) {
			cols = 2;
		}
		else if(windowWidth <= 480 ) {
			cols = 1;
		}

		wrapperWidth = (parseInt($('.portfolio-striped').width()) * (100 / cols)) / 100;
		$(".portfolio-striped .portfolio-item").width(wrapperWidth);

		// For IE bug
		var container_width = wrapperWidth * parseInt($(".portfolio-striped .portfolio-item").length);

		$(".portfolio-striped .inner-content").width(container_width);

		var container = $(".portfolio-striped .inner-content").width();

		$(".portfolio-striped .portfolio-wrapper").width(container);

		$(".portfolio-striped").mCustomScrollbar({

			scrollInertia:800,
			mouseWheelPixels:400,
			horizontalScroll:true,
			contentTouchScroll: 400,
			keyboard:{ 
				enable: true,
				scrollAmount: 600,
				scrollType: "stepped"
			},
		    callbacks:{
		        whileScrolling:function(el){
		            $.force_appear();
		        },
		        onScrollStart:function(el){
					var portfolio_sb = $(".portfolio-striped .mCSB_scrollTools");
		        	portfolio_sb.addClass('active');
		        },
		        onScroll:function(el){
					var portfolio_sbb = $(".portfolio-striped .mCSB_scrollTools");
		        	portfolio_sbb.removeClass('active');
		        },
		    }
		});
	});


	// =========== Masonry ===========
	// Init
	function portfolio_m_init() {

		var colWidth,
			itemWidth,
			windowWidth = $(window).width();

		if(windowWidth > 1024 ) {
			itemWidth = 8;
		}
		else if(windowWidth > 768 && windowWidth <= 1024 ) {
			itemWidth = 6;
		}
		else if(windowWidth > 480 && windowWidth <= 768 ) {
			itemWidth = 2;
		}
		else if(windowWidth <= 480 ) {
			itemWidth = 1;
		}

		colWidth = $(".portfolio-masonry").width() / itemWidth;

		$('.portfolio-masonry .portfolio-wrapper').isotope({
			layoutMode: 'masonry',
			masonry: {
			  columnWidth: colWidth
			}
		});

		if(windowWidth <= 1024 ) {
			$('.portfolio-masonry .portfolio-wrapper').isotope('shuffle');
		}
	}

	$(".portfolio-masonry").imagesLoaded(function(){
		setTimeout(function(){
			portfolio_m_init();
		},100);
	});
	
	// Filter
	$(".filter-mini.portfolio-masonry-filter .categories a").click(function(event) {
		
		event.preventDefault();

		$(this).parent().find('.active').removeClass('active');
		$(this).addClass('active');
		var selector = $(this).attr('data-filter');
		$(".portfolio-masonry .portfolio-wrapper").isotope({ filter: selector });
	});


/*==========================================================================================================================================
/*==========================================================================================================================================
	Blog
============================================================================================================================================
============================================================================================================================================*/

	// =========== Blog Gallery Post ===========
	$(".blog .flexslider").flexslider({
	  
	    prevText: "",
	    nextText: "",
	    slideshow: true,
	    slideshowSpeed: 4000,
	    animationSpeed: 1000,
	    controlNav: false,
	    directionNav: true,
	});


/*==========================================================================================================================================
/*==========================================================================================================================================
	Shortcodes
============================================================================================================================================
============================================================================================================================================*/

	// =========== Tabs ===========
	$( ".tabs .tabs-container" ).each(function(index, el) {

		$(this).tabs({
		    hide: 200,
		    show: 500
		});
	});

	// =========== Accordion ===========
	$(".accordion").each(function(index, el) {
		

		$(this).find('.accordion-container').accordion({
		    heightStyle: "content",
		    icons: { "header": "icon2-plus", "activeHeader": "icon2-minus" },
		    animate: 200,
		    header: "h3",
			autoHeight: true
		});
	});


	// =========== Contact - Map ===========
	function map_init() {

		if($(".contact .map").length > 0) {

			$(".contact .map").remove();
			$(".contact .map-wrapper").append('<div class="map" id="map"></div>')
		}
		$(".contact .map").width($("body").width());
		$(".contact .map").height(win_h);

		$("#map").gMap({
		   
		    address: "London, UK",
		    zoom: 15,
		    scrollwheel: true,
		    maptype: 'ROADMAP',
		   
		    controls: {
		           panControl: false,
		           zoomControl: true,
		           mapTypeControl: false,
		           scaleControl: false,
		           streetViewControl: false,
		           overviewMapControl: false
		    },
		    markers: [
		        {
		            address: "London, UK"
		        }
		    ]
		});
	}
	map_init();

	// Contact - Close Button
	$(".contact .close-btn").click(function(event) {
		event.preventDefault();

		$(".contact .content-inner, .contact .map-wrapper:after").fadeOut(300, function() {
			$(".contact .form-btn").delay(200).fadeIn(300);
			$(".contact .map-wrapper").addClass('active');
		});
	});

	// Contact - Open Button
	$(".contact .form-btn").click(function(event) {
		event.preventDefault();

		$(this).fadeOut(300);
		$(".contact .map-wrapper").removeClass('active');
		$(".contact .content-inner, .contact .map-wrapper:after").fadeIn(300);
	});

	// Contact - Form
	$(".contact form input[type=button]").click(function(event) {
		event.preventDefault();

		var current_form = $(this).parent(),
			form_action  = current_form.attr('action');


		if(current_form.find("input:not([type=button])").val() == "" || current_form.find("textarea").val() == "" ){
			

			current_form.find("input:not([type=button]), textarea").each(function(index, el) {
				
				if ($(this).val() == "") {
					$(this).addClass('error');
				}
				else {
					$(this).removeClass('error');
				}
			});
		}
		else{

			current_form.find("input:not([type=button]), textarea").each(function(index, el) {
				
				$(this).removeClass('error');
			});

			$.post(form_action, current_form.serialize(), function(data) {
				if(data == 'success'){

					current_form.find('.message-info').addClass('success').text('Message sent successfully.');

					setTimeout(function(){
						current_form.find('.message-info').removeClass('success');
					},4000);

					current_form.find("input:not([type=button])").val('');
					current_form.find("textarea").val('');
				}
				else{
					current_form.find('.message-info').addClass('fail').text('Message couldn\'t be sent.');
					setTimeout(function(){
						current_form.find('.message-info').removeClass('fail');
					},4000);
				}
			});
		}
	});



	// =========== About - Resize ===========
	function page_resize() {
		$(".grid-row.page-simple").width($("body").width());
		$(".grid-row.page-simple").height($("body").height());
	}

	// About - Simple Button
	$(".page-simple .ex-btn").click(function(event) {
		event.preventDefault();

		$(".page-simple").fadeOut(300, function() {
			$(".page-extended").fadeIn(300);
		});
	});

	// About - Open Button
	$(".page-extended .close-btn").click(function(event) {
		event.preventDefault();

		$(".page-extended").fadeOut(300, function() {
			$(".page-simple").fadeIn(300);
		});
	});

	

	// =========== Animation ===========
	function play_animation() {

		$("body").imagesLoaded(function(){

			$('.animated').each(function(index, el) {
				
				var current = $(this);

				current.appear();

				current.on('appear', function() {
				 
				    var animation = current.attr('data-animation');
				    if ( !current.hasClass('visible') ) {

				        var animationDelay = current.attr('data-animation-delay');
				        if ( animationDelay ) {

				            setTimeout(function(){
				                current.addClass( animation + " visible" );
				            }, animationDelay);

				        } 
				        else {
				            current.addClass( animation + " visible" );
				        }
				    }
				});

				if(current.is(':appeared') && !current.hasClass('visible')) {
				    
				    var animation = current.attr('data-animation');
			        var animationDelay = current.attr('data-animation-delay');

			        if ( animationDelay ) {

			            setTimeout(function(){
			                current.addClass( animation + " visible" );
			            }, animationDelay);

			        } 
			        else {
			            current.addClass( animation + " visible" );
			        }
				}
			});
		});
	}
	


/*==========================================================================================================================================
/*==========================================================================================================================================
	Responsive Functions
============================================================================================================================================
============================================================================================================================================*/
	
	$("body").imagesLoaded(function(){

		header_resize();
		gallery_s_resize();
		page_resize();
		map_init();
	});

	$(window).resize(function(event) {
		
		header_resize();
		gallery_s_resize();
		page_resize();
		map_init();
		gallery_m_h_resize();
		portfolio_m_init();
	});


});


})(jQuery);