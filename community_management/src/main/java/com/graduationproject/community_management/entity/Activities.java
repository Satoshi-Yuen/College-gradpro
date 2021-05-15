package com.graduationproject.community_management.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @description: 社团活动信息实体类
 * @author: Satoshi-Yuen
 * @time: 2021/2/21
 */
@Data
@AllArgsConstructor
@ToString
@NoArgsConstructor
@TableName("activities")
public class Activities {
    @TableId(type = IdType.AUTO,value = "id")
    private Integer id;                        //序号
    private String association;            //活动主办社团
    private String activityname;               //活动名
    private String activitydate;               //活动日期
    private String activitytime;               //活动时间
    private String activityplace;              //活动地点
    private String activitycount;              //活动报名人数
    private Integer activitystate;              //活动发布标志 1-已发布 0-已结束 2-未发布
    @Version
    private Integer version;                   //乐观锁标志
}
