package com.doan.WebLiveStreamGame;

import com.doan.WebLiveStreamGame.model.Role;
import com.doan.WebLiveStreamGame.model.User;
import com.doan.WebLiveStreamGame.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ImportResource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
@EnableWebSecurity
@EnableJpaRepositories
public class WebLiveStreamGameApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebLiveStreamGameApplication.class, args);
	}

	@Bean
	BCryptPasswordEncoder brBCryptPasswordEncoder(){
		return new BCryptPasswordEncoder();
	}

//	@Bean
//	CommandLineRunner runner(UserService userService){
//		return args -> {
//			userService.saveRole(new Role(null,"ROLE_USER"));
//			userService.saveRole(new Role(null,"ROLE_ADMIN"));
//			userService.saveUser(new User(null,"datbttb","12345678","Đình Đạt","dat@gmail.com","anhdep"));
//			userService.addRoleToUser("dat@gmail.com","ROLE_ADMIN");
//		};
//	}

}
