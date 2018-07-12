$(function () {
    banner();
    initMobileTab();
    $('[data-toggle="tooltip"]').tooltip();
});
var banner = function () {

    var getData = function (callback) {
        if(window.data){
            callback && callback(window.data);
        }else{
            $.ajax({
                type: 'get',
                url: 'js/data.json',
                dataType: 'json',
                data: '',
                success: function(data){
                    window.data = data;
                    callback && callback(window.data);
                }
            });
        }
    };
    var render = function () {
        getData(function () {
            var isMobile = $(window).width() < 768;
            var pointHtml = template('pointTemplate',{list:data});
            var imageHtml = template('imageTemplate',{list:data,isM:isMobile});
            $('.carousel-indicators').html(pointHtml);
            $('.carousel-inner').html(imageHtml);
        });
    };
    //render();

    $(window).on('resize', function () {
        render();
    }).trigger('resize');

    var isMove = false;
    var startX = 0, distanceX = 0, moveX = 0;
    $('.wjs_banner').on('touchstart', function (e) {
        startX = e.originalEvent.touches[0].clientX;
    }).on('touchmove', function (e) {
        moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - startX;
        isMove = true;
    }).on('touchend', function (e) {
        if(isMove && Math.abs(distanceX) > 50){
            if(distanceX > 0){
                $('.carousel').carousel('prev');
            }else{
                $('.carousel').carousel('next');
            }
        }
        startX = 0;
        distanceX = 0;
        isMove = false;
    });
};
var initMobileTab = function () {
     var $navTabs = $('.wjs_product .nav-tabs');
    var width = 0;
    $navTabs.find('li').each(function (i, item) {
        var $currLi = $(this);
        var $liWidth = $currLi.outerWidth(true);
        width += $liWidth;
    })
    $navTabs.width(width);

    new IScroll($('.nav-tabs-parent')[0],{
        scrollX: true,
        scrollY: false,
        click: true

    });

};
