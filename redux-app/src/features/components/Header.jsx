import { Group, HomeIcon, LetterText, LucideGroup, Paperclip, Settings, User, User2, UserCog, UserPlus, UserPlus2 } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCurrentUser } from '../api/auth/authSlice'

const Header = () => {
 const username = useSelector(selectCurrentUser);
  return (
    <header>
      <div style={{textAlign: 'center'}}>
        <span style={{color: "brown"}}>Welcome:</span> <b style={{color:""}}>{username}</b>
      </div>
      <nav>
        <ul style={{listStyleType:'none', display:'flex', justifyContent: 'space-between', alignItems:'center', textAlign:'center'}}>
          <li><Link to='/'><HomeIcon/>Home</Link></li>
          <li><Link to='/post'><Paperclip/> Post</Link></li>
          <li><Link to='/users'><UserPlus2/>Users</Link></li>
          <li><Link to='/profile'><Settings/>Profile</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header