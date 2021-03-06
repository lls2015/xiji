<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>西计实验室管理系统</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">

<link href="module/css/bootstrap.css" rel="stylesheet">
<link href="./module/css/bootstrap-table.css" rel="stylesheet"
	type="text/css">
<link href="module/css/sampleDesktop/sampleDesktop.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="module/css/commonSystem/commonSystem.css" />
<link rel="stylesheet" type="text/css" href="module/css/sweetalert.css">

<script src="module/js/jquery-2.1.1.min.js"></script>
<script src="module/js/bootstrap.js"></script>
<script type="text/javascript" src="./module/js/bootstrap-table.js"></script>
<script type="text/javascript" src="./module/js/bootstrap-table-zh-CN.js"></script>
<script src="module/js/commonTool.js"></script>
<script src="module/js/sampleDesktop/sampleDesktop.js"></script>
<script src="assets/js/autoPage.js"></script>
<script src="module/js/sweetalert.min.js"></script>



</head>

<body>
	<div id="container">
		<div class="leftArea">
			<div class="row">
				<span index="0">当前合同编号：</span> <span index="1">XJHJ-226-14-1013-PAT</span>
			</div>
			<div class="list-button">
				<div class="row">
					<div class="sample_button sample_button_1" onclick="viewRe()">
						<img src="module/img/receiptDesktop/lookRe.png">
						<p><a href="javascript:void(0)">查看交接单</a></p>
					</div>
					<div class="sample_button sample_button_2" onclick="takeSample()">
						<img src="module/img/receiptDesktop/getSample_icon.png">
						<p><a href="javascript:void(0)">领样</a></p>
					</div>
				
					<div class="sample_button sample_button_4" onclick="addRe()">
						<img src="module/img/receiptDesktop/newReceipt_icon.png">
						<p><a href="javascript:void(0)">新增交接单</a></p>
					</div>
					<div class="sample_button sample_button_5" onclick="viewTestreport()">
						<img src="module/img/receiptDesktop/checkReport_icon.png">
						<p><a href="javascript:void(0)">查看报告列表</a></p>
					</div>
					<div class="sample_button sample_button_6">
						<img src="module/img/receiptDesktop/printReport_icon.png">
						<p><a href="javascript:void(0)">打印报告</a></p>
					</div>
					<div class="sample_button sample_button_3" onclick="takeSample()">
						<img src="module/img/receiptDesktop/withDrawSample_icon.png">
						<p><a href="javascript:void(0)">退样</a></p>
					</div>
				</div>
				<div class="row">
				<div class="sample_button sample_button_1"  onclick="showTestProcess()">
						<img src="module/img/receiptDesktop/checkTestSchedule_icon.png">
						<p><a href="javascript:void(0)">查看检测进度</a></p>
					</div>
					<div class="sample_button sample_button_2" onclick="editRe()">
						<img src="module/img/receiptDesktop/updateReceipt_icon.png">
						<p><a href="javascript:void(0)">修改交接单</a></p>
					</div>
				<!-- 	<div class="sample_button sample_button_3">
						<img src="module/img/receiptDesktop/rebackSample_icon.png">
						<p><a href="javascript:void(0)">还样</a></p>
					</div> -->
					<div class="sample_button sample_button_4" onclick="sendTestreport()">
						<img src="module/img/receiptDesktop/sendReport_icon.png">
						<p><a href="module/jsp/testReportManage/testReportSendRecordManage.jsp">发报告</a></p>
					</div>
					
					<div class="sample_button sample_button_5" onclick="returnSample()">
						<img src="module/img/receiptDesktop/refundReceipt_icon.png">
						<p><a href="javascript:void(0)">退还交接单</a></p>
					</div>
					<div class="sample_button sample_button_6" onclick="addReNo()">
						<img src="module/img/receiptDesktop/noNewContract_icon.png">
						<p><a href="javascript:void(0)">无合同新增</a></p>
					</div>
				
				</div>
			</div>
			<div class="contractTable"></div>
		</div>
		
		<div class="RightArea">
			<div class="Right_content">
				<div class="row">
					<div class="col-xs-8 col-md-8 col-lg-8">
						<span index="0">当前文档名称：</span> <span index="1">XJHJ-226-14-1013-PAT</span>
					</div>
					<div class="col-xs-2 col-md-2 col-lg-2">
						<button class="btn btn-primary  ">查看</button>
					</div>
					<div class="col-xs-2 col-md-2 col-lg-2">
						<button class="btn btn-primary  ">下载</button>
					</div>
				</div>
				<div class="fileTable"></div>
				<div class="tidings">
					<div class="tidingHead">
					<ul>
						<li class=" selected ">提示信息</li>
						<li>已读信息</li>
					</ul>
					</div>
					<div class="tidingsTable"></div>
				</div>
			</div>
		</div>
		
		<!-- 新增弹框 -->
	<div id="testProcessModal" class="modal fade" role="dialog"
		aria-labelledby="gridSystemModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title">查看检测状态</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						 <div class="col-xs-2 col-lg-2 col-md-2"><img class="unit iconImg " index="0" src="./module/img/testProcess/SampleReceiving_icon.png"></div>	
						  
						  <div class="col-xs-1 col-lg-1 col-md-1"></div>
						 <div class="col-xs-1 col-lg-1 col-md-1"><img class="unit lineImg " index="0" src="./module/img/testProcess/arrowright_icon.png"></div>
						  <div class="col-xs-1 col-lg-1 col-md-1"></div>
						
						 <div class="col-xs-2 col-lg-2 col-md-2"><img class="unit iconImg " index="1" src="./module/img/testProcess/detectionscheme_icon.png"></div>
				        
				          <div class="col-xs-1 col-lg-1 col-md-1"></div>
				         <div class="col-xs-1 col-lg-1 col-md-1"><img class="unit lineImg " index="1" src="./module/img/testProcess/arrowright_icon.png"></div>
					      <div class="col-xs-1 col-lg-1 col-md-1"></div>
					    
					     <div class="col-xs-2 col-lg-2 col-md-2"><img class="unit iconImg " index="2" src="./module/img/testProcess/collarpattern_icon.png"></div>
						</div>
						<div class="row">
						  <div class="col-xs-11 col-lg-11 col-md-11"></div>
						  <div class="col-xs-1 col-lg-1 col-md-1 parentRightBottom"><img class="unit lineImg   lineImgBottom" index="2" src="./module/img/testProcess/arrowbottom_icon.png"></div>
					    </div>
					    <div class="row">
					     <div class="col-xs-2 col-lg-2 col-md-2"><img class="unit iconImg  " index="3" src="./module/img/testProcess/examine_icon.png"></div>
					      
					     <div class="col-xs-1 col-lg-1 col-md-1"></div>
					     <div class="col-xs-1 col-lg-1 col-md-1"><img class="unit lineImg  " index="3" src="./module/img/testProcess/arrowleft_icon.png"></div>
					     <div class="col-xs-1 col-lg-1 col-md-1"></div>
					    
					     <div class="col-xs-2 col-lg-2 col-md-2"><img class="unit iconImg  " index="4" src="./module/img/testProcess/produce_icon.png"></div>
					     
					     <div class="col-xs-1 col-lg-1 col-md-1"></div>
					     <div class="col-xs-1 col-lg-1 col-md-1"><img class="unit lineImg  " index="4" src="./module/img/testProcess/arrowleft_icon.png"></div>
					     <div class="col-xs-1 col-lg-1 col-md-1"></div> 
					     
					     <div class="col-xs-2 col-lg-2 col-md-2"><img class="unit iconImg  " index="5" src="./module/img/testProcess/check_icon.png"></div>
					    </div>
					     <div class="row">
					     <div class="col-xs-1 col-lg-1 col-md-1 parentLeftBottom"><img class="unit lineImg   lineImgBottom" index="5" src="./module/img/testProcess/arrowbottom_icon.png"></div>
					     </div>
					     <div class="row">
					     <div class="col-xs-2 col-lg-2 col-md-2"><img class="unit iconImg  " index="6" src="./module/img/testProcess/printf_icon.png"></div>

					</div>

				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary" onclick="add()">新增</button>
				</div>
			</div>
		</div>
	</div>
	</div>
</body>
</html>
