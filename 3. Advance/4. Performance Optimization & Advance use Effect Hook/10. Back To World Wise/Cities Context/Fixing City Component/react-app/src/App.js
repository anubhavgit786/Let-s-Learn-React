import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form"; 
import Spinner from "./components/SpinnerFullPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";

const HomePage = lazy(()=> import("./pages/HomePage"));
const Product = lazy(()=> import("./pages/Product"));
const Pricing = lazy(()=> import("./pages/Pricing"));
const Login = lazy(()=> import("./pages/Login"));
const AppLayout = lazy(()=> import("./pages/AppLayout"));
const PageNotFound = lazy(()=> import("./pages/PageNotFound"));

const App = ()=>
{
  
  return (
    <AuthProvider>
      <CitiesProvider>
        <Router>
          <Suspense fallback={<Spinner/>}>
          <Routes>
            <Route index element= {<HomePage/>} />
            <Route path="product" element= {<Product/>} />
            <Route path="pricing" element= {<Pricing/>} />
            <Route path="login" element= {<Login/>} />
            <Route path="app" element= {<ProtectedRoute><AppLayout/></ProtectedRoute>}>
              <Route index element= {<Navigate replace to="cities" />} />
              <Route path="cities" element= {<CityList/>} />
              <Route path="cities/:cityId" element={<City/>} />
              <Route path="countries" element= {<CountryList/>} />
              <Route path="form" element= {<Form/>} />
            </Route>
            <Route path="*" element= {<PageNotFound/>} />
          </Routes>
          </Suspense>
        </Router>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;



