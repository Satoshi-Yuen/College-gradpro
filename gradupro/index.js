$(function(){    
    if(window.sessionStorage.getItem("role") != null){
        if(window.sessionStorage.getItem("role") == '1'){
            $(".summary-icon.bg-quartenary i").attr("class","fa fa-user")
            $("#firsttitle").html("社团人数")  
            $(".summary-icon.bg-primary i").attr("class","fa fa-child")
            $("#secondtitle").html("骨干人数") 
            $(".summary-icon.bg-secondary i").attr("class","fa fa-group")
            $("#thirdtitle").html("会员人数")   
            $(".summary-icon.bg-tertiary i").attr("class","fa fa-cubes")
            $("#forthtitle").html("发布活动数")  
            $("li").remove("#shenpi")
            $("li").remove("#score")
            $("li").remove("#fileup")
            $("li").remove("#roles")
        }
        else if(window.sessionStorage.getItem("role") == '2'){
            $(".summary-icon.bg-quartenary i").attr("class","fa fa-flag-o")
            $("#firsttitle").html("社团数量")  
            $(".summary-icon.bg-primary i").attr("class","fa fa-user")
            $("#secondtitle").html("社团类别")
            $(".summary-icon.bg-secondary i").attr("class","fa fa-group")
            $("#thirdtitle").html("会员总人数")  
            $(".summary-icon.bg-tertiary i").attr("class","fa fa-cubes")
            $("#forthtitle").html("发布活动总数") 
            $("li").remove("#shetuan")
            $("li").remove("#huodong")
            $("li").remove("#baoming")
            $("li").remove("#huiyuan")
        }
        $(".name").html(window.sessionStorage.getItem("stuname"))     //设置登录的管理员名称
        $("h2").html(window.sessionStorage.getItem("associationname"))   //设置协会名称 东莞理工学院学生社团管理系统 | 歌手协会 | 简介
        $(document).attr("title","东莞理工学院学生社团管理系统 | "+window.sessionStorage.getItem("associationname")+" | 首页");//设置title
        $("#samount").html(window.sessionStorage.getItem("scount"))
        $("#gamount").html(window.sessionStorage.getItem("gcount"))
        $("#hamount").html(window.sessionStorage.getItem("hcount"))
        $("#famount").html(window.sessionStorage.getItem("fcount"))
    }
    else{
        var cookitstuno = getCookie()
        $.ajax({
            url: 'http://localhost:5500/graduationproject/association_manager/index/WelcomeIndex',
            type: "post",
            data: {id:cookitstuno},
            datatype: "json",
            success: function(data){
                if((JSON.parse(data).msg == "Need Authorities!") && (JSON.parse(data).status == "000" || JSON.parse(data).status == "300")){
                    window.location.href='pages-signin.html'
                }
                else{
                    var jsondata = eval("("+data+")")
                    $(".name").html(jsondata.stuname)     //设置登录的管理员名称
                    $("h2").html(jsondata.associationname)   //设置协会名称 东莞理工学院学生社团管理系统 | 歌手协会 | 简介
                    $(document).attr("title","东莞理工学院学生社团管理系统 | "+jsondata.associationname+" | 首页");//设置title
                    $("#samount").html(jsondata.scount)  //社团总人数
                    $("#gamount").html(jsondata.gcount)  //骨干人数
                    $("#hamount").html(jsondata.hcount)   //会员人数
                    $("#famount").html(jsondata.fcount)   //发布活动总数
                    window.sessionStorage.setItem("scount",jsondata.scount)  //社团总人数
                    window.sessionStorage.setItem("gcount",jsondata.gcount)  //骨干人数
                    window.sessionStorage.setItem("hcount",jsondata.hcount)   //会员人数
                    window.sessionStorage.setItem("fcount",jsondata.fcount)   //发布活动总数
                    window.sessionStorage.setItem("stuname",jsondata.stuname)
                    window.sessionStorage.setItem("stunum",jsondata.stunum)
                    window.sessionStorage.setItem("stuage",jsondata.stuage)
                    window.sessionStorage.setItem("stusex",jsondata.stusex)
                    window.sessionStorage.setItem("stugrade",jsondata.stugrade)
                    window.sessionStorage.setItem("stucollege",jsondata.stucollege)
                    window.sessionStorage.setItem("stuprofessclass",jsondata.stuprofessclass)
                    window.sessionStorage.setItem("department",jsondata.department)
                    window.sessionStorage.setItem("title",jsondata.title)
                    window.sessionStorage.setItem("stutele",jsondata.stutele)
                    window.sessionStorage.setItem("associationname",jsondata.associationname)
                    window.sessionStorage.setItem("term",jsondata.term)
                    window.sessionStorage.setItem("password",jsondata.stupassword)
                    window.sessionStorage.setItem("role",jsondata.sturole)
                    if(jsondata.sturole == '1'){
                        $(".summary-icon.bg-quartenary i").attr("class","fa fa-user")
                        $("#firsttitle").html("社团人数")  
                        $(".summary-icon.bg-primary i").attr("class","fa fa-child")
                        $("#secondtitle").html("骨干人数") 
                        $(".summary-icon.bg-secondary i").attr("class","fa fa-group")
                        $("#thirdtitle").html("会员人数")   
                        $(".summary-icon.bg-tertiary i").attr("class","fa fa-cubes")
                        $("#forthtitle").html("发布活动数")
                        $("li").remove("#shenpi")
                        $("li").remove("#score")
                        $("li").remove("#fileup")
                        $("li").remove("#roles")
                    }
                    else if(jsondata.sturole == '2'){
                        $(".summary-icon.bg-quartenary i").attr("class","fa fa-flag-o")
                        $("#firsttitle").html("社团数量")  
                        $(".summary-icon.bg-primary i").attr("class","fa fa-user")
                        $("#secondtitle").html("社团类别")
                        $(".summary-icon.bg-secondary i").attr("class","fa fa-group")
                        $("#thirdtitle").html("会员总人数")  
                        $(".summary-icon.bg-tertiary i").attr("class","fa fa-cubes")
                        $("#forthtitle").html("发布活动总数")
                        $("li").remove("#shetuan")
                        $("li").remove("#huodong")
                        $("li").remove("#baoming")
                        $("li").remove("#huiyuan")
                    }
                }
            },
            error: function(data){
                console.log(data)
            }
        })
    }
})



// 获取cookie
function getCookie(){
    var strCookie = document.cookie
    console.log(strCookie)
    var arrCookie = strCookie.split(";")
    var str
    for(var i=0;i<arrCookie.length;i++){
        var arr=arrCookie[i].split("=")
        if(arr[0] == "stuno") str = arr[1]
    }
    return str
}

// 清除cookie
function clearCookie(){
    var keys = document.cookie.match(/[^=;]+(?=\=)/g)
    if(keys){
        for(var i=keys.length;i--;){
            document.cookie = keys[i] += "=0;expires="+new Date(0).toUTCString()
        }
    }
}