﻿var ContractInfo = {};
ContractInfo.data = getContract();//全局合同信息

$(function(){
	init();
});


function init(){
	

	$(function(){
		$('#table').bootstrapTable({
			striped:true, // 隔行变色效果
			pagination:true,// 在表格底部显示分页条
			pageSize:10,// 页面数据条数
			pageNumber: 1,// 首页页码
			pageList: [3,5,9,10,200,500],// 设置可供选择的页面数据条数
			clickToSelect : false,// 设置true 将点击时，自动选择rediobox 和 checkbox
			cache:false,// 禁用AJAX数据缓存
			sortName:'accounts.ID',
			Order:'asc',
			url:'accountsController/getAccountWithPaging.do',
			sidePagination:'server',
			contentType : 'application/json',
			dataType : 'json',
			offset: 0,
			queryParams: queryParams, //参数  
			queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
			showRefresh: false,  // 显示刷新按钮
			
			columns:[
			 {
				field:'accountsID',// 返回值名称
				title:'项目ID',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'0',// 宽度
				visible:false
			},{
				field:'contractID',// 返回值名称
				title:'合同ID',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'0',// 宽度
				visible:false
			},{
				field:'contractCode',// 返回值名称
				title:'合同编码',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'15%',// 宽度
			},{
				field:'contractName',// 返回值名称
				title:'合同名称',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'15%'// 宽度
			},{
				field:'contractAmount',// 返回值名称
				title:'合同金额',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'18%'// 宽度
			},{
				field:'employeeName',// 返回值名称
				title:'报账专员',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'18%'// 宽度
			},{
				field:'checkinTime',// 返回值名称
				title:'录入时间 ',// 列名
				align:'center',// 水平居中显示
				valign:'middle',// 垂直居中显示
				width:'18%'// 宽度
			},{
				field:'',
				title:'操作',
				align:'center',
				valign:'middle',
				width:'20%',
				 formatter:function(value,row,index){    
					 var e = "<img src ='module/img/view_icon.png' onclick='viewDetailed(\""+row.contractID+"\")'  title='查看详细' style='cursor:pointer;margin-right:8px'>"
					 var a = "<img src ='module/img/edit_icon.png' onclick='openEditModal("+JSON.stringify(row)+")' title='修改' style='cursor:pointer;margin-right:8px;' />"
					 var d = "<img src ='module/img/delete_icon.png' onclick='delAccounts(\""+row.accountsID+"\")' title='删除' style='cursor:pointer;margin-right:8px;' />"
	                 return e+a+d;
	             }   
			}]// 列配置项,详情请查看 列参数 表格
			/* 事件 */
		});
	});
}

/* 刷新方法 */
function refresh(){
	window.location.href = "module/jsp/accountsManage/accountsManage.jsp";
}


