# my-v0-project

A cross-platform Next.js + React + Tailwind CSS project.

## Prerequisites

To run this project, you need to have Node.js and a package manager installed on your system.

### Node.js

Node.js is required. We recommend using a Node.js version manager like `nvm` (Node Version Manager) to easily install and switch between Node.js versions.

*   **Using nvm (Recommended)**:
    *   **Linux/macOS**: Follow the installation instructions on the [nvm GitHub page](https://github.com/nvm-sh/nvm#installing-and-updating). After installing nvm, run:
        ```sh
        nvm install --lts
        nvm use --lts
        ```
    *   **Windows**: Use the [nvm-windows installer](https://github.com/coreybutler/nvm-windows#installation). After installing, open a new terminal (as administrator) and run:
        ```powershell
        nvm install lts
        nvm use lts
        ```

*   **Direct Installation (Less Recommended)**:
    *   Download the official installer from the [Node.js website](https://nodejs.org/).
    *   Use your operating system's package manager (e.g., `sudo apt install nodejs npm` on Debian/Ubuntu, `brew install node` on macOS with Homebrew).

### Package Manager

This project supports `npm`, `yarn`, or `pnpm`. `npm` is bundled with Node.js. If you prefer `yarn` or `pnpm`, you can install them globally using npm:

```sh
npm install -g yarn
# or
npm install -g pnpm
```

## Requirements

- **Node.js**: v18 or higher (recommended: latest LTS)
- **Package Manager**: `npm`, `yarn`, or `pnpm`
- **OS**: macOS, Windows, or Linux

## Getting Started

### 1. Clone the repository
```sh
git clone <your-repo-url>
cd android-tv
```

### 2. Install dependencies
Choose your preferred package manager:

#### Using npm
```sh
npm install
```

#### Using yarn
```sh
yarn install
```

#### Using pnpm
```sh
pnpm install
```

### 3. Run the development server
```sh
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Available Scripts

- `dev`   – Start the development server
- `build` – Build for production
- `start` – Start the production server
- `lint`  – Run ESLint

## Configuration
- **TypeScript**: Configured via `tsconfig.json`
- **Next.js**: Configured via `next.config.mjs`
- **Tailwind CSS**: Configured via `tailwind.config.ts` and `postcss.config.mjs`

## OS-specific Notes
- All major OSes are supported (macOS, Windows, Linux).
- If you encounter issues with native dependencies, ensure your Node.js version matches the recommended version.
- For Windows users: Use Git Bash, WSL, or PowerShell for best compatibility.

## Troubleshooting
- Delete `node_modules` and lock files (`package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`) and reinstall if you encounter dependency issues.
- Ensure your Node.js version is compatible.

## License
MIT (or specify your license) 