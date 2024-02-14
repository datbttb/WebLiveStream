package com.doan.WebLiveStreamGame.controlller;

import com.doan.WebLiveStreamGame.model.PhanHoi;
import com.doan.WebLiveStreamGame.model.PhanHoiRequest;
import com.doan.WebLiveStreamGame.model.User;
import com.doan.WebLiveStreamGame.model.Video;
import com.doan.WebLiveStreamGame.service.PhanHoiService;
import com.doan.WebLiveStreamGame.service.impl.PhanHoiServiceImpl;
import com.doan.WebLiveStreamGame.service.impl.UserServiceImpl;
import com.doan.WebLiveStreamGame.service.impl.VideoServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("phanhoi")
@RequiredArgsConstructor
@CrossOrigin
public class PhanHoiController {

    @Autowired
    private PhanHoiServiceImpl phanHoiService;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private VideoServiceImpl videoService;

    @PostMapping("add-phan-hoi")
    public ResponseEntity<?> addPhanHoi(@RequestBody PhanHoiRequest phanHoiRequest){
        User user = userService.findByUsername(phanHoiRequest.getUsername()).stream().toList().get(0);
        Video video = videoService.getVideoByUrl(phanHoiRequest.getUrlVideo());
        PhanHoi phanHoi =new PhanHoi();
        phanHoi.setPhanHoi(phanHoiRequest.getPhanHoi());
        phanHoi.setUser_id(user);
        phanHoi.setVideo_id(video);
        phanHoi.setTrangThaiPH(phanHoiRequest.getTrangThaiPH());
        phanHoi.setNgayPhanHoi(phanHoiRequest.getNgayPhanHoi());
        phanHoiService.savePhanHoi(phanHoi);
        return ResponseEntity.ok().body("Phan hoi da duoc luu");
    }

    @GetMapping("get-phan-hoi/all")
    public ResponseEntity<?> getAllPhanHoi(){
        return new ResponseEntity<>(phanHoiService.getPhanHoiAll(), HttpStatus.OK);
    }

    @GetMapping("get-ph-by-username/{username}")
    public ResponseEntity<?> getPhanHoiByUserName(@PathVariable (name = "username") String username){
        return new ResponseEntity<>(phanHoiService.getPhanHoiByUser(username), HttpStatus.OK);
    }

    @GetMapping("get-ph-by-videoname/{videoname}")
    public ResponseEntity<?> getPhanHoiByVideoname(@PathVariable (name = "videoname") String videoname){
        return new ResponseEntity<>(phanHoiService.getPhanHoiByVideoName(videoname), HttpStatus.OK);
    }

    @GetMapping("get-ph-by-trangThaiPH/{trangThaiPH}")
    public ResponseEntity<?> getPhanHoiByTrangThaiPH(@PathVariable (name = "trangThaiPH") int trangThaiPH){
        return new ResponseEntity<>(phanHoiService.getPhanHoiByTrangThaiPH(trangThaiPH), HttpStatus.OK);
    }

    @PutMapping("update-trang-thai")
    public ResponseEntity<?> updateTrangThaiPH(@RequestParam (name = "idph") String ipph, @RequestParam (name = "trangthaiph") String trangthaiph){
        phanHoiService.updateTrangThaiPhanHoi(Long.parseLong(ipph), Integer.parseInt(trangthaiph));
        return ResponseEntity.ok().body("update thanh cong");
    }

    @DeleteMapping("delete-phan-hoi")
    public ResponseEntity<?> deletePhanHoi(@RequestParam (name = "idph") String idph){
        phanHoiService.deletePhanHoi(Long.parseLong(idph));
        return ResponseEntity.ok().body("xoa thanh cong");
    }

}
