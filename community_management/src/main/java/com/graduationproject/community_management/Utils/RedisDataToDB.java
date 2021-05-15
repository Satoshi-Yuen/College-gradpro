package com.graduationproject.community_management.Utils;

import com.graduationproject.community_management.entity.Activities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.util.CollectionUtils;

import com.alibaba.fastjson.JSON;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @description:  redis缓存更新到mysql
 * @author: Satoshi-Yuen
 * @time: 2021/4/12
 */
public class RedisDataToDB {

//    @Autowired
//    private RedisTemplate<String, String> strRedisTemplate;
//
//    public Object postBatchRedisToDb() {
//        Date now = new Date();
//        while (true) {
//            List<String> strReleaseActivitiesList =
//                    strRedisTemplate.opsForList().range("ReleaseActivities",0,-1);
////            if (CollectionUtils.isEmpty(strArticleCountList)) {
////                return WrapMapper.ok();
////            }
//            List<Activities> ReleaseActivitiesList = new ArrayList<>();
//            strReleaseActivitiesList.stream().forEach(x -> {
//                Activities activity = JSON.parseObject(x, Activities.class);
//                ReleaseActivitiesList.add(activity);
//            });
//            //过滤出本次定时任务之前的缓存中数据,防止死循环
//            List<Activities> beforeArticleCountDtoList = ReleaseActivitiesList.stream().filter(x -> x.getReadTime()
//                    .before(now)).collect(Collectors.toList());
////            if (CollectionUtils.isEmpty(beforeArticleCountDtoList)) {
////                return WrapMapper.ok();
////            }
//            xArticleCountMapper.batchAdd(beforeArticleCountDtoList);
//            Integer delSize = beforeArticleCountDtoList.size();
//            strRedisTemplate.opsForList().trim(zhArticleCountRedisKey, delSize, -1L);
//        }
//    }
}
