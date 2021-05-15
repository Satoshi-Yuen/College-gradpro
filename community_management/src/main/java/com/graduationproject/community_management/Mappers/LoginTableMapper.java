package com.graduationproject.community_management.Mappers;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.graduationproject.community_management.entity.LoginTable;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

/**
 * @description: 人员登录信息mapper接口
 * @author: Satoshi-Yuen
 * @time: 2021/2/21
 */
@Repository
public interface LoginTableMapper extends BaseMapper<LoginTable> {
    @Update("update logintable set role = #{role} where stunum = #{stunum}")
    public int UpdateRoleByStunum(@Param("role")Integer role,@Param("stunum")String stunum);
}
