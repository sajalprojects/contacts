package com.sajal.cms.tenant;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.sajal.cms.security.SecurityUtils;

@Component
public class TenantInterceptor extends HandlerInterceptorAdapter{

	@Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        String tenantId = getTenant();
        TenantContext.setCurrentTenant(tenantId);
        return true;
    }
    @Override
    public void postHandle(
            HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView)
            throws Exception {
        TenantContext.clear();
    }
    
    public String getTenant() {
    	String tenantId = null;
    	String currentUser = SecurityUtils.getCurrentUserLogin().get();
    	if(currentUser.equals("admin")) {
    		tenantId = "contacts_techl33t"; 
    	}else {
    		tenantId = "contacts_other"; 
    	}
    	return tenantId;
    }
    
	public TenantInterceptor() {
		// TODO Auto-generated constructor stub
	}

}
