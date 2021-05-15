// 点击活动申报增加的按钮时会移动到相应的增加页面
$("#addToTable").on("click", function (){
    window.scrollBy(0,document.getElementById("acdeclareadd").offsetTop - document.documentElement.scrollTop)
})

// 活动申报修改信息请求处理
$("#declaresubmit").on("click", function(){
    $.ajax({
        url: '',  //要改
        type: "post",
        dataType: "json",
        data: decodeURIComponent($("#activitydeclaresubmit").serialize(),true),
        success: function(data){
            if(data == true){}
            else {}
        }
    })
    
})