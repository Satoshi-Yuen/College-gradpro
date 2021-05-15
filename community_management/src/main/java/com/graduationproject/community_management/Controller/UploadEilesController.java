package com.graduationproject.community_management.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.Map;

/**
 * @description: 测试控制器
 * @author: Satoshi-Yuen
 * @time: 2021/2/22
 */
@RestController
public class UploadEilesController {

    @RequestMapping(value="/association_manager/UploadEiles/fileupload")
    public int testfileup(HttpServletRequest request){
        // 解析出文件存放路径位置
        String filepath = request.getParameter("filepath");
        String fileName = null;
        int uploadflag = 1;
        MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest) request;
        Map<String, MultipartFile> fileMap = multipartHttpServletRequest.getFileMap();
        for (Map.Entry<String, MultipartFile> entity : fileMap.entrySet()){
            MultipartFile mf = entity.getValue();
            fileName = mf.getOriginalFilename();
            String fileType = fileName.substring(fileName.lastIndexOf('.'));
            try {
                // 截取上传的文件名称
                String newFileName = fileName.substring(0, fileName.lastIndexOf('.'));
                // 拼接上传文件位置
                String newfilePath = filepath + File.separatorChar + newFileName + fileType;
                // 创建文件存放路径实例
                File dest = new File(filepath);
                // 判断文件夹不存在就创建
                if (!dest.exists()) {
                    dest.mkdirs();
                }
                // 创建文件实例
                File uploadFile = new File(newfilePath);
                // 判断文件已经存在，则删除该文件
                if (uploadFile.exists()) {
                    uploadFile.delete();
                }
                // 利于spring中的FileCopyUtils.copy()将文件复制
                FileCopyUtils.copy(mf.getBytes(), uploadFile);
                // 将文件路径存入list集合中
            } catch (IOException e) {
                uploadflag = 0;
                e.printStackTrace();
            }
        }
        return uploadflag;
    }
}
