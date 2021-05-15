package com.graduationproject.community_management.Controller;

import com.alibaba.fastjson.JSON;
import com.graduationproject.community_management.Services.AssociationDeptService;
import com.graduationproject.community_management.Services.AssociationStarService;
import com.graduationproject.community_management.entity.AssociationStar;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import net.sf.json.JSONArray;

import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

/**
 * @description: 社团星级评分控制器
 * @author: Satoshi-Yuen
 * @time: 2021/4/1
 */

@RestController
public class AssociationStarController {

    @Autowired
    AssociationStarService associationStarService;

//    @RequestMapping("/association_manager/associationstar/ReadAllAssociationStars")
//    public String ReadAssociationStars() {
//        List<AssociationStar>associationstarlist = associationStarService.AllAssociationStar();
//        String aslist = JSONArray.fromObject(associationstarlist).toString();
//        return aslist;
//    }

    /**
     * 查看五星社团
     */
    @RequestMapping("/association_manager/associationstar/ReadTopTenAssociationStars")
    public String ReadtoptenAssociationStars() {
        Callable callable = new Callable() {
            @Override
            public Object call() throws Exception {
                List<AssociationStar>associationstarlist = associationStarService.TopTenAssociation();
                String aslist = JSONArray.fromObject(associationstarlist).toString();
                return aslist;
            }
        };
        String aslist = null;
        ExecutorService executorService = Executors.newCachedThreadPool();
        try {
            Future future = executorService.submit(callable);
            aslist = future.get().toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return aslist;
    }

    /**
     * 导入社团星级分数数据
     */
    @RequestMapping("/association_manager/associationstar/importAssociationStarsScore")
    public int ImportAssociationStars(@RequestParam("jsondatastr")String jsondatastr) {
        JSONArray jsondata = JSONArray.fromObject(jsondatastr);
        List<AssociationStar> associationStarslist = new LinkedList<>();
        for(int i = 0;i<jsondata.size();i++){
            AssociationStar associationStar = new AssociationStar();
            JSONObject job = jsondata.getJSONObject(i);
            Collection<Object> collection = job.values();
            associationStar.setAssociationname(collection.toArray()[0].toString());
            associationStar.setConstructionscore(Integer.parseInt(collection.toArray()[1].toString()));
            associationStar.setActivityscore(Integer.parseInt(collection.toArray()[2].toString()));
            associationStar.setManagescore(Integer.parseInt(collection.toArray()[3].toString()));
            associationStar.setStuscore(Integer.parseInt(collection.toArray()[4].toString()));
            associationStar.setTeascore(Integer.parseInt(collection.toArray()[5].toString()));
            associationStar.setAdditionalscore(Integer.parseInt(collection.toArray()[6].toString()));
            associationStar.setAnnualshowscore(Integer.parseInt(collection.toArray()[7].toString()));
            associationStar.setSum(Integer.parseInt(collection.toArray()[8].toString()));
            associationStarslist.add(associationStar);
        }
        Callable callable = new Callable() {
            @Override
            public Object call() throws Exception {
                int flag = associationStarService.ImportStarScoreData(associationStarslist);
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
