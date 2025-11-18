import React, {useState, useEffect} from 'react'
import api from '../api'
export default function Events(){
  const [events,setEvents]=useState([])
  useEffect(()=>{ api.get('/api/events').then(r=>setEvents(r.data)).catch(()=>{}) },[])
  return (<div><h2>Events</h2>{events.length===0? <p>No events yet.</p> : <ul className="list-group">{events.map((e,i)=>(<li key={i} className="list-group-item">{e.title} — {e.date}</li>))}</ul>}</div>)
}
