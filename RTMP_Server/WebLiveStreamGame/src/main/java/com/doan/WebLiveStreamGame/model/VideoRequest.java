package com.doan.WebLiveStreamGame.model;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class VideoRequest {

    @NotBlank
    private String name;

    @NotBlank
    private Long views;

    @NotBlank
    private String date;

    private String url;

    private String username;

    private int trangThai;
}
