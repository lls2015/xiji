// 请求数据时的额外参数
var param = {};

$(function() {
	initData();
});

//初始化数据
function initData(){
	$("#table").bootstrapTable({
		//height : 800,// 定义表格的高度
		striped : false,// 隔行变色效果
		pagination : true,// 在表格底部显示分页条
		pageSize : 5,// 页面数据条数
		pageNumber : 1,// 首页页码
		pageList : [ 5,10,15 ],// 设置可供选择的页面数据条数
		clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache : false,// 禁用 AJAX 数据缓存
		sortName : 'signTime',// 定义排序列
		sortOrder : 'desc',// 定义排序方式
		url:'contractController/getContractWithPaging2.do',//服务器数据的加载地址
		sidePagination:'server',//设置在哪里进行分页
		contentType:'application/json',//发送到服务器的数据编码类型
		dataType:'json',//服务器返回的数据类型
	    //queryParams:search,//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
		queryParams: function queryParams(params) { //请求服务器数据时,添加一些额外的参数
			param.limit = params.limit;// 页面大小
			param.offset = params.offset; // 偏移量
			param.sort = params.sort; // 排序列名
			param.order = params.order; // 排位方式
			param.contractCode = $.trim($('#schContractCode').val());
			param.employeeName = $.trim($('#schEmployeeName').val());
			param.companyName = $.trim($('#schCompanyName').val());
			param.startTime = $.trim($('#schStartTime').val());
			param.endTime = $.trim($('#schEndTime').val());
			param.oppositeMen = $.trim($('#schOppositeMen').val());
			param.linkPhone = $.trim($('#schLinkPhone').val());
			param.state = $.trim($('#schState').val());
			return param;
		}, //参数
	    queryParamsType: "limit", 
		selectItemName : '',// radio or checkbox 的字段名
		columns : [ {
			checkbox : true,
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width :'3%',// 宽度
			formatter : function(value, row, index) {
				 checkData(row);	 //验证数据合理性					
		    }
		},{
			field:'ID',//返回值名称
			title:'合同ID',//列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : '10%',// 宽度
			visible : false
		},{
			field:'fileID',//返回值名称
			title:'文件ID',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%',//宽度
			visible:false
		},{
			field:'contractCode',//返回值名称
			title:'合同编号',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'11%',//宽度
		},{
			field:'contractName',//返回值名称
			title:'合同名称',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'11%',//宽度
		},{
			field:'companyName',//返回值名称
			title:'甲方',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'11%',//宽度
		},{
			field:'oppositeMen',//返回值名称
			title:'甲方代表',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'6%',//宽度
		},{
			field:'linkPhone',//返回值名称
			title:'联系电话',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'8%',//宽度
		},{
			field:'employeeName',//返回值名称
			title:'乙方代表',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'6%',//宽度
		},{
			field:'signAddress',//返回值名称
			title:'签订地点',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'12%',//宽度
		},{
			field:'signTime',//返回值名称
			title:'签订时间',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'9%',//宽度
		},{
			field:'startTime',//返回值名称
			title:'履行开始时间',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'8%',//宽度
			visible:false
		},{
			field:'endTime',//返回值名称
			title:'履行结束时间',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'8%',//宽度
			visible:false
		},{
			field:'contractAmount',//返回值名称
			title:'合同金额',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'5%',//宽度
		},{
			field:'isClassified',//返回值名称
			title:'是否涉密',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'3%',//宽度
			visible:false
		},{
			field:'classifiedLevel',//返回值名称
			title:'涉密等级',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'3%',//宽度
			visible:false
		},{
			field:'state',//返回值名称
			title:'合同状态',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'10%',//宽度
		},{
			field:'viewpoint',//返回值名称
			title:'审核意见',//列名
			align:'center',//水平居中显示
			valign:'middle',//垂直居中显示
			width:'8%',//宽度
		}]//列配置项,详情请查看 列参数 表格
		/*事件*/
	});
}

