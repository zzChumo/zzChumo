document.addEventListener('visibilitychange',function(){
    if(document.visibilityState=='hidden'){
        normal_title=document.title;
        document.title='应用摸鱼中...';
    }
    else
        document.title=normal_title;
});    //当用户焦点离开时显示的网页标题

function refresh(){
    window.location.reload();
}    //网页刷新模块

function aHref(s){
    window.location.href=s;
}   //为了最佳的视觉体验，请使用onclick="aHref('https://example')"以代替href属性。

$(document).ready(function(){
    $("#flip").click(function(){
        $("#panel").slideToggle("slow");
    });
});    //jQuery滑动模块，使用前请先自行添加jQuery的script标签

function adjustIframe(){
    var ifm= document.getElementById("bi_iframe");
    ifm.height=document.documentElement.clientHeight;
    ifm.width=document.documentElement.clientWidth;
}    //iframe自适应大小模块

function openNav(){
    document.getElementById('mySidenav').style.left='0';
}

function closeNav(){
    document.getElementById('mySidenav').style.left='-260px';
}    //侧边栏模块
