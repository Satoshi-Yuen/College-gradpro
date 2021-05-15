// $.ajax({
// 	url: '',
//     type: "get",
//     data: window.sessionStorage.getItem("associationname",data.associationname),
//     dataType: "json",
//     success: function(data){
//         $(".panel-title").html(data.associationname)
//         $(".panel-subtitle").html(data.associationengname + "&#8195;/&#8195;" + data.associationslogan)
//         $(".panel-body p").html(data.associationmes)
//         window.sessionStorage.setItem("associationname",data.associationname)
//         window.sessionStorage.setItem("associationengname",data.associationengname)
//         window.sessionStorage.setItem("associationslogan",data.associationslogan)
//         window.sessionStorage.setItem("associationmes",data.associationmes)
//         window.sessionStorage.setItem("associationname",data.associationname),
//         // $.each(data, function(key, value){
//         //     // console.log(key, value)
//         //     if(key == "") $('.teststr').append('<div>'+value+'</div>')   // 标签内插入内容
//         //     else if(key == "") $('.teststr').append('<div>'+value+'</div>')
//         // })
//     }
// })
var totals = 10
var $content = $( ".content tbody" );
	// i为当前页 index为页数量
function createContent ( i, index ,total) {
	$content.empty()
	for(var j=(i-1)*index+1;j<index*i+1;j++){
		if(j <= total)
			$content.append(('<tr class="tbodytr">'+
			'<td>'+j+'</td>'+
			'<td>'+j+'</td>'+
			'<td>'+j+'</td>'+
			'<td>'+j+'</td>'+
			'<td>'+j+'</td>'+
			'<td>'+j+'</td>'+
			'<td class="actions">'+'<button id="deletebtn" class="btn"><i class="fa fa-trash-o"></i></button>'+
			'<button id="editbtn" class="btn"><i class="fa fa-pencil"></i></button>'+
			'</td>'+
			'</tr>'))
	}
}
Helper.ui.page("#page-4", {
	total: totals,
	pageSize: 8,
	showTotal: true,
	showTo: true,
	currentPage: 1,
	change: function ( i ) {
		createContent( i, 8 , totals);
	}
});