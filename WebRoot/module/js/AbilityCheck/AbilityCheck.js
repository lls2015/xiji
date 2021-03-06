
var object= {};
	pubtype = "";
	datacount = -1;
var reciveID={};
var actiontype = "";
var equipment = "";
var department = "";
var timeDom="";
var condition = " 1=1 ";
var BackstageFileID
function queryParams(pageReqeust) {
	pageReqeust.pageNumber = 1;
	pageReqeust.pageSize = 9;
	pageReqeust.searchText = "";
	pageReqeust.sortName = 'employeeName,equipmentName';
	pageReqeust.sortOrder = 'asc';
	pageReqeust.condition = condition;

	return pageReqeust;
}
$._messengerDefaults = {
 extraClasses: 'messenger-fixed messenger-theme-future messenger-on-top'
}

function initialize(){
	$('#table').bootstrapTable({
		striped: true,// 隔行变色效果
		pagination: true,//在表格底部显示分页条
		pageSize: 10,//页面数据条数
		pageNumber:1,//首页页码
		pageList: [3, 5, 9, 10, 200, 500],//设置可供选择的页面数据条数
		cache: false,//禁用 AJAX 数据缓存
		sortName:'employeeName,equipmentName,startTime',//定义排序列
		sortOrder:'asc',//定义排序方式
		url:'abilityCheckController/getAbilityCheckWithPaging.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
		queryParams:queryParams,//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		selectItemName:'',//radio or checkbox 的字段名
		onDblClickCell:onDblClickCell,
		columns : [ {
			checkbox : true,
			width : '5%'// 宽度
		}, {
			field : 'ID',// 返回值名称
			width:"17%",
			visible:false
		}, {
			field : 'parameter',// 返回值名称
			title : '参数\项目',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10%'// 宽度
		}, {
			field : 'employeeName',// 返回值名称
			title : '组织者',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10%'// 宽度
		}, {
			field : 'type',// 返回值名称
			title : '实施类型',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10%'// 宽度
		}, {
			field : 'equipmentName',// 返回值名称
			title : '设备名称',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10%'// 宽度
		}, {
			field : "departmentName",// 返回值名称
			title : '实验室名称（部门名称）',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10%'// 宽度
		}, {
			field : "startTime",//实施日期
			title : '实施日期',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10%'// 宽度
		}, {
			field : "result",// 结果
			title : '结果',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10%'// 宽度
		} , {
			field : "state",// 状态
			title : '状态',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10%'// 宽度
		} , {
			field : "fileName",// 结果报告
			title : '结果报告',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '20%'// 宽度
		} ,{
			field : "fileID",
	        visible:false
		} ,	{
			field : "equipmentID",
			visible:false
	} ],
		 onLoadSuccess:function(o){
		     var json = eval(o);
		     var vauDate = $('#table').bootstrapTable('getData');
		    for(var i = 0; i < parseInt(json.count); i++){
		    $('#table').bootstrapTable('mergeCells',{index: parseInt(json.merge[0]['index'+i]), field: 'fileName', rowspan: parseInt(json.merge[0]['count'+i]),colspan: 1});
		    
		   }  

		 },
	// 列配置项,详情请查看 列参数 表格
	/* 事件 */
        onLoadError: function () {
        	 $.globalMessenger().post({
        		   message: "操作失败",//提示信息
        		   type: 'error',//消息类型。error、info、success
        		   hideAfter: 2,//多长时间消失
        		   showCloseButton:true,//是否显示关闭按钮
        		   hideOnNavigate: true //是否隐藏导航
        		 });
        }
	
});
	}

$(document).ready(function() {
	$.ajax({
		url:'abilityCheckController/getTableName.do',
		  data:"tableName=equipment",
		  success:function(o){
			  equipment = eval(o);
			  for(var j = 0; j < equipment.length; j++){
				$('#Devicename').append("<option >"+equipment[j].equipmentName+"</option>");
			}
			  $('#Devicename').val("");
		  }
	});
	$.ajax({
		url:'abilityCheckController/getTableName.do',
		data:"tableName=department",
		success:function(o){
			department = eval(o);
		}
	});
	initialize();
});

function refresh2(){
	location.reload([false]);
}

function refresh(){
	$('#table').bootstrapTable('refresh', null);
}


