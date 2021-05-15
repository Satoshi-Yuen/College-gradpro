var ajaxurl
var delstr
var dellist
$("body").last().on("click", "#deletebtn",function (){
    if($(this).closest("tr").attr( "class") == "declarebodytr"){
        ajaxurl = 'http://localhost:5500/graduationproject/association_manager/activitydeclaration/DeleteActivityDeclaration'
        delstr = $(this).closest("tr").children('td').eq(0).html()
        dellist = "activitylist"
    }
    if($(this).closest("tr").attr( "class") == "releasebodytr"){
        ajaxurl = 'http://localhost:5500/graduationproject/association_manager/activities/DeleteActivity'
        delstr = $(this).closest("tr").children('td').eq(0).html()
        dellist = "ActivityReleaseList"
    }
    if($(this).closest("tr").attr( "class") == "staffsbodytr"){
        ajaxurl = 'http://localhost:5500/graduationproject/association_manager/staffs/DeleteStaff'
        delstr = $(this).closest("tr").children('td').eq(2).html()
        dellist = "WorkMembersList"
    }
    if($(this).closest("tr").attr( "class") == "membersbodytr"){
        ajaxurl = 'http://localhost:5500/graduationproject/association_manager/members/DeleteMember'
        delstr = $(this).closest("tr").children('td').eq(2).html()
        dellist = "NormalMembersList"
    }
    if($(this).closest("tr").attr( "class") == "activityapplybodytr"){
        ajaxurl = 'http://localhost:5500/graduationproject/association_manager/activityregistration/DeleteActivityRegistration'
        delstr = $(this).closest("tr").children('td').eq(0).html()
        dellist = "ActivitySignList"
    }
    swal({
        title: "确定删除吗？",
        text: "你确定要删除这条记录吗？",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#0088CC',
        confirmButtonText: '确定'
    })
    $(this).closest("tr").attr( "id","deleteflag")
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
    else if($("body .sweet-alert.showSweetAlert.visible h2").last().html() == "确定删除吗？"){
        $.ajax({
            url: ajaxurl,
            data: {flagstr:delstr},
            dataType: "json",
            success: function(data){
                if(data == true){
                    var newdellist = JSON.parse(window.sessionStorage.getItem(dellist))
                    $("#deleteflag").last().remove()
                    for(var i=0;i < newdellist.length;i++){
                        if((delstr == newdellist[i]['id'])||(delstr == newdellist[i]['stunum'])){
                            newdellist.splice(i,1)
                            window.sessionStorage.setItem(dellist,JSON.stringify(newdellist))
                            window.sessionStorage.setItem(dellist+"length",parseInt(window.sessionStorage.getItem(dellist+"length"))-1)
                            break
                        }
                    }
                    swal("操作成功", "恭喜你，删除成功！", "success");
                }
                else{
                    swal("操作失败", "删除失败，请重试！", "error");
                }
            }
        })
    }
})


