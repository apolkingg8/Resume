
var eiji = {};

var init = function(){

    eiji.$tabBarPhone = $('#tabBar-phone');
    eiji.$tabBar = $('#tabBar');
    eiji.$phoneNav = $('#phone-nav');
    eiji.$container = $('#container');
    eiji.oldTabIndex = -1;

    tweens();

    scrollEvent();

    progressEvent();

    bindEvents();

    drawChart();

};

var scrollEvent = function(){
    eiji.$container.scroll(function(e){

        // scroll spy
        var contentHeight = $(this).height(),
            fromTop = $(this).scrollTop() + (contentHeight * 0.4),
            tabIndex = Math.floor(fromTop / contentHeight) - 1,
            $targetTab = $(eiji.$tabBar.children()[tabIndex]);

        clearTimeout($.data(this, 'scrollTimer'));

        $.data(this, 'scrollTimer', setTimeout(function() {
            if(!$targetTab.hasClass('active')){
                eiji.$tabBar.children().removeClass('active');
                $targetTab.addClass('active');
            }
        }, 250));

        // onTabChange
        if(eiji.oldTabIndex !== tabIndex){

            if(tabIndex === 3){

            }

            eiji.oldTabIndex = tabIndex;
        }
    });
};

var tweens = function(){

    var containerHeight = eiji.$container.height(),
        containerWidth = eiji.$container.width();

    var $aboutMe = eiji.$container.find('#aboutMe'),
        $javascript = eiji.$container.find('#javascript'),
        $css = eiji.$container.find('#css');

    var ssc = $.superscrollorama();

    ssc.addTween(
        '#aboutMe',
        TweenMax.from(
            $aboutMe.find('.main'), 1, {
                css: {
                    opacity: 0
                },
                onComplete: function(){
                    ssc.addTween(
                        '#aboutMe',
                        TweenMax.to(
                            $aboutMe.find('.main'), 0.5, {
                                css: {
                                    opacity: 0
                                }
                            }),
                        0,
                        containerHeight * 1.8
                    );
                }
            }),
        0,
        containerHeight * 0.4
    );

    ssc.addTween(
        '#aboutMe',
        TweenMax.from(
            $aboutMe.find('.bracket.left'), 1, {
                css: {
                    rotation: '180'
                },
                onComplete: function(){
                    ssc.addTween(
                        '#aboutMe',
                        TweenMax.to(
                            $aboutMe.find('.bracket.left'), 0.5, {
                                css: {
                                    rotation: '-90'
                                },
                                ease: 'Linear.noneEase'
                            }),
                        0,
                        containerHeight * 1.8
                    );
                }
            }),
        0,
        containerHeight * 0.4
    );

    ssc.addTween(
        '#aboutMe',
        TweenMax.from(
            $aboutMe.find('.bracket.right'), 1, {
                css: {
                    rotation: '-180'
                },
                onComplete: function(){
                    ssc.addTween(
                        '#aboutMe',
                        TweenMax.to(
                            $aboutMe.find('.bracket.right'), 0.5, {
                                css: {
                                    rotation: '90'
                                },
                                ease: 'Linear.easeNone'
                            }),
                        0,
                        containerHeight * 1.8
                    );
                }
            }),
        0,
        containerHeight * 0.4
    );


    // js
    ssc.addTween(
        '#javascript',
        TweenMax.from(
            $javascript.find('.describe'), 1, {
                'marginTop': containerHeight * 0.5 + 'px',
                ease: 'Elastic.easeOut',
                onComplete: function(){

                }
            }),
        0,
        containerHeight * 1.8
    );

    // css & html in
    ssc.addTween(
        '#css',
        TweenMax.from(
            $css.find('.top'), 0.7, {
                'top': $css.find('.top').height(),
                'left': containerWidth * 0.3 + 'px',
                'opacity': 0,
                onComplete: function(){
                    ssc.addTween(
                        '#css',
                        TweenMax.to(
                            $css.find('.top'), 0.7, {
                                'top': $css.find('.top').height(),
                                'left': containerWidth * 0.3 + 'px',
                                'opacity': 0,
                                ease:Power1.easeIn
                            }),
                        0,
                        containerHeight * 3.8
                    );
                }
            }),
        0,
        containerHeight * 2.8
    );
    ssc.addTween(
        '#css',
        TweenMax.from(
            $css.find('.bot'), 0.7, {
                'bottom': $css.find('.bot').height(),
                'right': containerWidth * 0.3 + 'px',
                'opacity': 0,
                onComplete: function(){
                    ssc.addTween(
                        '#css',
                        TweenMax.to(
                            $css.find('.bot'), 0.7, {
                                'bottom': $css.find('.bot').height(),
                                'right': containerWidth * 0.3 + 'px',
                                'opacity': 0,
                                ease:Power1.easeIn
                            }),
                        0,
                        containerHeight * 3.8
                    );
                }
            }),
        0,
        containerHeight * 2.8
    );

    $(window).resize(function () {
        if(eiji.$container.height() > 787){
            ssc.triggerCheckAnim(true);
        }
    });
};

