package com.graduationproject.community_management;

import com.graduationproject.community_management.Mappers.ActivitiesMapper;
import com.graduationproject.community_management.Services.ActivitiesService;
import com.graduationproject.community_management.entity.Activities;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;

@SpringBootApplication
@MapperScan(basePackages = {"com.graduationproject.community_management.Mappers"})
public class CommunitymanagementApplication {

    @Autowired
    ActivitiesMapper activitiesMapper;
    @Autowired
    static ActivitiesService activitiesService;

    public static void main(String[] args){
        SpringApplication.run(CommunitymanagementApplication.class, args);
//        List<Activities> aclist = activitiesService.ReadActivities();
//        for(Activities activity:aclist){
//            String month = activity.getActivitydate().substring(0,2);
//            String day = activity.getActivitydate().substring(3,5);
//            String year = activity.getActivitydate().substring(6);
//        }
    }

}
