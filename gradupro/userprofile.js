$(function(){
    $(".name").html(window.sessionStorage.getItem("stuname"))     //设置登录的管理员名称
    $(document).attr("title","东莞理工学院学生社团管理系统 | "+window.sessionStorage.getItem("associationname")+" | 个人信息");//设置title
    if(window.sessionStorage.getItem("role") == '1') $(".thumb-info-type").html("学生社团内部管理员")
    else if(window.sessionStorage.getItem('role') == '2') $(".thumb-info-type").html("学校社团管理员")
    $(".thumb-info-inner").html(window.sessionStorage.getItem("stuname"))
    $("#primarygrade h3").html(window.sessionStorage.getItem("stugrade"))
    $("#primaryclass h3").html(window.sessionStorage.getItem("stuprofessclass"))
    $("#stuno p").html(window.sessionStorage.getItem("stunum"))
    $("#sex p").html(window.sessionStorage.getItem("stusex"))
    $("#age p").html(window.sessionStorage.getItem("stuage"))
    $("#college p").html(window.sessionStorage.getItem("stucollege"))
    $("#association").html(window.sessionStorage.getItem("associationname"))
    $("#dept").html(window.sessionStorage.getItem("department"))
    $("#dutyname").html(window.sessionStorage.getItem("title"))
})
