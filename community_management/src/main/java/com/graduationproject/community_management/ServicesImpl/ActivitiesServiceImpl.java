package com.graduationproject.community_management.ServicesImpl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.graduationproject.community_management.Mappers.ActivitiesMapper;
import com.graduationproject.community_management.Services.ActivitiesService;
import com.graduationproject.community_management.entity.Activities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;;

import java.util.LinkedList;
import java.util.List;

/**
 * @description: 社团活动信息业务逻辑层接口实现
 * @author: Satoshi-Yuen
 * @time: 2021/2/22
 */
@Service
public class ActivitiesServiceImpl implements ActivitiesService {

    @Autowired
    ActivitiesMapper activitiesMapper;
    @Autowired
    private RedisTemplate<Object, Object> redisTemplate;

    /**
     * 插入活动信息
     */
    @Override
    @Transactional
    public int CreateActivity(Activities activity) {
        synchronized (this){
            int judgeflagnum = activitiesMapper.insert(activity);
            return judgeflagnum;
        }
    }

    @Override
    @Transactional
    public List<Activities> ReadActivities() {
        synchronized (this) {
            List<Activities> activitieslist = activitiesMapper.selectList(null);
            return activitieslist;
        }
    }

    @Override
    @Transactional
    public List<Activities> ReadActivitiesRelease() {
        RedisSerializer redisSerializer = new StringRedisSerializer();
        redisTemplate.setKeySerializer(redisSerializer);
        List<Activities> activitiesList = (List<Activities>) redisTemplate.opsForValue().get("activitiesList");
        synchronized (this) {
            if(activitiesList == null){
                QueryWrapper<Activities> queryWrapper = new QueryWrapper<>();
                queryWrapper
                        .eq("activitystate", 1);
                activitiesList = activitiesMapper.selectList(queryWrapper);
                redisTemplate.opsForValue().set("activitiesList",activitiesList);
            }
            return activitiesList;
        }
    }

    @Override
    @Transactional
    public List<Activities> ReadActivitiesReleasebyname(String asname){
        RedisSerializer redisSerializer = new StringRedisSerializer();
        redisTemplate.setKeySerializer(redisSerializer);
        List<Activities> activitiesList = (List<Activities>) redisTemplate.opsForValue().get("activitiesList");
        synchronized (this) {
            if(activitiesList == null) {
                QueryWrapper<Activities> queryWrapper = new QueryWrapper<>();
                queryWrapper
                        .eq("activitystate", 1)
                        .eq("association",asname);
                List<Activities> activitiesreleaselist = activitiesMapper.selectList(queryWrapper);
                return activitiesreleaselist;
            }
            else {
                List<Activities> activitiesreleaselist = new LinkedList<>();
                for(Activities activity:activitiesList){
                    if(activity.getAssociation()!=null&&activity.getAssociation().equals(asname)){
                        if(activity.getActivitystate()!=null&&activity.getActivitystate().equals(1)){
                            activitiesreleaselist.add(activity);
                        }
                    }
                }
                return activitiesreleaselist;
            }
        }
    }

    @Override
    @Transactional
    public int UpdateActivity(Integer id,Integer flag){
        Activities activity = activitiesMapper.selectById(id);
        activity.setActivitystate(flag);
        int updateflag = activitiesMapper.updateById(activity);
        return updateflag;
    }

    @Override
    @Transactional
    public int UpdateActivityByactivityname(Integer acname) {
        synchronized (this) {
            int judgeflag = activitiesMapper.UpdateActivityByState(acname);
            return judgeflag;
        }
    }

    @Override
    @Transactional
    public int UpdateActivityByactivitynameAndassociationname(String acname,String asname){
        synchronized (this) {
            int flag = 0;
            int judgeflag = activitiesMapper.UpdateActivityByasnameAndacname(asname, acname);
            if (judgeflag == 1) {
                flag = activitiesMapper.SelectActivityIdbyByasnameAndacname(asname, acname);
            }
            return flag;
        }
    }

    @Override
    @Transactional
    public boolean DeleteActivity(Integer id) {
        synchronized (this) {
            QueryWrapper<Activities> queryWrapper = new QueryWrapper<>();
            queryWrapper
                    .eq("id", id);
            int judgeflag = activitiesMapper.delete(queryWrapper);
            if (judgeflag == 0) return false;
            return true;
        }
    }

    @Override
    public int ActivitiesStatics(){
        synchronized (this) {
            QueryWrapper<Activities> queryWrapper = new QueryWrapper<>();
            queryWrapper
                    .eq("activitystate", 1);
            int total = activitiesMapper.selectCount(queryWrapper);
            return total;
        }
    }

    @Override
    public int ActivitiesStaticsByasname(String asname){
        synchronized (this){
            QueryWrapper<Activities> queryWrapper = new QueryWrapper<>();
            queryWrapper
                    .eq("activitystate", 1)
                    .eq("association",asname);
            int total = activitiesMapper.selectCount(queryWrapper);
            return total;
        }
    }
}
