---
layout: default
title: "Cool"
---

<style>
  .cool-gallery {
    max-width: 500px;
    margin: 0 auto;
  }

  .cool-card {
    background: #fff;
    border: 1px solid #e8e8e8;
    border-top: 3px solid #3973ac;
    border-radius: 6px;
    padding: 24px;
    margin-bottom: 24px;
    transition: box-shadow 0.2s ease;
    text-align: center;
  }

  .cool-card:hover {
    box-shadow: 0 4px 14px rgba(0,0,0,0.1);
  }

  .cool-card video {
    width: 100%;
    height: auto;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    margin-bottom: 6px;
  }

  .cool-card .cool-desc {
    text-align: justify;
    line-height: 1.6;
    margin-top: 14px;
    margin-bottom: 10px;
    color: #444;
  }

  .cool-card .cool-links {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }

  .cool-card .cool-links a {
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

  .cool-card .cool-links a:hover {
    background-color: #1a5276;
    border-color: #1a5276;
    color: #fff;
  }

  .cool-card .cool-links a:visited {
    color: #fff;
  }
</style>

<br/>

<div class="cool-gallery">

<div class="cool-card">
  <video controls>
    <source src="videos/nafionMD.mp4" type="video/mp4">
  </video>
  <p class="cool-desc">MD simulation of the electroosmotic drag of H+ in a nafion membrane (<span style="color: #e74c3c; font-weight: 500;">protons</span>, <span style="color: #3973ac; font-weight: 500;">water</span>). Such membranes are used in electrochemical hydrogen compressors. The simulations were performed by <a href="https://www.linkedin.com/in/arahbari/?originalSubdomain=nl">Dr. Reza Rahbari</a> as a part of our <a href="https://www.rvo.nl">RVO</a> funded project "Hy &amp; Dry", in collaboration with <a href="https://hyethydrogen.com">HyET Hydrogen</a>.</p>
  <div class="cool-links">
    <a href="../assets/publications/65.Rahbari_JPCC_2022_126_8121.pdf"><span class="fa-solid fa-book"></span> Publication</a>
  </div>
</div>

<div class="cool-card">
  <video controls>
    <source src="videos/hydrates_organics.mp4" type="video/mp4">
  </video>
  <video controls>
    <source src="videos/hydrates_nanotube.mp4" type="video/mp4">
  </video>
  <p class="cool-desc">MD simulations of CH4 hydrate nucleation: (Top) from organoclay salt solutions in the presence of organic molecules and (Bottom) around a spiral halloysite nanotube. Simulations performed by Fengyi Mi.</p>
  <div class="cool-links">
    <a href="../assets/publications/96.Mi_JPCC_2024_128_18588.pdf"><span class="fa-solid fa-book"></span> Publication</a>
  </div>
</div>

<div class="cool-card">
  <video controls>
    <source src="videos/martiniFusion.mp4" type="video/mp4">
  </video>
  <p class="cool-desc">MD simulation using the Martini coarse-grained potential showing the merging of an oleosome with a triacylglycerol droplet. The simulations were performed by Benjamin Rosenbaum as part of a collaborative project with the group of <a href="https://www.wur.nl/en/Persons/Costas-dr.-K-Costas-Nikiforidis.htm">Dr. Costas Nikiforidis</a> from <a href="https://www.wur.nl/en.htm">WUR</a>.</p>
  <div class="cool-links">
    <a href="../assets/publications/81.Ntone_SM_2023_19_6355.pdf"><span class="fa-solid fa-book"></span> Publication</a>
  </div>
</div>

<div class="cool-card">
  <video controls>
    <source src="videos/cycloMate.mp4" type="video/mp4">
  </video>
  <p class="cool-desc">MD simulation showing the inclusion complexation (reversely) of a beta-Cyclodextrin with caproic acid. The simulation was performed by <a href="https://scholar.google.com/citations?user=TOKYbtYAAAAJ&hl=en">Dr. Máté Erdös</a> during his PhD.</p>
  <div class="cool-links">
    <a href="../assets/publications/37.Erdos_JPCB_2020_124_1218.pdf"><span class="fa-solid fa-book"></span> J. Phys. Chem. B</a>
    <a href="../assets/publications/48.Erdos_FPE_2021_528_112842.pdf"><span class="fa-solid fa-book"></span> Fluid Phase Equilibria</a>
  </div>
</div>

<div class="cool-card">
  <video controls>
    <source src="videos/np_collagen.mp4" type="video/mp4">
  </video>
  <p class="cool-desc">MD simulation of nanoparticles (blue) diffusing in a gel network (red). Simulations performed by <a href="https://porelab.no/2020/09/03/wecome-to-sebastian/">Sebastian Price</a>.</p>
  <div class="cool-links">
    <a href="../assets/publications/90.Price_JCP_2024_160_154906.pdf"><span class="fa-solid fa-book"></span> Publication</a>
  </div>
</div>

<div class="cool-card">
  <video controls>
    <source src="videos/water_AIMD.mp4" type="video/mp4">
  </video>
  <p class="cool-desc">Ab initio MD simulation of water. Simulations performed by <a href="https://www.linkedin.com/in/vladimir-jelle-lagerweij-21654021b/?originalSubdomain=nl">Jelle Lagerweij</a>.</p>
</div>

</div>
