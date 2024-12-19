---
layout: default
title: "Software"
---

<style>
  body {
    font-family: 'Segoe UI', sans-serif;
    line-height: 1.8;
    margin: 0;
    padding: 0;
    background-color: #f4f7fc;
    color: #333333;
  }

  .content {
    max-width: 960px;
    margin: 40px auto;
    padding: 20px;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  h3 {
    color: #2e7d32;
    text-align: center;
    font-size: 2.5em;
    margin-bottom: 30px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .card {
    padding: 20px;
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    text-align: center;
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  .card h4 {
    color: #2e7d32;
    margin-bottom: 15px;
    font-size: 1.2em;
  }

  .links {
    margin-top: 10px;
  }

  .links a {
    text-decoration: none;
    color: #ffffff;
    background-color: #66bb6a;
    padding: 10px 15px;
    border-radius: 5px;
    font-weight: bold;
    margin-right: 10px;
    transition: background-color 0.3s ease;
  }

  .links a:hover {
    background-color: #388e3c;
  }

  .gallery img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-top: 15px;
    transition: transform 0.3s ease;
  }

  .gallery img:hover {
    transform: scale(1.05);
  }
</style>

<div class="content">
  <h3>Open-source Software Developed in Our Group</h3>
  <div class="grid">
    <!-- OCTP -->
    <div class="card">
      <h4>OCTP: A Tool for On-the-Fly Calculation of Transport Properties</h4>
      <div class="links">
        <a href="https://github.com/omoultosEthTuDelft/OCTP"><span class="fa fa-github"></span> Code</a>
        <a href="https://pubs.acs.org/doi/10.1021/acs.jcim.8b00939"><span class="fa fa-tasks"></span> Publication</a>
      </div>
      <div class="gallery">
        <a target="_blank" href="figures/octp.jpg">
          <img src="figures/octp.jpg" alt="OCTP Visualization">
        </a>
      </div>
    </div>

    <!-- BRICK -->
    <div class="card">
      <h4>Brick-CFCMC: Monte Carlo Simulations of Phase and Reaction Equilibria</h4>
      <div class="links">
        <a href="https://gitlab.com/ETh_TU_Delft/Brick-CFCMC"><span class="fa fa-gitlab"></span> Code</a>
        <a href="https://pubs.acs.org/doi/10.1021/acs.jcim.0c00334"><span class="fa fa-tasks"></span> Publication</a>
      </div>
      <div class="gallery">
        <a target="_blank" href="figures/brick.jpg">
          <img src="figures/brick.jpg" alt="Brick-CFCMC Visualization">
        </a>
      </div>
    </div>

    <!-- CASpy -->
    <div class="card">
      <h4>CASpy: Open Source Solver for Chemical Reaction and Absorption Equilibria</h4>
      <div class="links">
        <a href="https://github.com/omoultosEthTuDelft/CASpy"><span class="fa fa-github"></span> Code</a>
        <a href="https://pubs.acs.org/doi/full/10.1021/acs.jctc.3c00144"><span class="fa fa-tasks"></span> Publication</a>
      </div>
      <div class="gallery">
        <a target="_blank" href="figures/caspy.jpg">
          <img src="figures/caspy.jpg" alt="CASpy Visualization">
        </a>
      </div>
    </div>

    <!-- RE/GE -->
    <div class="card">
      <h4>RE/GE MC: Monte Carlo Code for Simulations in Reaction/Gibbs Ensemble</h4>
      <div class="links">
        <a href="https://github.com/omoultosEthTuDelft/Reaction-Gibbs-Ensemble-Monte-Carlo"><span class="fa fa-github"></span> Code</a>
        <a href="https://doi.org/10.1016/j.fluid.2024.114084"><span class="fa fa-tasks"></span> Publication</a>
      </div>
      <div class="gallery">
        <a target="_blank" href="figures/regemc.jpg">
          <img src="figures/regemc.jpg" alt="RE/GE MC Visualization">
        </a>
      </div>
    </div>
  </div>
</div>
