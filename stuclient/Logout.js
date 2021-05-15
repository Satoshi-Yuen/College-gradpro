$(document).on("click",".logouttest",function(){
    layer.msg('是否退出登录？', {
        time: 0 //不自动关闭
        ,btn: ['确定', '取消']
        ,yes: function(){
            $.ajax({
                url: 'http://localhost:5501/graduationproject/logout',
                type: 'post',
                dataType: 'json',
                success: function (data) {
                    if (data.status == "100") {
                        window.sessionStorage.clear()
                        alert("退出成功！")
                        window.location.href = "LoginPage.html"
                    }
                }
            })
        }
    });
})