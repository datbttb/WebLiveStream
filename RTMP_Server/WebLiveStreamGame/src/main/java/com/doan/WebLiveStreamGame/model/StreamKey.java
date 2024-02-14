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
@Table(name = "tblStreamKey")
public class StreamKey {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String strkey;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user_id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "maychu_id", referencedColumnName = "id")
    private MayChu maychu_id;


    public StreamKey(Long id, String strkey, User user_id, MayChu maychu_id) {
        this.id = id;
        this.strkey = strkey;
        this.user_id = user_id;
        this.maychu_id = maychu_id;
    }

    public StreamKey() {
    }
}
