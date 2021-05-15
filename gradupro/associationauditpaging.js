var totals
var flagstr
var ActivityAuditList
var $content = $( ".content tbody" );
	// i为当前页 index为页数量
	$(function(){
		$(".name").html(window.sessionStorage.getItem("stuname"))     //设置登录的管理员名称
		$(document).attr("title","东莞理工学院学生社团管理系统 | 审批管理-社团申请管理");//设置title
		if(window.sessionStorage.getItem("AssociationAuditList") == null){
			$.ajax({
				url: 'http://localhost:5500/graduationproject/association_manager/associationregister/ReadAssociationRegister',
				type: "get",
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
					AssociationAuditList = JSON.stringify(data)
					window.sessionStorage.setItem("AssociationAuditList",AssociationAuditList)
					window.sessionStorage.setItem("AssociationAuditListLength",data.length)
					for(var j=0;j<10;j++){
						$.each(JSON.parse(window.sessionStorage.getItem("AssociationAuditList")), function(key, value){
							if(j == key){
                                if(value.flag == 1) flagstr = '<td>通过申请</td>'
                                else if(value.flag == 0) flagstr = '<td>已否决此申请</td>'
                                else if(value.flag == 2) flagstr = '<td class="actions">'+
                                '<button id="yesbtn" class="btn">通过</button>' +
                                '<button id="nobtn" class="btn">不通过</button>' +
                                '</td>'
								$content.append(('<tr class="associationauditbodytr">'+
								    '<td id="displaytd" style="display: none">'+ value.id +'</td>'+
									'<td>'+ (j + 1) +'</td>'+
									'<td>'+ value.auditassociation +'</td>'+
									'<td>'+ value.stunum +'</td>'+
                                    '<td>'+ value.stuname +'</td>'+
									'<td>'+ value.stutele +'</td>'+
									'<td><a href="./filesave/associationAuditFiles/'+ value.filename +'" target="_blank">' + value.filename +'</a></td>'+ 
									'<td>'+ value.uploadtime +'</td>'+ 
									flagstr + 
									'</tr>'))
							}
						})
					}
				}
			})
		}
		else if(window.sessionStorage.getItem("AssociationAuditList") != null){
			console.log(window.sessionStorage.getItem("AssociationAuditListLength"))
			totals = window.sessionStorage.getItem("AssociationAuditListLength")
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
				$.each(JSON.parse(window.sessionStorage.getItem("AssociationAuditList")), function(key, value){
					if(j == key){
                        if(value.flag == 1) flagstr = '<td>通过申请</td>'
                        else if(value.flag == 0) flagstr = '<td>已否决此申请</td>'
                        else if(value.flag == 2) flagstr = '<td class="actions">'+
                            '<button id="yesbtn" class="btn">通过</button>' +
                            '<button id="nobtn" class="btn">不通过</button>' +
                            '</td>'
						$content.append(('<tr class="associationauditbodytr">'+
							'<td id="displaytd" style="display: none">'+ value.id +'</td>'+
							'<td>'+ (j + 1) +'</td>'+
							'<td>'+ value.auditassociation +'</td>'+
							'<td>'+ value.stunum +'</td>'+
                            '<td>'+ value.stuname +'</td>'+
							'<td>'+ value.stutele +'</td>'+
							'<td><a href="./filesave/associationAuditFiles/'+ value.filename +'" target="_blank">' + value.filename +'</a></td>'+ 
                            '<td>'+ value.uploadtime +'</td>'+ 
							flagstr + 
							'</tr>'))
                    }
				})
			}
		}    
	}) 

function createContent ( i, index) {
	$content.empty()
	for(var j=(i-1)*index+1;j<index*i+1;j++){
		$.each(JSON.parse(window.sessionStorage.getItem("AssociationAuditList")), function(key, value){
            if(j == (key + 1)){
				if(value.flag == 1) flagstr = '<td>通过申请</td>'
                else if(value.flag == 0) flagstr = '<td>已否决此申请</td>'
                else if(value.flag == 2) flagstr = '<td class="actions">'+
                    '<button id="yesbtn" class="btn">通过</button>' +
                    '<button id="nobtn" class="btn">不通过</button>' +
                    '</td>'
				$content.append(('<tr class="associationauditbodytr">'+
					'<td id="displaytd" style="display: none">'+ value.id +'</td>'+
					'<td>'+ j +'</td>'+
					'<td>'+ value.auditassociation +'</td>'+
					'<td>'+ value.stunum +'</td>'+
                    '<td>'+ value.stuname +'</td>'+
					'<td>'+ value.stutele +'</td>'+
					'<td><a href="./filesave/associationAuditFiles/'+ value.filename +'" target="_blank">' + value.filename +'</a></td>'+ 
                    '<td>'+ value.uploadtime +'</td>'+ 
					flagstr + 
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