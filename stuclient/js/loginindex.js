$(function(){
   $('#submitbtn').on('click',function(){
       $.ajax({
           url: 'http://localhost:5501/graduationproject/login',
           type: 'post',
           data: $('.login-form').serialize(),
           dataType: 'json',
           success: function(data){
               if(data.status == "200"){
                   window.sessionStorage.setItem("stuno",data.user)
                   writeCookie("stuno",window.sessionStorage.getItem("stuno"),18*20*10000)
                   window.location.href="index.html"
               }
               else{
                  alert("登录失败，请重试！")
               }
           }
       })
   })
})

$('.message a').click(function(){
   $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});



// 设置cookie
function writeCookie(cookiename,cookievalue,expiredays){
   var exdate = new Date()
   exdate.setTime(Number(exdate)+expiredays)
   document.cookie = cookiename + "=" +escape(cookievalue) + ((expiredays == null)?"":";expires="+exdate.toGMTString())
}