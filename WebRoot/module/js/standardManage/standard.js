var fileParam = {};
var recoverParam = {};
$(function(){
	init();
});


function init(){
	

	$(function(){
		$('#table').bootstrapTable({
			striped:false, // 隔行变色效果
			pagination:true,// 在表格底部显示分页条
			pageSize:10,// 页面数据条数
			pageNumber: 1,// 首页页码
			pageList: [3,5,9,10,200,500],// 设置可供选择的页面数据条数
			clickToSelect : true,// 设置true 将点击时，自动选择rediobox 和 checkbox
			cache:false,// 禁用AJAX数据缓存
			sortName:'standard.ID',
			Order:'asc',
			url:'standardController/getStandardWithPaging.do',
			sidePagination:'server',
			contentType : 'application/json',
			dataType : 'json',
			offset: 0,
			queryParams: queryParams, //参数  
			queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
			showRefresh: false,  // 显示刷新按钮
			
			columns:[{
				checkbox:true,
				width:''// 宽度
			},{
				  field: '',
	              title: '序号',
	              width:'1%',
	              align:'center',
	              valign:'middle',
	              formatter: function (value, row, index) {
	                  return index+1;
	              }
			},{
				field:'ID',// 返回值名称
				title:'标准ID',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'0',// 宽度
				visible:false
			},{
				field:'fileID',// 返回值名称
				title:'文件ID',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'0',// 宽度
				visible:false
			},{
				field:'TYPE',// 返回值名称
				title:'类型(关联standardtype主键)',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'0',// 宽度
				visible:false
			},{
				field:'STANDARDCODE',// 返回值名称
				title:'标准编码',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'5%',// 宽度
	// visible:false
			},{
				field:'STANDARDNAME',// 返回值名称
				title:'标准名称',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'20%'// 宽度
			},{
				field:'standardTypeName',// 返回值名称
				title:'类别',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'8%'// 宽度
			},{
				field:'DESCRIPTION',// 返回值名称
				title:'技术条件',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'15%'// 宽度
			},{
				field:'SCOPE',// 返回值名称
				title:'适用范围',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'11%'// 宽度
			},{
				field:'APPLICATIONTYPE',// 返回值名称
				title:'引用类型',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'8%'// 宽度
			},{
				field:'EDITSTATE',// 返回值名称
				title:'编辑状态',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'8%'// 宽度
			},{
				field:'SUGGEST',// 返回值名称
				title:'审核意见',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'8%'// 宽度
			},{
				field:'STATE',// 返回值名称
				title:'状态',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'6%'// 宽度
			},{
				field:'',
				title:'操作',
				align:'center',
				valign:'middle',
				width:'13%',
				 formatter:function(value,row,index){   
					 var e = "<img src='module/img/download_icon.png' onclick ='downFile(\""+row.fileID+ "\")'  title='下载' style='cursor:pointer;margin-right:8px;' />"
					 var a = "<img src ='module/img/edit_icon.png' onclick='openEditModal("+JSON.stringify(row)+")'   title='修改' style='cursor:pointer;margin-right:8px;'/>"
	                 return e+a;    
	             }   
			}]// 列配置项,详情请查看 列参数 表格
			/* 事件 */
		});
	});
	uploadFile();
	recoverFile();
}

/* 刷新方法 */
function refresh(){
	window.location.href = "module/jsp/standardManage/standard.jsp";
}


window.onload = function(){
	getStandardType("query_TYPE");
	getStandardType("add_TYPE");
	getStandardType("edit_TYPE");
	getStandardType("apply_TYPE");
}

function queryParams(params) {  //配置参数 

    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的  
    
      STANDARDCODE: $('#query_STANDARDCODE').val(),  
      STANDARDNAME: $('#query_STANDARDNAME').val(),  
      TYPE: $('#query_TYPE').val(),  
      STATE: $('#query_STATE').val(), 
      APPLICATIONTYPE: $('#query_APPLICATIONTYPE').val(),
      limit: params.limit,   //页面大小  
      offset: params.offset,  //页码   
      sort: params.sort,  //排序列名  
      order: params.order//排位命令（desc，asc）  
    };  
    return temp;  
  }  

/* 查询方法 */
function query(){
	init();
	$('#table').bootstrapTable('refresh', null);
}


