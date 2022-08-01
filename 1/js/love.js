/**
 * Created by yi on 2018/2/14.
 */
/*输入520提交跳转到love页*/
$(function(){
    //按钮单击事件
    $(".love_btn").click(function(){
        //获取文本框的值
        var text = $(".love_text").val();
        if(text == "520"){
            //输入正确跳转页面
            window.location.href="love.html";
        }else{
            //输入错误弹框提示
            alert("密码不是这个啦，认真点啦！");
        }
    });
})
//文字数组
var loves = new Array(
    "“给我一首歌的时间”",
    "我将用世界各地的语言对你说那三个字。",
    "没有惊吓，尽头才是惊喜！",
    "准备好哦，要开始啦！",
    "我爱你(汉语)[wǒ ài nǐ]",
    "我中意你（粤语）[o zhong yi nei]",
    "哇爱丽（闽南语）[wa ai li]",
    "I Love You（英语）[爱老虎油]",
    "Je t`aime（法语）[惹带么]",
    "Ich liebe Dich（德语）[衣西里拔弟兮]",
    "Minarakastan sinua（芬兰）[明那拉卡司谈洗奴娃]",
    "IK hou van jou（荷兰）[阿荣吼范丸]",
    "Miluji te（捷克）[米卢急特]",
    "Jeg elsker dig（丹麦）[接个爱死替个]",
    "chit pa de（缅甸）[起拍得]",
    "あいしてる （日语）[阿姨兮带路]",
    "사랑해（韩语）[3朗嗨哟]",
    "S`agapo（希腊语）[萨哈泼]",
    "Я люблю тебя（俄语）[鸭鸡不鸭留不留]",
    "Seni seviyorum（土耳其）[腮内腮围有润]",
    "ti amo（意大利语）[提阿么]",
    "哦作兴嫩（南昌话）[o zuo xing nen]",
    "用遍全世界的语言说我爱你",
    "也比不了我现在要对你说的",
    "哦洗欢里（文港话）[o xi huan li]"
);
//初始化文字数组下标
var i = 0;
//文字动态效果显示
function love(){
    $(".love_you").html(loves[i++]);
    if(i == loves.length){
        i = 0;
        ILoveYou();
        return;
    }
    setTimeout(hidden,3500);
}
//显示文字
function show(){
    $(".love_you").fadeIn(3000,love());
}
//隐藏文字
function hidden(){
    $(".love_you").fadeOut(3000);
    setTimeout(show,3500);
}
//初始化图片地址
var img_start = 2;
//最大图片数
var img_end = 12;
//图片格式
var img_format = "jpg";
//显示背景
function showImg(){
    var url = "images/"+(img_start++)+"."+img_format;
    $(".bgImg").attr("src",url);
    if(img_start == img_end){
        img_start = 1;
    }
    setTimeout(himg,3500);
}

//显示背景图片
function simg() {
    $(".bgImg").fadeIn(3000, showImg());
}

//隐藏背景图片
function himg() {
    $(".bgImg").fadeOut(3000);
    setTimeout(simg, 3500);
}

function audioAutoPlay() {
    document.getElementById('bgm').play();
}

//--创建触摸监听，当浏览器打开页面时，触摸屏幕触发事件，进行音频播放
document.addEventListener('touchstart', function () {
    audioAutoPlay();
});
// 点击时
document.addEventListener('click', function () {
    audioAutoPlay();
});

//爱心切片图格式
var heart_img_format = "jpg";
//爱心切片图前缀
var heart_img_pre = "1_";

/**
 * 爱心墙
 * 由42个小矩形（长为110px,宽为100px）7x6排列组成
 * 自定义图片填充小矩形，形成爱心状
 */
function showLoveHeart(){
    for (var k = 0;k < 6;k++){
        var ul = "<ul></ul>";
        $(".love_heart").append(ul);
        for(var i = 0;i < 7;i++){
            var j = k*7+i+1;
            if(j == 1 || j == 4 || j == 7 || j == 22 || j == 28 || j == 29 || j == 30 || j == 34 || j == 35 || j == 36 || j == 37 || j == 38 || j == 40 || j == 41 || j == 42){
                var li = "<li></li>"
                $("ul:eq("+k+")").append(li);
                continue;
            }
            //如果图片名称格式存在01,02,03...09,10,11加入此判断
            if(j < 10){
                j = "0"+j;
            }
            var img = "<li><img src='images/map/"+heart_img_pre+j+"."+heart_img_format+"'></li>";
            $("ul:eq("+k+")").append(img);
        }
    }
}
/*显示爱心墙*/
function ILoveYou(){
    showLoveHeart();
    $(".bgImg").addClass("bgImg_2");
    setTimeout("$('.bgImg').fadeOut(3000,showFlower())",2500);
    $(".love_heart").fadeIn(4000);
    return;
}
/*落花效果*/
function showFlower(){
    //清除落花
    $("body").snowfall('clear');
    //开启落花
    $("body").snowfall({
        image: "images/huaban.png",//自定义落花图片
        flakeCount:35,//落花显示数量
        minSize: 5,//落花最小体积
        maxSize: 22//落花最大体积
    });
}
//初始化
function init(){
    $(".bgImg").fadeOut(2000,function(){
        simg();/*动态加载背景图片效果*/
        show();/*动态显示文字效果*/
    });

}
//初始化图片
function initImg(){
    for(var i = 1;i <= img_end;i++){
        $.get("images/"+i+"."+img_format);
    }
}