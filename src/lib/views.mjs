import { esc, lines, arrow, label, link, cta, portrait, miniIcon } from './components.mjs';
import { localizedProjects } from '../content/projects.mjs';

function screenshot(project, url, sizes, { alt = project.alt, eager = false } = {}) {
  const stem = url.asset(`assets/projects/${project.image.replace(/\.jpg$/, '')}`);
  return `<picture>
    <source type="image/webp" srcset="${stem}-720.webp 720w, ${stem}.webp ${project.width}w" sizes="${sizes}">
    <img src="${url.asset(`assets/projects/${project.image}`)}" width="${project.width}" height="${project.height}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">
  </picture>`;
}

function workShowcase(c, url, projects) {
  const copy = c.hero.slideshow;
  const sizes = '(max-width: 700px) 88vw, (max-width: 849px) 580px, (max-width: 1391px) 42vw, 550px';
  return `<section class="project-reel" aria-label="${esc(copy.label)}" aria-roledescription="${esc(copy.carousel)}" data-project-reel>
    <div class="reel-heading">
      <p>${esc(copy.label)}</p>
      <div class="reel-controls" hidden>
        <button type="button" data-reel-play data-play-label="${esc(copy.play)}" data-pause-label="${esc(copy.pause)}" aria-label="${esc(copy.pause)}"><span aria-hidden="true">Ⅱ</span></button>
        <button type="button" data-reel-prev aria-label="${esc(copy.previous)}">${arrow()}</button>
        <button type="button" data-reel-next aria-label="${esc(copy.next)}">${arrow()}</button>
      </div>
    </div>
    <div class="reel-slides" aria-live="off" aria-atomic="false">
      ${projects.map((project, i) => `<div class="reel-slide" role="group" aria-roledescription="${esc(copy.slide)}" aria-label="${i + 1} / ${projects.length}"${i ? ' hidden' : ''}>
        <a class="reel-project" href="${url('work')}#${project.id}" aria-labelledby="slide-${project.id}">
          <div class="reel-image">${screenshot(project, url, sizes, { alt: '', eager: i === 0 })}</div>
          <div class="reel-caption">
            <p class="project-kind">${esc(project.kind)}</p>
            <h2 id="slide-${project.id}">${esc(project.name)}${arrow()}</h2>
          </div>
        </a>
      </div>`).join('')}
    </div>
    <div class="reel-selectors" role="group" aria-label="${esc(copy.choose)}" hidden>
      ${projects.map((project, i) => `<button type="button" data-reel-select aria-label="${esc(`${copy.view} ${project.name}`)}"${i ? '' : ' aria-current="true"'}><span aria-hidden="true"></span></button>`).join('')}
    </div>
  </section>`;
}

function sectionHeading(copy, href) {
  return `<div class="section-heading"><h2>${esc(copy.title)}</h2>${link(href, copy.link)}</div>`;
}

