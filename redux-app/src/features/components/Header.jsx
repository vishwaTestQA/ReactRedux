import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {

  return (
    <header>
      <nav>
        <ul>
          <li><Link to='/home'>Home</Link></li>
          <li><Link to='post'>Post</Link></li>
          <li><Link to='users'>Users</Link></li>
          <li><Link to='profile'>Profile</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header