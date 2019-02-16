package com.sajal.cms.tenant;

import org.hibernate.context.spi.CurrentTenantIdentifierResolver;
import org.springframework.stereotype.Component;

@Component
public class TenantIdentifierResolver implements CurrentTenantIdentifierResolver {


	public TenantIdentifierResolver() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public String resolveCurrentTenantIdentifier() {
		String tenantId = TenantContext.getCurrentTenant();
        if (tenantId != null) {
            return tenantId;
        }
        return TenantContext.DEFAULT_TENANT_ID;
	}

	@Override
	public boolean validateExistingCurrentSessions() {
		// TODO Auto-generated method stub
		return true;
	}

}