function onDblClickCell(field,value,row,$element){
	object==null;
	index = 0;
	timeDom = "123";

	object = row;
	var getvalue ="";
	var receive = field;
	if(receive=="parameter"||receive=="equipmentName"||receive=="departmentName"||receive=="startTime"){
		pubtype = receive;
		switch(receive){
		case "parameter":getvalue = row.parameter;
		$element[0].innerHTML="<input  onblur='flevChecks(this,this.value,"+"pubtype"+")' type='text' class='form-control' aria-describedby='basic-addon1' value='"+getvalue+"'>";
		;break;
		case "equipmentName":getvalue = row.equipmentName;
		$element[0].innerHTML="<select id='add_EquipmentID' onblur='flevChecks(this,this.value,pubtype)' type='text' class='form-control' aria-describedby='basic-addon1'> ></select>";
		for(var i = 0; i < equipment.length; i++)
			$('#add_EquipmentID').append("<option value='"+equipment[i].ID+"'>"+equipment[i].equipmentName+"</option>");
		
			$("#add_EquipmentID  option[value='" +getvalue+ "'] ").attr("selected",true)
		;break;
		
		case "departmentName":getvalue = row.departmentName;
		$element[0].innerHTML="<select id='add_DepartmentID' onblur='flevChecks(this,this.value,pubtype)' type='text' class='form-control' aria-describedby='basic-addon1'></select>";
		for(var i = 0; i < department.length; i++)
			$('#add_DepartmentID').append("<option value='"+department[i].ID+"'>"+department[i].departmentName+"</option>");
			
		$("#add_DepartmentID  option[value='" +getvalue+ "'] ").attr("selected",true)
		;break;
		
		case "startTime":getvalue = row.startTime;
		$element[0].innerHTML = "<input id='in123' class='form-control' value='"+getvalue+"' type='text' />";   
		$("#in123").datetimepicker({
	        minView: 'month',            //设置时间选择为年月日 去掉时分秒选择
	        format:'yyyy-mm',
	        todayBtn:"linked",
	        autoclose:true,
	        todayHighlight:true,
	        startView:3,
	        minView:3,
	        language: 'zh-CN'              //设置时间控件为中文
	    }).on('changeDate', function(ev){
	    	var val = $('#in123').val();
			document.getElementById("in123").parentNode.innerHTML = $('#in123').val();
	    	row.startTime = val;
		}); 
		/**/
		
		break;
		}
	}else{
		 $.globalMessenger().post({
			   message: "此项不能修改",//提示信息
			   type: 'info',//消息类型。error、info、success
			   hideAfter: 2,//多长时间消失
			   showCloseButton:true,//是否显示关闭按钮
			   hideOnNavigate: true //是否隐藏导航
			 });
	};
}


function add(){
	if(datacount<0)
		datacount = $('#table').bootstrapTable('getData').length;
	$('#table').bootstrapTable('insertRow',{index:0,row:{
		parameter:"",
		employeeName :"",
		type:"",
		equipmentName:"",
		departmentName:"",
		startTime:"",
		result:"",
		state:'未完成',
		fileName:"",
	}});
	
}

function addPlan(dom){
	var getdata = $('#table').bootstrapTable('getSelections');
	if(getdata[0].parameter == "" || getdata[0].equipmentName == "" || getdata[0].departmentName == ""){
		 $.globalMessenger().post({
	  		   message: "参数，设备名称，部门名称必填",//提示信息
	  		   type: 'error',//消息类型。error、info、success
	  		   hideAfter: 2,//多长时间消失
	  		   showCloseButton:true,//是否显示关闭按钮
	  		   hideOnNavigate: true //是否隐藏导航
	  		 });	
	}
	if(getdata.length<=0||getdata.length > 1){
		 $.globalMessenger().post({
  		   message: "请选择一条数据",//提示信息
  		   type: 'error',//消息类型。error、info、success
  		   hideAfter: 2,//多长时间消失
  		   showCloseButton:true,//是否显示关闭按钮
  		   hideOnNavigate: true //是否隐藏导航
  		 });
	}else if(getdata[0].ID == null || getdata[0].ID == ""){
	var dataobj={};
	dataobj.parameter = getdata[0].parameter;
	dataobj.equipmentID = reciveID.equipmentID;
	dataobj.departmentID = reciveID.departmentID;
		dataobj.startTime = getdata[0].startTime + "-1 00:00:00";
	dataobj.state = "未完成";
	$.ajax({
		url:'abilityCheckController/addAbilityCheck.do',
		data:dataobj,
		success:function(e){
			 $.globalMessenger().post({
		  		   message: "制定成功",//提示信息
		  		   type: 'success',//消息类型。error、info、success
		  		   hideAfter: 2,//多长时间消失
		  		   showCloseButton:true,//是否显示关闭按钮
		  		   hideOnNavigate: true //是否隐藏导航
		  		 });
			refresh();
		},
		});
	}
	else{
		 $.globalMessenger().post({
	  		   message: "请上传新增计划",//提示信息
	  		   type: 'info',//消息类型。error、info、success
	  		   hideAfter: 2,//多长时间消失
	  		   showCloseButton:true,//是否显示关闭按钮
	  		   hideOnNavigate: true //是否隐藏导航
	  		 });
	}
}
function deleteModal(){
	var getdata = $('#table').bootstrapTable('getSelections');
	if(getdata.length<=0){
		 $.globalMessenger().post({
	  		   message: "请选择数据",//提示信息
	  		   type: 'error',//消息类型。error、info、success
	  		   hideAfter: 2,//多长时间消失
	  		   showCloseButton:true,//是否显示关闭按钮
	  		   hideOnNavigate: true //是否隐藏导航
	  		 });
	}else{
		$('#delModal').modal('show');	
	}
}

