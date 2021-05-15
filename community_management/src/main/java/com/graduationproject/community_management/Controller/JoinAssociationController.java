package com.graduationproject.community_management.Controller;

import com.graduationproject.community_management.Services.JoinAssociationService;
import com.graduationproject.community_management.entity.JoinAssociation;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

/**
 * @description: 报名加入社团信息 控制器
 * @author: Satoshi-Yuen
 * @time: 2021/2/21
 */

@RestController
public class JoinAssociationController {

    @Autowired
    JoinAssociationService joinAssociationService;

    /**
     * 新增一条参会信息
     */
    @RequestMapping("/association_manager/joinassociation/CreateJoinAssociation")
    public boolean CreateJoinAssociation(@RequestBody JoinAssociation joinAssociation){
        Callable callable = new Callable() {
            @Override
            public Object call() throws Exception {
                boolean judgeflag = joinAssociationService.CreateJoinAssociation(joinAssociation);
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
     * 根据某学号查看学生的报名参会信息
     */
    @RequestMapping("/association_manager/joinassociation/ReadJoinAssociationsBystunum")
    public String ReadJoinAssociationsbystunum(@RequestParam("stunum")String stunum,
                                               @RequestParam("state")String state){
        Callable callable = new Callable() {
            @Override
            public Object call() throws Exception {
                List<JoinAssociation> joinAssociationList = joinAssociationService.ReadJoinAssociationBystunum(stunum,state);
                String jalist = JSONArray.fromObject(joinAssociationList).toString();
                return jalist;
            }
        };
        String jalist = null;
        ExecutorService executorService = Executors.newCachedThreadPool();
        try {
            Future future = executorService.submit(callable);
            jalist = future.get().toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return jalist;
    }

    /**
     * 根据协会和身份标识查看内部成员（干事、会员）
     */
    @RequestMapping("/association_manager/joinassociation/ReadJoinAssociationsByStatus")
    public String ReadJoinAssociationsByStatus(@RequestParam("status")int status,
                                               @RequestParam("atname")String atname){
        Callable callable = new Callable() {
            @Override
            public Object call() throws Exception {
                int s = status;
                String str = atname;
                List<JoinAssociation> joinAssociationList = joinAssociationService.ReadJoinAssociationByStatus(atname,status);
                String jalist = JSONArray.fromObject(joinAssociationList).toString();
                return jalist;
            }
        };
        String jalist = null;
        ExecutorService executorService = Executors.newCachedThreadPool();
        try {
            Future future = executorService.submit(callable);
            jalist = future.get().toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return jalist;
    }

////    有用
//    @RequestMapping("/association_manager/joinassociation/DeleteJoinAssociation")
//    public boolean DeleteJoinAssociation(@RequestParam("id")Integer id){
//        boolean judgeflag = joinAssociationService.DeleteJoinAssociation(id);
//        return judgeflag;
//    }

    /**
     * 学生取消报名参会
     */
    @RequestMapping("/association_manager/joinassociation/CancelJoinAssociation")
    public int CancelJoinAssociation(@RequestParam("stunum")String stunum,
                                     @RequestParam("associationname")String associationname,
                                     @RequestParam("commdepartment")String commdepartment) {
        Callable callable = new Callable() {
            @Override
            public Object call() throws Exception {
                int judgeflag = joinAssociationService.CancelJoinAssociation(stunum,associationname,commdepartment);
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
