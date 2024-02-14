package com.doan.WebLiveStreamGame.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class BaoCaoRequest {

    @NotBlank
    private String username;

    @NotNull
    private String urlVideo;

    @NotBlank
    private String noiDung;

    @NotBlank
    private int trangThaiBC;

    private Date ngayBaoCao;
}
