var formdata = new FormData()
var filename = " ", uploadfilepath, filesinputid
$(function(){
    $(".name").html(window.sessionStorage.getItem("stuname"))     //设置登录的管理员名称
    $(document).attr("title","东莞理工学院学生社团管理系统 | 上传文件");//设置title
    $("#submitrefreshmanafile").bind("DOMNodeInserted",function(){
        if($(this).html() != null) $(".manafilesbtn").attr("style","display: inline-block")
    })
    $("#submitrefreshactivityfile").bind("DOMNodeInserted",function(){
        if($(this).html() != null) $(".activityfilesbtn").attr("style","display: inline-block")
    })
    $("#submitrefreshconstrfile").bind("DOMNodeInserted",function(){
        if($(this).html() != null) $(".constrfilesbtn").attr("style","display: inline-block")
    })
    $("#submitrefreshevalfile").bind("DOMNodeInserted",function(){
        if($(this).html() != null) $(".evalfilesbtn").attr("style","display: inline-block")
    })
    $("#submitrefreshotherfile").bind("DOMNodeInserted",function(){
        if($(this).html() != null) $(".otherfilesbtn").attr("style","display: inline-block")
    })
    
    $(".manafilesbtn").on("click",function(){
        uploadfilepath = "D:\\nginx\\nginx-1.19.7\\html\\gradupro\\filesave\\associationfiles\\ManageOfFlies"
        filesinputid = "#associationmanauploadfile"
        if(filesinputid != null){
            for(var i=0;i<document.querySelector(filesinputid).files.length;i++){
                filename += document.querySelector(filesinputid).files[i].name+" "
                var file = document.querySelector(filesinputid).files[i]
                formdata.append("fileupload"+i,file)
            }
            formdata.append("filepath",uploadfilepath)
        }
        swal({
            title: "确定上传吗？",
            text: "你确定要上传"+filename+"文件吗？",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#0088CC',
            confirmButtonText: '确定'
        })  
    })
    $(".activityfilesbtn").on("click",function(){
        uploadfilepath = "D:\\nginx\\nginx-1.19.7\\html\\gradupro\\filesave\\associationfiles\\ActivityOfFiles"
        filesinputid = "#associationactivityuploadfile"
        if(filesinputid != null){
            for(var i=0;i<document.querySelector(filesinputid).files.length;i++){
                filename += document.querySelector(filesinputid).files[i].name+" "
                var file = document.querySelector(filesinputid).files[i]
                formdata.append("fileupload"+i,file)
            }
            formdata.append("filepath",uploadfilepath)
        }
        swal({
            title: "确定上传吗？",
            text: "你确定要上传"+filename+"文件吗？",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#0088CC',
            confirmButtonText: '确定'
        })
    })
    $(".constrfilesbtn").on("click",function(){
        uploadfilepath = "D:\\nginx\\nginx-1.19.7\\html\\gradupro\\filesave\\associationfiles\\ConstructionOfFiles"
        filesinputid = "#associationconstruploadfile"
        if(filesinputid != null){
            for(var i=0;i<document.querySelector(filesinputid).files.length;i++){
                filename += document.querySelector(filesinputid).files[i].name+" "
                var file = document.querySelector(filesinputid).files[i]
                formdata.append("fileupload"+i,file)
            }
            formdata.append("filepath",uploadfilepath)
        }
        swal({
            title: "确定上传吗？",
            text: "你确定要上传"+filename+"文件吗？",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#0088CC',
            confirmButtonText: '确定'
        })
    })
    $(".evalfilesbtn").on("click",function(){
        uploadfilepath = "D:\\nginx\\nginx-1.19.7\\html\\gradupro\\filesave\\associationfiles\\EvaluationOfFiles"
        filesinputid = "#associationevaluploadfile"
        if(filesinputid != null){
            for(var i=0;i<document.querySelector(filesinputid).files.length;i++){
                filename += document.querySelector(filesinputid).files[i].name+" "
                var file = document.querySelector(filesinputid).files[i]
                formdata.append("fileupload"+i,file)
            }
            formdata.append("filepath",uploadfilepath)
        }
        swal({
            title: "确定上传吗？",
            text: "你确定要上传"+filename+"文件吗？",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#0088CC',
            confirmButtonText: '确定'
        })
    })
    $(".otherfilesbtn").on("click",function(){
        uploadfilepath = "D:\\nginx\\nginx-1.19.7\\html\\gradupro\\filesave\\associationfiles\\OtherFiles"
        filesinputid = "#associationotheruploadfile"
        if(filesinputid != null){
            for(var i=0;i<document.querySelector(filesinputid).files.length;i++){
                filename += document.querySelector(filesinputid).files[i].name+" "
                var file = document.querySelector(filesinputid).files[i]
                formdata.append("fileupload"+i,file)
            }
            formdata.append("filepath",uploadfilepath)
        }
        swal({
            title: "确定上传吗？",
            text: "你确定要上传"+filename+"文件吗？",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#0088CC',
            confirmButtonText: '确定'
        })
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
            location.reload();
    }
    else if($("body .sweet-alert.showSweetAlert.visible h2").last().html() == "确定上传吗？"){
        $.ajax({
            url: "http://localhost:5500/graduationproject/association_manager/UploadEiles/fileupload",
            type: 'post',
            data: formdata,
            contentType: false,
            processData: false,
            success: function(data){
                if(data == 1){
                    swal("操作成功", "文件上传成功！", "success");
                }
                else swal("操作失败", "上传失败，请重试！", "error");
            },
            error: function(data){
                console.log(data)
            }
        })
    }
})