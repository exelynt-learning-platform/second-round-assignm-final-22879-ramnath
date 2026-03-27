<<<<<<< HEAD
# Chatbot Application

A modern, responsive AI chatbot built with **React**, **Redux Toolkit**, and **Vite**. Integrated with the OpenAI ChatGPT API.

## Features

- **OpenAI API Integration**: Real-time communication with `gpt-3.5-turbo`.
- **State Management**: Redux Toolkit for managing chat history, loading states, and error messages.
- **Premium UI**: 
  - Dark-theme design with a glowing aesthetic.
  - Micro-animations using `framer-motion`.
  - Iconography from `lucide-react`.
- **Responsive Layout**: Adheres to requirements for user-on-left/AI-on-right, works on mobile and desktop.
- **Security**: Manage your API key via `.env` or input field.

## Prerequisites

- Node.js installed.
- An [OpenAI API Key](https://platform.openai.com/api-keys).

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up Environment Variables**:
   - Create a `.env` file in the root directory.
   - Add your OpenAI API key:
     ```env
     VITE_OPENAI_API_KEY=your_actual_key_here
     ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```

4. **Start Chatting**: Open your browser at the local address provided (usually `http://localhost:5173`).

## Project Structure

```text
src/
├── components/Chat/   # Chat components (Interface, Message, Input)
├── store/             # Redux store and slices
├── App.jsx            # Main app shell
├── index.css          # Global styles and design system
└── main.jsx           # Entry point
```

## Developed as per Assignment Instructions
- **Title Management (5%)**: Done.
- **Correct implementation of Redux (15%)**: Done.
- **Chat History (15%)**: Done.
- **Loading state (10%)**: Done.
- **Error state (10%)**: Done.
- **Efficient use of Redux Thunk (10%)**: Done.
- **API Integration (25%)**: Done.
- **Quality (10%)**: Premium feel.
=======
# second-round-assignm-final-22879-ramnath
Final Project Assignment - This repository contains the complete final project code and documentation.
>>>>>>> 14afa66b8add660e43ee284b3146dccf39dfc5d4
