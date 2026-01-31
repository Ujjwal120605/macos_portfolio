import type { TerminalData } from "~/types";

const terminal: TerminalData[] = [
  {
    id: "about",
    title: "about",
    type: "folder",
    children: [
      {
        id: "about-bio",
        title: "bio.txt",
        type: "file",
        content: (
          <div className="py-1">
            <div>
              Hi, I am Ujjwal Bajpai. Electronics & Communication Engineering
              student at RV College of Engineering, Bengaluru.
            </div>
            <div className="mt-1">
              <pre className="text-blue-300">
                {`const ujjwal = {
    pronouns: "He" | "Him",
    location: "📍 Bangalore, Karnataka",
    education: "🎓 B.E. in ECE @ RVCE",
    cgpa: "⭐ 8.52",
    currentRole: "💼 IT Intern @ IFFCO",
    code: ["Python", "C++", "JavaScript", "TypeScript", "SQL"],
    askMeAbout: ["Web Dev", "Machine Learning", "DSA", "AI"],
    technologies: {
        frontEnd: {
            js: ["React", "Next.js"],
            css: ["Tailwind", "Bootstrap"]
        },
        backEnd: {
            js: ["Node.js", "Express"],
        },
        databases: ["MySQL", "MongoDB"],
        misc: ["Firebase", "Git", "Docker"]
    },
    achievement: "🥉 2nd Runner-Up @ BITS Pilani API Hackathon",
    currentFocus: "Building AI-powered web applications",
    funFact: "I debug in my dreams 💭"
};`}
              </pre>
            </div>
          </div>
        )
      },
      {
        id: "about-skills",
        title: "skills.txt",
        type: "file",
        content: (
          <div className="py-1">
            <div>
              <span className="text-yellow-400">Languages:</span> C++, C,
              Python, JavaScript, SQL, HTML5, CSS3.
            </div>
            <div>
              <span className="text-yellow-400">Frameworks/Tools:</span>{" "}
              React.js, Node.js, Express.js, MongoDB, Tailwind CSS, RESTful APIs,
              Git, Machine Learning.
            </div>
          </div>
        )
      },
      {
        id: "about-projects",
        title: "projects.txt",
        type: "file",
        content: (
          <ul className="list-disc ml-6">
            <li>
              <span className="text-blue-300">Yoom</span>: Modern Video Conferencing App (Zoom clone).
            </li>
            <li>
              <span className="text-blue-300">CodRev</span>: AI-Powered Code
              Review Platform using Gemini API.
            </li>
            <li>
              <span className="text-blue-300">FlowGuard AI</span>: Smart
              Traffic Management System using ML & Leaflet.js.
            </li>
            <li>
              <span className="text-blue-300">DocuMind</span>:
              Document-centric web app for structured data.
            </li>
          </ul>
        )
      },
      {
        id: "about-contact",
        title: "contact.txt",
        type: "file",
        content: (
          <ul className="list-disc ml-6">
            <li>
              Email:{" "}
              <a
                className="text-blue-300"
                href="mailto:bajpaiujjwal3@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                bajpaiujjwal3@gmail.com
              </a>
            </li>
            <li>
              Github:{" "}
              <a
                className="text-blue-300"
                href="https://github.com/Ujjwal120605"
                target="_blank"
                rel="noreferrer"
              >
                @Ujjwal120605
              </a>
            </li>
            <li>
              Linkedin:{" "}
              <a
                className="text-blue-300"
                href="https://www.linkedin.com/in/ujjwal-bajpai-9aa242289/"
                target="_blank"
                rel="noreferrer"
              >
                ujjwal-bajpai
              </a>
            </li>
          </ul>
        )
      }
    ]
  },
  {
    id: "about-dream",
    title: "my-dream.cpp",
    type: "file",
    content: (
      <div className="py-1">
        <div>
          <span className="text-yellow-400">while</span>(
          <span className="text-blue-400">coding</span>) <span>{"{"}</span>
        </div>
        <div>
          <span className="text-blue-400 ml-9">skills</span>
          <span className="text-yellow-400">++</span>;
        </div>
        <div>
          <span>{"}"}</span>
        </div>
      </div>
    )
  }
];

export default terminal;
