package com.graduationproject.community_management.ServicesImpl;

import com.graduationproject.community_management.Mappers.AssociationDeptMapper;
import com.graduationproject.community_management.Services.AssociationDeptService;
import com.graduationproject.community_management.entity.Activities;
import com.graduationproject.community_management.entity.AssociationDept;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @description:
 * @author: Satoshi-Yuen
 * @time: 2021/4/1
 */
@Service
public class AssociationDeptServiceImpl implements AssociationDeptService {

    @Autowired
    AssociationDeptMapper associationDeptMapper;
    @Autowired
    private RedisTemplate<Object,Object> redisTemplate;

    @Override
    public List<AssociationDept> ReadAllAssociation() {
        RedisSerializer redisSerializer = new StringRedisSerializer();
        redisTemplate.setKeySerializer(redisSerializer);
        List<AssociationDept> associationDeptList = (List<AssociationDept>) redisTemplate.opsForValue().get("associationDeptList");
        synchronized (this) {
            if(associationDeptList == null){
                associationDeptList = associationDeptMapper.selectList(null);
                redisTemplate.opsForValue().set("associationDeptList",associationDeptList);
            }
        }
        return associationDeptList;
    }
}
