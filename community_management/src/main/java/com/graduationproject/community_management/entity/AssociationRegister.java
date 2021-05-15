package com.graduationproject.community_management.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

/**
 * @description:
 * @author: Satoshi-Yuen
 * @time: 2021/4/11
 */
@Data
@TableName("associationregister")
public class AssociationRegister {
    @TableId(type = IdType.AUTO,value = "id")
    private Integer id;
    private String auditassociation;
    private String stunum;
    private String stuname;
    private String stutele;
    private String filename;
    private String uploadtime;
    private Integer flag;
    @Version
    @TableField(fill = FieldFill.INSERT)
    private Integer version;                   //乐观锁标志
}
