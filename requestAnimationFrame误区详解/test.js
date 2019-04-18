let count = 0;
let flag = false;
let timer = setInterval(function () {
    console.log('update');
    run1();
    count++;
    if (count === 100){
        clearInterval(timer);
    }
},3);

// 正确的节流写法
function run() {
    if (flag) return;
    flag = true;
    window.requestAnimationFrame(() => {
        flag = false;
        console.log('animation');
    });
}

// 错误写法
function run1() {
    window.requestAnimationFrame(() => {
        flag = false;
        console.log('animation');
    });
}