//检查合同数据是否合理并处理
function checkData(dataObj) { // 后台数据字段为空就不会传上来
	if (!dataObj.hasOwnProperty("ID") || dataObj.ID == null || dataObj.ID.trim() == "" || dataObj.ID == undefined) {
		dataObj.ID = "";
	}
	if (!dataObj.hasOwnProperty("fileID") || dataObj.fileID == null || dataObj.fileID.trim() == "") {
		  dataObj.fileID = "";
	}
	if (!dataObj.hasOwnProperty("contractCode") || dataObj.contractCode == null || dataObj.contractCode == undefined ) {
		dataObj.contractCode = ""; //没有合同文件
	}
	if (!dataObj.hasOwnProperty("contractName") || dataObj.contractName == null || dataObj.contractName.trim() == "") {
		 dataObj.contractName = "";
	}
	if (!dataObj.hasOwnProperty("companyName") || dataObj.companyName == null || dataObj.companyName == undefined ) {
		dataObj.companyName = ""; //能编辑
	}
	if (!dataObj.hasOwnProperty("oppositeMen") || dataObj.oppositeMen == null || dataObj.oppositeMen.trim() == "") {
		dataObj.oppositeMen = "";
	}
	if (!dataObj.hasOwnProperty("linkPhone") || dataObj.linkPhone == null) {
		dataObj.linkPhone = "";
	}
	if (!dataObj.hasOwnProperty("employeeName") || dataObj.employeeName == null || dataObj.employeeName.trim() == "") {
		dataObj.employeeName = "";
	}
	if (!dataObj.hasOwnProperty("signAddress") || dataObj.signAddress == null || dataObj.signAddress.trim() == "") {
		dataObj.signAddress = "";
	}
	if (!dataObj.hasOwnProperty("signTime") || dataObj.signTime == null || dataObj.signTime.trim() == "") {
		dataObj.signTime = "";
	}
	if (!dataObj.hasOwnProperty("startTime") || dataObj.startTime == null || dataObj.startTime.trim() == "") {
		dataObj.startTime = "";
	}
	if (!dataObj.hasOwnProperty("endTime") || dataObj.endTime == null || dataObj.endTime.trim() == "") {
		dataObj.endTime = "";
	}
	if (!dataObj.hasOwnProperty("contractAmount") || dataObj.contractAmount == null) {
		dataObj.contractAmount = "0";
	}
	if (!dataObj.hasOwnProperty("isClassified") || dataObj.isClassified == null || dataObj.isClassified.trim() == "") {
		dataObj.isClassified = "";
	}
	if (!dataObj.hasOwnProperty("classifiedLevel") || dataObj.classifiedLevel == null || dataObj.classifiedLevel.trim() == "") {
		dataObj.classifiedLevel = "";
	}
	if (!dataObj.hasOwnProperty("state") || dataObj.state == null || dataObj.state.trim() == "") {
		dataObj.state = "";
	}
	if (!dataObj.hasOwnProperty("viewpoint") || dataObj.viewpoint == null || dataObj.viewpoint.trim() == "") {
		dataObj.viewpoint = "";
	}
}

/**
 * 搜索方法
 */
function searchContract(){
	initData();
	$('#table').bootstrapTable('refresh', null);
}

/* 刷新方法 */
function refresh(){
	window.location.href="module/jsp/contractManage/contractManage.jsp";
}
//新增成功后操作
function refrehContractTable() {
	$('#table').bootstrapTable('refresh', null);
}
/* 删除方法 */
function delData(){
	var data = $('#table').bootstrapTable('getSelections');
	if(data.length==0){
		swal("请至少选中一条数据");
		return;
	}
	var ID = "";
	var message = "将要删除合同：";
	for(var i=0; i<data.length; i++){
		ID += "ID = '" + data[i].ID + "' or ";
		message += data[i].companyName + " or ";
	}
	var ajaxParameter = {
		ids:ID.substring(0, (ID.length-3))	
	};
	swal({
		title: message.substring(0, (message.length-3)),
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "确定",
		closeOnConfirm: false
		},
		function(){	
			$.ajax({
			  url:'contractController/delContract.do',
			  type:"post",
			  data:ajaxParameter,
			  success:function(o){
				  if(o > 0){
					  swal("删除成功！");
					  setTimeout(refresh, 1000);
				  }else if(o == 0){
					  swal("删除失败！");
				  }else{
					  swal("出现未知错误，请重试！");
				  }
			  },
			  error : function() {
				return false;
			  }
		});
	});
}

/**
 * 下载文件
 * @param id
 */
function wdownFile(){
	var data = $('#table').bootstrapTable('getSelections');
	if(data.length==0 || data.length>1){
		swal("请选中一条数据");
		return;
	}
	var fileID = data[0].fileID;
	if (!fileID || typeof(fileID) == "undefined" || fileID.trim() == "") 
	{ 
		swal("合同文件ID为空！"); 
	}else {
		downOneFile(fileID);
	}
}

