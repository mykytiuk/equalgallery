$(document).ready(function() {

    var tmpImg = new Image();
    tmpImg.src = $('.imagely img').attr('src');
    tmpImg.onload = function() {        
        $('#imagelyСarousel').flexslider({
            animation: "slide",
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            itemWidth: 80,
            itemMargin: 2,
            asNavFor: '#imagelySlider'
        });
        $('#imagelySlider').flexslider({
            animation: "slide",
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            sync: "#imagelyСarousel",
            slideshowSpeed: 3500,
            start: function(slider) {
                sliderImageSize();
                $('.autoplay').click(function(){
                    if ( $(this).hasClass("pause") ) {
                        $(this).removeClass("pause"); 
                        slider.pause();
                    } else {
                        $(this).addClass("pause"); 
                        slider.play();
                    }
                });  
                var image = $(".container-slider").find(".flex-active-slide img");
                $("#downloadImage").attr("href", $(image).data("url"));
            }
        });        
    };
    
    $('.open-modal').click(function() {
        var modal = "."+$(this).data("modal"),
        slider = ".container-slider",        
        wm = $(modal).outerWidth();
        if ($(modal).hasClass("open")) {
            $(slider).css("right","0px");
            var wc = $(slider).width();
            $(slider).find("li").css("width",wc+"px");
            $(modal).removeClass("open");
        } else {
            $(".modal").removeClass("open");
            $(slider).css("right",wm+"px");
            var wc = $(slider).width();
            $(slider).find("li").css("width",wc+"px");
            $(modal).addClass("open");            
        }
        setTimeout(function() { sliderImageSize(); }, 200);
    });
    
    function sliderImageSize() {
        var arr_img = $(".container-slider img"),
            hc = $(".container-slider").height(),
            wc = $(".container-slider").width();            
        $.each(arr_img, function(a,t) {                
            var wci = $(t).width(),
                hci = $(t).height(),                
                kc = wc/hc,
                kci = wci/hci;
            if (kc<kci) { $(t).width(wc); hci = $(t).height(); mt = Math.round((hc-hci)/2); $(t).css({"height":"","margin-top":mt+"px"}); } else {
               $(t).height(hc); $(t).css({"width":""}); 
            }
        });
    }

    $(window).resize(function(){
        sliderImageSize();
    });
    
});