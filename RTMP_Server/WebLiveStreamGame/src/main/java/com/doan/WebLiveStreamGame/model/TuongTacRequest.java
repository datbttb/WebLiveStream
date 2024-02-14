package com.doan.WebLiveStreamGame.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class TuongTacRequest {

    @NotBlank
    private String username;

    @NotBlank
    private String url;

    @NotNull
    private int trangThai;

}

