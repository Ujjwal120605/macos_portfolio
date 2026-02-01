import React from "react";
import { terminal, bear } from "~/configs";
import type { TerminalData } from "~/types";

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789落霞与孤鹜齐飞秋水共长天一色";
const EMOJIS = ["\\(o_o)/", "(˚Δ˚)b", "(^-^*)", "(╯‵□′)╯", "\\(°ˊДˋ°)/", "╰(‵□′)╯"];

const getEmoji = () => {
  return EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
};

interface TerminalState {
  rmrf: boolean;
  content: JSX.Element[];
}

// rain animation is adopted from: https://codepen.io/P3R0/pen/MwgoKv
const HowDare = ({ setRMRF }: { setRMRF: (value: boolean) => void }) => {
  const FONT_SIZE = 12;

  const [emoji, setEmoji] = useState("");
  const [drops, setDrops] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas) return;

    canvas.height = container.offsetHeight;
    canvas.width = container.offsetWidth;

    const columns = Math.floor(canvas.width / FONT_SIZE);
    setDrops(Array(columns).fill(1));

    setEmoji(getEmoji());
  }, []);

  const rain = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#2e9244";
    ctx.font = `${FONT_SIZE}px arial`;

    drops.forEach((y, x) => {
      const text = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
      ctx.fillText(text, x * FONT_SIZE, y * FONT_SIZE);
    });

    setDrops(
      drops.map((y) => {
        // sends the drop back to the top randomly after it has crossed the screen
        // adding randomness to the reset to make the drops scattered on the Y axis
        if (y * FONT_SIZE > canvas.height && Math.random() > 0.975) return 1;
        // increments Y coordinate
        else return y + 1;
      })
    );
  };

  useInterval(rain, 33);

  return (
    <div
      ref={containerRef}
      className="fixed size-full bg-black text-white"
      onClick={() => setRMRF(false)}
    >
      <canvas ref={canvasRef}></canvas>
      <div className="font-avenir absolute h-28 text-center space-y-4 m-auto inset-0">
        <div text-4xl>{emoji}</div>
        <div text-3xl>HOW DARE YOU!</div>
        <div>Click to go back</div>
      </div>
    </div>
  );
};

export default class Terminal extends React.Component<object, TerminalState> {
  private history = [] as string[];
  private curHistory = 0;
  private curInputTimes = 0;
  private curDirPath = [] as any;
  private curChildren = terminal as any;
  private commands: {
    [key: string]: { (): void } | { (arg?: string): void };
  };

  constructor(props: object) {
    super(props);
    this.state = {
      content: [],
      rmrf: false
    };
    this.commands = {
      cd: this.cd,
      ls: this.ls,
      cat: this.cat,
      clear: this.clear,
      help: this.help,
      fetch: this.fetch,
      contact: this.contact,
      spotify: this.spotify,
      resume: this.resume,
      projects: this.projects,
      internship: this.internship,
      leetcode: this.leetcode,
      codeforces: this.codeforces,
      github: this.github,
      skills: this.skills,
      about: this.about,
      linkedin: this.linkedin
    };
  }

  componentDidMount() {
    this.reset();
    this.generateInputRow(this.curInputTimes);
  }

  reset = () => {
    const terminal = document.querySelector("#terminal-content") as HTMLElement;
    terminal.innerHTML = "";
  };

  addRow = (row: JSX.Element) => {
    if (this.state.content.find((item) => item.key === row.key)) return;

    const content = this.state.content;
    content.push(row);
    this.setState({ content });
  };

  getCurDirName = () => {
    if (this.curDirPath.length === 0) return "~";
    else return this.curDirPath[this.curDirPath.length - 1];
  };

  getCurChildren = () => {
    let children = terminal as any;
    for (const name of this.curDirPath) {
      children = children.find((item: TerminalData) => {
        return item.title === name && item.type === "folder";
      }).children;
    }
    return children;
  };

  // move into a specified folder
  cd = (args?: string) => {
    if (args === undefined || args === "~") {
      // move to root
      this.curDirPath = [];
      this.curChildren = terminal;
    } else if (args === ".") {
      // stay in the current folder
      return;
    } else if (args === "..") {
      // move to parent folder
      if (this.curDirPath.length === 0) return;
      this.curDirPath.pop();
      this.curChildren = this.getCurChildren();
    } else {
      // move to certain child folder
      const target = this.curChildren.find((item: TerminalData) => {
        return item.title === args && item.type === "folder";
      });
      if (target === undefined) {
        this.generateResultRow(
          this.curInputTimes,
          <span>{`cd: no such file or directory: ${args}`}</span>
        );
      } else {
        this.curChildren = target.children;
        this.curDirPath.push(target.title);
      }
    }
  };

