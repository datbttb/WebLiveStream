package com.doan.WebLiveStreamGame.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@Data
@Table(name = "tblVideo")
public class Video {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @NotNull
    private Long views;

    @NotNull
    private Date date;

    private String url;

    @NotNull
    private int trangThai;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "key_id", referencedColumnName = "id")
    private StreamKey key_id;

    public Video(Long id, String name, Long views, Date date, String url, StreamKey streamKey) {
        this.id = id;
        this.name = name;
        this.views = views;
        this.date = date;
        this.url = url;
        this.key_id = streamKey;
    }

    public Video() {
    }
}
