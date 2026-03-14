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

export interface Template {
  id: string;
  name: string;
  uses: number;
  status: "Active" | "Disabled";
  color: string;
  bgClass: string;
}

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

export const users: User[] = [
  { id: "1", name: "Arjun Rao", email: "arjun.rao@email.com", resumes: 4, course: "B.Tech CSE", status: "Active", joined: "Jan 12, 2025" },
  { id: "2", name: "Priya Sharma", email: "priya.s@email.com", resumes: 7, course: "MBA", status: "Active", joined: "Jan 18, 2025" },
  { id: "3", name: "Kiran Mehta", email: "kiran.m@email.com", resumes: 2, course: "BCA", status: "Pending", joined: "Feb 3, 2025" },
  { id: "4", name: "Riya Lal", email: "riya.lal@email.com", resumes: 5, course: "B.Tech CSE", status: "Active", joined: "Feb 9, 2025" },
  { id: "5", name: "Vivek Kumar", email: "vivek.k@email.com", resumes: 1, course: "MCA", status: "Disabled", joined: "Feb 20, 2025" },
  { id: "6", name: "Sneha Bose", email: "sneha.b@email.com", resumes: 3, course: "B.Tech ECE", status: "Active", joined: "Mar 1, 2025" },
  { id: "7", name: "Rahul Verma", email: "rahul.v@email.com", resumes: 6, course: "B.Tech CSE", status: "Active", joined: "Mar 3, 2025" },
  { id: "8", name: "Anjali Nair", email: "anjali.n@email.com", resumes: 2, course: "MBA", status: "Active", joined: "Mar 5, 2025" },
];

export const resumes: Resume[] = [
  { id: "1", title: "Software Engineer Resume", student: "Arjun Rao", template: "Modern", templateColor: "green", created: "Mar 10, 2025", downloads: 12, status: "Published" },
  { id: "2", title: "UX Portfolio CV", student: "Priya Sharma", template: "Creative", templateColor: "purple", created: "Mar 8, 2025", downloads: 28, status: "Published" },
  { id: "3", title: "Fresher CV 2025", student: "Kiran Mehta", template: "Classic", templateColor: "amber", created: "Mar 6, 2025", downloads: 3, status: "Draft" },
  { id: "4", title: "Data Analyst Profile", student: "Riya Lal", template: "Modern", templateColor: "green", created: "Mar 5, 2025", downloads: 9, status: "Published" },
  { id: "5", title: "MBA Intern Resume", student: "Sneha Bose", template: "Classic", templateColor: "amber", created: "Mar 3, 2025", downloads: 6, status: "Published" },
  { id: "6", title: "Full Stack Dev CV", student: "Rahul Verma", template: "Modern", templateColor: "green", created: "Mar 1, 2025", downloads: 15, status: "Published" },
];

export const templates: Template[] = [
  { id: "1", name: "Modern Green", uses: 5234, status: "Active", color: "#10B981", bgClass: "from-emerald-50 to-green-100" },
  { id: "2", name: "Classic Blue", uses: 3891, status: "Active", color: "#3B82F6", bgClass: "from-blue-50 to-blue-100" },
  { id: "3", name: "Creative Purple", uses: 2144, status: "Active", color: "#7C3AED", bgClass: "from-violet-50 to-purple-100" },
  { id: "4", name: "Minimal Amber", uses: 987, status: "Disabled", color: "#D97706", bgClass: "from-amber-50 to-yellow-100" },
  { id: "5", name: "Bold Red", uses: 621, status: "Disabled", color: "#EF4444", bgClass: "from-red-50 to-rose-100" },
];

export const feedbackItems: FeedbackItem[] = [
  { id: "1", name: "Arjun Rao", rating: 5, text: "Absolutely love the templates available! The modern green one helped me land my first interview. The editor is smooth and the PDF export is perfect.", date: "Mar 12, 2025" },
  { id: "2", name: "Priya Sharma", rating: 4, text: "Really good platform overall. Would love to see more creative templates for design roles. The drag-and-drop sections are super helpful.", date: "Mar 10, 2025" },
  { id: "3", name: "Kiran Mehta", rating: 5, text: "As a fresher, I had no idea how to format my resume. This tool guided me through everything step by step. Highly recommend to all students!", date: "Mar 8, 2025" },
  { id: "4", name: "Riya Lal", rating: 3, text: "Good product but sometimes slow on mobile. The templates look great on desktop. Hope the mobile experience improves soon.", date: "Mar 5, 2025" },
  { id: "5", name: "Sneha Bose", rating: 5, text: "Best resume builder I have used so far. The AI review feature caught grammar issues I completely missed. Will definitely recommend to my friends.", date: "Mar 3, 2025" },
];

export const announcements: Announcement[] = [
  { id: "1", title: "New Templates Available!", body: "We have added 3 new professional resume templates — Bold Red, Minimal Amber, and Tech Pro. Check them out in the Templates section and upgrade your resume today!", status: "Live", date: "Mar 10, 2025", reach: 12483, type: "update" },
  { id: "2", title: "Scheduled Maintenance — Mar 18", body: "The platform will be under maintenance on March 18, 2025 from 2:00 AM to 4:00 AM IST. Please save your work before then. We apologize for any inconvenience.", status: "Scheduled", date: "Mar 18, 2025", type: "maintenance" },
  { id: "3", title: "AI Resume Review Feature Launched", body: "Get instant AI-powered feedback on your resume! Our new AI Review feature analyzes your resume for ATS compatibility, grammar, and impact. Available for all users.", status: "Live", date: "Mar 1, 2025", reach: 11920, type: "feature" },
  { id: "4", title: "Campus Placement Season Begins", body: "Campus placement season is here! Use our placement-ready templates optimized for top recruiters. New ATS-optimized layouts added for 2025 batch.", status: "Draft", date: "Feb 25, 2025", type: "update" },
];

export const registrationData = [
  { month: "Oct", registrations: 420, resumes: 680 },
  { month: "Nov", registrations: 580, resumes: 820 },
  { month: "Dec", registrations: 710, resumes: 950 },
  { month: "Jan", registrations: 650, resumes: 880 },
  { month: "Feb", registrations: 830, resumes: 1100 },
  { month: "Mar", registrations: 910, resumes: 1200 },
];

export const templateDistribution = [
  { name: "Modern", value: 42, color: "#10B981" },
  { name: "Classic", value: 28, color: "#93C5FD" },
  { name: "Creative", value: 18, color: "#FDE68A" },
  { name: "Others", value: 12, color: "#E5E7EB" },
];
