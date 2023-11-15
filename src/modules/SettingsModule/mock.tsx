export const PROCEDURE_ACCESS_LIST = [
  {
    id: 1,
    title: "Can Create",
    isAdmin: true,
    isRequest: true,
    isTest: true,
  },
  {
    id: 2,
    title: "Can Delete",
    isAdmin: true,
    isRequest: true,
    isTest: true,
  },
  {
    id: 3,
    title: "Can Edit",
    isAdmin: true,
    isRequest: true,
    isTest: true,
  },
  {
    id: 4,
    title: "Can View",
    isAdmin: true,
    isRequest: true,
    isTest: true,
  },
  {
    id: 5,
    title: "Can Assign",
    isAdmin: true,
    isRequest: true,
    isTest: true,
  },
  {
    id: 6,
    title: "Can Share",
    isAdmin: true,
    isRequest: true,
    isTest: true,
  },
];

export const PROFILE_ACCESS_LIST = [
  {
    id: 1,
    title: "Can edit username",
    isAdmin: true,
    isRequest: true,
    isTest: true,
  },
  {
    id: 2,
    title: "Can change password",
    isAdmin: true,
    isRequest: true,
    isTest: true,
  },
  {
    id: 3,
    title: "Can edit organisation",
    isAdmin: true,
    isRequest: true,
    isTest: true,
  },
];

export const NOTIFICATION_LIST = [
  {
    id: 1,
    heading: "New procedure created",
    subHead:
      "You will receive notifications whenever a new procedure is created.",
    isNotifyActive: true,
    isEmailActive: true,
  },
  {
    id: 2,
    heading: "Task submitted",
    subHead:
      "You will receive notifications whenever an assigned task is submitted.",
    isNotifyActive: true,
    isEmailActive: true,
  },
  {
    id: 3,
    heading: "Messages",
    subHead:
      "You will receive notifications whenever a new message or comment is received on runz.",
    isNotifyActive: true,
    isEmailActive: true,
  },
];

export const STATUS_OPTIONS = [
  { label: "Active", value: "Active" },
  { label: "InActive", value: "InActive" },
];
