# Archival Library - Frontend

The Archival Library streamlines document management by allowing users to securely upload, view, and manage documents with metadata, ensuring efficient and accessible digital archiving.

## Features

- **User Authentication**: Secure JWT-based registration, login, and access control for document management.
- **Document Management**: Upload and view files with metadata like title and description.
- **User Experience**: Simple, intuitive, and fully responsive UI with robust state management and form validation.

## Project Structure

- `src/components`: Contains reusable UI components.
- `src/pages`: Holds page-level components representing different views.
- `src/hooks`: Custom hooks for handling logic and state.
- `src/stores`: State management with Zustand.
- `src/api`: Handles API calls and interactions with the backend.

## Tech Stack

- **React**: Core library for building the user interface.
- **TypeScript**: Provides static typing to enhance code quality and maintainability.
- **Vite**: A fast and optimized build tool used for development and production builds.
- **Zustand**: Lightweight state management for managing global application state.
- **Chakra UI**: Provides a modern, responsive design system for building accessible and responsive UI components.
- **React Hook Form**: Manages form state and validation efficiently.
- **Axios**: Handles API requests to interact with the backend.
- **React Router**: Manages navigation and routing within the application.

## Getting Started

### Prerequisites

- **Node.js**: Ensure Node.js is installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/OmaralAnazi/archival-library-frontend.git

   ```

2. Navigate to the project directory:

   ```bash
   cd archival-library-frontend

   ```

3. Install dependencies:

   ```bash
   npm install

   ```

4. Create a `.env` file with the following key and value:

   ```bash
   VITE_BASE_API_URL=<YourApiUrl>

   ```

5. Running the application (development mode):

   ```bash
   npm run dev

   ```

6. Create a Docker image of the project (optional):

   ```bash
   docker build -t archival-library-frontend .

   ```

7. Run the Docker image as a container (optional):
   ```bash
   docker run --env-file .env -p 5173:5173 archival-library-frontend
   ```
