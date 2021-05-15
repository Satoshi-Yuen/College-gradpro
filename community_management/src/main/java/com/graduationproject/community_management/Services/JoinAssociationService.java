package com.graduationproject.community_management.Services;

import com.graduationproject.community_management.entity.JoinAssociation;

import java.util.List;

/**
 * @description: 报名加入社团信息业务逻辑层接口
 * @author: Satoshi-Yuen
 * @time: 2021/2/21
 */
public interface JoinAssociationService {
    public boolean CreateJoinAssociation(JoinAssociation joinAssociation);
    public List<JoinAssociation> ReadJoinAssociation();
    public List<JoinAssociation> ReadJoinAssociationBystunum(String stunum,String state);
    public List<JoinAssociation> ReadJoinAssociationByStatus(String atname,int status);
    public boolean UpdateJoinAssociation(JoinAssociation joinAssociation);
    public boolean DeleteJoinAssociation(Integer id);
    public int CancelJoinAssociation(String stunum,String associationname,String commdepartment);
}
