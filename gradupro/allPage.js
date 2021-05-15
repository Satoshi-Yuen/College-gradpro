$(".name").html(window.sessionStorage.getItem("stuname"))     //设置登录的管理员名称
if(window.sessionStorage.getItem("role") != null){
    if(window.sessionStorage.getItem("role") == '1'){
        $("li").remove("#shenpi")
        $("li").remove("#score")
        $("li").remove("#fileup")
        $("li").remove("#roles")
    }
    else if(window.sessionStorage.getItem("role") == '2'){
        $("li").remove("#shetuan")
        $("li").remove("#huodong")
        $("li").remove("#baoming")
        $("li").remove("#huiyuan")
    }
}