<style>
  /* General styling remains the same */
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
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }

  .links a {
    text-decoration: none;
    color: #ffffff;
    background-color: #66bb6a; /* Slightly desaturated green */
    padding: 6px 12px; /* Reduced vertical padding */
    border-radius: 5px;
    font-weight: bold;
    font-size: 0.85em; /* Slightly smaller font */
    border: 1px solid #4caf50; /* Lighter border around the buttons */
    transition: background-color 0.3s ease, border 0.3s ease;
  }

  .links a:hover {
    background-color: #388e3c;
    border-color: #2c6f32; /* Darker border on hover for better focus */
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

  @media (max-width: 768px) {
    .grid {
      grid-template-columns: 1fr; /* Stack cards on top of each other */
    }

    .links a {
      padding: 6px 10px; /* Reduce padding further for smaller screens */
      font-size: 0.8em; /* Make the text smaller */
    }
  }

  @media (max-width: 480px) {
    h3 {
      font-size: 1.8em; /* Reduce heading size for small screens */
    }

    .links a {
      padding: 4px 8px; /* Further reduce padding for very small screens */
      font-size: 0.75em; /* Shrink button text even more */
    }
  }
</style>

<div class="content">
  <h3>Open-source software we developed</h3>
  <div class="grid">
    <!-- OCTP -->
    <div class="card">
      <h4>OCTP: A Tool for On-the-Fly Calculation of Transport Properties</h4>
      <div class="links">
        <a href="https://github.com/omoultosEthTuDelft/OCTP"><span class="fa fa-github"></span> GitHub</a>
        <a href="https://pubs.acs.org/doi/10.1021/acs.jcim.8b00939"><span class="fa fa-book"></span> Publication</a>
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
        <a href="https://gitlab.com/ETh_TU_Delft/Brick-CFCMC"><span class="fa fa-gitlab"></span> GitLab</a>
        <a href="https://pubs.acs.org/doi/10.1021/acs.jcim.0c00334"><span class="fa fa-book"></span> Publication</a>
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
        <a href="https://github.com/omoultosEthTuDelft/CASpy"><span class="fa fa-github"></span> GitHub</a>
        <a href="https://pubs.acs.org/doi/full/10.1021/acs.jctc.3c00144"><span class="fa fa-book"></span> Publication</a>
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
        <a href="https://github.com/omoultosEthTuDelft/Reaction-Gibbs-Ensemble-Monte-Carlo"><span class="fa fa-github"></span> GitHub</a>
        <a href="https://doi.org/10.1016/j.fluid.2024.114084"><span class="fa fa-book"></span> Publication</a>
      </div>
      <div class="gallery">
        <a target="_blank" href="figures/regemc.jpg">
          <img src="figures/regemc.jpg" alt="RE/GE MC Visualization">
        </a>
      </div>
    </div>
  </div>
</div>
