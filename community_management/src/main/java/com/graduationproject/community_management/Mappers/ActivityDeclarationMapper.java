package com.graduationproject.community_management.Mappers;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.graduationproject.community_management.entity.ActivityDeclaration;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;

/**
 * @description: 社团活动申报信息mapper接口
 * @author: Satoshi-Yuen
 * @time: 2021/2/21
 */
public interface ActivityDeclarationMapper extends BaseMapper<ActivityDeclaration> {

    @Insert("insert into activitydeclaration(association, activityname, activitydate, activitystarttime, " +
            "activityendtime, activityplace, declarefile, declarecontent, declaretime, flag) " +
            "values(#{activityDeclaration.association},#{activityDeclaration.activityname},#{activityDeclaration.activitydate},#{activityDeclaration.activitystarttime},#{activityDeclaration.activityendtime}" +
            ",#{activityDeclaration.activityplace},#{activityDeclaration.declarefile},#{activityDeclaration.declarecontent},#{activityDeclaration.declaretime},#{activityDeclaration.flag})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    public void insertreturnid(@Param("activityDeclaration") ActivityDeclaration activityDeclaration);
}
