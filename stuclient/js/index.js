var scoredata
$(function(){
    if(getCookie() != null){
        $("#topheadlink li").eq(1).remove()
        $("#topheadlink").append('<li><a href="contact.html"><i class="fa fa-credit-card" aria-hidden="true"></i> 个人账户</a>'+
        '</li><li><button class="logouttest"><i class="fa fa-key" aria-hidden="true"></i> 注销登录</button>'+
        '</li>')
        if(window.sessionStorage.getItem("stuname")!=null){
            if(window.sessionStorage.getItem("scoredata") != null){
                scoredata = window.sessionStorage.getItem("scoredata")
                $(".firstscore span").text("年度评分：" + JSON.parse(scoredata)[0].sum)
                $(".firstscore h4").text(JSON.parse(scoredata)[0].associationname)
                $(".secondscore span").text("年度评分：" + JSON.parse(scoredata)[1].sum)
                $(".secondscore h4").text(JSON.parse(scoredata)[1].associationname)
                $(".thirdscore span").text("年度评分：" + JSON.parse(scoredata)[2].sum)
                $(".thirdscore h4").text(JSON.parse(scoredata)[2].associationname)
                $(".fourthscore span").text("年度评分：" + JSON.parse(scoredata)[3].sum)
                $(".fourthscore h4").text(JSON.parse(scoredata)[3].associationname)
                $(".fifthscore span").text("年度评分：" + JSON.parse(scoredata)[4].sum)
                $(".fifthscore h4").text(JSON.parse(scoredata)[4].associationname)
                $(".sixthscore span").text("年度评分：" + JSON.parse(scoredata)[5].sum)
                $(".sixthscore h4").text(JSON.parse(scoredata)[5].associationname)
                $(".seventhscore span").text("年度评分：" + JSON.parse(scoredata)[6].sum)
                $(".seventhscore h4").text(JSON.parse(scoredata)[6].associationname)
                $(".eighthscore span").text("年度评分：" + JSON.parse(scoredata)[7].sum)
                $(".eighthscore h4").text(JSON.parse(scoredata)[7].associationname)
                $(".ninthscore span").text("年度评分：" + JSON.parse(scoredata)[8].sum)
                $(".ninthscore h4").text(JSON.parse(scoredata)[8].associationname)
                $(".tenthscore span").text("年度评分：" + JSON.parse(scoredata)[9].sum)
                $(".tenthscore h4").text(JSON.parse(scoredata)[9].associationname)
            }
        }
        else{
            $.ajax({
                url: 'http://localhost:5501/graduationproject/association_manager/index/WelcomeIndex',
                type: "get",
                data: {id:getCookie()},
                datatype: "json",
                success: function(data){
                    var jsondata = eval("("+data+")")
                    //console.log(jsondata)
                    // $("#samount").html(jsondata.scount)  //社团总人数
                    // $("#gamount").html(jsondata.gcount)  //骨干人数
                    // $("#hamount").html(jsondata.hcount)   //会员人数
                    // $("#famount").html(jsondata.fcount)   //发布活动总数
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
                    window.sessionStorage.setItem("jobslist",JSON.stringify(jsondata.jobslist))
                    console.log(window.sessionStorage.getItem("jobslist"))
                    $.ajax({
                            url: 'http://localhost:5501/graduationproject/association_manager/associationstar/ReadTopTenAssociationStars',
                            type: "get",
                            dataType: "json",
                            success: function(data){
                                scoredata = JSON.stringify(data)
                                window.sessionStorage.setItem("scoredata",scoredata)
                                //console.log("777"+window.sessionStorage.getItem("scoredata"))
                                $(".firstscore span").text("年度评分：" + JSON.parse(scoredata)[0].sum)
                                $(".firstscore h4").text(JSON.parse(scoredata)[0].associationname)
                                $(".secondscore span").text("年度评分：" + JSON.parse(scoredata)[1].sum)
                                $(".secondscore h4").text(JSON.parse(scoredata)[1].associationname)
                                $(".thirdscore span").text("年度评分：" + JSON.parse(scoredata)[2].sum)
                                $(".thirdscore h4").text(JSON.parse(scoredata)[2].associationname)
                                $(".fourthscore span").text("年度评分：" + JSON.parse(scoredata)[3].sum)
                                $(".fourthscore h4").text(JSON.parse(scoredata)[3].associationname)
                                $(".fifthscore span").text("年度评分：" + JSON.parse(scoredata)[4].sum)
                                $(".fifthscore h4").text(JSON.parse(scoredata)[4].associationname)
                                $(".sixthscore span").text("年度评分：" + JSON.parse(scoredata)[5].sum)
                                $(".sixthscore h4").text(JSON.parse(scoredata)[5].associationname)
                                $(".seventhscore span").text("年度评分：" + JSON.parse(scoredata)[6].sum)
                                $(".seventhscore h4").text(JSON.parse(scoredata)[6].associationname)
                                $(".eighthscore span").text("年度评分：" + JSON.parse(scoredata)[7].sum)
                                $(".eighthscore h4").text(JSON.parse(scoredata)[7].associationname)
                                $(".ninthscore span").text("年度评分：" + JSON.parse(scoredata)[8].sum)
                                $(".ninthscore h4").text(JSON.parse(scoredata)[8].associationname)
                                $(".tenthscore span").text("年度评分：" + JSON.parse(scoredata)[9].sum)
                                $(".tenthscore h4").text(JSON.parse(scoredata)[9].associationname)
                            }
                    })
                },
                error: function(data){
                    console.log(data)
                }
            })
        }    
    }
    else{
        window.location.href='LoginPage.html'
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