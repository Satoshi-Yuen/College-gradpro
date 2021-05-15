$(function(){
    var seconds = 5
    $(".readnote").on("click",function(){
        timer(seconds)//执行函数
    })
    $(document).ready(function () {
        $(".readnote").trigger("click")
    })
    $("body").last().on("click","#readnote",function(){
        $(".uploadbtn").append('<form name="form" id="form" method="post" enctype="multipart/form-data">'+
        '<input type="file" name="upload" id="upload"style="display: none;"'+
            'onchange="document.form.path.value=this.value"/>'+
        '<input type="button" value="上传申请资料" onclick="document.form.upload.click()">'+
        '<input name="path" id="path" readonly>'+
        '<input type="button" id="submitbtn" value="提交">'+
   '</form>')
        $(this).remove()
    })

    $("body").last().on("click","#submitbtn",function(){
        var formdata = new FormData()
        formdata.append("files",document.querySelector("#upload").files[0])
        formdata.append("filepath","D:\\nginx\\nginx-1.19.7\\html\\gradupro\\filesave\\associationAuditFiles")
        var flag = document.querySelector("#upload").files[0].name.indexOf("申")
        var frontstr = document.querySelector("#upload").files[0].name.substring(0,flag)
        console.log(frontstr)
        var allfilename = document.querySelector("#upload").files[0].name
        $.ajax({
            url: 'http://localhost:5501/graduationproject/association_manager/UploadEiles/fileupload',
            type: 'post',
            data: formdata,
            contentType: false,
            processData: false,
            success: function(data){
                if(data == 1){
                    $.ajax({
                        url: 'http://localhost:5501/graduationproject/association_manager/associationregister/CreateAssociationRegister',
                        type: 'post',
                        async: false,
                        data: JSON.stringify({
                            "auditassociation": frontstr,
                            "stunum": window.sessionStorage.getItem("stunum"),
                            "stuname": window.sessionStorage.getItem("stuname"),
                            "stutele": window.sessionStorage.getItem("stutele"),
                            "filename": allfilename,
                            "flag": 2,
                        }),
                        dataType:"json",
                        contentType: "application/json; charset=utf-8",
                        success: function(data){
                            if(data > 0){
                                layer.alert("申请传送成功，请等待审批！", {icon: 6})
                                var json = {}
                                var d = new Date()
                                var str = ''
                                str += d.getFullYear() + '-' 
                                str += d.getMonth() + 1 + '-' 
                                str += d.getDate() + ' '
                                str += d.getHours() + ':'
                                str += d.getMinutes()
                                json.uploadtime = str
                                json.auditassociation = frontstr
                                json.flag = 2
                                if((window.sessionStorage.getItem("jobslist") == undefined)||(window.sessionStorage.getItem("jobslist") == null)){
                                    var jsonlist = []
                                    jsonlist.push(json)
                                    window.sessionStorage.setItem("jobslist",JSON.stringify(jsonlist))
                                }
                                else{
                                    var newjsonlist = window.sessionStorage.getItem("jobslist")
                                    var list = JSON.parse(newjsonlist)
                                    list.push(json)
                                    window.sessionStorage.setItem("jobslist",JSON.stringify(list))
                                }
                            }
                        }
                    })
                }
            },
            error: function(data){
                layer.alert("文件上传失败，请重试！", {icon: 5})
            }
        })
    })
    function timer(seconds){
        if(seconds > 1){
            seconds--
            $(".readnote").val("请阅读申请须知("+seconds+")").attr("disabled",true)  //禁用按钮
            setTimeout(function(){
                timer(seconds)
            }, 1000)
        }
        else{
            $(".readnote").val("我已阅读，马上申请").attr("disabled", false).attr("id","readnote");//启用按钮
            $("#readnote").removeAttr("class")
        }
    }
})