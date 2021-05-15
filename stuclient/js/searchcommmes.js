$(".pop-search").on("click",function(){
    if(window.sessionStorage.getItem("associationmessages") == undefined){
        $.ajax({
            url: 'http://localhost:5501/graduationproject/association_manager/association/ReadAssociations',
            type: 'get',
            datatype: 'json',
            success: function(data){
                var associationmessages = JSON.stringify(data)
                window.sessionStorage.setItem("associationmessages",associationmessages)
                getcommmess()
            }
        })
    }
    else getcommmess()
})
function getcommmess(){
    var messages
    var frontstr
    var flag = $(".associationsearch").val().indexOf("协会")
    if(flag>0) frontstr = $(".associationsearch").val().substring(0, flag)
    else frontstr = $(".associationsearch").val()
    $.each(JSON.parse(window.sessionStorage.getItem("associationmessages")), function (key, value) {
        if (new RegExp(frontstr).test(value.associationname)) {
            messages = "&#8195;社团类型：" + value.associationtype + "<br>" +
                "&#8195;社团名称：" + value.associationname + "<br>" +
                "&#8195;社团英文名：" + value.associationengname + "<br>" +
                "&#8195;社团概述：" + value.associationmes + "<br>" +
                "&#8195;微信公众号：" + value.associationofficial + "<br>"
            if (value.associationweibo != null) {
                messages += "&#8195;官方微博：" + value.associationweibo + "<br>&#8195;品牌活动：" + value.associationbrand + "<br>"
                if (value.associationslogan != null) messages += "&#8195;社团标语：" + value.associationslogan + "<br>"
                else messages += "&#8195;社团标语：暂无<br>"
            } else {
                messages += "&#8195;官方微博：暂无" + "<br>&#8195;品牌活动：" + value.associationbrand + "<br>"
                if (value.associationslogan != null) messages += "&#8195;社团标语：暂无"
                else messages += "&#8195;社团标语：暂无<br>"
            }
        }
    })
    layer.open({
        type: 1,
        area: ['600px', '360px'],
        shadeClose: true, //点击遮罩关闭
        content: messages
    });
}