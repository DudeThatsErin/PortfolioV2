'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    const checkbox = document.getElementById('checkbox4') as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = !checkbox.checked;
    }
    setIsMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    const checkbox = document.getElementById('checkbox4') as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = false;
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <a className="skip-to-content" href="#main-content">
        Skip to content
      </a>
      
      <header role="banner">
        <div className="logo">
          <Link href="/" aria-label="Erin Skidds homepage">&lt;ES&gt;</Link>
        </div>
        <nav role="navigation" aria-label="Main navigation">
          <input type="checkbox" id="checkbox4" className="checkbox4 visually-hidden" aria-hidden="true" />
          <label
            htmlFor="checkbox4"
            className="hamburger-label"
            aria-label="Toggle navigation menu"
            tabIndex={0}
            role="button"
            aria-expanded={isMenuOpen}
            aria-controls="main-menu"
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleMenu(); } }}
          >
            <div className="hamburger hamburger4" aria-hidden="true">
              <span className="bar bar1"></span>
              <span className="bar bar2"></span>
              <span className="bar bar3"></span>
              <span className="bar bar4"></span>
            </div>
            <span className="visually-hidden">Menu</span>
          </label>
          <div className="menu" id="main-menu" role="menu">
            <Link href="/" role="menuitem" onClick={closeMenu}>01. Home</Link>
            <Link href="/work" role="menuitem" onClick={closeMenu}>02. Work Experience</Link>
            <Link href="/projects" role="menuitem" onClick={closeMenu}>03. Projects</Link>
            <Link href="/contact" role="menuitem" onClick={closeMenu}><button>Contact</button></Link>
          </div>
        </nav>
      </header>
      <div className="left-sidebar" aria-label="Social links">
        <div className="bottom">
          <a href="https://github.com/DudeThatsErin" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
            <i className="fa-brands fa-github" aria-hidden="true"></i>
          </a>
          <a href="https://linkedin.com/in/erinskidds" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
              <i className="fa-brands fa-linkedin-in" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </>
  );
}
