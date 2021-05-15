package com.graduationproject.community_management.Services;

import com.graduationproject.community_management.entity.LoginTable;

import java.util.List;

/**
 * @description: 登录人员信息业务逻辑层接口
 * @author: Satoshi-Yuen
 * @time: 2021/2/21
 */
public interface LoginTableService {
    public boolean CreateLoginMes(LoginTable loginTable);
    public List<LoginTable> ReadLoginMess();
    public LoginTable ReadLoginMessBystunum(String stunum);
    public boolean UpdateLoginMes(LoginTable loginTable);
    public boolean DeleteLoginMes(Integer id);
    public String ReadLoginPassword(String id);
    public int ReadLoginRole(String id);
    public int SetRoles(List<LoginTable> loginTableList);
    public int SetsinRoles(int role,String stunum);
}
