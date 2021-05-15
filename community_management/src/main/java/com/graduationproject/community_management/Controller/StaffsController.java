package com.graduationproject.community_management.Controller;

import com.graduationproject.community_management.Services.StaffsService;
import com.graduationproject.community_management.entity.AssociationStar;
import com.graduationproject.community_management.entity.Staffs;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

/**
 * @description: 社团骨干信息 控制器
 * @author: Satoshi-Yuen
 * @time: 2021/2/21
 */

@RestController
public class StaffsController {

    @Autowired
    StaffsService staffsService;

    /**
     * 新增一条干事信息
     */
    @RequestMapping("/association_manager/staffs/CreateStaff")
    public int CreateStaff(Staffs staffs){
        Callable callable = new Callable() {
            @Override
            public Object call() throws Exception {
                Calendar date = Calendar.getInstance();
                String year = String.valueOf(date.get(Calendar.YEAR));
                staffs.setTerm(year + "-05-31");
                staffs.setTitle("干事");
                int judgeflag = staffsService.CreateStaff(staffs);
                return judgeflag;
            }
        };
        int judgeflag = 1;
        ExecutorService executorService = Executors.newCachedThreadPool();
        try {
            Future future = executorService.submit(callable);
            judgeflag = Integer.parseInt(future.get().toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return judgeflag;
    }

    /**
     * 根据协会名称查询协会干事
     */
    @RequestMapping("/association_manager/staffs/ReadStaffsByAssociationName")
    public String ReadStaffsByAssociationname(@RequestParam("atname")String atname){
        Callable callable = new Callable() {
            @Override
            public Object call() throws Exception {
                List<Staffs> staffsList=staffsService.ReadStaffsByAssociationname(atname);
                String stlist = JSONArray.fromObject(staffsList).toString();
                return stlist;
            }
        };
        String stlist = null;
        ExecutorService executorService = Executors.newCachedThreadPool();
        try {
            Future future = executorService.submit(callable);
            stlist = future.get().toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return stlist;
    }

//    @RequestMapping("/association_manager/staffs/ReadStaffsByStunum")
//    public String ReadStaffsByStuno(@RequestParam("no")String no){
//        Staffs staff = staffsService.ReadStaffsBystuno(no);
//        String sta = JSONArray.fromObject(staff).toString();
//        return sta;
//    }

    @RequestMapping("/association_manager/staffs/ImportStaff")
    public int UpdateStaff(@RequestParam("jsondatastr")String jsondatastr){
        Calendar date = Calendar.getInstance();
        String year = String.valueOf(date.get(Calendar.YEAR));
        JSONArray jsondata = JSONArray.fromObject(jsondatastr);
        List<Staffs> staffList = new LinkedList<>();
        for(int i = 0;i<jsondata.size();i++){
            Staffs staff = new Staffs();
            JSONObject job = jsondata.getJSONObject(i);
            staff.setStunum(job.get("stunum").toString());
            staff.setStuname(job.get("stuname").toString());
            staff.setStusex(job.get("stusex").toString());
            staff.setStugrade(job.get("stugrade").toString());
            staff.setStucollege(job.get("stucollege").toString());
            staff.setStuprofessclass(job.get("stuprofessclass").toString());
            staff.setStutele(job.get("stutele").toString());
            staff.setAssociationname(job.get("associationname").toString());
            staff.setDepartment(job.get("commdepartment").toString());
            staff.setTitle("干事");
            staff.setTerm(year + "-05-31");
            staffList.add(staff);
        }
        Callable callable = new Callable() {
            @Override
            public Object call() throws Exception {
                int flag = staffsService.CreateStaffs(staffList);
                return flag;
            }
        };
        int judgeflag = 1;
        ExecutorService executorService = Executors.newCachedThreadPool();
        try {
            Future future = executorService.submit(callable);
            judgeflag = Integer.parseInt(future.get().toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return judgeflag;
    }

    /**
     * 删除干事信息
     */
    @RequestMapping("/association_manager/staffs/DeleteStaff")
    public boolean DeleteStaff(@RequestParam("flagstr")String stunum){
        Callable callable = new Callable() {
            @Override
            public Object call() throws Exception {
                boolean judgeflag = staffsService.DeleteStaff(stunum);
                return judgeflag;
            }
        };
        boolean judgeflag = true;
        ExecutorService executorService = Executors.newCachedThreadPool();
        try {
            Future future = executorService.submit(callable);
            judgeflag = ((Boolean)future.get()).booleanValue();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return judgeflag;
    }
}
