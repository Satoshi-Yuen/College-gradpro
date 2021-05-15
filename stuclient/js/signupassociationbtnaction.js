var ajaxurl, cancelajaxurl
var normalisignupflag, staffsignupflag, signupstrone, signupstrtwo, cancelnormalsignup, cancelstaffsignup, cancelsignupstrone, cancelsignupstrtwo
$("body").last().on("click", "#signupnormal",function (){
    ajaxurl = "http://localhost:5501/graduationproject/association_manager/joinassociation/CreateJoinAssociation"
    normalisignupflag = $(this).closest("tr").children('td').eq(0).html()
    signupstrone = $(this).closest("tr").children('td').eq(1).html()
    swal({
        title: "确定报名吗？",
        text: "你确定要报名加入"+signupstrone+"成为会员吗？",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#009906',
        confirmButtonText: '确定'
    })
})
$("body").last().on("click","#signupnormalcancel",function(){
    cancelajaxurl = "http://localhost:5501/graduationproject/association_manager/joinassociation/CancelJoinAssociation"
    cancelnormalsignup = $(this).closest("tr").children('td').eq(0).html()
    cancelsignupstrone = $(this).closest("tr").children('td').eq(1).html()
    swal({
        title: "确定取消入会吗？",
        text: "你确定要取消报名加入"+cancelsignupstrone+"成为会员吗？",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#009906',
        confirmButtonText: '确定'
    })
})
$("body").last().on("click", "#signupstaff",function (){
    ajaxurl = "http://localhost:5501/graduationproject/association_manager/joinassociation/CreateJoinAssociation"
    staffsignupflag = $(this).closest("tr").children('td').eq(0).html()
    signupstrone = $(this).closest("tr").children('td').eq(1).html()
    signupstrtwo = $(this).closest("tr").children('td').eq(2).html()
    swal({
        title: "确定报名吗？",
        text: "你确定要报名加入"+signupstrone+"成为干事吗？",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#009906',
        confirmButtonText: '确定'
    })
})
$("body").last().on("click","#signupstaffcancel",function(){
    cancelajaxurl = "http://localhost:5501/graduationproject/association_manager/joinassociation/CancelJoinAssociation"
    cancelstaffsignup = $(this).closest("tr").children('td').eq(0).html()
    cancelsignupstrone = $(this).closest("tr").children('td').eq(1).html()
    cancelsignupstrtwo = $(this).closest("tr").children('td').eq(2).html()
    swal({
        title: "确定取消入会吗？",
        text: "你确定要取消报名加入"+cancelsignupstrone+"成为干事吗？",
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
        if(signupstrtwo == undefined){
            $.ajax({
                url: ajaxurl,
                type: 'post',
                data: JSON.stringify({
                    "stunum": window.sessionStorage.getItem("stunum"),
                    "stuname": window.sessionStorage.getItem("stuname"),
                    "stugrade": window.sessionStorage.getItem("stugrade"),
                    "stucollege": window.sessionStorage.getItem("stucollege"),
                    "stuprofessclass": window.sessionStorage.getItem("stuprofessclass"),
                    "stutele": window.sessionStorage.getItem("stutele"),
                    "associationname": signupstrone,
                    "commstate": 2,
                }),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function(data){
                    if(data == true){
                        var aslist = JSON.parse(window.sessionStorage.getItem("associationmemberslist"))
                        var newmemsignuplist = JSON.parse(window.sessionStorage.getItem("memsignuplist"))
                        var obj = {}
                        var d = new Date()
                        obj.registertime = d.getFullYear() + "-" + (parseInt(d.getMonth()) + 1) + "-" +d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
                        obj.associationname = signupstrone
                        newmemsignuplist.push(obj)
                        window.sessionStorage.setItem("memsignuplist",JSON.stringify(newmemsignuplist))
                        $.each(aslist, function(key, value){
                            if(normalisignupflag == (key + 1)){
                                value.signflag = "取消报名"
                            }
                        })
                        window.sessionStorage.setItem("associationmemberslist",JSON.stringify(aslist))
                        swal("操作成功", "报名参加成功！", "success");
                    }
                    else{
                        swal("操作失败", "报名失败，请重试！", "error");
                    }
                }
            })
        }
        else if(signupstrtwo != undefined){
            $.ajax({
                url: ajaxurl,
                type: 'post',
                data: JSON.stringify({
                    "stunum": window.sessionStorage.getItem("stunum"),
                    "stuname": window.sessionStorage.getItem("stuname"),
                    "stugrade": window.sessionStorage.getItem("stugrade"),
                    "stucollege": window.sessionStorage.getItem("stucollege"),
                    "stuprofessclass": window.sessionStorage.getItem("stuprofessclass"),
                    "stutele": window.sessionStorage.getItem("stutele"),
                    "associationname": signupstrone,
                    "commdepartment": signupstrtwo,
                    "commstate": 1,
                }),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function(data){
                    if(data == true){
                        var aslist = JSON.parse(window.sessionStorage.getItem("associationdeptslist"))
                        var newstaffsignuplist = JSON.parse(window.sessionStorage.getItem("staffsignuplist"))
                        var obj = {}
                        var d = new Date()
                        obj.registertime = d.getFullYear() + "-" + (parseInt(d.getMonth()) + 1) + "-" +d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
                        obj.associationname = signupstrone
                        obj.commdepartment = signupstrtwo
                        newstaffsignuplist.push(obj)
                        window.sessionStorage.setItem("staffsignuplist",JSON.stringify(newstaffsignuplist))
                        $.each(aslist, function(key, value){
                            if(staffsignupflag == (key + 1)){
                                value.signflag = "取消报名"
                            }
                        })
                        window.sessionStorage.setItem("associationdeptslist",JSON.stringify(aslist))
                        swal("操作成功", "报名参加成功！", "success");
                    }
                    else{
                        swal("操作失败", "报名失败，请重试！", "error");
                    }
                }
            })
        } 
    }
    else if($("body .sweet-alert.showSweetAlert.visible h2").last().html() == "确定取消入会吗？"){
        if(cancelsignupstrtwo == undefined){
            $.ajax({
                url: cancelajaxurl,
                type: 'get',
                data: {
                    "stunum": window.sessionStorage.getItem("stunum"),
                    "associationname": cancelsignupstrone,
                    "commdepartment": null
                },
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function(data){
                    if(data == true){
                        var aslist = JSON.parse(window.sessionStorage.getItem("associationmemberslist"))
                        var newmemsignuplist = JSON.parse(window.sessionStorage.getItem("memsignuplist"))
                        $.each(aslist, function(key, value){
                            if(cancelnormalsignup == (key + 1)){
                                value.signflag = "未报名"
                            }
                        })
                        $.each(newmemsignuplist, function(key, value){
                            if(value.associationname == cancelsignupstrone){
                                newmemsignuplist.splice(key,1)
                            }
                        })
                        window.sessionStorage.setItem("associationmemberslist",JSON.stringify(aslist))
                        window.sessionStorage.setItem("memsignuplist",JSON.stringify(newmemsignuplist))
                        swal("操作成功", "取消报名成功！", "success");
                    }
                    else{
                        swal("操作失败", "取消失败，请重试！", "error");
                    }
                }
            })
        }
        else if(cancelsignupstrtwo != undefined){
            $.ajax({
                url: cancelajaxurl,
                type: 'get',
                data: {
                    "stunum": window.sessionStorage.getItem("stunum"),
                    "associationname": cancelsignupstrone,
                    "commdepartment": cancelsignupstrtwo,
                },
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function(data){
                    if(data == true){
                        var aslist = JSON.parse(window.sessionStorage.getItem("associationdeptslist"))
                        var newstaffsignuplist = JSON.parse(window.sessionStorage.getItem("staffsignuplist"))
                        $.each(aslist, function(key, value){
                            if(cancelstaffsignup == (key + 1)){
                                value.signflag = "未报名"
                            }
                        })
                        $.each(newstaffsignuplist, function(key, value){
                            if((value.associationname == cancelsignupstrone)&&(value.commdepartment == cancelsignupstrtwo)){
                                newstaffsignuplist.splice(key,1)
                            }
                        })
                        window.sessionStorage.setItem("associationdeptslist",JSON.stringify(aslist))
                        window.sessionStorage.setItem("staffsignuplist",JSON.stringify(newstaffsignuplist))
                        swal("操作成功", "取消报名成功！", "success");
                    }
                    else{
                        swal("操作失败", "取消失败，请重试！", "error");
                    }
                }
            })
        } 
    }
})