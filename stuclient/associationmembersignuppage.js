var json = []
var associationmemberslist
var nameList = ['序号', '社团名称', '会员期限', '备注', '操作'] //table的列名
var widthList = [100, 100, 100, 100, 100] //table每列的宽度
$(function () {
    if(window.sessionStorage.getItem("associationmemberslist") == null){
        $.ajax({
            url: 'http://localhost:5501/graduationproject/association_manager/association/ReadAssociations',
            type: 'get',
            dataType: 'json',
            async: false,
            success: function(data){
                $.each(data,function(key,value){
                    value.signflag = "未报名"
                })
                window.sessionStorage.setItem("associationmemberslist",JSON.stringify(data))
                $.ajax({
                    url: 'http://localhost:5501/graduationproject/association_manager/joinassociation/ReadJoinAssociationsBystunum',
                    type: 'get',
                    data: {stunum:window.sessionStorage.getItem('stunum'),state:2},
                    dataType: 'json',
                    async: false,
                    success: function(data){
                        var memsignuplist = JSON.stringify(data)
                        window.sessionStorage.setItem("memsignuplist",memsignuplist)
                        var newassociationmemberslist = JSON.parse(window.sessionStorage.getItem("associationmemberslist"))
                        $.each(JSON.parse(memsignuplist), function(signkey, signvalue){
                            $.each(newassociationmemberslist, function(key, value){
                                if((signvalue.associationname == value.associationname)&&(signvalue.commstate == 2)){
                                    value.signflag = "取消报名"
                                }
                                else{
                                    value.signflag = "未报名"
                                }
                            })
                        })
                        window.sessionStorage.setItem("associationmemberslist",JSON.stringify(newassociationmemberslist))
                        $.each(JSON.parse(window.sessionStorage.getItem("associationmemberslist")), function(key, value){
                            var obj = {}
                            obj.id = key + 1
                            obj.associationname = value.associationname
                            obj.memberdecline = "入会至2021-5-30"
                            obj.text = value.text
                            obj.signflag = value.signflag
                            json.push(obj)
                        })
                    }
                })
            }
        })
    }
    else{
        $.each(JSON.parse(window.sessionStorage.getItem("associationmemberslist")), function(key, value){
            var obj = {}
            obj.id = key + 1
            obj.associationname = value.associationname
            obj.memberdecline = "入会至2021-5-30"
            obj.text = value.text
            obj.signflag = value.signflag
            json.push(obj)
        })
    }
    nicePage.setCfg({
        table: 'table',
        bar: 'pageBar',
        limit: 10,
        color: '#1E9FFF',
        layout: ['count', 'prev', 'page', 'next', 'limit', 'skip']
    });
});//初始化完成