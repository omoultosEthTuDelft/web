---
layout: default
title: "Software"
---

<style>
  body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    margin: 20px;
    background-color: #f9f9f9;
  }

  .content {
    max-width: 800px;
    margin: 0 auto;
  }

  h3 {
    color: navy;
    text-align: center;
    margin-bottom: 20px;
  }

  .card {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
    padding: 20px;
  }

  .card h4 {
    color: #333333;
    margin-bottom: 10px;
  }

  .card a {
    display: inline-block;
    margin-right: 15px;
    text-decoration: none;
    color: #007BFF;
    font-weight: bold;
  }

  .card a:hover {
    color: #0056b3;
    text-decoration: underline;
  }

  .gallery img {
    width: 100%;
    border-radius: 10px;
    margin-top: 15px;
  }

  .section-divider {
    margin: 40px 0;
    border-top: 1px solid #dddddd;
  }
</style>

<div class="content">
  <h3>Open-source Software Developed in Our Group</h3>

  <!-- OCTP -->
  <div class="card">
    <h4>OCTP: A Tool for On-the-Fly Calculation of Transport Properties of Fluids with the Order-n Algorithm in LAMMPS</h4>
    <a href="https://github.com/omoultosEthTuDelft/OCTP"><span class="fa fa-github"></span> Code</a>
    <a href="https://pubs.acs.org/doi/10.1021/acs.jcim.8b00939"><span class="fa fa-tasks"></span> Publication</a>
    <div class="gallery">
      <a target="_blank" href="figures/octp.jpg">
        <img src="figures/octp.jpg" alt="OCTP Visualization">
      </a>
    </div>
  </div>

  <div class="section-divider"></div>

  <!-- BRICK -->
  <div class="card">
    <h4>Brick-CFCMC: Open Source Software for Monte Carlo Simulations of Phase and Reaction Equilibria Using the Continuous Fractional Component Method</h4>
    <a href="https://gitlab.com/ETh_TU_Delft/Brick-CFCMC"><span class="fa fa-gitlab"></span> Code</a>
    <a href="https://pubs.acs.org/doi/10.1021/acs.jcim.0c00334"><span class="fa fa-tasks"></span> Publication 1</a> & <a href="https://doi.org/10.1021/acs.jcim.1c00652">Publication 2</a>
    <div class="gallery">
      <a target="_blank" href="figures/brick.jpg">
        <img src="figures/brick.jpg" alt="Brick-CFCMC Visualization">
      </a>
    </div>
  </div>

  <div class="section-divider"></div>

  <!-- CASpy -->
  <div class="card">
    <h4>CASpy: Open Source Solver for Chemical Reaction and Absorption Equilibria</h4>
    <a href="https://github.com/omoultosEthTuDelft/CASpy"><span class="fa fa-github"></span> Code</a>
    <a href="https://pubs.acs.org/doi/full/10.1021/acs.jctc.3c00144"><span class="fa fa-tasks"></span> Publication</a>
    <div class="gallery">
      <a target="_blank" href="figures/caspy.jpg">
        <img src="figures/caspy.jpg" alt="CASpy Visualization">
      </a>
    </div>
  </div>

  <div class="section-divider"></div>

  <!-- RE/GE -->
  <div class="card">
    <h4>RE/GE MC: Monte Carlo Code for Performing Simulations in the Combined Reaction/Gibbs Ensemble</h4>
    <a href="https://github.com/omoultosEthTuDelft/Reaction-Gibbs-Ensemble-Monte-Carlo"><span class="fa fa-github"></span> Code</a>
    <a href="https://doi.org/10.1016/j.fluid.2024.114084"><span class="fa fa-tasks"></span> Publication</a>
    <div class="gallery">
      <a target="_blank" href="figures/regemc.jpg">
        <img src="figures/regemc.jpg" alt="RE/GE MC Visualization">
      </a>
    </div>
  </div>
</div>
