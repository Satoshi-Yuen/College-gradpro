package com.graduationproject.community_management.Services;

import com.graduationproject.community_management.entity.ActivityRegistration;

import java.util.List;

/**
 * @description: 社团活动暴民信息业务逻辑层接口
 * @author: Satoshi-Yuen
 * @time: 2021/2/21
 */
public interface ActivityRegistrationService {
    public boolean CreateActivityRegistration(ActivityRegistration activityRegistration);
    public List<ActivityRegistration> ReadActivityRegistration(String atname);
    public List<ActivityRegistration> ReadActivityRegistrationBystunum(String stunum);
    public boolean UpdateActivityRegistration(ActivityRegistration activityRegistration);
    public boolean DeleteActivityRegistration(Integer id);
    public int cancelActivityRegistration(String stuno,String acname,String asname);
}
