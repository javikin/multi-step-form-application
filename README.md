# Multi-Step Form Application

This project is a form-based web application built with Next.js. It was developed as part of a technical challenge for a job interview to showcase frontend development skills, state management, and testing.

## Project Features

- **Dynamic Form Handling**:  
  Supports single and multiple-choice questions, including options for custom answers using "Other" inputs.

- **State Management**:  
  Utilizes React Context to manage form navigation and preserve answers across multiple steps.

- **Testing**:  
  Implements unit tests with Jest and end-to-end tests with Cypress to ensure the application is reliable and robust.

- **Responsive Design**:  
  Fully optimized for both desktop and mobile devices.

### Prerequisites

- [Node.js v20](https://nodejs.org/) (Recommended: use [nvm](https://github.com/nvm-sh/nvm) to manage Node versions)
- [npm](https://www.npmjs.com/)

If you use **nvm**, you can install and use Node.js v20 with the following commands:

```bash
nvm install 20
nvm use 20
```

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/javikin/multi-step-form-application.git
cd multi-step-form-application
```

2. **Install dependencies:**
   Using npm:

```bash
npm install
```

### Running the Application

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Running Tests

**Unit Tests (Jest):**

```bash
npx jest
# or run in watch mode:
npx jest --watch
```

**End-to-End Tests (Cypress):**

```bash
npx cypress open
```

## Project Structure

- `src/app/`: Contains the Next.js application files, including the main form page.
- `src/components/`: Contains reusable React components used throughout the application.
- `src/context/`: Holds the React Contexts for state management.
- `hook/`: Contains network service React hooks.
- `mock/`: Contains network mock data.

## Technologies Used

- [Next.js](https://nextjs.org/)
- React Context API
- [Jest](https://jestjs.io/)
- [Cypress](https://www.cypress.io/)
- [Vercel](https://vercel.com/)

## License

This project is open source and available under the [MIT License](LICENSE).
