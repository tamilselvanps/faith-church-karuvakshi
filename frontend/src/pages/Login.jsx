import React, {useState} from 'react'
import api from '../api'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
export default function Login(){
  const [user,setUser]=useState('admin')
  const [pass,setPass]=useState('')
  const nav=useNavigate()
  async function submit(e){ e.preventDefault(); try{ const r=await api.post('/api/login',{username:user,password:pass}); localStorage.setItem('token', r.data.token); alert('Logged in'); nav('/admin') }catch(err){ alert('Login failed') } }
  return (<Form onSubmit={submit}><Form.Group className="mb-3"><Form.Label>Username</Form.Label><Form.Control value={user} onChange={e=>setUser(e.target.value)}/></Form.Group><Form.Group className="mb-3"><Form.Label>Password</Form.Label><Form.Control type="password" value={pass} onChange={e=>setPass(e.target.value)}/></Form.Group><Button type="submit">Login</Button></Form>)
}
