package com.graduationproject.community_management.ServicesImpl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.graduationproject.community_management.Mappers.AssociationStarMapper;
import com.graduationproject.community_management.Services.AssociationStarService;
import com.graduationproject.community_management.entity.Activities;
import com.graduationproject.community_management.entity.AssociationStar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @description: 社团评定得分
 * @author: Satoshi-Yuen
 * @time: 2021/4/1
 */
@Service
public class AssociationStarServiceImpl implements AssociationStarService {

    @Autowired
    AssociationStarMapper associationStarMapper;
    @Autowired
    private RedisTemplate<Object, Object> redisTemplate;

    @Override
    public List<AssociationStar> TopTenAssociation() {
        RedisSerializer redisSerializer = new StringRedisSerializer();
        redisTemplate.setKeySerializer(redisSerializer);
        List<AssociationStar> topTenAssociationlist = (List<AssociationStar>) redisTemplate.opsForValue().get("topTenAssociationlist");
        synchronized (this) {
            if(topTenAssociationlist == null){
                topTenAssociationlist = associationStarMapper.TopTenAssociationStar();
                redisTemplate.opsForValue().set("topTenAssociationlist",topTenAssociationlist);
            }
        }
        return topTenAssociationlist;
    }

    @Override
    @Transactional
    public List<AssociationStar> AllAssociationStar() {
        RedisSerializer redisSerializer = new StringRedisSerializer();
        redisTemplate.setKeySerializer(redisSerializer);
        List<AssociationStar> allAssociationStarlist = (List<AssociationStar>) redisTemplate.opsForValue().get("allAssociationStarlist");
        synchronized (this) {
            if(allAssociationStarlist == null){
                List<AssociationStar> aslist = associationStarMapper.selectList(null);
                redisTemplate.opsForValue().set("allAssociationStarlist",allAssociationStarlist);
            }
        }
        return allAssociationStarlist;
    }

    @Override
    @Transactional
    public int ImportStarScoreData(List<AssociationStar> associationStarList) {
        synchronized (this) {
            for(AssociationStar as:associationStarList){
                QueryWrapper<AssociationStar>queryWrapper = new QueryWrapper<>();
                queryWrapper.eq("associationname",as.getAssociationname());
                AssociationStar astar = associationStarMapper.selectOne(queryWrapper);
                if(astar == null) associationStarMapper.insert(as);
                else{
                    as.setId(astar.getId());
                    associationStarMapper.updateById(as);
                }
            }
            return 1;
        }
    }
}
