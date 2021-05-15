$(document).on("click",".logouttest",function(){
    var flag = confirm("是否确定退出？")
    if(flag){
        $.ajax({
            url: 'http://localhost:5500/graduationproject/logout',
            type: 'post',
            dataType: 'json',
            success: function(data){
                if(data.status == "100"){
                    window.sessionStorage.clear()
                    alert("退出成功！")
                    window.location.href="pages-signin.html"
                }
            }
        })
    }
})