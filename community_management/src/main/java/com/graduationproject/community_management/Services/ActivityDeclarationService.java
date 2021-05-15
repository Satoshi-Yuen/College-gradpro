package com.graduationproject.community_management.Services;


import com.graduationproject.community_management.entity.ActivityDeclaration;

import java.util.List;

/**
 * @description: 社团活动申报信息业务逻辑层接口
 * @author: Satoshi-Yuen
 * @time: 2021/2/21
 */
public interface ActivityDeclarationService {
    public int CreateActivityDeclaration(ActivityDeclaration activityDeclaration);
    public List<ActivityDeclaration> ReadActivityDeclarationByAssociation(String asname);
    public List<ActivityDeclaration> ReadActivityDeclarationByflag(Integer flag);
    public ActivityDeclaration ReadActivityDeclarationById(Integer id);
    public boolean UpdateActivityDeclaration(ActivityDeclaration activityDeclaration);
    public boolean AuditUpdateActivityDeclaration(Integer id,Integer flag);
    public boolean DeleteActivityDeclaration(Integer id);
}
