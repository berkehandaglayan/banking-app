import React from "react";
import kedi from "./kedi.png";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { trTR } from "@mui/material/locale";
import { Layout } from "./components/Layout.tsx";
import { ProductListPage } from "./pages/ProductListPage.js";

import Typography from "@mui/material/Typography";

const theme = createTheme({}, trTR);

// Basit bir anasayfa componenti
const HomePage = () => (
  <>
    <Typography variant="h3">Money Go Up Bankasına Hoş Geldiniz!</Typography>

    <img src={kedi} />
  </>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductListPage />} />
            {/* Eğer bilinmeyen bir URL'ye gidilirse anasayfaya yönlendir */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