//检查文件类型
function checkFile(o) {
	$("#chooseFile").attr("disabled", "disabled");
	var filePath = $(o).val();
	if (filePath != "" && filePath != undefined) {
		var arr = filePath.split('\\');
		var fileName = arr[arr.length - 1];
		$("#fileName").html(fileName);
	}
	if (o.value.indexOf('.doc') < 0 && o.value.indexOf('.docx') < 0) {
		swal({title:"不能将此类型文档作为标准文件上传",  type:"warning",});
	}
} 

//检查重新覆盖文件类型
function checkRecoverFile(o) {
	$("#recoverButton").attr("disabled", "disabled");
	var filePath = $(o).val();
	if (filePath != "" && filePath != undefined) {
		var arr = filePath.split('\\');
		var fileName = arr[arr.length - 1];
		$("#recoverFileName").html(fileName);
	}
	if (o.value.indexOf('.doc') < 0 && o.value.indexOf('.docx') < 0) {
		swal({title:"不能将此类型文档作为标准文件上传",  type:"warning",});
	}
} 

// 弹窗
function openAddmodal(){

	// 文件上传参数配置
	$("#chooseFile").removeAttr("disabled");
	$("#fileName").html("");
	fileParam.firstDirectoryName = $('#fileType option:checked').text();// 一级目录
	fileParam.type = 1 ;
	fileParam.remarks = $('#add_TemplateRemarks').val(); // 备注
	
	if(arguments[0] === "add"){
//		fileUploadInit("#file_upload");
		$('#addModal').modal('show');
	}
	else{
		$("#recoverButton").removeAttr("disabled");
		$("#recoverFileName").html("");
		recover();
	}
	
}


//上传文件
function uploadFile() {
	$("#files").fileupload({
				autoUpload : true,
				url : 'fileOperateController/upload.do',
				dataType : 'json',
				add : function(e, data) {
					$("#ensure").click(function() {
						var parame = {};
						parame.uploaderID = ($('#uploaderID').val());
						parame.STANDARDCODE = ($('#add_STANDARDCODE').val());
						parame.STANDARDNAME = ($('#add_STANDARDNAME').val());//
						parame.TYPE = $('#add_TYPE').val();
						parame.SCOPE = $('#add_SCOPE').val();
						parame.APPLICATIONTYPE = $('#add_APPLICATIONTYPE').val();
						parame.EDITSTATE = $('#add_EDITSTATE').val();
						parame.DESCRIPTION = $('#add_DESCRIPTION').val();//
						if(!checkNull(parame)){
							data.submit();
						}
						
					});
				},
			}).bind('fileuploaddone',function(e, data) {
						var fileID = data.result
						if (fileID != null && fileID != "null" && fileID != "") {
							// 调用新增标准文件
							addstandard(fileID);
						} else {
							swal({title:"上传失败! 网路繁忙",  type:"error",});
						} 
					});

	// 文件上传前触发事件,如果需要额外添加参数可以在这里添加
	$('#files').bind('fileuploadsubmit', function(e, data) {
		data.formData = {
			firstDirectory : fileParam.firstDirectoryName,
			secondDirectory : fileParam.secondDirectoryName,
			TypeNumber : fileParam.type,
			remark : fileParam.remarks
		}
	});
}

//上传文件
function recoverFile() {
	$("#recoverFiles").fileupload({
				autoUpload : true,
				url : 'fileOperateController/upload.do',
				dataType : 'json',
				add : function(e, data) {
					$("#recoverEnsure").click(function() {
						data.submit();	
					});
				},
			}).bind('fileuploaddone',function(e, data) {
						var fileID = data.result
						if (fileID != null && fileID != "null" && fileID != "") {
							$.post("standardController/upFileID.do", 
							{
								standardID : recoverParam.ID,
								fileID : fileID
							},
							function(result) {
								if(result > 0 || result > "0"){
									$("#recoverStandard").modal("hide");
									swal({title:"覆盖上传成功",  type:"success",});
								}
								else{
									swal({title:"覆盖上传失败",  type:"error",});
								}
							});
						} else {
							swal({title:"覆盖上传失败",  type:"error",});
						} 
					});

	// 文件上传前触发事件,如果需要额外添加参数可以在这里添加
	$('#recoverFiles').bind('fileuploadsubmit', function(e, data) {
		data.formData = {
			path : recoverParam.path,
			TypeNumber : recoverParam.type,
		}
	});
} 

