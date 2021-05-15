$(function(){
    var type = undefined
    var filename
    $("#memberexportbtn").on("click",function(){
        var jsono = []
        $.each(JSON.parse(window.sessionStorage.getItem("CommunityApplyNormalList")), function(key, value){
            var obj = {}
            obj["序号"] = key + 1
            obj["学号"] = value.stunum
            obj["姓名"] = value.stuname
            obj["专业班级"] = value.stugrade + "级" + value.stuprofessclass
            obj["联系方式"] = value.stutele
            jsono.push(obj)
        })
        filename = "会员报名表"
        downloadExl(jsono,type,filename)
    })
    $("#staffexportbtn").on("click",function(){
        var jsono = []
        $.each(JSON.parse(window.sessionStorage.getItem("CommunityApplyWorkList")), function(key, value){
            var obj = {}
            obj["序号"] = key + 1
            obj["学号"] = value.stunum
            obj["姓名"] = value.stuname
            obj["专业班级"] = value.stugrade + "级" + value.stuprofessclass
            obj["报名部门"] = value.commdepartment
            obj["联系方式"] = value.stutele
            jsono.push(obj)
        })
        filename = "干事报名表"
        downloadExl(jsono,type,filename)
    })
    $("#activityexport").on("click",function(){
        var jsono = []
        $.each(JSON.parse(window.sessionStorage.getItem("ActivitySignList")), function(key, value){
            var obj = {}
            obj["序号"] = key + 1
            obj["学号"] = value.stunum
            obj["姓名"] = value.stuname
            obj["专业班级"] = value.stuprofessclass
            obj["报名活动"] = value.commdepartment
            obj["联系方式"] = value.stutele
            jsono.push(obj)
        })
        filename = "活动报名表"
        downloadExl(jsono,type,filename)
    })
    $("#memberaddbtn").on("click",function(){
        layer.msg('你确定要导入会员报名名单？', {
            time: 0 //不自动关闭
            ,btn: ['确定', '取消']
            ,yes: function(index){
                $.ajax({
                    url: 'http://localhost:5500/graduationproject/association_manager/members/ImportMembers',
                    type: 'get',
                    data: {'jsondatastr':window.sessionStorage.getItem("CommunityApplyNormalList")},
                    dataType: 'json',
                    contentType: 'application/json;charset:UTF-8',
                    success: function(data){
                        if(data > 0) {
                            layer.open({
                                content: '会员已导入系统！',
                                scrollbar: false
                            });
                        }
                        else layer.msg('导入失败，请重试', {icon: 5});
                    },
                    error: function(data){
                        layer.msg('导入失败，请重试', {icon: 5});
                    }
                })
            }
        });
        
    })
    $("#staffaddbtn").on("click",function(){
        layer.msg('你确定要导入干事报名名单？', {
            time: 0 //不自动关闭
            ,btn: ['确定', '取消']
            ,yes: function(index){
                $.ajax({
                    url: 'http://localhost:5500/graduationproject/association_manager/staffs/ImportStaff',
                    type: 'get',
                    data: {'jsondatastr':window.sessionStorage.getItem("CommunityApplyWorkList")},
                    dataType: 'json',
                    contentType: 'application/json;charset:UTF-8',
                    success: function(data){
                        if(data > 0) {
                            layer.open({
                                content: '干事已导入系统！',
                                scrollbar: false
                            });
                        }
                        else layer.msg('导入失败，请重试', {icon: 5});
                    },
                    error: function(data){
                        layer.msg('导入失败，请重试', {icon: 5});
                    }
                })
            }
        });
    })
})

function downloadExl(jsono,type,filename){
    //根据json数据，获取excel的第一行(例如:姓名、年龄、性别)存至map
    var tmpdata = jsono[0];
    jsono.unshift({});
    var keyMap = []; //获取keys
    for (var k in tmpdata) {
        keyMap.push(k);
        jsono[0][k] = k;
    }
    var tmpdata = [];
    jsono.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
        v: v[k],
        position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
    }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {
        v: v.v
    });
    //设置区域,比如表格从A1到D10
    var outputPos = Object.keys(tmpdata);
    var tmpWB = {
        SheetNames: ['mySheet'], //保存的表标题
        Sheets: {
            'mySheet': Object.assign({},
                tmpdata, //内容
                {
                    '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
                })
        }
    };
    var tmpDown; //导出的二进制对象
    //创建二进制对象写入转换好的字节流
    tmpDown = new Blob([s2ab(XLSX.write(tmpWB,
        { bookType: (type == undefined ? 'xlsx' : type), bookSST: false, type: 'binary' }//这里的数据是用来定义导出的格式类型
    ))], {
        type: ""

    });
    $("#downloadA").attr("download",filename+".xlsx")
    var href = URL.createObjectURL(tmpDown); //创建对象超链接
    document.getElementById("downloadA").href = href; //绑定a标签
    document.getElementById("downloadA").click(); //模拟点击实现下载
    setTimeout(function () { //延时释放
        URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL
    }, 100);
}

//字符串转字符流
function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}
//将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
function getCharCol(n) {
    let temCol = '',
        s = '',
        m = 0
    while (n > 0) {
        m = n % 26 + 1
        s = String.fromCharCode(m + 64) + s
        n = (n - m) / 26
    }
    return s
}