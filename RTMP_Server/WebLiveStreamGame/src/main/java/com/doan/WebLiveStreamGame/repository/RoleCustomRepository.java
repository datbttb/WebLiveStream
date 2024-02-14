package com.doan.WebLiveStreamGame.repository;

import com.doan.WebLiveStreamGame.model.Role;
import com.doan.WebLiveStreamGame.model.User;
import com.doan.WebLiveStreamGame.service.UserService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.persistence.PersistenceContext;
import org.hibernate.Session;
import org.hibernate.query.NativeQuery;
import org.hibernate.transform.Transformers;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.xml.transform.Transformer;
import java.util.List;

@Repository
public class RoleCustomRepository {
    @PersistenceContext
    private EntityManager entityManager;


    public Role getRole(User user){
        StringBuilder sql = new StringBuilder().append("select r.name from users u join roles r on u.role_id=r.id ");
        sql.append(" where 1=1 ");
        if (user.getEmail()!=null){
            sql.append("and u.email = :email");
        }
        NativeQuery<Role> query = ((Session) entityManager.getDelegate()).createNativeQuery(sql.toString());
        if (user.getEmail()!=null){
            query.setParameter("email", user.getEmail());
            System.out.println("OK");
            System.out.println(sql);
        }
        query.addScalar("name", StandardBasicTypes.STRING);
        query.setResultTransformer(Transformers.aliasToBean(Role.class));
        System.out.println("OK1");
        return query.list().get(0);
    }

}
