package com.doan.WebLiveStreamGame.controlller;


import com.doan.WebLiveStreamGame.model.MayChu;
import com.doan.WebLiveStreamGame.service.MayChuService;
import com.doan.WebLiveStreamGame.service.impl.MayChuServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("maychu")
@RequiredArgsConstructor
@CrossOrigin
public class MayChuController {

    private final MayChuServiceImpl mayChuService;

    @PostMapping("/themmaychu")
    public ResponseEntity<?> themMayChu(@RequestBody MayChu mayChu){
        mayChuService.save(mayChu);
        return ResponseEntity.ok().body("May chu da duoc luu");
    }

    @GetMapping("/get/{idmaychu}")
    public ResponseEntity<?> layThongTinMayChu(@PathVariable(name = "idmaychu") String idmaychu){
        MayChu mayChu = mayChuService.getMayChu(Long.parseLong(idmaychu));
        return new ResponseEntity<>(mayChu, HttpStatus.OK);
    }

    @PutMapping("/suamaychu")
    public ResponseEntity<?> suaMayChu(@RequestBody MayChu mayChu){
        mayChuService.update(mayChu);
        return ResponseEntity.ok().body("May chu da duoc sua");
    }

}
