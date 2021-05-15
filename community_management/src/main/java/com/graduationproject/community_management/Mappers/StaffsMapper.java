package com.graduationproject.community_management.Mappers;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.graduationproject.community_management.entity.Staffs;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;

/**
 * @description: 社团骨干信息mapper接口
 * @author: Satoshi-Yuen
 * @time: 2021/2/21
 */
public interface StaffsMapper extends BaseMapper<Staffs> {
//    @Insert("insert into staffs(stunum,stuname,stusex,stugrade,stucollege,stuprofessclass,associationname,department,title,stutele,term) values(#{staff.stunum},#{staff.stuname},#{staff.stusex},#{staff.stugrade},#{staff.stucollege}," +
//            "#{staff.stuprofessclass},#{staff.associationname},#{staff.department},#{staff.title},#{staff.stutele},#{staff.term})")
//    @Options(useGeneratedKeys = true, keyProperty = "id")
//    public int insertstaff(@Param("staff")Staffs staff);
}
