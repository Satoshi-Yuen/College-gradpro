var $content = $( ".content tbody" );
var newauditactivitylist = []
$(function(){
    newauditactivitylist = window.sessionStorage.getItem("ActivityAuditList")
    $("#actauditsearch").on('input',function(){
        var listlength = 0
        var totals = 0
        var keyword = this.value
        if(keyword.length > 0){
            newauditactivitylist = []
            $content.empty()
            $.each(JSON.parse(window.sessionStorage.getItem("ActivityAuditList")),function(key,value){
                if(new RegExp(keyword).test(value.association)){
                    var jsonobj = {}
                    jsonobj.id = value.id
                    jsonobj.activityname = value.activityname
                    jsonobj.association = value.association
                    jsonobj.activitydate = value.activitydate
                    jsonobj.activitystarttime = value.activitystarttime
                    jsonobj.activityendtime = value.activityendtime
                    jsonobj.activityplace = value.activityplace
                    jsonobj.declaretime = value.declaretime
                    jsonobj.declarefile = value.declarefile
                    newauditactivitylist.push(jsonobj)
                    listlength += 1
                    $content.append(('<tr class="activityauditbodytr">'+
						'<td id="displaytd" style="display: none">'+ value.id +'</td>'+
						'<td>'+ listlength +'</td>'+
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
            newauditactivitylist = window.sessionStorage.getItem("ActivityAuditList")
            Helper.ui.page("#page-4", {
                total: window.sessionStorage.getItem("ActivityAuditListLength"),
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
            totals = window.sessionStorage.getItem("ActivityAuditListLength")
        }
    })

function createContent ( i, index) {
	$content.empty()
	for(var j=(i-1)*index+1;j<index*i+1;j++){
		$.each(JSON.parse(newauditactivitylist), function(key, value){
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
})