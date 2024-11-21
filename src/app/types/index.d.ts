// declare actions params

declare type CreateUserParams = {
  name: string;
  email: string;
  password: string; // Plain text password provided by the user
  preferences?: {
    targetIndustry?: string;
    notificationSettings?: {
      emailNotifications?: boolean;
      smsNotifications?: boolean;
    };
  };
};
