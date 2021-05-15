var $content = $( ".content tbody" );
var newstafflist = []
$(function(){
    newstafflist = window.sessionStorage.getItem("WorkMembersList")
    $("#staffsearch").on('input',function(){
        var listlength = 0
        var totals = 0
        var keyword = this.value
        if(keyword.length > 0){
            newstafflist = []
            $content.empty()
            $.each(JSON.parse(window.sessionStorage.getItem("WorkMembersList")),function(key,value){
                if(new RegExp(keyword).test(value.department)){
                    var jsonobj = {}
                    jsonobj.id = value.id
                    jsonobj.stunum = value.stunum
                    jsonobj.stuname = value.stuname
                    jsonobj.stusex = value.stusex
                    jsonobj.stugrade = value.stugrade
                    jsonobj.stucollege = value.stucollege
                    jsonobj.stuprofessclass = value.stuprofessclass
                    jsonobj.department = value.department
                    jsonobj.stutele = value.stutele
                    newstafflist.push(jsonobj)
                    listlength += 1
                    $content.append(('<tr class="staffsbodytr">'+
						'<td id="displaytd" style="display: none">'+ value.id +'</td>'+
						'<td>'+ listlength +'</td>'+
						'<td>'+ value.stunum +'</td>'+
						'<td>'+ value.stuname +'</td>'+
						'<td>'+ value.stusex +'</td>'+
						'<td>'+ value.stugrade +'</td>'+ 
						'<td>'+ value.stucollege +'</td>'+
						'<td>'+ value.stuprofessclass +'</td>'+
                        '<td>'+ value.department +'</td>'+
						'<td>'+ value.stutele +'</td>'+  
						'<td class="actions">'+'<button id="deletebtn" class="btn"><i class="fa fa-trash-o"></i></button>' +
						'</td>'+
						'</tr>'))
                }
                totals = listlength
            })
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
        }
        else{
            newstafflist = window.sessionStorage.getItem("WorkMembersList")
            Helper.ui.page("#page-4", {
                total: window.sessionStorage.getItem("WorkMembersListlength"),
                pageSize: 10,
                showTotal: true,
                showTo: true,
                currentPage: 1,
                change: function ( i ) {
                    createContent( i, 10);
                }
            });
            for(var j=0;j<10;j++){
                $.each(JSON.parse(window.sessionStorage.getItem("WorkMembersList")), function(key, value){
                    if(j == key){
                        $content.append(('<tr class="staffsbodytr">'+
                            '<td id="displaytd" style="display: none">'+ value.id +'</td>'+
                            '<td>'+ (j + 1) +'</td>'+
                            '<td>'+ value.stunum +'</td>'+
                            '<td>'+ value.stuname +'</td>'+
                            '<td>'+ value.stusex +'</td>'+
                            '<td>'+ value.stugrade +'</td>'+ 
                            '<td>'+ value.stucollege +'</td>'+
                            '<td>'+ value.stuprofessclass +'</td>'+
                            '<td>'+ value.department +'</td>'+
                            '<td>'+ value.stutele +'</td>'+  
                            '<td class="actions">'+'<button id="deletebtn" class="btn"><i class="fa fa-trash-o"></i></button>' +
                            '</td>'+
                            '</tr>'))
                    }
                })
            }
            totals = window.sessionStorage.getItem("WorkMembersListlength")
        }
    })

function createContent(i, index) {
    $content.empty()
    for (var j = (i - 1) * index + 1; j < index * i + 1; j++) {
        $.each(JSON.parse(newstafflist), function (key, value) {
            if (j == key) {
                $content.append(('<tr class="staffsbodytr">' +
                    '<td id="displaytd" style="display: none">' + value.id + '</td>' +
                    '<td>' + (j + 1) + '</td>' +
                    '<td>' + value.stunum + '</td>' +
                    '<td>' + value.stuname + '</td>' +
                    '<td>' + value.stusex + '</td>' +
                    '<td>' + value.stugrade + '</td>' +
                    '<td>' + value.stucollege + '</td>' +
                    '<td>' + value.stuprofessclass + '</td>' +
                    '<td>' + value.department + '</td>' +
                    '<td>' + value.stutele + '</td>' +
                    '<td class="actions">' + '<button id="deletebtn" class="btn"><i class="fa fa-trash-o"></i></button>' +
                    '</td>' +
                    '</tr>'))
            }
        })
    }
}
Helper.ui.page("#page-4", {
	total: WorkTotal,
	pageSize: 10,
	showTotal: true,
	showTo: true,
	currentPage: 1,
	change: function ( i ) {
		createContent( i, 10 );
	}
});
})