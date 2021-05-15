var $content = $( ".content tbody" );
var newactivitylist = []
$(function(){
    newactivitylist = window.sessionStorage.getItem("ActivitySignList")
    $("#actsignupsearch").on('input',function(){
        var listlength = 0
        var totals = 0
        var keyword = this.value
        if(keyword.length > 0){
            newactivitylist = []
            $content.empty()
            $.each(JSON.parse(window.sessionStorage.getItem("ActivitySignList")),function(key,value){
                if(new RegExp(keyword).test(value.activityname)){
                    var jsonobj = {}
                    jsonobj.id = value.id
                    jsonobj.stunum = value.stunum
                    jsonobj.stuname = value.stuname
                    jsonobj.stuprofessclass = value.stuprofessclass
                    jsonobj.stutele = value.stutele
                    jsonobj.activityname = value.activityname
                    newactivitylist.push(jsonobj)
                    listlength += 1
                    $content.append(('<tr class="activityapplybodytr">'+
                        '<td id="displaytd" style="display: none">'+ value.id +'</td>'+
                    	'<td>'+ listlength +'</td>'+
                    	'<td>'+ value.stunum +'</td>'+
                    	'<td>'+ value.stuname +'</td>'+
                    	'<td>'+ value.stuprofessclass +'</td>'+
                    	'<td>'+ value.stutele +'</td>'+ 
                    	'<td>'+ value.activityname +'</td>'+ 
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
            newactivitylist = window.sessionStorage.getItem("ActivitySignList")
            Helper.ui.page("#page-4", {
                total: window.sessionStorage.getItem("ActivitySignListlength"),
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
            totals = window.sessionStorage.getItem("ActivitySignListlength")
        }
    })

function createContent ( i, index) {
	$content.empty()
	for(var j=(i-1)*index+1;j<index*i+1;j++){
		$.each(JSON.parse(newactivitylist), function(key, value){
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
})