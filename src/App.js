import React, { useEffect, useState } from 'react';
import AppRoutes from "./AppRoutes";
import Header from './Components/Header/Header';
import { saveStateToLocalStorage, getStateFromLocalStorage } from "./utils/localStorageHelper";

function App() {
  const [loading, setLoading] = useState(true);

  const getTours = async () => {
    const data = await fetch("./tours.json").then(res => res.json());
    saveStateToLocalStorage("tours", data.tours);
  }

  const getTestimonials = async () => {
    const data = await fetch("./testimonials.json").then(res => res.json());
    saveStateToLocalStorage("testimonials", data.testimonials);
  }

  useEffect(() => {
    const loadData = async () => {
      const tours = getStateFromLocalStorage("tours");
      const testimonials = getStateFromLocalStorage("testimonials");

      if (!tours) {
        await getTours();
      }
      if (!testimonials) {
        await getTestimonials();
      }

      setLoading(false); // дані завантажено
    }

    loadData();
  }, []);

  if (loading) {
    return <div style={{textAlign: 'center', marginTop: '50px'}}>Завантаження...</div>;
  }

  return (
    <>
      <Header />
      <AppRoutes />
    </>
  );
}

export default App;