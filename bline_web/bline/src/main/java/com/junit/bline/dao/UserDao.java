package com.junit.bline.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import com.junit.bline.model.User;

@Repository
public interface UserDao {
	public User selectUserById(@Param("id") int id);
}
