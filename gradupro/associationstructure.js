$(function(){
    $(".name").html(window.sessionStorage.getItem("stuname"))     //设置登录的管理员名称
    $.ajax({
        url: '',
        type: "get",
        data: {association:window.sessionStorage.getItem("associationname")},
        dataType: "json",
        success: function(data){
            $(document).attr("title","东莞理工学院学生社团管理系统 | "+window.sessionStorage.getItem("associationname")+" | 组织结构");//设置title
            // console.log(data)
            // $(".panel-title").html(data.associationname)
            // if(data.associationslogan != null) $(".panel-subtitle").html(data.associationengname + "&#8195;/&#8195;" + data.associationslogan)
            // else $(".panel-subtitle").html(data.associationengname)
            // $(".panel-body p").html(data.associationmes)
            // window.sessionStorage.setItem("associationengname",data.associationengname)
            // window.sessionStorage.setItem("associationslogan",data.associationslogan)
            // window.sessionStorage.setItem("associationmes",data.associationmes)
            
            // $.each(data, function(key, value){
            //     // console.log(key, value)
            //     if(key == "") $('.teststr').append('<div>'+value+'</div>')   // 标签内插入内容
            //     else if(key == "") $('.teststr').append('<div>'+value+'</div>')
            // })
        }
    })
})