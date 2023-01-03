import React from "react";

//Packages
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes } from "react-router";
//Style
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
//Components
import RegistrationPage from "./pages/Registration/index";

import AllSubmissionsPage from "./pages/Submissions/index";
import PreviewOffice from "./pages/Submissions/submissionsSections/PreviewOffice";

export default function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<RegistrationPage type="create" />} />
          <Route
            exact
            path="/editEngCompany"
            element={<RegistrationPage type="edit" />}
          />

          <Route exact path="/submissions" element={<AllSubmissionsPage />} />
          <Route exact path="/submissions/:id" element={<PreviewOffice />} />
          {/* <Route exact path="/EditEngCompany" element={<EditEngCompanyPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}
