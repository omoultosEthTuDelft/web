---
layout: default
title: "Scientific software"
---

<style>
  .sw-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-top: 20px;
  }

  .sw-card {
    padding: 20px;
    background: #fff;
    border: 1px solid #e8e8e8;
    border-top: 3px solid #3973ac;
    border-radius: 6px;
    transition: box-shadow 0.3s ease;
    text-align: center;
  }

  .sw-card:hover {
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  }

  .sw-card h4 {
    color: #2c3e50;
    margin-bottom: 15px;
    font-size: 1.05rem;
    font-weight: 600;
    border-bottom: none;
    margin-top: 0;
  }

  .sw-links {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }

  .sw-links a {
    text-decoration: none;
    color: #fff;
    background-color: #3973ac;
    padding: 6px 14px;
    border-radius: 5px;
    font-weight: 500;
    font-size: 0.85em;
    border: 1px solid #2e6699;
    transition: background-color 0.2s ease;
  }

  .sw-links a:hover {
    background-color: #1a5276;
    border-color: #1a5276;
    color: #fff;
  }

  .sw-links a:visited {
    color: #fff;
  }

  .sw-card .gallery img {
    width: 100%;
    height: auto;
    border-radius: 6px;
    margin-top: 15px;
    transition: transform 0.2s ease;
  }

  .sw-card .gallery img:hover {
    transform: scale(1.03);
  }

  @media (max-width: 768px) {
    .sw-grid {
      grid-template-columns: 1fr;
    }
  }
</style>

<br/>

<div class="sw-grid">

  <div class="sw-card">
    <h4>OCTP: A Tool for On-the-Fly Calculation of Transport Properties</h4>
    <div class="sw-links">
      <a href="https://github.com/omoultosEthTuDelft/OCTP"><span class="fa-brands fa-github"></span> GitHub</a>
      <a href="https://pubs.acs.org/doi/10.1021/acs.jcim.8b00939"><span class="fa-solid fa-book"></span> Publication</a>
    </div>
    <div class="gallery">
      <a target="_blank" href="figures/octp.jpg">
        <img src="figures/octp.jpg" alt="OCTP Visualization">
      </a>
    </div>
  </div>

  <div class="sw-card">
    <h4>Brick-CFCMC: Monte Carlo Simulations of Phase and Reaction Equilibria</h4>
    <div class="sw-links">
      <a href="https://gitlab.com/ETh_TU_Delft/Brick-CFCMC"><span class="fa-brands fa-gitlab"></span> GitLab</a>
      <a href="https://pubs.acs.org/doi/10.1021/acs.jcim.0c00334"><span class="fa-solid fa-book"></span> Publication</a>
    </div>
    <div class="gallery">
      <a target="_blank" href="figures/brick.jpg">
        <img src="figures/brick.jpg" alt="Brick-CFCMC Visualization">
      </a>
    </div>
  </div>

  <div class="sw-card">
    <h4>CASpy: Open Source Solver for Chemical Reaction and Absorption Equilibria</h4>
    <div class="sw-links">
      <a href="https://github.com/omoultosEthTuDelft/CASpy"><span class="fa-brands fa-github"></span> GitHub</a>
      <a href="https://pubs.acs.org/doi/full/10.1021/acs.jctc.3c00144"><span class="fa-solid fa-book"></span> Publication</a>
    </div>
    <div class="gallery">
      <a target="_blank" href="figures/caspy.jpg">
        <img src="figures/caspy.jpg" alt="CASpy Visualization">
      </a>
    </div>
  </div>

  <div class="sw-card">
    <h4>RE/GE MC: Monte Carlo Code for Simulations in Reaction/Gibbs Ensemble</h4>
    <div class="sw-links">
      <a href="https://github.com/omoultosEthTuDelft/Reaction-Gibbs-Ensemble-Monte-Carlo"><span class="fa-brands fa-github"></span> GitHub</a>
      <a href="https://doi.org/10.1016/j.fluid.2024.114084"><span class="fa-solid fa-book"></span> Publication</a>
    </div>
    <div class="gallery">
      <a target="_blank" href="figures/regemc.jpg">
        <img src="figures/regemc.jpg" alt="RE/GE MC Visualization">
      </a>
    </div>
  </div>

</div>
