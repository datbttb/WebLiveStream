package com.doan.WebLiveStreamGame.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Data
@Table(name = "tblTuongTac")
public class TuongTac {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user_id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "video_id", referencedColumnName = "id")
    private Video video_id;

    @NotNull
    private int trangThai;

    public TuongTac(Long id, User user, Video video, int trangThai) {
        this.id = id;
        this.user_id = user;
        this.video_id = video;
        this.trangThai = trangThai;
    }

    public TuongTac() {
    }
}
