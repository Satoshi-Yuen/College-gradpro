package com.graduationproject.community_management.Controller;

import com.graduationproject.community_management.Services.AssociationService;
import com.graduationproject.community_management.entity.Association;
import com.sun.org.apache.xpath.internal.operations.Mod;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

/**
 * @description: 社团信息 控制器
 * @author: Satoshi-Yuen
 * @time: 2021/2/21
 */

@RestController
public class AssociationController {

    @Autowired
    AssociationService associationService;

//    @RequestMapping("/association_manager/association/CreateAssociation")
//    public boolean CreateAssociation(@RequestBody Association association){
//        boolean judgeflag = associationService.CreateAssociation(association);
//        return judgeflag;
//    }

    /**
     * 获取社团名单，用于会员报名
     */
    @RequestMapping("/association_manager/association/ReadAssociations")
    public List ReadAssociations(){
        Callable callable = new Callable() {
            @Override
            public Object call() throws Exception {
                List<Association>associationList = associationService.ReadAssociation();
                return associationList;
            }
        };
        List<Association> associations = new LinkedList<>();
        ExecutorService executorService = Executors.newCachedThreadPool();
        try {
            Future future = executorService.submit(callable);
            associations = (List<Association>)future.get();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return associations;
    }

//    @RequestMapping("/association_manager/association/UpdateAssociation")
//    public boolean UpdateAssociation(@RequestBody Association association){
//        boolean judgeflag = associationService.UpdateAssociation(association);
//        return judgeflag;
//    }

//    @RequestMapping("/association_manager/association/DeleteAssociation")
//    public boolean DeleteAssociation(@RequestParam("id")Integer id){
//        boolean judgeflag = associationService.DeleteAssociation(id);
//        return judgeflag;
//    }

    @RequestMapping("/association_manager/association/AssociationData")
    public String AssociationData(@RequestParam("association")String name){
        Association association = associationService.ReadOnlyAssociationData(name);
        JSONObject associationjson = JSONObject.fromObject(association);
        return associationjson.toString();
    }
}