export function home(c, url, config) {
  const projects = localizedProjects(c.lang).filter(project => project.featured);
  const emphasis = esc(c.hero.emphasis).replace(/\n(.+)$/, '<span>$1</span>');
  return `<section class="hero container">
    <div class="hero-copy">
      ${label(c.eyebrow)}
      <h1>${esc(c.hero.first)} <em>${emphasis}</em></h1>
      <p class="hero-description">${esc(c.hero.text)}</p>
      <div class="hero-actions">
        ${link(url('contact'), c.hero.cta, 'button button-dark')}
        ${link(url('work'), c.hero.secondary, 'text-link')}
      </div>
      <p class="location">${esc(c.hero.location)}</p>
      ${link(`${url('about')}#enterprise-experience`, c.hero.credibility, 'hero-credibility')}
    </div>
    ${workShowcase(c, url, projects)}
  </section>
  <section class="section container concise-services" id="expertise">
    ${sectionHeading(c.intro, url('services'))}
    <div class="service-grid">
      ${c.services.map(service => `<a class="service-card" href="${url('services')}#${service.id}" aria-labelledby="service-${service.id}">
        <div class="service-card-top">${miniIcon(service.id)}${arrow()}</div>
        <h3 id="service-${service.id}">${esc(service.name)}</h3>
        <p>${esc(service.text)}</p>
      </a>`).join('')}
    </div>
  </section>
  <section class="selected-work-section">
    <div class="container">
      ${sectionHeading(c.selectedWork, url('work'))}
      <div class="featured-grid">
        ${projects.map(project => `<article class="featured-project">
          <a href="${url('work')}#${project.id}" aria-labelledby="featured-${project.id}">
            <div class="project-thumbnail">${screenshot(project, url, '(max-width: 639px) 92vw, (max-width: 1391px) 45vw, 625px', { alt: '' })}</div>
            <div class="featured-copy">
              <p class="project-kind">${esc(project.kind)}</p>
              <h3 id="featured-${project.id}">${esc(project.name)}${arrow()}</h3>
              <p>${esc(project.summary)}</p>
            </div>
          </a>
        </article>`).join('')}
      </div>
    </div>
  </section>
  <section class="founder-section container">
    <div class="founder-copy">
      ${label(c.founder.label)}
      <h2>${lines(c.founder.title)}</h2>
      <p class="body-large">${esc(c.founder.text)}</p>
      ${link(url('about'), c.founder.link)}
    </div>
    ${portrait(c, config.headshot ? url.asset(config.headshot) : null)}
  </section>${cta(c, url)}`;
}

function pageIntro(copy) {
  return `<section class="page-intro container">
    ${copy.label ? label(copy.label) : ''}
    <div class="page-intro-grid"><h1>${lines(copy.title)}</h1><p class="body-large">${esc(copy.intro)}</p></div>
  </section>`;
}

function sectionNav(items, heading) {
  return `<nav class="section-nav container" aria-label="${esc(heading)}"><ul>
    ${items.map(item => `<li><a href="#${item.id}">${esc(item.name)}</a></li>`).join('')}
  </ul></nav>`;
}

export function services(c, url) {
  return `${pageIntro(c.servicesPage)}
  ${sectionNav(c.services, c.lang === 'en' ? 'Service categories' : '服務項目')}
  <div class="container service-details">
    ${c.services.map(service => `<section class="service-detail" id="${service.id}" tabindex="-1">
      <div class="service-detail-heading">
        ${miniIcon(service.id)}
        ${label(service.name)}
        <h2>${esc(service.question)}</h2>
        <p>${esc(service.detail)}</p>
      </div>
      <div class="service-detail-content">
        ${service.items.map(([heading, text]) => `<div><h3>${esc(heading)}</h3><p>${esc(text)}</p></div>`).join('')}
      </div>
    </section>`).join('')}
  </div>${cta(c, url)}`;
}

export function work(c, url) {
  const projects = localizedProjects(c.lang);
  return `${pageIntro(c.work)}${sectionNav(projects, c.work.index)}
  <div class="container projects">
    ${projects.map(project => `<article class="project" id="${project.id}" tabindex="-1">
      <div class="project-heading">
        <p class="project-kind">${esc(project.kind)}</p>
        <h2>${esc(project.name)}</h2>
        <p class="project-status">${esc(project.status)}</p>
      </div>
      <figure class="project-screenshot">
        ${screenshot(project, url, '(max-width: 760px) 92vw, (max-width: 1391px) 49vw, 680px')}
        ${project.disclaimer ? `<figcaption>${esc(c.work.prototypeScreenshot)}</figcaption>` : ''}
      </figure>
      <div class="project-copy">
        <p class="project-description">${esc(project.description)}</p>
        <ul class="scope-list">${project.scope.map(item => `<li>${esc(item)}</li>`).join('')}</ul>
        <ul class="project-technologies" aria-label="${esc(c.work.stack)}">${project.technologies.map(item => `<li>${esc(item)}</li>`).join('')}</ul>
        ${project.disclaimer ? `<p class="project-disclaimer">${esc(project.disclaimer)}</p>` : ''}
        ${project.url ? link(project.url, project.link, 'text-link', true) : ''}
      </div>
    </article>`).join('')}
  </div>${cta(c, url)}`;
}

export function about(c, url, config) {
  return `${pageIntro(c.about)}
  <section class="container about-founder" id="enterprise-experience" tabindex="-1">
    <div class="about-portrait">${portrait(c, config.headshot ? url.asset(config.headshot) : null)}</div>
    <div class="about-bio">
      <h2>${esc(c.about.heading)}</h2>
      ${c.about.paragraphs.map(p => `<p>${esc(p)}</p>`).join('')}
      <div class="ranking-note"><p>${esc(c.about.ranking.text)}</p>${link(c.about.ranking.sourceUrl, c.about.ranking.sourceLabel, 'text-link', true)}</div>
    </div>
  </section>
  <section class="background-section">
    <div class="container background-grid">
      <h2>${esc(c.about.background)}</h2>
      <ul class="skill-list">${c.about.skills.map(skill => `<li>${esc(skill)}</li>`).join('')}</ul>
    </div>
  </section>${cta(c, url)}`;
}

export function contact(c, url, config) {
  const mail = config.email ? `mailto:${config.email}?subject=${encodeURIComponent(c.contact.emailSubject)}&body=${encodeURIComponent(c.contact.emailBody)}` : null;
  return `${pageIntro(c.contact)}
  <section class="container contact-grid">
    <div class="email-panel">
      <h2>${esc(c.contact.emailLabel)}</h2>
      ${mail ? `<p class="email-address" id="email-address">${esc(config.email)}</p>
      <div class="contact-actions">
        ${link(mail, c.contact.emailAction, 'button button-dark', true)}
        <button class="button button-outline" type="button" data-copy-email data-copied="${esc(c.contact.copied)}" data-copy-error="${esc(c.contact.copyError)}" hidden>${esc(c.contact.copy)}</button>
      </div>
      <p class="copy-status" role="status"></p>` : `<p>${esc(c.contact.missingTitle)} ${esc(c.contact.missingText)}</p>`}
    </div>
    <div class="contact-aside">
      <h2>${esc(c.contact.prompt)}</h2>
      <ul>${c.contact.prompts.map(prompt => `<li>${esc(prompt)}</li>`).join('')}</ul>
      <p class="contact-location">${esc(c.contact.locationText)}</p>
    </div>
  </section>`;
}

export function notFound(c, url) {
  return `<section class="container error-page">${label('404')}<h1>${esc(c.notFound.title)}</h1><p class="body-large">${esc(c.notFound.text)}</p>${link(url('home'), c.notFound.link, 'button button-dark')}</section>`;
}
