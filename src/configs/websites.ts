import type { WebsitesData } from "~/types";

const websites: WebsitesData = {
  favorites: {
    title: "SNS Links",
    sites: [
      {
        id: "my-github",
        title: "Github",
        img: "img/sites/github.svg",
        link: "https://github.com/Ujjwal120605"
      },
      {
        id: "my-linkedin",
        title: "Linkedin",
        img: "img/sites/linkedin.svg",
        link: "https://www.linkedin.com/in/ujjwal-bajpai-9aa242289/"
      },
      {
        id: "my-email",
        title: "Email",
        img: "img/sites/gmail.svg",
        link: "mailto:bajpaiujjwal3@gmail.com"
      }
    ]
  },
  freq: {
    title: "Frequently Visited",
    sites: [
      {
        id: "github",
        title: "Github",
        img: "img/sites/github.svg",
        link: "https://github.com/Ujjwal120605"
      },
      {
        id: "leetcode",
        title: "LeetCode",
        img: "img/sites/leetcode.svg",
        link: "https://leetcode.com/u/ujjwalbajpai/"
      },
      {
        id: "codeforces",
        title: "Codeforces",
        img: "https://cdn4.iconfinder.com/data/icons/logos-brands-5/24/codeforces-512.png",
        link: "https://codeforces.com/profile/ujj120605"
      },
      {
        id: "stackoverflow",
        title: "Stack Overflow",
        img: "https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png",
        link: "https://stackoverflow.com/"
      },
      {
        id: "youtube",
        title: "YouTube",
        img: "https://www.youtube.com/s/desktop/1f6e2/img/favicon_144x144.png",
        link: "https://www.youtube.com/"
      }
    ]
  }
};

export default websites;
