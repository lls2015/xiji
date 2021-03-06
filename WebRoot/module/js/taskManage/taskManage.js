//请求数据时的额外参数
var param = {};

// 初始化数据
$(function() {
	initData();
	initAuditPerson();
	bindProjectChange();
});

// 初始化页面数据
function initData() {
	$("#table")
			.bootstrapTable(
					{
						striped : false,// 隔行变色效果
						pagination : true,// 在表格底部显示分页条
						pageSize : 10,// 页面数据条数
						pageNumber : 1,// 首页页码
						pageList : [ 10, 20 ],// 设置可供选择的页面数据条数
						clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和
												// checkbox
						cache : false,// 禁用 AJAX 数据缓存
						sortName : 'c.completeTime',// 定义排序列
						sortOrder : 'DESC',// 定义排序方式
						url : 'taskController/getTaskWithPaging.do',// 服务器数据的加载地址
						sidePagination : 'server',// 设置在哪里进行分页
						contentType : 'application/json',// 发送到服务器的数据编码类型
						dataType : 'json',// 服务器返回的数据类型
						queryParams : function queryParams(params) { // 请求服务器数据时,添加一些额外的参数
							param.limit = params.limit;// 页面大小
							param.offset = params.offset; // 偏移量
							param.sort = params.sort; // 排序列名
							param.order = params.order; // 排位方式
							return param;
						},
						queryParamsType : "limit",
						selectItemName : '',// radio or checkbox 的字段名
						columns : [
								{
									checkbox : true,
									width : "1%",// 宽度
									formatter : function(value, row, index) {
										checkData(row); // 验证数据合理性
									}
								},
								{
									field : '',
									title : '序号',
									width : '1%',
									align : 'center',
									valign : 'middle',
									formatter : function(value, row, index) {
										return index + 1;
									}
								},
								{
									field : 'ID',// 返回值名称
									title : '任务ID',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : "10%",// 宽度
									visible : false
								},
								{
									field : 'receiptlistCode',// 返回值名称
									title : '交接单号',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : "9%",// 宽度

								},
								{
									field : 'sampleName',// 返回值名称
									title : '样品名称',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : "10%",// 宽度
								},
								{
									field : 'testProjectName',// 返回值名称
									title : '检测项目',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : "10%",// 宽度
								},
								{
									field : 'detecotor',// 返回值名称
									title : '检测人',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : "10%"// 宽度
								},
								{
									field : 'custodian',// 返回值名称
									title : '监督人',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : "10%"// 宽度
								},
								{
									field : 'levelTwo',// 返回值名称
									title : '审核人',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : "10%"// 宽度
								},
								{
									field : 'detectstate',// 返回值名称
									title : '状态',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : "10%",// 宽度
								},
								{
									field : 'startTime',// 返回值名称
									title : '开始时间',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : "10%"// 宽度
								},
								{
									field : 'completeTime',// 返回值名称
									title : '结束时间',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : "10%"// 宽度
								},
								{
									title : '操作',// 列名
									align : 'center',// 水平居中显示
									valign : 'middle',// 垂直居中显示
									width : "10%",// 宽度
									formatter : function(value, row, index) {
										return "<img src ='module/img/edit_icon.png'  onclick='taskView(\""
												+ row.ID
												+ "\")'  title='编辑任务' style='cursor:pointer;'></img> "
												+ "<img src ='module/img/point.png'  onclick='submitReport(\""
												+ row.ID
												+ "\")'  title='提交审核' style='cursor:pointer;width:18px;height:18px;'></img> "
												+ "<img src ='module/img/roleName_icon.png'  onclick='taskAssign(\""
												+ row.ID
												+ "\",\""
												+ row.sampleName
												+ "\")'  title='指定审核人' style='cursor:pointer;'></img> ";
									}
								} ]
					});
}