var bindEvents = function(){

    // set Content Tops
    /*eiji.$container.children().each(function(){
        $(this).attr('data-top', $(this).position().top - 10);
    });*/

    var scrollTo = function(num){
        var nowIndex = Math.floor(eiji.$container.scrollTop() / eiji.$container.height());

        if(nowIndex !== num){
            /*
            eiji.$container.animate({
                scrollTop: parseInt(num) * eiji.$container.height()
            }, Math.abs(nowIndex - num) * 1000, 'linear');*/
        }

        eiji.$container.animate({
            scrollTop: parseInt(num) * eiji.$container.height()
        }, 1000, 'swing');

    };

    eiji.$tabBar.children('li').click(function(e){

        $(this).parents('ul').find('.active').removeClass('active');
        $(this).addClass('active');
        // $('body').removeClass().addClass($(this).find('.tab-tag').attr('class').split(' ')[1] + 'd');

        scrollTo($(this).index() + 1);

        phoneNavClick(eiji.$phoneNav.children()[$(this).index()]);
    });

    eiji.$tabBarPhone.click(function(e){
        eiji.$phoneNav.toggleClass('active');
    });

    var phoneNavClick = function(dom){
        eiji.$tabBarPhone.find('.title').text($(dom).text());
        eiji.$tabBarPhone.css('background-color', $(dom).css('color'));
        // $tabBarPhone.find('.icon-more').children().css('background-color', $(e.target).css('color'));
    };

    eiji.$phoneNav.click(function(e){

        phoneNavClick(e.target);
        scrollTo($(e.target).index() + 1);

        eiji.$phoneNav.toggleClass('active');

        eiji.$tabBar.find('li').removeClass('active');
        $(eiji.$tabBar.children()[$(e.target).index()]).toggleClass('active');
    });

    // Intro
    eiji.$container.find('#intro').find('span').click(function(){
        $(eiji.$tabBar.children()[0]).trigger('click');
    });

};

var progressEvent = function(){
    // works image flow
    var $img = eiji.$container.find('#works').find('.monitor').find('img'),
        $progress = $('#works').children('.progress'),
        $describe = $('#works').children('.describe'),
        width = 600,
        nowLeft = parseInt($img.css('left').replace('px', '')),
        nowIndex = 0;

    $progress.children('.arrow').on('click', function(){
        if($(this).hasClass('left')){
            if(nowIndex != 0){
                $img.animate({
                    left: parseInt(nowLeft) + width
                }, 500);
                nowLeft += parseInt(width);
                nowIndex -= 1;
            }
        }else{
            if(nowIndex != 5){
                $img.animate({
                    left: parseInt(nowLeft) + width * -1
                }, 500);
                nowLeft -= parseInt(width);
                nowIndex += 1;
            }
        }
        $progress.find('li').removeClass('active');
        $($progress.find('li')[nowIndex]).addClass('active');

        $describe.find('li').removeClass('active');
        $($describe.find('li')[nowIndex]).addClass('active');
    });
};
/*
var parallax = function(){
    var $otherSkill = $('#otherSkill'),
        $parallax = $otherSkill.find('.parallax');

    // bind mouse event
    $otherSkill.mousemove(function(e){
        var top = e.pageY - (document.body.clientWidth * 0.5),
            left = e.pageX - (document.body.clientHeight);
        console.log(e);

        $parallax.find('.l1').css('left', left * 0.4).css('top', top * 0.4);
        $parallax.find('.l2').css('left', left * 0.3).css('top', top * 0.3);
        $parallax.find('.l3').css('left', left * 0.2).css('top', top * 0.2);
        $parallax.find('.l4').css('left', left * 0.1).css('top', top * 0.1);
    });
};*/

var drawChart = function(){
    var s = Snap('#skillChart'),
        $chart = $('#skillChart'),
        width = $chart.width(),
        height = $chart.height();

    var d = function(r, cx, cy){
        d = 'M ' + cx + ' ' + cy +
            'm -' + r + ', 0' +
            'a ' + r + ',' + r + ' 0 1,1 ' + (r * 2) + ',0' +
            'a ' + r + ',' + r + ' 0 1,1 ' + (r * -2) + ',0';
        return d;
    };

    var arc = function (value, total, R) {
        var alpha = 360 / total * value,
            a = (90 - alpha) * Math.PI / 180,
            x = 250 + R * Math.cos(a),
            y = 250 - R * Math.sin(a),
            color = "hsb(".concat(Math.round(R) / 200, ",", value / total, ", .75)"),
            path;
        if (total == value) {
            path = [["M", 250, 250 - R], ["A", R, R, 0, 1, 1, 249.99, 250 - R]];
        } else {
            path = [["M", 250, 250 - R], ["A", R, R, 0, +(alpha > 180), 1, x, y]];
        }
        return {d: path};
    };

    s.text(0, 250, 'Other Skills').attr({
        class: 'title'
    });
    s.text(0, 300, '').attr({
        class: 'describe'
    });

    var $title = $chart.find('.title'),
        $describe = $chart.find('.describe'),
        reset = function(){
            $title.text('OtherSkills');
            $describe.text('');
        };

    // .NET
    var s1 = s.path(arc(60, 100, 200)).attr({
        class:'shadow'
    });
    s.path(arc(60, 100, 200)).hover(function(){
        $title.text('.NET');
        $describe.text('C#, .NET MVC, MS-SQL, IIS');
        s1.attr({
            class: 'shadow active'
        });
    }, function(){
        s1.attr({
            class: 'shadow'
        });
    });
    // LAMP
    var s2 = s.path(arc(30, 100, 150)).attr({
        class:'shadow'
    });
    s.path(arc(30, 100, 150)).hover(function(){
        $title.text('LAMP');
        $describe.text('PHP, MySQL, Apache');
        s2.attr({
            class: 'shadow active'
        });
    }, function(){
        s2.attr({
            class: 'shadow'
        });
    });
    // Others
    var s3 = s.path(arc(40, 100, 100)).attr({
        class:'shadow'
    });
    s.path(arc(40, 100, 100)).hover(function(){
        $title.text('SmartTV');
        $describe.text('Samsung, Panasonic');
        s3.attr({
            class: 'shadow active'
        });
    }, function(){
        s3.attr({
            class: 'shadow'
        });
    });

    $chart.mouseleave(function(){
        reset();
    });


};