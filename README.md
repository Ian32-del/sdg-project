# sdg-project

🌍 SDG 3 – HEALTH AND WELLNESS WEBSITE

A modern web project dedicated to promoting Sustainable Development Goal 3 (Good Health and Well-being).
Built using React, TypeScript, Vite, and Tailwind CSS for a fast, responsive, and maintainable frontend.


🚀 Tech Stack

- ⚛️ React – UI framework

- 🟦 TypeScript – Type-safe JavaScript

- ⚡ Vite – Next-generation build tool

- 🎨 Tailwind CSS – Utility-first CSS styling

- 🔧 ESLint + Prettier – Code linting and formatting

- 🧠 React Query / Router DOM – Data fetching & routing

- 🧩 Radix UI + Lucide – Accessible UI components and icons


📦 Project Setup

1. Clone the repository

    git clone https://github.com/<your-username>/sdg3-health-wellness.git

    cd sdg3-health-wellness/frontend/my-app

2. Install dependencies

    npm install

If you encounter dependency conflicts, use:

    npm install --legacy-peer-deps

3. Run the development server

    npm run dev


Then open the link provided in the terminal (default: http://localhost:5173
 or the next available port).


 🧰 Folder Structure

 my-app/
├── public/              # Static assets (index.html, icons, etc.)
├── src/                 # Application source code
│   ├── components/      # Reusable UI components
│   ├── lib/             # Utility functions
│   ├── App.tsx          # Main App entry
│   ├── main.tsx         # React root render
│   └── index.css        # Tailwind styles
├── vite.config.ts       # Vite configuration
├── tailwind.config.ts   # Tailwind customization
├── tsconfig.json        # TypeScript configuration
├── package.json         # Dependencies and scripts
└── README.md


💡 Notes

Ensure Node.js ≥ 18 and npm ≥ 9 are installed.

If vite reports a missing dependency (like autoprefixer), run:

    npm install -D autoprefixer

You can change the dev server port in vite.config.ts

Developed by Chris