var ajaxurl
var auditstr, auditactivityname, auditassociation, auditactivitydate, auditactivitytime, auditactivityplace, auditactivitydatetime
var auditflag
$("body").last().on("click", "#yesbtn",function (){
    ajaxurl = 'http://localhost:5500/graduationproject/association_manager/activitydeclaration/UpdateActivityDeclarationByflag'
    auditstr = $(this).closest("tr").children('td').eq(0).html() 
    auditactivityname = $(this).closest("tr").children('td').eq(2).html()
    auditassociation = $(this).closest("tr").children('td').eq(3).html()
    auditactivitydatetime = $(this).closest("tr").children('td').eq(4).html()
    auditactivityplace = $(this).closest("tr").children('td').eq(5).html()
    var flag = auditactivitydatetime.indexOf(" ")
    auditactivitydate = auditactivitydatetime.substring(0,flag)
    auditactivitytime = auditactivitydatetime.substring(flag+1,auditactivitydatetime.length)
    auditflag = 1
    swal({
        title: "审批通过提示",
        text: "你确定要通过活动" + $(this).closest("tr").children('td').eq(2).html() + "审批吗？",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#0088CC',
        confirmButtonText: '确定'
    })
})
$("body").last().on("click", "#nobtn",function (){
    ajaxurl = 'http://localhost:5500/graduationproject/association_manager/activitydeclaration/UpdateActivityDeclarationByflag'
    auditstr = $(this).closest("tr").children('td').eq(0).html()
    auditflag = 0
    swal({
        title: "不予通过提示",
        text: "你确定要不予活动" + $(this).closest("tr").children('td').eq(2).html() + "通过审批吗？",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#0088CC',
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
    $("#deleteflag").last().removeAttr("id")   
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
            location.reload();
    }
    else if($("body .sweet-alert.showSweetAlert.visible h2").last().html() == "审批通过提示" || $("body .sweet-alert.showSweetAlert.visible h2").last().html() == "不予通过提示"){
        $.ajax({
            url: ajaxurl,
            data: {id:auditstr, flag:auditflag},
            dataType: "json",
            success: function(data){
                if(data == true){
                    for(var i=0;i<JSON.parse(window.sessionStorage.getItem("ActivityAuditList")).length;i++){
                        if(auditstr == JSON.parse(window.sessionStorage.getItem("ActivityAuditList"))[i]['id']){
                            var newdellist = JSON.parse(window.sessionStorage.getItem("ActivityAuditList"))
                            newdellist.splice(i,1)
                            window.sessionStorage.setItem("ActivityAuditList",JSON.stringify(newdellist))
                            window.sessionStorage.setItem("ActivityAuditListLength",parseInt(window.sessionStorage.getItem("ActivityAuditListLength"))-1)
                            break
                        }
                    }
                    swal("操作成功", "已成功审批此活动！", "success");
                }
                else{
                    swal("操作失败", "审批失败，请重试！", "error");
                }
            }
        })
    }
})

