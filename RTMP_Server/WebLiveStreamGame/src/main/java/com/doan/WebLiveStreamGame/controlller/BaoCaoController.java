package com.doan.WebLiveStreamGame.controlller;


import com.doan.WebLiveStreamGame.model.BaoCao;
import com.doan.WebLiveStreamGame.model.BaoCaoRequest;
import com.doan.WebLiveStreamGame.model.User;
import com.doan.WebLiveStreamGame.model.Video;
import com.doan.WebLiveStreamGame.service.impl.BaoCaoServiceImpl;
import com.doan.WebLiveStreamGame.service.impl.UserServiceImpl;
import com.doan.WebLiveStreamGame.service.impl.VideoServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("baocao")
@RequiredArgsConstructor
@CrossOrigin
public class BaoCaoController {

    @Autowired
    private BaoCaoServiceImpl baoCaoService;

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    protected VideoServiceImpl videoService;

    @PostMapping("add-bao-cao")
    public ResponseEntity<?> addBaoCao(@RequestBody BaoCaoRequest baoCaoRequest){
        User user = userService.findByUsername(baoCaoRequest.getUsername()).stream().toList().get(0);
        Video video = videoService.getVideoByUrl(baoCaoRequest.getUrlVideo());
        BaoCao baoCao = new BaoCao();
        baoCao.setNoiDung(baoCaoRequest.getNoiDung());
        baoCao.setUser_id(user);
        baoCao.setVideo_id(video);
        baoCao.setTrangThaiBC(baoCaoRequest.getTrangThaiBC());
        baoCao.setNgayBaoCao(baoCaoRequest.getNgayBaoCao());
        baoCaoService.saveBaoCao(baoCao);
        return ResponseEntity.ok().body("Bao cao da duoc luu");

    }

    @GetMapping("get-bao-cao/all")
    public ResponseEntity<?> getAllBaoCao(){
        return new ResponseEntity<>(baoCaoService.getBaoCaoAll(), HttpStatus.OK);
    }

    @GetMapping("get-bc-by-username/{username}")
    public ResponseEntity<?> getBaoCaoByUserName(@PathVariable (name = "username") String username){
        return new ResponseEntity<>(baoCaoService.getBaoCaoByUser(username), HttpStatus.OK);
    }

    @GetMapping("get-bc-by-videoname/{videoname}")
    public ResponseEntity<?> getBaoCaoByVideoname(@PathVariable (name = "videoname") String videoname){
        return new ResponseEntity<>(baoCaoService.getBaoCaoByVideoName(videoname), HttpStatus.OK);
    }

    @GetMapping("get-bc-by-trangThaiBC/{trangThaiBC}")
    public ResponseEntity<?> getBaoCaoByTrangThaiPH(@PathVariable (name = "trangThaiBC") int trangThaiBC){
        return new ResponseEntity<>(baoCaoService.getBaoCaoByTrangThaiBC(trangThaiBC), HttpStatus.OK);
    }

    @PutMapping("update-trang-thai")
    public ResponseEntity<?> updateTrangThaiBC(@RequestParam (name = "idbc") String idbc, @RequestParam (name = "trangthaibc") String trangthaibc){
        baoCaoService.updateTrangThaiBaoCao(Long.parseLong(idbc), Integer.parseInt(trangthaibc));
        return ResponseEntity.ok().body("update thanh cong");
    }

    @DeleteMapping("delete-bao-cao")
    public ResponseEntity<?> deleteBaoCao(@RequestParam (name = "idbc") String idbc){
        baoCaoService.deleteBaoCao(Long.parseLong(idbc));
        return ResponseEntity.ok().body("xoa thanh cong");
    }

    @GetMapping("search-bao-cao-trang-thai")
    public ResponseEntity<?> searchBaoCaoTrangThai(@RequestParam (name = "kw") String kw, @RequestParam (name = "trangThai") int trangThai){
        if(trangThai == -1){
            return new ResponseEntity<>(baoCaoService.getBaoCaoByVideoName(kw), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(baoCaoService.searchBaoCaoByTrangThai(kw,trangThai), HttpStatus.OK);
        }
    }
}
