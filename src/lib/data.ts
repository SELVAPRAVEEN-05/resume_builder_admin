export interface User {
  id: string;
  name: string;
  email: string;
  resumes: number;
  course: string;
  status: "Active" | "Disabled" | "Pending";
  joined: string;
}

export interface Resume {
  id: string;
  title: string;
  student: string;
  template: string;
  templateColor: "green" | "blue" | "purple" | "amber";
  created: string;
  downloads: number;
  status: "Published" | "Draft";
}

export type Template = {
  id: string;
  name: string;
  uses: number;
  status: "Active" | "Disabled";
  color: string;
  bgClass: string;
  image: string;
};

export interface FeedbackItem {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  status: "Live" | "Scheduled" | "Draft";
  date: string;
  reach?: number;
  type: "update" | "maintenance" | "feature";
}

// ---------------- USERS (12 total) ----------------
export const users: User[] = [
  { id: "1", name: "Arun", email: "arun@gmail.com", resumes: 2, course: "B.Tech CSE", status: "Active", joined: "Jan 12, 2025" },
  { id: "2", name: "Priya", email: "priya@gmail.com", resumes: 2, course: "MBA", status: "Active", joined: "Jan 18, 2025" },
  { id: "3", name: "Sevapraveen", email: "sevapraveen@gmail.com", resumes: 1, course: "BCA", status: "Pending", joined: "Feb 3, 2025" },
  { id: "4", name: "Kamalesh", email: "kamalesh@gmail.com", resumes: 1, course: "B.Tech CSE", status: "Active", joined: "Feb 9, 2025" },
  { id: "5", name: "Siva Kumar", email: "sivakumar@gmail.com", resumes: 1, course: "MCA", status: "Disabled", joined: "Feb 20, 2025" },
  { id: "6", name: "Sanjeev", email: "sanjeev@gmail.com", resumes: 1, course: "B.Tech ECE", status: "Active", joined: "Mar 1, 2025" },
  { id: "7", name: "Prasanth", email: "prasanth@gmail.com", resumes: 1, course: "B.Tech CSE", status: "Active", joined: "Mar 3, 2025" },
  { id: "8", name: "Divya", email: "divya@gmail.com", resumes: 1, course: "BBA", status: "Active", joined: "Mar 5, 2025" },
  { id: "9", name: "Karthik", email: "karthik@gmail.com", resumes: 1, course: "B.Tech IT", status: "Active", joined: "Mar 7, 2025" },
  { id: "10", name: "Meena", email: "meena@gmail.com", resumes: 1, course: "M.Sc", status: "Active", joined: "Mar 8, 2025" },
  { id: "11", name: "Rahul", email: "rahul@gmail.com", resumes: 1, course: "B.Com", status: "Pending", joined: "Mar 9, 2025" },
  { id: "12", name: "Anjali", email: "anjali@gmail.com", resumes: 1, course: "BA English", status: "Active", joined: "Mar 10, 2025" },
];


// ---------------- RESUMES (12 total, downloads = 52) ----------------
export const resumes: Resume[] = [
  { id: "1", title: "Software Engineer Resume", student: "Arun", template: "Modern", templateColor: "green", created: "Mar 10, 2025", downloads: 8, status: "Published" },
  { id: "2", title: "Backend Developer CV", student: "Arun", template: "Modern", templateColor: "green", created: "Mar 11, 2025", downloads: 4, status: "Published" },

  { id: "3", title: "UX Portfolio CV", student: "Priya", template: "Creative", templateColor: "purple", created: "Mar 8, 2025", downloads: 6, status: "Published" },
  { id: "4", title: "Product Manager Resume", student: "Priya", template: "Classic", templateColor: "blue", created: "Mar 9, 2025", downloads: 5, status: "Published" },

  { id: "5", title: "Fresher CV", student: "Sevapraveen", template: "Minimal", templateColor: "amber", created: "Mar 6, 2025", downloads: 2, status: "Draft" },

  { id: "6", title: "Data Analyst Resume", student: "Kamalesh", template: "Modern", templateColor: "green", created: "Mar 5, 2025", downloads: 4, status: "Published" },

  { id: "7", title: "MCA Resume", student: "Siva Kumar", template: "Classic", templateColor: "blue", created: "Mar 4, 2025", downloads: 2, status: "Draft" },

  { id: "8", title: "MBA Intern Resume", student: "Sanjeev", template: "Classic", templateColor: "blue", created: "Mar 3, 2025", downloads: 4, status: "Published" },

  { id: "9", title: "Full Stack Resume", student: "Prasanth", template: "Modern", templateColor: "green", created: "Mar 1, 2025", downloads: 5, status: "Published" },

  { id: "10", title: "Marketing Resume", student: "Divya", template: "Creative", templateColor: "purple", created: "Mar 2, 2025", downloads: 3, status: "Published" },

  { id: "11", title: "IT Support Resume", student: "Karthik", template: "Modern", templateColor: "green", created: "Mar 6, 2025", downloads: 4, status: "Published" },

  { id: "12", title: "Research CV", student: "Meena", template: "Classic", templateColor: "blue", created: "Mar 7, 2025", downloads: 5, status: "Published" },
];

