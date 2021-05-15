package com.graduationproject.community_management.Services;

import com.graduationproject.community_management.entity.Members;

import java.util.List;

/**
 * @description: 社团会员信息业务逻辑层接口
 * @author: Satoshi-Yuen
 * @time: 2021/2/21
 */
public interface MembersService {
    public int CreateMember(Members member);
    public int CreateMembers(List<Members> memberlist);
    public List<Members> ReadMembersByAssociationname(String atname);
    public boolean UpdateMembers(Members member);
    public boolean DeleteMember(String stunum);
    public int MembersStatistics();
    public int MembersStatisticsByasname(String asname);
}
