package com.graduationproject.community_management.ServicesImpl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.graduationproject.community_management.Mappers.JoinAssociationMapper;
import com.graduationproject.community_management.Services.JoinAssociationService;
import com.graduationproject.community_management.entity.Activities;
import com.graduationproject.community_management.entity.JoinAssociation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @description: 报名加入社团信息业务逻辑层接口实现
 * @author: Satoshi-Yuen
 * @time: 2021/2/22
 */
@Service
public class JoinAssociationServiceImpl implements JoinAssociationService {

    @Autowired
    JoinAssociationMapper joinAssociationMapper;
    @Autowired
    private RedisTemplate<Object, Object> redisTemplate;

    @Override
    @Transactional
    public boolean CreateJoinAssociation(JoinAssociation joinAssociation) {
        synchronized (this){
            int judgeflag=joinAssociationMapper.insert(joinAssociation);
            if(judgeflag==0) return false;
            return true;
        }
    }

    @Override
    @Transactional
    public List<JoinAssociation> ReadJoinAssociation() {
        RedisSerializer redisSerializer = new StringRedisSerializer();
        redisTemplate.setKeySerializer(redisSerializer);
        List<JoinAssociation>joinAssociationslist = (List<JoinAssociation>) redisTemplate.opsForValue().get("joinAssociationslist");
        synchronized (this){
            if(joinAssociationslist == null){
                joinAssociationslist = joinAssociationMapper.selectList(null);
                redisTemplate.opsForValue().set("joinAssociationslist",joinAssociationslist);
            }
            return joinAssociationslist;
        }
    }

    @Override
    @Transactional
    public List<JoinAssociation> ReadJoinAssociationBystunum(String stunum,String state){
        RedisSerializer redisSerializer = new StringRedisSerializer();
        redisTemplate.setKeySerializer(redisSerializer);
        List<JoinAssociation>joinAssociationslist = (List<JoinAssociation>) redisTemplate.opsForValue().get("joinAssociationslist"+stunum+state);
        synchronized (this){
            if(joinAssociationslist == null){
                QueryWrapper<JoinAssociation> queryWrapper = new QueryWrapper<>();
                queryWrapper.eq("stunum",stunum).eq("commstate",state);
                joinAssociationslist = joinAssociationMapper.selectList(queryWrapper);
                redisTemplate.opsForValue().set("joinAssociationslist"+stunum+state,joinAssociationslist);
            }
            return joinAssociationslist;
        }
    }
    @Override
    @Transactional
    public List<JoinAssociation> ReadJoinAssociationByStatus(String atname,int status){
        RedisSerializer redisSerializer = new StringRedisSerializer();
        redisTemplate.setKeySerializer(redisSerializer);
        List<JoinAssociation>joinAssociationslist = (List<JoinAssociation>) redisTemplate.opsForValue().get("joinAssociationslist"+atname+status);
        synchronized (this){
            if(joinAssociationslist == null){
                QueryWrapper<JoinAssociation> queryWrapper = new QueryWrapper<>();
                queryWrapper
                        .eq("commstate",status).eq("associationname",atname);
                joinAssociationslist = joinAssociationMapper.selectList(queryWrapper);
                redisTemplate.opsForValue().set("joinAssociationslist"+atname+status,joinAssociationslist);
            }
            return joinAssociationslist;
        }
    }

    @Override
    @Transactional
    public boolean UpdateJoinAssociation(JoinAssociation joinAssociation) {
        JoinAssociation ja = joinAssociationMapper.selectById(joinAssociation.getId());
        joinAssociation.setVersion(ja.getVersion());
        int judgeflag = joinAssociationMapper.updateById(joinAssociation);
        if(judgeflag == 0) return false;
        return true;
    }

    @Override
    @Transactional
    public boolean DeleteJoinAssociation(Integer id) {
        synchronized (this){
            int judgeflag=joinAssociationMapper.deleteById(id);
            if(judgeflag==0) return false;
            return true;
        }
    }

    @Override
    @Transactional
    public int CancelJoinAssociation(String stunum,String associationname,String commdepartment){
        synchronized (this){
            QueryWrapper<JoinAssociation>queryWrapper = new QueryWrapper<>();
            if(commdepartment.isEmpty())  queryWrapper.eq("stunum",stunum).eq("associationname",associationname);
            else queryWrapper.eq("stunum",stunum).eq("associationname",associationname).eq("commdepartment",commdepartment);
            int judgeflag = joinAssociationMapper.delete(queryWrapper);
            return judgeflag;
        }
    }
}
