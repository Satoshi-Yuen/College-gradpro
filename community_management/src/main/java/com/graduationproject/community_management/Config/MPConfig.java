package com.graduationproject.community_management.Config;

import com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.OptimisticLockerInnerInterceptor;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @description: 乐观锁插件
 * @author: Satoshi-Yuen
 * @time: 2021/4/12
 */

@Configuration
@MapperScan("com.graduationproject.community_management.Mappers")
public class MPConfig {

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor mybatisPlusInterceptor = new MybatisPlusInterceptor();
        mybatisPlusInterceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor());
        return mybatisPlusInterceptor;
    }

//    public GlobalConfiguration globalConfiguration(){
//
//    }
//    // MP 全局配置，更多内容进入类看注释
//    GlobalConfiguration globalConfig = new GlobalConfiguration();
//    //配置公共字段自动填写
//    globalConfig.setMetaObjectHandler(new MyMetaObjectHandler());
}
