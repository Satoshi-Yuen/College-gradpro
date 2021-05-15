var ActivityReleaseList;
var totals;
var $content = $( ".content tbody" );
$(function(){
    $(".name").html(window.sessionStorage.getItem("stuname"))     //设置登录的管理员名称
    $(document).attr("title","东莞理工学院学生社团管理系统 | "+window.sessionStorage.getItem("associationname")+" | 活动发布");//设置title
    if(window.sessionStorage.getItem("ActivityReleaseList") == null){
        $.ajax({
            url: 'http://localhost:5500/graduationproject/association_manager/activities/ReadActivitiesreleaseByAssociationname',
            type: "get",
            dataType: "json",
            data: {asname:window.sessionStorage.getItem('associationname')},
            success: function(data){
                Helper.ui.page("#page-4", {
                    total: data.length,
                    pageSize: 10,
                    showTotal: true,
                    showTo: true,
                    currentPage: 1,
                    change: function ( i ) {
                        createContent( i, 10);
                    }
                });
                totals = data.length
                ActivityReleaseList = JSON.stringify(data)
                window.sessionStorage.setItem("ActivityReleaseList",ActivityReleaseList)
                window.sessionStorage.setItem("ActivityReleaseListlength",data.length)
                for(var j=0;j<10;j++){
                    $.each(JSON.parse(window.sessionStorage.getItem("ActivityReleaseList")), function(key, value){
                        if(j == key){
                            $content.append(('<tr class="releasebodytr">'+
                                '<td id="displaytd" style="display: none">'+ value.id +'</td>'+
                                '<td>'+ (j + 1) +'</td>'+
                                '<td>'+ value.activityname +'</td>'+
                                '<td>'+ value.activitydate +'</td>'+
                                '<td>'+ value.activitytime +'</td>'+
                                '<td>'+ value.activityplace +'</td>'+ 
                                '<td class="actions">'+'<button id="deletebtn" class="btn"><i class="fa fa-trash-o"></i></button>' +
								'</td>'+
                                '</tr>'))
                        }
                    })
                }
            }
        })
    }
    else if(window.sessionStorage.getItem("ActivityReleaseList") != null){
		console.log(window.sessionStorage.getItem("ActivityReleaseListlength"))
        totals = window.sessionStorage.getItem("ActivityReleaseListlength")
        Helper.ui.page("#page-4", {
            total: totals,
            pageSize: 10,
            showTotal: true,
            showTo: true,
            currentPage: 1,
            change: function ( i ) {
                createContent( i, 10);
            }
        });
        for(var j=0;j<10;j++){
            $.each(JSON.parse(window.sessionStorage.getItem("ActivityReleaseList")), function(key, value){
                if(j == key){
                    $content.append(('<tr class="releasebodytr">'+
                        '<td id="displaytd" style="display: none">'+ value.id +'</td>'+
                        '<td>'+ (j + 1) +'</td>'+
                        '<td>'+ value.activityname +'</td>'+
                        '<td>'+ value.activitydate +'</td>'+
                        '<td>'+ value.activitytime +'</td>'+
                        '<td>'+ value.activityplace +'</td>'+ 
                        '<td class="actions">'+'<button id="deletebtn" class="btn"><i class="fa fa-trash-o"></i></button>'+
                        '</td>'+
                        '</tr>'))
                }
            })
        }
    }    
})    
	// i为当前页 index为页数量
function createContent ( i, index) {
	$content.empty()
	for(var j=(i-1)*index+1;j<index*i+1;j++){
        $.each(JSON.parse(window.sessionStorage.getItem("ActivityReleaseList")), function(key, value){
            if((key + 1) == j){
                $content.append(('<tr class="releasebodytr">'+
                '<td id="displaytd" style="display: none">'+ value.id +'</td>'+
                '<td>'+ j +'</td>'+
                '<td>'+ value.activityname +'</td>'+
                '<td>'+ value.activitydate +'</td>'+
                '<td>'+ value.activitytime +'</td>'+
                '<td>'+ value.activityplace +'</td>'+ 
                '<td class="actions">'+'<button id="deletebtn" class="btn"><i class="fa fa-trash-o"></i></button>'+
                '</td>'+
                '</tr>'))
            }
        })
	}
}
Helper.ui.page("#page-4", {
	total: totals,
	pageSize: 10,
	showTotal: true,
	showTo: true,
	currentPage: 1,
	change: function ( i ) {
		createContent( i, 10);
	}
});