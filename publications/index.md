---
layout: default
title: "Othonas Moultos | Assistant Professor, TU Delft"


publications:
  - { label: "I&EC Research", 
    title: "Electroreduction of CO2/CO to C2 Products: Process Modeling, Downstream Separation, System Integration, and Economic Analysis", 
    authors: "Mahinder Ramdin, Bert De Mot, Andrew R. T. Morrison, Tom Breugelmans, Leo J. P. van den Broeke, J. P. Martin Trusler, Ruud Kortlever, Wiebren de Jong, Othonas A. Moultos, Penny Xiao, Paul A. Webley, and Thijs J. H. Vlugt", 
    venue: "Industrial & Engineering Chemistry Research (2021) 60, 17862", 
    pdf: "assets/publications/64.Ramdin_IECR_2021_60_17862.pdf", 
    SI: "assets/publications/SI/64.Ramdin_IECR_2021_60_17862_SI.pdf", 
    bib: "assets/publications/bib/64.Ramdin_IECR_2021_60_17862.bib"}
  - { label: "JPCB", 
    title: "Interfacial Properties of Hydrophobic Deep Eutectic Solvents with Water", 
    authors: "Hirad S. Salehi, Othonas A. Moultos, and Thijs J. H. Vlugt", 
    venue: "Journal of Physical Chemistry B (2021) 125, 12303", 
    pdf: "assets/publications/63.Salehi_JPCB_2021_125_12303.pdf", 
    SI: "assets/publications/SI/63.Salehi_JPCB_2021_125_12303_SI.pdf ", 
    bib: "assets/publications/bib/63.Salehi_JPCB_125_12303.bib"}
  - { label: "JCED", 
    title: "Engineering Model for Predicting the Intradiffusion Coefficients of Hydrogen and Oxygen in Vapor, Liquid, and Supercritical Water based on Molecular Dynamics Simulations",
    authors: "Ioannis N. Tsimpanogiannis, Samadarshi Maity, Alper T. Celebi, and Othonas A. Moultos", 
    venue: "Journal of Chemical & Engineering Data (2021) 66, 3226", 
    pdf: "assets/publications/59.Tsimpanogiannis_JCED_2021_66_3226.pdf", 
    SI: "assets/publications/SI/59.Tsimpanogiannis_JCED_2021_66_3226_SI.pdf", 
    bib: "assets/publications/bib/63.Salehi_JPCB_125_12303.bib"}
 

---

<div id="publications" class="row">
<div style="text-align: justify;" class="col-sm-12">
<h5>Publications</h5>
<br/>

{% for pub in page.publications %}
<!-- {% if pub('section')? %}
<h6><strong>{{pub.title}}</strong></h6>
{% else %}
 -->&nbsp;
<dl class="row">
 <dt class="col-sm-3"><h6><span class="badge badge-success" role="button">{{ pub.label }}</span></h6><br/>
    {% if pub('pdf')? %}<a href="{{ site.url}}/{{ pub.pdf }}" class="badge badge-pill  badge-warning" role="button"><i class="fa fa-download"></i>&nbsp;PDF</a>{% endif %}
    {% if pub('poster')? %}<a href="{{ site.url}}/{{ pub.poster }}" class="badge badge-pill  badge-info" role="button"><i class="fa fa-download"></i>&nbsp;Poster</a>{% endif %}
    {% if pub('SI')? %}<a href="{{ site.url}}/{{ pub.SI }}" class="badge badge-pill  badge-info" role="button"><i class="fa fa-download"></i>&nbsp;SI</a>{% endif %}
    {% if pub('bib')? %}<a href="{{ site.url}}/{{ pub.bib }}" class="badge badge-pill  badge-primary" role="button"><i class="fa fa-download"></i>&nbsp;bib</a>{% endif %}
    {% if pub('slides')? %}<a href="{{ site.url}}/{{ pub.slides }}" class="badge badge-pill badge-primary" role="button"><i class="fa fa-download"></i>&nbsp;Slides</a>{% endif %}
	</dt>
  <dd class="col-sm-9">
    <strong>{{ pub.title }}</strong> <br> {{ pub.authors }}. <br> {{pub.venue}}. 
  </dd>
</dl>
{% endif %}
{% endfor %}

</div>












