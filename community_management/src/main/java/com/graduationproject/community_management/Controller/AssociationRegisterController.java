package com.graduationproject.community_management.Controller;

import com.graduationproject.community_management.Services.AssociationRegisterService;
import com.graduationproject.community_management.entity.AssociationRegister;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

/**
 * @description:
 * @author: Satoshi-Yuen
 * @time: 2021/4/11
 */
@RestController
public class AssociationRegisterController {

    @Autowired
    AssociationRegisterService associationRegisterService;

    /**
     * 新增一条社团预成立信息
     */
    @RequestMapping("/association_manager/associationregister/CreateAssociationRegister")
    public int CreateAssociationRegister(@RequestBody AssociationRegister associationRegister){
        System.out.println(associationRegister.getAuditassociation());
        Callable callable = new Callable() {
            @Override
            public Object call() throws Exception {
                Date date = new Date();
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                associationRegister.setUploadtime(sdf.format(date));
                int flag = associationRegisterService.CreateRegisterMessage(associationRegister);
                return flag;
            }
        };
        int flag = 1;
        ExecutorService executorService = Executors.newCachedThreadPool();
        try {
            Future future = executorService.submit(callable);
            flag = Integer.parseInt(future.get().toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return flag;
    }

    /**
     * 查看社团预成立信息
     */
    @RequestMapping("/association_manager/associationregister/ReadAssociationRegister")
    public String ReadAssociationRegister(){
        Callable callable = new Callable() {
            @Override
            public Object call() throws Exception {
                List<AssociationRegister> associationRegisterList = associationRegisterService.ReadAllAssociationRegister();
                String arlist = JSONArray.fromObject(associationRegisterList).toString();
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
     * 更新社团预成立审批的标志
     */
    @RequestMapping("/association_manager/associationregister/UpdateAssociationRegisterByflag")
    public int updateAssociationRegisterbyflag(@RequestParam("id")Integer id,
                                               @RequestParam("flag")int flag){
        Callable callable = new Callable() {
            @Override
            public Object call() throws Exception {
                int auditflag = associationRegisterService.UpdateRegister(id,flag);
                return auditflag;
            }
        };
        int auditflag = 1;
        ExecutorService executorService = Executors.newCachedThreadPool();
        try {
            Future future = executorService.submit(callable);
            auditflag = Integer.parseInt(future.get().toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return auditflag;
    }
}
