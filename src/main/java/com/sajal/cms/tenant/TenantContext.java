package com.sajal.cms.tenant;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class TenantContext {

	private static Logger logger = LoggerFactory.getLogger(TenantContext.class);
	
	private static ThreadLocal<String> currentTenant = new ThreadLocal<>();
	
	public static final String DEFAULT_TENANT_ID = "contacts";
	
	public static void setCurrentTenant(String tenant) {
        logger.debug("Setting tenant to {}", tenant);
        currentTenant.set(tenant);
    }
	
	public static String getCurrentTenant() {
        return currentTenant.get();
    }
    public static void clear() {
        currentTenant.set(null);
    }
    
	public TenantContext() {
		// TODO Auto-generated constructor stub
	}

}
