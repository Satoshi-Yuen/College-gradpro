$(function(){
    $(".name").html(window.sessionStorage.getItem("stuname"))     //设置登录的管理员名称
    $(".pull-left").attr("src","assets/images/course/" + window.sessionStorage.getItem("associationname") + ".jpg")
    $.ajax({
        url: 'http://localhost:5500/graduationproject/association_manager/association/AssociationData',
        type: "get",
        data: {association:window.sessionStorage.getItem("associationname")},
        dataType: "json",
        success: function(data){
            $(document).attr("title","东莞理工学院学生社团管理系统 | "+data.associationname+" | 简介");//设置title
            $(".panel-title").html(data.associationname)
            if(data.associationslogan != null) $(".panel-subtitle").html(data.associationengname + "&#8195;/&#8195;" + data.associationslogan)
            else $(".panel-subtitle").html(data.associationengname)
            $(".panel-body p").html(data.associationmes)
            window.sessionStorage.setItem("associationengname",data.associationengname)
            window.sessionStorage.setItem("associationslogan",data.associationslogan)
            window.sessionStorage.setItem("associationmes",data.associationmes)
        }
    })
})