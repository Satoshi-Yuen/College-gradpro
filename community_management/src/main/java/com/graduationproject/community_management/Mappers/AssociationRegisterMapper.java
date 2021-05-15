package com.graduationproject.community_management.Mappers;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.graduationproject.community_management.entity.AssociationRegister;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;

/**
 * @description:
 * @author: Satoshi-Yuen
 * @time: 2021/4/11
 */
public interface AssociationRegisterMapper extends BaseMapper<AssociationRegister> {
//    @Insert("insert into associationregister(stunum,stuname,stutele,filename,uploadtime,flag) " +
//            "values(#{associationRegister.stunum},#{associationRegister.stuname},#{associationRegister.stutele}," +
//            "#{associationRegister.filename},#{associationRegister.uploadtime},#{associationRegister.flag})")
//    @Options(useGeneratedKeys = true, keyProperty = "id")
//    public int InsertRegistermess(@Param("associationRegister")AssociationRegister associationRegister);
}