/* 打开新增弹出框 */
function showAddModal(){
	$('#add_contractName').val("");
	$('#add_companyName').val("");
	$('#add_address').val("");
	$('#add_oppositeMen').val("");
	$('#add_linkPhone').val("");
	$('#add_employeeName').val("");
	$('#add_signAddress').val("");
	$('#add_signTime').val("");
	$('#add_startTime').val("");
	$('#add_endTime').val("");
	$("#addModal").modal("show");
}


function classifiedLevelSth(){
	var classifiedLevel = $('#add_classifiedLevel').val();
	var isClassified = document.getElementsByName("isClassified");
	if(classifiedLevel == "3"){
		 isClassified[1].checked = "checked";
		 $('#add_classifiedLevel').val(classifiedLevel);
		$('#add_classifiedLevel #Level3').show();
		$('#add_classifiedLevel .Level3').hide();
	}else{
		
		 isClassified[0].checked = "checked";
		 $('#add_classifiedLevel').val(classifiedLevel);
		$('#add_classifiedLevel .Level3').show();
		$('#add_classifiedLevel #Level3').hide();
	}
}

/* 新增方法 */
function add(){
		var parame = {};
		var contractType = $("input[name='contractType']:checked").val();
		var contractName = $('#add_contractName').val();
		var companyName = $('#add_companyName').val();
		var companyID = $('#add_companyName').attr("name");
		var address = $('#add_address').val();
		var oppositeMen = $('#add_oppositeMen').val();
		var linkPhone = $('#add_linkPhone').val();
		var employeeName = $('#add_employeeName').val();
		var employeeID = $('#add_employeeName').attr("name");
		var signAddress = $('#add_signAddress').val();
		var signTime = $('#add_signTime').val();
		var startTime = $('#add_startTime').val();
		var endTime = $('#add_endTime').val();
		var isClassified = $("input[name='isClassified']:checked").val();
		var classifiedLevel = $('#add_classifiedLevel').val();
		if (!contractName || typeof(contractName) == "undefined" || contractName.trim() == "") 
		{ 
			swal("合同名称为空");
			return;
		}
		if (!companyName || typeof(companyName) == "undefined" || companyName.trim() == "") 
		{ 
			swal("公司名不能为空！");
			return;
		}
		if (!address || typeof(address) == "undefined" || address.trim() == "") 
		{ 
			swal("签约单位地址不能为空！");
			return;
		}
		if (!signAddress || typeof(signAddress) == "undefined" || signAddress.trim() == "") 
		{ 
			swal("签约地点不能为空！");
			return;
		}
		if (!oppositeMen || typeof(oppositeMen) == "undefined" || oppositeMen.trim() == "") 
		{ 
			swal("甲方法定代表人或代理人不能为空！");
			return;
		}
		if (!linkPhone || typeof(linkPhone) == "undefined" || linkPhone.trim() == "") 
		{ 
			swal("联系电话不能为空！");
			return;
		}
		else {
			var reg = /^1(3|4|5|7|8)\d{9}$/;
			 if (!reg.test(linkPhone)) {
				 swal("联系电话格式错误！");
				 return;
			 }
		}
		if (!employeeName || typeof(employeeName) == "undefined" || employeeName.trim() == "") 
		{ 
			swal("乙方法定代表人或代理人不能为空！");
			return;
		}
		if (!signTime || typeof(signTime) == "undefined" || signTime.trim() == "") 
		{ 
			swal("签订日期不能为空！");
			return;
		}
		if (!startTime || typeof(startTime) == "undefined" || startTime.trim() == "") 
		{ 
			swal("合同开始执行日期不能为空！");
			return;
		}
		if (!endTime || typeof(endTime) == "undefined" || endTime.trim() == "") 
		{ 
			swal("合同截至日期不能为空！"); 
			return;
		}
		if (endTime <= startTime) 
		{ 
			swal("时间先后顺序选择错误！"); 
			return;
		}
		if (!isClassified || typeof(isClassified) == "undefined" || isClassified.trim() == "") 
		{ 
			swal("是否保密不能为空！");
			return;
		}
		if (!classifiedLevel || typeof(classifiedLevel) == "undefined" || classifiedLevel.trim() == "") 
		{ 
			swal("保密等级不能为空！");
			return;
		}
		parame.contractName = contractName;
		parame.companyID = companyID;
		parame.companyName = companyName;
		parame.oppositeMen = oppositeMen;
		parame.linkPhone = linkPhone;
		parame.employeeID = employeeID;
		parame.employeeName = employeeName;
		parame.address = address;
		parame.signAddress = signAddress;
		parame.signTime = signTime;
		parame.startTime = startTime;
		parame.endTime = endTime;
		parame.isClassified = isClassified;
		parame.classifiedLevel = classifiedLevel;
		parame.contractType = contractType;
		if(companyID == "add_companyName"){
			swal({
				title: "公司不存在，是否新建合同并新增对应公司记录！",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#DD6B55",
				confirmButtonText: "确定",
				closeOnConfirm: false
				},
				function(){	
					$.ajax({
						  url:'contractController/addContract.do',
						  data:parame,
						  success:function(o){
							  switch (o) {
							  	case '-2':swal("新增公司失败！");
							  		break;
							  	case '-4':swal("公司名与公司ID不相符！");
						  			break;
							  	case '-6':swal("不存在该员工！");
						  			break;
							  	case '-8':swal("员工名与员工ID不相符！");
					  				break;
								case '1':$('#addModal').modal('hide');
									swal("新增成功！");
									setTimeout(refresh, 1000);
									break;
								case '0':swal("新增失败！");
									break;
								default:
									break;
							  }
						  }
					});
			});
		}else {
			$.ajax({
				  url:'contractController/addContract.do',
				  data:parame,
				  success:function(o){
					  switch (o) {

					  	case '-2':swal("新增公司失败！");
					  		break;
					  	case '-4':swal("公司名与公司ID不相符！");
				  			break;
					  	case '-6':swal("不存在该员工！");
				  			break;
					  	case '-8':swal("员工名与员工ID不相符！");
			  				break;
						case '1':$('#addModal').modal('hide');
							swal("新增成功！");
							setTimeout(refresh, 1000);
							break;
						case '0':swal("新增失败！");
							break;
						default:
							break;
					  }

				  }
			});
		}
}

