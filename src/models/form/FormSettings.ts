export interface FormSettings {
  submitMessage: string;
  storeSubmissions: boolean;
  emailNotifications: boolean;
  redirectUrl?: string;
  notificationEmails?: string[];
  layout?: "default" | "horizontal";
  theme?: "light" | "dark" | "default";
}
