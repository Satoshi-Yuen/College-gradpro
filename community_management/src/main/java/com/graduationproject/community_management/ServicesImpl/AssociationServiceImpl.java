package com.graduationproject.community_management.ServicesImpl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.graduationproject.community_management.Mappers.AssociationMapper;
import com.graduationproject.community_management.Services.AssociationService;
import com.graduationproject.community_management.entity.Activities;
import com.graduationproject.community_management.entity.Association;
import com.graduationproject.community_management.entity.Staffs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @description: 社团信息业务逻辑层接口实现
 * @author: Satoshi-Yuen
 * @time: 2021/2/22
 */
@Service
public class AssociationServiceImpl implements AssociationService {

    @Autowired
    AssociationMapper associationMapper;
    @Autowired
    private RedisTemplate<Object, Object> redisTemplate;

    @Override
    @Transactional
    public boolean CreateAssociation(Association association) {
        synchronized (this){
            int judgeflag=associationMapper.insert(association);
            if(judgeflag==0) return false;
            return true;
        }
    }

    @Override
    public List<Association> ReadAssociation() {
        synchronized (this){
            List<Association>associationslist= associationMapper.selectList(null);
            return associationslist;
        }
    }

    @Override
    @Transactional
    public boolean UpdateAssociation(Association association) {
        Association as = associationMapper.selectById(association.getId());
        association.setVersion(as.getVersion());
        int judgeflag = associationMapper.updateById(association);
        if(judgeflag == 0) return false;
        return true;
    }

    @Override
    @Transactional
    public boolean DeleteAssociation(Integer id) {
        synchronized (this){
            int judgeflag=associationMapper.deleteById(id);
            if(judgeflag==0) return false;
            return true;
        }
    }

    @Override
    @Transactional
    public Association ReadOnlyAssociationData(String aname){
        RedisSerializer redisSerializer = new StringRedisSerializer();
        redisTemplate.setKeySerializer(redisSerializer);
        Association associationsList = (Association) redisTemplate.opsForValue().get("associationsList"+aname);
        synchronized (this){
            if(associationsList == null){
                QueryWrapper<Association> queryWrapper = new QueryWrapper<>();
                queryWrapper
                        .eq("associationname",aname);
                associationsList = associationMapper.selectOne(queryWrapper);
                redisTemplate.opsForValue().set("associationsList"+aname,associationsList);
            }

            return associationsList;
        }
    }

    @Override
    public int AssociationStatics(){
        synchronized (this) {
            int total = associationMapper.selectCount(null);
            return total;
        }
    }

    @Override
    public int AssociationTypeStatics(){
        synchronized (this){
            int total = associationMapper.astypestatics();
            return total;
        }
    }
}
