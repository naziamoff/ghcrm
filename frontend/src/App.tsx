import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import { ConfirmEmailPage } from "./pages/confirm-email/ConfirmEmailPage";
import { HomePage } from "./pages/home/HomePage";
import { ROUTES } from "./constants/routes";
import { ProjectsPageController } from "./pages/projects/ProjectsPageController";
import { SignInPageController } from "./pages/sign-in/SignInPageController";
import { SignUpPageController } from "./pages/sign-up/SignUpPageController";
import { EmailConfirmedPageController } from "./pages/email-confirmed/EmailConfirmedPageController";

function App() {
  return (
    <Router>
      <Container maxWidth="lg">
        <Routes>
          <Route path={ROUTES.index} element={<HomePage />} />
          <Route path={ROUTES.auth.signIn} element={<SignInPageController />} />
          <Route path={ROUTES.auth.signUp} element={<SignUpPageController />} />
          <Route
            path={ROUTES.auth.confirmEmail}
            element={<ConfirmEmailPage />}
          />
          <Route
            path={ROUTES.auth.emailConfirmed}
            element={<EmailConfirmedPageController />}
          />
          <Route
            path={ROUTES.projects.index}
            element={<ProjectsPageController />}
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
