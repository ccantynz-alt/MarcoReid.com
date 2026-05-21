export interface Message {
  id: string;
  threadId: string;
  senderId: string;
  senderName: string;
  senderRole: "lawyer" | "accountant" | "client" | "hr" | "admin";
  recipientId: string;
  recipientName: string;
  recipientRole: "lawyer" | "accountant" | "client" | "hr" | "admin";
  matterId?: string;
  subject: string;
  body: string;
  encrypted: boolean;
  readAt?: string;
  createdAt: string;
}

export interface Thread {
  id: string;
  subject: string;
  matterId?: string;
  participants: { id: string; name: string; role: string }[];
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  encrypted: boolean;
}

export const MESSAGING_RULES = {
  "lawyer-client": {
    encrypted: true,
    privileged: true,
    auditLogged: true,
    note: "Attorney-client privilege applies. All messages encrypted end-to-end and logged to the immutable audit trail.",
  },
  "accountant-client": {
    encrypted: true,
    privileged: true,
    auditLogged: true,
    note: "CPA-client confidentiality applies. All messages encrypted and audit logged.",
  },
  "lawyer-accountant": {
    encrypted: true,
    privileged: false,
    auditLogged: true,
    note: "Cross-professional communication. Encrypted and logged. Privilege may apply if joint representation.",
  },
  "hr-lawyer": {
    encrypted: false,
    privileged: false,
    auditLogged: true,
    note: "Recruitment communication. Logged for compliance.",
  },
  "hr-accountant": {
    encrypted: false,
    privileged: false,
    auditLogged: true,
    note: "Recruitment communication. Logged for compliance.",
  },
  "client-client": {
    encrypted: false,
    privileged: false,
    auditLogged: false,
    note: "Peer communication. Standard security.",
  },
} as const;
