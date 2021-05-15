package com.graduationproject.community_management.ServicesImpl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.graduationproject.community_management.Mappers.StaffsMapper;
import com.graduationproject.community_management.Services.StaffsService;
import com.graduationproject.community_management.entity.Activities;
import com.graduationproject.community_management.entity.Staffs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Stack;

/**
 * @description: 社团骨干信息业务逻辑层接口实现
 * @author: Satoshi-Yuen
 * @time: 2021/2/22
 */
@Service
public class StaffsServiceImpl implements StaffsService {

    @Autowired
    StaffsMapper staffsMapper;
    @Autowired
    private RedisTemplate<Object, Object> redisTemplate;

    @Override
    @Transactional
    public int CreateStaff(Staffs staff) {
        synchronized (this){
            int judgeflag = staffsMapper.insert(staff);
            return judgeflag;
        }
    }

    @Override
    @Transactional
    public int CreateStaffs(List<Staffs> staffsList){
        synchronized (this){
            for(Staffs staff:staffsList){
                QueryWrapper<Staffs>queryWrapper = new QueryWrapper<>();
                queryWrapper.eq("stunum",staff.getStunum());
                Staffs staffs = staffsMapper.selectOne(queryWrapper);
                if(staffs == null) staffsMapper.insert(staff);
                else{
                    staff.setId(staffs.getId());
                    staffsMapper.updateById(staff);
                }
            }
            return 1;
        }
    }

    @Override
    public List<Staffs> ReadStaffsByAssociationname(String atname) {
        RedisSerializer redisSerializer = new StringRedisSerializer();
        redisTemplate.setKeySerializer(redisSerializer);
        List<Staffs>staffslist = (List<Staffs>) redisTemplate.opsForValue().get("staffslist"+atname);
        synchronized (this){
            if(staffslist == null){
                QueryWrapper<Staffs> queryWrapper = new QueryWrapper<>();
                queryWrapper.eq("associationname",atname);
                staffslist = staffsMapper.selectList(queryWrapper);
                redisTemplate.opsForValue().set("staffslist"+atname,staffslist);
            }
            return staffslist;
        }
    }

    @Override
    @Transactional
    public boolean UpdateStaff(Staffs staff) {
        Staffs st = staffsMapper.selectById(staff.getId());
        staff.setVersion(st.getVersion());
        int judgeflag = staffsMapper.updateById(staff);
        if(judgeflag == 0) return false;
        return true;
    }

    @Override
    @Transactional
    public boolean DeleteStaff(String stunum) {
        synchronized (this){
            QueryWrapper<Staffs> queryWrapper = new QueryWrapper<>();
            queryWrapper
                    .eq("stunum",stunum);
            int judgeflag=staffsMapper.delete(queryWrapper);
            if(judgeflag==0) return false;
            return true;
        }
    }

    @Override
    public int StaffsStatistics() {
        synchronized (this){
            int sum=staffsMapper.selectCount(null);
            return sum;
        }
    }

    @Override
    public int StaffsStatisticsByasname(String asname){
        synchronized (this){
            QueryWrapper<Staffs> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("associationname",asname);
            int total = staffsMapper.selectCount(queryWrapper);
            return total;
        }
    }

    @Override
    public Staffs ReadStaffsBystuno(String stuno){
        RedisSerializer redisSerializer = new StringRedisSerializer();
        redisTemplate.setKeySerializer(redisSerializer);
        Staffs staffslist = (Staffs) redisTemplate.opsForValue().get("staffsstuno"+stuno);
        synchronized (this){
            if(staffslist == null){
                QueryWrapper<Staffs> queryWrapper = new QueryWrapper<>();
                queryWrapper
                        .eq("stunum",stuno);
                staffslist = staffsMapper.selectOne(queryWrapper);
                redisTemplate.opsForValue().set("staffsstuno"+stuno,staffslist);
            }

            return staffslist;
        }
    }
}
