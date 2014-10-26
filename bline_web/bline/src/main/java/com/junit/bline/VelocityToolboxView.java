package com.junit.bline;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.velocity.context.Context;
import org.apache.velocity.tools.Scope;
import org.apache.velocity.tools.ToolboxFactory;
import org.apache.velocity.tools.config.EasyFactoryConfiguration;
import org.apache.velocity.tools.view.ViewToolContext;

public class VelocityToolboxView extends org.springframework.web.servlet.view.velocity.VelocityToolboxView {
	@Override
	protected Context createVelocityContext(Map<String, Object> model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		ViewToolContext viewToolContext = new ViewToolContext(getVelocityEngine(), request, response, getServletContext());

		EasyFactoryConfiguration config = new EasyFactoryConfiguration();

		ToolboxFactory factory = config.createFactory();

		for (String scope : Scope.values()) {
			viewToolContext.addToolbox(factory.createToolbox(scope));
		}

		if (model != null) {
			viewToolContext.putAll(model);
		}

		return viewToolContext;
	}
}