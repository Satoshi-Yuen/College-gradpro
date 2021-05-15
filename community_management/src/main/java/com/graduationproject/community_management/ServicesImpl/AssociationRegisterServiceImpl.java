package com.graduationproject.community_management.ServicesImpl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.graduationproject.community_management.Mappers.AssociationRegisterMapper;
import com.graduationproject.community_management.Services.AssociationRegisterService;
import com.graduationproject.community_management.entity.Activities;
import com.graduationproject.community_management.entity.AssociationRegister;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @description:
 * @author: Satoshi-Yuen
 * @time: 2021/4/11
 */
@Service
public class AssociationRegisterServiceImpl implements AssociationRegisterService {

    @Autowired
    AssociationRegisterMapper associationRegisterMapper;
    @Autowired
    private RedisTemplate<Object,Object> redisTemplate;

    @Override
    @Transactional
    public int CreateRegisterMessage(AssociationRegister associationRegister) {
        synchronized (this){
            int insertid = associationRegisterMapper.insert(associationRegister);
            return insertid;
        }
    }

    @Override
    public List<AssociationRegister> ReadAllAssociationRegister() {
        RedisSerializer redisSerializer = new StringRedisSerializer();
        redisTemplate.setKeySerializer(redisSerializer);
        List<AssociationRegister> associationRegisterList = (List<AssociationRegister>) redisTemplate.opsForValue().get("associationRegisterList");
        synchronized (this){
            if(associationRegisterList == null){
                associationRegisterList = associationRegisterMapper.selectList(null);
                redisTemplate.opsForValue().set("associationRegisterList",associationRegisterList);
            }
            return associationRegisterList;
        }
    }

    @Override
    @Transactional
    public int UpdateRegister(Integer id,int flag) {
        AssociationRegister associationRegister = associationRegisterMapper.selectById(id);
        associationRegister.setFlag(flag);
        int updateflag = associationRegisterMapper.updateById(associationRegister);
        return updateflag;
    }

    @Override
    @Transactional
    public List<AssociationRegister> ReadAllAssociationRegisterBystunum(String stunum){
        RedisSerializer redisSerializer = new StringRedisSerializer();
        redisTemplate.setKeySerializer(redisSerializer);
        List<AssociationRegister> associationRegisterList = (List<AssociationRegister>) redisTemplate.opsForValue().get("associationRegisterList"+stunum);
        synchronized (this) {
            if(associationRegisterList == null){
                QueryWrapper<AssociationRegister> queryWrapper = new QueryWrapper<>();
                queryWrapper.eq("stunum", stunum);
                associationRegisterList = associationRegisterMapper.selectList(queryWrapper);
                redisTemplate.opsForValue().set("associationRegisterList"+stunum,associationRegisterList);
            }
            return associationRegisterList;
        }
    }
}
