export class IdGenerationService {
  private static usedIds: { [category: string]: Set<string> } = {
    field: new Set<string>(),
    form: new Set<string>(),
    project: new Set<string>(),
  };

  private static toCamelCase(text: string): string {
    const cleanText = text.replace(/[^a-zA-Z0-9\s]/g, "").trim();

    return cleanText
      .split(/\s+/)
      .map((word, index) => {
        if (!word) return "";
        return index === 0
          ? word.toLowerCase()
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join("");
  }

  /**
   * Ensures uniqueness by adding a number suffix if needed.
   * Example: "textField" -> "textField2" if "textField" is taken
   */
  private static makeUnique(baseId: string, category: string): string {
    let finalId = baseId;
    let counter = 1;

    // Keep incrementing counter until we find an unused ID
    while (this.usedIds[category].has(finalId)) {
      finalId = `${baseId}${counter}`;
      counter++;
    }

    // Record the ID as used in its category
    this.usedIds[category].add(finalId);
    return finalId;
  }

  /**
   * Generates a valid ID that starts with a prefix if the base would start with a number.
   * Example: "2nd Address" -> "field2ndAddress"
   */
  private static ensureValidStart(id: string, prefix: string): string {
    return /^\d/.test(id) ? `${prefix}${id}` : id;
  }

  /**
   * Generates a valid ID for a field based on its label.
   * This is specifically for form fields dropped in the builder.
   */
  static generateFieldId(label: string): string {
    const baseId = this.toCamelCase(label);
    const validId = this.ensureValidStart(baseId, "field");
    return this.makeUnique(validId, "field");
  }

  /**
   * Generates a unique ID for forms and projects.
   * This adds additional uniqueness through timestamp and random string.
   */
  static generateValidId(name: string, type: "form" | "project"): string {
    // Create base ID from name
    const baseId = this.toCamelCase(name);

    // Add timestamp and random string for extra uniqueness
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).slice(2, 5);

    // Combine components
    const fullId = `${type}_${baseId}_${timestamp}_${randomStr}`;

    // Ensure unique in its category
    return this.makeUnique(fullId, type);
  }

  static reset(): void {
    Object.keys(this.usedIds).forEach((category) => {
      this.usedIds[category].clear();
    });
  }
}
