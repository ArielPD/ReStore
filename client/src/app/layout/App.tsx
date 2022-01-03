
import { useState } from "react"
import {Routes, Route} from "react-router-dom"
import {CssBaseline, Container, createTheme, ThemeProvider} from "@mui/material"
import { Product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header"
import HomePage from "../../features/home/HomePage";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";



const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea': '#121212'
      }
    }
  });

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' hideProgressBar/>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      <Container>
        {/* <Catalog /> */}
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/catalog' element={<Catalog/>} />
          <Route path='/catalog/:id' element={<ProductDetails/>} />
          <Route path='/about' element={<AboutPage/>} />
          <Route path='/contact' element={<ContactPage/>} />
          <Route path='/server-error' element={<ServerError/>} />
          <Route element={<NotFound />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
 