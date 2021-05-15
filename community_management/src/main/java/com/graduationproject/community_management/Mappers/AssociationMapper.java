package com.graduationproject.community_management.Mappers;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.graduationproject.community_management.entity.Association;
import org.apache.ibatis.annotations.Select;

/**
 * @description: 社团信息mapper接口
 * @author: Satoshi-Yuen
 * @time: 2021/2/21
 */
public interface AssociationMapper extends BaseMapper<Association> {
    @Select("select count(distinct associationtype) from association")
    public int astypestatics();
}
