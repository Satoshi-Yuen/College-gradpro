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
 * @description:
 * @author: Satoshi-Yuen
 * @time: 2021/4/1
 */
@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@TableName("associationdept")
public class AssociationDept {
    @TableId(type = IdType.AUTO,value = "id")
    private Integer id;                          //序号
    private String associationname;              //社团名称
    private String department;                   //社团部门
    private String departmentcontent;            //社团部门职能
    @Version
    private Integer version;                     //乐观锁标志
}
