package com.graduationproject.community_management.Services;

import com.graduationproject.community_management.entity.Association;

import java.util.List;

/**
 * @description: 社团信息业务逻辑层接口
 * @author: Satoshi-Yuen
 * @time: 2021/2/21
 */
public interface AssociationService {
    public boolean CreateAssociation(Association association);
    public List<Association> ReadAssociation();
    public boolean UpdateAssociation(Association association);
    public boolean DeleteAssociation(Integer id);
    public Association ReadOnlyAssociationData(String aname);
    public int AssociationStatics();
    public int AssociationTypeStatics();
}
