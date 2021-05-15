package com.graduationproject.community_management.Services;

import com.graduationproject.community_management.entity.Staffs;

import java.util.List;

/**
 * @description: 社团骨干信息业务逻辑层接口
 * @author: Satoshi-Yuen
 * @time: 2021/2/21
 */
public interface StaffsService {
    public int CreateStaff(Staffs staff);
    public int CreateStaffs(List<Staffs> staffsList);
    public List<Staffs> ReadStaffsByAssociationname(String atname);
    public boolean UpdateStaff(Staffs staff);
    public boolean DeleteStaff(String stunum);
    public int StaffsStatistics();
    public int StaffsStatisticsByasname(String asname);
    public Staffs ReadStaffsBystuno(String stuno);
}
