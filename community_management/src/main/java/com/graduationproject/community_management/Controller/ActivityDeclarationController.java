package com.graduationproject.community_management.Controller;

import com.graduationproject.community_management.Services.ActivitiesService;
import com.graduationproject.community_management.Services.ActivityDeclarationService;
import com.graduationproject.community_management.entity.Activities;
import com.graduationproject.community_management.entity.ActivityDeclaration;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

/**
 * @description: 社团活动申报信息 控制器
 * @author: Satoshi-Yuen
 * @time: 2021/2/21
 */

@RestController
public class ActivityDeclarationController {

    @Autowired
    ActivityDeclarationService activityDeclarationService;

    @Autowired
    ActivitiesService activitiesService;


    /**
     * 新增一条申报记录
     */
    @RequestMapping("/association_manager/activitydeclaration/CreateActivityDeclaration")
    public int CreateActivityDeclaration(ActivityDeclaration activityDeclaration) throws IOException {
        Callable callable = new Callable() {
            @Override
            public Object call() throws Exception {
                int judgeflag = 1;
                Date date = new Date();
                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM--dd HH:mm:ss");
                activityDeclaration.setDeclaretime(formatter.format(date));
                activityDeclaration.setFlag(2);
                ActivityDeclaration anotheractivityDeclaration = new ActivityDeclaration();
                anotheractivityDeclaration = activityDeclaration;
                judgeflag = activityDeclarationService.CreateActivityDeclaration(anotheractivityDeclaration);
                return null;
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
     * 根据协会名称查找申报记录
     */
    @RequestMapping("/association_manager/activitydeclaration/ReadActivityDeclarationsByAssociation")
    public String ReadActivityDeclarationsByAssociation(@RequestParam("associationname")String associationname) {
        Callable callable = new Callable() {
            @Override
            public Object call() throws Exception {
                List<ActivityDeclaration> activityDeclarationList = activityDeclarationService.ReadActivityDeclarationByAssociation(associationname);
                String aclist = JSONArray.fromObject(activityDeclarationList).toString();
                return aclist;
            }
        };
        String aclist = null;
        ExecutorService executorService = Executors.newCachedThreadPool();
        try {
            Future future = executorService.submit(callable);
            aclist = future.get().toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return aclist;
    }

    /**
     * 根据申报记录的状态查找出申报记录（学校管理员）
     */
    @RequestMapping("/association_manager/activitydeclaration/ReadActivityDeclarationsByflag")
    public String ReadActivityDeclarationsByflag(@RequestParam("flag")Integer flag) {
        Callable callable = new Callable() {
            @Override
            public Object call() throws Exception {
                List<ActivityDeclaration> activityDeclarationList = activityDeclarationService.ReadActivityDeclarationByflag(flag);
                String aclist = JSONArray.fromObject(activityDeclarationList).toString();
                return aclist;
            }
        };
        String aclist = null;
        ExecutorService executorService = Executors.newCachedThreadPool();
        try {
            Future future = executorService.submit(callable);
            aclist = future.get().toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return aclist;
    }

    /**
     * 更新申报记录
     */
    @RequestMapping("/association_manager/activitydeclaration/UpdateActivityDeclaration")
    public boolean UpdateActivityDeclaration(ActivityDeclaration activityDeclaration){
        Callable callable = new Callable() {
            @Override
            public Object call() throws Exception {
                Date date = new Date();
                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM--dd HH:mm:ss");
                activityDeclaration.setDeclaretime(formatter.format(date));
                boolean judgeflag = activityDeclarationService.UpdateActivityDeclaration(activityDeclaration);
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
     * 根据申报记录的主键来更新申报记录的审批标志
     */
    @RequestMapping("/association_manager/activitydeclaration/UpdateActivityDeclarationByflag")
    public boolean UpdateActivityDeclarationbyflag(@RequestParam("id")Integer id,
                                                   @RequestParam("flag")Integer flag){
        Callable callable = new Callable() {
            @Override
            public Object call() throws Exception {
                boolean judgeflag = activityDeclarationService.AuditUpdateActivityDeclaration(id,flag);
                if(flag == 1) {
                    ActivityDeclaration activityDeclaration = activityDeclarationService.ReadActivityDeclarationById(id);
                    Activities activities = new Activities();
                    activities.setAssociation(activityDeclaration.getAssociation());
                    activities.setActivityname(activityDeclaration.getActivityname());
                    activities.setActivitydate(activityDeclaration.getActivitydate());
                    activities.setActivitytime(activityDeclaration.getActivitystarttime() + "-" + activityDeclaration.getActivityendtime());
                    activities.setActivityplace(activityDeclaration.getActivityplace());
                    activities.setActivitystate(2);
                    activitiesService.CreateActivity(activities);
                }
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
     * 删除申报记录
     */
    @RequestMapping("/association_manager/activitydeclaration/DeleteActivityDeclaration")
    public boolean DeleteActivityDeclaration(@RequestParam("flagstr")Integer id){
        Callable callable = new Callable() {
            @Override
            public Object call() throws Exception {
                boolean judgeflag = activityDeclarationService.DeleteActivityDeclaration(id);
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