export const templates: Template[] = [
  {
    id: "1",
    name: "Modern Green",
    uses: 35,
    status: "Active",
    color: "#10B981",
    bgClass: "from-emerald-50 to-green-100",
    image: "https://cdn.enhancv.com/modern_stylish_double_column_resume_template_9178099ddc.png",
  },
  {
    id: "2",
    name: "Classic Blue",
    uses:22,
    status: "Active",
    color: "#3B82F6",
    bgClass: "from-blue-50 to-blue-100",
    image: "https://d.novoresume.com/images/landing_page/templates/template1.png",
  },
  {
    id: "3",
    name: "Creative Purple",
    uses: 16,
    status: "Active",
    color: "#7C3AED",
    bgClass: "from-violet-50 to-purple-100",
    image: "https://cdn.enhancv.com/modern_double_column_resume_template_162167f1cd.png",
  },
  {
    id: "4",
    name: "Minimal Amber",
    uses: 20,
    status: "Disabled",
    color: "#D97706",
    bgClass: "from-amber-50 to-yellow-100",
    image: "https://assets.qwikresume.com/resume-samples/pdf/screenshots/investigative-specialist-1600962922-pdf.jpg",
  },
];

export const feedbackItems: FeedbackItem[] = [
  { id: "1", name: "Arun", rating: 5, text: "Absolutely love the templates available! The modern green one helped me land my first interview. The editor is smooth and the PDF export is perfect.", date: "Mar 12, 2025" },
  { id: "2", name: "Priya", rating: 4, text: "Really good platform overall. Would love to see more creative templates for design roles. The drag-and-drop sections are super helpful.", date: "Mar 10, 2025" },
  { id: "3", name: "Sanjeev", rating: 5, text: "As a fresher, I had no idea how to format my resume. This tool guided me through everything step by step. Highly recommend to all students!", date: "Mar 8, 2025" },
  { id: "4", name: "Prasanth", rating: 3, text: "Good product but sometimes slow on mobile. The templates look great on desktop. Hope the mobile experience improves soon.", date: "Mar 5, 2025" },
  { id: "5", name: "Kamalesh", rating: 5, text: "Best resume builder I have used so far. The AI review feature caught grammar issues I completely missed. Will definitely recommend to my friends.", date: "Mar 3, 2025" },
];

export const registrationData = [
  { month: "Nov", registrations: 0, resumes: 0 },
  { month: "Dec", registrations: 1, resumes: 1 },
  { month: "Jan", registrations: 2, resumes: 2 },
  { month: "Feb", registrations: 3, resumes: 3 },
  { month: "Mar", registrations: 5, resumes: 7 },
];

export const templateDistribution = [
  { name: "Modern", value: 35, color: "#10B981" },
  { name: "Classic", value: 22, color: "#3B82F6" },
  { name: "Creative", value: 10, color: "#7C3AED" },
  { name: "Minimal", value: 20, color: "#D97706" },
];

export const kpiData = [
  { label: "Avg. Session Time", value: "12.5 min", change: "+1.2 min", up: true, color: "text-primary-600" },
  { label: "Download Rate", value: "24.4%", change: "+2.1%", up: true, color: "text-blue-600" },
  { label: "30-day Retention", value: "68.2%", change: "+3.4%", up: true, color: "text-purple-600" },
];

export const dailyActive = [
  { day: "Mon", users: 6 },
  { day: "Tue", users: 8 },
  { day: "Wed", users: 7 },
  { day: "Thu", users: 9 },
  { day: "Fri", users: 10 },
  { day: "Sat", users: 5 },
  { day: "Sun", users: 4 },
];

