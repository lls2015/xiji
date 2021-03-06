package com.cqut.xiji.service.testProject;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

/**
 * 检测项目
 * 
 * @author zkl
 * 
 */


public interface ITestProjectService {

	Map<String, Object> getTestProjectWithPaging(String departmentID,String nameCnORnameEn,
			int limit, int offset, String order, String sort);

	
	String addTestProject(String NAMECN, String NAMEEN, String departmentID,
			String ENVIRONMENTALREQUIREMENTS, String standardID,
			String EQUIPMENTID, String describes, String remarks,String testTypeID);

	
	String delTestProject(String TestProjectIDs);

	
	List<Map<String, Object>> getDepartment();


	List<Map<String, Object>> getEquipment();


	List<Map<String, Object>> getStandard();


	String upTestProject(String testProjectID,String testStandardID,String testInstumentID,String testDepartmentID, String NAMECN, String NAMEEN,
			String departmentID, String ENVIRONMENTALREQUIREMENTS,
			String standardID, String EQUIPMENTID, String describes, String remarks,String testTypeID);


	Map<String, Object> getTestproWithPaging(int limit, int offset,
			String order, String sort, String contract,HttpSession session);

   /**
    * 获取检测项目列表(取字段)通过名字查询
    * @author wzj
    * @date 2016年11月19日 上午9:39:06
    * @return
    */
	List<Map<String, Object>> getTestProjectListByName(String matchName);


	/**
	 * @param testProjectName
	 * @return
	 */
	public List<Map<String, Object>> getTestProjectByName(String testProjectName);
	
	public List<Map<String, Object>> getTestProject(String testProjectNamae);

	public List<Map<String, Object>> getTestProjectById(String testProjectByID);


	public List<Map<String, Object>> getAllTestProject();

	public String editLaborHourInTaskAssign(String ID, double laborHour);

	List<Map<String, Object>> getTestType();
	
	Map<String, Object> getTestProjectManHour(String testTypeID, String nameCn,
			int limit, int offset, String order, String sort);


	List<Map<String, Object>> getAllTestType();


	String delTestProjectInManHour(String IDs);


	List<Map<String, Object>> getTestProjectByTestName(String testName);


	String updateManHour(String ID, String testTypeID, double laborHour);


}
