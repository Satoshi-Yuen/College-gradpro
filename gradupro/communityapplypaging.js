var NormalTotal ,WorkTotal
var CommunityApplyNormalList ,CommunityApplyWorkList
var $content = $( ".content tbody" ) ,$content2 = $( ".contents tbody" )
$(function(){
    $(".name").html(window.sessionStorage.getItem("stuname"))     //设置登录的管理员名称
    $(document).attr("title","东莞理工学院学生社团管理系统 | "+window.sessionStorage.getItem("associationname")+" | 社团报名");//设置title
    // 判断会员并显示列表if-else
	if(window.sessionStorage.getItem("CommunityApplyNormalList") == null){
        $.ajax({
            url: 'http://localhost:5500/graduationproject/association_manager/joinassociation/ReadJoinAssociationsByStatus',
            type: "get",
			data: {atname:window.sessionStorage.getItem("associationname"),status:2},
            dataType: "json",
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
                NormalTotal = data.length
                CommunityApplyNormalList = JSON.stringify(data)
                // console.log(data)
                window.sessionStorage.setItem("CommunityApplyNormalList",CommunityApplyNormalList)
                window.sessionStorage.setItem("CommunityApplyNormalListLength",data.length)
                // console.log(window.sessionStorage.getItem("CommunityApplyNormalList"))
                for(var j=0;j<10;j++){
                    $.each(JSON.parse(window.sessionStorage.getItem("CommunityApplyNormalList")), function(key, value){
                        if(j == key){
                            $content.append(('<tr class="comapplybodytr">'+
                                '<td>'+ (j + 1) +'</td>'+
                                '<td>'+ value.stunum +'</td>'+
                                '<td>'+ value.stuname +'</td>'+
                                '<td>'+ value.stugrade + "级" + value.stuprofessclass + '</td>'+
                                '<td>'+ value.stutele +'</td>'+
                                '</tr>'))
                        }
                    })
                }
            }
        })
    }
    else if(window.sessionStorage.getItem("CommunityApplyNormalList") != null){
		// console.log(window.sessionStorage.getItem("CommunityApplyNormalListLength"))
        NormalTotal = window.sessionStorage.getItem("CommunityApplyNormalListLength")
        Helper.ui.page("#page-4", {
            total: NormalTotal,
            pageSize: 10,
            showTotal: true,
            showTo: true,
            currentPage: 1,
            change: function ( i ) {
                createContent( i, 10);
            }
        });
        for(var j=0;j<10;j++){
            $.each(JSON.parse(window.sessionStorage.getItem("CommunityApplyNormalList")), function(key, value){
                if(j == key){
                    $content.append(('<tr class="comapplybodytr">'+
                        '<td>'+ (j + 1) +'</td>'+
                        '<td>'+ value.stunum +'</td>'+
                        '<td>'+ value.stuname +'</td>'+
                        '<td>'+ value.stugrade + "级" + value.stuprofessclass + '</td>'+
                        '<td>'+ value.stutele +'</td>'+
                        '</tr>'))
                }
            })
        }
    } 

	// 判断干事并显示列表if-else
	if(window.sessionStorage.getItem("CommunityApplyWorkList") == null){
        $.ajax({
            url: 'http://localhost:5500/graduationproject/association_manager/joinassociation/ReadJoinAssociationsByStatus',
            type: "get",
			data: {atname:window.sessionStorage.getItem("associationname"),status:1},
            dataType: "json",
            success: function(data){
                Helper.ui.page("#page-5", {
                    total: data.length,
                    pageSize: 10,
                    showTotal: true,
                    showTo: true,
                    currentPage: 1,
                    change: function ( i ) {
                        createContent2( i, 10 );
                    }
                });
                WorkTotal = data.length
                CommunityApplyWorkList = JSON.stringify(data)
                // console.log(data)
                window.sessionStorage.setItem("CommunityApplyWorkList",CommunityApplyWorkList)
                window.sessionStorage.setItem("CommunityApplyWorkListLength",data.length)
                // console.log(window.sessionStorage.getItem("CommunityApplyWorkList"))
                for(var j=0;j<10;j++){
                    $.each(JSON.parse(window.sessionStorage.getItem("CommunityApplyWorkList")), function(key, value){
                        if(j == key){
                            $content2.append(('<tr class="comapplybodytr">'+
                                '<td>'+ (j + 1) +'</td>'+
                                '<td>'+ value.stunum +'</td>'+
                                '<td>'+ value.stuname +'</td>'+
                                '<td>'+ value.stugrade + "级" + value.stuprofessclass + '</td>'+
								'<td>'+ value.commdepartment +'</td>'+
                                '<td>'+ value.stutele +'</td>'+
                                '</tr>'))
                        }
                    })
                }
            }
        })
    }
    else if(window.sessionStorage.getItem("CommunityApplyWorkList") != null){
		// console.log(window.sessionStorage.getItem("CommunityApplyWorkListLength"))
        WorkTotal = window.sessionStorage.getItem("CommunityApplyWorkListLength")
        Helper.ui.page("#page-5", {
            total: WorkTotal,
            pageSize: 10,
            showTotal: true,
            showTo: true,
            currentPage: 1,
            change: function ( i ) {
                createContent2( i, 10 );
            }
        });
        for(var j=0;j<10;j++){
            $.each(JSON.parse(window.sessionStorage.getItem("CommunityApplyWorkList")), function(key, value){
                if(j == key){
                    $content2.append(('<tr class="comapplybodytr">'+
                        '<td>'+ (j + 1) +'</td>'+
                        '<td>'+ value.stunum +'</td>'+
                        '<td>'+ value.stuname +'</td>'+
                        '<td>'+ value.stugrade + "级" + value.stuprofessclass + '</td>'+
						'<td>'+ value.commdepartment +'</td>'+
                        '<td>'+ value.stutele +'</td>'+
                        '</tr>'))
                }
            })
        }
    } 
})
	// i为当前页 index为页数量
