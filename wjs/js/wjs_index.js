$(function () {
    $('[data-toggle="tooltip"]').tooltip()

    var isMobile = true
    // 发送ajax请求
    function init() {
        $.ajax({
            type: 'get',
            url: './data/imgData.json',
            dataType: 'json',
            success: function (result) {
                // console.log(result);
                
                // 获取屏幕的宽度
                var windowW = $(window).width()
                // console.log(windowW);
                
                if (windowW >= 768) {
                    isMobile = false
                } else {
                    isMobile = true
                }
                // 动态生成轮播图--图片模板
                var imgHTML = template('imgTemp', {'items': result,"isMoblie": isMobile})
                $(".carousel-inner").html(imgHTML)
                // 动态生成轮播图--小圆点模板
                var dotHTML = template('dotTemp',{'items':result})
                $(".carousel-indicators").html(dotHTML)    
            }
        })
    }
    init()

    $(window).on('resize', function () {
        // 获取屏幕的宽度
        var windowW = $(window).width()
        
        if ((isMobile && windowW > 768) || (!isMobile && windowW < 768)) {
            // if (isMobile = windowW > 768) {
            //     isMobile = false
            // } else {
            //     isMobile = true
            // }
            // console.log(234);
            
            // 三元化简
            isMobile = windowW > 768 ? false:true
            init()
        }
    })


    // 实现手动轮播
    var carousel_inner = $('.carousel-inner')[0]
    var startX , distanceX

    carousel_inner.addEventListener('touchstart',function(e){
        startX = e.targetTouches[0].clientX
    })

    carousel_inner.addEventListener('touchend',function(e){
        var endX = e.changedTouches[0].clientX
        distanceX = endX - startX
        if(Math.abs(distanceX) > 100){
            if(distanceX > 0){
                // 上一张
                $('.carousel').carousel('prev')
            }else{
                // 下一张
                $('.carousel').carousel('next')
            }
        }
    })


    // 页面产品模块 移动端 导航栏滑动效果
    // 获取所有 li
    var allLi = $('.product .nav-tabs').find('li')
    // console.log(allLi);
    var liwidth = 0
    // 循环遍历获取所有li的宽
    allLi.each(function(index,value){
        // 所有li的宽就行累加,用 outerWidth 所获得的 li 的宽为：内容+padding+border
        liwidth += $(value).outerWidth()
        // console.log($(value).outerWidth());
    })
    // console.log(liwidth);
    $('.product .nav-tabs').width(liwidth)
    // 配置iScroll
    var myScroll =  new  IScroll('.product_tabs',{
        scrollX:true,  //水平滑动
        scrollY:false  //修改默认的垂直滑动为 false
    });
})