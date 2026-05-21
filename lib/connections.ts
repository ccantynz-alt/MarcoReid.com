export interface ConnectionType {
  from: string;
  to: string;
  relationship: string;
  features: string[];
  privileged: boolean;
}

export const CONNECTION_TYPES: ConnectionType[] = [
  {
    from: "client",
    to: "lawyer",
    relationship: "Attorney-Client",
    features: [
      "Encrypted messaging",
      "Document sharing",
      "Invoice payment",
      "Matter status",
      "E-signatures",
    ],
    privileged: true,
  },
  {
    from: "client",
    to: "accountant",
    relationship: "CPA-Client",
    features: [
      "Encrypted messaging",
      "Document upload",
      "Invoice payment",
      "Tax return status",
      "Bank feed access",
    ],
    privileged: true,
  },
  {
    from: "lawyer",
    to: "accountant",
    relationship: "Cross-Professional",
    features: [
      "Shared matters",
      "Cross-domain research",
      "Document collaboration",
      "Referral tracking",
    ],
    privileged: false,
  },
  {
    from: "lawyer",
    to: "lawyer",
    relationship: "Co-Counsel",
    features: [
      "Matter collaboration",
      "Document sharing",
      "Conflict checking",
      "Court filing coordination",
    ],
    privileged: false,
  },
  {
    from: "hr",
    to: "lawyer",
    relationship: "Recruiter-Firm",
    features: [
      "Candidate profiles",
      "Placement tracking",
      "Commission management",
      "Job posting",
    ],
    privileged: false,
  },
  {
    from: "hr",
    to: "accountant",
    relationship: "Recruiter-Firm",
    features: [
      "Candidate profiles",
      "Placement tracking",
      "Commission management",
      "Job posting",
    ],
    privileged: false,
  },
  {
    from: "student",
    to: "lawyer",
    relationship: "Mentee-Mentor",
    features: [
      "Mentoring sessions",
      "Practice guidance",
      "CPD tracking",
      "Job placement",
    ],
    privileged: false,
  },
  {
    from: "student",
    to: "accountant",
    relationship: "Mentee-Mentor",
    features: [
      "Mentoring sessions",
      "Practice guidance",
      "CPD tracking",
      "Job placement",
    ],
    privileged: false,
  },
];

export const USER_ROLES = [
  {
    role: "client",
    label: "Client / Public",
    description:
      "Individuals and businesses seeking legal or accounting services",
    icon: "user",
  },
  {
    role: "lawyer",
    label: "Lawyer / Attorney",
    description: "Licensed legal practitioners",
    icon: "scale",
  },
  {
    role: "accountant",
    label: "Accountant / CPA",
    description: "Licensed accounting professionals",
    icon: "calculator",
  },
  {
    role: "hr",
    label: "HR / Recruitment",
    description: "Professional recruitment firms",
    icon: "users",
  },
  {
    role: "student",
    label: "Student / Trainee",
    description: "Academy students and trainees",
    icon: "graduation",
  },
] as const;
