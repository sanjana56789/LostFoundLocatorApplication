package edu.infosys.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.infosys.bean.LostfoundUser;

public interface LostfoundUserRepository extends JpaRepository<LostfoundUser,String> {

}
