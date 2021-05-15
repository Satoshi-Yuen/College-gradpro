package com.graduationproject.community_management.Mappers;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.graduationproject.community_management.entity.Activities;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

/**
 * @description: 社团活动信息mapper接口
 * @author: Satoshi-Yuen
 * @time: 2021/2/21
 */
public interface ActivitiesMapper extends BaseMapper<Activities> {

    @Update("update activities set activitystate = 1 where id = #{acname}")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    public int UpdateActivityByState(@Param("acname")Integer name);

    @Update("update activities set activitystate = 1 where association = #{asname} and activityname = #{acname}")
    public int UpdateActivityByasnameAndacname(@Param("asname")String asname,
                                                   @Param("acname")String acname);

    @Select("select id from activities where associationname = #{asname} and activityname = #{acname}")
    public int SelectActivityIdbyByasnameAndacname(@Param("asname")String asname,
                                                   @Param("acname")String acname);

}
