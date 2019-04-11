(function () {
    const marginLeft = 5;
    const marginRight = 10;
    const marginTop = 15;
    const WIDTH = 200;
    const HEIGHT = 300; //用于计算分批，取高度的大致平均数

    const ul = document.getElementById('ul');
    const col = Math.ceil(document.documentElement.clientWidth/ (WIDTH+marginLeft+marginRight)); // 列数
    const row = Math.ceil(document.documentElement.clientHeight/ (HEIGHT+marginTop)); // 每批行数
    const num = col*row;// 每批个数
    const total = 100000; //数据总数
    const count = Math.floor(total/num); // 总批数
    let done = 0; // 完成的分批数
    const heightArr = Array(col).fill(0); // 高度数组

    load(); // 加载首屏

    window.onscroll = function() {
    // 监听屏幕滚动
        if (check()){
            add();
        }
    };

    function load() {
        const frag = document.createDocumentFragment();
        for (let i = 0;i < num;i++){
            let li = document.createElement('li');
            li.innerHTML = `<a><img src="images/${(done*num + i)%100}.jpg"></a>`;
            frag.appendChild(li);
            setStyle(li,done*num + i);
        }
        ul.appendChild(frag);

        done++;
    }

    // 加载后续的图片
    function add(){
        if (done < count){
            window.requestAnimationFrame(load);
        }
    }

    // 判断是否满足加载条件
    function check(){
        const last = ul.lastChild;
        if (last.offsetTop + last.offsetHeight*0.5 < document.documentElement.scrollTop + document.documentElement.clientHeight){
            return true
        }
    }

    // 设置样式
    function setStyle(ele,order) {
       // 保证图片加载完成后再修改样式
        ele.childNodes[0].childNodes[0].onload = function () {
            // offsetWidth 无法取到，<img>规定宽度后会自动缩放，按如下方法取得

            const height = ele.childNodes[0].childNodes[0].offsetHeight + marginTop;
            //const height = Math.round(ele.childNodes[0].childNodes[0].height * (WIDTH/ele.childNodes[0].childNodes[0].width)) + marginTop; 另一种计算方法

            const index = heightArr.indexOf(Math.min.apply(Math,heightArr));
            ele.style.left = marginLeft + (WIDTH+marginLeft+marginRight)*index + 'px';
            console.log(heightArr,index,order);
            ele.style.top = marginTop + heightArr[index] + 'px';
            heightArr[index] = heightArr[index] + height;

            // 避免样式修改时，快速闪现影响观感
            ele.childNodes[0].childNodes[0].style.visibility = 'visible';
        }
    }
})();