 /**
    * FileReader共有4种读取方法：
    * 1.readAsArrayBuffer(file)：将文件读取为ArrayBuffer。
    * 2.readAsBinaryString(file)：将文件读取为二进制字符串
    * 3.readAsDataURL(file)：将文件读取为Data URL
    * 4.readAsText(file, [encoding])：将文件读取为文本，encoding缺省值为'UTF-8'
    */
$(".name").html(window.sessionStorage.getItem("stuname")) //设置登录的管理员名称   
var wb; //读取完成的数据
var rABS = false; //是否将文件读取为二进制字符串
//开始导入
var wb; //读取
var rABS = false;
var jsondatastr

//开始导入
function importf(obj) {
    if (!obj.files) {
        return;
    }
    var f = obj.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var data = e.target.result;
        if (rABS) {
            wb = XLSX.read(btoa(fixdata(data)), { //手动转化
                type: 'base64'
            });
        } else {
            wb = XLSX.read(data, {
                type: 'binary'
            });
        }
        /**
         * wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
         * wb.Sheets[Sheet名]获取第一个Sheet的数据 JSON.stringify(excelJson)
         */
        var excelJson = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);

        jsondatastr = JSON.stringify(excelJson)
        var titlestr = "<tr><th>序号</th>"
        for (var jsonkey in excelJson[0]) {
            titlestr += "<th>" + jsonkey + "</th>"
        }
        titlestr += "</tr>"
        $("thead").append(titlestr)
        $.each(excelJson, function (key, value) {
            var trstr = "<tr><td>" + (key + 1) + "</td>"
            for (var jsonkey in value) {
                trstr += '<td>' + value[jsonkey] + '</td>'
            }
            trstr += "</tr>"
            $("tbody").append(trstr)
        })
        $(".filedataimportbtn").attr("style", "display: inline-block")
        $("#contenttable").attr("style", "display: inline-block")
    };
    if (rABS) {
        reader.readAsArrayBuffer(f);
    } else {
        reader.readAsBinaryString(f);
    }
}
    
    //文件流转BinaryString
function fixdata(data) {
    var o = "",
        l = 0,
        w = 10240;
    for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w +

        w)));
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
    return o;
}
$(".filedataimportbtn").on("click",function(){
    $.ajax({
        url: 'http://localhost:5500/graduationproject/association_manager/logintable/setroles',
        type: 'get',
        data: {"jsondatastr":jsondatastr},
        dataType: 'json',
        contentType: "application/json;charset:UTF-8",
        success: function(data){
            if(data > 0) {
                layer.open({
                    content: '权限设置成功！',
                    scrollbar: false,
                    yes: function(){
                        location.reload()
                    }
                });
            }
            else layer.msg('设置失败，请重试', {icon: 5});
              
        },
        error: function(data){
            layer.msg('设置失败，请重试', {icon: 5});
        }
    })
})
$(".btn.btn-default.fileupload-exists").on("click",function(){
    $(".filedataimportbtn").attr("style", "display: none")
    $("#contenttable").attr("style", "display: none")
    $("#contenttable thead").empty()
    $("#contenttable tbody").empty()
})
$(".btn.btn-primary").on("click",function(){
    var roledataone = $("#exampleInputUsername1").val()
    var roledatatwo = $("#exampleInputPassword2").val()
    $.ajax({
        url: 'http://localhost:5500/graduationproject/association_manager/logintable/setsingleroles',
        type: 'get',
        data: {
            "roledataone":roledataone,
            "roledatatwo":roledatatwo,
        },
        dataType: 'json',
        success: function(data){
            if(data > 0) {
                layer.open({
                    content: '权限设置成功！',
                    scrollbar: false,
                    yes: function(){
                        location.reload()
                    }
                });
            }
            else layer.msg('设置失败，请重试', {icon: 5});
        },
        error: function(data){
            layer.msg('设置失败，请重试', {icon: 5});
        }
    })
})