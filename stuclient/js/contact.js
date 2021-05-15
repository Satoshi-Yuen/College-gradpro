$(function(){
    $(".contact-info").children("p").eq(0).append('<span class="contact-blank">学号： </span><span>' + window.sessionStorage.getItem("stunum") + '</span>')
    $(".contact-info").children("p").eq(1).append('<span class="contact-blank">姓名： </span><span>' + window.sessionStorage.getItem("stuname") + '</span>')
    $(".contact-info").children("p").eq(2).append('<span class="contact-blank">年级： </span><span>' + window.sessionStorage.getItem("stugrade") + '</span>')
    $(".contact-info").children("p").eq(3).append('<span class="contact-blank">专业班级： </span><span>' + window.sessionStorage.getItem("stuprofessclass") + '</span>')
    $(".contact-info").children("p").eq(4).append('<span class="contact-blank">学院： </span><span>' + window.sessionStorage.getItem("stucollege") + '</span>')
    $(".contact-info").children("p").eq(5).append('<span class="contact-blank">联系方式： </span><span>' + window.sessionStorage.getItem("stutele") + '</span>')
    $("#asname").attr("placeholder",window.sessionStorage.getItem("associationname"))
    $("#status").attr("placeholder",window.sessionStorage.getItem("department")+window.sessionStorage.getItem("title"))
    $("#time").attr("placeholder","2021-05-31")
    var num = 0
    if(window.sessionStorage.getItem("jobslist") != undefined){
        var newjsonlist = window.sessionStorage.getItem("jobslist")
        $.each(JSON.parse(newjsonlist),function(key,value){
            num += 1
            var str
            if(value.flag == 2){
                str = "正在审批"
            }
            else if(value.flag == 0){
                str = "审批未通过"
            }
            else if(value.flag == 1){
                str = "审批通过"
            }
            $(".layui-table tbody").append('<tr>'+
            '<td>' + num + '</td>' +
            '<td>' + value.uploadtime + '</td>' +
            '<td>' + str + '</td>' +
            '<td>' + value.auditassociation + '预成立申请' + '</td>' +
            '</tr>')
        })
    }
    if(window.sessionStorage.getItem("acsignuplist") != undefined || window.sessionStorage.getItem("acsignuplist") != null){
        var newjsonlist = window.sessionStorage.getItem("acsignuplist")
        $.each(JSON.parse(newjsonlist),function(key,value){
            num += 1
            $(".layui-table tbody").append('<tr>'+
            '<td>' + num + '</td>' +
            '<td>' + value.registertime + '</td>' +
            '<td>已报名</td>' +
            '<td>' + value.activityname + '（活动）</td>' +
            '</tr>')
        })
    }
    if(window.sessionStorage.getItem("staffsignuplist") != undefined || window.sessionStorage.getItem("staffsignuplist") != null){
        var newjsonlist = window.sessionStorage.getItem("staffsignuplist")
        $.each(JSON.parse(newjsonlist),function(key,value){
            num += 1
            $(".layui-table tbody").append('<tr>'+
            '<td>' + num + '</td>' +
            '<td>' + value.registertime + '</td>' +
            '<td>已报名</td>' +
            '<td>' + value.associationname + '-' + value.commdepartment + "（干事报名）" + '</td>' +
            '</tr>')
        })
    }
    if(window.sessionStorage.getItem("memsignuplist") != undefined || window.sessionStorage.getItem("memsignuplist") != null){
        var newjsonlist = window.sessionStorage.getItem("memsignuplist")
        $.each(JSON.parse(newjsonlist),function(key,value){
            num += 1
            $(".layui-table tbody").append('<tr>'+
            '<td>' + num + '</td>' +
            '<td>' + value.registertime + '</td>' +
            '<td>已报名</td>' +
            '<td>' + value.associationname + '（会员报名）' + '</td>' +
            '</tr>')
        })
    }
    if((window.sessionStorage.getItem("acsignuplist") == undefined || window.sessionStorage.getItem("acsignuplist") == null)&&
        (window.sessionStorage.getItem("staffsignuplist") == undefined || window.sessionStorage.getItem("staffsignuplist") == null)&&
        (window.sessionStorage.getItem("memsignuplist") == undefined || window.sessionStorage.getItem("memsignuplist") == null)&&
        (window.sessionStorage.getItem("jobslist") == undefined || window.sessionStorage.getItem("jobslist") == null)){
        $(".layui-table tbody").append('<tr><td colspan="4">这个人很懒 没有留下任何社团足迹</td></tr>')
    }
})
