<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>样品领用记录管理</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->




<link rel="stylesheet" type="text/css" href="module/css/bootstrap.css">
<link rel="stylesheet" type="text/css" href="module/css/bootstrap-table.css">
<link rel="stylesheet" type="text/css" href="module/css/bootstrap-datetimepicker.css">
 <link rel="stylesheet" href="module/css/changeACE.css" />

<style type="text/css">
.fixed-table-container	.bs-checkbox {
	text-align: center;
    vertical-align: middle;
	}
	#form {
			width:100%;
			height:110px;
			float:left;
		}
		.item {
			width:30%;
			height:50%;
			float:left;
		}
		.item>input{
			display: inline-block;
			width:60%;
		}
		
		
		#search {
			float:left;
		}
	
		.employeeN{
	 	width:568px;
	 	display:none;
	 	border:1px solid #ccc;
	 	border-top:none;
	 	border-radius:3px;
	}
	.employeeN ul {
		width:567px;
		height:30px;
		border:none;
		margin:0;
		margin-left:-40px;
	}
	.employeeN ul li{
		width:567px;
		height:30px;
		line-height: 30px;
		list-style-type: none;
		text-indent: 12px;
	}
	.employeeN ul li:hover{
		background-color:#dcdcdc;
	}
	.employeeN1{
	 	width:568px;
	 	display:none;
	 	border:1px solid #ccc;
	 	border-top:none;
	 	border-radius:3px;
	}
	.employeeN1 ul {
		width:567px;
		height:30px;
		border:none;
		margin:0;
		margin-left:-40px;
	}
	.employeeN1 ul li{
		width:567px;
		height:30px;
		line-height: 30px;
		list-style-type: none;
		text-indent: 12px;
	}
	.employeeN1 ul li:hover{
		background-color:#dcdcdc;
	}
		
		
		

</style>
<script src="module/js/jquery-2.1.1.min.js"></script>
<script src="module/js/bootstrap.js"></script>
<script src="module/js/bootstrap-table.js"></script>
<script src="module/js/bootstrap-table-zh-CN.js"></script>
<script src="module/js/bootstrap-datetimepicker.js"></script>
<script src="module/js/bootstrap-datetimepicker.zh-CN.js"></script>
<script src="module/js/bootstrap-datetimepicker.fr.js"></script>



</head>

