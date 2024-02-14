package com.doan.WebLiveStreamGame.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Data
@Table(name = "tblRole")
public class Role {
    @Id
    @SequenceGenerator(
            name = "role_sequence",
            allocationSize = 1
    )
    @GeneratedValue(strategy = GenerationType.AUTO,
    generator = "roles_sequence")
    private Long id;
    @Column(length = 60)
    private String name;

    public Role(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Role() {

    }
}
