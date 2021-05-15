var json = []
var associationdeptslist
//nameList与widthList的数组长度要一致
var nameList = ['序号', '社团名称', '部门', '部门职责', '干事期限', '操作'] //table的列名
var widthList = [100, 100, 100, 100, 100, 100] //table每列的宽度
$(function () {
    if(window.sessionStorage.getItem("associationdeptslist") == null){
        $.ajax({
            url: 'http://localhost:5501/graduationproject/association_manager/associationdept/ReadAssociationDepartments',
            type: 'get',
            dataType: 'json',
            async: false,
            success: function(data){
                $.each(data,function(key,value){
                    value.signflag = "未报名"
                })
                window.sessionStorage.setItem("associationdeptslist",JSON.stringify(data))
                $.ajax({
                    url: 'http://localhost:5501/graduationproject/association_manager/joinassociation/ReadJoinAssociationsBystunum',
                    type: 'get',
                    data: {stunum:window.sessionStorage.getItem('stunum'),state:1},
                    dataType: 'json',
                    async: false,
                    success: function(data){
                        var staffsignuplist = JSON.stringify(data)
                        window.sessionStorage.setItem("staffsignuplist",staffsignuplist)
                        var newassociationdeptslist = JSON.parse(window.sessionStorage.getItem("associationdeptslist"))
                        console.log(data)
                        $.each(JSON.parse(staffsignuplist), function(signkey, signvalue){
                            $.each(newassociationdeptslist, function(key, value){
                                if((signvalue.associationname == value.associationname)&&(signvalue.commdepartment == value.department)){
                                    value.signflag = "取消报名"
                                    console.log(value)
                                }
                                else{
                                    value.signflag = "未报名"
                                }
                            })
                        })
                        window.sessionStorage.setItem("associationdeptslist",JSON.stringify(newassociationdeptslist))
                        $.each(JSON.parse(window.sessionStorage.getItem("associationdeptslist")), function(key, value){
                            var obj = {}
                            obj.id = key + 1
                            obj.associationname = value.associationname
                            obj.department = value.department
                            obj.departmentcontent = value.departmentcontent
                            obj.memberdecline = "入会至2021-5-30"
                            obj.signflag = value.signflag
                            json.push(obj)
                        })
                    }
                })
            }
        })
    }
    else{
        $.each(JSON.parse(window.sessionStorage.getItem("associationdeptslist")), function(key, value){
            var obj = {}
            obj.id = key + 1
            obj.associationname = value.associationname
            obj.department = value.department
            obj.departmentcontent = value.departmentcontent
            obj.memberdecline = "入会至2021-5-30"
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