import type { TerminalCommand } from "@/types";

const SECTIONS = ["hero", "about", "experience", "skills", "contact"];

function scrollToSection(id: string): string {
  if (typeof document === "undefined") return `> Section '${id}' not found.`;
  const el = document.getElementById(id);
  if (!el) return `> Section '${id}' not found. Try: ${SECTIONS.join(", ")}`;
  el.scrollIntoView({ behavior: "smooth" });
  return `> Navigating to ${id}...`;
}

export const COMMANDS: TerminalCommand[] = [
  {
    name: "help",
    description: "List available commands",
    handler: () => [
      "Available commands:",
      "",
      "  help         — Show this help message",
      "  about        — About Michael",
      "  skills       — List technical skills",
      "  work         — View work experience",
      "  contact      — Contact information",
      "  goto <id>    — Navigate to a section (hero, about, experience, skills, contact)",
      "  whoami       — Who is running this terminal?",
      "  clear        — Clear the terminal",
      "  exit         — Close terminal",
      "",
      "Tip: press ↑/↓ to navigate history",
    ],
  },
  {
    name: "whoami",
    description: "Who is running this?",
    handler: () => [
      "> You are an unknown visitor.",
      "> I am MZL — Michael Z Lin.",
      "> Frontend engineer. 8+ years. 4 design systems shipped.",
      "> I built this terminal to impress you.",
      "> Is it working?",
    ],
  },
  {
    name: "about",
    description: "About Michael",
    handler: () => [
      "╔══════════════════════════════════════╗",
      "║  Michael Z Lin (MZL)                 ║",
      "║  Frontend Engineer                   ║",
      "║  React · TypeScript · Design Systems ║",
      "╚══════════════════════════════════════╝",
      "",
      "8+ years building interfaces that feel",
      "as good as they look. Shipped 4 design",
      "systems across product organisations.",
      "",
      "Currently: open to opportunities.",
    ],
  },
  {
    name: "skills",
    description: "List skills",
    handler: () => [
      "// Core",
      "  TypeScript · React 19 · Next.js · Node.js",
      "",
      "// Styling",
      "  Tailwind CSS · CSS Modules · Framer Motion · GSAP",
      "",
      "// Tooling",
      "  Vite · Webpack · Vitest · Playwright",
      "",
      "// Architecture",
      "  RSC · App Router · State Management · Design Systems",
    ],
  },
  {
    name: "work",
    description: "View work experience",
    handler: () => {
      scrollToSection("experience");
      return [
        "Propeller Aero   Software Engineer          Jan 2024 – Oct 2025",
        "Nova             Software Engineer          Mar 2023 – Jun 2023",
        "Thinkmill        Software Engineer          Oct 2021 – Nov 2022",
        "Lendi            Frontend Developer (Cont.) Mar 2021 – Sep 2021",
        "EdApp            Frontend Developer         Aug 2018 – Jun 2020",
        "",
        "> Scrolling to: #experience",
      ];
    },
  },
  {
    name: "contact",
    description: "Contact information",
    handler: () => [
      "GitHub:   github.com/ronalechat",
      "LinkedIn: linkedin.com/in/michael-z-lin",
      "Email:    dir.michaellin@gmail.com",
      "",
      "> Open to freelance & full-time roles.",
    ],
  },
  {
    name: "goto",
    description: "Navigate to a section",
    handler: (args) => {
      const id = args[0];
      if (!id) return `> Usage: goto <section>  — Options: ${SECTIONS.join(", ")}`;
      if (!SECTIONS.includes(id)) return `> Unknown section: '${id}'. Options: ${SECTIONS.join(", ")}`;
      return scrollToSection(id);
    },
  },
  {
    name: "clear",
    description: "Clear terminal output",
    handler: () => "__CLEAR__",
  },
  {
    name: "exit",
    description: "Close terminal",
    handler: () => "__EXIT__",
  },
  // Easter eggs
  {
    name: "sudo",
    description: "Escalate privileges",
    handler: () => "> Nice try. You don't have sudo access here.",
  },
  {
    name: "ls",
    description: "List files",
    handler: () => [
      "drwxr-xr-x  about/",
      "drwxr-xr-x  experience/",
      "drwxr-xr-x  skills/",
      "-rw-r--r--  contact.txt",
      "-rw-r--r--  README.md",
    ],
  },
  {
    name: "cat",
    description: "Read a file",
    handler: (args) => {
      if (args[0] === "README.md") {
        return [
          "# MZL Website",
          "",
          "Built with Next.js 16 · TypeScript · Tailwind",
          "Framer Motion · GSAP · Custom Canvas",
          "",
          "You found the terminal. You're curious.",
          "I like you already.",
        ];
      }
      return `> cat: ${args[0] || "file"}: No such file or directory`;
    },
  },
];

export function resolveCommand(
  input: string,
  commands: TerminalCommand[]
): string | string[] {
  const [name, ...args] = input.trim().toLowerCase().split(/\s+/);
  const cmd = commands.find((c) => c.name === name);
  if (!cmd) {
    return `> Command not found: '${name}'. Type 'help' for available commands.`;
  }
  return cmd.handler(args);
}
