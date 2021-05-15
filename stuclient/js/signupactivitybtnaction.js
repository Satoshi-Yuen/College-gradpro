var ajaxurl, secondajaxurl, cancelurl
var signupstrone, signupstrtwo, signupstrthree, signupflag,cancelsignupflag
$("body").last().on("click", "#signupac",function (){
    secondajaxurl = "http://localhost:5501/graduationproject/association_manager/activityregistration/CreateActivityRegistration"
    signupstrone = $(this).closest("tr").children('td').eq(1).html()
    signupstrtwo = $(this).closest("tr").children('td').eq(2).html()
    signupstrthree = $(this).closest("tr").children('td').eq(3).html()
    signupflag = $(this).closest("tr").children('td').eq(0).html()
    swal({
        title: "确定报名吗？",
        text: "你确定要报名参加"+signupstrtwo+"吗？",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#009906',
        confirmButtonText: '确定'
    })
})
$("body").last().on("click", "#signupaccancel",function (){
    cancelurl = "http://localhost:5501/graduationproject/association_manager/activityregistration/CancelActivityRegistration"
    cancelsignupflag = $(this).closest("tr").children('td').eq(0).html()
    signupstrone = $(this).closest("tr").children('td').eq(1).html()
    signupstrtwo = $(this).closest("tr").children('td').eq(2).html()
    swal({
        title: "确定取消报名吗？",
        text: "你确定要取消活动"+signupstrtwo+"的报名吗？",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#009906',
        confirmButtonText: '确定'
    })
})
$("body").last().on("click", ".sweet-alert.showSweetAlert.visible .cancel",function (){
    $(this).parent('div').parent('div').replaceWith('<div><div class="sweet-overlay" tabIndex="-1"></div>'+
    '<div class="sweet-alert" tabIndex="-1">'+
        '<div class="icon warning"> '+
            '<span class="wbody"></span> '+
            '<span class="dot"></span> '+
        '</div> '+
        '<div class="icon success"> '+
            '<span class="line tip"></span> '+
            '<span class="line long"></span> '+
            '<div class="placeholder"></div> '+
            '<div class="fix"></div> '+
        '</div> '+
        '<h2>Title</h2>'+
        '<p>Text</p>'+
        '<button class="cancel" tabIndex="2">Cancel</button>'+
        '<button class="confirm" id="okbtn" tabIndex="1">OK</button></div></div>')  
})
$("body").last().on("click", ".sweet-alert.showSweetAlert.visible .confirm",function (){
    if($("body .sweet-alert.showSweetAlert.visible h2").last().html() == "操作成功" || $("body .sweet-alert.showSweetAlert.visible h2").last().html() == "操作失败"){
        $(this).parent('div').parent('div').replaceWith('<div><div class="sweet-overlay" tabIndex="-1"></div>'+
        '<div class="sweet-alert" tabIndex="-1">'+
            '<div class="icon warning"> '+
                '<span class="wbody"></span> '+
                '<span class="dot"></span> '+
            '</div> '+
            '<div class="icon success"> '+
                '<span class="line tip"></span> '+
                '<span class="line long"></span> '+
                '<div class="placeholder"></div> '+
                '<div class="fix"></div> '+
            '</div> '+
            '<h2>Title</h2>'+
            '<p>Text</p>'+
            '<button class="cancel" tabIndex="2">Cancel</button>'+
            '<button class="confirm" id="okbtn" tabIndex="1">OK</button></div></div>') 
        location.reload()    
    }
    else if($("body .sweet-alert.showSweetAlert.visible h2").last().html() == "确定报名吗？"){
        $.ajax({
            url: secondajaxurl,
            async: false,
            type: "POST",
            data: JSON.stringify({
                "stunum": window.sessionStorage.getItem("stunum"),
                "stuname": window.sessionStorage.getItem("stuname"),
                "stuprofessclass": window.sessionStorage.getItem("stuprofessclass"),
                "stutele": window.sessionStorage.getItem("stutele"),
                "activityname": signupstrtwo,
                "associationname": signupstrone,
                "activitydate": signupstrthree,
            }),
            dataType: "json",    
            contentType: "application/json; charset=utf-8",
            success: function(data){
                if(data == true){
                    var aclist = JSON.parse(window.sessionStorage.getItem("activitieslist"))
                    var newacsignuplist = JSON.parse(window.sessionStorage.getItem("acsignuplist"))
                    var obj = {}
                    var d = new Date()
                    $.each((aclist), function(key, value){
                        if(signupflag == (key + 1)){
                            value.signflag = "取消报名"
                        }
                    })
                    obj.associationname = signupstrone
                    obj.registertime = d.getFullYear() + "-" + (parseInt(d.getMonth()) + 1) + "-" +d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
                    obj.activityname = signupstrtwo
                    newacsignuplist.push(obj)
                    window.sessionStorage.setItem("acsignuplist",JSON.stringify(newacsignuplist))
                    window.sessionStorage.setItem("activitieslist",JSON.stringify(aclist))
                    swal("操作成功", "报名参加成功！", "success");
                }
                else{
                    swal("操作失败", "报名失败，请重试！", "error");
                }  
            }
        })
    }
    else if($("body .sweet-alert.showSweetAlert.visible h2").last().html() == "确定取消报名吗？"){
        $.ajax({
            url: cancelurl,
            async: false,
            type: "get",
            data: {
                "stunum": window.sessionStorage.getItem("stunum"),
                "activityname": signupstrtwo,
                "associationname": signupstrone,
            },
            dataType: "json",    
            contentType: "application/json; charset=utf-8",
            success: function(data){
                if(data != 0){
                    var aclist = JSON.parse(window.sessionStorage.getItem("activitieslist"))
                    var newacsignuplist = JSON.parse(window.sessionStorage.getItem("acsignuplist"))
                    $.each(aclist, function(key, value){
                        if(cancelsignupflag == (key + 1)){
                            value.signflag = "未报名"
                        }
                    })
                    $.each(newacsignuplist, function(key, value){
                        if((value.activityname == signupstrtwo)&&(value.associationname == signupstrone)){
                            newacsignuplist.splice(key,1)
                        }
                    })
                    window.sessionStorage.setItem("activitieslist",JSON.stringify(aclist))
                    window.sessionStorage.setItem("acsignuplist",JSON.stringify(newacsignuplist))
                    swal("操作成功", "成功取消报名！", "success");
                }
                else{
                    swal("操作失败", "取消失败，请重试！", "error");
                }  
            }
        })
    }
})