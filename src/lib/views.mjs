import { esc, lines, arrow, label, link, cta, portrait, miniIcon } from './components.mjs';
import { localizedProjects } from '../content/projects.mjs';

function projectImage(project, c, url, caption = true) {
  return `<figure class="project-screenshot"><img src="${url.asset(`assets/projects/${project.image}`)}" width="${project.width}" height="${project.height}" alt="${esc(project.alt)}" loading="lazy" decoding="async">${caption ? `<figcaption>${esc(project.disclaimer ? c.work.prototypeScreenshot : c.work.screenshot)}</figcaption>` : ''}</figure>`;
}

function workShowcase(c, url) {
  const projects = localizedProjects(c.lang);
  const cake = projects.find(p => p.id === 'cakeonstick');
  const budget = projects.find(p => p.id === 'budgetanywhere');
  const preview = (project, className) => `<a class="showcase-card ${className}" href="${url('work')}#${project.id}"><figure><div class="showcase-browser" aria-hidden="true"><span>● ● ●</span><span>${esc(new URL(project.url).hostname)}</span></div><img src="${url.asset(`assets/projects/${project.image}`)}" alt="${esc(project.alt)}" width="${project.width}" height="${project.height}" ${project.id === 'cakeonstick' ? 'fetchpriority="high"' : 'loading="eager"'} decoding="async"><figcaption><span>${esc(project.name)}</span>${arrow(true)}</figcaption></figure></a>`;
  return `<div class="work-showcase" role="group" aria-label="${esc(c.hero.showcaseLabel)}"><p class="showcase-label">${esc(c.hero.showcaseLabel)}</p>${preview(cake, 'showcase-primary')}${preview(budget, 'showcase-secondary')}</div>`;
}

function sectionHeading(copy, href) {
  return `<div class="section-heading"><div>${label(copy.label)}<h2>${lines(copy.title)}</h2></div>${link(href,copy.link)}</div>`;
}

export function home(c, url, config) {
  return `<section class="hero container"><div class="hero-copy">${label(c.eyebrow)}<h1>${esc(c.hero.first)}<br><em>${esc(c.hero.second)}<br>${esc(c.hero.third)}</em></h1><p class="hero-description">${esc(c.hero.text)}</p><a class="hero-credibility" href="${url('about')}#enterprise-experience">${esc(c.hero.credibility)}${arrow(true)}</a><div class="hero-actions">${link(url('contact'),c.hero.cta,'button button-dark',true)}${link(url('work'),c.hero.secondary,'quiet-link')}</div><p class="location"><span class="status-dot" aria-hidden="true"></span>${esc(c.hero.location)}</p></div><div class="hero-visual">${workShowcase(c,url)}</div></section>
  <section class="section container concise-services" id="expertise">${sectionHeading(c.intro,url('services'))}<div class="service-grid">${c.services.map(s=>`<a class="service-card" href="${url('services')}#${s.id}"><div class="service-card-top">${miniIcon(s.id)}<span class="index">${s.n} /</span></div><h3>${esc(s.name)}</h3><p>${esc(s.text)}</p><div class="service-card-bottom">${arrow(true)}</div></a>`).join('')}</div></section>
  <section class="selected-work-section"><div class="container">${sectionHeading(c.selectedWork,url('work'))}<div class="featured-grid">${localizedProjects(c.lang).filter(p=>p.featured).map(p=>`<article class="featured-project"><a class="project-thumbnail" href="${url('work')}#${p.id}" aria-label="${esc(p.name)}">${projectImage(p,c,url,false)}</a><div class="featured-copy"><p class="project-kind">${esc(p.kind)} <span>· ${esc(p.status)}</span></p><h3><a href="${url('work')}#${p.id}">${esc(p.name)}${arrow(true)}</a></h3><p>${esc(p.summary)}</p></div></article>`).join('')}</div></div></section>
  <section class="founder-section container"><div class="founder-copy">${label(c.founder.label)}<h2>${lines(c.founder.title)}</h2><p class="body-large">${esc(c.founder.text)}</p>${link(url('about'),c.founder.link)}</div>${portrait(c,config.headshot ? url.asset(config.headshot) : null)}</section>${cta(c,url)}`;
}