  // display content of a specified folder
  ls = () => {
    const result = [];
    for (const item of this.curChildren) {
      result.push(
        <span
          key={`terminal-result-ls-${this.curInputTimes}-${item.id}`}
          className={`${item.type === "file" ? "text-white" : "text-purple-300"}`}
        >
          {item.title}
        </span>
      );
    }
    this.generateResultRow(
      this.curInputTimes,
      <div className="grid grid-cols-4 w-full">{result}</div>
    );
  };

  // display content of a specified file
  cat = (args?: string) => {
    const file = this.curChildren.find((item: TerminalData) => {
      return item.title === args && item.type === "file";
    });

    if (file === undefined) {
      this.generateResultRow(
        this.curInputTimes,
        <span>{`cat: ${args}: No such file or directory`}</span>
      );
    } else {
      this.generateResultRow(this.curInputTimes, <span>{file.content}</span>);
    }
  };

  // clear terminal
  clear = () => {
    this.curInputTimes += 1;
    this.reset();
  };

  help = () => {
    const help = (
      <ul className="list-disc ml-6 pb-1.5">
        <li>
          <span text-red-400>cat {"<file>"}</span> - See the content of {"<file>"}
        </li>
        <li>
          <span text-red-400>cd {"<dir>"}</span> - Move into
          {" <dir>"}, "cd .." to move to the parent directory, "cd" or "cd ~" to return to
          root
        </li>
        <li>
          <span text-red-400>ls</span> - See files and directories in the current
          directory
        </li>
        <li>
          <span text-red-400>clear</span> - Clear the screen
        </li>
        <li>
          <span text-red-400>help</span> - Display this help menu
        </li>
        <li>
          <span text-red-400>rm -rf /</span> - :)
        </li>
        <li>
          <span text-red-400>fetch</span> - Show system info
        </li>
        <li>
          <span text-red-400>contact</span> - Contact info
        </li>
        <li>
          <span text-red-400>spotify</span> - Now playing
        </li>
        <li>
          <span text-red-400>resume</span> - View resume
        </li>
        <li>
          <span text-red-400>projects</span> - View my projects
        </li>
        <li>
          <span text-red-400>internship</span> - Experience info
        </li>
        <li>
          <span text-red-400>leetcode</span> - Coding stats
        </li>
        <li>
          <span text-red-400>github</span> - Github profile
        </li>
        <li>
          <span text-red-400>skills</span> - Tech stack
        </li>
        <li>
          <span text-red-400>about</span> - About me
        </li>
        <li>
          <span text-red-400>linkedin</span> - LinkedIn profile
        </li>
        <li>
          press <span text-red-400>up arrow / down arrow</span> - Select history commands
        </li>
        <li>
          press <span text-red-400>tab</span> - Auto complete
        </li>
      </ul>
    );
    this.generateResultRow(this.curInputTimes, help);
  };

  fetch = () => {
    const fetch = (
      <div className="flex gap-4">
        <div className="text-purple-400 font-bold hidden sm:block">
          <pre>
            {`
       /\\
      /  \\
     /    \\
    /      \\
   /   /\\   \\
  /   /  \\   \\
 /   /    \\   \\
/___/      \\___\\
`}
          </pre>
        </div>
        <div className="space-y-1">
          <div className="text-xl font-bold text-white">Ujjwal Bajpai</div>
          <div className="w-full h-px bg-gray-600 my-2"></div>
          <div>
            <span className="text-yellow-300 font-bold">OS:</span> macOS Portfolio v2.0
          </div>
          <div>
            <span className="text-green-300 font-bold">Host:</span> Vercel
          </div>
          <div>
            <span className="text-cyan-300 font-bold">Uptime:</span> Forever
          </div>
          <div>
            <span className="text-blue-300 font-bold">Packages:</span> 142 (npm)
          </div>
          <div>
            <span className="text-pink-300 font-bold">Shell:</span> zsh
          </div>
          <div>
            <span className="text-red-300 font-bold">Theme:</span> Dark Mode
          </div>
          <div>
            <span className="text-orange-300 font-bold">Role:</span> Full Stack Developer
          </div>
        </div>
      </div>
    );
    this.generateResultRow(this.curInputTimes, fetch);
  };

  contact = () => {
    const contact = (
      <div className="space-y-2">
        <div className="text-lg font-bold text-white mb-2">Connect with me:</div>
        <div className="grid grid-cols-1 gap-1">
          <div>
            <span className="text-blue-400 font-bold w-24 inline-block">GitHub:</span>{" "}
            <a
              href="https://github.com/Ujjwal120605"
              className="hover:underline text-gray-300"
            >
              github.com/Ujjwal120605
            </a>
          </div>
          <div>
            <span className="text-blue-500 font-bold w-24 inline-block">LinkedIn:</span>{" "}
            <a
              href="https://linkedin.com/in/ujjwalbajpai"
              className="hover:underline text-gray-300"
            >
              linkedin.com/in/ujjwalbajpai
            </a>
          </div>
          <div>
            <span className="text-red-400 font-bold w-24 inline-block">Email:</span>{" "}
            <a
              href="mailto:bajpaiujjwal3@gmail.com"
              className="hover:underline text-gray-300"
            >
              bajpaiujjwal3@gmail.com
            </a>
          </div>
        </div>
      </div>
    );
    this.generateResultRow(this.curInputTimes, contact);
  };

  spotify = () => {
    const spotify = (
      <div className="flex items-center gap-2">
        <span className="i-mdi:spotify text-green-500 text-xl"></span>
        <span className="text-white">
          Now Playing: <span className="font-bold text-green-400">Learning To Fly</span> -
          Unknown
        </span>
      </div>
    );
    this.generateResultRow(this.curInputTimes, spotify);
  };

  resume = () => {
    window.open("/resume.pdf", "_blank");
    this.generateResultRow(
      this.curInputTimes,
      <span className="text-green-400">Opening resume.pdf in new tab...</span>
    );
  };

  projects = () => {
    const projectsList = bear[1].md.map((project) => (
      <div key={project.id} className="mb-2">
        <div className="text-blue-400 font-bold text-lg">
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            {project.title}
          </a>
        </div>
        <div className="text-gray-300">{project.excerpt}</div>
      </div>
    ));

    const projects = (
      <div>
        <div className="text-yellow-400 font-bold text-xl mb-3">My Projects</div>
        {projectsList}
      </div>
    );
    this.generateResultRow(this.curInputTimes, projects);
  };

  internship = () => {
    const internship = (
      <div>
        <div className="text-pink-400 font-bold text-xl mb-3">Experience</div>
        <div className="mb-4">
          <div className="text-lg font-bold text-green-300">IT Intern</div>
          <div className="text-white mb-1">
            <a
              href="https://www.iffco.in"
              target="_blank"
              className="hover:underline"
              rel="noreferrer"
            >
              Indian Farmers Fertiliser Cooperative Limited (IFFCO)
            </a>
          </div>
          <div className="text-gray-400 italic">Upcoming / Recent</div>
          <div className="text-gray-300 mt-2">
            Currently working as an IT Intern, gaining hands-on experience in the
            industry.
          </div>
        </div>
      </div>
    );
    this.generateResultRow(this.curInputTimes, internship);
  };

  about = () => {
    const about = (
      <div className="space-y-3 text-gray-200">
        <div>
          I am a 3rd-year{" "}
          <span className="text-yellow-300 font-bold">
            Electronics and Communication Engineering
          </span>{" "}
          student and currently an IT Intern at{" "}
          <span className="text-green-400 font-bold">IFFCO</span>, with a strong passion
          for circuit design, signal processing, and communication systems.
        </div>
        <div>
          Alongside my core engineering expertise, I am proficient in{" "}
          <span className="text-blue-300 font-bold">Python</span> and{" "}
          <span className="text-blue-300 font-bold">C++</span>, actively applying these
          skills through problem solving on{" "}
          <span className="text-yellow-500 font-bold">LeetCode</span> and contributing to
          projects on <span className="text-purple-300 font-bold">GitHub</span>.
        </div>
        <div>
          Driven by curiosity and a commitment to continuous learning, I enjoy developing
          innovative solutions that bridge hardware and software domains. My experience
          spans academic projects, hackathons, internships, and self-initiated work, where
          I combine analytical thinking with adaptability to tackle complex challenges. I
          aim to leverage my skills to contribute to impactful, cutting-edge technologies.
        </div>
      </div>
    );
    this.generateResultRow(this.curInputTimes, about);
  };

  linkedin = () => {
    const linkedin = (
      <div className="flex items-center gap-3">
        <span className="i-simple-icons:linkedin text-blue-500 text-2xl" />
        <div>
          <div className="font-bold text-blue-500 text-lg">LinkedIn</div>
          <div className="text-white">Connect with me professionally!</div>
          <a
            href="https://www.linkedin.com/in/ujjwal-bajpai-9aa242289/"
            target="_blank"
            className="text-blue-300 hover:underline"
            rel="noreferrer"
          >
            linkedin.com/in/ujjwal-bajpai-9aa242289/
          </a>
        </div>
      </div>
    );
    this.generateResultRow(this.curInputTimes, linkedin);
  };

  leetcode = () => {
    const leetcode = (
      <div className="flex items-center gap-3">
        <span className="i-simple-icons:leetcode text-yellow-500 text-2xl" />
        <div>
          <div className="font-bold text-yellow-500 text-lg">LeetCode</div>
          <div className="text-white">
            Problems Solved: <span className="text-green-400 font-bold">425+</span>
          </div>
          <a
            href="https://leetcode.com/u/Ujjwal120605/"
            target="_blank"
            className="text-blue-400 hover:underline"
            rel="noreferrer"
          >
            View Profile
          </a>
        </div>
      </div>
    );
    this.generateResultRow(this.curInputTimes, leetcode);
  };

  codeforces = () => {
    const codeforces = (
      <div className="flex items-center gap-3">
        <span className="i-simple-icons:codeforces text-blue-500 text-2xl" />
        <div>
          <div className="font-bold text-blue-500 text-lg">Codeforces</div>
          <div className="text-white">
            Rating: <span className="text-green-400 font-bold">900</span>
          </div>
          <div className="text-gray-400 text-sm">Pupil (Max)</div>
        </div>
      </div>
    );
    this.generateResultRow(this.curInputTimes, codeforces);
  };

  github = () => {
    const github = (
      <div className="flex items-center gap-3">
        <span className="i-simple-icons:github text-white text-2xl" />
        <div>
          <div className="font-bold text-white text-lg">GitHub</div>
          <div className="text-gray-300">Check out my open source contributions!</div>
          <a
            href="https://github.com/Ujjwal120605"
            target="_blank"
            className="text-blue-400 hover:underline"
            rel="noreferrer"
          >
            github.com/Ujjwal120605
          </a>
        </div>
      </div>
    );
    this.generateResultRow(this.curInputTimes, github);
  };

  skills = () => {
    const skills = (
      <div>
        <div className="text-cyan-400 font-bold text-xl mb-2">Technical Skills</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <span className="text-green-300 font-bold">Languages:</span> C++, JavaScript,
            TypeScript, Python, HTML/CSS, SQL
          </div>
          <div>
            <span className="text-blue-300 font-bold">Frontend:</span> React.js, Next.js,
            TailwindCSS
          </div>
          <div>
            <span className="text-purple-300 font-bold">Backend:</span> Node.js, Express,
            PostgreSQL, MongoDB
          </div>
          <div>
            <span className="text-orange-300 font-bold">Tools:</span> Git, GitHub, VS
            Code, Postman, Vercel
          </div>
        </div>
      </div>
    );
    this.generateResultRow(this.curInputTimes, skills);
  };

  autoComplete = (text: string) => {
    if (text === "") return text;

    const input = text.split(" ");
    const cmd = input[0];
    const args = input[1];

    let result = text;

    if (args === undefined) {
      const guess = Object.keys(this.commands).find((item) => {
        return item.substring(0, cmd.length) === cmd;
      });
      if (guess !== undefined) result = guess;
    } else if (cmd === "cd" || cmd === "cat") {
      const type = cmd === "cd" ? "folder" : "file";
      const guess = this.curChildren.find((item: TerminalData) => {
        return item.type === type && item.title.substring(0, args.length) === args;
      });
      if (guess !== undefined) result = cmd + " " + guess.title;
    }
    return result;
  };

  keyPress = (e: React.KeyboardEvent) => {
    const keyCode = e.key;
    const inputElement = document.querySelector(
      `#terminal-input-${this.curInputTimes}`
    ) as HTMLInputElement;
    const inputText = inputElement.value.trim();
    const input = inputText.split(" ");

    if (keyCode === "Enter") {
      // ----------- run command -----------
      this.history.push(inputText);

      const cmd = input[0];
      const args = input[1];

      // we can't edit the past input
      inputElement.setAttribute("readonly", "true");

      if (inputText.substring(0, 6) === "rm -rf") this.setState({ rmrf: true });
      else if (cmd && Object.keys(this.commands).includes(cmd)) {
        this.commands[cmd](args);
      } else {
        this.generateResultRow(
          this.curInputTimes,
          <span>{`zsh: command not found: ${cmd}`}</span>
        );
      }

      // point to the last history command
      this.curHistory = this.history.length;

      // generate new input row
      this.curInputTimes += 1;
      this.generateInputRow(this.curInputTimes);
    } else if (keyCode === "ArrowUp") {
      // ----------- previous history command -----------
      if (this.history.length > 0) {
        if (this.curHistory > 0) this.curHistory--;
        const historyCommand = this.history[this.curHistory];
        inputElement.value = historyCommand;
      }
    } else if (keyCode === "ArrowDown") {
      // ----------- next history command -----------
      if (this.history.length > 0) {
        if (this.curHistory < this.history.length) this.curHistory++;
        if (this.curHistory === this.history.length) inputElement.value = "";
        else {
          const historyCommand = this.history[this.curHistory];
          inputElement.value = historyCommand;
        }
      }
    } else if (keyCode === "Tab") {
      // ----------- auto complete -----------
      inputElement.value = this.autoComplete(inputText);
      // prevent tab outside the terminal
      e.preventDefault();
    }
  };

  focusOnInput = (id: number) => {
    const input = document.querySelector(`#terminal-input-${id}`) as HTMLInputElement;
    input.focus();
  };

  generateInputRow = (id: number) => {
    const newRow = (
      <div key={`terminal-input-row-${id}`} flex>
        <div className="w-max hstack space-x-1.5">
          <span text-yellow-200>
            ujjwal@macbook-pro <span text-green-300>{this.getCurDirName()}</span>
          </span>
          <span text-red-400>{">"}</span>
        </div>
        <input
          id={`terminal-input-${id}`}
          className="flex-1 px-1 text-white outline-none bg-transparent"
          onKeyDown={this.keyPress}
          autoFocus={true}
        />
      </div>
    );
    this.addRow(newRow);
  };

  generateResultRow = (id: number, result: JSX.Element) => {
    const newRow = (
      <div key={`terminal-result-row-${id}`} break-all>
        {result}
      </div>
    );
    this.addRow(newRow);
  };

  render() {
    return (
      <div
        className="terminal font-terminal font-normal relative h-full bg-gray-800/90 overflow-y-scroll"
        text="white sm"
        onClick={() => this.focusOnInput(this.curInputTimes)}
      >
        {this.state.rmrf && (
          <HowDare setRMRF={(value: boolean) => this.setState({ rmrf: value })} />
        )}
        <div p="y-2 x-1.5">
          <div className="text-gray-400">
            Last login: {new Date().toDateString()} on ttys001
          </div>
          <br />
          <div>
            <span className="text-green-400">➜</span>{" "}
            <span className="text-cyan-300">~</span>{" "}
            <span className="text-gray-400">loading profile...</span>
          </div>
          <div>
            <span className="text-green-400">✔</span> Loaded{" "}
            <span className="text-yellow-300">Ujjwal's Portfolio v2.0</span>
          </div>
          <div>
            <span className="text-green-400">✔</span> Initialized{" "}
            <span className="text-blue-300">Electronics & Communication modules</span>
          </div>
          <div>
            <span className="text-green-400">✔</span> Connected to{" "}
            <span className="text-purple-300">GitHub (425+ LeetCode Solved)</span>
          </div>
          <br />
          <div className="text-blue-400 font-bold">
            Welcome to Ujjwal Bajpai's Terminal! 🚀
          </div>
          <div className="text-gray-400">
            Type <span className="text-gray-200 bg-gray-700 px-1 rounded">help</span> to
            view available commands.
          </div>
        </div>
        <div id="terminal-content" p="x-1.5 b-2">
          {this.state.content}
        </div>
      </div>
    );
  }
}
