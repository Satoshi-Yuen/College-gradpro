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
 * @description: 会员信息实体类
 * @author: Satoshi-Yuen
 * @time: 2021/2/21
 */
@Data
@AllArgsConstructor
@ToString
@NoArgsConstructor
@TableName("members")
public class Members {
    @TableId(type = IdType.AUTO,value = "id")
    private Integer id;                                      //序号
    private String stunum;                                //学生学号
    private String stuname;                               //学生姓名
    private String stusex;                                //学生性别
    private String stugrade;                              //学生年级
    private String stucollege;                            //学生所在学院
    private String stuprofessclass;                       //学生所在专业班级
    private String stutele;                               //学生联系方式
    private String associationname;                       //学生所在社团
    private String term;                                  //身份到期日期
    @Version
    private Integer version;                              //乐观锁标志

}
