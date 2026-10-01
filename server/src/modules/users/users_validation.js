const fail = (message, statusCode = 400) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
};

const ensureBody = (body) => {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    fail("A JSON request body is required");
  }
  return body;
};

const onlyKeys = (body, allowedKeys) => {
  ensureBody(body);
  if (Object.keys(body).some((key) => !allowedKeys.includes(key))) {
    fail("Request contains unsupported fields");
  }
  return body;
};

const requiredString = (value, field) => {
  if (typeof value !== "string" || value.length === 0) {
    fail(`${field} is required`);
  }
  return value;
};

const normalizeFullName = (value) => {
  if (typeof value !== "string") {
    fail("Full name must be a string");
  }

  const fullName = value.trim();
  if (fullName.length < 2 || fullName.length > 100) {
    fail("Full name must be between 2 and 100 characters");
  }
  return fullName;
};

const normalizeEmail = (value) => {
  if (typeof value !== "string") {
    fail("A valid email address is required");
  }

  const email = value.trim().toLowerCase();
  if (
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    fail("A valid email address is required");
  }
  return email;
};

const normalizePhone = (value) => {
  if (typeof value !== "string" || !/^[+\d\s()-]+$/.test(value.trim())) {
    fail("Enter a valid Indian mobile number");
  }

  let digits = value.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    digits = digits.slice(2);
  } else if (digits.length === 11 && digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  if (!/^[6-9]\d{9}$/.test(digits)) {
    fail("Enter a valid Indian mobile number");
  }
  return `+91${digits}`;
};

const validatePassword = (value, field) => {
  requiredString(value, field);
  if (value.length < 6 || value.length > 128) {
    fail(`${field} must be between 6 and 128 characters`);
  }
  return value;
};

const middleware = (validator) => (req, res, next) => {
  try {
    req.validatedBody = validator(req.body);
    next();
  } catch (error) {
    res.status(error.statusCode || 400).json({
      success: false,
      message: error.message,
    });
  }
};

const validateProfileUpdate = (body) => {
  onlyKeys(body, ["fullName"]);
  if (typeof body.fullName === "undefined") {
    fail("Full name is required");
  }
  return { fullName: normalizeFullName(body.fullName) };
};

const validatePasswordChange = (body) => {
  onlyKeys(body, ["currentPassword", "newPassword"]);
  return {
    currentPassword: requiredString(body.currentPassword, "Current password"),
    newPassword: validatePassword(body.newPassword, "New password"),
  };
};

const validatePhoneUpdate = (body) => {
  onlyKeys(body, ["phone", "currentPassword"]);
  return {
    phone: normalizePhone(body.phone),
    currentPassword: requiredString(body.currentPassword, "Current password"),
  };
};

const validatePhoneOtpRequest = (body) => {
  onlyKeys(body, ["phone"]);
  return { phone: normalizePhone(body.phone) };
};

const validatePhoneOtpVerification = (body) => {
  onlyKeys(body, ["phone", "otp"]);
  return {
    phone: normalizePhone(body.phone),
    otp: validateOtp(body.otp),
  };
};

const validateEmailOtpRequest = (body) => {
  onlyKeys(body, ["newEmail", "currentPassword"]);
  return {
    newEmail: normalizeEmail(body.newEmail),
    currentPassword: requiredString(body.currentPassword, "Current password"),
  };
};

const validateEmailOtpVerification = (body) => {
  onlyKeys(body, ["newEmail", "otp"]);
  return {
    newEmail: normalizeEmail(body.newEmail),
    otp: validateOtp(body.otp),
  };
};

const validateOtp = (value) => {
  if (typeof value !== "string" || !/^\d{6}$/.test(value)) {
    fail("OTP must be a 6-digit code");
  }
  return value;
};

const validateAccountDeletion = (body) => {
  onlyKeys(body, ["currentPassword", "confirmation"]);
  if (body.confirmation !== "DELETE") {
    fail('Confirmation must exactly match "DELETE"');
  }
  return {
    currentPassword: requiredString(body.currentPassword, "Current password"),
    confirmation: body.confirmation,
  };
};

module.exports = {
  validateProfileUpdate: middleware(validateProfileUpdate),
  validatePasswordChange: middleware(validatePasswordChange),
  validatePhoneUpdate: middleware(validatePhoneUpdate),
  validatePhoneOtpRequest: middleware(validatePhoneOtpRequest),
  validatePhoneOtpVerification: middleware(validatePhoneOtpVerification),
  validateEmailOtpRequest: middleware(validateEmailOtpRequest),
  validateEmailOtpVerification: middleware(validateEmailOtpVerification),
  validateAccountDeletion: middleware(validateAccountDeletion),
};
