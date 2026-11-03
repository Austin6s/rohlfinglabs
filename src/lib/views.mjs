import { esc, lines, arrow, label, link, cta, portrait, systemsArt, miniIcon } from './components.mjs';
import { localizedProjects } from '../content/projects.mjs';


function projectImage(project, c, url) {
  return `<figure class="project-screenshot"><img src="${url.asset(`assets/projects/${project.image}`)}" width="${project.width}" height="${project.height}" alt="${esc(project.alt)}" loading="lazy" decoding="async"><figcaption>${esc(project.disclaimer ? c.work.prototypeScreenshot : c.work.screenshot)}<span aria-hidden="true">↗</span></figcaption></figure>`;
}

function selectedWork(c, url) {
  return `<section class="selected-work-section"><div class="container"><div class="section-intro"><div>${label(c.selectedWork.label)}<h2>${lines(c.selectedWork.title)}</h2></div><div><p class="body-large">${esc(c.selectedWork.note)}</p>${link(url('work'), c.selectedWork.link)}</div></div><div class="featured-grid">${localizedProjects(c.lang).filter(p => p.featured).map(p => `<article class="featured-project">${projectImage(p,c,url)}<div class="featured-copy"><p class="project-kind">${esc(p.kind)} <span>· ${esc(p.status)}</span></p><h3><a href="${url('work')}#${p.id}">${esc(p.name)}${arrow(true)}</a></h3><p>${esc(p.summary)}</p>${link(`${url('work')}#${p.id}`, c.selectedWork.details)}</div></article>`).join('')}</div></div></section>`;
}

export function home(c, url, config) {
  return `<section class="hero container"><div class="hero-copy">${label(c.eyebrow)}<h1>${esc(c.hero.first)}<br><em>${esc(c.hero.second)}<br>${esc(c.hero.third)}</em></h1><p class="hero-description">${esc(c.hero.text)}</p><a class="hero-credibility" href="${url('about')}#enterprise-experience">${esc(c.hero.credibility)}${arrow(true)}</a><div class="hero-actions">${link(url('contact'), c.hero.cta, 'button button-dark', true)}${link(url('services'), c.hero.secondary, 'quiet-link')}</div><p class="location"><span class="status-dot" aria-hidden="true"></span>${esc(c.hero.location)}</p></div><div class="hero-visual">${systemsArt(c)}</div></section>
  <div class="capability-strip"><div class="container"><span class="strip-title">SOFTWARE, DATA & AI ENGINEERING</span><div>${c.hero.bottom.map((t,i) => `<span><b>0${i+1}</b>${esc(t)}</span>`).join('')}</div><span class="strip-symbol" aria-hidden="true">↗</span></div></div>
  <section class="section container" id="expertise"><div class="section-intro"><div>${label(c.intro.label)}<h2>${lines(c.intro.title)}</h2></div><div><p class="body-large">${esc(c.intro.text)}</p>${link(url('services'), c.intro.link)}</div></div><div class="service-grid">${c.services.map(s => `<a class="service-card" href="${url('services')}#${s.id}"><div class="service-card-top">${miniIcon(s.id)}<span class="index">${s.n} /</span></div><h3>${esc(s.name)}</h3><p>${esc(s.text)}</p><div class="service-card-bottom"><span>${esc(s.tags[0])}</span>${arrow(true)}</div></a>`).join('')}</div></section>
  ${selectedWork(c,url)}
  ${approach(c)}
  <section class="founder-section container"><div class="founder-copy">${label(c.founder.label)}<h2>${lines(c.founder.title)}</h2><p class="body-large">${esc(c.founder.text)}</p><p class="muted">${esc(c.founder.detail)}</p>${link(url('about'), c.founder.link)}</div>${portrait(c, config.headshot ? url.asset(config.headshot) : null)}</section>${cta(c,url)}`;
}

function approach(c) {
  return `<section class="section approach-section container" id="approach"><div class="section-intro"><div>${label(c.approach.label)}<h2>${lines(c.approach.title)}</h2></div><p class="body-large">${esc(c.approach.intro)}</p></div><ol class="approach-grid">${c.approach.steps.map(([title,text],i) => `<li><span class="step-number">0${i+1}<span aria-hidden="true">${i<3?'↗':'✓'}</span></span><h3>${esc(title)}</h3><p>${esc(text)}</p></li>`).join('')}</ol></section>`;
}

function pageIntro(eyebrow, title, intro, extra = '') {
  return `<section class="page-intro container">${label(eyebrow)}<div class="page-intro-grid"><h1>${lines(title)}</h1><div><p class="body-large">${esc(intro)}</p>${extra}</div></div></section>`;
}

