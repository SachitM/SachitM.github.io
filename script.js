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
  img.decoding = "async";
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

// Interactive pose graph with a real optimizer (2D positions only).
//
// A robot drives along the pointer (or a demo loop). Odometry edges carry a noisy,
// biased measurement of each step, so dead reckoning drifts. Constraints added later,
// a loop closure (automatic) or a localization fix (click), are folded in by re-solving
// the WHOLE graph: minimise  sum  w * |x_j - x_i - z|^2  over all keyframe positions.
// With positions only this is linear least squares, solved exactly with a Cholesky
// factorisation. Orientation is not modelled, which is what would make it nonlinear.
function initGraph() {
  const box = document.getElementById("hero-art");
  if (!box) return;
  const canvas = el("canvas");
  canvas.setAttribute("aria-hidden", "true");
  box.append(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) { box.remove(); return; }

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const touch = window.matchMedia("(hover: none)").matches;
  const STEP = 28;          // px of travel between keyframes
  const MAX_KF = 160;       // trail length; the oldest keyframes fade out
  const LC_MIN_GAP = 10;    // a loop closure needs a keyframe at least this far back
  const LC_RADIUS = 26;     // ...whose true position is within this many px
  const LC_COOLDOWN = 6;    // keyframes to wait between loop closures
  const BIAS = { x: 0.09, y: 0.05 }; // systematic odometry error per px travelled
  // constraint weights (information): odometry is the weak one
  const W_ODO = 1, W_LC = 30, W_FIX = 600, W_GAUGE = 1000;
  // self-driving demo
  const DEMO_SPEED = 0.0084;  // figure-eight speed (was 0.012; 30% slower)
  const DEMO_FIX_EVERY = 14;  // at least this many keyframes between automatic global fixes
  const DEMO_FIX_ERR = 22;    // ...and the tip must have drifted at least this many px

  // --- overlay: legend, drift meter, hint (plain DOM, over the canvas) ---
  const legend = el("ul", "graph-legend");
  [["est", "Estimated (optimized)"], ["truth", "Ground truth"], ["fix", "Localization fix"], ["loop", "Loop closure"]].forEach(([k, t]) => {
    const li = el("li");
    li.append(el("i", "lg " + k), document.createTextNode(t));
    legend.append(li);
  });
  const meterBar = el("i");
  const track = el("b");
  track.append(meterBar);
  const meter = el("div", "graph-meter");
  meter.append(el("span", null, "Error"), track);
  const hint = el("p", "graph-hint", touch ? "Drag to drive the robot · tap to localize" : "Move to drive the robot · click to localize");
  box.append(legend, meter, hint);

  // --- state ---
  let w = 0, h = 0;
  let col = { accent: "#4fb3ff", line: "#263241", warn: "#f0b94a", muted: "#8a99a8", loop: "#3fb68b" };
  // keyframe: id, true pos (tx,ty), displayed estimate (ex,ey), optimized target (sx,sy),
  // odometry measurement from the previous keyframe (ux,uy)
  const kfs = [];
  const loops = [];   // loop-closure constraints {a, b, zx, zy}
  const priors = [];  // absolute constraints {kf, x, y, w}: localization fixes and the gauge anchor
  const ripples = [];
  let nextId = 0, lastLCId = -999, lastFixId = -999;
  let pointer = null, pointerAt = 0, demoT = 0, userSeen = false, hovering = false;
  // the pointer is in charge while it is over the panel, and for 2.5 s after it leaves or stops
  const manual = (now) => pointer && (hovering || now - pointerAt < 2500);

  function readColors() {
    const cs = getComputedStyle(document.documentElement);
    const get = (n, d) => cs.getPropertyValue(n).trim() || d;
    col = { accent: get("--accent", col.accent), line: get("--border", col.line), warn: get("--gold", col.warn), muted: get("--muted", col.muted), loop: get("--loop", col.loop) };
  }

  function reset() { kfs.length = 0; loops.length = 0; priors.length = 0; ripples.length = 0; lastLCId = -999; lastFixId = -999; }

  // ---- the optimizer ----
  // Solve A v = b for each right-hand side with a dense Cholesky factorisation (A is SPD
  // because the gauge prior pins the graph). n is at most MAX_KF, so this takes ~1 ms.
  function choleskySolve(A, n, rhs) {
    const L = new Float64Array(n * n);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j <= i; j++) {
        let s = A[i * n + j];
        for (let k = 0; k < j; k++) s -= L[i * n + k] * L[j * n + k];
        if (i === j) { if (s <= 1e-12) return null; L[i * n + i] = Math.sqrt(s); }
        else L[i * n + j] = s / L[j * n + j];
      }
    }
    return rhs.map((b) => {
      const y = new Float64Array(n), x = new Float64Array(n);
      for (let i = 0; i < n; i++) {
        let s = b[i];
        for (let k = 0; k < i; k++) s -= L[i * n + k] * y[k];
        y[i] = s / L[i * n + i];
      }
      for (let i = n - 1; i >= 0; i--) {
        let s = y[i];
        for (let k = i + 1; k < n; k++) s -= L[k * n + i] * x[k];
        x[i] = s / L[i * n + i];
      }
      return x;
    });
  }

  function optimize() {
    const n = kfs.length;
    if (n < 2) return;
    const base = kfs[0].id;
    const A = new Float64Array(n * n), bx = new Float64Array(n), by = new Float64Array(n);
    // a relative constraint  x_j - x_i = z  with weight wt
    const edge = (i, j, zx, zy, wt) => {
      A[i * n + i] += wt; A[j * n + j] += wt; A[i * n + j] -= wt; A[j * n + i] -= wt;
      bx[j] += wt * zx; bx[i] -= wt * zx; by[j] += wt * zy; by[i] -= wt * zy;
    };
    for (let i = 1; i < n; i++) edge(i - 1, i, kfs[i].ux, kfs[i].uy, W_ODO);
    loops.forEach((l) => edge(l.a.id - base, l.b.id - base, l.zx, l.zy, W_LC));
    priors.forEach((p) => {  // an absolute constraint  x_i = p
      const i = p.kf.id - base;
      A[i * n + i] += p.w; bx[i] += p.w * p.x; by[i] += p.w * p.y;
    });
    const sol = choleskySolve(A, n, [bx, by]);
    if (!sol) return;
    kfs.forEach((k, i) => { k.sx = sol[0][i]; k.sy = sol[1][i]; });
  }

  // the first keyframe carries a strong prior so the whole graph cannot slide
  function setGauge() {
    for (let i = priors.length - 1; i >= 0; i--) if (priors[i].gauge) priors.splice(i, 1);
    priors.push({ kf: kfs[0], x: kfs[0].sx, y: kfs[0].sy, w: W_GAUGE, gauge: true });
  }

  function addKeyframe(x, y) {
    const prev = kfs[kfs.length - 1];
    const kf = { id: nextId++, tx: x, ty: y, ex: x, ey: y, sx: x, sy: y, ux: 0, uy: 0, fixed: false };
    if (prev) {
      // odometry: the true step, plus systematic bias and noise
      const dx = x - prev.tx, dy = y - prev.ty, dist = Math.hypot(dx, dy);
      kf.ux = dx + BIAS.x * dist + (Math.random() - 0.5) * 4;
      kf.uy = dy + BIAS.y * dist + (Math.random() - 0.5) * 4;
      kf.sx = prev.sx + kf.ux; kf.sy = prev.sy + kf.uy;   // dead-reckon from the latest solution
      kf.ex = prev.ex + kf.ux; kf.ey = prev.ey + kf.uy;
    }
    kfs.push(kf);
    if (kfs.length === 1) setGauge();
    if (kfs.length > MAX_KF) {
      kfs.shift();
      const first = kfs[0].id;
      for (let i = loops.length - 1; i >= 0; i--) if (loops[i].a.id < first) loops.splice(i, 1);
      for (let i = priors.length - 1; i >= 0; i--) if (priors[i].kf.id < first) priors.splice(i, 1);
      setGauge();
    }
    detectLoop();
  }

  // Automatic loop closure: the newest keyframe is truly back near an older one (at least
  // LC_MIN_GAP keyframes ago). Add a relative constraint between them and re-solve.
  function detectLoop() {
    const k = kfs.length - 1;
    const cur = kfs[k];
    if (k < LC_MIN_GAP || cur.id - lastLCId < LC_COOLDOWN) return;
    let best = -1, bestD = LC_RADIUS;
    for (let i = 0; i <= k - LC_MIN_GAP; i++) {
      const d = Math.hypot(cur.tx - kfs[i].tx, cur.ty - kfs[i].ty);
      if (d < bestD) { bestD = d; best = i; }
    }
    if (best < 0) return;
    const a = kfs[best];
    // what the "scan match" measures: the true offset between the two poses (plus a little noise)
    loops.push({ a, b: cur, zx: cur.tx - a.tx + (Math.random() - 0.5), zy: cur.ty - a.ty + (Math.random() - 0.5) });
    ripples.push({ x: cur.tx, y: cur.ty, t: 0, loop: true });
    lastLCId = cur.id;
    optimize();
  }

  // Localization fix (click, or the demo): an absolute position measurement of the newest keyframe.
  function localize() {
    const tip = kfs[kfs.length - 1];
    if (!tip || kfs.length < 2 || tip.fixed) return;
    tip.fixed = true;
    lastFixId = tip.id;
    priors.push({ kf: tip, x: tip.tx, y: tip.ty, w: W_FIX });
    ripples.push({ x: tip.tx, y: tip.ty, t: 0 });
    optimize();
  }

  function driverPos(now) {
    if (manual(now)) return pointer;
    demoT += DEMO_SPEED;
    return { x: w / 2 + w * 0.34 * Math.sin(demoT), y: h / 2 + h * 0.26 * Math.sin(demoT * 2) };
  }

  const err = (k) => Math.hypot(k.ex - k.tx, k.ey - k.ty);

  function step(now) {
    const pos = driverPos(now);
    const last = kfs[kfs.length - 1];
    if (last && Math.hypot(pos.x - last.tx, pos.y - last.ty) > 140) reset(); // mode switch: start a new track
    const l2 = kfs[kfs.length - 1];
    if (!l2 || Math.hypot(pos.x - l2.tx, pos.y - l2.ty) >= STEP) addKeyframe(pos.x, pos.y);
    const tip = kfs[kfs.length - 1];
    const userDriving = manual(now);
    // the demo adds a global fix every so often, once the estimate has drifted enough
    if (!userDriving && tip.id - lastFixId >= DEMO_FIX_EVERY && err(tip) > DEMO_FIX_ERR) localize();
    const ease = reduce ? 1 : 0.12;
    kfs.forEach((k) => { k.ex += (k.sx - k.ex) * ease; k.ey += (k.sy - k.ey) * ease; });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    if (!kfs.length) return;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    // once the trail is full, its oldest part fades out
    const fade = (i) => (kfs.length < MAX_KF ? 1 : Math.min(1, 0.12 + i / (MAX_KF * 0.3)));

    // ground truth (dotted)
    ctx.setLineDash([3, 6]);
    ctx.strokeStyle = col.muted;
    ctx.globalAlpha = 0.6;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    kfs.forEach((k, i) => (i ? ctx.lineTo(k.tx, k.ty) : ctx.moveTo(k.tx, k.ty)));
    ctx.stroke();

    // error links: true pose to estimated pose
    ctx.setLineDash([]);
    ctx.strokeStyle = col.warn;
    ctx.globalAlpha = 0.35;
    ctx.lineWidth = 1;
    kfs.forEach((k) => {
      ctx.beginPath();
      ctx.moveTo(k.tx, k.ty);
      ctx.lineTo(k.ex, k.ey);
      ctx.stroke();
    });

    // estimated trajectory (odometry edges)
    ctx.strokeStyle = col.accent;
    ctx.lineWidth = 2;
    for (let i = 1; i < kfs.length; i++) {
      const p = kfs[i - 1], q = kfs[i];
      ctx.globalAlpha = fade(i);
      ctx.beginPath();
      ctx.moveTo(p.ex, p.ey);
      ctx.lineTo(q.ex, q.ey);
      ctx.stroke();
    }

    // loop-closure edges (dashed green) between the estimates of a revisited place
    ctx.setLineDash([6, 4]);
    ctx.strokeStyle = col.loop;
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.9;
    loops.forEach((l) => {
      ctx.beginPath();
      ctx.moveTo(l.a.ex, l.a.ey);
      ctx.lineTo(l.b.ex, l.b.ey);
      ctx.stroke();
    });
    ctx.setLineDash([]);

    // keyframe nodes; fixed ones get a gold ring
    kfs.forEach((k, i) => {
      ctx.globalAlpha = fade(i);
      ctx.fillStyle = col.accent;
      ctx.beginPath();
      ctx.arc(k.ex, k.ey, 3.2, 0, Math.PI * 2);
      ctx.fill();
      if (k.fixed) {
        ctx.strokeStyle = col.warn;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(k.ex, k.ey, 7, 0, Math.PI * 2);
        ctx.stroke();
      }
    });

    // current pose (the robot)
    const tip = kfs[kfs.length - 1];
    ctx.fillStyle = col.accent;
    ctx.globalAlpha = 0.25;
    ctx.beginPath();
    ctx.arc(tip.ex, tip.ey, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.arc(tip.ex, tip.ey, 5.5, 0, Math.PI * 2);
    ctx.fill();

    // ripples
    ctx.lineWidth = 2;
    for (let i = ripples.length - 1; i >= 0; i--) {
      const r = ripples[i];
      ctx.strokeStyle = r.loop ? col.loop : col.warn;
      ctx.globalAlpha = 1 - r.t;
      ctx.beginPath();
      ctx.arc(r.x, r.y, 8 + r.t * 56, 0, Math.PI * 2);
      ctx.stroke();
      r.t += 0.035;
      if (r.t >= 1) ripples.splice(i, 1);
    }
    ctx.globalAlpha = 1;

    // error meter: how far the robot's current estimate is from the truth
    meterBar.style.transform = "scaleX(" + Math.min(1, err(tip) / 60).toFixed(3) + ")";
  }

  function frame() { step(performance.now()); draw(); }

  function resize() {
    // Phones fire resize events while scrolling (the address bar shows and hides).
    // Only rebuild when the panel's own size really changed.
    if (box.clientWidth === w && box.clientHeight === h && w > 0) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = box.clientWidth; h = box.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    readColors();
    reset();
    if (reduce) { for (let i = 0; i < 240; i++) step(performance.now()); }
    draw();
  }

  // --- input ---
  // Mouse: the robot follows the cursor while it is over the panel.
  // Touch: a drag drives the robot, a tap is a localization fix. A touch only counts as a
  // drag once the finger has moved a little, so a tap never teleports the robot or clears the graph.
  let touchStart = null;
  const place = (e) => {
    const r = canvas.getBoundingClientRect();
    pointer = { x: e.clientX - r.left, y: e.clientY - r.top };
    pointerAt = performance.now();
  };
  box.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "touch") touchStart = { x: e.clientX, y: e.clientY, moved: false };
  });
  box.addEventListener("pointerenter", (e) => {
    if (e.pointerType === "touch") return;
    place(e);
    hovering = true;
  });
  const release = () => { hovering = false; pointerAt = performance.now(); touchStart = null; };
  // Belt and braces for browsers that ignore `touch-action: none`: a finger that moves on the
  // panel never scrolls the page. (A tap has no movement, so it still produces a click.)
  box.addEventListener("touchmove", (e) => e.preventDefault(), { passive: false });
  box.addEventListener("pointerleave", release);
  box.addEventListener("pointercancel", release);
  box.addEventListener("pointerup", (e) => { if (e.pointerType === "touch") release(); });
  box.addEventListener("pointermove", (e) => {
    if (e.pointerType === "touch") {
      if (!touchStart) return;
      if (!touchStart.moved) {
        if (Math.hypot(e.clientX - touchStart.x, e.clientY - touchStart.y) < 10) return;
        touchStart.moved = true;
        hovering = true;
      }
    }
    const r = canvas.getBoundingClientRect();
    pointer = { x: e.clientX - r.left, y: e.clientY - r.top };
    pointerAt = performance.now();
    if (reduce) { step(pointerAt); draw(); }
  });
  box.addEventListener("click", () => { localize(); if (reduce) { step(performance.now()); draw(); } });

  window.addEventListener("resize", resize);
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", () => { readColors(); draw(); });
  resize();
  if (reduce) return; // no continuous animation; the graph still responds to input

  let running = false;
  const loop = () => { if (running) { frame(); requestAnimationFrame(loop); } };
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => {
      const was = running;
      running = e.isIntersecting;
      if (running && !was) requestAnimationFrame(loop);
    }).observe(box);
  } else { running = true; requestAnimationFrame(loop); }
}

function renderHeroExtras() {
  initGraph();

  const list = document.getElementById("highlights");
  (SITE.highlights || []).forEach((h) => {
    const li = el("li");
    li.append(el("strong", null, h.value), el("span", null, h.label));
    list.append(li);
  });
  if (!list.children.length) list.remove();
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
renderHeroExtras();
renderSkills();
renderTimeline();
renderPubs();
renderFooter();
setupReveal();
setupProgress();
