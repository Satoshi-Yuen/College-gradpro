package com.graduationproject.community_management.ServicesImpl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.graduationproject.community_management.Mappers.ActivityRegistrationMapper;
import com.graduationproject.community_management.Services.ActivityRegistrationService;
import com.graduationproject.community_management.entity.ActivityRegistration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @description: 社团活动暴民信息业务逻辑层接口实现
 * @author: Satoshi-Yuen
 * @time: 2021/2/22
 */
@Service
public class ActivityRegistrationServiceImpl implements ActivityRegistrationService {

    @Autowired
    ActivityRegistrationMapper activityRegistrationMapper;
    @Autowired
    private RedisTemplate<Object, Object> redisTemplate;

    @Override
    @Transactional
    public boolean CreateActivityRegistration(ActivityRegistration activityRegistration) {
        synchronized (this){
            int judgeflag=activityRegistrationMapper.insert(activityRegistration);
            if(judgeflag==0) return false;
            return true;
        }
    }

    @Override
    @Transactional
    public List<ActivityRegistration> ReadActivityRegistration(String atname) {
        RedisSerializer redisSerializer = new StringRedisSerializer();
        redisTemplate.setKeySerializer(redisSerializer);
        List<ActivityRegistration>activityRegistrationList = (List<ActivityRegistration>) redisTemplate.opsForValue().get("activityRegistrationList"+atname);
        synchronized (this){
            if(activityRegistrationList == null){
                QueryWrapper<ActivityRegistration> queryWrapper = new QueryWrapper<>();
                queryWrapper.eq("associationname",atname);
                activityRegistrationList = activityRegistrationMapper.selectList(queryWrapper);
                redisTemplate.opsForValue().set("activityRegistrationList"+atname,activityRegistrationList);
            }
            return activityRegistrationList;
        }
    }

    @Override
    @Transactional
    public List<ActivityRegistration> ReadActivityRegistrationBystunum(String stunum){
        RedisSerializer redisSerializer = new StringRedisSerializer();
        redisTemplate.setKeySerializer(redisSerializer);
        List<ActivityRegistration>ActivityRegistrationlist = (List<ActivityRegistration>) redisTemplate.opsForValue().get("ActivityRegistrationlist"+stunum);
        synchronized (this){
            if(ActivityRegistrationlist == null){
                QueryWrapper<ActivityRegistration> queryWrapper = new QueryWrapper<>();
                queryWrapper.eq("stunum",stunum);
                ActivityRegistrationlist = activityRegistrationMapper.selectList(queryWrapper);
                redisTemplate.opsForValue().set("ActivityRegistrationlist"+stunum,ActivityRegistrationlist);
            }
            return ActivityRegistrationlist;
        }
    }

    @Override
    @Transactional
    public boolean UpdateActivityRegistration(ActivityRegistration activityRegistration) {
        ActivityRegistration ar = activityRegistrationMapper.selectById(activityRegistration.getId());
        activityRegistration.setVersion(ar.getVersion());
        int judgeflag = activityRegistrationMapper.updateById(ar);
        if(judgeflag==0) return false;
        return true;
    }

    @Override
    @Transactional
    public boolean DeleteActivityRegistration(Integer id) {
        synchronized (this){
            int judgeflag=activityRegistrationMapper.deleteById(id);
            if(judgeflag==0) return false;
            return true;
        }
    }

    @Override
    @Transactional
    public int cancelActivityRegistration(String stuno,String acname,String asname){
        synchronized (this) {
            QueryWrapper<ActivityRegistration> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("stunum",stuno).eq("activityname",acname).eq("associationname",asname);
            int judgeflag = activityRegistrationMapper.delete(queryWrapper);
            return judgeflag;
        }
    }
}
