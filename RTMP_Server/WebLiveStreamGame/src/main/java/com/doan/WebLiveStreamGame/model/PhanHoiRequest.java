package com.doan.WebLiveStreamGame.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class PhanHoiRequest {

    @NotBlank
    private String username;

    @NotNull
    private String urlVideo;

    @NotBlank
    private String phanHoi;

    @NotBlank
    private int trangThaiPH;

    private Date ngayPhanHoi;
}
