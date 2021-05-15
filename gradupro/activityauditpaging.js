var totals
var ActivityAuditList
var $content = $( ".content tbody" );
	// i为当前页 index为页数量
	$(function(){
		$(".name").html(window.sessionStorage.getItem("stuname"))     //设置登录的管理员名称
		$(document).attr("title","东莞理工学院学生社团管理系统 | 审批管理-活动申报管理");//设置title
		if(window.sessionStorage.getItem("ActivityAuditList") == null){
			$.ajax({
				url: 'http://localhost:5500/graduationproject/association_manager/activitydeclaration/ReadActivityDeclarationsByflag',
				type: "get",
				data: {flag: 2},
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
					totals = data.length
					ActivityAuditList = JSON.stringify(data)
					window.sessionStorage.setItem("ActivityAuditList",ActivityAuditList)
					window.sessionStorage.setItem("ActivityAuditListLength",data.length)
					for(var j=0;j<10;j++){
						$.each(JSON.parse(window.sessionStorage.getItem("ActivityAuditList")), function(key, value){
							if(j == key){
								$content.append(('<tr class="activityauditbodytr">'+
								    '<td id="displaytd" style="display: none">'+ value.id +'</td>'+
									'<td>'+ (j + 1) +'</td>'+
									'<td>'+ value.activityname +'</td>'+
									'<td>'+ value.association +'</td>'+
                                    '<td>'+ value.activitydate + " " + value.activitystarttime + "-" + value.activityendtime +'</td>'+
									'<td>'+ value.activityplace +'</td>'+
									'<td>'+ value.declaretime +'</td>'+ 
									'<td><a href="./filesave/activityDeclareFiles/'+ value.declarefile +'" target="_blank">' + value.declarefile +'</a></td>'+ 
									'<td class="actions">'+
                                    '<button id="yesbtn" class="btn">通过</button>' +
                                    '<button id="nobtn" class="btn">不通过</button>' +
									'</td>'+
									'</tr>'))
							}
						})
					}
				}
			})
		}
		else if(window.sessionStorage.getItem("ActivityAuditList") != null){
			console.log(window.sessionStorage.getItem("ActivityAuditListLength"))
			totals = window.sessionStorage.getItem("ActivityAuditListLength")
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
				$.each(JSON.parse(window.sessionStorage.getItem("ActivityAuditList")), function(key, value){
					if(j == key){
                        $content.append(('<tr class="activityauditbodytr">'+
							'<td id="displaytd" style="display: none">'+ value.id +'</td>'+
							'<td>'+ (j + 1) +'</td>'+
							'<td>'+ value.activityname +'</td>'+
							'<td>'+ value.association +'</td>'+
                            '<td>'+ value.activitydate + " " + value.activitystarttime + "-" + value.activityendtime +'</td>'+
							'<td>'+ value.activityplace +'</td>'+
							'<td>'+ value.declaretime +'</td>'+ 
							'<td><a href="./filesave/activityDeclareFiles/'+ value.declarefile +'" target="_blank">' + value.declarefile +'</a></td>'+ 
							'<td class="actions">'+
                            '<button id="yesbtn" class="btn">通过</button>' +
                            '<button id="nobtn" class="btn">不通过</button>' +
							'</td>'+
							'</tr>'))
                    }
				})
			}
		}    
	}) 

function createContent ( i, index) {
	$content.empty()
	for(var j=(i-1)*index+1;j<index*i+1;j++){
		$.each(JSON.parse(window.sessionStorage.getItem("ActivityAuditList")), function(key, value){
            if(j == (key + 1)){
				$content.append(('<tr class="activityauditbodytr">'+
					'<td id="displaytd" style="display: none">'+ value.id +'</td>'+
					'<td>'+ j +'</td>'+
					'<td>'+ value.activityname +'</td>'+
					'<td>'+ value.association +'</td>'+
                    '<td>'+ value.activitydate + " " + value.activitystarttime + "-" + value.activityendtime +'</td>'+
					'<td>'+ value.activityplace +'</td>'+
					'<td>'+ value.declaretime +'</td>'+ 
					'<td><a href="./filesave/activityDeclareFiles/'+ value.declarefile +'" target="_blank">' + value.declarefile +'</a></td>'+ 
					'<td class="actions">'+
                    '<button id="yesbtn" class="btn">通过</button>' +
                    '<button id="nobtn" class="btn">不通过</button>' +
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