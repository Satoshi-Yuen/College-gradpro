package com.graduationproject.community_management.Controller;

import com.graduationproject.community_management.Services.MembersService;
import com.graduationproject.community_management.entity.Members;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

/**
 * @description: 社团会员信息 控制器
 * @author: Satoshi-Yuen
 * @time: 2021/2/21
 */

@RestController
public class MembersController {

    @Autowired
    MembersService membersService;

    /**
     * 新增一条会员信息
     */
    @RequestMapping("/association_manager/members/CreateMember")
    public int CreateMember(Members member){
        Callable callable = new Callable() {
            @Override
            public Object call() throws Exception {
                Calendar date = Calendar.getInstance();
                String year = String.valueOf(date.get(Calendar.YEAR));
                member.setTerm(year + "-05-31");
                int judgeflag = membersService.CreateMember(member);
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
     * 根据协会名称查看协会会员
     */
    @RequestMapping("/association_manager/members/ReadMembersByAssociationName")
    public String ReadMembersByAssociationname(@RequestParam("atname")String atname){
        Callable callable = new Callable() {
            @Override
            public Object call() throws Exception {
                List<Members> membersList = membersService.ReadMembersByAssociationname(atname);
                String mblist = JSONArray.fromObject(membersList).toString();
                return mblist;
            }
        };
        String mblist = null;
        ExecutorService executorService = Executors.newCachedThreadPool();
        try {
            Future future = executorService.submit(callable);
            mblist = future.get().toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return mblist;
    }

    @RequestMapping("/association_manager/members/ImportMembers")
    public int importMember(@RequestParam("jsondatastr")String jsondatastr){
        Calendar date = Calendar.getInstance();
        String year = String.valueOf(date.get(Calendar.YEAR));
        JSONArray jsondata = JSONArray.fromObject(jsondatastr);
        List<Members> memberList = new LinkedList<>();
        for(int i = 0;i<jsondata.size();i++){
            Members member = new Members();
            JSONObject job = jsondata.getJSONObject(i);
            member.setStunum(job.get("stunum").toString());
            member.setStuname(job.get("stuname").toString());
            member.setStusex(job.get("stusex").toString());
            member.setStugrade(job.get("stugrade").toString());
            member.setStucollege(job.get("stucollege").toString());
            member.setStuprofessclass(job.get("stuprofessclass").toString());
            member.setStutele(job.get("stutele").toString());
            member.setAssociationname(job.get("associationname").toString());
            member.setTerm(year + "-05-31");
            memberList.add(member);
        }
        Callable callable = new Callable() {
            @Override
            public Object call() throws Exception {
                int flag = membersService.CreateMembers(memberList);
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

    /**
     * 删除一条会员信息
     */
    @RequestMapping("/association_manager/members/DeleteMember")
    public boolean DeleteMember(@RequestParam("flagstr")String stunum){
        Callable callable = new Callable() {
            @Override
            public Object call() throws Exception {
                boolean judgeflag = membersService.DeleteMember(stunum);
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
