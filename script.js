function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

const isVideo = (src) => /\.(mp4|webm|mov)$/i.test(src);

function mediaNode(src, alt) {
  if (isVideo(src)) {
    const v = el("video");
    Object.assign(v, { src, muted: true, loop: true, autoplay: true, playsInline: true });
    v.setAttribute("muted", "");
    return v;
  }
  const img = el("img");
  img.src = src;
  img.alt = alt;
  img.loading = "lazy";
  return img;
}

// Inline stroke icons (Feather-style), so there are no external dependencies.
const ICONS = {
  resume: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>',
  scholar: '<polygon points="12 3 1 9 12 15 23 9 12 3"/><path d="M5 11.5v5c0 1.5 3 3 7 3s7-1.5 7-3v-5"/><path d="M23 9v6"/>',
  github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
  email: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
  video: '<circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>',
  paper: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
};

function iconFor(label) {
  if (/resume|cv/i.test(label)) return "resume";
  if (/scholar/i.test(label)) return "scholar";
  if (/github|repo|code/i.test(label)) return "github";
  if (/linkedin/i.test(label)) return "linkedin";
  if (/email|mail/i.test(label)) return "email";
  if (/video|youtube|talk/i.test(label)) return "video";
  if (/paper|ieee|pdf|arxiv/i.test(label)) return "paper";
  return "external";
}

function icon(name) {
  const span = el("span", "icon");
  span.setAttribute("aria-hidden", "true");
  span.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
    ICONS[name] + "</svg>";
  return span;
}

function renderMedia(entry) {
  const wrap = el("div", "media");
  const items = entry.media || [];
  if (!items.length) {
    const ph = el("div", "placeholder");
    ph.append(el("span", "ph-icon", "◎"), el("span", "ph-text", "Photo / video coming soon"));
    wrap.append(ph);
    return wrap;
  }
  wrap.classList.add(items.length === 1 ? "single" : "grid");
  if (items.length >= 3) wrap.classList.add("many");
  items.forEach((src) => {
    const btn = el("button", "media-item");
    btn.setAttribute("aria-label", `Enlarge media for ${entry.title}`);
    btn.append(mediaNode(src, entry.title));
    btn.addEventListener("click", () => openLightbox(src, entry.title));
    wrap.append(btn);
  });
  return wrap;
}

function renderText(entry) {
  const box = el("div", "text");
  const head = el("div", "card-head");
  head.append(el("span", "year", entry.year));
  if (entry.award) head.append(el("span", "award", "🏆 " + entry.award));
  box.append(head, el("h3", "title", entry.title), el("p", "context", entry.context));
  if (entry.role) {
    const role = el("p", "role");
    role.append(el("strong", null, "My role: "), document.createTextNode(entry.role));
    box.append(role);
  }
  box.append(el("p", "desc", entry.text));

  if (entry.tags?.length) {
    const tags = el("ul", "tags");
    entry.tags.forEach((t) => tags.append(el("li", null, t)));
    box.append(tags);
  }
  if (entry.links?.length) {
    const links = el("div", "card-links");
    entry.links.forEach((l) => {
      const a = el("a", "icon-link");
      a.append(icon(iconFor(l.label)), document.createTextNode(l.label));
      a.href = l.url;
      a.target = "_blank";
      a.rel = "noopener";
      links.append(a);
    });
    box.append(links);
  }
  return box;
}

function renderTimeline() {
  const root = document.getElementById("timeline");
  let side = 0;
  // data.js is chronological, with each divider (a school or employer) placed at the
  // start of its era. Show newest first, with each divider heading its group:
  // split into groups, reverse the group order, and reverse the entries inside each.
  const groups = [];
  TIMELINE.forEach((entry) => {
    if (entry.marker || !groups.length) groups.push([entry]);
    else groups[groups.length - 1].push(entry);
  });
  const ordered = groups.reverse().flatMap((g) => {
    const head = g[0].marker ? [g[0]] : [];
    const items = g.filter((e) => !e.marker).reverse();
    return head.concat(items);
  });

  ordered.forEach((entry) => {
    if (entry.marker) {
      const m = el("div", "marker reveal");
      m.append(el("span", "marker-year", entry.year), el("span", "marker-title", entry.title));
      root.append(m);
      return;
    }
    const row = el("article", "entry reveal " + (side % 2 === 0 ? "media-left" : "media-right"));
    row.append(el("span", "dot"), renderMedia(entry), renderText(entry));
    root.append(row);
    side++;
  });
}

function renderHero() {
  document.getElementById("name").textContent = SITE.name;
  document.getElementById("tagline").textContent = SITE.tagline;
  document.getElementById("about").textContent = SITE.about;
  document.getElementById("keywords").textContent = (SITE.keywords || []).join("  ·  ");
  const links = document.getElementById("links");
  SITE.links.forEach((l, i) => {
    const a = el("a", i === 0 ? "btn primary" : "btn");
    a.append(icon(iconFor(l.label)), document.createTextNode(l.label));
    a.href = l.url;
    if (!l.url.startsWith("mailto:")) { a.target = "_blank"; a.rel = "noopener"; }
    links.append(a);
  });
}

function renderSkills() {
  const list = document.getElementById("skills");
  SKILLS.forEach((s) => {
    const row = el("div", "skill-row");
    row.append(el("dt", null, s.group), el("dd", null, s.items.join(", ")));
    list.append(row);
  });
}

function renderPubs() {
  const list = document.getElementById("pubs");
  PUBLICATIONS.forEach((p) => {
    const li = el("li");
    let title;
    if (p.url) {
      title = el("a", "pub-title", p.title);
      title.href = p.url;
      title.target = "_blank";
      title.rel = "noopener";
    } else {
      title = el("span", "pub-title", p.title);
    }
    const authors = el("span", "authors");
    p.authors.split(/(Sachit Mahajan)/).forEach((part) => {
      authors.append(part === "Sachit Mahajan" ? el("strong", null, part) : document.createTextNode(part));
    });
    li.append(title, authors, el("span", "venue", p.venue));
    list.append(li);
  });

  const foot = document.getElementById("pubs-foot");
  if (REVIEWER_FOR) {
    const box = el("div", "reviewer");
    box.append(el("span", "reviewer-label", "Peer reviewer"), el("span", "reviewer-list", REVIEWER_FOR));
    foot.append(box);
  }
}

function renderFooter() {
  document.getElementById("footer").textContent = `© ${new Date().getFullYear()} ${SITE.name}`;
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((i) => i.classList.add("visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
    }),
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  items.forEach((i) => io.observe(i));
}

function setupProgress() {
  const tl = document.getElementById("timeline");
  const update = () => {
    const r = tl.getBoundingClientRect();
    const h = window.innerHeight;
    const p = Math.min(1, Math.max(0, (h * 0.6 - r.top) / r.height));
    tl.style.setProperty("--progress", p.toFixed(4));
  };
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

const lightbox = document.getElementById("lightbox");
function openLightbox(src, alt) {
  const content = document.getElementById("lightbox-content");
  content.replaceChildren(mediaNode(src, alt));
  const v = content.querySelector("video");
  if (v) { v.controls = true; v.muted = false; }
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  lightbox.hidden = true;
  document.getElementById("lightbox-content").replaceChildren();
  document.body.style.overflow = "";
}
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox || e.target.classList.contains("lightbox-close")) closeLightbox();
});
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !lightbox.hidden) closeLightbox(); });

renderHero();
renderSkills();
renderTimeline();
renderPubs();
renderFooter();
setupReveal();
setupProgress();