//重新覆盖
function recover() {
	var rows = $("#table").bootstrapTable('getSelections');
	if (rows.length == 0) {
		swal("请选择需要重新覆盖的文件");
		return;
	}
	if (rows.length > 1) {
		swal("只能选择一条数据");
		return;
	} else {
		$.post("standardController/recoverCheck.do", 
		{
			standardID : rows[0].ID
		},
		function(result) {
			if (result == true || result == "true") {
				$.post("fileOperateController/getFileDecryptPath.do",
				{
					ID : rows[0].fileID
				}, 
				function(result) {
					result = JSON.parse(result);
					if (result == null || result == "null" || result == "") {
						swal("没有记录");
					} else {
						var path = result[0].path;
						var i = path.lastIndexOf("\\");
						path = path.substring(i + 1, length);
						$.post("fileOperateController/getFilesInfo.do", 
						{
							ID : rows[0].fileID
						}, 
						function(fileInfos) {
							fileInfos = JSON.parse(fileInfos);
							if (fileInfos != null && fileInfos != "null" && fileInfos != "") {
								$("#recoverButton").removeAttr("disabled");
								$("#recoverFileName").html("");
								recoverParam.ID =  rows[0].ID;
								recoverParam.path = path;
								recoverParam.type = 1;
							}
						});
					}
				});
				$("#recoverStandard").modal("show");
			} else {
				swal("当前审核状态不可以重新覆盖");
			}
		});
	}
}
//判空处理

function checkNull(){
	if(　arguments[0].STANDARDCODE　== ""){
		swal({title:"标准编码不能为空",  type:"warning",});
		return true;
	}
	if(　arguments[0].STANDARDNAME　== ""){
		swal({title:"标准名称不能为空",  type:"warning",});
		return true;
	}
	if(　arguments[0].TYPE　== ""){
		swal({title:"类别不能为空",  type:"warning",});
		return true;
	}
	if(arguments[0].SCOPE　== ""){
		swal({title:"适用范围不能为空",  type:"warning",});
		return true;
	}
	if(arguments[0].APPLICATIONTYPE　== ""){
		swal({title:"引用类型不能为空",  type:"warning",});
		return true;
	}
	if(　arguments[0].EDITSTATE　== ""){
		swal({title:"编辑状态不能为空",  type:"warning",});
		return true;
	}
	if(　arguments[0].DESCRIPTION　== ""){
		swal({title:"描述信息不能为空",  type:"warning",});
		return true;
	}
	if(　arguments[0].fileID　== ""){
		swal({title:"请选择一个标准文件进行上传",  type:"warning",});
		return true;
	}
	if(　arguments[0].SUGGEST　== ""){
		swal({title:"审核意见不能为空",  type:"warning",});
		return true;
	}
	if(arguments[0].ABANDONAPPLYREASON　== ""){
		swal({title:"废弃理由不能为空",  type:"warning",});
		return true;
	}
	
}
//新增标准（处理文件ID）
function addstandard(fileIDs){
	
	var parame = {};
	parame.uploaderID = ($('#uploaderID').val()); //提交人
	parame.STANDARDCODE = ($('#add_STANDARDCODE').val());
	parame.STANDARDNAME = ($('#add_STANDARDNAME').val());//
	parame.TYPE = $('#add_TYPE').val();
	parame.SCOPE = $('#add_SCOPE').val();
	parame.APPLICATIONTYPE = $('#add_APPLICATIONTYPE').val();
	parame.EDITSTATE = $('#add_EDITSTATE').val();
	parame.DESCRIPTION = $('#add_DESCRIPTION').val();//
	parame.fileID = fileIDs;
	if(checkNull(parame))return;
	
	var Content = "有新的标准:"+parame.STANDARDNAME+"(标准名称)"+"-"+parame.STANDARDCODE+"(标准编码)需要审核。";
	$.ajax({
		  url:'standardController/addStandard.do',
		  data:parame,
		  success:function(o){
			  if(o <= 2){
				  swal({title:"新增失败",  type:"error",});
			  }
			  else{
				  sendMessage(Content,"标准审核人")
				  $('#addModal').modal('hide');
				  swal("上传成功!", "You clicked the button!", "success");
				  refresh();
			  }
		  }
		});
}



