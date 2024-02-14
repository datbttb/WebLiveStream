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
@Table(name = "tblBaoCao")
public class BaoCao {

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
    private String noiDung;

    @NotNull
    private int trangThaiBC;

    @NotNull
    private Date ngayBaoCao;

    public BaoCao() {
    }

}
