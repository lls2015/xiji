package com.cqut.xiji.service.contract;

import java.io.File;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.context.annotation.Condition;
import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.company.Company;
import com.cqut.xiji.entity.contract.Contract;
import com.cqut.xiji.entity.employee.Employee;
import com.cqut.xiji.entity.equipment.Equipment;
import com.cqut.xiji.entity.fileInformation.FileInformation;
import com.cqut.xiji.entity.project.Project;
import com.cqut.xiji.entity.receiptlist.Receiptlist;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.service.company.CompanyService;
import com.cqut.xiji.service.fileEncrypt.IFileEncryptService;
import com.cqut.xiji.tool.util.EntityIDFactory;
import com.cqut.xiji.tool.util.PropertiesTool;
import com.cqut.xiji.tool.word.WordProcess;

@Service
public class ContractService extends SearchService implements IContractService{
	
	@Resource(name="entityDao")
	EntityDao entityDao;
	
	@Resource(name="searchDao")
	SearchDao searchDao;
	
	@Resource(name="baseEntityDao")
	BaseEntityDao baseEntityDao;
	
	@Resource(name = "fileEncryptService")
	IFileEncryptService fileEncryptservice;

	@Override
	public String getBaseEntityName() {
		return "contract";
	}

	@Override
	public String getBasePrimaryKey() {
		return "contract.ID";
	}

	/**
	 * 
	 * @description 初始化数据
	 * @author hujiajun
	 * @created 2016-10-22 下午5:23:08
	 * @param limit
	 * @param offset
	 * @param sort
	 * @param order
	 * @param contractName
	 * @param contractCode
	 * @param employeeName
	 * @param companyName
	 * @param startTime
	 * @param endTime
	 * @param oppositeMen
	 * @param linkPhone
	 * @param state
	 * @return
	 * @see com.cqut.xiji.service.contract.IContractService#getContractWithPaging2(int, int, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, int)
	 */
	@Override
	public Map<String, Object> getContractWithPaging2(int limit, int offset, String sort, String order, String contractName, String contractCode, String employeeName, String companyName, String startTime, String endTime, String oppositeMen, String linkPhone, int state) {
		// TODO Auto-generated method stub
		int index = limit;
		int pageNum = offset/limit ;
		String tableName = "contract";
		String[] properties = new String[]{
				"contract.fileID",
				"contract.ID",
				"contract.contractCode",
				"contract.contractName",
				"company.companyName",
				"contract.oppositeMen",
				"contract.linkPhone",
				"employee.employeeName",
				"contract.signAddress",
				"date_format(contract.signTime,'%Y.%m.%d') as signTime",
				"date_format(contract.startTime,'%Y.%m.%d') as startTime",
				"date_format(contract.endTime,'%Y.%m.%d') as endTime",
				"contract.contractAmount",
				"case when contract.isClassified = 0 then '否' "
				+ "when contract.isClassified = 1 then '是' end as isClassified",
				"case when contract.classifiedLevel = 0 then '秘密' "
				+ "when contract.classifiedLevel = 1 then '机密' "
				+ "when contract.classifiedLevel = 2 then '绝密' "
				+ "when contract.classifiedLevel = 3 then '无密级' end as classifiedLevel",
				"case when contract.state = 0 then '未上传合同文件' "
				+ "when contract.state = 1 then '未提交' "
				+ "when contract.state = 2 then '审核中' "
				+ "when contract.state = 3 then '驳回' "
				+ "when contract.state = 4 then '审核通过' "
				+ "when contract.state = 5 then '执行中' "
				+ "when contract.state = 6 then '执行完成' "
				+ "when contract.state = 7 then '异常终止' end as state",
				"contract.viewpoint"
		};
		String joinEntity = " LEFT JOIN company ON contract.companyID = company.ID " +
				" LEFT JOIN employee ON contract.employeeID = employee.ID ";
		String condition = " 1 = 1 "; 
		if (contractCode != null && !contractCode.isEmpty()) {
			condition += " and contractCode like '%" + contractCode+ "%'";
		}if (employeeName != null && !employeeName.isEmpty()) {
			condition += " and employeeName like '%" + employeeName + "%'";
		}if (companyName != null && !companyName.isEmpty()) {
			condition += " and companyName like '%" + companyName + "%'";
		}if (startTime != null && !startTime.isEmpty()) {
			condition += " and signTime >'" + startTime + "'";
		}if (endTime != null && !endTime.isEmpty()) {
			condition += " and signTime <'" + endTime + "'";
		}if (oppositeMen != null && !oppositeMen.isEmpty()) {
			condition += " and oppositeMen like '%" + oppositeMen + "%'";
		}if (linkPhone != null && !linkPhone.isEmpty()) {
			condition += " and linkPhone like '%" + linkPhone + "%'";
		}if (state >= 0 && state < 8 ) {
				condition += " and contract.state = '" + state + "'";
		}if (state == 9) {
			condition += " and contract.state != '0' and contract.state != '1' ";
		}
		List<Map<String, Object>> result = entityDao.searchWithpaging(
				properties, tableName, joinEntity, null, condition, null,sort,
				order, index, pageNum);
		int count = entityDao.searchForeign(properties, tableName, joinEntity, null, condition).size();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		return map;
	}
	