/* 废弃申请弹窗*/
function applyMondal(){
	
	
	var data = $('#table').bootstrapTable('getSelections');
	
	if(data.length == 0 || data.length > 1){
		swal({
			  title: "请选中一条数据",
			  type: "warning",
			});
		return;
	}
	if (data[0].STATE != '通过'){
		swal({
			  title: "当前状态不能废弃",
			  type: "warning",
			});
		return
	}
	
	$('#apply_STANDARDID').val(data[0].ID);
	
	$('#apply_STANDARDCODE').val(data[0].STANDARDCODE);
	$('#apply_STANDARDCODE').attr("disabled","disabled");
	
	$('#apply_STANDARDNAME').val(data[0].STANDARDNAME);
	$('#apply_STANDARDNAME').attr("disabled","disabled");
	
	$("#apply_TYPE").find('option[value ="'+data[0].TYPE+'"]').attr("selected",true);
	$('#apply_TYPE').attr("disabled","disabled");
	
	/* 应用类型处理*/
	if(data[0].APPLICATIONTYPE == "国家标准"){
		$('#apply_APPLICATIONTYPE').val("0");		
	}
	if(data[0].APPLICATIONTYPE == "企业标准"){
		$('#apply_APPLICATIONTYPE').val("1");	
	}
	if(data[0].APPLICATIONTYPE == "作业指导书"){
		$('#apply_APPLICATIONTYPE').val("2");	
	} 
	$('#apply_APPLICATIONTYPE').attr("disabled","disabled"); 
	
	$('#apply_SUGGEST').val(data[0].SUGGEST);
	$('#apply_SUGGEST').attr("disabled","disabled"); 
	
	
	$('#applyModal').modal('show');
}



/* 废弃申请*/
function apply(){
	
	var parame = {};
	parame.ID = $('#apply_STANDARDID').val();
	parame.ABANDONAPPLYMAN = $('#uploaderID').val();
	parame.ABANDONAPPLYREASON = $('#apply_ABANDONAPPLYREASON').val();
	parame.STATE = 4;
	if(checkNull(parame))return;
	$.ajax({
	  url:'standardController/upStandard.do',
	  data:parame,
	  success:function(o){
		  if(o<=0){
			  sweetAlert("错误", "返回为负", "error");
		  }
		  $('#applyModal').modal('hide');
		  refresh();
	  }
	});

}

/*文件下载*/
function downFile(fileID){
	if(fileID === null || fileID === "" || fileID === "null"){
		swal({  title: "文件丢失了", type: "error",});
		return;
	}
	else{
		swal({
			  title: "确定下载?",
			  type: "warning",
			  showCancelButton: true,
			  confirmButtonColor: "#DD6B55",
			  confirmButtonText: "确认",
			  cancelButtonText: "取消",
			  closeOnConfirm: false,
			  closeOnCancel: false
			},
			function(isConfirm){
			  if (isConfirm) {
				//下载文件
				downOneFile(fileID);
			  } else {
			    swal("Cancelled", "", "error");
			  }
			});
		return;
	}
}


