var activitylist, totals, $content = $( ".content tbody" );
$(function(){
    $(".name").html(window.sessionStorage.getItem("stuname"))     //设置登录的管理员名称
    $(document).attr("title","东莞理工学院学生社团管理系统 | "+window.sessionStorage.getItem("associationname")+" | 活动申报");//设置title
    $("#declareassocition").attr("value",window.sessionStorage.getItem("associationname"))
    $("#editdeclareassociation").attr("value",window.sessionStorage.getItem("associationname"))
    if(window.sessionStorage.getItem("activitylist") == null){
        $.ajax({
            url: 'http://localhost:5500/graduationproject/association_manager/activitydeclaration/ReadActivityDeclarationsByAssociation',
            type: "get",
            data: {associationname:window.sessionStorage.getItem("associationname")},
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
                activitylist = JSON.stringify(data)
                window.sessionStorage.setItem("activitylistlength",data.length)
                window.sessionStorage.setItem("activitylist",activitylist)
                for(var j=0;j<10;j++){
                    $.each(JSON.parse(window.sessionStorage.getItem("activitylist")), function(key, value){
                        if(j == key){
                            var declareflag ,btnstatus, declarestr
                            if(value.flag == 0){
                                declareflag = "审批未通过"
                                declarestr = '<td style="color: red">'+ declareflag +'</td>'
                                btnstatus = '<button id="deletebtn" class="btn" title="删除"><i class="fa fa-trash-o"></i></button>'+
			                    '<button id="editbtn" class="btn" title="修改"><i class="fa fa-pencil"></i></button>'+
                                '<button id="sendbtn" style="pointer-events: none;" class="btn" title="活动未通过审批，不能发布"><i class="fa fa-send"></i></button>'
                            }
                            else if(value.flag == 1){
                                declareflag = "审批通过"
                                declarestr = '<td style="color: green">'+ declareflag +'</td>'
                                btnstatus = '<button id="deletebtn" class="btn" title="删除"><i class="fa fa-trash-o"></i></button>'+
			                    '<button id="editbtn" style="pointer-events: none;" class="btn" title="修改"><i class="fa fa-pencil"></i></button>'+
                                '<button id="sendbtn" class="btn" title="发布活动"><i class="fa fa-send"></i></button>'
                            }
                            else if(value.flag == 2){
                                declareflag = "正在审批"
                                declarestr = '<td style="color: yellow">'+ declareflag +'</td>'
                                btnstatus = '<button id="deletebtn" style="pointer-events: none;" class="btn" title="删除"><i class="fa fa-trash-o"></i></button>'+
			                    '<button id="editbtn" style="pointer-events: none;" class="btn" title="修改"><i class="fa fa-pencil"></i></button>'+
                                '<button id="sendbtn" style="pointer-events: none;" class="btn" title="活动正在审批，暂不能发布"><i class="fa fa-send"></i></button>'
                            }
                            $content.append(('<tr class="declarebodytr">'+
                                '<td id="displaytd" style="display: none">'+ value.id +'</td>'+
                                '<td>'+ (j + 1) +'</td>'+
                                '<td>'+ value.activityname +'</td>'+
                                '<td>'+ value.activitydate +'</td>'+
                                '<td>'+ value.activitystarttime + "-" + value.activityendtime + '</td>'+
                                '<td>'+ value.activityplace +'</td>'+ 
                                '<td>'+ value.declarefile +'</td>'+
                                declarestr +
                                '<td class="actions">' +
			                    btnstatus +
                                '</td>'+
                                '</tr>'))
                        }
                    })
                }
            }
        })
    }
    if(window.sessionStorage.getItem("activitylist") != null){
        totals = window.sessionStorage.getItem("activitylistlength")
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
            $.each(JSON.parse(window.sessionStorage.getItem("activitylist")), function(key, value){
                if(j == key){
                    var declareflag ,btnstatus, declarestr
                    if(value.flag == 0){
                        declareflag = "审批未通过"
                        declarestr = '<td style="color: red">'+ declareflag +'</td>'
                        btnstatus = '<button id="deletebtn" class="btn" title="删除"><i class="fa fa-trash-o"></i></button>'+
                        '<button id="editbtn" class="btn" title="修改"><i class="fa fa-pencil"></i></button>'+
                        '<button id="sendbtn" style="pointer-events: none;" class="btn" title="活动未通过审批，不能发布"><i class="fa fa-send"></i></button>'
                    }
                    else if(value.flag == 1){
                        declareflag = "审批通过"
                        declarestr = '<td style="color: green">'+ declareflag +'</td>'
                        btnstatus = '<button id="deletebtn" class="btn" title="删除"><i class="fa fa-trash-o"></i></button>'+
                        '<button id="editbtn" style="pointer-events: none;" class="btn" title="修改"><i class="fa fa-pencil"></i></button>'+
                        '<button id="sendbtn" class="btn" title="发布活动"><i class="fa fa-send"></i></button>'
                    }
                    else if(value.flag == 2){
                        declareflag = "正在审批"
                        declarestr = '<td style="color: yellow">'+ declareflag +'</td>'
                        btnstatus = '<button id="deletebtn" style="pointer-events: none;" class="btn" title="删除"><i class="fa fa-trash-o"></i></button>'+
                        '<button id="editbtn" style="pointer-events: none;" class="btn" title="修改"><i class="fa fa-pencil"></i></button>'+
                        '<button id="sendbtn" style="pointer-events: none;" class="btn" title="活动正在审批，暂不能发布"><i class="fa fa-send"></i></button>'
                    }
                    $content.append(('<tr class="declarebodytr">'+
                        '<td id="displaytd" style="display: none">'+ value.id +'</td>'+
                        '<td>'+ (j + 1) +'</td>'+
                        '<td>'+ value.activityname +'</td>'+
                        '<td>'+ value.activitydate +'</td>'+
                        '<td>'+ value.activitystarttime + "-" + value.activityendtime + '</td>'+
                        '<td>'+ value.activityplace +'</td>'+ 
                        '<td>'+ value.declarefile +'</td>'+
                        declarestr +
                        '<td class="actions">' +
                        btnstatus +
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
        $.each(JSON.parse(window.sessionStorage.getItem("activitylist")), function(key, value){
            if(j == (key + 1)){
                var declareflag ,btnstatus, declarestr
                if(value.flag == 0){
                    declareflag = "审批未通过"
                    declarestr = '<td style="color: red">'+ declareflag +'</td>'
                    btnstatus = '<button id="deletebtn" class="btn" title="删除"><i class="fa fa-trash-o"></i></button>'+
                    '<button id="editbtn" class="btn" title="修改"><i class="fa fa-pencil"></i></button>'+
                    '<button id="sendbtn" style="pointer-events: none;" class="btn" title="活动未通过审批，不能发布"><i class="fa fa-send"></i></button>'
                }
                else if(value.flag == 1){
                    declareflag = "审批通过"
                    declarestr = '<td style="color: green">'+ declareflag +'</td>'
                    btnstatus = '<button id="deletebtn" class="btn" title="删除"><i class="fa fa-trash-o"></i></button>'+
                    '<button id="editbtn" style="pointer-events: none;" class="btn" title="修改"><i class="fa fa-pencil"></i></button>'+
                    '<button id="sendbtn" class="btn" title="发布活动"><i class="fa fa-send"></i></button>'
                }
                else if(value.flag == 2){
                    declareflag = "正在审批"
                    declarestr = '<td style="color: yellow">'+ declareflag +'</td>'
                    btnstatus = '<button id="deletebtn" style="pointer-events: none;" class="btn" title="删除"><i class="fa fa-trash-o"></i></button>'+
                    '<button id="editbtn" style="pointer-events: none;" class="btn" title="修改"><i class="fa fa-pencil"></i></button>'+
                    '<button id="sendbtn" style="pointer-events: none;" class="btn" title="活动正在审批，暂不能发布"><i class="fa fa-send"></i></button>'
                }
                $content.append(('<tr class="declarebodytr">'+
                    '<td id="displaytd" style="display: none">'+ value.id +'</td>'+
                    '<td>'+ j +'</td>'+
                    '<td>'+ value.activityname +'</td>'+
                    '<td>'+ value.activitydate +'</td>'+
                    '<td>'+ value.activitystarttime + "-" + value.activityendtime + '</td>'+
                    '<td>'+ value.activityplace +'</td>'+ 
                    '<td>'+ value.declarefile +'</td>'+
                    declarestr +
                    '<td class="actions">' +
                    btnstatus +
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