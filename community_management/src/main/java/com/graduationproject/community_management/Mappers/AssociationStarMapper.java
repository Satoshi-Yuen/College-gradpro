package com.graduationproject.community_management.Mappers;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.graduationproject.community_management.entity.AssociationStar;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * @description: 星级评定得分
 * @author: Satoshi-Yuen
 * @time: 2021/4/1
 */
public interface AssociationStarMapper extends BaseMapper<AssociationStar> {
    @Select("select * from associationstar order by sum desc limit 10")
    public List<AssociationStar> TopTenAssociationStar();
}
