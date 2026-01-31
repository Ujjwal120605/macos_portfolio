import type { StateCreator } from "zustand";

export interface UserSlice {
  typoraMd: string;
  setTyporaMd: (v: string) => void;
  faceTimeImages: {
    [date: string]: string;
  };
  addFaceTimeImage: (v: string) => void;
  delFaceTimeImage: (k: string) => void;
}

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  typoraMd: `# Hi there! 👋 I'm Ujjwal Bajpai

I am an **Electronics & Communication Engineering student** at **RV College of Engineering, Bengaluru**, passionate about **Full-Stack Development** and **AI-driven solutions**.

## 🚀 Professional Experience

### 🏢 IT Intern @ IFFCO
*   Developed a secure **HRMS portal** serving **500+ employees**.
*   Analyzed and optimized **industrial automation systems**, improving operational efficiency.
*   Gained hands-on experience with enterprise-level software development lifecycles.

### 👥 Technical Member @ RVCE ACM
*   Organized **technical workshops and bootcamps** for **200+ students**.
*   Mentored peers on **Full-Stack Development** and **Data Structures & Algorithms**.
*   Contributed to building a vibrant coding culture on campus.

## 🛠️ Skills & Expertise
*   **Languages**: C++, Python, JavaScript, SQL.
*   **Web Technologies**: React.js, Node.js, Express.js, MongoDB, Tailwind CSS.
*   **AI/ML**: Machine Learning, Gemini API, Predictive Modeling.
*   **Tools**: Git, Docker, Postman.

## 🏆 Achievements
*   **Top 10% on LeetCode**: Solved **425+** problems.
*   **2nd Runner-Up**: BITS Pilani API Hackathon 2025.
*   **AIR 913**: COMEDK UGET 2023.

Feel free to explore my work or reach out!
*   [GitHub](https://github.com/Ujjwal120605)
*   [LinkedIn](https://www.linkedin.com/in/ujjwal-bajpai-9aa242289/)`,
  setTyporaMd: (v) => set(() => ({ typoraMd: v })),
  faceTimeImages: {},
  addFaceTimeImage: (v) =>
    set((state) => {
      const images = state.faceTimeImages;
      images[+new Date()] = v;
      return { faceTimeImages: images };
    }),
  delFaceTimeImage: (k) =>
    set((state) => {
      const images = state.faceTimeImages;
      delete images[k];
      return { faceTimeImages: images };
    })
});
