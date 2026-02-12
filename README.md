# PanicType ⌨️💨

> **Race against the clock. Race against the world.**

![License](https://img.shields.io/badge/license-MIT-blue)
![Status](https://img.shields.io/badge/status-development-orange)

## 📖 About The Project

**PanicType** is a real-time multiplayer typing game. The goal is simple: type the given text faster than your opponents.

Unlike static typing tests, PanicType focuses on the competitive experience. It features a live ranking system where players can see their progress against others in real-time, along with a profile system to track improvement over time.

### ✨ Key Features

* **Real-Time Multiplayer:** Race against other players live.
* **User Profiles:** Save your stats, track your WPM (Words Per Minute), and view your history.
* **Ranking System:** Climb the leaderboard with an ELO-based ranking system.
* **Instant Feedback:** Visual cues for typos and speed during the race.

---

## 🛠️ Built With

* **Frontend:** React, Next.js, Tailwind CSS
* **Backend:** Node.js, Express
* **Real-Time:** Socket.io
* **Database:** PostgreSQL (with Prisma ORM)

---

## 🚀 Getting Started

Follow these steps to get a local copy up and running.

### Prerequisites

* Node.js (v18 or higher)
* npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/yourusername/panictype.git](https://github.com/yourusername/panictype.git)
    cd panictype
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**
    Create a `.env` file in the root directory and add your database and auth keys:
    ```env
    DATABASE_URL="postgresql://..."
    JWT_SECRET="your_secret_key"
    ```

4.  **Run the application**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Made with ❤️**
