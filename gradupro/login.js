$(function(){
    $('#submitbtn').on('click',function(){
        $.ajax({
            url: 'http://localhost:5500/graduationproject/login',
            type: 'post',
            data: $('.formsubbmit').serialize(),
            dataType: 'json',
            success: function(data){
                console.log(data)
                if(data.status == "200"){
                    window.sessionStorage.setItem("stuno",data.user)
                    writeCookie("stuno",window.sessionStorage.getItem("stuno"),18*20*10000)
                    window.location.href="index.html"
                }
            }
        })
    })
})

// 设置cookie
function writeCookie(cookiename,cookievalue,expiredays){
    var exdate = new Date()
    exdate.setTime(Number(exdate)+expiredays)
    document.cookie = cookiename + "=" +escape(cookievalue) + ((expiredays == null)?"":";expires="+exdate.toGMTString())
}