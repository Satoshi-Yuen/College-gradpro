package com.graduationproject.community_management.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @description: 社团活动申报信息实体类
 * @author: Satoshi-Yuen
 * @time: 2021/2/21
 */
@Data
@AllArgsConstructor
@ToString
@NoArgsConstructor
@TableName("activitydeclaration")
public class ActivityDeclaration {
    @TableId(type = IdType.AUTO,value = "id")
    private Integer id;                              //序号
    private String association;                   //申报活动的社团
    private String activityname;                  //申报活动名
    private String activitydate;                  //活动日期
    private String activitystarttime;             //活动开始时间
    private String activityendtime;               //活动结束时间
    private String activityplace;                 //活动地点
    private String declarefile;                   //申报文件
    private String declarecontent;                //活动内容概述
    private String declaretime;                   //申报时间
    private int flag;                             //审批状态 1-审批通过 0-审批未通过 2-审批中
    @Version
    private Integer version;                      //乐观锁标志
}
