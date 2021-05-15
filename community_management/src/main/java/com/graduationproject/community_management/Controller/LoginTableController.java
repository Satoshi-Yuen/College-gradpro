package com.graduationproject.community_management.Controller;

import com.graduationproject.community_management.Services.LoginTableService;
import com.graduationproject.community_management.entity.LoginTable;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

/**
 * @description: 人员登录信息 控制器
 * @author: Satoshi-Yuen
 * @time: 2021/2/21
 */

@RestController
public class LoginTableController {

    @Autowired
    LoginTableService loginTableService;

    @RequestMapping("/association_manager/logintable/CreateLogin")
    public boolean CreateLogin(@RequestBody LoginTable loginTable){
        boolean judgeflag=loginTableService.CreateLoginMes(loginTable);
        return judgeflag;
    }

    @RequestMapping("/association_manager/logintable/ReadLogins")
    public List ReadLogins(){
        List<LoginTable>loginTableList=loginTableService.ReadLoginMess();
        return loginTableList;
    }

    @RequestMapping("/association_manager/logintable/UpdateLogin")
    public boolean UpdateLogin(@RequestBody LoginTable loginTable){
        boolean judgeflag=loginTableService.UpdateLoginMes(loginTable);
        return judgeflag;
    }

    @RequestMapping("/association_manager/logintable/DeleteLogin")
    public boolean DeleteLogin(@RequestParam("id")Integer id){
        boolean judgeflag=loginTableService.DeleteLoginMes(id);
        return judgeflag;
    }

    @RequestMapping("/association_manager/logintable/setroles")
    public int setRoles(@RequestParam("jsondatastr")String jsondatastr){
        JSONArray jsondata = JSONArray.fromObject(jsondatastr);
        List<LoginTable> logintable = new LinkedList<>();
        for(int i = 0;i<jsondata.size();i++){
            LoginTable loginTable = new LoginTable();
            JSONObject job = jsondata.getJSONObject(i);
            Collection<Object> collection = job.values();
            loginTable.setRole(Integer.parseInt(collection.toArray()[3].toString()));
            loginTable.setStunum(collection.toArray()[0].toString());
            logintable.add(loginTable);
        }
        Callable callable = new Callable() {
            @Override
            public Object call() throws Exception {
                int flag = loginTableService.SetRoles(logintable);
                return flag;
            }
        };
        int judgeflag = 0;
        ExecutorService executorService = Executors.newCachedThreadPool();
        try {
            Future future = executorService.submit(callable);
            judgeflag = Integer.parseInt(future.get().toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return judgeflag;
    }
    @RequestMapping("/association_manager/logintable/setsingleroles")
    public int setSingleRoles(@RequestParam("roledataone")String stunum,
                              @RequestParam("roledatatwo")int role){
        Callable callable = new Callable() {
            @Override
            public Object call() throws Exception {
                int flag = loginTableService.SetsinRoles(role,stunum);
                return flag;
            }
        };
        int judgeflag = 0;
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
