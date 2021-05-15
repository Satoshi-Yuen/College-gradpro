package com.graduationproject.community_management.ServicesImpl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.graduationproject.community_management.Mappers.LoginTableMapper;
import com.graduationproject.community_management.Services.LoginTableService;
import com.graduationproject.community_management.entity.LoginTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @description: 登录人员信息业务逻辑层接口实现
 * @author: Satoshi-Yuen
 * @time: 2021/2/22
 */
@Service
public class LoginTableServiceImpl implements LoginTableService {

    @Autowired
    LoginTableMapper loginTableMapper;

    @Override
    public boolean CreateLoginMes(LoginTable loginTable) {
        synchronized (this){
            int judgeflag=loginTableMapper.insert(loginTable);
            if(judgeflag==0) return false;
            return true;
        }
    }

    @Override
    public List<LoginTable> ReadLoginMess() {
        synchronized (this){
            List<LoginTable>loginTableslist = loginTableMapper.selectList(null);
            return loginTableslist;
        }
    }

//    有用
    @Override
    public LoginTable ReadLoginMessBystunum(String stunum){
        synchronized (this){
            QueryWrapper<LoginTable> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("stunum",stunum);
            LoginTable loginTable = loginTableMapper.selectOne(queryWrapper);
            return loginTable;
        }
    }

    @Override
    public boolean UpdateLoginMes(LoginTable loginTable) {
        LoginTable lt = loginTableMapper.selectById(loginTable.getId());
        loginTable.setVersion(lt.getVersion());
        int judgeflag = loginTableMapper.updateById(loginTable);
        if(judgeflag == 0) return false;
        return true;
    }

    @Override
    public boolean DeleteLoginMes(Integer id) {
        synchronized (this){
            int judgeflag=loginTableMapper.deleteById(id);
            if(judgeflag==0) return false;
            return true;
        }
    }

    @Override
    public String ReadLoginPassword(String id){
        synchronized (this){
            QueryWrapper<LoginTable> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("stunum",id);
            LoginTable loginTable = loginTableMapper.selectOne(queryWrapper);
            return loginTable.getPassword();
        }
    }

    @Override
    public int ReadLoginRole(String id){
        synchronized (this){
            QueryWrapper<LoginTable> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("stunum",id);
            LoginTable loginTable = loginTableMapper.selectOne(queryWrapper);
            return loginTable.getRole();
        }
    }

    @Override
    @Transactional
    public int SetRoles(List<LoginTable> loginTableList){
        synchronized (this){
            int flagnum = 0;
            for(LoginTable loginTable:loginTableList){
                if(loginTable.getStunum() != null&&!"".equals(loginTable.getStunum())) {
                    int flag = loginTableMapper.UpdateRoleByStunum(loginTable.getRole(), loginTable.getStunum());
                    if(flag > 0){
                        flagnum = 1;
                    }
                }
            }
            return flagnum;
        }
    }

    @Override
    @Transactional
    public int SetsinRoles(int role,String stunum){
        synchronized (this){
            int flagnum = 0;
            int flag = loginTableMapper.UpdateRoleByStunum(role,stunum);
            if(flag > 0){
                flagnum = 1;
            }
            return flagnum;
        }
    }
}
