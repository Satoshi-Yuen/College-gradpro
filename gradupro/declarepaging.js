var activitylist;
var totals;
var $content = $( ".content tbody" );
$(function(){
    $(".name").html(window.sessionStorage.getItem("stuname"))     //设置登录的管理员名称
    $(document).attr("title","东莞理工学院学生社团管理系统 | "+window.sessionStorage.getItem("associationname")+" | 活动申报");//设置title
    if(window.sessionStorage.getItem("activitylist") == null){
        $.ajax({
            url: 'http://localhost:5500/graduationproject/association_manager/activitydeclaration/ReadActivityDeclarationsByAssociation',
            type: "get",
            data: {associationname: window.sessionStorage.getItem("associationname")},
            dataType: "json",
            success: function(data){
                // activitylist = eval("("+data+")")
                activitylist = JSON.stringify(data)
                console.log(activitylist.length)
                totals = activitylist.length
                window.sessionStorage.setItem("activitylist",activitylist)
                window.sessionStorage.setItem("activitylistlength",activitylist.length)
                for(var j=0;j<10;j++){
                    $.each(JSON.parse(window.sessionStorage.getItem("activitylist")), function(key, value){
                        if(j == key){
                            $content.append(('<tr class="tbodytr">'+
                                '<td>'+ j + 1 +'</td>'+
                                '<td>'+ value.activityname +'</td>'+
                                '<td>'+ value.activitydate +'</td>'+
                                '<td>'+ value.activitytime +'</td>'+
                                '<td>'+ value.activityplace +'</td>'+ 
                                '<td>'+ value.declarefile +'</td>'+
                                '<td>'+ value.flag +'</td>'+
                                '<td>'+ '操作' +'</td>'+
                                '</tr>'))
                        }
                    })
                }
                
                // $.each(data, function(key, value){
                //     // console.log(key, value)
                //     if(key == "") $('.teststr').append('<div>'+value+'</div>')   // 标签内插入内容
                //     else if(key == "") $('.teststr').append('<div>'+value+'</div>')
                // })
                // $.each(data, function(key, value){
                    
                //     // $('tbody').append('<tr class="gradeA"><td>'+value.activityname+'</td><td>'+value.activitydate+' '+value.declarecontent+'</td><td>'+value.declarecontent+'</td><td class="actions"><a href="#" class="hidden on-editing save-row"><i class="fa fa-save"></i></a>'
                //     // +'<a href="#" class="hidden on-editing cancel-row"><i class="fa fa-times"></i></a><a href="#" class="on-default edit-row"><i class="fa fa-pencil"></i></a><a href="#" class="on-default remove-row"><i class="fa fa-trash-o"></i></a></td></tr>')
                //     // if(key == "") $('.teststr').append('<div>'+value+'</div>')   // 标签内插入内容
                //     // else if(key == "") $('.teststr').append('<div>'+value+'</div>')
                //     // <tr class="gradeA">
                // 	// 							<td>Presto</td>
                // 	// 							<td>Opera 8.5</td>
                // 	// 							<td>Win 95+ / OSX.2+</td>
                // 	// 							<td class="actions">
                // 	// 								<a href="#" class="hidden on-editing save-row"><i class="fa fa-save"></i></a>
                // 	// 								<a href="#" class="hidden on-editing cancel-row"><i class="fa fa-times"></i></a>
                // 	// 								<a href="#" class="on-default edit-row"><i class="fa fa-pencil"></i></a>
                // 	// 								<a href="#" class="on-default remove-row"><i class="fa fa-trash-o"></i></a>
                // 	// 							</td>
                // 	// 						</tr>
                // })
            }
        })
    }
    else{
        totals = window.sessionStorage.getItem("activitylistlength")
		console.log(totals)
		console.log(window.sessionStorage.getItem("activitylistlength"))
        for(var j=0;j<10;j++){
            $.each(JSON.parse(window.sessionStorage.getItem("activitylist")), function(key, value){
                if(j == key){
                    $content.append(('<tr class="tbodytr">'+
                        '<td>'+ j + 1 +'</td>'+
                        '<td>'+ value.activityname +'</td>'+
                        '<td>'+ value.activitydate +'</td>'+
                        '<td>'+ value.activitytime +'</td>'+
                        '<td>'+ value.activityplace +'</td>'+ 
                        '<td>'+ value.declarefile +'</td>'+
                        '<td>'+ value.flag +'</td>'+
                        '<td>'+ '操作' +'</td>'+
                        '</tr>'))
                }
            })
        }
    }    
})    
// $(window).load(function(){
//     $.each(JSON.parse(window.sessionStorage.getItem("activitylist")), function(key, value){
//         $('tbody').append('<tr class="gradeA" role="row"><td class="sorting_1">'+value.activityname+'</td><td>'+value.activitydate+' '+value.declarecontent+'</td><td>'+value.declarecontent+'</td><td class="actions"><a href="#" class="hidden on-editing save-row"><i class="fa fa-save"></i></a>'
//             +'<a href="#" class="hidden on-editing cancel-row"><i class="fa fa-times"></i></a><a href="#" class="on-default edit-row"><i class="fa fa-pencil"></i></a><a href="#" class="on-default remove-row"><i class="fa fa-trash-o"></i></a></td></tr>')
//     })
// });


	// i为当前页 index为页数量
function createContent ( i, index ) {
	$content.empty()
	for(var j=(i-1)*index+1;j<index*i+1;j++){
        $.each(JSON.parse(window.sessionStorage.getItem("activitylist")), function(key, value){
            if(key + 1 == j){
                $content.append(('<tr class="tbodytr">'+
                '<td>'+ j +'</td>'+
                '<td>'+ value.activityname +'</td>'+
                '<td>'+ value.activitydate +'</td>'+
                '<td>'+ value.activitytime +'</td>'+
                '<td>'+ value.activityplace +'</td>'+ 
                '<td>'+ value.declarefile +'</td>'+
                '<td>'+ value.flag +'</td>'+
                '<td>'+ '操作' +'</td>'+
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
		createContent( i, 10 );
	}
});