package com.junit.bline.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.junit.bline.dao.UserDao;
import com.junit.bline.model.User;

@Service
public class UserService {
	@Autowired
	UserDao userDao;
	
	public User getUserById(int id){
		return userDao.selectUserById(id);
	}
}
