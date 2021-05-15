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
 * @description: 人员登录信息实体类
 * @author: Satoshi-Yuen
 * @time: 2021/2/21
 */
@Data
@AllArgsConstructor
@ToString
@NoArgsConstructor
@TableName("logintable")
public class LoginTable {
    @TableId(type = IdType.AUTO,value = "id")
    private Integer id;                                      //序号
    private String stunum;                                   //学生学号
    private String username;                                 //学生姓名
    private String stusex;                                      //学生性别
    private String stugrade;                                 //学生年级
    private String stucollege;                               //学生所在学院
    private String stutele;                                  //学生联系方式
    private String stuprofessclass;                          //学生所在班级
    private String password;                                 //登录密码
    private int role;                                        //登录角色 1-学生社团内部管理员 2-社联管理员 3-领导管理员 4-普通学生（包括干事、会员、非会员）
    private int jurisdiction;                                //登录权限 1-有权限 0-无权限（只有管理员有权限进入管理系统）
    private String department;                               //所在部门
    private String title;                                    //职称
    private String groupcom;                                 //所在团体
    @Version
    private Integer version;                                 //乐观锁标志
}