<body>
<div id="form">
		<div class="item">
			<label class="control-label">出厂编码:</label>
	  		<input class="form-control" id="linkfactoryCode">
  		</div>
  		<div class="item">
			<label class="control-label">样品名称:</label>
	  		<input class="form-control" id="linksampleName">
  		</div>
  		<div class="item">
			<label class="control-label">领样人:</label>
	  		<input class="form-control" id="linkgetMan">
  		</div>
  		<button type="button" id="search" class="btn btn-primary" onclick="find()">查询</button>
  		<!-- <div class="item">
			<label class="control-label">交接单号:</label>
	  		<input class="form-control" id="linkreceiptlistCode">
  		</div> -->
  		<div class="item">
			<label class="control-label">型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:</label>
	  		<input class="form-control" id="linkspecifications">
  		</div>
  		</div>
  		
  		
	<!-- <button type="button" id="search" class="btn btn-primary">查询</button>
 -->
	<!-- 功能按钮 -->
	<div class="input-group" style="float: right;">
		<button type="button" class="btn btn-primary glyphicon glyphicon-plus"
			data-toggle="modal" data-target="#addModal">&nbsp;新增</button>
		<button type="button" onclick="openModal()"
			class="btn btn-primary glyphicon glyphicon-edit">&nbsp;修改</button>
		<button id="del" onclick="lookData()" type="button"
			class="btn btn-primary glyphicon glyphicon-zoom-in">&nbsp;查看</button>
		<button id="refresh" onclick="refresh()" type="button"
			class="btn btn-primary glyphicon glyphicon-refresh">&nbsp;全部</button>
	</div>
	</div>

	<!-- 新增弹框 -->
	<div id="addModal" class="modal fade" role="dialog"
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">新增</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-xs-12 col-md-12">
							<h4>出厂编号：</h4>
							<input type="text"  id="add_factoryCode" name="factoryCode"
								class="form-control" aria-describedby="basic-addon1"  />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>样品名称：</h4>
							<input type="text" id="add_sampleName" name="sampleName"
								class="form-control" aria-describedby="basic-addon1" readOnly="true" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>样品型号：</h4>
							<input type="text" id="add_specifications" name="specifications" class="form-control"
								aria-describedby="basic-addon1" readOnly="true"/>
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>领样人：</h4>
							<input type="text" id="add_getMan" name="getMan" oninput="addGetEMName()" onpropertychange="addGetEMName()"  
							class="form-control" aria-describedby="basic-addon1" />
							<div class="employeeN">
	                   
                   </div>
						</div>
						
						<div class="col-xs-12 col-md-12">
							<h4>领样时间:</h4>
							<div class="input-group date form_datetime col-md-12">
								<input class="form-control" size="16" type="text" value=""
									id="add_getTime" name="getTime" disabled> <span
									class="input-group-addon"><span
									class="glyphicon glyphicon-remove"></span></span> <span
									class="input-group-addon"><span
									class="glyphicon glyphicon-th"></span></span>
							</div>
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>退样人：</h4>
							<input type="text" id="add_returnMan" name="returnMan" oninput="addGetEMName1()" onpropertychange="addGetEMName1()"
								class="form-control" aria-describedby="basic-addon1" />
								<div class="employeeN1">
	                   
                   </div>
						</div>
						
						<div class="col-xs-12 col-md-12">
							<h4>退样时间:</h4>
							<div class="input-group date form_datetime col-md-12">
								<input class="form-control" size="16" type="text" value=""
									id="add_returnTime" name="returnTime" disabled> <span
									class="input-group-addon"><span
									class="glyphicon glyphicon-remove"></span></span> <span
									class="input-group-addon"><span
									class="glyphicon glyphicon-th"></span></span>
							</div>
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>备注：</h4>
							<input type="text" id="add_remarks" name="remarks"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary" onclick="add()">新增</button>
				</div>
			</div>
		</div>
	</div>
	
	<div id="editModal" class="modal fade" role="dialog"
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">修改</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div style="display: none;" class="col-xs-12 col-md-12">
							<h4>流水号1：</h4>
							<input type="text" id="edit_ID" name="ID"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<div style="display: none;" class="col-xs-12 col-md-12">
						<h4>流水号2：</h4>
							<input type="text" id="edit_sampleID" name="sampleID"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>出厂编号：</h4>
							<input type="text" id="edit_factoryCode" name="factoryCode"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>样品名称：</h4>
							<input type="text" id="edit_sampleName" name="sampleName"
								class="form-control" aria-describedby="basic-addon1"readOnly="true" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>样品型号：</h4>
							<input type="text" id="edit_specifications" name="specifications"
								class="form-control" aria-describedby="basic-addon1"readOnly="true" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>领样人：</h4>
							<input type="text" id="edit_getMan" name="getMan" oninput="editGetEMName()" onpropertychange="editGetEMName()"  class="form-control"
								aria-describedby="basic-addon1" />
								<div class="employeeN">
	                   
                   </div>
						</div>
						
						<div class="col-xs-12 col-md-12">
							<h4>领样时间:</h4>
							<div class="input-group date form_datetime col-md-12">
								<input class="form-control" size="16" type="text" value=""
									id="edit_getTime" name="getTime" disabled> <span
									class="input-group-addon"><span
									class="glyphicon glyphicon-remove"></span></span> <span
									class="input-group-addon"><span
									class="glyphicon glyphicon-th"></span></span>
							</div>
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>退样人：</h4>
							<input type="text" id="edit_returnMan" name="returnMan" oninput="editGetEMName1()" onpropertychange="editGetEMName1()"
								class="form-control" aria-describedby="basic-addon1" />
								<div class="employeeN1">
	                   
                   </div>
						</div>
						
						<div class="col-xs-12 col-md-12">
							<h4>退样时间:</h4>
							<div class="input-group date form_datetime col-md-12">
								<input class="form-control" size="16" type="text" value=""
									id="edit_returnTime" name="returnTime" disabled> <span
									class="input-group-addon"><span
									class="glyphicon glyphicon-remove"></span></span> <span
									class="input-group-addon"><span
									class="glyphicon glyphicon-th"></span></span>
							</div>
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>备注：</h4>
							<input type="text" id="edit_remarks" name="remarks1"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-primary" onclick="edit()">修改</button>
				</div>
			</div>
		</div>
	</div>
	<!-- 查看弹框 -->
	<div id="lookModal" class="modal fade" role="dialog"
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">查看</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div style="display: none;" class="col-xs-12 col-md-12">
							<h4>流水号1：</h4>
							<input type="text" id="look_ID" name="ID" readonly="true"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<div style="display: none;" class="col-xs-12 col-md-12">
						<h4>流水号2：</h4>
							<input type="text" id="look_sampleInformationID" name="sampleInformationID"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>出厂编号：</h4>
							<input type="text" id="look_factoryCode" name="factoryCode" readonly="true"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>样品名称：</h4>
							<input type="text" id="look_sampleName" name="sampleName" readonly="true"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>样品型号：</h4>
							<input type="text" id="look_specifications" name="specifications" readonly="true"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>领样人：</h4>
							<input type="text" id="look_getMan" name="getMan" class="form-control" readonly="true"
								aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>领样时间:</h4>
							<input type="text" id="look_getTime" name="getTime" class="form-control" readonly="true"
								aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>退样人：</h4>
							<input type="text" id="look_returnMan" name="returnMan" readonly="true"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>退样时间:</h4>
							<input type="text" id="look_returnTime" name="returnTime" class="form-control" readonly="true"
								aria-describedby="basic-addon1" />
						</div>
						<div class="col-xs-12 col-md-12">
							<h4>备注：</h4>
							<input type="text" id="look_remarks" name="remarks"
								class="form-control" aria-describedby="basic-addon1" />
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				
				</div>
			</div>
		</div>
	</div>
	

	<!-- 表格 -->
	<div class="box">
	<table id="table">
	</table>
	</div>
</body>

<script src="module/js/sampleRecordManage/sampleRecordManage.js">
</script>
<script type="text/javascript">
$('.form_datetime').datetimepicker({
	language : 'zh-CN',
	weekStart : 1,
	todayBtn : 1,
	autoclose : 1,
	todayHighlight : 1,
	startView : 2,
	minView : 2,
	forceParse : 0,
	format : 'yyyy-mm-dd hh:ii:ss'
});

</script>

</html>
