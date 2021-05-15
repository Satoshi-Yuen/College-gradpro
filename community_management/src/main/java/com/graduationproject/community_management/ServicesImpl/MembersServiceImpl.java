package com.graduationproject.community_management.ServicesImpl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.graduationproject.community_management.Mappers.MembersMapper;
import com.graduationproject.community_management.Services.MembersService;
import com.graduationproject.community_management.entity.Activities;
import com.graduationproject.community_management.entity.Members;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @description: 社团会员信息业务逻辑层接口实现
 * @author: Satoshi-Yuen
 * @time: 2021/2/22
 */
@Service
public class MembersServiceImpl implements MembersService {

    @Autowired
    MembersMapper membersMapper;
    @Autowired
    private RedisTemplate<Object, Object> redisTemplate;

    @Override
    @Transactional
    public int CreateMember(Members member) {
        synchronized (this){
            int judgeflag = membersMapper.insert(member);
            return judgeflag;
        }
    }

    @Override
    @Transactional
    public int CreateMembers(List<Members> memberlist){
        synchronized (this){
            for(Members member:memberlist){
                QueryWrapper<Members>queryWrapper = new QueryWrapper<>();
                queryWrapper.eq("stunum",member.getStunum());
                Members mem = membersMapper.selectOne(queryWrapper);
                if(mem == null) membersMapper.insert(member);
                else{
                    member.setId(mem.getId());
                    membersMapper.updateById(member);
                }
            }
            return 1;
        }
    }

    @Override
    @Transactional
    public List<Members> ReadMembersByAssociationname(String atname) {
        RedisSerializer redisSerializer = new StringRedisSerializer();
        redisTemplate.setKeySerializer(redisSerializer);
        List<Members>memberslist = (List<Members>) redisTemplate.opsForValue().get("memberslist"+atname);
        synchronized (this){
            if(memberslist == null){
                QueryWrapper<Members> queryWrapper = new QueryWrapper<>();
                queryWrapper.eq("associationname",atname);
                memberslist = membersMapper.selectList(queryWrapper);
                redisTemplate.opsForValue().set("memberslist"+atname,memberslist);
            }
            return memberslist;
        }
    }

    @Override
    @Transactional
    public boolean UpdateMembers(Members member) {
        Members mb = membersMapper.selectById(member.getId());
        member.setVersion(mb.getVersion());
        int judgeflag=membersMapper.updateById(member);
        if(judgeflag==0) return false;
        return true;
    }

    @Override
    @Transactional
    public boolean DeleteMember(String stunum) {
        synchronized (this) {
            QueryWrapper<Members> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("stunum",stunum);
            int judgeflag = membersMapper.delete(queryWrapper);
            if (judgeflag == 0) return false;
            return true;
        }
    }

    @Override
    public int MembersStatistics() {
        synchronized (this){
            int sum=membersMapper.selectCount(null);
            return sum;
        }
    }

//有用
    @Override
    public int MembersStatisticsByasname(String asname){
        synchronized (this){
            QueryWrapper<Members> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("associationname",asname);
            int total = membersMapper.selectCount(queryWrapper);
            return total;
        }
    }
}
