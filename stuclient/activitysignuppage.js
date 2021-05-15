var json = []
var activitieslist
var nameList = ['序号', '主办社团', '活动名称', '活动日期', '活动时间', '活动地点', '操作'] //table的列名
var widthList = [100, 100, 100, 100, 100, 100, 100] //table每列的宽度
$(function(){
    if(window.sessionStorage.getItem("activitieslist") == null){
        $.ajax({
            url: 'http://localhost:5501/graduationproject/association_manager/activities/ReadActivitiesrelease',
            type: 'get',
            dataType: 'json',
            async: false,
            success: function(data){
                $.each(data,function(key,value){
                    value.signflag = "未报名"
                })
                window.sessionStorage.setItem("activitieslist",JSON.stringify(data))
                $.ajax({
                    url: 'http://localhost:5501/graduationproject/association_manager/activityregistration/ReadActivityRegistrationsBystunum',
                    type: 'get',
                    async: false,
                    data: {stunum:window.sessionStorage.getItem('stunum')},
                    dataType: 'json',
                    success: function(data){
                        var acsignuplist = JSON.stringify(data)
                        window.sessionStorage.setItem("acsignuplist",acsignuplist)
                        var newactivitieslist = JSON.parse(window.sessionStorage.getItem("activitieslist"))
                        $.each(JSON.parse(acsignuplist), function(signkey, signvalue){
                            $.each(newactivitieslist, function(key, value){
                                if((signvalue.activityname == value.activityname)&&(signvalue.associationname == value.association)){
                                    value.signflag = "取消报名"
                                }
                                else{
                                    value.signflag = "未报名"
                                }
                            })
                        })
                        window.sessionStorage.setItem("activitieslist",JSON.stringify(newactivitieslist))
                        $.each(JSON.parse(window.sessionStorage.getItem("activitieslist")), function(key, value){
                            var obj = {}
                            obj.id = key + 1
                            obj.association = value.association
                            obj.activityname = value.activityname
                            obj.activitydate = value.activitydate
                            obj.activitytime = value.activitytime
                            obj.activityplace = value.activityplace
                            obj.signflag = value.signflag
                            json.push(obj)
                        })
                    }
                })  
            }
        })
    }
    else if(window.sessionStorage.getItem("activitieslist") != null){
        $.each(JSON.parse(window.sessionStorage.getItem("activitieslist")), function(key, value){
            var obj = {}
            obj.id = key + 1
            obj.association = value.association
            obj.activityname = value.activityname
            obj.activitydate = value.activitydate
            obj.activitytime = value.activitytime
            obj.activityplace = value.activityplace
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
})

