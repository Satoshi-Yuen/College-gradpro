package com.graduationproject.community_management.Controller;

import com.graduationproject.community_management.Services.ActivityRegistrationService;
import com.graduationproject.community_management.entity.ActivityRegistration;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

/**
 * @description: 社团活动报名信息 控制器
 * @author: Satoshi-Yuen
 * @time: 2021/2/21
 */

@RestController
public class ActivityRegistrationController {

    @Autowired
    ActivityRegistrationService activityRegistrationService;

    /**
     * 新增一条活动报名记录
     */
    @RequestMapping("/association_manager/activityregistration/CreateActivityRegistration")
    public boolean CreateActivityRegistration(@RequestBody ActivityRegistration activityRegistration){
        Callable callable = new Callable() {
            @Override
            public Object call() throws Exception {
                boolean judgeflag=activityRegistrationService.CreateActivityRegistration(activityRegistration);
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

    /**
     * 查看本协会内的活动报名情况
     */
    @RequestMapping("/association_manager/activityregistration/ReadActivityRegistrations")
    public String ReadActivityRegistrations(@RequestParam("atname")String atname){
        Callable callable = new Callable() {
            @Override
            public Object call() throws Exception {
                List<ActivityRegistration> activityRegistrationList=activityRegistrationService.ReadActivityRegistration(atname);
                String arlist = JSONArray.fromObject(activityRegistrationList).toString();
                return arlist;
            }
        };
        String arlist = null;
        ExecutorService executorService = Executors.newCachedThreadPool();
        try {
            Future future = executorService.submit(callable);
            arlist = future.get().toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return arlist;
    }

    /**
     * 通过学号查看该学生的活动报名情况，用于判断已报名还是未报名
     */
    @RequestMapping("/association_manager/activityregistration/ReadActivityRegistrationsBystunum")
    public String ReadActivityRegistrationsbystunum(@RequestParam("stunum")String stunum){
        Callable callable = new Callable() {
            @Override
            public Object call() throws Exception {
                List<ActivityRegistration> activityRegistrationList=activityRegistrationService.ReadActivityRegistrationBystunum(stunum);
                String arlist = JSONArray.fromObject(activityRegistrationList).toString();
                return arlist;
            }
        };
        String arlist = null;
        ExecutorService executorService = Executors.newCachedThreadPool();
        try {
            Future future = executorService.submit(callable);
            arlist = future.get().toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return arlist;
    }

//    @RequestMapping("/association_manager/activityregistration/UpdateActivityRegistration")
//    public boolean UpdateActivityRegistration(@RequestBody ActivityRegistration activityRegistration){
//        boolean judgeflag=activityRegistrationService.UpdateActivityRegistration(activityRegistration);
//        return judgeflag;
//    }

    /**
     * 删除活动报名信息
     */
    @RequestMapping("/association_manager/activityregistration/DeleteActivityRegistration")
    public boolean DeleteActivityRegistration(@RequestParam("flagstr")Integer id){
        Callable callable = new Callable() {
            @Override
            public Object call() throws Exception {
                boolean judgeflag = activityRegistrationService.DeleteActivityRegistration(id);
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

    /**
     * 删除活动报名信息，也就是学生自己取消活动报名
     */
    @RequestMapping("/association_manager/activityregistration/CancelActivityRegistration")
    public int CancelActivityRegistration(@RequestParam("stunum")String stunum,
                                          @RequestParam("activityname")String activityname,
                                          @RequestParam("associationname")String associationname){
        Callable callable = new Callable() {
            @Override
            public Object call() throws Exception {
                int judgeflag = activityRegistrationService.cancelActivityRegistration(stunum,activityname,associationname);
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
}