function queryParams(params) {  //配置参数 

    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的  
    
      contractCode: $('#query_contractCode').val(),  
      contractName: $('#query_contractName').val(),  
      checkinTime1: $('#query_checkTime1').val(),  
      checkinTime2: $('#query_checkTime2').val(), 
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

/* 流水账目跳转  */
function viewDetailed(){
	window.location.href = window.location.href.replace('accountsManage.jsp','jouranlAccounts.jsp') + '?ID='+arguments[0];
}
/* 新增弹窗  */
function delAccounts(){
	accountsID = arguments[0];
	swal({
		  title: "确定要删除 ?",
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "确定",
		  closeOnConfirm: false
		},
		function(){
			 $.ajax({
					url: 'accountsController/delAccounts.do',
					data:{
						accountsID : accountsID
					},
					success:function(o){
						if (o <= 0) {
							swal({title:"删除失败",type:"error"});
						} else {
							swal({title:"删除成功",type:"success"});
							refresh();
						}
					}
	         });
		});
}

/* 新增弹窗  */
function openAddModal(){
	fillContract("add_contractCode");
	var loginInfo =  getLoginerInfo();
	$('#add_employeeName').val(loginInfo[0].employeeName);
	$('#employeeID').val(loginInfo[0].employeeID);
	$('#addModal').modal('show');
}

// 判空处理
function checkNull(){
	if(arguments[0].contractID == ""){
		swal({title:"合同编号不能为空",type:"warning"});
		return true;
	}
	if(arguments[0].employeeID == ""){
		swal({title:"报账专员不能为空",type:"warning"});
		return true;
	}
}
/* 新增账目  */
function addAccounts(){
	var parame = {};
	
	parame.contractID = $('#add_contractCode').val();
	parame.employeeID = $('#employeeID').val();
	parame.remarks = $('#add_remarks').val();
	if(checkNull(parame))return;
	
	$.ajax({
		  url:'accountsController/addAccounts.do',
		  data:parame,
		  success:function(o){
			  if(o<=0){
				  swal({title:"修改失败",type:"error"});
			  }
			  $('#addModal').modal('hide');
			  refresh();
		  }
		});
	
}
/* 合同信息html  */
function fillContract(id){
	$('#'+id+'').empty();
	var html = '<option ></option>';
	for(var i = 0 ; i < ContractInfo.data.length; i++){
		html += "<option value ='"+ ContractInfo.data[i].contractID +"'>"+ ContractInfo.data[i].contractCode +"</option>";
	}
	if($('#'+id+'').children().length == 0){
		$('#'+id+'').append(html);
	}
}

/* 修改弹窗  */
function openEditModal(){
	
//	fillContract("edit_contractCode");
	$('#edit_contractCode').val(arguments[0].contractCode)
	$('#edit_accountsID').val(arguments[0].accountsID);
	$('#edit_contractName').val(arguments[0].contractName);
	$('#edit_contractAmount').val(arguments[0].contractAmount);
	$('#edit_employeeName').val(arguments[0].employeeName);
	$('#edit_checkinTime').val(arguments[0].checkinTime);
	
	var operator = getLoginerInfo();
	
	if(operator[0].employeeID === arguments[0].employeeID){
		$("div#edit .form-control").attr("disabled",false);
	}
	else{
		swal("不可编辑");
		$("div#edit .form-control").attr("disabled","disabled");
	}
	
	$('#editModal').modal('show');
	
	
}
/* 合同信息填充  */
function contractCodeChange(type){
	if(type === "add"){
		var add_contractID = $('#add_contractCode').val();
		$("input[name^='edit_']").attr("value","");
		
		for(var i = 0; i < ContractInfo.data.length; i++){
			if(add_contractID === ContractInfo.data[i].contractID){
				$('#add_contractName').val(ContractInfo.data[i].contractName);
				$('#add_contractAmount').val(ContractInfo.data[i].contractAmount);
			}
		}
	}
	else{
		var edit_contractID = $('#edit_contractCode').val();
		$("input[name^='edit_']").attr("value","");
		
		for(var i = 0; i < ContractInfo.data.length; i++){
			if(edit_contractID === ContractInfo.data[i].contractID){
				$('#edit_contractName').val(ContractInfo.data[i].contractName);
				$('#edit_contractAmount').val(ContractInfo.data[i].contractAmount);
			}
		}
	}
	
}
/* 修改账目  */
function editAccounts(){
	var parame = {};
	
	parame.accountsID = $('#edit_accountsID').val();
	parame.contractID = $('#edit_contractCode').val();
	$.ajax({
		  url:'accountsController/upAccounts.do',
		  data:parame,
		  success:function(o){
			  if(o<=0){
				  alert("修改失败");
			  }
			  $('#editModal').modal('hide');
			  refresh();
		  }
		});
}

/* 获取合同数据 */
function getContract(){
	var data;
	$.ajax({
		url : 'contractController/getContract.do',
		dataType : "json",
		async : false,
		data : {},
		success : function(o) {
			data = JSON.parse(o);
		},
		error : function() {
			return false;
		}
	});
	return data;
}
/*获取当前session*/
function getLoginerInfo(){
	var data;
	$.ajax({
		url : 'employeeController/getEmployeeinfo.do',
		dataType : "json",
		async : false,
		data : {},
		success : function(o) {
			data = JSON.parse(o);
		},
		error : function() {
			return false;
		}
	});
	return data;
}
