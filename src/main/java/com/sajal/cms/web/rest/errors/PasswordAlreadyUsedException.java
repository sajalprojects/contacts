package com.sajal.cms.web.rest.errors;

import org.zalando.problem.AbstractThrowableProblem;
import org.zalando.problem.Status;

public class PasswordAlreadyUsedException extends AbstractThrowableProblem{

	private static final long serialVersionUID = 1L;
	
	public PasswordAlreadyUsedException() {
		super(ErrorConstants.INVALID_PASSWORD_TYPE, "Password Already Used", Status.BAD_REQUEST);
	}

}
