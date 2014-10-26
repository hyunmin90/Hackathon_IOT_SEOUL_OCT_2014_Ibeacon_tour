package com.junit.bline.controller;

import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.junit.bline.service.UserService;

@Controller
public class HomeController {
	@Autowired
	UserService userService;
	
	@RequestMapping("/")
	public String home(Locale locale, Model model) {
		return "index";
	}
	
	@RequestMapping("/id/workinfo/{rownum}")
	public String workInfo(Model model, @PathVariable int rownum){
		return "workinfo";
	}
//	@RequestMapping("/{id}")
//	public String home(Model model, @PathVariable int id) {
//		System.err.println(userService.getUserById(id));
//		return "index";
//	}
}
