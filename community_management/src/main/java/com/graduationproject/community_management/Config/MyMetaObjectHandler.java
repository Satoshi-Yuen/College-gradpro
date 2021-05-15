package com.graduationproject.community_management.Config;

import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.stereotype.Component;

/**
 * @description: 自动填充字段自定义实现类
 * @author: Satoshi-Yuen
 * @time: 2021/4/13
 */
@Component
public class MyMetaObjectHandler implements MetaObjectHandler {

    @Override
    public void insertFill(MetaObject metaObject) {
        // 获取公共字段的值
        Object fieldValue = getFieldValByName("version", metaObject);
        // 判断是否为空,如果为空则进行填充
        if (fieldValue == null) {
            System.err.println("====满足填充条件====");
            setFieldValByName("version", 1, metaObject);
        }
    }

    @Override
    public void updateFill(MetaObject metaObject) {

    }
}