	@Override
	public Map<String, Object> getContractAuditWithPaging(int limit, int offset, String sort, String order, String contractName, String contractCode, String employeeName, String companyName, String startTime, String endTime, String oppositeMen, String linkPhone, int state) {
		// TODO Auto-generated method stub
		int index = limit;
		int pageNum = offset/limit ;
		String tableName = "contract";
		String[] properties = new String[]{
				"contract.fileID",
				"contract.ID",
				"contract.contractCode",
				"contract.contractName",
				"company.companyName",
				"contract.oppositeMen",
				"contract.linkPhone",
				"employee.employeeName",
				"contract.signAddress",
				"date_format(contract.signTime,'%Y.%m.%d') as signTime",
				"date_format(contract.startTime,'%Y.%m.%d') as startTime",
				"date_format(contract.endTime,'%Y.%m.%d') as endTime",
				"contract.contractAmount",
				"case when contract.isClassified = 0 then '否' "
				+ "when contract.isClassified = 1 then '是' end as isClassified",
				"case when contract.classifiedLevel = 0 then '秘密' "
				+ "when contract.classifiedLevel = 1 then '机密' "
				+ "when contract.classifiedLevel = 2 then '绝密' "
				+ "when contract.classifiedLevel = 3 then '无密级' end as classifiedLevel",
				"case when contract.state = 2 then '待审核' "
				+ "when contract.state = 3 then '驳回' "
				+ "when contract.state = 4 then '审核通过' "
				+ "when contract.state = 5 then '执行中' "
				+ "when contract.state = 6 then '执行完成' "
				+ "when contract.state = 7 then '异常终止' end as state",
				"contract.viewpoint"
		};
		String joinEntity = " LEFT JOIN company ON contract.companyID = company.ID " +
				" LEFT JOIN employee ON contract.employeeID = employee.ID ";
		String condition = " 1 = 1 "; 
		if (contractCode != null && !contractCode.isEmpty()) {
			condition += " and contractCode like '%" + contractCode+ "%'";
		}if (employeeName != null && !employeeName.isEmpty()) {
			condition += " and employeeName like '%" + employeeName + "%'";
		}if (companyName != null && !companyName.isEmpty()) {
			condition += " and companyName like '%" + companyName + "%'";
		}if (startTime != null && !startTime.isEmpty()) {
			condition += " and signTime >'" + startTime + "'";
		}if (endTime != null && !endTime.isEmpty()) {
			condition += " and signTime <'" + endTime + "'";
		}if (oppositeMen != null && !oppositeMen.isEmpty()) {
			condition += " and oppositeMen like '%" + oppositeMen + "%'";
		}if (linkPhone != null && !linkPhone.isEmpty()) {
			condition += " and linkPhone like '%" + linkPhone + "%'";
		}if (state > 0 && state < 8 ) {
				condition += " and contract.state = '" + state + "'";
		}if (state == 9) {
			condition += " and contract.state != '0' and contract.state != '1' ";
		}
		List<Map<String, Object>> result = entityDao.searchWithpaging(
				properties, tableName, joinEntity, null, condition, null,sort,
				order, index, pageNum);
		int count = entityDao.searchForeign(properties, tableName, joinEntity, null, condition).size();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		return map;
	}
	
	/**
	 * 
	 * @description 通过合同编号获得合同ID
	 * @author hujiajun
	 * @created 2016-10-21 下午4:47:01
	 * @param contractCode
	 * @return
	 * @see com.cqut.xiji.service.contract.IContractService#getIdByCode(java.lang.String)
	 */
	@Override
	public List<Map<String, Object>> getIdByCode(String contractCode) {
		// TODO Auto-generated method stub
		String[] properties = new String[] {"ID"};
		String condition = "contractCode=" + contractCode;
		List<Map<String, Object>> result = entityDao.findByCondition(properties, condition, Contract.class);
		return result;
	}
	
