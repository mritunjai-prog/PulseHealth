<div align="center">
  <img src="https://lucide.dev/icons/activity.svg" width="80" height="80" alt="MedCore Logo">
  <h1>MedCore Health OS</h1>
  <p><strong>The AI-powered operating system for modern hospital networks.</strong></p>
</div>

---

## 🌟 Overview

MedCore Health OS is a comprehensive, multi-tenant hospital management platform designed to unify administration, clinical workflows, and patient experiences. Built with a robust **NestJS (Node.js)** backend and a blazing fast **Vite + React** frontend, MedCore leverages **Groq** and **Llama 3** to provide deeply integrated AI capabilities across every department.

## ✨ Key Features

### 🏢 Multi-Tenant Architecture
- **Super Admin Portal**: Manage the entire hospital network, register new hospitals, and oversee system-wide staff.
- **Hospital Admin Portal**: Manage clinical staff (Doctors, Nurses, Technicians) specifically tied to your hospital.
- **Role-Based Access Control (RBAC)**: Secure access tailored for Doctors, Nurses, Receptionists, Lab Technicians, Pharmacists, and Patients.

### 🤖 The AI Suite
MedCore isn't just a dashboard—it's an intelligent clinical copilot.
- **Global Clinical Assistant**: A floating, voice-enabled AI bot accessible from anywhere in the app to answer generic clinical queries.
- **Dedicated Agent Views**: Launch specialized AI tools (e.g., *Report Analyzer*, *Discharge Summary*, *Revenue Analytics*) with context-aware system prompts that force the AI to act exclusively within its specialized domain.
- **Voice Integrations**: Native Web Speech API integration allows for hands-free dictation and text-to-speech AI responses.

### 🏥 Core Modules
- **Reception Booking**: Real-time appointment scheduling with dynamic doctor/patient lookups.
- **Live Analytics Dashboard**: Real-time KPI aggregation (Revenue, Occupancy, Staffing) powered by Postgres aggregations.
- **Complete Entity Management**: Full CRUD APIs for Hospitals, Users, Patients, Appointments, Prescriptions, and Lab Results with Prisma Cascade Deletes.

## 🛠️ Technology Stack

**Frontend**
- React 18 & Vite
- Tailwind CSS (Vanilla UI components, highly custom glassmorphism design)
- TanStack Router & React Query
- Framer Motion (Micro-animations & transitions)
- Zustand (State Management)

**Backend**
- NestJS (TypeScript Framework)
- Prisma ORM
- PostgreSQL (Database)
- JWT Authentication (Passport.js)
- Groq SDK (Llama 3 LLM Inference)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL Database
- Groq API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd MedCore
   ```

2. **Setup the Backend:**
   ```bash
   cd backend
   npm install
   
   # Setup your environment variables (.env)
   # DATABASE_URL="..."
   # GROQ_API_KEY="..."
   # JWT_SECRET="..."
   
   # Run Prisma Migrations & Seed the database
   npx prisma db push
   npm run seed
   
   # Start the NestJS Server
   npm run start:dev
   ```

3. **Setup the Frontend:**
   ```bash
   # In a new terminal, from the project root
   npm install
   npm run dev
   ```

4. **Access the Application:**
   Open `http://localhost:8080` in your browser. Use the Demo Bypass buttons on the login screen to instantly explore different clinical roles!

---
*Built with ❤️ for modern healthcare.*
