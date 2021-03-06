package com.cqut.xiji.entity.employee;

import java.util.Date;

import com.cqut.xiji.entity.base.Entity;
import com.cqut.xiji.service.tableCreator.ID;

public class Employee extends Entity{
	
	@ID
	private String ID;
	private String employeeCode;
	private String loginName;
	private String password;
	private String employeeName;
	private int sex;
	private String phoneNumber;
	private String email;
	private String address;
	private String roleID;
	private String departmentID;
	private int level;
	private Date createTime;
	private int state;
	private String dutyID;
	private int permission;
	private String signature;
	private String stamp;
	private Date birthday;
	private int jobTitle;
	private int eduLevel;
	private String graduate;
	private String IDCard;
	private String headCrop;
	
	public String getHeadCrop() {
		return headCrop;
	}

	public void setHeadCrop(String headCrop) {
		this.headCrop = headCrop;
	}

	public String getIDCard() {
		return IDCard;
	}

	public void setIDCard(String iDCard) {
		IDCard = iDCard;
	}

	public String getSignature() {
		return signature;
	}

	public void setSignature(String signature) {
		this.signature = signature;
	}

	public String getStamp() {
		return stamp;
	}

	public void setStamp(String stamp) {
		this.stamp = stamp;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public int getJobTitle() {
		return jobTitle;
	}

	public void setJobTitle(int jobTitle) {
		this.jobTitle = jobTitle;
	}

	public int getEduLevel() {
		return eduLevel;
	}

	public void setEduLevel(int eduLevel) {
		this.eduLevel = eduLevel;
	}

	public String getGraduate() {
		return graduate;
	}

	public void setGraduate(String graduate) {
		this.graduate = graduate;
	}

	public String getID() {
		return ID;
	}	
	
	public void setID(String ID) {
		this.ID = ID;
	}
	public String getEmployeeCode() {
		return employeeCode;
	}	
	
	public void setEmployeeCode(String employeeCode) {
		this.employeeCode = employeeCode;
	}
	public String getLoginName() {
		return loginName;
	}	
	
	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}
	public String getPassword() {
		return password;
	}	
	
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmployeeName() {
		return employeeName;
	}	
	
	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}
	public int getSex() {
		return sex;
	}	
	
	public void setSex(int sex) {
		this.sex = sex;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}	
	
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public String getEmail() {
		return email;
	}	
	
	public void setEmail(String email) {
		this.email = email;
	}
	public String getAddress() {
		return address;
	}	
	
	public void setAddress(String address) {
		this.address = address;
	}
	public String getRoleID() {
		return roleID;
	}	
	
	public void setRoleID(String roleID) {
		this.roleID = roleID;
	}
	public String getDepartmentID() {
		return departmentID;
	}	
	
	public void setDepartmentID(String departmentID) {
		this.departmentID = departmentID;
	}
	public int getLevel() {
		return level;
	}	
	
	public void setLevel(int level) {
		this.level = level;
	}
	public Date getCreateTime() {
		return createTime;
	}	
	
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public int getState() {
		return state;
	}	
	
	public void setState(int state) {
		this.state = state;
	}
	
	public String getDutyID() {
		return dutyID;
	}

	public void setDutyID(String dutyID) {
		this.dutyID = dutyID;
	}

	@Override
	public String toString() {
		return "Employee [" +  "ID=" + ID  + ", " +  "employeeCode=" + employeeCode  + ", " +  "loginName=" + loginName  + ", " +  "password=" + password  + ", " +  "employeeName=" + employeeName  + ", " +  "sex=" + sex  + ", " +  "phoneNumber=" + phoneNumber  + ", " +  "email=" + email  + ", " +  "address=" + address  + ", " +  "roleID=" + roleID  + ", " +  "departmentID=" + departmentID  + ", " +  "level=" + level  + ", " +  "createTime=" + createTime  + ", " +  "state=" + state  + ", " +  "dutyID=" + dutyID+  "]";
	}
	
	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return "employee";
	}

	@Override
	public String getPrimaryKey() {
		// TODO Auto-generated method stub
		return "ID";
	}

	public int getPermission() {
		return permission;
	}

	public void setPermission(int permission) {
		this.permission = permission;
	}
}
