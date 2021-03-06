package com.cqut.xiji.service.sample;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Service;

import com.cqut.xiji.dao.base.BaseEntityDao;
import com.cqut.xiji.dao.base.EntityDao;
import com.cqut.xiji.dao.base.SearchDao;
import com.cqut.xiji.entity.company.Company;
import com.cqut.xiji.entity.linkReSample.LinkReSample;
import com.cqut.xiji.entity.sample.Sample;
import com.cqut.xiji.service.base.SearchService;
import com.cqut.xiji.tool.util.EntityIDFactory;

@Service
public class SampleService extends SearchService implements ISampleService{
	
	@Resource(name="entityDao")
	EntityDao entityDao;
	
	@Resource(name="searchDao")
	SearchDao searchDao;
	
	@Resource(name="baseEntityDao")
	BaseEntityDao baseEntityDao;

	@Override
	public String getBaseEntityName() {
		return "sample";
	}

	@Override
	public String getBasePrimaryKey() {
		return "sample.ID";
	}
    /**
     * 
     * 分页查询样品信息
     * @author wzj
     * @date 2016年10月13日 下午9:25:04
     *
     */
	@Override
	public Map<String, Object> getSampleWithPaging(String factoryCode,String sampleName,String sampleType,String giveMan,String takeMan,String receiptlistID, String startTime, String endTime,int limit, int offset,
			String order, String sort){
		// TODO Auto-generated method stub
		System.out.println("sampleName: "+sampleName+"  "+"sampleType:"+sampleType+"  "+"startTime:"+startTime+"  "+"endTime: "+endTime+"  rolename:");
		System.out.println("giveMan : "+giveMan+"  takeman :"+takeMan +" receiptlistID "+receiptlistID);
		System.out.println("limit : "+limit+"  "+offset);
		System.out.println("orderFiled : "+order+"  sortModel:"+sort);
		if(startTime == null){
			System.out.println("strtime is null");
		}
		if(endTime == null){
			System.out.println("endTime is null");
		}
		int pageNum = limit;
		int pageIndex = offset/limit ;
		System.out.println("");
		String[] properties =  new String[]{
		"sample.ID",
		"factoryCode",
		"sampleName",
		"specifications AS type", 
		"if(state = 0 ,'未领用','领用') as state",
		"unit",
		"DATE_FORMAT(sample.createTime,'%Y-%m-%d %H:%i:%s') AS createTime ",
		"sample.remarks  "
		};
	
	    String tableName = " sample ";
		String condition =" 1 = 1  ";
		if(factoryCode != null && !factoryCode.equals("")){
			 condition+=" and factoryCode like '%"+factoryCode+"%'  ";
		}
		if(sampleName != null && !sampleName.equals("")){
			condition+=" and  sampleName like '%"+sampleName+"%'  ";
		}
		
		if(sampleType != null && !sampleType.equals("")){
			condition+=" and specifications like '%"+sampleType+"%'  ";
		}
		
	/*	if(takeMan != null && !takeMan.equals("")){
			condition+=" and takeMan like '%"+takeMan+"%'  ";
		}
		if(giveMan != null && !giveMan.equals("")){
			condition+=" and giveMan like '%"+giveMan+"%'  ";
		}
		
		if(receiptlistID != null && !receiptlistID.equals("")){
			condition+=" and receiptlist.receiptlistID like '%"+receiptlistID+"%'  ";
		}*/
		
    	if(startTime != null && endTime != null  && !startTime.equals("") &&  !endTime.equals("") ){
			condition+=" and sample.createTime between  "+startTime+" and "+endTime+"  ";
		}else if((startTime != null && !startTime.equals("")) && (endTime == null || endTime.equals(""))){
			condition+=" and sample.createTime >  "+startTime+"  " ;
		}else if((startTime == null ||startTime.equals("")) && (endTime != null && !endTime.equals(""))){
			condition+=" and sample.createTime < "+endTime+"  " ;
		}
    	sort = " desc ";
    	order = " sample.createTime ";
	    List<Map<String, Object>> list = entityDao.searchWithpaging(properties, tableName, null, null, condition, null, order, sort, pageNum, pageIndex);
    	int count = entityDao.getByCondition(condition, Sample.class).size();
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", list);
	   return map;
	}
 /**
  * 
  * 删除样品
  * @author wzj
  * @date 2016年10月21日 下午7:24:13
  *
  */
	@Override
	public String delSample(String roleIDs) {
		// TODO Auto-generated method stub
		String[] ids = roleIDs.split(",");
		System.out.println(Arrays.toString(ids));
		return entityDao.deleteEntities(ids, Sample.class) == ids.length ? "true" :"false";
	}
   /**
    * 
    * 删除交接单中的样品
    * @author wzj
    * @date 2016年10月21日 下午7:26:01
    *
    */
	@Override
	public String delLinkReSample(String linkIDs) {
		// TODO Auto-generated method stub
		String[] ids = linkIDs.split(",");
		System.out.println(Arrays.toString(ids));
		return entityDao.deleteEntities(ids, LinkReSample.class) == ids.length ? "true" :"false";
	}
	
