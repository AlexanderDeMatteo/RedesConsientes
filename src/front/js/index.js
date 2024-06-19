import React from "react";
import { createRoot } from 'react-dom/client';
import { NextUIProvider } from "@nextui-org/react";
import Layout from "./layout";
import '../styles/index.css'; // Import your SCSS file

// Import your own components here

const root = createRoot(document.getElementById("app")); // Corrected ID selector

root.render(
  <NextUIProvider>
    <Layout/>
  </NextUIProvider>
);
