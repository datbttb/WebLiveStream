package com.doan.WebLiveStreamGame.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Data
@Table(name = "tblKenhDangKy")
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "follow_id", referencedColumnName = "id")
    private User follow_id;

    @ManyToOne
    @JoinColumn(name = "following_id", referencedColumnName = "id")
    private User following_id;
}
