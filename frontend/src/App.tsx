import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import { ProjectsPage } from './components/Projects/ProjectsPage';
import { SignInPage } from './components/Auth/SignInPage';
import { SignUpPage } from './components/Auth/SignUpPage';
import { EmailConfirmedPage } from './components/Auth/EmailConfirmedPage';
import { ConfirmEmailPage } from './components/Auth/ConfirmEmailPage';
import { HomePage } from './components/Home/HomePage';
import { ROUTES } from './routes';

function App() {
  return (
    <Router>
      <Container maxWidth="lg">
        <Routes>
          <Route
            path={ROUTES.Home}
            element={<HomePage />}
          />
          <Route
            path={ROUTES.SignIn}
            element={<SignInPage />}
          />
          <Route
            path={ROUTES.SignUp}
            element={<SignUpPage />}
          />
          <Route
            path={ROUTES.EmailConfirmation}
            element={<EmailConfirmedPage />}
          />
          <Route
            path={ROUTES.ConfirmEmail}
            element={<ConfirmEmailPage />}
          />
          <Route
            path={ROUTES.Projects}
            element={<ProjectsPage />}
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