export function services(c, url) {
  return `${pageIntro(c.servicesPage.label, c.servicesPage.title, c.servicesPage.intro)}
  <nav class="service-subnav container" aria-label="${c.lang === 'en' ? 'Service categories' : '服務項目'}">${c.services.map(s => `<a href="#${s.id}"><span>${s.n}</span>${esc(s.name)}${arrow(true)}</a>`).join('')}</nav>
  <div class="container service-details">${c.services.map(s => `<section class="service-detail" id="${s.id}"><div class="service-detail-heading"><div class="detail-icon">${miniIcon(s.id)}</div>${label(`${s.n} / ${s.name}`)}<h2>${esc(s.question)}</h2><p>${esc(s.detail)}</p><div class="tags">${s.tags.map(t=>`<span>${esc(t)}</span>`).join('')}</div></div><div class="service-detail-content">${s.items.map(([h,p])=>`<div><h3>${esc(h)}</h3><p>${esc(p)}</p></div>`).join('')}<div class="example"><span class="small-tag">${esc(s.outcome)}</span><p>${esc(s.example)}</p></div></div></section>`).join('')}</div>${approach(c)}${cta(c,url)}`;
}

export function work(c, url) {
  return `${pageIntro(c.work.label, c.work.title, c.work.intro)}<div class="container projects">${localizedProjects(c.lang).map(p => `<article class="project" id="${p.id}"><div class="project-image">${projectImage(p,c,url)}</div><div class="project-copy">${label(p.kind)}<span class="project-status">${esc(p.status)}</span><h2>${esc(p.name)}</h2><p>${esc(p.description)}</p><h3 class="scope-label">${esc(c.work.scope)}</h3><ul class="scope-list">${p.scope.map(s=>`<li>${esc(s)}</li>`).join('')}</ul><div class="project-technologies"><span class="small-tag">${esc(c.work.stack)}</span><ul>${p.technologies.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div>${p.disclaimer ? `<p class="project-disclaimer">${esc(p.disclaimer)}</p>` : ''}${link(p.url,p.link,'text-link',true)}</div></article>`).join('')}</div>${cta(c,url)}`;
}

export function about(c, url, config) {
  return `${pageIntro(c.about.label,c.about.title,c.about.intro)}<section class="container about-founder" id="enterprise-experience"><div class="about-portrait">${portrait(c,config.headshot ? url.asset(config.headshot) : null)}<p class="portrait-caption">${esc(c.founder.caption)}</p></div><div class="about-bio"><h2>${esc(c.about.heading)}</h2>${c.about.paragraphs.map(p=>`<p>${esc(p)}</p>`).join('')}<div class="ranking-note"><p>${esc(c.about.ranking.text)}</p>${link(c.about.ranking.sourceUrl,c.about.ranking.sourceLabel)}</div></div></section><section class="background-section"><div class="container background-grid"><div>${label(c.lang==='en'?'THE ENGINEERING BACKGROUND':'專業背景')}<h2>${esc(c.about.background)}</h2><p class="muted">${esc(c.about.experienceNote)}</p></div><ul class="skill-list">${c.about.skills.map(s=>`<li>${esc(s)}<span aria-hidden="true">↗</span></li>`).join('')}</ul></div></section><section class="container section values-section">${label(c.lang==='en'?'WHAT GUIDES THE WORK':'我們重視的事')}<div class="values-grid">${c.about.values.map(([h,p],i)=>`<div><span class="index">0${i+1}</span><h2>${esc(h)}</h2><p>${esc(p)}</p></div>`).join('')}</div></section>${cta(c,url)}`;
}

export function contact(c, url, config) {
  const mail = config.email ? `mailto:${config.email}?subject=${encodeURIComponent(c.contact.emailSubject)}&body=${encodeURIComponent(c.contact.emailBody)}` : null;
  return `${pageIntro(c.contact.label,c.contact.title,c.contact.intro)}<section class="container contact-grid"><div class="contact-main"><div class="email-panel">${label(c.contact.emailLabel)}${mail ? `<a class="email-address" href="${esc(mail)}">${esc(config.email)}${arrow(true)}</a>${link(mail,c.contact.emailAction,'button button-dark',true)}` : `<h2>${esc(c.contact.missingTitle)}</h2><p>${esc(c.contact.missingText)}</p>`}<span class="email-panel-corner" aria-hidden="true">↗</span></div><div class="contact-next"><h2>${esc(c.contact.afterTitle)}</h2><p>${esc(c.contact.after)}</p></div></div><div class="contact-aside"><h2>${esc(c.contact.prompt)}</h2><ol>${c.contact.prompts.map(p=>`<li>${esc(p)}</li>`).join('')}</ol><div class="contact-location"><span class="status-dot" aria-hidden="true"></span><h3>${esc(c.contact.locationTitle)}</h3><p>${esc(c.contact.locationText)}</p><p>${esc(c.contact.languages)}</p></div></div><p class="contact-privacy">${esc(c.contact.privacy)}</p></section>`;
}

export function notFound(c, url) {
  return `<section class="container error-page">${label('404 / ROHLFING LABS')}<h1>${esc(c.notFound.title)}</h1><p class="body-large">${esc(c.notFound.text)}</p>${link(url('home'),c.notFound.link,'button button-dark')}</section>`;
}
