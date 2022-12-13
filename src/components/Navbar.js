import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css';

function Navbar() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
  return (
    <>
    <nav className='navbar'>
        <div className='navbar-container'>
            <Link to='/' className='navbar-logo'>
                weLEARN <i className='fab fa-typo3' />
                 </Link>
                 <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
                 </div>
                 <ul className={click ? 'nav-menu active' : 'nav-menu'}> 
                 <li className='nav-item'>
                    <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                        Home
                    </Link>
                 </li>
                 <li className='nav-item'>
                    <Link to='/forum' className='nav-links' onClick={closeMobileMenu}>
                        Forum
                    </Link>
                 </li>
                 <li className='nav-item'>
                    <Link to='/chat' className='nav-links' onClick={closeMobileMenu}>
                        Chat
                    </Link>
                 </li>
                 <li className='nav-item'>
                    <Link to='/profile' className='nav-links' onClick={closeMobileMenu}>
                        Profile
                    </Link>
                 </li>
                 </ul>
        </div>
    </nav>
    </>
  )
}

export default Navbar