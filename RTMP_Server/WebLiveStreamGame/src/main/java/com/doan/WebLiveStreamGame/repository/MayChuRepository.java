package com.doan.WebLiveStreamGame.repository;

import com.doan.WebLiveStreamGame.model.MayChu;
import com.doan.WebLiveStreamGame.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MayChuRepository extends JpaRepository<MayChu, Long> {
}