/**
 * 新增信息触发相关提示信息的方法(add)
 */
function addShowMsg(){ 
	var name = $('#add_companyName').val().trim();
	if (!name || typeof(name) == "undefined" || name.trim() == "") 
	{ 
		$(".companyN").hide();
	}else {
		var parame = {};
		parame.companyName = name;
		
		$.ajax({  
		    url:'companyController/getCompanyMsg.do',// 跳转到 action
		    type:'post', 
		    data:parame,
		    dataType:'json',
		    success:function(data){  
		    	if (data) {
		    		var company,length;
		    		var myobj = JSON.parse(data);
		    		var htmlElement = "<ul>";//定义HTML
		    		company = $(".companyN");
		    		if(myobj.length == 0){
		    			htmlElement += "<li class='noDate'>没有查到对应公司，将新增对应数据</li>";
		    		}else{
		    			length = myobj.length;
		    		}
		    		
		    		for(var i=0; i < length; i++){
		    			htmlElement += "<li id='" + myobj[i].mobilePhone +"' value='" + myobj[i].companyName + "' name='" + myobj[i].linkMan + "' title='" + myobj[i].address + "' class='" + myobj[i].ID + "'>" + myobj[i].companyName + "</li>";
		    		}
		    		htmlElement += "</ul>";
		    		company.show();
		    		company.empty();
		    		company.append(htmlElement);
		    		addClick();
		    	}
		    }
		});
	}
}
/**
 * 改变信息触发相关提示信息的方法(add)
 */
function addGetEName(){
	var name = $('#add_employeeName').val().trim();
	if (!name || typeof(name) == "undefined" || name.trim() == "") 
	{
		$(".employeeN").hide();
	}else {
		var parame = {};
		parame.employeeName = name;
		
		$.ajax({  
		    url:'employeeController/getEmployeeName.do',// 跳转到 action  
		    type:'post',
		    data:parame,
		    dataType:'json',
		    success:function(data){  
		    	if (data) { 
		    		var employee,length;
		    		var myobj = JSON.parse(data);
		    		var htmlElement = "<ul>";//定义HTML    
		    		employee = $(".employeeName");
		    		if(myobj.length == 0){
		    			htmlElement += "<li class='noDate'>没有查到数据，请更改输入信息或新增对应数据</li>";
		    		}else{
		    			length = myobj.length;
		    		}
		    		for(var i=0; i < length; i++){
		    			htmlElement += "<li value='" + myobj[i].employeeName + "' name='" + myobj[i].employeeCode + "' class='" + myobj[i].ID + "'>" + myobj[i].employeeName + " | " + myobj[i].employeeCode + "</li>";
		    		}
		    		htmlElement += "</ul>"
		    		employee.show();
		    		employee.empty();
		    		employee.append(htmlElement);
		    		addClick();
			    }
			}
		});
	}
}

