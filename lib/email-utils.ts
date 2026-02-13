/**
 * Checks if an email address should be excluded based on exclusion rules.
 * Supports exact match, domain match (@domain.com), wildcard domain (*@domain.com),
 * and partial/contains match.
 */
export function shouldExcludeEmail(
  emailAddress: string,
  excludedEmails: string[]
): boolean {
  if (!excludedEmails || excludedEmails.length === 0) {
    return false;
  }

  const normalizedEmail = emailAddress.toLowerCase().trim();
  const extractedEmail =
    normalizedEmail.match(/<(.+)>/)?.[1] || normalizedEmail;

  return excludedEmails.some((excludedEmail) => {
    const normalizedExcluded = excludedEmail.toLowerCase().trim();

    // Exact match
    if (extractedEmail === normalizedExcluded) {
      return true;
    }

    // Domain match (@domain.com)
    if (
      normalizedExcluded.startsWith("@") &&
      extractedEmail.endsWith(normalizedExcluded)
    ) {
      return true;
    }

    // Wildcard domain match (*@domain.com)
    if (normalizedExcluded.startsWith("*@")) {
      const domain = normalizedExcluded.substring(2);
      return extractedEmail.endsWith(`@${domain}`);
    }

    // Contains match
    if (extractedEmail.includes(normalizedExcluded)) {
      return true;
    }

    return false;
  });
}
