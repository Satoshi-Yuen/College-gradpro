package com.graduationproject.community_management.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.Version;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @description: 加入社团报名信息实体类
 * @author: Satoshi-Yuen
 * @time: 2021/2/21
 */
@Data
@AllArgsConstructor
@ToString
@NoArgsConstructor
@TableName("JoinAssociation")
public class JoinAssociation {
    @TableId(type = IdType.AUTO,value = "id")
    private Integer id;                                      //序号
    private String stunum;                                //学生学号
    private String stuname;                               //学生姓名
    private String stusex;                                //学生性别
    private String stugrade;                              //学生所在年级
    private String stuprofessclass;                       //学生专业班级
    private String stucollege;                            //学生所在学院
    private String associationname;                       //学生报名的社团名称
    private String commdepartment;                        //报名社团部门 1-干事才有 2-会员则无
    private String commstate;                             //入会身份 1-干事 2-会员
    private String stutele;                               //学生联系方式
    private String registertime;                          //报名时间
    @Version
    private Integer version;                              //乐观锁标志
}
