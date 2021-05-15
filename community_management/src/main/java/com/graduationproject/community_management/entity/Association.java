package com.graduationproject.community_management.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @description: 社团信息实体类
 * @author: Satoshi-Yuen
 * @time: 2021/2/21
 */
@Data
@AllArgsConstructor
@ToString
@NoArgsConstructor
@TableName("association")
public class Association {
    @TableId(type = IdType.AUTO,value = "id")
    private Integer id;                                      //序号
    private String associationtype;                       //社团类别
    private String associationname;                       //社团名称
    private String associationengname;                    //社团英文名称
    private String associationmes;                        //社团介绍
    private String associationweibo;                      //社团微博
    private String associationofficial;                   //社团公众号
    private String associationbrand;                      //社团品牌活动
    private String associationslogan;                     //社团标语、宣传口号
    private String text;                                  //备注
    @Version
    private Integer version;                              //乐观锁标志
}
