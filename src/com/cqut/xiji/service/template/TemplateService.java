package com.cqut.xiji.service.template;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.fileInformation.FileInformation;
import com.cqut.xiji.entity.standard.Standard;
import com.cqut.xiji.entity.template.Template;
import com.cqut.xiji.entity.testProject.TestProject;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.tool.util.EntityIDFactory;
import com.sun.star.util.Date;

@Service
public class TemplateService extends SearchService implements ITemplateService{

	@Resource(name="entityDao")
	EntityDao entityDao;

	@Resource(name="searchDao")
	SearchDao searchDao;

	@Resource(name="baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "template";
	}

	@Override
	public String getBasePrimaryKey() {
		return "template.ID";
	}

	@Override
	public Map<String, Object> getTemplateWithPage(String nAME,String STATE,
			String uPLOADTIME1, String uPLOADTIME2, int limit, int offset,
			String order, String sort) {
		int index = limit;
		int pageNum = offset / limit;

		String tableName = "template";
		String[] properties = new String[] {
				"template.ID",
				"template.NAME",
				"template.fileID",
				"fileInformation.remarks",
				"employee1.EMPLOYEENAME as REVIEWER",
				"employee2.EMPLOYEENAME as UPLOADER",
				"template.SUGGEST",
				"fileInformation.UPLOADERID",
				"case when template.TEMPLATETYPE = 0 then '合同文件模板'"
						+"when template.TEMPLATETYPE = 1 then '报告文件模板'"
						+"when template.TEMPLATETYPE = 2 then '交接单文件模板' end as TEMPLATETYPE",
				"DATE_FORMAT(template.createTime,'%Y-%m-%d %h:%s') as UPLOADTIME ",

				"case when template.STATE = 0 then '未提交'"
						+ "when template.STATE = 1 then '审核中'"
						+ "when template.STATE = 2 then '通过'"
						+ "when template.STATE = 3 then '驳回' end as STATE"

		};

		String condition = " 1 = 1  ";
		if(nAME != null && !nAME.equals("")){
			 condition+=" and template.NAME like '%"+nAME+"%'  ";
		}
		 System.out.println(nAME);
		if(STATE != null && !STATE.equals("")){
			 condition+=" and template.STATE = "+STATE+"  ";
		}
		if(uPLOADTIME1!=null && !uPLOADTIME1.equals("") && uPLOADTIME2!=null && !uPLOADTIME2.equals("")){
			condition += " and UPLOADTIME between '" + uPLOADTIME1
					+ "' and '" + uPLOADTIME2 +"'";
		}

		String joinEntity = "LEFT JOIN fileInformation ON template.fileID = fileInformation.ID  "
				+ "LEFT JOIN employee AS EMPLOYEE1 ON template.verifyMan = employee1.ID  "
				+ "LEFT JOIN employee AS EMPLOYEE2 ON fileInformation.uploaderID = employee2.ID ";

		System.out.println("--- "+order);
		System.out.println("-------------"+sort );
		List<Map<String, Object>> result = originalSearchWithpaging(properties,
				tableName, joinEntity, null, condition, false, null,
				sort,order, index, pageNum);
		int count = getForeignCountWithJoin(joinEntity, null, condition, false);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		return map;

	}
	@Override
	public Map<String, Object> getTemplateReviewWithPage(String nAME,String STATE,
			String uPLOADTIME1, String uPLOADTIME2, int limit, int offset,
			String order, String sort) {
		int index = limit;
		int pageNum = offset / limit;

		String tableName = "template";
		String[] properties = new String[] {
				"template.ID",
				"template.NAME",
				"template.fileID",
				"fileInformation.remarks",
				"employee1.EMPLOYEENAME as REVIEWER",
				"employee2.EMPLOYEENAME as UPLOADER",
				"template.SUGGEST",
				"fileInformation.UPLOADERID",
				"case when template.TEMPLATETYPE = 0 then '检测合同模板'"
						+"when template.TEMPLATETYPE = 1 then '报告模板'"
						+"when template.TEMPLATETYPE = 2 then '交接单模板'"
						+"when template.TEMPLATETYPE = 3 then '校准合同模板' end as TEMPLATETYPE",
				"DATE_FORMAT(template.createTime,'%Y-%m-%d %h:%s') as UPLOADTIME ",
				"case when template.STATE = 0 then '未提交'"
						+ "when template.STATE = 1 then '待审核'"
						+ "when template.STATE = 2 then '通过'"
						+ "when template.STATE = 3 then '驳回' end as STATE"

		};

		String condition = " 1 = 1  ";
		condition+="and template.STATE>0";
		if(nAME != null && !nAME.equals("")){
			 condition+=" and template.NAME like '%"+nAME+"%'  ";
		}
		 System.out.println(nAME);
		if(STATE != null && !STATE.equals("")){
			 condition+=" and template.STATE = "+STATE+"  ";
		}
		if(uPLOADTIME1!=null && !uPLOADTIME1.equals("") && uPLOADTIME2!=null && !uPLOADTIME2.equals("")){
			condition += " and UPLOADTIME between '" + uPLOADTIME1
					+ "' and '" + uPLOADTIME2 +"'";
		}

		String joinEntity = "LEFT JOIN fileInformation ON template.fileID = fileInformation.ID  "
				+ "LEFT JOIN employee AS EMPLOYEE1 ON template.verifyMan = employee1.ID  "
				+ "LEFT JOIN employee AS EMPLOYEE2 ON fileInformation.uploaderID = employee2.ID ";

		List<Map<String, Object>> result = originalSearchWithpaging(properties,
				tableName, joinEntity, null, condition, false, null,
				sort,order, index, pageNum);
		int count = getForeignCountWithJoin(joinEntity, null, condition, false);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);
		return map;

	}

	@Override
	public String delTemplate(String templateIDs) {

		int count = 0;
		if(templateIDs == null || templateIDs.isEmpty()){
			return 0+"";
		}
		String[] ids = templateIDs.split(",");
		for(String id:ids){
			
			Template template = entityDao.getByID(id, Template.class);
			FileInformation fileInformation = entityDao.getByID(template.getFileID(), FileInformation.class);
			if(fileInformation != null){
				fileInformation.setState(1);
				entityDao.updatePropByID(fileInformation, fileInformation.getID());	
			}
			else{
				System.out.println("没有对应的ID");
				count++;
			}
		}
		int result = entityDao.deleteEntities(ids,Template.class);
		return (count > 0)? "-"+count:result+""; 
	}

	@Override
	public String addTemplate(String TemplateName, String TemplateRemarks,
			String TemplateType, String TestProjectIDs,String fileID,String uploaderID) {

		int result = 0;

		Template template = new Template();


		template.setID(EntityIDFactory.createId()); // 生成ID
		template.setName(TemplateName);
		template.setFileID(fileID);
		template.setTemplateType(Integer.parseInt(TemplateType));
		template.setRemarks(TemplateRemarks);
		template.setState(0);//信上传的模板都是默认待审核（0）
		
		
		

		// 文件所属ID
		FileInformation fileInformation = entityDao.getByID(fileID, FileInformation.class);
		if(fileInformation == null){
			return -1 + "" ;
		}
		template.setCreateTime(fileInformation.getUploadTime());;
		fileInformation.setRemarks(TemplateRemarks);
		fileInformation.setBelongtoID(template.getID());
		fileInformation.setUploaderID(uploaderID);

		//存入DB
		result += entityDao.save(template);
		result += entityDao.updatePropByID(fileInformation, fileID);

		//当只是报告文件模板时有值
		
		int count =0;
		
		if(TestProjectIDs != null && TestProjectIDs != ""){
			String[] ids = TestProjectIDs.replaceAll(" ", "").split(",");
			for(String id : ids){
				TestProject project = entityDao.getByID(id,TestProject.class);
				if(project == null){
					count++;
					continue;
				}
				project.setTemplateID(template.getID());
				result += entityDao.updatePropByID(project, id);
			}
		}
		return  result +"";
	}
	@Override
	public String updNoPasstemplate(String ID,String SUGGEST,String verifyMan){
		Template template=entityDao.getByID(ID, Template.class);
		template.setState(3);
		template.setSuggest(SUGGEST);
		template.setVerifyMan(verifyMan);
		int result = entityDao.updatePropByID(template, ID);
		return result+"";

	}
	@Override
	public String updPasstemplate(String ID,String SUGGEST,String verifyMan){
		Template template=entityDao.getByID(ID, Template.class);
		template.setState(2);
		template.setSuggest(SUGGEST);
		template.setVerifyMan(verifyMan);
		int result = entityDao.updatePropByID(template, ID);
		return result+"";

	}

	@Override
	public String upSubmitTemplate(String templateIDs) {
		
		int result = 0;
		if(templateIDs == null || templateIDs == ""){
			return "-1";
		}
		String[] ids = templateIDs.split(",");
		
		for(String id :ids){
			Template template = entityDao.getByID(id, Template.class);
			if(template.getState() == 0){
				template.setState(1);
				result += entityDao.updatePropByID(template, id);
			}
			else{
				System.out.println("当前状态不可更改");
			}
		}
		return result + "";
	}

}
