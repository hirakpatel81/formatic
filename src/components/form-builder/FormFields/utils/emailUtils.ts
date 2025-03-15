export const DISPOSABLE_DOMAINS = [
  "tempmail.com",
  "temp-mail.org",
  "guerrillamail.com",
  "guerrillamail.net",
  "sharklasers.com",
  "mailinator.com",
  "maildrop.cc",
  "getairmail.com",
  "yopmail.com",
  "mohmal.com",
  "temp-mail.io",
  "dispostable.com",
  "10minutemail.com",
  "throwawaymail.com",
];

// Validates basic email format
export const isValidEmailFormat = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Checks if the email is from a disposable domain (case-insensitive)
export const isDisposableEmail = (email: string): boolean => {
  const domain = email.split("@")[1]?.toLowerCase();
  return domain ? DISPOSABLE_DOMAINS.includes(domain.toLowerCase()) : false;
};

export const validateEmail = (
  email: string,
  options: {
    allowedDomains?: string[];
    preventDisposable?: boolean;
  }
): { isValid: boolean; message?: string } => {
  // Don't validate empty fields
  if (!email) {
    return { isValid: true };
  }

  // Check basic email format
  if (!isValidEmailFormat(email)) {
    return {
      isValid: false,
      message: "Please enter a valid email address",
    };
  }

  // Extract and normalize the domain (case-insensitive)
  const domain = email.split("@")[1]?.toLowerCase();

  // Check for disposable email domains if enabled
  if (options.preventDisposable && isDisposableEmail(email)) {
    return {
      isValid: false,
      message: "Disposable email addresses are not allowed",
    };
  }

  if (options.allowedDomains?.length && domain) {
    const normalizedAllowedDomains = options.allowedDomains.map((d) =>
      d.toLowerCase()
    );

    if (!normalizedAllowedDomains.includes(domain)) {
      return {
        isValid: false,
        message: `Email must be from one of these domains: ${options.allowedDomains.join(
          ", "
        )}`,
      };
    }
  }

  return { isValid: true };
};