	/**
	 * 
	 * 添加样品
	 * @author wzj
	 * @date 2016年10月13日 下午9:19:42
	 *
	 */
	@Override
	public String addLinkSample(String factoryCode,String sampleName, String sampleType,String receiptlistCode, String remarks,String unit){
		System.out.println(sampleName+" sn "+ sampleType+" st "+remarks+ " r "+ unit);
		System.out.println(factoryCode+" f "+" gm "+ " tm "+ receiptlistCode);
		// TODO Auto-generated method stub
		Sample sample = new Sample();
		String sampleID = EntityIDFactory.createId();
		sample.setID(sampleID);
	/*	LinkReSample linkReSample = null ;*/
		if(factoryCode != null && !factoryCode.equals("")){
			sample.setFactoryCode(factoryCode);
		}
		if(sampleName != null && !sampleName.equals("")){
			sample.setSampleName(sampleName);
		}
		if(sampleType != null && !sampleType.equals("")){
			sample.setSpecifications(sampleType);
		}
		
		if(remarks != null  && !remarks.equals("")){
			sample.setRemarks(remarks);
		}
		/*if(takeMan != null && !takeMan.equals("")){
			sample.setTakeMan(takeMan);
			sample.setTakeTime(new Date());
		}
		if(giveMan != null && !giveMan.equals("")){
			sample.setGiveMan(giveMan);
			sample.setGiveTime(new Date());
		}*/
	/*	if(receiptlistCode != null && !receiptlistCode.equals("")){
			sample.setReceiptlistID(receiptlistCode);
			 linkReSample = new LinkReSample();
			linkReSample.setID(EntityIDFactory.createId());
			linkReSample.setSampleID(sampleID);
			linkReSample.setReceiptlistID(receiptlistCode);
			linkReSample.setCreateTime(new Date());
		}*/
		/*if(givePhone != null && !givePhone.equals("")){
			sample.setGivePhone(givePhone);
		}
		if(takePhone != null && !takePhone.equals("")){
			sample.setTakePhone(takePhone);
		}*/
		sample.setState(0);
		sample.setUnit(unit);
		sample.setCreateTime(new Date());
		sample.setQrcode(EntityIDFactory.createId());
		String condition = " factoryCode ='"+factoryCode+"'";
		List<Sample> list = entityDao.getByCondition(condition, Sample.class);
		if(list != null && list.size() > 0)
			return "codeExit";
		else return  entityDao.save(sample) == 1 ?"true":"false";
		/* if(linkReSample != null )
		     return entityDao.save(sample) + entityDao.save(linkReSample) == 2 ?"true":"false";
		 else return "false";*/
	}
	/**
	 * 
	 * 新增样品
	 * @author wzj
	 * @date 2016年12月20日 下午5:14:15
	 *
	 */
	@Override
	public String addSample(String factoryCode,String sampleName, String sampleType, String remarks,String unit){
		System.out.println(sampleName+" sn "+ sampleType+" st "+remarks+ " r "+ unit);
		// TODO Auto-generated method stub
		Sample sample = new Sample();
		String sampleID = EntityIDFactory.createId();
		sample.setID(sampleID);
	/*	LinkReSample linkReSample = null ;*/
		if(factoryCode != null && !factoryCode.equals("")){
			sample.setFactoryCode(factoryCode);
		}
		if(sampleName != null && !sampleName.equals("")){
			sample.setSampleName(sampleName);
		}
		if(sampleType != null && !sampleType.equals("")){
			sample.setSpecifications(sampleType);
		}
		
		if(remarks != null  && !remarks.equals("")){
			sample.setRemarks(remarks);
		}
		
		sample.setUnit(unit);
		sample.setState(0);
		sample.setCreateTime(new Date());
		sample.setQrcode(EntityIDFactory.createId());
	/*	String condition = " factoryCode ='"+factoryCode+"'";
		List<Sample> list = entityDao.getByCondition(condition, Sample.class);*/
	
		 return  entityDao.save(sample) == 1 ?"true":"false";
	
	}
	
