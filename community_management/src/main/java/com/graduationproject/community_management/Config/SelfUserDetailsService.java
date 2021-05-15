package com.graduationproject.community_management.Config;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.graduationproject.community_management.Mappers.LoginTableMapper;
import com.graduationproject.community_management.entity.LoginTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 *  ② 根据 username 获取数据库 user 信息
 */
//@Component
@Service("userDetailsService")
public class SelfUserDetailsService implements UserDetailsService {

    @Autowired
    private LoginTableMapper loginTableMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        QueryWrapper<LoginTable> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("stunum",username);
        LoginTable users = loginTableMapper.selectOne(queryWrapper);
        if(users == null){
            throw new UsernameNotFoundException("用户不存在!");
        }
        List<GrantedAuthority> galist = AuthorityUtils.commaSeparatedStringToAuthorityList("role");
        return new User(users.getStunum(),new BCryptPasswordEncoder().encode(users.getPassword()),galist);
    }
}
