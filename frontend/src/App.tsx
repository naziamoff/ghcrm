import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import { ProjectsPage } from './components/Projects/ProjectsPage';
import { SignInPage } from './components/Auth/SignInPage';
import { SignUpPage } from './components/Auth/SignUpPage';
import { EmailConfirmedPage } from './components/Auth/EmailConfirmedPage';
import { ConfirmEmailPage } from './components/Auth/ConfirmEmailPage';
import { HomePage } from './components/Home/HomePage';
import { ROUTES } from './constants/routes';

function App() {
  return (
    <Router>
      <Container maxWidth="lg">
        <Routes>
          <Route
            path={ROUTES.index}
            element={<HomePage />}
          />
          <Route
            path={ROUTES.auth.signIn}
            element={<SignInPage />}
          />
          <Route
            path={ROUTES.auth.signUp}
            element={<SignUpPage />}
          />
          <Route
            path={ROUTES.auth.confirmEmail}
            element={<ConfirmEmailPage />}
          />
          <Route
            path={ROUTES.auth.emailConfirmed}
            element={<EmailConfirmedPage />}
          />
          <Route
            path={ROUTES.projects.index}
            element={<ProjectsPage />}
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
