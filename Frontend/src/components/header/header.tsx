import React from 'react'

import logo from '/sw-logo.png'
import './header.scss'

const Header: React.FC = () => {
  return (
    <header className="header">
      <div id="main-container">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid d-flex justify-content-between align-items-center">
            
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
                      
            <div
              className="collapse navbar-collapse flex-grow-0"
              id="navbarSupportedContent"
            >
            {/* CATEGORIES  */}
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item fs-4">
                  <a className="nav-link active" aria-current="page" href="#">
                    Cat1
                  </a>
                </li>

                <li className="nav-item fs-4">
                  <a className="nav-link" aria-current="page" href="#">
                    Cat2
                  </a>
                </li>

                <li className="nav-item fs-4">
                  <a className="nav-link" aria-current="page" href="#">
                    Cat3
                  </a>
                </li>
              </ul>
            </div>
            
            {/* LOGO */}
            <div className="header__logo d-flex justify-content-center align-items-center d-none d-md-flex">
                <img src={logo} className="rounded w-25" alt="..." />
            </div>
            
            {/* SHOPPING CART */}
            <div className="header__logo px-5">          
                <div className="dropdown px-3">
                    <a className="btn dropdown-toggle"  data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-cart3 fs-2"></i>
                    </a>

                    <div className="dropdown-menu px-2">
                        <p><a className="dropdown-item" href="#">Action</a></p>
                        <p><a className="dropdown-item" href="#">Another action</a></p>
                        <p><a className="dropdown-item" href="#">Something else here</a></p>
                    </div>
                    
                </div>
            </div>
                      
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