// 初始化审核人的数据
function initAuditPerson() {
	$('#taskAuditPersonTable').bootstrapTable({
		striped : false,// 隔行变色效果
		pagination : true,// 在表格底部显示分页条
		pageSize : 5,// 页面数据条数
		pageList : [ 5, 10 ],
		pageNumber : 1,// 首页页码
		clickToSelect : true,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
		cache : false,// 禁用 AJAX 数据缓存
		sortName : 'employeeLevel',// 定义排序列
		sortOrder : 'ASC',// 定义排序方式
		url : 'taskController/getTaskAuditPersonWithPaging.do',// 服务器数据的加载地址
		sidePagination : 'server',// 设置在哪里进行分页
		contentType : 'application/json',// 发送到服务器的数据编码类型
		dataType : 'json',// 服务器返回的数据类型
		queryParamsType : "limit",
		selectItemName : '',// radio or checkbox 的字段名
		columns : [ {
			checkbox : true,
			width : "1%"// 宽度
		}, {
			field : '',
			title : '序号',
			width : '1%',
			align : 'center',
			valign : 'middle',
			formatter : function(value, row, index) {
				return index + 1;
			}
		}, {
			field : 'ID',// 返回值名称
			title : '员工ID',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "10%",// 宽度
			visible : false
		}, {
			field : 'employeeCode',// 返回值名称
			title : '员工编号',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "9%",// 宽度
		}, {
			field : 'employeeName',// 返回值名称
			title : '员工姓名',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "10%",// 宽度
		}, {
			field : 'sex',// 返回值名称
			title : '性别',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "10%",// 宽度
		}, {
			field : 'roleName',// 返回值名称
			title : '角色',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "10%",// 宽度
		}, {
			field : 'employeeLevel',// 返回值名称
			title : '能力等级',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "10%",// 宽度
		}, {
			field : 'employeeState',// 返回值名称
			title : '状态',// 列名
			align : 'center',// 水平居中显示
			valign : 'middle',// 垂直居中显示
			width : "10%",// 宽度
		} ]
	});
}

// 检测项目搜索框
function bindProjectChange() {
	var htmlElement = "";
	$('#testItem').on('input propertychange', function() {
		var testItem = $.trim($('#testItem').val());
		if (testItem != null && testItem != undefined && testItem != '') {
			$.post('testProjectController/getTestProject.do', 
			{
				testProjectNamae : $.trim($('#testItem').val())
			},
			function(result) {
				if (result != null && result != '') {
					result = JSON.parse(result);
					htmlElement = "";
					for ( var i = 0; i < result.length; i++) {
						htmlElement +="<li>"+
						result[i].testProjectName+
						"</li>";
					}
					$('#dropDownList').text('');
					$('#dropDownList').append(htmlElement);
					$('#dropDownList li').on('click',function(){
						$('#testItem').val(($(this).text()));
						$('#dropDownList').css('display', 'none');
					});
				}
			});
			$('#dropDownList').css('display', 'block');
		}
		else{
			$('#dropDownList').css('display', 'none');
		}
	});
}

// 查询
function search() {
	var additionalCondition = {
		receiptlistCode : $.trim($('#schFactoryCode').val()),
		testProjectName : $.trim($('#testItem').val()),
		sampleName : $.trim($('#sampleName').val()),
		beginTime : $.trim($('#beginTime').val()),
		endTime : $.trim($('#endTime').val()),
		testProcess : $.trim($('#testProcess').val()),
	};
	$('#table').bootstrapTable('refresh', {
		silent : true,
		url : "taskController/getTaskWithPaging.do",
		query : additionalCondition
	});
}

// 查看任务
function taskView() {
	var taskID = arguments[0];
	if (taskID != null && taskID != undefined && taskID != '') {
		window.location.href = "module/jsp/taskManage/taskView.jsp?taskID="
				+ taskID;
	}
}

// 展示审核人弹窗
function taskAssign() {
	var taskID = arguments[0];
	var sampleCodeName = arguments[1];
	$('#taskID').text(taskID);
	$('#sampleCodeName').text('样品名称: ' + sampleCodeName);
	$('#taskAuditPerson').modal('show');
}

