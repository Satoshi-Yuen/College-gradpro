$(function(){
    $(".commdiv button").on("click",function(){
        $("#table").empty()
        $("#pageBar").empty()
        var json = []
        var nameList = ['序号', '主办社团', '活动名称', '活动日期', '活动时间', '活动地点', '操作'] //table的列名
        var widthList = [100, 100, 100, 100, 100, 100, 100] //table每列的宽度
        if($("#comminput").val() != null){
            var i=0
            $.each(JSON.parse(window.sessionStorage.getItem("activitieslist")),function(key,value){
                if(value.association == $("#comminput").val()){
                    var obj = {}
                    obj.id = i + 1
                    obj.association = value.association
                    obj.activityname = value.activityname
                    obj.activitydate = value.activitydate
                    obj.activitytime = value.activitytime
                    obj.activityplace = value.activityplace
                    obj.signflag = value.signflag
                    json.push(obj)
                    i += 1
                }
            })
        }
        refreshpage(nameList, widthList, json)
    })
    $(".memberdiv button").on("click",function(){
        $("#table").empty()
        $("#pageBar").empty()
        var json = []
        var nameList = ['序号', '社团名称', '会员期限', '备注', '操作'] //table的列名
        var widthList = [100, 100, 100, 100, 100] //table每列的宽度
        if($("#memberinput").val() != null){
            var i=0
            $.each(JSON.parse(window.sessionStorage.getItem("associationmemberslist")), function(key, value){
                if(value.associationname == $("#memberinput").val()){
                    var obj = {}
                    obj.id = i + 1
                    obj.associationname = value.associationname
                    obj.memberdecline = "入会至2021-5-30"
                    obj.text = value.text
                    obj.signflag = value.signflag
                    json.push(obj)
                    i += 1
                }
            })
        }
        refreshpage(nameList, widthList, json)
    })
    $(".staffdiv button").on("click",function(){
        $("#table").empty()
        $("#pageBar").empty()
        var json = []
        var nameList = ['序号', '社团名称', '部门', '部门职责', '干事期限', '操作'] //table的列名
        var widthList = [100, 100, 100, 100, 100, 100] //table每列的宽度
        if($("#staffinput").val() != null){
            var i=0
            $.each(JSON.parse(window.sessionStorage.getItem("associationdeptslist")), function(key, value){
                if(value.associationname == $("#staffinput").val()){
                    var obj = {}
                    obj.id = i + 1
                    obj.associationname = value.associationname
                    obj.department = value.department
                    obj.departmentcontent = value.departmentcontent
                    obj.memberdecline = "入会至2021-5-30"
                    obj.signflag = value.signflag
                    json.push(obj)
                    i += 1
                }
            })
        }
        refreshpage(nameList, widthList, json)
    })
})
function refreshpage(nameList, widthList, json){
    layui.use("laypage", function () {
        var a = layui.laypage;
        a.render({
            elem: 'pageBar',
            limit: 10,
            theme: '#1E9FFF',
            count: json.length,
            layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
            jump: function (b) {
                document.getElementById('table').innerHTML = function () {
                    var c = [nicePage.returnHtml(nameList, widthList)],
                        d = nicePage.returnList(json).concat().splice(b.curr * b.limit - b.limit, b.limit);
                    layui.each(d, function (e, g) {
                        var f = nicePage.returnTable(g);
                        c.push(f)
                    });
                    c.push(" </tbody></table></br>");
                    return c.join("")
                }()
            }
        })
    })
}
