# weLEARN

weLEARN is a web application designed to assist students in transitioning from the classroom to an online environment. The app provides tools for managing academic studies and building a community of like-minded learners. Key features include a forum, chatbot, chatroom, and profile page, all accessible through an account-based system.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **User Authentication**: Register and log in to access personalized features.
- **Forum**: Participate in discussions and ask questions.
- **Chatbot**: Get instant help and guidance.
- **Chatroom**: Real-time group chat with other users.
- **Profile Page**: Manage your personal information and view your activity.
- **Responsive Design**: Works on both desktop and mobile devices.

## Tech Stack

- **Frontend**: ReactJS, Chakra UI
- **Routing**: React Router
- **Backend/Database**: Google Firebase
- **Chatbot Integration**: Kommunicate
- **State Management**: React Context API (if used)
- **Other**: JavaScript (ES6+), HTML5, CSS3

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A Kommunicate account (for chatbot integration)
- A Firebase project (for authentication and database)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/weLEARN-app.git
   cd weLEARN-app
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root directory.
   - Add your Firebase and other API keys as needed:
     ```
     REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
     REACT_APP_KOMMUNICATE_APP_ID=your_kommunicate_app_id
     ```

### Running the App

```sh
npm start
```

- The app will run at [http://localhost:3000](http://localhost:3000) by default.

## Project Structure

```
weLEARN-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── auth/
│   │   ├── layout/
│   │   ├── pages/
│   │   │   ├── home/
│   │   │   ├── forum/
│   │   │   ├── chatroom/
│   │   │   ├── profile/
│   │   │   └── comments/
│   │   ├── users/
│   │   └── Chatbot.js
│   ├── lib/
│   │   └── routes.js
│   ├── App.js
│   ├── index.js
│   └── ...
├── .env
├── package.json
└── README.md
```

## Usage

- **Register** for a new account or **log in** with existing credentials.
- Navigate to the **Forum** to participate in discussions.
- Use the **Chatbot** for instant help.
- Join the **Chatroom** for real-time group conversations.
- Visit your **Profile** to manage your information.

## Available Scripts

- `npm start` – Runs the app in development mode.
- `npm run build` – Builds the app for production.
- `npm test` – Runs tests (if available).
- `npm run eject` – Ejects the app from Create React App (not recommended).

## Environment Variables

The app uses environment variables for sensitive information.  
Create a `.env` file in the root directory and add:

```
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_KOMMUNICATE_APP_ID=your_kommunicate_app_id
```

## Contributing

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a pull request.

## License

This project is licensed under the MIT License.

---

**Contact:**  
For questions or support, please open an issue or contact the maintainer.
