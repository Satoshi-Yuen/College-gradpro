package com.graduationproject.community_management.entity;

/**
 * @description:
 * @author: Satoshi-Yuen
 * @time: 2021/4/1
 */

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.Version;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("associationstar")
public class AssociationStar {
    @TableId(type = IdType.AUTO,value = "id")
    private Integer id;                       //序号
    private String associationname;           //协会名称
    private int sum;                          //总分
    private int constructionscore;
    private int activityscore;
    private int managescore;
    private int stuscore;
    private int teascore;
    private int additionalscore;
    private int annualshowscore;
}
