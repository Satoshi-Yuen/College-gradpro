// 点击活动申报的删除按钮触发的请求处理
$("body").last().on("click", "#deletebtn",function (){
    $.ajax({
        url: '',  //要改
        type: "post",
        dataType: "json",
        data: "",
        success: function(data){
            if(data == true){}
            else {}
        }
    })
})
// $(function () {
//     var mModal1 = new mModal({
//       content: "请问是否确定删除此条信息（删除后不可恢复）？",
//       confirm: function () {
//         mModal1.close();
//       },
//       cancel: function () {
//         mModal1.close();
//       }
//     });
    
//     $(".btn").on("click", function () {
//       mModal1.renderDom();
//     })
    
//   })
// (function( $ ) {
// 	// var tdata=$('#testtrident').text();
// 	'use strict';
// 	var EditableTable = {
// 		options: {
// 			table: '#dataeditable',
// 			dialog: {
// 				wrapper: '#dialog',
// 				cancelButton: '#dialogCancel',
// 				confirmButton: '#dialogConfirm',
// 			}
// 		},

// 		initialize: function() {
// 			this
// 				.setVars()
// 				.build()
// 				.events();
// 		},

// 		setVars: function() {
			
// 			this.$table				= $( this.options.table );

// 			// dialog
// 			this.dialog				= {};
// 			this.dialog.$wrapper	= $( this.options.dialog.wrapper );
// 			this.dialog.$cancel		= $( this.options.dialog.cancelButton );
// 			this.dialog.$confirm	= $( this.options.dialog.confirmButton );

// 			return this;
// 		},

// 		// 有修改
// 		build: function() {
// 			this.datatable = this.$table.DataTable({
// 				aoColumns: [
// 					null,
// 					null,
// 					null,
//                     null,
// 					null,
// 					null,
//                     null,
// 					{ "bSortable": false }
// 				]
// 			});

// 			window.dt = this.datatable;

// 			return this;
// 		},

// 		events: function() {
// 			var _self = this;

// 			this.$table
// 				.on('click', 'a.cancel-row', function( e ) {
// 					e.preventDefault();

// 					_self.rowCancel( $(this).closest( 'tr' ) );
// 				})
// 				.on( 'click', 'a.remove-row' ,function( e ) {
// 					e.preventDefault();
// 					var $row = $(this).closest( 'tr' );

// 					$.magnificPopup.open({
// 						items: {
// 							src: '#dialog',
// 							type: 'inline'
// 						},
// 						preloader: false,
// 						modal: true,
// 						callbacks: {
// 							// 删除提示框“确定”按钮触发函数
// 							change: function() {
// 								_self.dialog.$confirm.on( 'click', function( e ) {
// 									e.preventDefault();

// 									_self.rowRemove( $row );
// 									$.magnificPopup.close();

// 									// 获取删除的数据
// 									console.log($row.find("td:eq(0)").text());
// 									console.log($row.find("td:eq(1)").text());
// 									console.log($row.find("td:eq(2)").text());
// 									console.log($row.find("td:eq(3)").text());
// 									// console.log(tdata);
// 									console.log($row.find("td:eq(4)").text());
// 									console.log($row.find("td:eq(5)").text());
// 									console.log("已捕获到id...");
// 								});
// 							},
// 							// 删除提示框“取消”按钮触发函数
// 							close: function() {
// 								console.log("进来删除函数了...")
// 								_self.dialog.$confirm.off( 'click' );
// 							}
// 						}
// 					});
// 				});
//                 this.dialog.$cancel.on( 'click', function( e ) {
//                     e.preventDefault();
//                     $.magnificPopup.close();
//                 });
// 			return this;
// 		},
//         rowRemove: function( $row ) {
// 			console.log("4")
// 			if ( $row.hasClass('adding') ) {
// 				this.$addButton.removeAttr( 'disabled' );
// 			}

// 			this.datatable.row( $row.get(0) ).remove().draw();

// 		}
//     };
//     $(function() {
// 		EditableTable.initialize();
// 	});
// }).apply( this, [ jQuery ]);