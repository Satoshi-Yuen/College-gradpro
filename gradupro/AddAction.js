var ajaxurl, addstr, declarestr, addlist, addarray, declarefileuploadurl
var obj = {}
var formdata = new FormData()
// 点击活动申报增加的按钮时会移动到相应的增加页面
$("#addToTable").on("click", function (){
    window.scrollBy(0,document.getElementById("acdeclareadd").offsetTop - document.documentElement.scrollTop)
})
// 活动申报信息添加
$("#declaresubmit").on("click", function(){
    var file = document.querySelector("#declareuploadfile").files[0]
    formdata.append("fileupload",file)
    formdata.append("filepath","D:\\nginx\\nginx-1.19.7\\html\\gradupro\\filesave\\activityDeclareFiles")
    ajaxurl = 'http://localhost:5500/graduationproject/association_manager/activitydeclaration/CreateActivityDeclaration'
    declarefileuploadurl = 'http://localhost:5500/graduationproject/association_manager/UploadEiles/fileupload'
    $("#declaresubmitfilename").attr("value",$("#submitfile").text())
    addstr = $("#activitydeclaresubmit").serialize()
    addarray = $("#activitydeclaresubmit").serializeArray()
    addlist = "activitylist"
    for(var i=0;i<addarray.length;i++){
        obj[addarray[i]['name']] = addarray[i]['value']
    }
    
    swal({
        title: "确定添加吗？",
        text: "你确定要添加这条记录吗？",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#0088CC',
        confirmButtonText: '确定'
    })
})

// 点击会员增加的按钮时会移动到相应的增加页面
$("#addMemTable").on("click", function (){
    $("#memaddassociation").attr("value",window.sessionStorage.getItem("associationname"))
    window.scrollBy(0,document.getElementById("membersadd").offsetTop - document.documentElement.scrollTop)
})

// 会员信息添加
$("#memaddsubmit").on("click", function(){
    ajaxurl = 'http://localhost:5500/graduationproject/association_manager/members/CreateMember'
    var isMobile = /^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}}18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/
    $("#memaddassociation").attr("value",window.sessionStorage.getItem("associationname"))
    if(isMobile.test($("#memaddtele").val())){
        addstr = $("#membersadddata").serialize()
        console.log(addstr)
        addarray = $("#membersadddata").serializeArray()
        addlist = "NormalMembersList"
        for(var i=0;i<addarray.length;i++){
            obj[addarray[i]['name']] = addarray[i]['value']
        }
        swal({
            title: "确定添加吗？",
            text: "你确定要添加这条记录吗？",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#0088CC',
            confirmButtonText: '确定'
        })
    }
    else{
        $(".error").removeAttr("hidden")
    }
})

// 点击活动申报增加的按钮时会移动到相应的增加页面
$("#addStaffTable").on("click", function (){
    $("#staffaddassociation").attr("value",window.sessionStorage.getItem("associationname"))
    window.scrollBy(0,document.getElementById("staffsadd").offsetTop - document.documentElement.scrollTop)
})
// 骨干信息添加
$("#staffaddsubmit").on("click", function(){
    ajaxurl = 'http://localhost:5500/graduationproject/association_manager/staffs/CreateStaff'
    $("#staffaddassociation").attr("value",window.sessionStorage.getItem("associationname"))
    var isMobile = /^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}}18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/
    if(isMobile.test($("#memaddtele").val())){
        addstr = $("#staffadddata").serialize()
        addarray = $("#staffadddata").serializeArray()
        addlist = "WorkMembersList"
        for(var i=0;i<addarray.length;i++){
            obj[addarray[i]['name']] = addarray[i]['value']
        }
        swal({
            title: "确定添加吗？",
            text: "你确定要添加这条记录吗？",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#0088CC',
            confirmButtonText: '确定'
        })
    }
    else{
        $(".error").removeAttr("hidden")
    }
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
// 删除提示框判断
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
    else if($("body .sweet-alert.showSweetAlert.visible h2").last().html() == "确定添加吗？"){
        if(declarefileuploadurl != null){
            obj["flag"] = 2
            $.ajax({
                url: declarefileuploadurl,
                type: 'post',
                data: formdata,
                contentType: false,
                processData: false,
                success: function(data){
                    if(data != 1){
                        alert("上传失败，请重试！")
                    }
                }
            })
        }
        $.ajax({
            url: ajaxurl,
            type: "get",
            data: addstr, 
            dataType: "json",
            success: function(data){
                if(data != 0){
                    obj["id"] = data
                    var addlisttrans = JSON.parse(window.sessionStorage.getItem(addlist))
                    addlisttrans.push(obj)
                    console.log(addlisttrans)
                    window.sessionStorage.setItem(addlist,JSON.stringify(addlisttrans))
                    window.sessionStorage.setItem(addlist+"length",parseInt(window.sessionStorage.getItem(addlist+"length"))+1)
                    swal("操作成功", "信息添加成功！", "success");
                }
                else{
                    swal("操作失败", "添加失败，请重试！", "error");
                }
            }
        })
    }
})