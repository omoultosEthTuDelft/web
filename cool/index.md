---
layout: default
title: "Cool"
---

<style>
  .cool-gallery {
    display: flex;
    gap: 16px;
    margin-top: 16px;
  }

  .masonry-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  @media (max-width: 600px) {
    .cool-gallery { flex-direction: column; }
  }

  .cool-card {
    background: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 6px;
    overflow: hidden;
    transition: box-shadow 0.2s ease, border-color 0.2s ease;
  }

  .cool-card:hover {
    border-color: #3973ac;
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  }

  .cool-card video {
    width: 100%;
    height: auto;
    display: block;
  }

  .cool-card .cool-body {
    padding: 12px 14px;
  }

  .cool-card .cool-desc {
    text-align: left;
    line-height: 1.5;
    margin: 0 0 8px 0;
    color: #555;
    font-size: 0.84rem;
  }

  .cool-card .cool-links {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .cool-card .cool-links a {
    text-decoration: none;
    color: #fff;
    background-color: #3973ac;
    padding: 4px 12px;
    border-radius: 4px;
    font-weight: 500;
    font-size: 0.8em;
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
    <source src="videos/clay-h2.mp4" type="video/mp4">
  </video>
  <div class="cool-body">
    <p class="cool-desc">MD simulation of a bulk hydrogen phase in contact pseudo-hexagonal montmorillonite nanoparticles.</p>
  </div>
</div>

<div class="cool-card">
  <video controls>
    <source src="videos/nafionMD.mp4" type="video/mp4">
  </video>
  <div class="cool-body">
    <p class="cool-desc">MD simulation of the electroosmotic drag of H+ in a nafion membrane (<span style="color: #e74c3c; font-weight: 500;">protons</span>, <span style="color: #3973ac; font-weight: 500;">water</span>). Such membranes are used in electrochemical hydrogen compressors. The simulations were performed by <a href="https://www.linkedin.com/in/arahbari/?originalSubdomain=nl">Dr. Reza Rahbari</a> as a part of our <a href="https://www.rvo.nl">RVO</a> funded project "Hy &amp; Dry", in collaboration with <a href="https://hyethydrogen.com">HyET Hydrogen</a>.</p>
    <div class="cool-links">
      <a href="../assets/publications/65.Rahbari_JPCC_2022_126_8121.pdf"><span class="fa-solid fa-book"></span> Publication</a>
    </div>
  </div>
</div>

<div class="cool-card">
  <video controls>
    <source src="videos/hydrates_organics.mp4" type="video/mp4">
  </video>
  <video controls>
    <source src="videos/hydrates_nanotube.mp4" type="video/mp4">
  </video>
  <div class="cool-body">
    <p class="cool-desc">MD simulations of CH4 hydrate nucleation: (Top) from organoclay salt solutions in the presence of organic molecules and (Bottom) around a spiral halloysite nanotube. Simulations performed by Fengyi Mi.</p>
    <div class="cool-links">
      <a href="../assets/publications/96.Mi_JPCC_2024_128_18588.pdf"><span class="fa-solid fa-book"></span> Publication</a>
    </div>
  </div>
</div>

<div class="cool-card">
  <video controls>
    <source src="videos/martiniFusion.mp4" type="video/mp4">
  </video>
  <div class="cool-body">
    <p class="cool-desc">MD simulation using the Martini coarse-grained potential showing the merging of an oleosome with a triacylglycerol droplet. The simulations were performed by Benjamin Rosenbaum as part of a collaborative project with the group of <a href="https://www.wur.nl/en/Persons/Costas-dr.-K-Costas-Nikiforidis.htm">Dr. Costas Nikiforidis</a> from <a href="https://www.wur.nl/en.htm">WUR</a>.</p>
    <div class="cool-links">
      <a href="../assets/publications/81.Ntone_SM_2023_19_6355.pdf"><span class="fa-solid fa-book"></span> Publication</a>
    </div>
  </div>
</div>

<div class="cool-card">
  <video controls>
    <source src="videos/cycloMate.mp4" type="video/mp4">
  </video>
  <div class="cool-body">
    <p class="cool-desc">MD simulation showing the inclusion complexation (reversely) of a beta-Cyclodextrin with caproic acid. The simulation was performed by <a href="https://scholar.google.com/citations?user=TOKYbtYAAAAJ&hl=en">Dr. Máté Erdös</a> during his PhD.</p>
    <div class="cool-links">
      <a href="../assets/publications/37.Erdos_JPCB_2020_124_1218.pdf"><span class="fa-solid fa-book"></span> J. Phys. Chem. B</a>
      <a href="../assets/publications/50.Erdos_FPE_2021_528_112842.pdf"><span class="fa-solid fa-book"></span> Fluid Phase Equilibria</a>
    </div>
  </div>
</div>

<div class="cool-card">
  <video controls>
    <source src="videos/np_collagen.mp4" type="video/mp4">
  </video>
  <div class="cool-body">
    <p class="cool-desc">MD simulation of nanoparticles (blue) diffusing in a gel network (red). Simulations performed by <a href="https://porelab.no/2020/09/03/wecome-to-sebastian/">Sebastian Price</a>.</p>
    <div class="cool-links">
      <a href="../assets/publications/90.Price_JCP_2024_160_154906.pdf"><span class="fa-solid fa-book"></span> Publication</a>
    </div>
  </div>
</div>

<div class="cool-card">
  <video controls>
    <source src="videos/water_AIMD.mp4" type="video/mp4">
  </video>
  <div class="cool-body">
    <p class="cool-desc">Ab initio MD simulation of water. Simulations performed by <a href="https://www.linkedin.com/in/vladimir-jelle-lagerweij-21654021b/?originalSubdomain=nl">Jelle Lagerweij</a>.</p>
    <div class="cool-links">
      <a href="../assets/publications/102.Lagerweij_JPCB_2025_129_6093.pdf"><span class="fa-solid fa-book"></span> Publication</a>
    </div>
  </div>
</div>

</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  var gallery = document.querySelector('.cool-gallery');
  var items = Array.from(gallery.querySelectorAll('.cool-card'));
  var numCols = window.innerWidth <= 600 ? 1 : 2;

  gallery.innerHTML = '';
  var cols = [];
  for (var i = 0; i < numCols; i++) {
    var col = document.createElement('div');
    col.className = 'masonry-col';
    gallery.appendChild(col);
    cols.push(col);
  }
  items.forEach(function(item, index) {
    cols[index % numCols].appendChild(item);
  });
});
</script>
