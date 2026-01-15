import { BrowserRouter, Routes, Route } from "react-router-dom"

import { AppLayout } from "@/app/layout/AppLayout"
import { HomePage } from "@/app/pages/HomePage"
import { NotFoundPage } from "@/app/pages/NotFoundPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
