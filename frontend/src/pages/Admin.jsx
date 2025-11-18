import React, {useState, useEffect} from 'react'
import api from '../api'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function Admin(){
  const nav = useNavigate()
  const [token,setToken] = useState(localStorage.getItem('token') || '')
  const [title,setTitle]=useState('')
  const [date,setDate]=useState('')
  const [events,setEvents]=useState([])

  useEffect(()=>{ api.get('/api/events').then(r=>setEvents(r.data)).catch(()=>{}) },[])

  useEffect(()=>{ if(token){ api.get('/api/verify',{ headers:{ Authorization:'Bearer '+token } }).catch(()=>{ alert('Session expired'); localStorage.removeItem('token'); setToken(''); nav('/login') }) } },[token])

  function loginPrompt(){ nav('/login') }

  async function addEvent(e){
    e.preventDefault()
    try{
      const res = await api.post('/api/events',{title,date},{ headers:{ Authorization:'Bearer '+token } })
      setEvents(res.data)
      setTitle(''); setDate('')
    }catch(err){
      alert('Unauthorized or error. Please login.')
      nav('/login')
    }
  }

  function logout(){ localStorage.removeItem('token'); setToken(''); nav('/') }

  return (
    <div>
      <h2>Admin Panel</h2>
      {!token ? <div><p>You must login to manage events.</p><Button variant="primary" onClick={loginPrompt}>Go to Login</Button></div> :
        <div>
          <Button variant="secondary" onClick={logout} className="mb-3">Logout</Button>
          <Form onSubmit={addEvent}>
            <Form.Group className="mb-2"><Form.Label>Event Title</Form.Label><Form.Control value={title} onChange={e=>setTitle(e.target.value)} required/></Form.Group>
            <Form.Group className="mb-2"><Form.Label>Event Date</Form.Label><Form.Control value={date} onChange={e=>setDate(e.target.value)} placeholder="YYYY-MM-DD" required/></Form.Group>
            <Button type="submit">Add Event</Button>
          </Form>
          <hr/>
          <h3 className="mt-3">Current Events</h3>
          <ul className="list-group">{events.map((ev,i)=>(<li key={i} className="list-group-item">{ev.title} — {ev.date}</li>))}</ul>
        </div>
      }
    </div>
  )
}
