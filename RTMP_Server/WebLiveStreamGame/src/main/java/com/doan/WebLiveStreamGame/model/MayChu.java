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
@Table(name = "tblMayChu")
public class MayChu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String linkServer;

    @NotNull
    private Long sokey;

    @NotBlank
    private String keymc;

    public MayChu(Long id, String linkServer, Long sokey, String keymc) {
        this.id = id;
        this.linkServer = linkServer;
        this.sokey = sokey;
        this.keymc = keymc;
    }

    public MayChu(String linkServer, String keymc) {
        this.linkServer = linkServer;
        this.keymc = keymc;
        this.sokey = 1L;
    }

    public MayChu() {
    }
}
