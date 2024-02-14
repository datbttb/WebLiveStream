package com.doan.WebLiveStreamGame.controlller;


import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("upfile")
@RequiredArgsConstructor
@CrossOrigin
public class FileUploadController {

    private String uploadDir = "imgs/";

    @PostMapping("upimage")
    public ResponseEntity<String> handleFileUpload(@RequestParam("customFileName") String customFileName,@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return new ResponseEntity<>("Please select a file to upload.", HttpStatus.BAD_REQUEST);
        }

        // Kiểm tra xem thư mục đã tồn tại chưa, nếu chưa thì tạo mới
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }
        try {
            String fileName = customFileName+".jpg";
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            file.transferTo(new File(directory.getAbsolutePath(),fileName));
            return new ResponseEntity<>("File uploaded successfully: " + fileName, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to upload the file.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("getimg/{imageName}")
    @ResponseBody
    public ResponseEntity<Resource> getImage(@PathVariable String imageName) throws IOException {
        File directory = new File(uploadDir);
        // Đường dẫn đến thư mục chứa ảnh trong dự án
        String imagePath = directory.getAbsolutePath();
        Path path = Paths.get(imagePath).resolve(imageName);

        // Tạo một đối tượng Resource từ đường dẫn
        Resource resource = new org.springframework.core.io.PathResource(path);

        // Trả về ảnh dưới dạng ResponseEntity
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, "image/*")
                .body(resource);
    }
}
