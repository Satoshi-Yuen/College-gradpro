var ajaxurl, editstr, filename, editlist, editarray, declareeditfileuploadurl
var formdata = new FormData()
// 点击活动申报的修改按钮则会移动到修改的位置
$("body").last().on("click", "#editbtn",function (){
    if($(this).closest("tr").attr( "class") == "declarebodytr"){
        $(this).closest("tr").attr( "id","editflag")
        $("tbody #editflag").each(function (){
            for(var i=0;i<$("tbody #editflag td").length-1;i++) {
                var res = $(this).children('td').eq(i).html()
                if(i == 0) $("#declareid").attr("value",res)
                else if(i == 2) $("#editactivityname").attr("value",res)
                else if(i == 3) $("#editactivitydate").attr("value",res)
                else if(i == 4){
                    var flag = res.indexOf("-")
                    var frontstr = res.substring(0,flag)
                    var behindstr = res.substring(flag+1,res.length)
                    $("#editstarttime").attr("value",frontstr)
                    $("#editendtime").attr("value",behindstr)
                }
                else if(i == 5) $("#editactivityplace").attr("value",res)
                else if(i == 6) {
                    $("#editfilename").text(res)
                }
            }
        })
        window.scrollBy(0,document.getElementById("acdeclareedit").offsetTop - document.documentElement.scrollTop)
        $(this).closest("tr").removeAttr("id")
    }
})

// 活动申报修改信息请求处理
$("#declaresdit").on("click", function(){
    $("#declarefilename").attr("value",$("#editfilename").text())
    swal({
        title: "确定修改吗？",
        text: "你确定要修改这条记录吗？",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#0088CC',
        confirmButtonText: '确定'
    })
    editlist = "activitylist"
    ajaxurl = 'http://localhost:5500/graduationproject/association_manager/activitydeclaration/UpdateActivityDeclaration'
    editstr = $("#declaresditdata").serialize() + "&flag=2"
    console.log(editstr)
    editarray = $("#declaresditdata").serializeArray()
    var file = document.querySelector("#declareuploadfile").files[0]
    formdata.append("fileupload",file)
    formdata.append("filepath","D:\\nginx\\nginx-1.19.7\\html\\gradupro\\filesave\\activityDeclareFiles")
    declareeditfileuploadurl = 'http://localhost:5500/graduationproject/association_manager/UploadEiles/fileupload'
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
    console.log($("body .sweet-alert.showSweetAlert.visible h2").last().html())
    if($(this).closest("h2").html() == "操作成功" || $("body .sweet-alert.showSweetAlert.visible h2").last().html() == "操作失败"){
        console.log("666")
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
    else if($("body .sweet-alert.showSweetAlert.visible h2").last().html() == "确定修改吗？"){
        if(declareeditfileuploadurl != null){
            $.ajax({
                url: declareeditfileuploadurl,
                type: 'post',
                data: formdata,
                contentType: false,
                processData: false,
                success: function(data){
                    if(data != 1){
                        alert("文件更新失败，请重试！")
                    }
                }
            })
        }
        $.ajax({
            url: ajaxurl,
            data: editstr,
            dataType: "json",
            success: function(data){
                if(data == true){
                    var neweditlist = JSON.parse(window.sessionStorage.getItem(editlist))
                    for(var j=0;j<editarray.length;j++){
                        if(editarray[j]["name"] == "id"){
                            for(var i=0;i < neweditlist.length;i++){
                                if(neweditlist[i]['id'] == editarray[j]["value"]){
                                    for(var k=0;k < editarray.length;k++){
                                        var value = editarray[k]["name"]
                                        neweditlist[i][value] = editarray[k]["value"]
                                    }
                                    neweditlist[i]["flag"] = 2
                                    break
                                }
                            }
                            break
                        }
                    }
                    window.sessionStorage.setItem(editlist,JSON.stringify(neweditlist))
                    swal("操作成功", "申报信息修改成功！", "success");
                }
                else{
                    swal("操作失败", "修改失败，请重试！", "error");
                }
            }
        })
    }
})


