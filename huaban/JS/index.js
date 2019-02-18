(function () {
    tab();
})();

function tab() {
    let allLis = $("tab_header").getElementsByTagName("li");
    let doms = $("tab_content").getElementsByClassName("dom");
    let lastOne = 0;

    for (let i = 0;i < allLis.length;i++){
        let li =  allLis[i];
        li.onmousedown = function () {
            console.log(i);
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