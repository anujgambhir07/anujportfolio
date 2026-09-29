(function () {
  const S = window.SITE, $ = (id) => document.getElementById(id);
  const esc = (s) => String(s || "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const isVid = (s) => /\.(mp4|webm|mov)$/i.test(s);
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- normalise data ----------
  const WORK = S.work.map((w, id) => ({ ...w, id, items: w.items.map((x) => (typeof x === "string" ? { src: x } : x)) }));

  // ---------- static text ----------
  document.title = S.name + " — " + S.role;
  $("navName").textContent = S.name;
  $("role").textContent = S.role;
  $("name").textContent = S.name;
  $("tagline").textContent = S.tagline;
  $("hint").textContent = S.hint;
  $("about-text").textContent = S.about;
  $("tools").innerHTML = S.tools.map((t) => "<li>" + esc(t) + "</li>").join("");
  $("mail").textContent = S.email; $("mail").href = "mailto:" + S.email;
  if (S.instagram) { $("ig").textContent = "Instagram ↗"; $("ig").href = S.instagram; } else $("ig").remove();
  $("year").textContent = "© " + new Date().getFullYear(); $("foot").textContent = S.name;
  $("clientGrid").innerHTML = S.clients.map((c) =>
    '<a class="client" target="_blank" rel="noopener" href="' + esc(c.url) + '"><span class="h">' + esc(c.handle) + "</span><b>" + esc(c.name) +
    "</b><p>" + esc(c.note) + "</p><span class='go'>View Instagram ↗</span></a>").join("");

  // ---------- media element ----------
  function media(src, alt) {
    if (isVid(src)) {
      const v = document.createElement("video");
      v.src = src + "#t=0.1"; v.muted = true; v.loop = true; v.playsInline = true; v.preload = "metadata";
      v.setAttribute("muted", ""); v.setAttribute("playsinline", "");
      return v;
    }
    const i = new Image(); i.src = src; i.alt = alt || ""; i.loading = "lazy"; i.decoding = "async";
    return i;
  }
  const play = (v) => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };
  let viewerOpen = false;

  // ---------- viewer (slide-through posts) ----------
  const viewer = $("viewer"), stage = $("stage");
  let cur = null, idx = 0;
  function show() {
    const it = cur.items[idx];
    stage.innerHTML = "";
    let m;
    if (isVid(it.src)) {
      m = document.createElement("video");
      m.src = it.src; m.controls = true; m.autoplay = true; m.loop = true; m.playsInline = true;
    } else { m = new Image(); m.src = it.src; m.alt = cur.title; }
    stage.append(m);
    if (m.play) play(m);
    const n = cur.items.length;
    $("vTitle").textContent = cur.title;
    $("vCount").textContent = n > 1 ? idx + 1 + " / " + n : cur.tag;
    $("vPrev").hidden = $("vNext").hidden = n < 2;
    $("vDots").innerHTML = n > 1 ? cur.items.map((_, i) => '<i data-i="' + i + '"' + (i === idx ? ' class="on"' : "") + "></i>").join("") : "";
  }
  function openViewer(id, slide) {
    cur = WORK[id]; idx = slide || 0; viewerOpen = true;
    viewer.hidden = false; document.body.classList.add("lock"); show();
    document.querySelectorAll(".hero video,.grid video").forEach((v) => v.pause());
  }
  function closeViewer() {
    viewer.hidden = true; viewerOpen = false; stage.innerHTML = ""; document.body.classList.remove("lock");
  }
  const step = (d) => { if (cur && cur.items.length > 1) { idx = (idx + d + cur.items.length) % cur.items.length; show(); } };
  $("vClose").onclick = closeViewer;
  $("vPrev").onclick = () => step(-1);
  $("vNext").onclick = () => step(1);
  $("vDots").onclick = (e) => { if (e.target.dataset.i != null) { idx = +e.target.dataset.i; show(); } };
  viewer.addEventListener("click", (e) => { if (e.target === viewer || e.target === stage) closeViewer(); });
  document.addEventListener("keydown", (e) => {
    if (viewer.hidden) return;
    if (e.key === "Escape") closeViewer();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
  let sx = null;
  stage.addEventListener("pointerdown", (e) => (sx = e.clientX));
  stage.addEventListener("pointerup", (e) => {
    if (sx != null && Math.abs(e.clientX - sx) > 50) step(e.clientX < sx ? 1 : -1);
    sx = null;
  });

  // ---------- grid ----------
  const grid = $("grid"), cards = [];
  WORK.forEach((w) => {
    const c = document.createElement("button");
    c.className = "card"; c.dataset.tag = w.tag; c.setAttribute("aria-label", "Open " + w.title);
    c.append(media(w.items[0].src, w.title));
    if (w.items.length > 1) c.insertAdjacentHTML("beforeend", '<span class="multi">▣ ' + w.items.length + "</span>");
    c.insertAdjacentHTML("beforeend", '<div class="cap"><b>' + esc(w.title) + "</b><span>" + esc(w.tag) + "</span></div>");
    c.onclick = () => openViewer(w.id, 0);
    grid.append(c); cards.push(c);
  });
  const tags = ["All", ...new Set(WORK.map((w) => w.tag))];
  $("chips").innerHTML = tags.map((t, i) => '<button class="chip' + (i ? "" : " on") + '" data-t="' + esc(t) + '">' + esc(t) + "</button>").join("");
  $("chips").onclick = (e) => {
    const t = e.target.dataset.t; if (!t) return;
    document.querySelectorAll(".chip").forEach((b) => b.classList.toggle("on", b === e.target));
    cards.forEach((c) => (c.hidden = t !== "All" && c.dataset.tag !== t));
  };
  // grid videos play while on screen
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    const v = e.target.querySelector("video"); if (!v) return;
    if (e.isIntersecting && !viewerOpen) play(v); else v.pause();
  }), { threshold: 0.6 });
  cards.forEach((c) => c.querySelector("video") && io.observe(c));

  // ---------- 3D sphere ----------
  const hero = $("hero"), sphere = $("sphere");
  const P = 1400;
  // one tile per post, plus an extra tile for every additional slide of multi-slide posts
  const base = WORK.map((w) => ({ w, slide: 0 }));
  const extra = [];
  WORK.forEach((w) => w.items.slice(1).forEach((_, k) => extra.push({ w, slide: k + 1 })));
  const isV = (e) => isVid(e.w.items[e.slide].src);
  const vids = base.filter(isV), imgs = base.concat(extra).filter((e) => !isV(e));
  const pool = [];
  for (let i = 0; i < Math.max(vids.length, imgs.length); i++) { if (imgs[i]) pool.push(imgs[i]); if (vids[i]) pool.push(vids[i]); }
  // fill the sphere: repeat the pool (shifted) until it is dense enough
  const N = Math.max(pool.length, innerWidth < 640 ? 24 : 32), entries = [];
  for (let i = 0; i < N; i++) entries.push(pool[(i + Math.floor(i / pool.length) * 7) % pool.length]);
  const GA = Math.PI * (3 - Math.sqrt(5));

  const tiles = entries.map((e, i) => {
    const yUp = 1 - (2 * (i + 0.5)) / N, lat = Math.asin(yUp), th = i * GA;
    const t = document.createElement("div"); t.className = "tile";
    const f = document.createElement("div"); f.className = "face";
    const it = e.w.items[e.slide];
    f.append(media(it.src, e.w.title));
    if (e.slide === 0 && e.w.items.length > 1) f.insertAdjacentHTML("beforeend", '<span class="multi">▣ ' + e.w.items.length + "</span>");
    f.insertAdjacentHTML("beforeend", '<div class="cap"><b>' + esc(e.w.title) + "</b><span>" + esc(e.w.tag) + "</span></div>");
    t.append(f); sphere.append(t);
    t.addEventListener("click", () => { if (drag.moved < 6) openViewer(e.w.id, e.slide); });
    return { t, v: f.querySelector("video"), lat, th, n: [Math.cos(lat) * Math.sin(th), -Math.sin(lat), Math.cos(lat) * Math.cos(th)], playing: false, z: 0 };
  });

  const MAXP = innerWidth < 640 ? 4 : 7;
  // rotation state
  let rx = -8, ry = 0, vy = 10, tvy = 10, trx = -8;
  const drag = { on: false, moved: 0, x: 0, y: 0, t: 0 };
  let mouseIn = false, R = 240, W = 0, H = 0;

  function layout() {
    const r = hero.getBoundingClientRect(); W = r.width; H = r.height;
    R = Math.max(120, Math.min(W * 0.34, H * 0.31, 300));
    const area = (4 * Math.PI * R * R * 0.92) / N, tw = Math.sqrt(area / 1.33), th = tw * 1.33;
    tiles.forEach((o) => {
      const s = o.t.style;
      s.width = tw + "px"; s.height = th + "px"; s.marginLeft = -tw / 2 + "px"; s.marginTop = -th / 2 + "px";
      s.transform = "rotateY(" + o.th + "rad) rotateX(" + o.lat + "rad) translateZ(" + R + "px)";
    });
    ["netBack", "netFront"].forEach((id) => {
      const c = $(id), d = Math.min(devicePixelRatio || 1, 2);
      c.width = W * d; c.height = H * d; c.getContext("2d").setTransform(d, 0, 0, d, 0, 0);
    });
    buildNet();
  }

  // rotate a vector the same way the CSS does: rotateY(ry) first, then rotateX(rx)
  function rot(x, y, z, a, b) {
    const cy = Math.cos(a), sy = Math.sin(a), cx = Math.cos(b), sx2 = Math.sin(b);
    const x1 = x * cy + z * sy, z1 = -x * sy + z * cy;
    return [x1, y * cx - z1 * sx2, y * sx2 + z1 * cx];
  }

  // network shell
  let pts = [], links = [];
  function buildNet() {
    const n = 150, Rn = R * 1.38; pts = []; links = [];
    for (let i = 0; i < n; i++) {
      const jit = Math.sin(i * 12.9898) * 0.5; // deterministic wobble so it doesn't look like a perfect lattice
      const y = Math.max(-1, Math.min(1, 1 - (2 * (i + 0.5)) / n + jit * 0.02)), r = Math.sqrt(1 - y * y), th = i * GA + jit * 0.15;
      pts.push({ p: [Rn * r * Math.cos(th), Rn * y, Rn * r * Math.sin(th)], warm: i % 5 === 0 });
    }
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
      const a = pts[i].p, b = pts[j].p, d = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
      if (d < Rn * 0.44) links.push([i, j]);
    }
  }
  function drawNet(front, a, b) {
    const ctx = $(front ? "netFront" : "netBack").getContext("2d");
    ctx.clearRect(0, 0, W, H);
    const cx = W / 2, cy = H / 2, pr = pts.map((o) => {
      const [x, y, z] = rot(o.p[0], o.p[1], o.p[2], a, b), k = P / (P - z);
      return { x: cx + x * k, y: cy + y * k, z, k, warm: o.warm };
    });
    const ok = (z) => (z > 0) === front;
    ctx.lineWidth = 1;
    links.forEach(([i, j]) => {
      const A = pr[i], B = pr[j], z = (A.z + B.z) / 2;
      if (!ok(z)) return;
      ctx.strokeStyle = "rgba(77,225,255," + (0.08 + 0.32 * (z / (R * 1.38) + 1) / 2).toFixed(3) + ")";
      ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.stroke();
    });
    pr.forEach((o) => {
      if (!ok(o.z)) return;
      const s = (o.z / (R * 1.38) + 1) / 2;
      ctx.fillStyle = o.warm ? "rgba(255,184,107," + (0.5 + 0.5 * s) + ")" : "rgba(160,240,255," + (0.35 + 0.6 * s) + ")";
      ctx.shadowColor = o.warm ? "#ffb86b" : "#4de1ff"; ctx.shadowBlur = 8;
      ctx.beginPath(); ctx.arc(o.x, o.y, (o.warm ? 2.6 : 1.8) * o.k, 0, 7); ctx.fill();
    });
    ctx.shadowBlur = 0;
  }

  // input
  hero.addEventListener("pointermove", (e) => {
    if (e.pointerType === "mouse" && !drag.on) {
      mouseIn = true;
      const r = hero.getBoundingClientRect(), nx = ((e.clientX - r.left) / r.width - 0.5) * 2, ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
      tvy = nx * 70; trx = -ny * 22 - 4;
    }
  });
  hero.addEventListener("pointerleave", () => { mouseIn = false; tvy = 10; trx = -8; });
  hero.addEventListener("pointerdown", (e) => {
    drag.on = true; drag.moved = 0; drag.x = e.clientX; drag.y = e.clientY; drag.t = performance.now();
  });
  addEventListener("pointermove", (e) => {
    if (!drag.on) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y, now = performance.now(), dt = Math.max(1, now - drag.t) / 1000;
    drag.moved += Math.abs(dx) + Math.abs(dy);
    ry += dx * 0.35; if (e.pointerType === "mouse") rx = Math.max(-40, Math.min(40, rx - dy * 0.25));
    vy = tvy = (dx * 0.35) / dt; drag.x = e.clientX; drag.y = e.clientY; drag.t = now;
  });
  const endDrag = () => { if (!drag.on) return; drag.on = false; tvy = Math.max(-120, Math.min(120, vy)); setTimeout(() => { if (!mouseIn) tvy = 10; }, 700); setTimeout(() => (drag.moved = 0), 0); };
  addEventListener("pointerup", endDrag); addEventListener("pointercancel", endDrag);

  // loop
  let last = performance.now(), visible = true;
  new IntersectionObserver((es) => (visible = es[0].isIntersecting)).observe(hero);
  function frame(now) {
    requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (!visible) return;
    if (!drag.on) { vy += (tvy - vy) * Math.min(1, dt * 3); if (!reduce) ry += vy * dt; }
    rx += (trx - rx) * Math.min(1, dt * 3) * (drag.on ? 0 : 1);
    const a = (ry * Math.PI) / 180, b = (rx * Math.PI) / 180;
    sphere.style.transform = "rotateX(" + rx + "deg) rotateY(" + ry + "deg)";
    tiles.forEach((o) => {
      o.z = rot(o.n[0], o.n[1], o.n[2], a, b)[2];
      o.t.style.opacity = (0.5 + 0.5 * Math.max(0, o.z)).toFixed(2);
    });
    // only the few video tiles facing the viewer play, keeps it smooth on phones
    const allowed = new Set(tiles.filter((o) => o.v && o.z > 0.25).sort((p, q) => q.z - p.z).slice(0, MAXP));
    tiles.forEach((o) => {
      if (!o.v) return;
      const want = allowed.has(o) && !viewerOpen;
      if (want && !o.playing) { play(o.v); o.playing = true; } else if (!want && o.playing) { o.v.pause(); o.playing = false; }
    });
    drawNet(false, a, b); drawNet(true, a, b);
  }
  addEventListener("resize", layout);
  layout(); requestAnimationFrame(frame);
})();