function createContent2 ( i, index) {
	$content2.empty()
	for(var j=(i-1)*index+1;j<index*i+1;j++){
        $.each(JSON.parse(window.sessionStorage.getItem("CommunityApplyWorkList")), function(key, value){
            if((key + 1) == j){
                $content2.append(('<tr class="comapplybodytr">'+
                    '<td>'+ j +'</td>'+
                    '<td>'+ value.stunum +'</td>'+
                    '<td>'+ value.stuname +'</td>'+
                    '<td>'+ value.stugrade + "级" + value.stuprofessclass + '</td>'+
                    '<td>'+ value.commdepartment +'</td>'+
                    '<td>'+ value.stutele +'</td>'+
                    '</tr>'))
            }
        })   
	}
}
function createContent ( i, index) {
	$content.empty()
	for(var j=(i-1)*index+1;j<index*i+1;j++){
        $.each(JSON.parse(window.sessionStorage.getItem("CommunityApplyNormalList")), function(key, value){
            if((key + 1) == j){
                $content.append(('<tr class="comapplybodytr">'+
                    '<td>'+ j +'</td>'+
                    '<td>'+ value.stunum +'</td>'+
                    '<td>'+ value.stuname +'</td>'+
                    '<td>'+ value.stugrade + "级" + value.stuprofessclass + '</td>'+
                    '<td>'+ value.stutele +'</td>'+
                    '</tr>'))
            }
        })    
	}
}

Helper.ui.page("#page-4", {
	total: NormalTotal,
	pageSize: 10,
	showTotal: true,
	showTo: true,
	currentPage: 1,
	change: function ( i ) {
		createContent( i, 10 );
	}
});

Helper.ui.page("#page-5", {
	total: WorkTotal,
	pageSize: 10,
	showTotal: true,
	showTo: true,
	currentPage: 1,
	change: function ( i ) {
		createContent2( i, 10 );
	}
});