function deletePlan(){
		var getdata = $('#table').bootstrapTable('getSelections');
		var Ids = new Array();
		for(var i = 0; i < getdata.length; i++){
			Ids[i] = getdata[i].ID;
		}
		$.ajax({
				traditional: true,
			  url:'abilityCheckController/deleteAbilityCheckID.do',
			  data:{"ID":Ids},
			  success:function(e){
				  refresh();
			  }
			});

	 $.globalMessenger().post({
		   message: "删除成功",//提示信息
		   type: 'success',//消息类型。error、info、success
		   hideAfter: 2,//多长时间消失
		   showCloseButton:true,//是否显示关闭按钮
		   hideOnNavigate: true //是否隐藏导航
		 });
	 $('#delModal').modal('hide');
	  refresh();
}

function editPlan(){
	var updata = $('#table').bootstrapTable('getSelections');
	var data={};

	if(updata.length<=0||updata.length > 1){
		 $.globalMessenger().post({
	  		   message: "请选择一条数据",//提示信息
	  		   type: 'error',//消息类型。error、info、success
	  		   hideAfter: 2,//多长时间消失
	  		   showCloseButton:true,//是否显示关闭按钮
	  		   hideOnNavigate: true //是否隐藏导航
	  		 });
	}

	else{
		data.ID = updata[0].ID;
		data.parameter = updata[0].parameter;
		data.equipmentID = reciveID.equipmentID;
		data.departmentID = reciveID.departmentID;
		data.startTime = updata[0].startTime+"-01 00:00:00";

			data.result = updata[0].result;
			data.state = updata[0].state;
			data.fileID = updata[0].fileID;
			
		$.ajax({
			  url:'abilityCheckController/updateAbilityCheck.do',
			  data:data,
			  success:function(e){
				  $.globalMessenger().post({
			  		   message: "修改成功",//提示信息
			  		   type: 'success',//消息类型。error、info、success
			  		   hideAfter: 2,//多长时间消失
			  		   showCloseButton:true,//是否显示关闭按钮
			  		   hideOnNavigate: true //是否隐藏导航
			  		 });
				  refresh();
			  }
			});
	}
}

function flevChecks(dom,val,type){
	if(type == "equipmentName"){
		dom.parentNode.innerHTML = dom.options[dom.selectedIndex].text;
		reciveID.equipmentID = val;
	}
	else if(type == "departmentName"){
		dom.parentNode.innerHTML = dom.options[dom.selectedIndex].text;
		reciveID.departmentID = val;
	}
	else{
	dom.parentNode.innerHTML = val;
	}
	switch(type){
	case "parameter": object.parameter = val;break;
	case "equipmentName": object.equipmentName = val;break;
	case "departmentName": object.departmentName = val;break;
	}
}


