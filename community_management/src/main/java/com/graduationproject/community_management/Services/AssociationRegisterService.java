package com.graduationproject.community_management.Services;

import com.graduationproject.community_management.entity.AssociationRegister;

import java.util.List;

/**
 * @description:
 * @author: Satoshi-Yuen
 * @time: 2021/4/11
 */
public interface AssociationRegisterService {
    public int CreateRegisterMessage(AssociationRegister associationRegister);
    public List<AssociationRegister> ReadAllAssociationRegister();
    public List<AssociationRegister> ReadAllAssociationRegisterBystunum(String stunum);
    public int UpdateRegister(Integer id,int flag);
}
