package com.graduationproject.community_management.Controller;

import com.graduationproject.community_management.Services.ActivitiesService;
import com.graduationproject.community_management.entity.Activities;
import org.springframework.beans.factory.annotation.Autowired;
import net.sf.json.JSONArray;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

/**
 * @description: 社团活动信息 控制器
 * @author: Satoshi-Yuen
 * @time: 2021/2/21
 */

@RestController
public class ActivitiesController {

    @Autowired
    ActivitiesService activitiesService;

    /**
     *  学校审批活动通过后，在活动表中创建一条待发布的活动信息
     */
    @RequestMapping("/association_manager/activities/CreateActivity")
    public boolean CreateActivity(@RequestBody Activities activity){
        Callable callable = new Callable(){
            @Override
            public Object call() throws Exception {
                int judgeflag = activitiesService.CreateActivity(activity);
                return judgeflag;
            }
        };
        boolean judgeflag = true;
        ExecutorService executorService = Executors.newCachedThreadPool();
        try {
            Future future = executorService.submit(callable);
            int flag = Integer.parseInt(future.get().toString());
            if(flag <= 0) judgeflag = false;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return judgeflag;
    }

//    @RequestMapping("/association_manager/activities/ReadActivities")
//    public List ReadActivities(){
//        List<Activities> activitiesList=activitiesService.ReadActivities();
//        return activitiesList;
//    }

    /**
     *  查询已经发布的活动，带线程池
     */
    @RequestMapping("/association_manager/activities/ReadActivitiesrelease")
    public String Readactivitiesrelease() {
        Callable callable = new Callable() {
            @Override
            public Object call() throws Exception {
                List<Activities> activitieslist = activitiesService.ReadActivitiesRelease();
                String aclist = JSONArray.fromObject(activitieslist).toString();
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

    @RequestMapping("/association_manager/activities/ReadActivitiesreleaseByAssociationname")
    public String ReadactivitiesreleaseByasname(@RequestParam("asname")String asname) {
        Callable callable = new Callable() {
            @Override
            public Object call() throws Exception {
                List<Activities> activitieslist = activitiesService.ReadActivitiesReleasebyname(asname);
                String aclist = JSONArray.fromObject(activitieslist).toString();
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

//    @RequestMapping("/association_manager/activities/UpdateActivityByFlag")
//    public int UpdateActivitybyflag(@RequestParam("flagstr")Integer id){
//        int judgeflag=activitiesService.UpdateActivityByactivityname(id);
//        return judgeflag;
//    }

    /**
     *  点击活动发布的按钮后根据协会名称和活动名称更新活动状态
     */
    @RequestMapping("/association_manager/activities/UpdateActivityByAssociationnameAndActivityname")
    public int UpdateActivitybyannameandacname(@RequestParam("asname")String asname,
                                               @RequestParam("acname")String acname){
        Callable callable = new Callable() {
            @Override
            public Object call() throws Exception {
                int judgeflag = activitiesService.UpdateActivityByactivitynameAndassociationname(acname,asname);
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
     *  根据要删除的已发布的活动的主键来删除已发布的活动信息
     */
    @RequestMapping("/association_manager/activities/DeleteActivity")
    public boolean DeleteActivity(@RequestParam("flagstr")Integer id){
        Callable callable = new Callable() {
            @Override
            public Object call() throws Exception {
                boolean judgeflag = activitiesService.DeleteActivity(id);
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
