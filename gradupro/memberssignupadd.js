// 点击新增会员报名的按钮时会移动到相应的增加页面
$("#addMemTable").on("click", function (){
    window.scrollBy(0,document.getElementById("membersadd").offsetTop - document.documentElement.scrollTop)
})

// 活动申报修改信息请求处理
$("#memaddsubmit").on("click", function(){
    $.ajax({
        url: '',  //要改
        type: "post",
        dataType: "json",
        data: decodeURIComponent($("#memberssubmit").serialize(),true),
        success: function(data){
            if(data == true){}
            else {}
        }
    }) 
})