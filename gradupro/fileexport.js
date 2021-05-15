$(function(){
    $(".name").html(window.sessionStorage.getItem("stuname"))     //设置登录的管理员名称
    $(document).attr("title","东莞理工学院学生社团管理系统 | "+window.sessionStorage.getItem("associationname")+" | 文件下载");//设置title
    $.ajax({
        url: 'http://localhost:5500/graduationproject/association_manager/filetest',
        type: 'get',
        data: {fileurl:'D:\\nginx\\nginx-1.19.7\\html\\gradupro\\filesave'},
        dataType: 'json',
        success: function(data){
            var acount = 0, ccount = 0, ecount = 0, mcount = 0, ocount = 0
            var aflag = 1, cflag = 1, eflag = 1, mflag = 1, oflag = 1
            window.sessionStorage.setItem("filerecord",JSON.stringify(data))
            $.each(JSON.parse(window.sessionStorage.getItem("filerecord")),function(key,value){
                console.log()
                if(((eval("("+value+")").filepath).indexOf("ActivityOfFiles")>0)&&(eval("("+value+")").flag == 1)) acount += 1
                else if(((eval("("+value+")").filepath).indexOf("ConstructionOfFiles")>0)&&(eval("("+value+")").flag == 1)) ccount += 1
                else if(((eval("("+value+")").filepath).indexOf("EvaluationOfFiles")>0)&&(eval("("+value+")").flag == 1)) ecount += 1
                else if(((eval("("+value+")").filepath).indexOf("ManageOfFlies")>0)&&(eval("("+value+")").flag == 1)) mcount += 1
                else if(((eval("("+value+")").filepath).indexOf("OtherFiles")>0)&&(eval("("+value+")").flag == 1)) ocount += 1
            })
            $.each(JSON.parse(window.sessionStorage.getItem("filerecord")),function(key,value){
                if(((eval("("+value+")").filepath).indexOf("ActivityOfFiles")>0)&&(eval("("+value+")").flag == 1)){
                    if(aflag == 1){
                        $('tbody').append('<tr>'+
                        '<td id="construction" rowspan="'+acount+'">社团活动资料</td>'+
                        '<td><a href="'+eval("("+value+")").filepath+'">'+eval("("+value+")").filename+'</a></td>'+
                        '<td class="text-right">'+eval("("+value+")").filedate+'</td>'+
                        '</tr>')
                        aflag += 1
                    }    
                    else{
                        $('tbody').append('<tr>'+
                        '<td><a href="'+eval("("+value+")").filepath+'">'+eval("("+value+")").filename+'</a></td>'+
                        '<td class="text-right">'+eval("("+value+")").filedate+'</td>'+
                        '</tr>')
                    }
                }
                
                else if(((eval("("+value+")").filepath).indexOf("ConstructionOfFiles")>0)&&(eval("("+value+")").flag == 1)){
                    if(cflag == 1){
                        $('tbody').append('<tr>'+
                        '<td id="construction" rowspan="'+ccount+'">社团建设资料</td>'+
                        '<td><a href="'+eval("("+value+")").filepath+'">'+eval("("+value+")").filename+'</a></td>'+
                        '<td class="text-right">'+eval("("+value+")").filedate+'</td>'+
                        '</tr>')
                        cflag += 1
                    }    
                    else{
                        $('tbody').append('<tr>'+
                        '<td><a href="'+eval("("+value+")").filepath+'">'+eval("("+value+")").filename+'</a></td>'+
                        '<td class="text-right">'+eval("("+value+")").filedate+'</td>'+
                        '</tr>')
                    }
                }
                else if(((eval("("+value+")").filepath).indexOf("EvaluationOfFiles")>0)&&(eval("("+value+")").flag == 1)){
                    if(eflag == 1){
                        $('tbody').append('<tr>'+
                        '<td id="evaluation" rowspan="'+ecount+'">社团评定资料</td>'+
                        '<td><a href="'+eval("("+value+")").filepath+'">'+eval("("+value+")").filename+'</a></td>'+
                        '<td class="text-right">'+eval("("+value+")").filedate+'</td>'+
                        '</tr>')
                        eflag += 1
                    }    
                    else{
                        $('tbody').append('<tr>'+
                        '<td><a href="'+eval("("+value+")").filepath+'">'+eval("("+value+")").filename+'</a></td>'+
                        '<td class="text-right">'+eval("("+value+")").filedate+'</td>'+
                        '</tr>')
                    }
                }
                else if(((eval("("+value+")").filepath).indexOf("ManageOfFlies")>0)&&(eval("("+value+")").flag == 1)){
                    if(mflag == 1){
                        $('tbody').append('<tr>'+
                        '<td id="manage" rowspan="'+mcount+'">社团管理资料</td>'+
                        '<td><a href="'+eval("("+value+")").filepath+'">'+eval("("+value+")").filename+'</a></td>'+
                        '<td class="text-right">'+eval("("+value+")").filedate+'</td>'+
                        '</tr>')
                        mflag += 1
                    }    
                    else{
                        $('tbody').append('<tr>'+
                        '<td><a href="'+eval("("+value+")").filepath+'">'+eval("("+value+")").filename+'</a></td>'+
                        '<td class="text-right">'+eval("("+value+")").filedate+'</td>'+
                        '</tr>')
                    }
                }
                else if(((eval("("+value+")").filepath).indexOf("OtherFiles")>0)&&(eval("("+value+")").flag == 1)){
                    if(oflag == 1){
                        $('tbody').append('<tr>'+
                        '<td id="other" rowspan="'+ocount+'">其他资料</td>'+
                        '<td><a href="'+eval("("+value+")").filepath+'">'+eval("("+value+")").filename+'</a></td>'+
                        '<td class="text-right">'+eval("("+value+")").filedate+'</td>'+
                        '</tr>')
                        oflag += 1
                    }    
                    else{
                        $('tbody').append('<tr>'+
                        '<td><a href="'+eval("("+value+")").filepath+'">'+eval("("+value+")").filename+'</a></td>'+
                        '<td class="text-right">'+eval("("+value+")").filedate+'</td>'+
                        '</tr>')
                    }
                }
            })
        }
    })
})