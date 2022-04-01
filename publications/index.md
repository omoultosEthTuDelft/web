---
layout: default
title: "Asterios Katsifodimos | Assistant Professor, TU Delft"
publications:
  - { section: true, title: "2014" }
  - { label: "VLDB  '14", title: "Delta: Scalable Data Dissemination under Capacity Constraints", authors: "K.Karanasos, A. Katsifodimos, I. Manolescu", venue: "In the Proceedings of the VLDB Endowment (PVLDB) 2013, Vol.7 No. 4. Also appeared in VLDB 2014, 1-5 September 2014, Hangzhou, China", pdf: "assets/publications/delta.vldb2014.pdf", extended: "assets/publications/delta.report.2013.pdf",poster: "assets/publications/posters/delta-poster-vldb2014.pdf"}
 

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
    {% if pub('slides')? %}<a href="{{ site.url}}/{{ pub.slides }}" class="badge badge-pill badge-primary" role="button"><i class="fa fa-download"></i>&nbsp;Slides</a>{% endif %}
	</dt>
  <dd class="col-sm-9">
    <strong>{{ pub.title }}</strong> <br> {{ pub.authors }}. <br> {{pub.venue}}. 
  </dd>
</dl>
{% endif %}
{% endfor %}

</div>