	@Override
	public List<Map<String, Object>> getContractByCode(String contractCode) {
		// TODO Auto-generated method stub
		String baseEntity = "contract";
		String[] properties = new String[]{
				"contract.ID",
				"contract.contractCode",
				"contract.contractName",
				"company.companyName",
				"contract.oppositeMen",
				"contract.linkPhone",
				"employee.employeeName",
				"contract.signAddress",
				"date_format(contract.signTime,'%Y.%m.%d') as signTime",
				"date_format(contract.startTime,'%Y.%m.%d') as startTime",
				"date_format(contract.endTime,'%Y.%m.%d') as endTime",
				"contract.contractAmount",
				"case when contract.isClassified = 0 then '否' "
				+ "when contract.isClassified = 1 then '是' end as isClassified",
				"case when contract.classifiedLevel = 0 then '秘密' "
				+ "when contract.classifiedLevel = 1 then '机密' "
				+ "when contract.classifiedLevel = 2 then '绝密' "
				+ "when contract.classifiedLevel = 3 then '无密级' end as classifiedLevel",
				"case when contract.state = 0 then '未上传合同文件' "
				+ "when contract.state = 1 then '未提交' "
				+ "when contract.state = 2 then '审核中' "
				+ "when contract.state = 3 then '驳回' "
				+ "when contract.state = 4 then '审核通过' "
				+ "when contract.state = 5 then '执行中' "
				+ "when contract.state = 6 then '执行完成' "
				+ "when contract.state = 7 then '异常终止' end as state"
		};
		String joinEntity = " LEFT JOIN company ON contract.companyID = company.ID " +
				" LEFT JOIN employee ON contract.employeeID = employee.ID ";
		String condition = "contract.contractCode=" + contractCode;
		List<Map<String, Object>> result = entityDao.searchForeign(properties,baseEntity,joinEntity,null,condition);
		System.out.println("result:"+result);
		return result;
	}
	
	@Override
	public List<Map<String, Object>> getContractByID(String ID) {
		// TODO Auto-generated method stub
		String baseEntity = "contract";
		String[] properties = new String[]{
				"contract.ID",
				"contract.contractCode",
				"contract.contractName",
				"contract.companyID",
				"contract.fileID",
				"company.companyName",
				"company.address",
				"contract.oppositeMen",
				"contract.linkPhone",
				"contract.employeeID",
				"employee.employeeName",
				"contract.signAddress",
				"date_format(contract.signTime,'%Y年%m月%d日') as signTime",
				"date_format(contract.startTime,'%Y年%m月%d日') as startTime",
				"date_format(contract.endTime,'%Y年%m月%d日') as endTime",
				"contract.contractAmount",
				"contract.isClassified",
				"contract.classifiedLevel",
				"case when contract.state = 0 then '未上传合同文件' "
				+ "when contract.state = 1 then '未提交' "
				+ "when contract.state = 2 then '审核中' "
				+ "when contract.state = 3 then '驳回' "
				+ "when contract.state = 4 then '审核通过' "
				+ "when contract.state = 5 then '执行中' "
				+ "when contract.state = 6 then '执行完成' "
				+ "when contract.state = 7 then '异常终止' end as state"
		};
		String joinEntity = " LEFT JOIN company ON contract.companyID = company.ID " +
				" LEFT JOIN employee ON contract.employeeID = employee.ID ";
		String condition = "contract.ID='" + ID + "'";
		List<Map<String, Object>> result = entityDao.searchForeign(properties,baseEntity,joinEntity,null,condition);
		System.out.println("getContractByID() result:"+result);
		return result;
	}
	
