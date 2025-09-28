# 🎬 Movie Recommendation App

A **real-world front-end project** built during **ALX ProDev Front-End Program (Project Nexus)**.  
The app allows users to browse trending movies, view detailed movie information, watch trailers, and save favorite movies for later.  

🌍 **Live Demo:** [Movie Recommendation App](https://movie-recommendation-app-delta-rosy.vercel.app)  
💻 **GitHub Repository:** [Bouman10/movie-recommendation-app](https://github.com/Bouman10/movie-recommendation-app)

---

## 📖 Overview
This project reflects a practical scenario where developers must build **scalable, user-focused applications**.  
It demonstrates integration with external APIs, dynamic routing with Next.js, and user data management via LocalStorage — all while prioritizing seamless user experience.  

---

## 🎯 Project Goals
- **Dynamic Routing:** Implemented using Next.js for detailed movie pages.  
- **User Personalization:** Users can save and view favorite movies.  
- **Interactive Dashboard:** Browse trending movies with a responsive and visually engaging design.  
- **Recommendations:** Get tailored movie suggestions on the details page.  

---

## ⚡ Key Features
1. **API Integration**
   - Fetches trending movies using [The Movie Database (TMDb)](https://www.themoviedb.org/) API.  
   - Handles loading states and API errors gracefully.  

2. **Dynamic Routing**
   - Detailed pages for each movie (`/movie/[id]`).  
   - Movie details include description, cast, and official trailer.  

3. **Favorites**
   - Save movies locally using **LocalStorage**.  
   - Favorites can be viewed anytime from the navigation bar.  

4. **Responsive & Interactive UI**
   - Fully responsive across devices.  
   - Shared `Button` and `Header` components ensure consistent design.  


## 🛠️ Tech Stack
- **Next.js 15** – Server-side rendering & dynamic routing  
- **React** – UI building  
- **TypeScript** – Type safety & scalability  
- **Tailwind CSS** – Utility-first styling  
- **Vercel** – Deployment & hosting  


## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash

git clone https://github.com/Bouman10/movie-recommendation-app.git

cd movie-recommendation-app

2️⃣ Install Dependencies
npm install

3️⃣ Set Up Environment Variables
Create a .env.local file in the project root and add your TMDb API key:
NEXT_PUBLIC_TMDB_API_KEY=dfb5315d5a6b784e9205bfca58194bad

4️⃣ Run the Development Server
npm run dev
Visit http://localhost:3000 to view the app.

📦 Deployment
This project is deployed with Vercel:
https://movie-recommendation-app-delta-rosy.vercel.app

📊 Real-World Skills Gained
API integration & error handling
Building reusable React components
Managing local state & LocalStorage
Responsive UI design with Tailwind CSS
Deploying modern web apps with Vercel

🙌 Acknowledgements
The Movie Database (TMDb) for the API.
ALX ProDev Front-End Program for guidance and project inspiration.