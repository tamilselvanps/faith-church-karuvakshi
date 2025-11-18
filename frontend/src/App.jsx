import React, {useState, useEffect} from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Events from './pages/Events'
import Admin from './pages/Admin'
import Login from './pages/Login'
import { Container, Navbar, Nav, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

export default function App(){
  const { t, i18n } = useTranslation()
  const [lang, setLang] = useState('en')

  useEffect(()=>{ i18n.changeLanguage(lang) },[lang])

  return (
    <BrowserRouter>
      <Navbar bg="light" expand="lg" className="mb-3">
        <Container>
          <Navbar.Brand>{t('title')}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">{t('home')}</Nav.Link>
              <Nav.Link as={Link} to="/events">{t('events')}</Nav.Link>
              <Nav.Link as={Link} to="/admin">{t('admin')}</Nav.Link>
            </Nav>
            <Form.Select value={lang} onChange={e=>setLang(e.target.value)} style={{width:120}}>
              <option value="en">EN</option>
              <option value="ta">TA</option>
            </Form.Select>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/events" element={<Events/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="*" element={<Navigate to='/'/>}/>
        </Routes>
      </Container>
    </BrowserRouter>
  )
}
