package com.graduationproject.community_management.Controller;

import com.graduationproject.community_management.Services.*;
import com.graduationproject.community_management.entity.AssociationRegister;
import com.graduationproject.community_management.entity.LoginTable;
import com.graduationproject.community_management.entity.Staffs;
import net.sf.json.JSONException;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * @description: 新建学生管理员首页数据控制器
 * @author: Satoshi-Yuen
 * @time: 2021/3/21
 */

@RestController
public class StuManaIndexController {

    @Autowired
    ActivitiesService activitiesService;
    @Autowired
    MembersService membersService;
    @Autowired
    StaffsService staffsService;
    @Autowired
    LoginTableService loginTableService;
    @Autowired
    AssociationRegisterService associationRegisterService;
    @Autowired
    AssociationService associationService;

    @RequestMapping("/association_manager/index/WelcomeIndex")
    public String IndexData(@RequestParam("id")String id) throws JSONException {
        int role = loginTableService.ReadLoginRole(id);
        JSONObject indexdata = new JSONObject();
        LoginTable loginTable = loginTableService.ReadLoginMessBystunum(id);
        indexdata.put("stunum", loginTable.getStunum());
        indexdata.put("stuname", loginTable.getUsername());
        indexdata.put("stusex", loginTable.getStusex());
        indexdata.put("stugrade",loginTable.getStugrade());
        indexdata.put("stucollege",loginTable.getStucollege());
        indexdata.put("stuprofessclass",loginTable.getStuprofessclass());
        indexdata.put("stupassword",loginTable.getPassword());
        indexdata.put("stutele",loginTable.getStutele());
        indexdata.put("department",loginTable.getDepartment());
        indexdata.put("title",loginTable.getTitle());
        indexdata.put("associationname",loginTable.getGroupcom());
        indexdata.put("sturole",role);
        indexdata.put("stupassword",loginTableService.ReadLoginPassword(id));
        if(role == 1){
            int hamount = membersService.MembersStatisticsByasname(loginTable.getGroupcom());
            int gamount = staffsService.StaffsStatisticsByasname(loginTable.getGroupcom());
            int samount = hamount + gamount;
            int famount = activitiesService.ActivitiesStaticsByasname(loginTable.getGroupcom());
            indexdata.put("scount",samount);
            indexdata.put("gcount",gamount);
            indexdata.put("hcount",hamount);
            indexdata.put("fcount",famount);
            Staffs staff = staffsService.ReadStaffsBystuno(id);
            indexdata.put("stuage",staff.getStuage());
            indexdata.put("term",staff.getTerm());
        }
        if(role == 2){
            int hamount = membersService.MembersStatistics();
            int gamount = staffsService.StaffsStatistics();
            int samount = hamount + gamount;
            int famount = activitiesService.ActivitiesStatics();
            indexdata.put("scount",associationService.AssociationStatics());
            indexdata.put("gcount",associationService.AssociationTypeStatics());
            indexdata.put("hcount",samount);
            indexdata.put("fcount",famount);
        }
//        else if(role == 4){
//            List<AssociationRegister> arlist = associationRegisterService.ReadAllAssociationRegisterBystunum(id);
//            String arliststr = arlist.toString();
//            indexdata.put("jobslist",arliststr);
//        }
        List<AssociationRegister> arlist = associationRegisterService.ReadAllAssociationRegisterBystunum(id);
        String arliststr = net.sf.json.JSONArray.fromObject(arlist).toString();
        indexdata.put("jobslist",arliststr);
        return indexdata.toString();
    }

    @RequestMapping("/association_manager/filetest")
    public String testFiles(@RequestParam("fileurl")String fileurl){
        File file = new File(fileurl);
        JSONArray jsonArray = new JSONArray();
        JSONArray jary = func(file,jsonArray);
        return jary.toString();
    }

    private static JSONArray func(File file, JSONArray jsonArray){
        File[] fs = file.listFiles();
        JSONObject indexdata = new JSONObject();
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        for(File f:fs){
            if(f.isDirectory()){
                jsonArray = func(f,jsonArray);
            }
            if(f.isFile()){
                String str = f.toString().replace("D:\\nginx\\nginx-1.19.7\\html\\gradupro",".").replace("\\","/");
                indexdata.put("filepath",str);
                indexdata.put("filename",f.getName().substring(0,f.getName().lastIndexOf(".")));
                indexdata.put("filedate",df.format(new Date(f.lastModified())));
                if(f.toString().contains("associationfiles")) indexdata.put("flag",1);
                else indexdata.put("flag",0);
                jsonArray.put(indexdata.toString());
            }
        }
        return jsonArray;
    }

}
