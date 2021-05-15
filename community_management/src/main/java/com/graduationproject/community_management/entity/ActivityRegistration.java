package com.graduationproject.community_management.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @description: 学生活动报名信息实体类
 * @author: Satoshi-Yuen
 * @time: 2021/3/27
 */
@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@TableName("activityregistration")
public class ActivityRegistration {
    @TableId(type = IdType.AUTO,value = "id")
    private Integer id;                         //序号
    private String stunum;                      //学生学号
    private String stuname;                     //学生姓名
    private String stuprofessclass;                //学生所属专业班级
    private String stutele;                     //学生联系方式
    private String activityname;                //学生报名参加的活动
    private String associationname;             //活动所属社团
    private String activitydate;                //活动时间
    private String registertime;                //报名时间
    @Version
    private Integer version;                    //乐观锁标志
}
