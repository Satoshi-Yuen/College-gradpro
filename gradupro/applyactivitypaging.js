var totals
var ActivitySignList
var $content = $( ".content tbody" );
	// i为当前页 index为页数量
	$(function(){
		$(".name").html(window.sessionStorage.getItem("stuname"))     //设置登录的管理员名称
		$(document).attr("title","东莞理工学院学生社团管理系统 | "+window.sessionStorage.getItem("associationname")+" | 报名管理-活动报名管理");//设置title
		if(window.sessionStorage.getItem("ActivitySignList") == null){
			$.ajax({
				url: 'http://localhost:5500/graduationproject/association_manager/activityregistration/ReadActivityRegistrations',
				type: "get",
				data: {atname:window.sessionStorage.getItem("associationname")},
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
					ActivitySignList = JSON.stringify(data)
					window.sessionStorage.setItem("ActivitySignList",ActivitySignList)
					window.sessionStorage.setItem("ActivitySignListlength",data.length)
					for(var j=0;j<10;j++){
						$.each(JSON.parse(window.sessionStorage.getItem("ActivitySignList")), function(key, value){
							if(j == key){
								$content.append(('<tr class="activityapplybodytr">'+
								    '<td id="displaytd" style="display: none">'+ value.id +'</td>'+
									'<td>'+ (j + 1) +'</td>'+
									'<td>'+ value.stunum +'</td>'+
									'<td>'+ value.stuname +'</td>'+
									'<td>'+ value.stuprofessclass +'</td>'+
									'<td>'+ value.stutele +'</td>'+ 
									'<td>'+ value.activityname +'</td>'+ 
									'<td class="actions">'+'<button id="deletebtn" class="btn"><i class="fa fa-trash-o"></i></button>' +
									'</td>'+
									'</tr>'))
							}
						})
					}
				}
			})
		}
		else if(window.sessionStorage.getItem("ActivitySignList") != null){
			totals = window.sessionStorage.getItem("ActivitySignListlength")
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
				$.each(JSON.parse(window.sessionStorage.getItem("ActivitySignList")), function(key, value){
					if(j == key){
						$content.append(('<tr class="activityapplybodytr">'+
						    '<td id="displaytd" style="display: none">'+ value.id +'</td>'+
							'<td>'+ (j + 1) +'</td>'+
							'<td>'+ value.stunum +'</td>'+
							'<td>'+ value.stuname +'</td>'+
							'<td>'+ value.stuprofessclass +'</td>'+
							'<td>'+ value.stutele +'</td>'+ 
							'<td>'+ value.activityname +'</td>'+ 
							'<td class="actions">'+'<button id="deletebtn" class="btn"><i class="fa fa-trash-o"></i></button>' +
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
		$.each(JSON.parse(window.sessionStorage.getItem("ActivitySignList")), function(key, value){
            if(j == (key + 1)){
				$content.append(('<tr class="activityapplybodytr">'+
				    '<td id="displaytd" style="display: none">'+ value.id +'</td>'+
					'<td>'+ j +'</td>'+
					'<td>'+ value.stunum +'</td>'+
					'<td>'+ value.stuname +'</td>'+
					'<td>'+ value.stuprofessclass +'</td>'+
					'<td>'+ value.stutele +'</td>'+ 
					'<td>'+ value.activityname +'</td>'+ 
					'<td class="actions">'+'<button id="deletebtn" class="btn"><i class="fa fa-trash-o"></i></button>' +
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