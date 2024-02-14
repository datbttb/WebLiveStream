package com.doan.WebLiveStreamGame.repository;

import com.doan.WebLiveStreamGame.model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);

//    @Modifying
//    @Transactional
//    @Query("UPDATE User u SET u.name=?1, u.avatar=?2, u.email=?3 where u.username=?4")
//    void updateUser(String name, String avatar, String email, String username);

//    @Query("select vd.key_id.user_id from Video vd where (vd.name like %?1% or vd.key_id.user_id.username like %?1%)")
//    List<User> searchUserByUsername(String username);

    @Query("select us from User us left join Video vd on us=vd.key_id.user_id where (vd.name like %?1% or us.username like %?1%)")
    List<User> searchUserByUsername(String username);

    @Query("select us from User us where us.role_id.id=?1 and us.username like %?2%")
    List<User> findUserByRoleIDAndUsername(Long idRole, String username);

}
