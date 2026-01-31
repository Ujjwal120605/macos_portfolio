import type { BearData } from "~/types";

const bear: BearData[] = [
  {
    id: "profile",
    title: "Profile",
    icon: "i-fa-solid:user",
    md: [
      {
        id: "about-me",
        title: "About Me",
        file: "markdown/about-me.md",
        icon: "i-la:dragon",
        excerpt: "Full-Stack Developer & Competitive Programmer..."
      },
      {
        id: "github-stats",
        title: "Github Stats",
        file: "markdown/github-stats.md",
        icon: "i-icon-park-outline:github",
        excerpt: "Check out my GitHub contributions & stats..."
      },
      {
        id: "about-site",
        title: "About This Site",
        file: "markdown/about-site.md",
        icon: "i-octicon:browser",
        excerpt: "A portfolio simulating macOS's GUI..."
      }
    ]
  },
  {
    id: "project",
    title: "Projects",
    icon: "i-octicon:repo",
    md: [
      {
        id: "yoom",
        title: "Yoom",
        file: "markdown/yoom.md",
        icon: "i-fa-solid:video",
        excerpt: "A modern video conferencing app built with Next.js...",
        link: "https://github.com/Ujjwal120605/yoom"
      },
      {
        id: "codrev",
        title: "CodRev",
        file: "markdown/codrev.md",
        icon: "i-heroicons-solid:code",
        excerpt: "AI-Powered Code Review Platform using Gemini API...",
        link: "https://github.com/Ujjwal120605/codrev"
      },
      {
        id: "flowguard",
        title: "FlowGuard AI",
        file: "markdown/flowguard.md",
        icon: "i-fa-solid:car-side",
        excerpt: "Smart Traffic Management System with ML...",
        link: "https://github.com/Ujjwal120605/FlowGuard"
      },
      {
        id: "documind",
        title: "DocuMind",
        file: "markdown/documind.md",
        icon: "i-heroicons-solid:document-text",
        excerpt: "Document-centric web app for structured data...",
        link: "https://github.com/Ujjwal120605/rag"
      }
    ]
  }
];

export default bear;
