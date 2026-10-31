import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './Router'
import { Toaster } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import ScrollToTop from './Components/ScrollTop'
document.documentElement.dir = 'rtl'

export default function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const isRTL = ["fa", "ar"].includes(i18n.language);

    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <>
        <RouterProvider router={router} />
        <Toaster />
    </>
  )
}
