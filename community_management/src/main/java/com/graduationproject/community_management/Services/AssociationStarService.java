package com.graduationproject.community_management.Services;

import com.graduationproject.community_management.entity.AssociationStar;

import java.util.List;

/**
 * @description: 社团星级评定得分
 * @author: Satoshi-Yuen
 * @time: 2021/4/1
 */
public interface AssociationStarService {
    public List<AssociationStar> TopTenAssociation();
    public List<AssociationStar> AllAssociationStar();
    public int ImportStarScoreData(List<AssociationStar> associationStarList);
}