function pageIntro(copy) {
  return `<section class="page-intro container">${label(copy.label)}<div class="page-intro-grid"><h1>${lines(copy.title)}</h1><p class="body-large">${esc(copy.intro)}</p></div></section>`;
}

export function services(c,url) {
  return `${pageIntro(c.servicesPage)}<nav class="service-subnav container" aria-label="${c.lang==='en'?'Service categories':'服務項目'}">${c.services.map(s=>`<a href="#${s.id}"><span>${s.n}</span>${esc(s.name)}${arrow(true)}</a>`).join('')}</nav><div class="container service-details">${c.services.map(s=>`<section class="service-detail" id="${s.id}"><div class="service-detail-heading"><div class="detail-icon">${miniIcon(s.id)}</div>${label(`${s.n} / ${s.name}`)}<h2>${esc(s.question)}</h2><p>${esc(s.detail)}</p></div><div class="service-detail-content">${s.items.map(([h,p])=>`<div><h3>${esc(h)}</h3><p>${esc(p)}</p></div>`).join('')}</div></section>`).join('')}</div>${cta(c,url)}`;
}

export function work(c,url) {
  return `${pageIntro(c.work)}<div class="container projects">${localizedProjects(c.lang).map(p=>`<article class="project" id="${p.id}"><div class="project-image">${projectImage(p,c,url)}</div><div class="project-copy">${label(p.kind)}<span class="project-status">${esc(p.status)}</span><h2>${esc(p.name)}</h2><p>${esc(p.description)}</p><ul class="scope-list">${p.scope.map(s=>`<li>${esc(s)}</li>`).join('')}</ul><div class="project-technologies"><ul>${p.technologies.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div>${p.disclaimer?`<p class="project-disclaimer">${esc(p.disclaimer)}</p>`:''}${link(p.url,p.link,'text-link',true)}</div></article>`).join('')}</div>${cta(c,url)}`;
}

export function about(c,url,config) {
  return `${pageIntro(c.about)}<section class="container about-founder" id="enterprise-experience"><div class="about-portrait">${portrait(c,config.headshot ? url.asset(config.headshot) : null)}</div><div class="about-bio"><h2>${esc(c.about.heading)}</h2>${c.about.paragraphs.map(p=>`<p>${esc(p)}</p>`).join('')}<div class="ranking-note"><p>${esc(c.about.ranking.text)}</p>${link(c.about.ranking.sourceUrl,c.about.ranking.sourceLabel)}</div></div></section><section class="background-section"><div class="container background-grid"><div>${label(c.lang==='en'?'ENGINEERING BACKGROUND':'專業背景')}<h2>${esc(c.about.background)}</h2></div><ul class="skill-list">${c.about.skills.map(s=>`<li>${esc(s)}<span aria-hidden="true">↗</span></li>`).join('')}</ul></div></section>${cta(c,url)}`;
}

export function contact(c,url,config) {
  const mail=config.email ? `mailto:${config.email}?subject=${encodeURIComponent(c.contact.emailSubject)}&body=${encodeURIComponent(c.contact.emailBody)}` : null;
  return `${pageIntro(c.contact)}<section class="container contact-grid"><div class="contact-main"><div class="email-panel">${label(c.contact.emailLabel)}${mail ? `<a class="email-address" href="${esc(mail)}">${esc(config.email)}${arrow(true)}</a>${link(mail,c.contact.emailAction,'button button-dark',true)}` : `<h2>${esc(c.contact.missingTitle)}</h2><p>${esc(c.contact.missingText)}</p>`}</div><p class="contact-privacy">${esc(c.contact.privacy)}</p></div><div class="contact-aside"><h2>${esc(c.contact.prompt)}</h2><ol>${c.contact.prompts.map(p=>`<li>${esc(p)}</li>`).join('')}</ol><div class="contact-location"><span class="status-dot" aria-hidden="true"></span><p>${esc(c.contact.locationText)}</p></div></div></section>`;
}

export function notFound(c,url) {
  return `<section class="container error-page">${label('404 / ROHLFING LABS')}<h1>${esc(c.notFound.title)}</h1><p class="body-large">${esc(c.notFound.text)}</p>${link(url('home'),c.notFound.link,'button button-dark')}</section>`;
}
