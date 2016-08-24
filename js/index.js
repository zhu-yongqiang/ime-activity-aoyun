(function () {
    var DOC = document;
    var Base = BASE;
    var Touch = Base.cfg.isTouch;
    var $$ = Base.getEle;
    var $D = Base.disEle,
        $G = Base.getUrl;
        $CREATESTYLE = Base.createStyle,
        $ADPALLSTYLE = Base.adpAllStyle;
        $text = Base.txtEle;
        $STOPPROPAGATION = Base.stopPropagation;
        $rmvEle = Base.rmvEle;
    var body = DOC.body;
    var text;
    var Title = DOC.title;
    var timer;
    var Plat = '';
    var pic_src = '';
    var bfb;

    //初始化页面
    function initialize() {
        $$("#my_bt").onclick = function () {
            $$("#video").pause();
            $$("#video").style.display = "none";
            Baidu('开始挑战');
            $$("#game").style.display = "block";
            //$$("#time").setAttribute("autofocus","autofocus");
            $$("#time").focus();
        };
        setTimeout(function() {
            $D(body, 1);
        }, 0);
    }
    
    //设定定时器开始挑战，显示结果与点击分享将在这里被执行
    $$("#time").onfocus = function(){setTimeout(countTime, 3000);}
        function countTime(){
            $$("#number").style.color = "#676ffe";
            $$("#time").value = "";
            $$("#time").removeAttribute("readonly");
            clearInterval(timer);
            var count = 10;
            timer = setInterval(function(){
                if(count<=3){
                    $$("#number").style.color = "#ff5824";
                }
                if(count == 10){
                    $$("#number").innerText = count;
                }else{
                    $$("#number").innerText = '0'+ count;
                }
                count--;
                if(count < 0){
                    clearInterval(timer);
                    setTimeout(function(){
                        var length = init();
                        if(length <= 5){
                                $$("#result_bj").src="img/sloth.png";
                                pic_src = "img/sloth.png";
                                qq_desc = CFG.desc.qq.desc5.replace(/length/, length);
                                weibo_desc = CFG.desc.weibo.desc5.replace(/length/, length);
                                checkPlat();
                                gotoShare();
                        }else if(length >= 6 && length <= 20){
                                $$("#result_bj").src="img/copper.png";
                                pic_src = "img/copper.png";
                                qq_desc = CFG.desc.qq.desc4.replace(/length/, length);
                                weibo_desc = CFG.desc.weibo.desc4.replace(/length/, length);
                                checkPlat();
                                gotoShare();
                        }else if(length >= 21 && length <= 50){
                                $$("#result_bj").src="img/silver.png";
                                pic_src = "img/silver.png";
                                qq_desc = CFG.desc.qq.desc3.replace(/length/, length);
                                weibo_desc = CFG.desc.weibo.desc3.replace(/length/, length);
                                checkPlat();
                                gotoShare();
                        }else if(length >= 51 && length <= 65){
                                $$("#result_bj").src="img/gold.png";
                                pic_src = "img/gold.png";
                                qq_desc = CFG.desc.qq.desc2.replace(/length/, length);
                                weibo_desc = CFG.desc.weibo.desc2.replace(/length/, length);
                                checkPlat();
                                gotoShare();
                        }else if(length >= 66){
                                $$("#result_bj").src="img/god.png";
                                pic_src = "img/god.png";
                                qq_desc = CFG.desc.qq.desc1.replace(/length/, length);
                                weibo_desc = CFG.desc.weibo.desc1.replace(/length/, length);
                                checkPlat();
                                gotoShare();
                        }
                    },7000);
                }
            },1000)
        }

    //初始化显示用户输入结果的显隐
    function init(){
        $$("#time").setAttribute("readonly","false");
        var text = $$("#time").value;
        var length = text.length;
        var bfb = getbfb(length);
        $$("#in_numbers").innerText = "1秒钟" + Math.ceil(length/10) + "个字";
        $$("#in_bfb").innerText = bfb;
        $$("#game_icon").onclick = function(){
            $$("#result_p").innerText =  text ;
            $$("#result").style.display = "block";
        }
        $$("#result_icon").onclick = function(){
            $$("#result").style.display = "none";
            $$("#time").value = "";
        }
        return length;
    }

    //初始化结果弹窗
    function initShare() {
        fadeIn($$("#share"), 10);
        // $$("#share").style.display = "block";
        $rmvEle($$("#share1"),false);
    }
    function initShareGuide(guide) {
        fadeIn($$("#share"), 10);
        // $$("#share").style.display = "block";
        $$("#share2").style.display = "none";
        $text($$("#share_text"), "点击右上角分享到"+guide);
    }

    //判断用户打开页面的平台并做出相应的弹窗变化
    function checkPlat() {
        var userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.indexOf('iflytek_mmp') > -1) {
            Plat = 'ime';
            var e = exec("imeExtendComponents", "getShareAppInfo", []);
            var msg = getResultMessage(e);
            msg && (ImeShare = {
                qzone: msg.indexOf('com.qzone') >= 0 ? 1 : 0,
                qq: msg.indexOf('com.tencent.mobileqq') >= 0 ? 1 : 0,
                wb: msg.indexOf('com.sina.weibo') >= 0 ? 1 : 0,
                wx: msg.indexOf('com.tencent.mm') >= 0 ? 1 : 0
            });
            initShare();
        } else if (userAgent.match(/MicroMessenger/i) == "micromessenger") {
            Plat = 'wx';
            initShareGuide('朋友圈');
        } else if (userAgent.indexOf('qq') > 0) {
            initShareGuide('QQ空间');
        } else if (userAgent.indexOf('qzone') > 0) {
            initShareGuide('QQ空间');
        } else if (userAgent.indexOf('weibo') > 0) {
            initShareGuide('微博');
        } else {
            initShare();
            $D($$("#pyq_pic"));
        }
    }

    //定义分享的函数，按钮绑定了各自的分享
    function gotoShare() {
        register();
        function register() {
            $$("#shut").onclick = function () {
                Baidu("分享空间按钮");
                $$("#time").value = "";
                $$("#share").style.display = "none";
            };
            $$("#qq_pic").onclick = function () {
                Baidu("分享空间按钮");
                setTimeout(shareQQ, 0);
            };
            $$("#weibo_pic").onclick = function () {
                Baidu("分享微博按钮");
                setTimeout(shareWb, 0);
            };
            $$("#pyq_pic").onclick = function () {
                Baidu("分享朋友圈按钮");
                setTimeout(sharePyq, 0);
            };
                
        }
        function shareQQ() {
            var title = Title;
            var url = CFG.shareUrl + "n=1&" + getRandomStr();
            var desc = qq_desc;
            var img = CFG.shareImg  + pic_src;
            var summary = CFG.shareSummary;

            if (Plat === 'ime' && ImeShare.qzone)
                return exec("imeExtendComponents", 'share_qzone', [title, desc, url, img, img]);
            if (Plat === 'ime' && ImeShare.qq)
                return exec("imeExtendComponents", 'share_qq', [title, desc, url, img, img]);

            Share.qzone({
                "title": title,
                "desc": CFG.desc,
                "pics": img,
                "url": url,
                "summary": summary
            });
        }
        function shareWb() {
            var title = Title;
            var url = CFG.shareUrl + "n=2";
            var desc = weibo_desc;
            var img = CFG.shareImg  + pic_src;

            if (Plat === 'ime' && ImeShare.wb)
                return exec("imeExtendComponents", 'share_weibo', [title, desc, url, img, img]);

            Share.weibo({
                "title": desc,
                "pic": img,
                "url": url
            });
        }
        function sharePyq() {
            var title = Title;
            var url = CFG.shareUrl + "n=3&" + getRandomStr();
            var desc = qq_desc;
            var img = CFG.shareImg + pic_src;

            if (Plat === 'ime')
                exec("imeExtendComponents", 'share_mm', [title, desc, url, img, img]);
        }
    }

    function getRandomStr() {
        return 'r' + getRandom(9) + '=' + getRandom(100000);
    }
    function getRandom(val) {
        return Math.round(Math.random() * val);
    }
    function getbfb(x){
        if(x >= 65){
            bfb = 99.9
        }else{
            bfb = (x*100/65).toFixed(1);
        }
        return bfb + "%";
    }

    function fadeIn(elem, speed, opacity){
        /*
        * 参数说明
        * elem==>需要淡入的元素
        * speed==>淡入速度,正整数(可选)
        * opacity==>淡入到指定的透明度,0~100(可选)
        */
        speed = speed || 20;
        opacity = opacity || 100;
        //显示元素,并将元素值为0透明度(不可见)
        elem.style.display = 'block';
        elem.style.opacity = 0;
       //初始化透明度变化值为0
        var val = 0;
       //循环将透明值以5递增,即淡入效果
        while(val <= 100){
            val = val +5;
            setTimeout(function(){elem.style.opacity = val;},100);
        }
    }
        

    //定义百度统计按钮点击次数的函数
    function Baidu(category, evnet) {
        !evnet && (evnet = '点击');
        try {
            _hmt.push(['_trackEvent', category , evnet]);
        } catch (e) {
            console.log(e);
        }
    }

    //适配移动端以及pc端
    (function () {
        if (Touch) {
            styleStr = '#main {height: 1280px;}header {padding: 25px 0 28px 52px;}header img {width: 146px;height: 36px;}#video_area {width: 628px;height: 365px;border: 1px solid rgba(255,255,255,0.2);}#video {top: 13px;width: 600px;height: 338px;left: 14px;}#content img {margin-top: 70px;margin-left: 132px;width: 466px;height: 60px;}#content p{font-size: 26px;}#first_p {margin: 25px 0 0 50px;}#second_p {margin: 8px 0 0 158px;}#my_bt {margin: 62px 0 95px 124px;width: 431px;height: 110px;}#gif {left: 5px;width: 105px;height: 85px;}#game {height: 1280px;/*background-repeat: no-repeat;*/}#game>img {top: 195px;left: 570px;width: 120px;height: 110px;}#game span {font-size: 57px;top: 220px;left: 601px;}.words {height: 278px;font-size: 27px;line-height: 42px;}.words p:first-child {margin: 36px 40px 0 40px;}.words p:last-child {margin: 0 128px 0 40px;}#input {height: 85px;border-width: 1px 0 1px 0;}#game input {height: 85px;font-size: 28px;}#game_icon {height: 85px;line-height: 85px;}#game_icon img {width: 38px;height: 22px;}#result {height: 410px;}#result img {top: 50px;left: 636px;width: 38px;height: 22px;}#result p {width: 572px;font-size: 28px;line-height: 42px;margin: 36px 108px 0 40px;}#share {height: 1280px;}#share_area {top: 40px;margin-left: 86px;}#result_bj {width: 548px;}#shut {top: 93px;left: 545px;width: 58px;height: 58px;}#share1 {font-size: 24px;margin-left: 214px;margin-bottom: 29px;height: 50px;}#share1 img {width: 38px;height: 38px;}#result_text {top: 578px;font-size: 36px;}#result_text p:first-child {margin-left: 40px;}#result_text p:last-child {margin-left: 91px;}#in_numbers {font-size: 40px;}#share2 {margin-top: 24px;}#share2 img {width: 103px;height: 103px;}#share2 p {font-size: 23.4px;padding-top: 10px;padding-left: 10px;}#pyq_pic {margin-left: 23px;}#qq_pic {margin-left: 84px;}#weibo_pic {margin-left: 84px;}';
            $ADPALLSTYLE(styleStr, 'css', initialize);
        } else {
            styleStr = '#main{width:720px;}#game{width:720px;margin:0 auto;}#share{width:720px;height:1280px;margin:0 auto;}'
            $CREATESTYLE(styleStr, 'css', initialize);
        }
    })();
})();