# Student Portal

A full-stack **Student Portal** application built with **Next.js 13+ (App Router)** and **Prisma ORM** for managing student applications. This portal enables students to register, log in, and apply for various services. The application includes a dashboard, application form, and application status tracking.

---

## 🚀 Features

### 🔐 Authentication
- Student login and registration
- JWT-based authentication

### 📊 Dashboard
- Navbar and sidebar after login
- User-friendly interface

### 📂 Application Management
- **New Application**: Start a new student application
- **Application List**: View application status

### 📝 Application Process
- General Information
- Address Information
- Academic Information
- Visa Details
- Passport Details
- English Proficiency Proof

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 13+ (App Router)**
- **TypeScript**
- **Tailwind CSS** (for styling)

### Backend
- **Prisma ORM** (for database interaction)
- **MySQL** (or any supported database)

### Authentication
- **JSON Web Tokens (JWT)**

---

## ⚡ Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/student-portal.git
cd student-portal
```

### 2️⃣ Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3️⃣ Set Up the Database
Ensure you have MySQL running, then create a `.env` file in the project root:
```env
DATABASE_URL="mysql://root:@127.0.0.1:3306/student_portal"
```

### 4️⃣ Initialize Prisma
```bash
npx prisma migrate dev --name init   # Apply migrations
npx prisma generate                 # Generate Prisma client
```

### 5️⃣ Start the Development Server
```bash
npm run dev
# or
yarn dev
```
The app should now be running at **[http://localhost:3000](http://localhost:3000)**.

---

## 📁 Folder Structure
```
student-portal/
│── src/
│   ├── app/                           # Next.js application (App Router)
│   │   ├── api/                       # API routes
│   │   │   ├── applications/          # Application-related API routes
│   │   │   │   ├── list/              # Fetch application list
│   │   │   │   │   ├── route.ts
│   │   ├── lib/                       # Utility functions and configurations
│   │   │   ├── prisma.ts              # Prisma client setup
│── prisma/
│   ├── schema.prisma                  # Prisma schema definition
│── .env                                # Environment variables
│── next.config.js                     # Next.js configuration
│── tsconfig.json                      # TypeScript configuration
```

---

## 🔧 How It Works

### 1️⃣ Authentication
- Uses **JWT tokens** for secure authentication.
- Tokens are stored in HTTP-only cookies.
- Protected API routes ensure authorized access.

### 2️⃣ Application Process
- The application process is divided into multiple steps.
- Students provide personal, academic, and supporting document details.
- Data is stored and managed using Prisma ORM.

### 3️⃣ Prisma ORM & Database
- **Prisma ORM** is used for database interactions.
- Models are defined in `schema.prisma`, and migrations keep the database in sync.

#### Example: Student Model (Prisma Schema)
```prisma
model Student {
  id        String  @id @default(uuid())
  name      String
  email     String  @unique
  createdAt DateTime @default(now())
}
```

---

## 📜 Contributing
Feel free to fork this repository and submit pull requests for improvements, bug fixes, or new features. Contributions are welcome! 🎉

---

## 📄 License
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.

---

## 👨‍💻 Author
Developed by **Shamim Reza**. Connect with me on [GitHub](https://github.com/yourusername).

---

## 🔗 Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MySQL Documentation](https://dev.mysql.com/doc/)

