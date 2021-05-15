package com.graduationproject.community_management.Services;

import com.graduationproject.community_management.entity.Activities;

import java.util.List;

/**
 * @description: 社团活动信息业务逻辑层接口
 * @author: Satoshi-Yuen
 * @time: 2021/2/21
 */
public interface ActivitiesService {
    public int CreateActivity(Activities activity);
    public List<Activities> ReadActivities();
    public List<Activities> ReadActivitiesRelease();
    public List<Activities> ReadActivitiesReleasebyname(String asname);
    public int UpdateActivityByactivityname(Integer acname);
    public int UpdateActivity(Integer id,Integer flag);
    public int UpdateActivityByactivitynameAndassociationname(String acname,String asname);
    public boolean DeleteActivity(Integer id);
    public int ActivitiesStatics();
    public int ActivitiesStaticsByasname(String asname);
}
