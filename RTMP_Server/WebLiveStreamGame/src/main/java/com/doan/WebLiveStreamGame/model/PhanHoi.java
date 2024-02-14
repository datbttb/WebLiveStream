package com.doan.WebLiveStreamGame.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@Data
@Table(name = "tblPhanHoi")
public class PhanHoi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user_id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "video_id", referencedColumnName = "id")
    private Video video_id;

    @NotBlank
    private String phanHoi;

    @NotNull
    private int trangThaiPH;

    @NotNull
    private Date ngayPhanHoi;
    public PhanHoi(Long id, User user_id, Video video_id, String phanHoi, int trangThaiPH) {
        this.id = id;
        this.user_id = user_id;
        this.video_id = video_id;
        this.phanHoi = phanHoi;
        this.trangThaiPH = trangThaiPH;
    }

    public PhanHoi() {
    }
}
