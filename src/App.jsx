import { useEffect } from 'react'
import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import ComingSoon from './pages/ComingSoon'
import { routes } from './routes'

function ScrollToTop() {
  const { pathname } = useLocation()
  // Braces: newer Chromium returns a Promise from scrollTo, which React would
  // treat as an effect clean-up ("destroy is not a function").
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function Layout() {
  const { pathname } = useLocation()
  const route = routes.find((r) => r.path === pathname.replace(/\/+$/, ''))
  const header = route?.header
  return (
    <>
      <ScrollToTop />
      <Header cta={header?.cta} bg={header?.bg} />
      <main style={header?.bg ? { background: header.bg } : undefined}>
        <Outlet />
      </main>
      <Footer tone={route?.footer === 'light' ? 'light' : 'dark'} />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          {routes.map(({ path, title, Component }) => (
            <Route key={path} path={path} element={Component ? <Component /> : <ComingSoon title={title} />} />
          ))}
          <Route path="*" element={<ComingSoon title="Page not found" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