/* 弹出修改弹框方法 */
function openEditModal(){

		$('#edit_STANDARDID').val(arguments[0].ID);
		$('#edit_STANDARDCODE').val(arguments[0].STANDARDCODE);
		$('#edit_STANDARDNAME').val(arguments[0].STANDARDNAME);
		
		$("#edit_TYPE").find('option[value ="'+arguments[0].TYPE+'"]').attr("selected",true);
		$('#edit_SCOPE').val(arguments[0].SCOPE);
		/* 应用类型处理*/
		if(arguments[0].APPLICATIONTYPE == "国家标准"){
			$('#edit_APPLICATIONTYPE').val("0");		
		}
		if(arguments[0].APPLICATIONTYPE == "企业标准"){
			$('#edit_APPLICATIONTYPE').val("1");	
		}
		if(arguments[0].APPLICATIONTYPE == "作业指导书"){
			$('#edit_APPLICATIONTYPE').val("2");	
		}
		/*是否编辑处理 */
		
		if(arguments[0].EDITSTATE == "可编辑"){
			$('#edit_EDITSTATE').val("1");
			$("div#edit .form-control").attr("disabled",false);
			$("#editbtn").attr("disabled", false); 
		}
		if(arguments[0].EDITSTATE == "不可编辑"){
			$('#edit_EDITSTATE').val("0");
			$("div#edit .form-control").attr("disabled","disabled");
			$("#editbtn").attr("disabled", true); 
		}
		
		
		$('#edit_SUGGEST').val(arguments[0].SUGGEST);
		
	/*	 状态处理
		
		if(arguments[0].STATE == "待审核"){
			$('#edit_STATE').val("0");
		}
		if(arguments[0].STATE == "通过"){
			$('#edit_STATE').val("1");
		}
		if(arguments[0].STATE == "已废弃"){
			$('#edit_STATE').val("2");
		}
		if(arguments[0].STATE == "驳回"){
			$('#edit_STATE').val("3");
		}*/
		$('#edit_DESCRIPTION').val(arguments[0].DESCRIPTION);
		
		$('#editModal').modal('show');
}

/* 修改*/
function edit(){
	var parame = {};
	parame.ID = $('#edit_STANDARDID').val();
	parame.STANDARDCODE = $('#edit_STANDARDCODE').val();
	parame.STANDARDNAME = $('#edit_STANDARDNAME').val();
	parame.TYPE = $('#edit_TYPE').val();
	parame.SCOPE = $('#edit_SCOPE').val();
	parame.APPLICATIONTYPE = $("#edit_APPLICATIONTYPE").val();
	parame.EDITSTATE = $('#edit_EDITSTATE').val();
	parame.STATE = $('#edit_STATE').val();
	
	if(checkNull(parame))return;
	$.ajax({
	  url:'standardController/upStandard.do',
	  data:parame,
	  success:function(o){
		  if(o<=0){
			  swal({  title: "修改失败", type: "error",});
		  }
		  $('#editModal').modal('hide');
		  refresh();
	  }
	});
}

/**
 * 
 * 提交审核
 */
function submitStandard(){
	var data = $('#table').bootstrapTable('getSelections');
	
	if(data == 0){
		swal("至少选中一条");
		return;
	}
	var ids  = "";
	
	for(var i=0; i<data.length; i++){
		if(data[i].STATE != "未提交"){
			swal(data[i].STANDARDNAME + "已经提交过");
			return;
		}
		if(i == data.length - 1){
			ids += data[i].ID
		}
		else{
			ids += data[i].ID + ",";
		}
	}
	$.ajax({
		url : 'standardController/upSubmitStandard.do',
		data : {standardIDs : ids},
		success : function(o) {
			if (o <= 0) {
				swal({title:"操作失败",type:"error"});
			} else {
				swal({title:"操作成功",type:"success"});
				refresh();
			}

		}
	});
}

// 消息推送
function  sendMessage(Content,recipient){
	$.ajax({
		url:'messageController/addMessage.do',
		data:{
			content:Content
		},
		success:function(o){
			  if(o == ""){
				  swal({  title: "信息新增失败（1）", type: "error",});
				  return false;
			  }
			  else{
				  var messageID = o;
				  messageID = messageID.substring(1,messageID.length-1);
				  alert(messageID);
				  $.ajax({
					  url:'messageNoticeController/addMessageNotice.do?MessageID='+messageID+'&recipient='+recipient,
					  success:function(s){
						  s = s.substring(1,s.length-1);
						  if(s < "1"){
							  if(s === "-1"){
								  swal({  title: "信息新增失败（2）:不存在该角色名" + recipient, type: "error",});
								  return false;
							  }
							  else{
								  swal({  title: "未知错误", type: "error",});
								  return false;
							  }
						  }
						  else{ return true;}
					  }
				  });
			  }
		  }
	});
}

/* 获取标准类型信息*/
function getStandardType(id){
	$.ajax({
		url : 'standardController/getStandardType.do',
		success : function(o) {
			
			if($('#' + id + '').children().length >= 0)
			{
				var data = JSON.parse(o);
				
				for (var i=0; i<data.length;i++)
				{
					$('#' + id + '').append("<option value='" + data[i].ID + "' >" +data[i].standardTypeName + " </option>");
				}
			}
			
		}

	});
}