// 提交审核
function submitReport(){
	var taskID = arguments[0];
	if(confirm("是否提交审核?")){
		$.post("taskController/submitReport.do",
		{
			taskID : taskID
		},
		function(result) {
			if (result == true || result == "true") {
				$.post("testReportController/getReportInfo.do",
				{
					taskID : taskID
				},
				function(result) {
					result = JSON.parse(result);
					if(result != null && result != "null" && result != ""){
						$.post("messageController/addReportAudiPersontMessage.do",
						{
							fileName : result[0].fileName
						},function(messageID) {
							messageID = JSON.parse(messageID);
							$.post("messageNoticeController/addReportAuditMessageNotice.do",
							{
								messageID : messageID,
								employeeID : result[0].levelTwo
							});
						});
						}
					});
					refresh();
					alert("提交审核成功");
				} else {
					refresh();
					alert("当前状态不能提交审核!请核对报告审核状态或者指定审核人");
				}
			});
	}
}

// 指定审核人
function setAuditPerson() {
	var rows = $('#taskAuditPersonTable').bootstrapTable('getSelections');
	if (rows.length == 0) {
		alert("请选择相应的审核人");
		return;
	}
	if (rows.length > 1) {
		alert('请选择一条数据');
		return;
	} else {
		var employeeID = rows[0].ID;
		$.post('taskController/updateTaskAuditPerson.do', 
		{
			taskID : $('#taskID').text(),
			employeeID : employeeID
		}, 
		function(result) {
			if (result == true || result == 'true') {
				refresh();
				alert('设置审核人成功');
			} else {
				refresh();
				alert('设置失败');
			}
		});
		$('#taskAuditPerson').modal('hide');
	}
}

// 刷新页面
function refresh() {
	var additionalCondition = {
		receiptlistCode : "",
		testProjectName : "",
		sampleName : "",
		beginTime : "",
		endTime : "",
		testProcess : "",
	};
	$('#table').bootstrapTable('refresh', {
		silent : true,
		url : "taskController/getTaskWithPaging.do",
		query : additionalCondition
	});
}

//检查数据合理性
function checkData(dataObj) {
	if (!dataObj.hasOwnProperty("ID") || dataObj.ID == null
			|| dataObj.ID.trim() == "NULL") {
		dataObj.ID = "";
	}
	if (!dataObj.hasOwnProperty("startTime") || dataObj.startTime == null
			|| dataObj.startTime.trim() == "NULL") {
		dataObj.startTime = "";
	}
	if (!dataObj.hasOwnProperty("completeTime") || dataObj.completeTime == null
			|| dataObj.completeTime == undefined) {
		dataObj.completeTime = "";
	}
	if (!dataObj.hasOwnProperty("detectstate") || dataObj.detectstate == null
			|| dataObj.detectstate.trim() == "NULL") {
		dataObj.detectstate = "";
	}
	if (!dataObj.hasOwnProperty("receiptlistCode")
			|| dataObj.receiptlistCode == null
			|| dataObj.receiptlistCode == undefined) {
		dataObj.receiptlistCode = "";
	}
	if (!dataObj.hasOwnProperty("testProjectName")
			|| dataObj.testProjectName == null
			|| dataObj.testProjectName == undefined) {
		dataObj.testProjectName = "";
	}
	if (!dataObj.hasOwnProperty("sampleName") || dataObj.sampleName == null
			|| dataObj.sampleName.trim() == "NULL") {
		dataObj.sampleName = "";
	}
	if (!dataObj.hasOwnProperty("detector") || dataObj.detector == null
			|| dataObj.detector.trim() == "NULL") {
		dataObj.detector = "";
	}
	if (!dataObj.hasOwnProperty("custodian") || dataObj.custodian == null
			|| dataObj.custodian.trim() == "NULL") {
		dataObj.custodian = "";
	}
	if (!dataObj.hasOwnProperty("levelTwo") || dataObj.levelTwo == null
			|| dataObj.levelTwo.trim() == "NULL") {
		dataObj.levelTwo = "";
	}
}