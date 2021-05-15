package com.graduationproject.community_management.ServicesImpl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.graduationproject.community_management.Mappers.ActivityDeclarationMapper;
import com.graduationproject.community_management.Services.ActivityDeclarationService;
import com.graduationproject.community_management.entity.Activities;
import com.graduationproject.community_management.entity.ActivityDeclaration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @description: 社团活动申报信息业务逻辑层接口实现
 * @author: Satoshi-Yuen
 * @time: 2021/2/22
 */
@Service
public class ActivityDeclarationServiceImpl implements ActivityDeclarationService {

    @Autowired
    ActivityDeclarationMapper activityDeclarationMapper;
    @Autowired
    private RedisTemplate<Object, Object> redisTemplate;

    @Override
    @Transactional
    public int CreateActivityDeclaration(ActivityDeclaration activityDeclaration) {
        synchronized (this){
            activityDeclarationMapper.insertreturnid(activityDeclaration);
            return activityDeclaration.getId();
        }
    }

    @Override
    public List<ActivityDeclaration> ReadActivityDeclarationByflag(Integer flag) {
        RedisSerializer redisSerializer = new StringRedisSerializer();
        redisTemplate.setKeySerializer(redisSerializer);
        List<ActivityDeclaration> activityDeclarationList = (List<ActivityDeclaration>) redisTemplate.opsForValue().get("activityDeclarationList"+flag);
        synchronized (this){
            if(activityDeclarationList == null){
                QueryWrapper<ActivityDeclaration> queryWrapper = new QueryWrapper<>();
                queryWrapper.eq("flag",flag);
                activityDeclarationList = activityDeclarationMapper.selectList(queryWrapper);
                redisTemplate.opsForValue().set("activityDeclarationList"+flag,activityDeclarationList);
            }
            return activityDeclarationList;
        }
    }

    @Override
    public ActivityDeclaration ReadActivityDeclarationById(Integer id){
        synchronized (this) {
            ActivityDeclaration activityDeclaration = activityDeclarationMapper.selectById(id);
            return activityDeclaration;
        }
    }

    @Override
    public List<ActivityDeclaration> ReadActivityDeclarationByAssociation(String asname){
        RedisSerializer redisSerializer = new StringRedisSerializer();
        redisTemplate.setKeySerializer(redisSerializer);
        List<ActivityDeclaration> activitiesdeclarelist = (List<ActivityDeclaration>)redisTemplate.opsForValue().get("activitiesdeclarelist"+asname);
        synchronized (this) {
            if(activitiesdeclarelist == null){
                QueryWrapper<ActivityDeclaration> queryWrapper = new QueryWrapper<>();
                queryWrapper.eq("association", asname).ne("flag", 3);
                activitiesdeclarelist = activityDeclarationMapper.selectList(queryWrapper);
                redisTemplate.opsForValue().set("activitiesdeclarelist"+asname,activitiesdeclarelist);
            }
            return activitiesdeclarelist;
        }
    }

    @Override
    @Transactional
    public boolean UpdateActivityDeclaration(ActivityDeclaration activityDeclaration) {
        ActivityDeclaration ac = activityDeclarationMapper.selectById(activityDeclaration.getId());
        activityDeclaration.setVersion(ac.getVersion());
        int judgeflag = activityDeclarationMapper.updateById(activityDeclaration);
        if(judgeflag == 0) return false;
        return true;
    }

//    有用
    @Override
    @Transactional
    public boolean AuditUpdateActivityDeclaration(Integer id,Integer flag) {
        boolean judgeflag = true;
        ActivityDeclaration activityDeclaration = activityDeclarationMapper.selectById(id);
        activityDeclaration.setFlag(flag);
        int judgeflagnum = activityDeclarationMapper.updateById(activityDeclaration);
        if(judgeflagnum <= 0) judgeflag = false;
        return judgeflag;
    }

    @Override
    @Transactional
    public boolean DeleteActivityDeclaration(Integer id) {
        synchronized (this){
            int judgeflag=activityDeclarationMapper.deleteById(id);
            if(judgeflag == 0) return false;
            return true;
        }
    }
}
