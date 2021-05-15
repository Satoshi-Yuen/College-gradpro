// 点击活动发布的删除按钮触发的请求处理
$("body").last().on("click", "#deletebtn",function (){
    $.ajax({
        url: '',  //要改
        type: "post",
        dataType: "json",
        data: "",
        success: function(data){
            if(data == true){}
            else {}
        }
    })
})