package com.graduationproject.community_management.Controller;

import com.graduationproject.community_management.Services.AssociationDeptService;
import com.graduationproject.community_management.entity.AssociationDept;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

/**
 * @description:  社团部门信息控制器
 * @author: Satoshi-Yuen
 * @time: 2021/4/1
 */
@RestController
public class AssociationDeptController {

    @Autowired
    AssociationDeptService associationDeptService;

    /**
     * 查看社团招新部门资料
     */
    @RequestMapping("/association_manager/associationdept/ReadAssociationDepartments")
    public String ReadAssociationDepartments(){
        Callable callable = new Callable() {
            @Override
            public Object call() throws Exception {
                List<AssociationDept> associationdeptlist = associationDeptService.ReadAllAssociation();
                String adlist = JSONArray.fromObject(associationdeptlist).toString();
                return adlist;
            }
        };
        String adlist = null;
        ExecutorService executorService = Executors.newCachedThreadPool();
        try {
            Future future = executorService.submit(callable);
            adlist = future.get().toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return adlist;
    }
}
