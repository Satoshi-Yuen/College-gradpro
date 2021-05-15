package com.graduationproject.community_management.Mappers;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.graduationproject.community_management.entity.Members;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;

/**
 * @description: 社团会员信息mapper接口
 * @author: Satoshi-Yuen
 * @time: 2021/2/21
 */
public interface MembersMapper extends BaseMapper<Members> {
//    @Insert("insert into members(stunum,stuname,stusex,stugrade,stucollege,stuprofessclass,stutele,associationname,term) values(#{member.stunum},#{member.stuname},#{member.stusex},#{member.stugrade},#{member.stucollege}," +
//            "#{member.stuprofessclass},#{member.stutele},#{member.associationname},#{member.term})")
//    @Options(useGeneratedKeys = true, keyProperty = "id", keyColumn = "id")
//    public int insertmember(@Param("member") Members member);
}
