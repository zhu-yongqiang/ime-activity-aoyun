

var CFG = (function() {
    var pathname = window.location.href;
    var sharePath = pathname.substr(0, pathname.lastIndexOf('/') + 1);
    var cfg = {
        shareUrl: sharePath + 'index.html?s=1&',
        shareImg: sharePath,
        shareSummary: '讯飞输入法助力奥运',
        desc: {
                  weibo:{
                            desc1: '#语音输入带你飞#我10秒输了length字，争金牌超神啦！够diao来战！（分享来自@讯飞输入法）',
                            desc2: '#语音输入带你飞#我夺金啦！10秒输了length字，不信你能超过我！？（分享来自@讯飞输入法）',
                            desc3: '#语音输入带你飞#我10秒输了length字，奥运银牌到手啦！你敢跟我比比么？（分享来自@讯飞输入法）',
                            desc4: '#语音输入带你飞#我10秒输了length字，奥运铜牌到手啦！金牌靠你啦？（分享来自@讯飞输入法）',
                            desc5: '#语音输入带你飞#我10秒输入了length字，速度和树懒一样，你来试试吧！（分享来自@讯飞输入法）',
                   	     },
                  qq:{
                            desc1: '我10秒输入了length字，已打破世界纪录！够diao来战！',
                            desc2: '我夺金啦！10秒输入了length字，不信你能超过我！',
                            desc3: '我10秒输入了length字，奥运银牌到手啦！你敢跟我比比么？',
                            desc4: '我10秒输入了length字，奥运铜牌到手啦！金牌靠你啦！',
                            desc5: '我10秒输入了length字，速度和树懒一样，你来试试吧！',
                   	     },
              }
        
    };
    return cfg;
})();