	/**
	 * 
	 * @description 新增合同
	 * @author hujiajun
	 * @created 2016-10-21 下午4:45:53
	 * @param contractName
	 * @param companyName
	 * @param oppositeMen
	 * @param linkPhone
	 * @param employeeName
	 * @param signAddress
	 * @param startTime
	 * @param signTime
	 * @param endTime
	 * @return
	 * @see com.cqut.xiji.service.contract.IContractService#addContract(java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String)
	 */
	@Override
	public int addContract(String contractName, String companyID, String companyName, String oppositeMen,String linkPhone,String employeeID, String employeeName, String address, String signAddress,String startTime,String signTime, String endTime,int isClassified,int classifiedLevel) {
		// TODO Auto-generated method stub
		String[] properties1 = new String[] {"ID"};
		String condition1 = " companyName = '" + companyName + "'";
		List<Map<String, Object>> result1 = entityDao.findByCondition(properties1, condition1, Company.class);
		if(result1.isEmpty()){
			System.out.println("不存在该公司名的公司,将新增对应公司记录");
			Company company = new Company();
			companyID = EntityIDFactory.createId();
			company.setID(companyID);
			company.setCompanyName(companyName);
			company.setLinkMan(oppositeMen);
			company.setMobilePhone(linkPhone);
			company.setAddress(address);
			company.setCreateTime(new Date());
			int result = entityDao.save(company);
			if(result <= 0){
				String position = "ID =" + companyID;
				entityDao.deleteByCondition(position,Company.class);
				return -2;
			}
		}else{
			int com = 0;
			String companyID1 = "";
			for (int i = 0; i < result1.size(); i++) {
				companyID1 = result1.get(i).get("ID").toString();
				if(companyID1.equals(companyID)){
					com = 1;
				}
			}
			if(com == 0){
				System.out.println("公司名与公司ID不相符");
				return -4;
			}
		}
		String[] properties2 = new String[] {"ID"};
		String condition2 = " employeeName = '" + employeeName + "'";
		List<Map<String, Object>> result2 = entityDao.findByCondition(properties2, condition2, Employee.class);
		if(result2.isEmpty()){
			System.out.println("不存在该员工");
			return -6;
		}else{
			String employeeID1 = result2.get(0).get("ID").toString();
			if(!employeeID1.equals(employeeID)){
				System.out.println("员工名与员工ID不相符");
				return -8;
			}
		}
		Contract contract = new Contract();
		String ID = EntityIDFactory.createId();
		String contractCode = "HT"+ID.substring(0, (ID.length()-3));
		System.out.println(contractCode);
		int state = 0;
		contract.setID(ID);
		contract.setContractCode(contractCode);
		contract.setContractName(contractName);
		contract.setCompanyID(companyID);
		contract.setOppositeMen(oppositeMen);
		contract.setLinkPhone(linkPhone);
		contract.setEmployeeID(employeeID);
		contract.setSignAddress(signAddress);
		contract.setIsClassified(isClassified);
		contract.setClassifiedLevel(classifiedLevel);
		contract.setState(state);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy.MM.dd");
		Date startTime1 = null;
		Date signTime1 = null;
		Date endTime1 = null;
		try {
			startTime1 = sdf.parse(startTime);
			signTime1 = sdf.parse(signTime);
			endTime1 = sdf.parse(endTime);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if (startTime1 != null && signTime1 != null && endTime1 != null) {
			contract.setStartTime(startTime1);
			contract.setSignTime(signTime1);
			contract.setEndTime(endTime1);
		}
		
		int result = entityDao.save(contract);
		if(result <= 0){
			String position = "ID =" + ID;
			entityDao.deleteByCondition(position,Contract.class);
		}else{
			Project project = new Project();
			String projectID = EntityIDFactory.createId();
			int projectState = 1;
			project.setID(projectID);
			project.setContractID(ID);
			project.setState(projectState);
			project.setCreateTime(new Date());
			project.setRemarks("新增合同时创建的项目");
			int aresult = entityDao.save(project);
		}
		return result;
	}
	
	@Override
	public int isContractFile(String ID){
		String[] properties1 = new String[] {"ID"};
		String condition1 = " fileinformation.belongtoID = '" + ID + "'";
		List<Map<String, Object>> result1 = entityDao.findByCondition(properties1, condition1, FileInformation.class);
		
		if(result1.isEmpty()){
			System.out.println("不存在合同模板文件");
			return 0;
		}
		return 1;
	}
	/**
	 * 
	 * @description 覆盖合同信息，生成新合同
	 * @author hujiajun
	 * @created 2017年3月16日 下午7:41:09
	 * @param ID
	 * @param contractCode
	 * @param contractName
	 * @param companyName
	 * @param oppositeMen
	 * @param linkPhone
	 * @param employeeName
	 * @param address
	 * @param signAddress
	 * @param startTime
	 * @param signTime
	 * @param endTime
	 * @return
	 * @see com.cqut.xiji.service.contract.IContractService#coverContractFile(java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String)
	 */
	public int coverContractFile(String ID, String fileID){
		String baseEntityf = "fileInformation";
		String[] propertiesf = new String[]{
				" fileInformation.ID AS fileID",
				"fileinformation.pathPassword", 
				"fileinformation.path",
				"fileinformation.filePassword"
		};
		String joinEntityf = " LEFT JOIN template ON template.fileID = fileInformation.ID ";
		String conditionf = " fileinformation.id = " + fileID;
		List<Map<String, Object>> result1 = entityDao.searchForeign(propertiesf,baseEntityf,joinEntityf,null,conditionf);
		
		if(result1.isEmpty()){
			System.out.println("不存在合同模板文件");
			return -3;
		}
		String fileInfoID = result1.get(0).get("fileID").toString();;
		String filePath = result1.get(0).get("path").toString();
		String pathPassword = result1.get(0).get("pathPassword").toString();
		
		String baseEntity1 = "contract";
		String[] properties1 = new String[]{
				"contract.ID",
				"contract.contractCode",
				"contract.contractName",
				"contract.companyID",
				"contract.fileID",
				"company.companyName",
				"company.address",
				"contract.oppositeMen",
				"contract.linkPhone",
				"contract.employeeID",
				"employee.employeeName",
				"contract.signAddress",
				"date_format(contract.signTime,'%Y年%m月%d日') as signTime",
				"date_format(contract.startTime,'%Y年%m月%d日') as startTime",
				"date_format(contract.endTime,'%Y年%m月%d日') as endTime",
				"contract.contractAmount",
				"contract.isClassified",
				"contract.classifiedLevel",
				"case when contract.state = 0 then '未上传合同文件' "
				+ "when contract.state = 1 then '未提交' "
				+ "when contract.state = 2 then '审核中' "
				+ "when contract.state = 3 then '驳回' "
				+ "when contract.state = 4 then '审核通过' "
				+ "when contract.state = 5 then '执行中' "
				+ "when contract.state = 6 then '执行完成' "
				+ "when contract.state = 7 then '异常终止' end as state"
		};
		String joinEntity1 = " LEFT JOIN company ON contract.companyID = company.ID " +
				" LEFT JOIN employee ON contract.employeeID = employee.ID ";
		String condition1 = "contract.ID='" + ID + "'";
		List<Map<String, Object>> contractA = entityDao.searchForeign(properties1,baseEntity1,joinEntity1,null,condition1);
		String contractCode = contractA.get(0).get("contractCode").toString();
		String contractName = contractA.get(0).get("contractName").toString();
		String companyName = contractA.get(0).get("companyName").toString();
		//String oppositeMen = contractA.get(0).get("oppositeMen").toString();
		//String linkPhone = contractA.get(0).get("linkPhone").toString();
		//String employeeName = contractA.get(0).get("employeeName").toString();
		//String address = contractA.get(0).get("address").toString();
		String contractAmount = contractA.get(0).get("contractAmount").toString();
		String signAddress = contractA.get(0).get("signAddress").toString();
		String startTime = contractA.get(0).get("startTime").toString();
		String signTime = contractA.get(0).get("signTime").toString();
		String endTime = contractA.get(0).get("endTime").toString();
		
		String contractItem = "";
		String baseEntiy = "contractFineItem";
		String[] properties = new String[] { 
			"contractFineItem.ID",
			"contractFineItem.fineItemCode",
			"testProject.nameCn",
			"testProject.nameEn",
			"department.departmentName",
			"contractFineItem.number",
			"contractFineItem.hour",
			"contractFineItem.price",
			"contractFineItem.money",
			"contractFineItem.calculateType"
			};
		String joinEntity = " LEFT JOIN testProject ON contractFineItem.testProjectID = testProject.ID " +
				" LEFT JOIN department ON contractFineItem.departmentID = department.ID ";
		
		String condition = "contractFineItem.contractID = " + ID;
		
		List<Map<String, Object>> result2 = entityDao.searchForeign(properties, baseEntiy, joinEntity, null, condition);
		
		String baseEntiy4 = "project";
		String[] properties4 = new String[] { 
			"contractID",
			"ID"
			};
		String joinEntity4 = "";
		
		String condition4 = "contractID = " + ID;
		
		List<Map<String, Object>> result4 = entityDao.searchForeign(properties4, baseEntiy4, joinEntity4, null, condition4);
		String projectID = result4.get(0).get("ID").toString();
		
		PropertiesTool pe = new PropertiesTool();
		
		filePath = fileEncryptservice.decryptPath(filePath, pathPassword);
		
		String path = pe.getSystemPram("filePath") + "\\" ;
		File file = new File(path + filePath);
		if(!file.exists()){
			System.out.println("合同模板文件被删除");
			return -4;
		}
		String cacheFilePath = pe.getSystemPram("cacheFilePath")+"\\";
		File dectoryName = new File(cacheFilePath);
		if(!dectoryName.exists()){
			dectoryName.mkdirs();
		}

		String newFileID = EntityIDFactory.createId();
		cacheFilePath += contractName + "_" + newFileID + ".docx";

		fileEncryptservice.decryptFile(path+filePath, cacheFilePath, fileInfoID);
		System.out.println("文件的路径1 ："+filePath);
		System.out.println("文件的路径2 ："+cacheFilePath);
		try {
			String relativePath = "项目文件" + "\\" + projectID + "\\"  + "合同文件" + "\\";

			path += relativePath ;

			System.out.println("文件的路径3 ："+path);
			File targetFile = new File(path);
			if(!targetFile.exists()){
				targetFile.mkdirs();
			}
			path +=  contractName + "_" + newFileID + ".docx";
			WordProcess wp = new WordProcess(false);
			wp.openDocument(cacheFilePath);
			
			if (contractCode != null)
				wp.replaceText("{合同编号}",contractCode.toString());
			if (contractName != null)
				wp.replaceText("{合同名称}",contractName.toString());
			if (companyName != null)
				wp.replaceText("{甲方}",companyName.toString());
			if (signAddress != null)
				wp.replaceText("{签订地点}",signAddress.toString());
			if (signTime != null)
				wp.replaceText("{签订日期}",signTime.toString());
			if (startTime != null)
				wp.replaceText("{履行开始日期}",startTime.toString());
			if (endTime != null)
				wp.replaceText("{履行结束日期}",endTime.toString());
			if (contractName != null)
				wp.replaceText("{合同名称}",contractName.toString());
			if (endTime != null)
				wp.replaceText("{结束日期}",endTime.toString());
			
			if(!result2.isEmpty()){
				String nameCn = "";
				String nameEn = "";
				String fineItemCode = "";
				//String departmentName = "";
				String calculateType = "";
				String money = "";
				String price = "";
				String number = "";
				String hour = "";
				wp.putTxtToCell(1, 2, 5,"总计"+contractAmount.toString());
				for(int i = 0; i < result2.size(); i++){
					nameCn = result2.get(i).get("nameCn").toString();
					nameEn = result2.get(i).get("nameEn").toString();
					fineItemCode = result2.get(i).get("fineItemCode").toString();
					//departmentName = result2.get(i).get("departmentName").toString();
					calculateType = result2.get(i).get("calculateType").toString();
					money = result2.get(i).get("money").toString();
					price = result2.get(i).get("price").toString();
					number = result2.get(i).get("number").toString();
					hour = result2.get(i).get("hour").toString();
					wp.addTableRow(1,2);
					wp.putTxtToCell(1, 2, 1,fineItemCode);
					wp.putTxtToCell(1, 2, 2,nameCn+"("+nameEn+")");
					if(calculateType.equals("0")){
						wp.putTxtToCell(1, 2, 3,price+"元/每次");
						wp.putTxtToCell(1, 2, 4,number+"次");
					}else if(calculateType.equals("1")){
						wp.putTxtToCell(1, 2, 3,price+"元/每小时");
						wp.putTxtToCell(1, 2, 4,hour+"小时");
					}
					wp.putTxtToCell(1, 2, 5,money);
				}
			}
			if (contractAmount != null)
				wp.replaceText("{合同金额}",contractAmount.toString());
			wp.save(cacheFilePath);
			wp.close();
			
			
			FileInformation fi = new FileInformation();
			fi.setID(newFileID);
			fi.setBelongtoID(ID);
			fi.setUploaderID("20170220xiji");
			fi.setFileName(contractName + ".docx");
			System.out.println("保存的相对路径是a: " + relativePath);
			relativePath += contractName + "_" + newFileID + ".docx";
			fi.setPath(relativePath);
			Date now = new Date(System.currentTimeMillis());
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			fi.setUploadTime(dateFormat.parse(dateFormat.format(now)));
			fi.setState(0);
			fi.setType(1);
			fi.setRemarks("系统生成");
		    baseEntityDao.save(fi);
		    updateContractFileID(ID);
		    updContractState(ID,1);
		    fileEncryptservice.encryptPath(relativePath, newFileID);
			fileEncryptservice.encryptFile(cacheFilePath,path,newFileID);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return 1;
	}
	/**
	 * 
	 * @description 删除合同
	 * @author hujiajun
	 * @created 2016-10-21 下午4:45:15
	 * @param ids
	 * @return
	 * @see com.cqut.xiji.service.contract.IContractService#delContract(java.lang.String)
	 */
	@Override
	public int delContract(String ids) {
		// TODO Auto-generated method stub
		if(ids == null || ids.isEmpty()){
			return 0;
		}
		int result = entityDao.deleteByCondition(ids, Contract.class);
		return result;
	}

	/**
	 * 
	 * @description 修改合同
	 * @author hujiajun
	 * @created 2016-10-21 下午4:44:16
	 * @param ID
	 * @param contractCode
	 * @param contractName
	 * @param companyID
	 * @param companyName
	 * @param address
	 * @param oppositeMen
	 * @param linkPhone
	 * @param employeeID
	 * @param employeeName
	 * @param signAddress
	 * @param startTime
	 * @param signTime
	 * @param endTime
	 * @param contractAmount
	 * @param isClassified
	 * @param classifiedLevel
	 * @param state
	 * @return
	 * @see com.cqut.xiji.service.contract.IContractService#updContract(java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, double, int, int, int)
	 */
	@Override
	public int updContract(String ID, String contractCode, String contractName,
			String companyID, String companyName, String address,
			String oppositeMen, String linkPhone, String employeeID,
			String employeeName, String signAddress, String startTime,
			String signTime, String endTime,
			int isClassified, int classifiedLevel) {
		// TODO Auto-generated method stub
		System.out.println("进入updContract");
		String[] properties1 = new String[] {"ID"};
		String condition1 = " companyName = '" + companyName + "'";
		List<Map<String, Object>> result1 = entityDao.findByCondition(properties1, condition1, Company.class);
		if(result1.isEmpty()){
			System.out.println("不存在该公司名的公司,将新增对应公司记录");
			Company company = new Company();
			companyID = EntityIDFactory.createId();
			company.setID(companyID);
			company.setCompanyName(companyName);
			company.setLinkMan(oppositeMen);
			company.setMobilePhone(linkPhone);
			company.setAddress(address);
			company.setCreateTime(new Date());
			int result = entityDao.save(company);
			if(result <= 0){
				String position = "ID =" + companyID;
				entityDao.deleteByCondition(position,Company.class);
				return -2;
			}
		}else{
			int com = 0;
			String companyID1 = "";
			for (int i = 0; i < result1.size(); i++) {
				companyID1 = result1.get(i).get("ID").toString();
				if(companyID1.equals(companyID)){
					com = 1;
				}
			}
			if(com == 0){
				System.out.println("公司名与公司ID不相符");
				return -4;
			}
		}
		String[] properties2 = new String[] {"ID"};
		String condition2 = " employeeName = '" + employeeName + "'";
		List<Map<String, Object>> result2 = entityDao.findByCondition(properties2, condition2, Employee.class);
		if(result2.isEmpty()){
			System.out.println("不存在该员工");
			return -6;
		}else{
			String employeeID1 = result2.get(0).get("ID").toString();
			if(!employeeID1.equals(employeeID)){
				System.out.println("员工名与员工ID不相符");
				return -8;
			}
		}
		Contract contract = entityDao.getByID(ID, Contract.class);
		contract.setContractCode(contractCode);
		contract.setContractName(contractName);
		contract.setCompanyID(companyID);
		contract.setOppositeMen(oppositeMen);
		contract.setLinkPhone(linkPhone);
		contract.setEmployeeID(employeeID);
		contract.setSignAddress(signAddress);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日");
		Date startTime1 = null;
		Date signTime1 = null;
		Date endTime1 = null;
		try {
			startTime1 = sdf.parse(startTime);
			signTime1 = sdf.parse(signTime);
			endTime1 = sdf.parse(endTime);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		if (startTime1 != null && signTime1 != null && endTime1 != null) {
			contract.setStartTime(startTime1);
			contract.setSignTime(signTime1);
			contract.setEndTime(endTime1);
		}
		//contract.setContractAmount(contractAmount);
		contract.setIsClassified(isClassified);
		contract.setClassifiedLevel(classifiedLevel);
		int result3 = entityDao.updatePropByID(contract,ID);
		return result3;
	}
	
	@Override
	public int updContractState(String ID,int state){
		if(state == 2){
			String[] properties1 = new String[] {"ID"};
			String condition1 = "fileinformation.state = '0' and fileinformation.belongtoID = '" + ID + "'";
			List<Map<String, Object>> result1 = entityDao.findByCondition(properties1, condition1, FileInformation.class);
			if(result1.isEmpty()){
				System.out.println("该合同没有合同文件");
				return -2;
			}
		}
		Contract contract = entityDao.getByID(ID, Contract.class);
		contract.setState(state);
		int result = entityDao.updatePropByID(contract,ID);
		return result;
	}
	
	@Override
	public int updateContractFileID(String contractID){
		int index = 1;
		int pageNum = 0;
		String sort = "fileInformation.uploadTime";
		String order = "desc";
		String tableName = "fileInformation";
		String[] properties = new String[]{
			"fileInformation.ID AS fileID",
		};
		
		String condition = " 1 = 1 and fileInformation.belongToID = " + contractID;
		List<Map<String, Object>> file  = entityDao.searchWithpaging(properties, tableName, null, null, condition, null, sort, order, index, pageNum);
		
		String fileID = "";
		for (Map<String, Object> m : file)  
	    {  
	      for (String k : m.keySet())  
	      {  
	    	  fileID = (String) m.get(k);  
	      }  
	    }
		
		Contract contract = entityDao.getByID(contractID, Contract.class);
		contract.setFileID(fileID);
		
		int result = entityDao.updatePropByID(contract,contractID);
		return result;
	}
	
	/**
	 * 
	 * @description 添加审核意见
	 * @author hujiajun
	 * @created 2016-10-22 下午5:24:02
	 * @param ID
	 * @param viewpoint
	 * @param state
	 * @return
	 * @see com.cqut.xiji.service.contract.IContractService#auditContract(java.lang.String, java.lang.String, int)
	 */
	@Override
	public int auditContract(String ID, String viewpoint, int state) {
		if (ID == null || ID.equals("")) {
			return -1;
		}
		Contract contract = entityDao.getByID(ID, Contract.class);
		if (contract == null)
			return -1;
		contract.setViewpoint(viewpoint);
		contract.setState(state);

		int result = entityDao.updatePropByID(contract,ID);
		return result;
	}
	
	
	/**
	 * 
	 * @description 初始化表格
	 * @author fei
	 * @created 2016-10-8 下午7:59:17
	 * @param limit
	 * @param offset
	 * @param order
	 * @param sort
	 * @param contract
	 * @return
	 * @see com.cqut.xiji.service.contract.IContractService#getContractWithPaging(int, int, java.lang.String, java.lang.String, java.lang.String)
	 */
	@Override
	public Map<String, Object> getContractWithPaging(int limit, int offset,String order,String sort,String contract,HttpSession session) {
		int index = limit;
		int pageNum = offset/limit ;
		String tablename = "contract";
		String[] properties = new String[]{
				"ID",
				"contractName",
				"DATE_FORMAT(signTime,'%Y-%m-%d') signTime"
		};
		String name = session.getAttribute("clientNo").toString();
		System.out.println(name);
		String acondition = "companyID in (SELECT  companyID from client WHERE clientNo = "+name+")";
		List<Map<String, Object>> result = entityDao.searchWithpaging(properties, tablename, null, null, acondition, null, sort, order, index, pageNum);
		int count = entityDao.getByCondition("1=1", Contract.class).size();
		String receive ="";
		for (Map<String, Object> m : result)  
	    { 
			receive ="<span class='tabledata'>" + m.get("signTime").toString() + "</span>";
	    	m.put("contractName", "<img class='point-image' src='Portal/images/point_triangle.png' />"+"<span class='tablevalue'>" + m.get("contractName")+"</span>" + receive);
	       
	    }
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows",result);
		System.out.println(map.toString());
		return map;
	}
	/**
	 * @description 获取公司信息
	 * @author hzz
	 * @date 2016年11月30日 中午12:35:44
	 */
	@Override
	public List<Map<String, Object>> getcompanyInforByCode(String contractCode) {
		// TODO Auto-generated method stub
		String tableName = "contract";
		String[] properties = new String[]{
				"company.companyName",	
				"company.ID as comID",
				"contract.ID as conID"
		};
		
		String[] foreignEntitys = new String[]{
				"company",
		};
		
		String condition = "contract.contractCode ='"+ contractCode+"'"
				+ " and contract.companyID = company.ID ";
	List<Map<String, Object>> result = entityDao.searchForeign(properties, tableName, null, foreignEntitys, condition);
	return result;
	}

	/**
	 * 获取合同ID、合同编码、合同名称、合同金额
	 * 
	 * @author zkl
	 * @return
	 */
	@Override
	public List<Map<String, Object>> getContract() {
		String[] properties = new String[] {

				"contract.ID as contractID", "contract.contractCode",
				"contract.contractName",
				"contract.contractAmount"
				};
				List<Map<String, Object>> result = entityDao.findByCondition(
						properties, " 1 = 1", Contract.class);

				System.out.println(Arrays.toString(result.toArray()));

			return result;
	}
    /**
     * 获取合同的标准号和标准名称
     * features or effect
     * @author wzj
     * @date 2017年5月20日 下午4:54:26
     *
     */
	@Override
	public String getStandardByContractID(String coID) {
		// TODO Auto-generated method stub
		String[] properties = new String[]{
			"standard.standardCode",
			"standard.standardName",
			"standard.ID",
		};
		String baseEntity = ""
		+" ( SELECT 	DISTINCT testProjectID "
		+" FROM contractfineitem  WHERE "
		+" contractfineitem.contractID = '"+coID+"'"
		+" 	) a "
		+" right JOIN teststandard ON teststandard.testProjectID = a.testProjectID "
		+" LEFT JOIN standard ON teststandard.standardID = standard.ID GROUP BY standard.ID";
		List<Map<String, Object>> list = searchDao.searchForeign(properties, baseEntity, null, null, null, null);
		String reString = "";
		Object temp = null;
		
		for (int i = 0; i < list.size(); i++) {
			 temp = list.get(i).get("standardCode") ;
			 System.out.println();
			reString+=  temp = temp != null ? temp.toString()+"(" : "";
			 System.out.println(reString);
			 temp = list.get(i).get("standardName");
			reString+=  temp  != null ? temp.toString()+")," : "";
			 System.out.println(reString);
			
		}
		if (reString == null || reString.equals("") ){
			return "";
		}
		else {
			return reString.substring(0, reString.length()-1);
		}
	}
}
