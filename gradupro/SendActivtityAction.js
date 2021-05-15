var ajaxurl
var sendstr, declarelist, releaselist, idstr
var obj = {}
$("body").last().on("click", "#sendbtn",function (){
    swal({
        title: "确定操作吗？",
        text: "你确定要发布" + $(this).closest("tr").children('td').eq(2).html() + "活动吗？",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#0088CC',
        confirmButtonText: '确定'
    })
    ajaxurl = 'http://localhost:5500/graduationproject/association_manager/activities/UpdateActivityByAssociationnameAndActivityname'
    idstr = $(this).closest("tr").children('td').eq(0).html()
    sendstr = $(this).closest("tr").children('td').eq(2).html()
    declarelist = "activitylist"
    releaselist = "ActivityReleaseList"
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
    else if($("body .sweet-alert.showSweetAlert.visible h2").last().html() == "确定操作吗？"){
        $.ajax({
            url: ajaxurl,
            data: {asname:window.sessionStorage.getItem("associationname"),acname:sendstr},
            dataType: "json",
            success: function(data){
                if(data != 0){
                    $.ajax({
                        url: 'http://localhost:5500/graduationproject/association_manager/activitydeclaration/UpdateActivityDeclarationByflag',
                        type: 'get',
                        data: {id:idstr,flag:3},
                        dataType: 'json',
                        success: function(seconddata){
                            var newdeclarelist = JSON.parse(window.sessionStorage.getItem(declarelist))
                            if(seconddata == true){
                                for(var i=0;i < newdeclarelist.length;i++){
                                    if(idstr == newdeclarelist[i]['id']){
                                        obj['activityname'] = newdeclarelist[i]['activityname']
                                        obj['activitydate'] = newdeclarelist[i]['activitydate']
                                        obj['activitytime'] = newdeclarelist[i]['activitystarttime'] + "-" + newdeclarelist[i]['activityendtime']
                                        obj['activityplace'] = newdeclarelist[i]['activityplace']
                                        obj['id'] = data
                                        console.log(obj)
                                        newdeclarelist.splice(i,1)
                                        window.sessionStorage.setItem(declarelist,JSON.stringify(newdeclarelist))
                                        window.sessionStorage.setItem(declarelist+"length",parseInt(window.sessionStorage.getItem(declarelist+"length"))-1)
                                        var newreleaselist = JSON.parse(window.sessionStorage.getItem(releaselist))
                                        newreleaselist.push(obj)
                                        window.sessionStorage.setItem(releaselist,JSON.stringify(newreleaselist))
                                        window.sessionStorage.setItem(releaselist+"length",parseInt(window.sessionStorage.getItem(releaselist+"length"))+1)
                                        break
                                    }
                                }
                                $("#deleteflag").last().remove()
                                swal("操作成功", "活动发布成功！", "success");
                            }
                        }
                    })
                }
                else{
                    swal("操作失败", "发布失败，请重试！", "error");
                }
            }
        })
    }
})