import React from 'react';
import Navbar from "../Navbar/Navbar";
import SearchForm from "../SearchForm/SearchForm";
import "./Header.css";

const Header = () => {
  return (
    <div className='holder'>
        <header className='header'>
            <Navbar />
            <div className='header-content flex flex-c text-center text-white'>
                <h2 className='header-title text-capitalize'>find your book of choice.</h2><br />
                <p className='header-text fs-18 fw-3'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. We take pride in the fact that our hard work and dedication lead to real results, providing greater value to our customers. However, sometimes corruption and greed can undermine these efforts, leading to inefficiencies and dissatisfaction. Despite these challenges, we remain committed to delivering high-quality products and services, ensuring that our customers are satisfied and our reputation remains intact. We believe that by staying true to our values, we can overcome any obstacle and continue to grow.Lorem ipsum dolor sit amet consectetur adipisicing elit. Pain, hardship, and adversity are inevitable, but they also serve as opportunities for growth and innovation. By embracing these challenges, we can develop new solutions and improve our processes, ultimately leading to greater success. We understand that progress requires effort and perseverance, but we are confident that our dedication will pay off in the long run.!</p>
                <SearchForm />
            </div>
        </header>
    </div>
  )
}

export default Header
