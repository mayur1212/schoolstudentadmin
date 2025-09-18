// src/data/usersData.ts

export type User = {
  name: string;
  email: string;
  password: string;
  type: "admin" | "student";
  address: string;
  standard: string;
  language: string;
  subjects: string[];
};

export const usersData: User[] = [
  // ✅ Admins
  {
    name: "Admin User",
    email: "admin@school.com",
    password: "admin123",
    type: "admin",
    address: "School HQ",
    standard: "-",
    language: "-",
    subjects: [],
  },
  {
    name: "Principal Admin",
    email: "principal@school.com",
    password: "principal123",
    type: "admin",
    address: "Main Office",
    standard: "-",
    language: "English",
    subjects: [],
  },

  // ✅ Students
  {
    name: "Alice Johnson",
    email: "alice@student.com",
    password: "pass123",
    type: "student",
    address: "123 Maple St",
    standard: "10th",
    language: "English",
    subjects: ["Math", "Science", "History"],
  },
  {
    name: "Bob Smith",
    email: "bob@student.com",
    password: "pass123",
    type: "student",
    address: "456 Oak St",
    standard: "9th",
    language: "Hindi",
    subjects: ["Math", "English", "Geography"],
  },
  {
    name: "Charlie Brown",
    email: "charlie@student.com",
    password: "pass123",
    type: "student",
    address: "789 Pine St",
    standard: "11th",
    language: "English",
    subjects: ["Physics", "Chemistry", "Math"],
  },
  {
    name: "Diana Prince",
    email: "diana@student.com",
    password: "pass123",
    type: "student",
    address: "321 Elm St",
    standard: "12th",
    language: "French",
    subjects: ["History", "Geography", "Political Science"],
  },
  {
    name: "Ethan Hunt",
    email: "ethan@student.com",
    password: "pass123",
    type: "student",
    address: "987 Cedar St",
    standard: "10th",
    language: "English",
    subjects: ["Biology", "Chemistry", "Math"],
  },
  {
    name: "Fiona Gallagher",
    email: "fiona@student.com",
    password: "pass123",
    type: "student",
    address: "654 Birch St",
    standard: "8th",
    language: "Hindi",
    subjects: ["English", "Math", "Science"],
  },
  {
    name: "George Miller",
    email: "george@student.com",
    password: "pass123",
    type: "student",
    address: "852 Spruce St",
    standard: "9th",
    language: "English",
    subjects: ["Math", "Economics", "Civics"],
  },
  {
    name: "Hannah Davis",
    email: "hannah@student.com",
    password: "pass123",
    type: "student",
    address: "963 Willow St",
    standard: "11th",
    language: "Spanish",
    subjects: ["English", "Math", "Geography"],
  },
  {
    name: "Ian Wright",
    email: "ian@student.com",
    password: "pass123",
    type: "student",
    address: "741 Aspen St",
    standard: "12th",
    language: "English",
    subjects: ["Physics", "Math", "Computer Science"],
  },
  {
    name: "Julia Roberts",
    email: "julia@student.com",
    password: "pass123",
    type: "student",
    address: "159 Chestnut St",
    standard: "10th",
    language: "English",
    subjects: ["Math", "Biology", "Chemistry"],
  },
];