	/**
	 * 字符串转换成日期
	 * @author wzj
	 * @date 2016年10月13日 下午9:21:15
	 * @param str
	 * @return date
	 */
	public static Date StrToDate(String str) {

		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date = null;
		try {
			date = format.parse(str);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}
   
    /**
     * 
     * 更新样品信息(包括样品交接单号)
     * @author wzj
     * @date 2016年10月13日 下午9:22:00
     *
     */
	@Override
	public String updateLinkSample(String ID,String sampleName, String factoryCode,String sampleType,
			String remarks, String unit,String linkID ,String reID) {
		// TODO Auto-generated method stub
	
		if(ID == null  || ID.equals("")){
			return "false";
		}
		Sample	sample = entityDao.getByID(ID, Sample.class);
		if(sample == null )
			return "false";
		sample.setSampleName(sampleName);
		sample.setSpecifications(sampleType);
		sample.setRemarks(remarks);
		
		if(linkID == null  || linkID.equals("")){
			return "false";
		}
		 LinkReSample linkReSample  = entityDao.getByID(linkID, LinkReSample.class);
		 if(linkReSample == null  ){
				return "false";
			}
		 List<Sample> list1 = entityDao.getByCondition("  sample.factoryCode='"+factoryCode+"'", Sample.class);
			if(list1 != null && list1.size() > 0)
				return "codeExit";
		linkReSample.setReceiptlistID(reID);
		linkReSample.setCreateTime(new Date());
		return entityDao.updatePropByID(sample, ID) + entityDao.updatePropByID(linkReSample, linkID) == 2 ? "true": "false";
	}
	/**
	 * 
	 * 单纯的修改样品信息
	 * @author wzj
	 * @date 2016年10月21日 下午7:40:42
	 *
	 */
	@Override
	public String updateSample(String ID,String sampleName,String factoryCode, String sampleType,
			String remarks, String unit) {
		if(ID == null  || ID.equals("")){
			return "false";
		}
		Sample	sample = entityDao.getByID(ID, Sample.class);
		if(sample == null )
			return "false";
		sample.setSampleName(sampleName);
		sample.setSpecifications(sampleType);
		sample.setRemarks(remarks);
		/*sample.setCreateTime(new Date());
		List<Sample> list = entityDao.getByCondition("  sample.factoryCode='"+factoryCode+"'", Sample.class);
		if(list != null && list.size() > 0)
			return "codeExit";*/
		sample.setFactoryCode(factoryCode);
		return entityDao.updatePropByID(sample, ID)  == 1 ? "true": "false";
	}
/**
 * 
 * 通过样品编码获得样品信息
 * @author wzj
 * @date 2016年11月29日 上午12:20:54
 *
 */
	@Override
	public String getSampleByCode(String sampleCode) {
		// TODO Auto-generated method stub
		String[] properties = new String[]{
				 "sample.ID as sampleID",
				 "sampleName",
				 "factoryCode as sampleCode",
				 "specifications as sampleStyle",
				 "unit",
				 "DATE_FORMAT(sample.createTime,'%Y-%m-%d %H:%i:%s') as createTime ",
				 "remarks"
				
		};
		String condition = "  sample.factoryCode ='"+sampleCode+"'";
		 List<Map<String, Object>> list = entityDao.findByCondition(properties, condition, Sample.class);
	  if(list == null || list.size() == 0)
		 return "false";
	  else return JSONObject.fromObject(list.get(0)).toString();
	}
	
	public String getSampleByID(String sampleID) {
		// TODO Auto-generated method stub
		String[] properties = new String[]{
				 "sample.ID as sampleID",
				 "sampleName",
				 "factoryCode as sampleCode",
				 "specifications as sampleStyle",
				 "unit",
				 "DATE_FORMAT(sample.createTime,'%Y-%m-%d %H:%i:%s') as createTime ",
				 "remarks"
				
		};
		String condition = "  sample.ID ='"+sampleID+"'";
		 List<Map<String, Object>> list = entityDao.findByCondition(properties, condition, Sample.class);
	  if(list == null || list.size() == 0)
		 return "false";
	  else return JSONObject.fromObject(list.get(0)).toString();
	}
	

	/**
	 * @description 获取样品ID
	 * @author hzz 
	 * @date 2016年11月17日 晚上22:37:58
	 */
	@Override
	public List<Map<String, Object>> getSampleInfor(String qrcode) {
		String[] properties = new String[] {"ID"};
		String condition = "qrcode=" + qrcode;
		List<Map<String, Object>> result = entityDao.findByCondition(properties, condition, Sample.class );
		return result;
	}

	@Override
	public String isExitFactory(String factoryCode) {
		// TODO Auto-generated method stub
		List<Sample> list = entityDao.getByCondition(" factoryCode='"+factoryCode+"'", Sample.class);
		if(list != null && list.size() > 0)
			return "true";
		else return "false";
	}
    /**
     * 
     * 模糊搜索样品
     * @author wzj
     * @date 2017年3月20日 下午5:28:19
     *
     */
	@Override
	public List<Map<String, Object>> getSampleListByCodeLimit(String sampleCode) {
		// TODO Auto-generated method stub
		String[] properties = new String[]{
				"sample.ID ",
				"factoryCode as sampleCode"
		};
		String condition = " factoryCode like '%"+sampleCode+"%' order by factoryCode asc ";
		List<Map<String, Object>> list = entityDao.findByCondition(properties, condition, Sample.class);
		return list;
	}

	@Override
	public List<Map<String, Object>> getSampleMsg(String codeOrName){
		String[] properties = new String[] {"ID as sampleID","factoryCode","sampleName","specifications"};
		
		String condition = " factoryCode like '%" + codeOrName + "%' or sampleName like '%" + codeOrName + "%'";
		List<Map<String, Object>> result = entityDao.findByCondition(properties, condition, Sample.class);
		return result;
	}
	

	public Map<String, Object> getSampleWithPagingINmanhour(String factoryCode,String sampleName,String specifications,int limit, int offset,
			String order, String sort){
		
		int index = limit;
		int pageNum = offset/limit;
		String[] properties = new String[]{
			"sample.ID",
			"sample.factoryCode",
			"sample.sampleName",
			"sample.specifications",
			"sample.laborHour"
		};

		String condition = " 1 = 1 and sample.laborHour is not null";
		if (factoryCode != null && !factoryCode.equals("")) {
			condition += " and sample.factoryCode like '%"
					+ factoryCode + "%'";
		}
		if (sampleName != null && !sampleName.equals("")) {
			condition += " and sample.sampleName like '%" + sampleName
					+ "%'";
		}
		if (specifications != null && !specifications.equals("")) {
			condition += " and sample.specifications like '%" + specifications
					+ "%'";
		}

		List<Map<String, Object>> result = originalSearchWithpaging(properties, getBaseEntityName(), null, null, condition, false, null, sort, order, index, pageNum);
		int count = getForeignCountWithJoin(null, null, condition, false);

		Map<String,Object> map = new HashMap<String, Object>();
		map.put("total", count);
		map.put("rows", result);

		return map;

	}
	
	public List<Map<String, Object>> getSampleImforByFactoryCode(String factoryCode) {
		String[] properties = new String[] {
				"ID",
				"factoryCode",
				"sampleName",
				"specifications",
				"laborHour"
				};
		
		String condition = " factoryCode like '%" + factoryCode + "%' ORDER BY createTime ";
		List<Map<String, Object>> result = entityDao.findByCondition(properties, condition, Sample.class);
		return result;
	}
	
	public List<Map<String, Object>> getSampleImforBySampleName(String sampleName) {
		String[] properties = new String[] {
				"ID",
				"factoryCode",
				"sampleName",
				"specifications",
				"laborHour"
				};
		
		String condition = " sampleName like '%" + sampleName + "%' ORDER BY createTime ";
		List<Map<String, Object>> result = entityDao.findByCondition(properties, condition, Sample.class);
		return result;
	}
	
	public List<Map<String, Object>> getSampleImforBySpecifications(String specifications) {
		String[] properties = new String[] {
				"ID",
				"sampleName",
				"factoryCode",
				"specifications",
				"laborHour"
				};
		
		String condition = " specifications like '%" + specifications + "%' ORDER BY createTime ";
		List<Map<String, Object>> result = entityDao.findByCondition(properties, condition, Sample.class);
		return result;
	}
	
	@Override
	public String updateManHour(String ID,double laborHour){
		if(ID == null  || ID.equals("")){
			return "false";
		}
		Sample	sample = entityDao.getByID(ID, Sample.class);
		if(sample == null )
			return "false";
		sample.setLaborHour(laborHour);
		return entityDao.updatePropByID(sample, ID)  == 1 ? "true": "false";
	}
	
	public String addSampleInManHour(String factoryCode,String sampleName, String specifications, double laborHour){
		Sample sample = new Sample();
		String sampleID = EntityIDFactory.createId();
		sample.setID(sampleID);
		
		if(factoryCode != null && !factoryCode.equals("")){
			sample.setFactoryCode(factoryCode);
		}
		if(sampleName != null && !sampleName.equals("")){
			sample.setSampleName(sampleName);
		}
		if(specifications != null && !specifications.equals("")){
			sample.setSpecifications(specifications);
		}
		
		sample.setUnit("个");
		sample.setState(0);
		sample.setCreateTime(new Date());
		sample.setQrcode(EntityIDFactory.createId());
		sample.setLaborHour(laborHour);
	
		 return  entityDao.save(sample) == 1 ?"true":"false";
	}
}