function find(){
	condition = "";
	var employeeID = $('#Organizer').val();
	var equipmentID = $('#Devicename').val();
	var startTime = $('#Executiontime').val();
	var endTime = $('#Executiontime2').val();
	var type = $('#Implement').val();
	if(employeeID != null && employeeID != ""){
		if(condition == "")
			condition += " employeeName = '" + employeeID + "'";
		else
		condition += " and employeeName = '" + employeeID + "'";
	}
	if(equipmentID != null && equipmentID != ""){
		if(condition == "")
			condition += " equipmentName = '" + equipmentID + "'";
		else
		condition += " and equipmentName = '" + equipmentID + "'";
	}
	if((startTime != null && startTime != "") && (endTime == "")){
		alert("111");
		startTime += "-01 00:00:00";
		if(condition == "")
			condition += " startTime = '" + startTime + "'";
		else
		condition += " and startTime = '" + startTime + "'";
	}
	 if((startTime == "") && (endTime != null && endTime != "")){
		endTime += "-01 00:00:00";
		if(condition == "")
			condition += " startTime = '" + endTime + "'";
		else
		condition += " and startTime = '" + endTime + "'";
	}
	 if((startTime != null && startTime != "") && (endTime != null && endTime != "")){
		startTime += "-01 00:00:00";
		endTime += "-01 00:00:00";
		if(condition == "")
			condition += " startTime   between '" + startTime + "' and '" + endTime + "'";
		else
		condition += " startTime   between '" + startTime + "' and '" + endTime + "'";
	}
	
	if(type != null && type != ""){
		if(condition == "")
			condition += " abilitycheck.type = '" + type + "'";
		else
		condition += " and abilitycheck.type = '" + type + "'";
	}
	$('#table').bootstrapTable('refresh', queryParams);
}

function checkTable(){
	var data = $('#table').bootstrapTable('getSelections');
	if(data.length <= 0||data.length > 1){
		 $.globalMessenger().post({
	  		   message: "请选择一条数据",//提示信息
	  		   type: 'error',//消息类型。error、info、success
	  		   hideAfter: 2,//多长时间消失
	  		   showCloseButton:true,//是否显示关闭按钮
	  		   hideOnNavigate: true //是否隐藏导航
	  		 });
	}else{
		$('#checkModal').modal('show');
	}
}

/*审查*/
function check(){
	var file = $('#file').val();
	var data = $('#table').bootstrapTable('getSelections');
	var checkdata = {};
	checkdata.ID = data[0].ID;
	var date = new Date();  
	checkdata.result = $('#check_Result').val();
	checkdata.type = $('#get_Type').val();
	
	if(file!=""){
	checkdata.fileID = ""+date.getFullYear()+date.getMonth()+date.getDate()+date.getHours()+date.getMinutes()+date.getSeconds()+date.getMilliseconds();
	$('#cID').val(checkdata.fileID);
	}
	checkdata.state = "已完成";
	var update = {};
	update.fileID = checkdata.fileID;
	update.equipmentID = data[0].equipmentID;
	update.startTime = data[0].startTime + "-1 00:00:00";
	if(file != null && file !=""){
	$.ajax({
			url:'abilityCheckController/updateAbilityCheckByCondition.do',
			data:update,
			success:function(e){
			}
	});
	}
	$.ajax({
		  url:'abilityCheckController/updateAbilityCheck.do',
		  data:checkdata,
		  success:function(e){
			  refresh();
				 $.globalMessenger().post({
			  		   message: "审核成功",//提示信息
			  		   type: 'success',//消息类型。error、info、success
			  		   hideAfter: 2,//多长时间消失
			  		   showCloseButton:true,//是否显示关闭按钮
			  		   hideOnNavigate: true //是否隐藏导航
			  		 });
		  }
		});

	if(file != "" && file != null){
	var form = document.forms[0];
		form.submit();
	}
	$('#file').val("");
	$('#checkModal').modal('hide');
	

}

/*文件下载*/
function download(){
	var getdata = $('#table').bootstrapTable('getSelections');
	if(getdata.length<=0||getdata.length > 1){
		 $.globalMessenger().post({
	  		   message: "请选择一条数据",//提示信息
	  		   type: 'error',//消息类型。error、info、success
	  		   hideAfter: 2,//多长时间消失
	  		   showCloseButton:true,//是否显示关闭按钮
	  		   hideOnNavigate: true //是否隐藏导航
	  		 });
	}else if(getdata[0].fileName == null || getdata[0].fileName == ""){
		 $.globalMessenger().post({
	  		   message: "该文档为空",//提示信息
	  		   type: 'error',//消息类型。error、info、success
	  		   hideAfter: 2,//多长时间消失
	  		   showCloseButton:true,//是否显示关闭按钮
	  		   hideOnNavigate: true //是否隐藏导航
	  		 });
	}
	else{
		window.location.href="fileOperateController/filedownload.do?ID="+getdata[0].fileID;
	}
}

$(".form_datetime").datetimepicker({
    minView: 'month',            //设置时间选择为年月日 去掉时分秒选择
    format:'yyyy-mm',
    todayBtn:"linked",
    autoclose:true,
    todayHighlight:true,
    startView:3,
    minView:3,
    language: 'zh-CN'
});