//点击事件(add)
function addClick(){ 
	//给input赋值
	$(".companyN ul li").click(function(){
		 var name = $(this).attr("value");
		 if (name == null || name.trim() == "" || name == "undefined") {
			 name = "add_companyName";
			 $('#add_companyName').attr({'name' : "" + name + ""});
			 $("#add_address").val("");
			 $('#add_address').attr("readOnly",false);
			 $("#add_oppositeMen").val("");
			 $("#add_linkPhone").val("");
		 }else{
			 $("#add_companyName").val(name);
			 var ID =  $(this).attr("class");
			 var mobilePhone =  $(this).attr("id");
			 var linkMan =  $(this).attr("name");
			 var address =  $(this).attr("title");
			 if (ID == null || ID.trim() == "" || ID == "undefined") {
				 ID = "";
				}
			 if (mobilePhone == null || mobilePhone.trim() == "" || mobilePhone == "undefined") {
				 mobilePhone = "";
				}
			 if (linkMan == null || linkMan.trim() == "" || linkMan == "undefined") {
				 linkMan = "";
				}
			 if (address == null || address.trim() == "" || address == "undefined") {
				 address = "";
				}
			 $('#add_companyName').attr({'name' : "" + ID + ""});
			 $('#add_companyName').attr({'value' : "" + name + ""});
			 $("#add_oppositeMen").val(linkMan);
			// $('#add_oppositeMen').attr("disabled",true);
			 $("#add_linkPhone").val(mobilePhone);
			 //$('#add_linkPhone').attr("disabled",true);
			 $("#add_address").val(address);
			 $('#add_address').attr("readOnly",true);
		 }
		 $(".companyN").hide();
	})
	
	//隐藏提示框
	$(".row1").click(function(){
		 $(".companyN").hide();
	})
	
	//给input赋值
	$(".employeeName ul li").click(function(){
		 var name =  $(this).attr("value");
		 if (name == null || name.trim() == "" || name == "undefined") {
			 name = "";
			}
		 $("#add_employeeName").val(name);
		 var ID =  $(this).attr("class");
		 if (ID == null || ID.trim() == "" || ID == "undefined") {
			 ID = "";
			}
		 $('#add_employeeName').attr({'name' : "" + ID + ""});
		 $('#add_employeeName').attr({'value' : "" + name + ""});
		 $(".employeeName").hide();
	})

	//隐藏提示框
	$(".row1").click(function(){
		 $(".employeeName").hide();
	})
}

/*
 * 修改是否保密响应
 */
function classifiedSth(){
	var isClassified = $('input[name="isClassified"]:checked').val();
	if(isClassified == "0"){
		$('#add_classifiedLevel').val("3");
		$('#add_classifiedLevel #Level3').show();
		$('#add_classifiedLevel .Level3').hide();
	}else if(isClassified == "1"){
		$('#add_classifiedLevel').val("0");
		$('#add_classifiedLevel .Level3').show();
		$('#add_classifiedLevel #Level3').hide();
	}
}

/**
 * 使页面跳转到查看合同页面(管理)
 */
function showContractM() {
	var data = $('#table').bootstrapTable('getSelections');
	if(data.length==0 || data.length>1){
		swal("请选中一条数据");
		return;
	}
	var ID = data[0].ID;
	if (!ID || typeof(ID) == "undefined" || ID.trim() == "") 
	{ 
		swal("合同编号不能为空！"); 
	}else {
		window.location.href="module/jsp/contractManage/contractView.jsp?ID="+ ID + "&type=0";
	}
}

/**
 * 使页面跳转到修改合同页面
 */
function EditContract(){
	var data = $('#table').bootstrapTable('getSelections');
	if(data.length==0 || data.length>1){
		swal("请选中一条数据");
		return;
	}
	if(data[0].state == "审核通过"){
		swal("该合同已经审核通过！");
		return;
	}
	var ID = data[0].ID;
	if (!ID || typeof(ID) == "undefined" || ID.trim() == "") 
	{ 
		swal("合同ID为空！"); 
	}else {
		window.location.href="module/jsp/contractManage/EditContract.jsp?ID="+ ID;
	}
}

$('.form_datetime_schTime').datetimepicker({
    language: 'zh-CN',
    weekStart: 1,
    todayBtn: 1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    minView: 2,
    forceParse: 0,
    format: 'yyyy.mm.dd'
});
$('.form_datetime_addTime').datetimepicker({
    language: 'zh-CN',
    weekStart: 1,
    todayBtn: 1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    minView: 2,
    forceParse: 0,
    pickerPosition: 'top-right',
    format: 'yyyy.mm.dd'
});
