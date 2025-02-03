This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



# Student Portal

A full-stack Student Portal application built with **Next.js 13** (App Router) and **Prisma ORM** for managing student applications. This portal allows students to register, log in, and apply for various services. It includes features such as a dashboard with a sidebar, an application form, and a list of applications with their status.

## Features

- **Authentication**: Student login and registration
- **Dashboard**: Navbar and sidebar after login
- **Menu**: 
  - New Application
  - Application List (view application status)
- **Application Process**: 
  - General Information
  - Address Information
  - Academic Information
  - Visa Details
  - Passport Details
  - English Proficiency Proof

## Tech Stack

- **Frontend**: 
  - Next.js 13 (App Router)
  - TypeScript
  - Tailwind CSS (for styling)
- **Backend**:
  - Prisma ORM for database interaction
  - MySQL (or any database configured)
- **Authentication**: JWT (JSON Web Tokens)
  
## Installation

Follow these steps to get the project up and running locally.

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/student-portal.git
2. Navigate into the project directory
bash
Copy
Edit
cd student-portal
3. Install the dependencies
bash
Copy
Edit
npm install
4. Set up the database
Ensure you have MySQL running on your machine.
Create a .env file in the root of the project and add your database connection string:
env
Copy
Edit
DATABASE_URL="mysql://root:password@localhost:3306/laravel"
5. Set up Prisma
Run the following commands to initialize Prisma and generate the Prisma client:

bash
Copy
Edit
npx prisma migrate dev --name init   # Apply migrations to the database
npx prisma generate                 # Generate Prisma client
6. Run the development server
bash
Copy
Edit
npm run dev
The app should now be running at http://localhost:3000.

Folder Structure
bash
Copy
Edit
student-portal/
│── src/
│   ├── app/                           # Next.js pages (App Router)
│   │   ├── api/                       # API routes
│   │   │   ├── applications/          # Application routes
│   │   │   │   ├── list/              # Application list route
│   │   │   │   │   ├── route.ts
│   │   ├── lib/                       # Prisma client and other utility files
│   │   │   ├── prisma.ts              # Prisma client
│── prisma/
│   ├── schema.prisma                  # Prisma schema
│── .env                                # Environment variables
│── next.config.js                     # Next.js configuration
│── tsconfig.json                      # TypeScript configuration
How It Works
1. Authentication
The system uses JWT tokens for student authentication. When a student logs in, a token is generated and stored in memory. This token is used for making authenticated requests to protected routes.

2. Application Process
The application process is split into multiple steps, and each section allows students to fill in their personal information, academic records, and supporting documents like passport, visa, and English proficiency proof.

3. Prisma
Prisma ORM is used to interact with the database. Models are defined in the schema.prisma file, and migrations are applied using Prisma CLI to keep the database in sync with the app's data models.

Database Models
Student
id: Primary key, unique identifier (UUID)
name: Name of the student
email: Unique email address
createdAt: Timestamp of when the record was created
Contributing
Feel free to fork this repository and submit pull requests for enhancements, bug fixes, or features. Contributions are welcome!

License
This project is licensed under the MIT License - see the LICENSE file for details.

Author
Created by Your Name.

markdown
Copy
Edit

### **Customization**

- **Project Name**: Replace `"Student Portal"` and project-related text with your actual project name if needed.
- **GitHub URL**: Update the GitHub URL in the "Clone the repository" section to your actual repository link.
- **Database URL**: Modify the `DATABASE_URL` in the `.env` file based on your MySQL configuration.
- **License**: Add your preferred license or link to your project's license.

Let me k