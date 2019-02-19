(function () {
    bannerAutoPlay(); //广告轮播
    tab(); //选项卡
    autoCreateImg(); //生成瀑布流内容
    setTimeout(function () {
        waterFull("dom_pull","box"); //布局瀑布流
    },500);
    
    window.onscroll = function () {
        if (checkWillLoadImage()){ //动态加载瀑布流
            autoCreateImg();
            waterFull("dom_pull","box");
        }

        let scrollTop = scroll().top; //中部导航栏吸顶
        if (scrollTop >= 150){
            $("top_nav").style.display = "block";
            $("elevator_item").style.display = "block";
        }else {
            $("top_nav").style.display = "none";
            $("elevator_item").style.display = "none";
        }
    };

    window.onresize = function () {
        if (checkWillLoadImage()){ //窗口变化后，重新动态加载
            autoCreateImg();
        }
        waterFull("dom_pull","box");
    };

    $("login").onclick = function () { //登录蒙版
        $("mask").style.display = "block";
    };
    $("close_btn").onclick = function () {
        $("mask").style.display = "none";
    };

    $("elevator").onclick = toTop; //一键返回顶部，根据浏览器不同，scrollTop所属对象也不同

})(window);

function toTop() {//去除了IE
    if(document.compatMode === 'CSS1Compat'){ //  标准兼容模式开启(严格模式)
        buffer(document.documentElement,{scrollTop:0},null);
    }else{
        buffer(document.body,{scrollTop:0},null);
    }
}

function bannerAutoPlay() {
    let lis = $("slider_banner").getElementsByTagName("li");
    let index = 0;

    setInterval(function () {
        for (let i = 0;i < lis.length;i++){
            buffer(lis[i],{opacity:0},null);
        }
        buffer(lis[index],{opacity:1},null);
        index++;

        if (index === lis.length){
           index = 0;
        }
    },2000)
}

function autoCreateImg() {
    let json = [
        {txt: '明百无禁忌，偏偏你是一百零一。', pic: 'images/0.jpg'},
        {txt: '小熊给你，你不准走。', pic: 'images/1.jpg'},
        {txt: '你应该在淘宝上上架，因为你也是宝贝。', pic: 'images/2.jpg'},
        {txt: '你生是我的大肥猪，死是我的五花肉。', pic: 'images/3.jpg'},
        {txt: '浮生一程，有你便幸', pic: 'images/4.jpg'},
        {txt: '笙歌浅酒，一生温柔', pic: 'images/5.jpg'},
        {txt: '藏不住的感情，理直气壮好了', pic: 'images/6.jpg'},
        {txt: '我不但可爱，我还可爱你呢', pic: 'images/7.jpg'},
        {txt: '不想周游世界，只想在你心门口听雨喝茶', pic: 'images/8.jpg'},
        {txt: '见山是山，见水是水，见你是全世界', pic: 'images/9.jpg'},
        {txt: '好想假装跑太快，和你撞个满怀', pic: 'images/10.jpg'},
        {txt: '跟我回家吧，在外面你也是一个人', pic: 'images/11.jpg'},
        {txt: '愿我如星君如月，夜夜流光相皎洁', pic: 'images/12.jpg'},
        {txt: '浮世三千吾爱有三，日月与卿', pic: 'images/13.jpg'},
        {txt: '我想跟你去流浪，从北到南，从安生到腐烂', pic: 'images/14.jpg'},
        {txt: '监渊羡鱼，不如退尔拥你', pic: 'images/15.jpg'},
        {txt: '我还是很喜欢你，像风走了八千里，不问归期', pic: 'images/16.jpg'},
        {txt: '清风千里，霁月寄你', pic: 'images/17.jpg'},
        {txt: '与君共途，不枉此生', pic: 'images/18.jpg'},
        {txt: '世界就是一个巨大的娃娃机，我隔着玻璃只想要你', pic: 'images/19.jpg'},
        {txt: '我打麻将一缺三，斗地主一缺二，谈恋爱缺你一个', pic: 'images/20.jpg'},
        {txt: '手不要给别人牵，怀抱也要留给我', pic: 'images/21.jpg'},
        {txt: '三生有点长，不知能否与你过一生', pic: 'images/22.jpg'},
        {txt: '可爱喜欢上了笨蛋，你我就是天意使然', pic: 'images/23.jpg'},
        {txt: '世界上有两种人，一种是你，一种是其他人', pic: 'images/24.jpg'},
        {txt: '赌书泼茶，一世韶光', pic: 'images/25.jpg'},
        {txt: '一个宇宙，八个行星，二百零四个国家，七个大洲，竟然能如此荣幸遇见你', pic: 'images/26.jpg'},
        {txt: '你要是愿意，我就永远爱你，你要是不愿意我也爱你', pic: 'images/27.jpg'},
        {txt: '你知道我最爱的是什么吗？看第一个字就好', pic: 'images/28.jpg'},
        {txt: '我所有关于平淡生活的幻想里面都有你', pic: 'images/29.jpg'}
    ],txt,pic,str,htmlStr;

    for (let i = 0;i < 30;i++){
        str = $("dom_pull").innerHTML;

        txt = json[i].txt;
        pic = json[i].pic;

        htmlStr = "<div class='box'>" +
            "<div class='pic'>" +
            "<img src=" + pic + " alt=''>" +
            "<div class='cover'></div>" +
            "</div>" +
            "<p>" + txt + "</p>" +
        "<div class='btn-box'>" +
            "<a class='collect'>采集</a>" +
            "<a class='like'>" +
            "<span class='heart'></span>" +
            "</a></div></div>";

        str += htmlStr;
        $("dom_pull").innerHTML = str;

    }

    let wrapBox= $("dom_pull").getElementsByClassName("box");
    let wrapPic = $("dom_pull").getElementsByClassName("pic");
    for (let j = 0;j < wrapBox.length;j++) {
        wrapBox[j].onmouseover = function () {
            this.childNodes[2].style.display = "block";
        };
        wrapBox[j].onmouseout = function () {
            this.childNodes[2].style.display = "none";
        };
        wrapPic[j].onmouseover = function () {
            this.childNodes[1].style.display = "block";
        };
        wrapPic[j].onmouseout = function () {
            this.childNodes[1].style.display = "none";
        };
    }
}

function tab() {
    let allLis = $("tab_header").getElementsByTagName("li");
    let doms = $("tab_content").getElementsByClassName("dom");
    let lastOne = 0;

    for (let i = 0;i < allLis.length;i++){
        let li =  allLis[i];
        li.onmousedown = function () {
            allLis[lastOne].className = "";
            doms[lastOne].style.display = "none";
            this.className = "current";
            doms[i].style.display = "block";
            lastOne = i;
        }
    }
}

function $(id) {
    return typeof id === "string" ? document.getElementById(id) : null;
}