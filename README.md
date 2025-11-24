<p align="center">
  <img src="/public/screenshot2.png" alt="Live AI Meeting" width="80%" style="border-radius: 12px;" />
</p>

<p align="center">
  <img src="/public/screenshot1.png" alt="Meetings Dashboard" width="60%" style="border-radius: 12px;" />
</p>


# 🚀 AgentMeet AI  
### Real-Time Video Meetings Powered by Autonomous AI Agents

AgentMeet AI is a next-generation video calling platform where every meeting includes a **real-time AI agent** trained for a specific role. These aren’t summaries or offline scripts — each session is a **live call** with an AI that listens, responds, and participates just like a human.

Whether you need a **language tutor**, **interview coach**, **sales assistant**, or a completely custom persona, AgentMeet AI gives you a powerful assistant directly inside your meeting.

---

## 🌟 Features

### 🎥 Real-Time AI Video Calls  
Start meetings with AI agents that interact live using **Stream Video SDK** and **OpenAI Realtime API**.

### 🧠 Custom AI Agents  
Create agents with custom names, personalities, tones, and behaviors.  
Example instruction:  
> “Be direct, hyper-driven, and over the top like a founder who just raised a seed round.”

### 📅 Meeting Scheduling  
Meetings can be created, scheduled, cancelled, or started later. Upcoming meetings stay in a pending state until you join.

### ⚙️ Automated Processing  
After a meeting ends, background jobs (via **Ingest** and **AgentKit**) automatically:
- Fetch transcripts  
- Summarize content with AI  
- Generate structured insights  
- Save everything to the database  
- Mark the meeting as **Completed**

### 📄 Intelligent Meeting Output  
Every completed meeting includes:

#### ✅ Summary  
A clean AI-generated breakdown of discussion topics with timestamps.

#### 💬 Transcript  
A fully searchable transcript with keyword highlighting.

#### 🎞️ Recording  
A complete replay of the entire call.

#### 🤖 ChatGPT-Style Post-Meeting Chat  
Ask natural questions about the meeting:  
> “Who asked for advice?”  
> “What did the agent recommend for the startup idea?”

Powered by **Stream Chat SDK**.

### 💵 SaaS Subscription  
AgentMeet AI runs as a subscription-based SaaS product:
- Free trial tier  
- Upgrade flow powered by **Polar**  
- Secure hosted checkout  

### 🔐 Authentication  
Authentication is handled by **Better Auth**:
- Email login  
- Social providers  
- Session management  
- Native integration with Polar for billing

### 📱 Responsive UI  
Every page and component gracefully adapts to mobile screens.  
Modals and dropdowns convert to mobile drawers for a smooth experience.

---

## 🛠️ Tech Stack

### **Framework**
- Next.js 15 (App Router)
- React 19  
- Server Components + SSR  

### **API & Type Safety**
- tRPC  
- TanStack Query  

### **Database & ORM**
- Drizzle ORM  
- Postgres via Neon  

### **Styling**
- Tailwind CSS v4  
- Shadcn/UI  

### **Auth**
- Better Auth  

### **Payments**
- Polar  

### **Video & Chat**
- Stream Video SDK  
- Stream Chat SDK  

### **Background Jobs**
- Ingest  
- AgentKit  

### **AI**
- OpenAI Realtime API  
- AI summary, transcript intelligence, and real-time agent responses  

---

## 📸 Demo Flow

1. Create a new meeting  
2. Name your session (e.g., *Startup Coaching Call*)  
3. Create/select an AI agent  
4. Add persona instructions  
5. Start the meeting and join the lobby  
6. Enter the call and interact with your AI agent in real time  
7. After the call, wait for processing  
8. Access summaries, transcripts, replay, and AI-powered chat  

---

## 📂 Project Structure
```txt
src/
│── app/ # Next.js routes (App Router)
│── components/ # UI components
│── server/ # tRPC routers, server logic
│── db/ # Drizzle schemas & database
│── agents/ # Agent definitions & personalities
│── jobs/ # Ingest background workflows
│── styles/ # Tailwind files
│── utils/ # Helpers & shared logic
```

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/antwirobert/agentmeet-ai.git
cd agentmeet-ai
```
### 2. Install dependencies
```bash
npm install
```
<br />

### 3. Set environment variables
Create a .env file:
```bash
DATABASE_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_STREAM_VIDEO_API_KEY=
STREAM_VIDEO_SECRET_KEY=
NEXT_PUBLIC_STREAM_CHAT_API_KEY=
STREAM_CHAT_SECRET_KEY=
OPENAI_API_KEY=
```
### 4. Start development server
```bash
npm run dev
```
<br />

🤝 Contributing

Contributions are welcome!
Please submit an issue or pull request.

<br />

🧑‍💻 Author

Robert Antwi
Creator of AgentMeet AI
[GitHub](https://github.com/antwirobert/) 
[LinkedIn](https://www.linkedin.com/in/robert-antwi-a0aab9277/)
