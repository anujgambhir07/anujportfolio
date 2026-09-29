(function () {
  const S = window.SITE, $ = (id) => document.getElementById(id);
  const esc = (s) => String(s || "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const isVid = (s) => /\.(mp4|webm|mov)$/i.test(s);
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const touch = matchMedia("(hover: none)").matches;
  const play = (v) => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };
  document.documentElement.classList.add("js");

  const WORK = S.work.map((w, id) => ({ ...w, id, items: w.items.map((x) => (typeof x === "string" ? { src: x } : x)) }));

  // ---------- text ----------
  document.title = S.name + " — " + S.role;
  $("navName").textContent = S.name;
  $("role").textContent = S.role;
  $("tagline").innerHTML = esc(S.tagline).replace(/\*(.+?)\*/g, "<em>$1</em>");
  $("lede").textContent = S.lede || "";
  $("hint").textContent = touch ? "Drag to spin · Tap to open" : "Move to spin · Click to open";
  $("about-text").textContent = S.about;
  $("tools").innerHTML = S.tools.map((t) => "<li>" + esc(t) + "</li>").join("");
  $("mail").textContent = S.email; $("mail").href = "mailto:" + S.email;
  if (S.instagram) { $("ig").textContent = "Instagram ↗"; $("ig").href = S.instagram; } else $("ig").remove();
  $("year").textContent = "© " + new Date().getFullYear() + " " + S.name;
  $("foot").textContent = S.role;
  $("clientGrid").innerHTML = S.clients.map((c, i) =>
    '<a class="client" data-reveal style="--d:' + i * 0.08 + 's" target="_blank" rel="noopener" href="' + esc(c.url) + '">' +
    "<b>" + esc(c.name) + '</b><span class="h">' + esc(c.handle) + "</span><p>" + esc(c.note) + '</p><span class="go" aria-hidden="true">↗</span></a>').join("");

  function media(it, alt) {
    if (isVid(it.src)) {
      const v = document.createElement("video");
      v.src = it.src; v.muted = true; v.loop = true; v.playsInline = true; v.preload = "none";
      if (it.poster) v.poster = it.poster;
      v.setAttribute("muted", ""); v.setAttribute("playsinline", "");
      return v;
    }
    const i = new Image(); i.src = it.src; i.alt = alt || ""; i.loading = "lazy"; i.decoding = "async";
    return i;
  }

  // ---------- viewer ----------
  const viewer = $("viewer"), stage = $("stage");
  let cur = null, idx = 0, viewerOpen = false;
  function show() {
    const it = cur.items[idx], n = cur.items.length;
    stage.innerHTML = "";
    let m;
    if (isVid(it.src)) {
      m = document.createElement("video");
      m.src = it.src; m.controls = true; m.autoplay = true; m.loop = true; m.playsInline = true;
      if (it.poster) m.poster = it.poster;
    } else { m = new Image(); m.src = it.src; m.alt = cur.title || cur.tag; }
    stage.append(m);
    if (m.play) play(m);
    $("vTag").textContent = cur.tag;
    $("vCount").textContent = n > 1 ? String(idx + 1).padStart(2, "0") + " / " + String(n).padStart(2, "0") : "";
    $("vTitle").textContent = cur.title || "";
    $("vDesc").textContent = cur.desc || "";
    $("vPrev").hidden = $("vNext").hidden = n < 2;
  }
  function openViewer(id, slide) {
    cur = WORK[id]; idx = slide || 0; viewerOpen = true;
    viewer.hidden = false; document.body.classList.add("lock"); show();
    document.querySelectorAll(".visual video,.grid video").forEach((v) => v.pause());
  }
  function closeViewer() { viewer.hidden = true; viewerOpen = false; stage.innerHTML = ""; document.body.classList.remove("lock"); }
  const step = (d) => { if (cur && cur.items.length > 1) { idx = (idx + d + cur.items.length) % cur.items.length; show(); } };
  $("vClose").onclick = closeViewer;
  $("vPrev").onclick = () => step(-1);
  $("vNext").onclick = () => step(1);
  viewer.addEventListener("click", (e) => { if (e.target === viewer || e.target === stage) closeViewer(); });
  document.addEventListener("keydown", (e) => {
    if (viewer.hidden) return;
    if (e.key === "Escape") closeViewer();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
  let sx = null;
  stage.addEventListener("pointerdown", (e) => (sx = e.clientX));
  stage.addEventListener("pointerup", (e) => { if (sx != null && Math.abs(e.clientX - sx) > 50) step(e.clientX < sx ? 1 : -1); sx = null; });

  // ---------- work grid ----------
  const grid = $("grid"), cards = [];
  WORK.forEach((w, i) => {
    const c = document.createElement("button");
    c.className = "card"; c.dataset.tag = w.tag; c.setAttribute("aria-label", "Open " + (w.title || w.tag));
    const th = document.createElement("div"); th.className = "thumb"; th.dataset.reveal = "";
    th.append(media(w.items[0], w.title));
    if (w.items.length > 1) th.insertAdjacentHTML("beforeend", '<span class="badge">' + w.items.length + " slides</span>");
    else if (isVid(w.items[0].src)) th.insertAdjacentHTML("beforeend", '<span class="badge">▶ Video</span>');
    const info = document.createElement("div"); info.className = "info"; info.dataset.reveal = "";
    info.innerHTML = (w.title ? "<b>" + esc(w.title) + "</b>" : "<b></b>") + '<span class="tag">' + esc(w.tag) + "</span>" + (w.desc ? "<p>" + esc(w.desc) + "</p>" : "");
    c.append(th, info);
    c.onclick = () => openViewer(w.id, 0);
    grid.append(c); cards.push(c);
  });
  const stagger = () => {
    const cols = getComputedStyle(grid).gridTemplateColumns.split(" ").length;
    cards.filter((c) => !c.hidden).forEach((c, i) => {
      const d = (i % cols) * 0.1 + "s";
      c.querySelectorAll("[data-reveal]").forEach((el, k) => el.style.setProperty("--d", k ? `calc(${d} + .12s)` : d));
    });
  };
  const tags = ["All", ...new Set(WORK.map((w) => w.tag))];
  $("chips").innerHTML = tags.map((t, i) => '<button class="tab' + (i ? "" : " on") + '" role="tab" data-t="' + esc(t) + '">' + esc(t) + "</button>").join("");
  $("chips").onclick = (e) => {
    const t = e.target.dataset.t; if (!t) return;
    document.querySelectorAll(".tab").forEach((b) => b.classList.toggle("on", b === e.target));
    cards.forEach((c) => (c.hidden = t !== "All" && c.dataset.tag !== t));
    stagger();
  };
  stagger(); addEventListener("resize", stagger);
  const vio = new IntersectionObserver((es) => es.forEach((e) => {
    const v = e.target.querySelector("video"); if (!v) return;
    if (e.isIntersecting && !viewerOpen) play(v); else v.pause();
  }), { threshold: 0.5 });
  cards.forEach((c) => c.querySelector("video") && vio.observe(c));

  // ---------- scroll reveal ----------
  const rio = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); rio.unobserve(e.target); }
  }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  document.querySelectorAll("[data-reveal]").forEach((el) => rio.observe(el));

  // ---------- scroll-linked: nav, progress bar, hero parallax ----------
  const top = $("top"), bar = $("progress"), heroText = $("heroText"), visual = $("visual");
  let ticking = false;
  function onScroll() {
    ticking = false;
    const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
    top.classList.toggle("scrolled", y > 20);
    bar.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
    if (!reduce && y < innerHeight * 1.2) {
      const p = Math.min(1, y / innerHeight);
      heroText.style.transform = "translateY(" + p * -60 + "px)";
      heroText.style.opacity = 1 - p * 1.1;
      visual.style.transform = "translateY(" + p * 80 + "px) scale(" + (1 - p * 0.12) + ")";
      visual.style.opacity = 1 - p * 0.9;
    }
  }
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  // ---------- 3D sphere ----------
  const sphere = $("sphere");
  const base = WORK.map((w) => ({ w, slide: 0 })), extra = [];
  WORK.forEach((w) => w.items.slice(1).forEach((_, k) => extra.push({ w, slide: k + 1 })));
  const isV = (e) => isVid(e.w.items[e.slide].src);
  const vids = base.filter(isV), imgs = base.concat(extra).filter((e) => !isV(e)), pool = [];
  for (let i = 0; i < Math.max(vids.length, imgs.length); i++) { if (imgs[i]) pool.push(imgs[i]); if (vids[i]) pool.push(vids[i]); }
  const N = Math.max(pool.length, innerWidth < 640 ? 24 : 30), entries = [];
  for (let i = 0; i < N; i++) entries.push(pool[(i + Math.floor(i / pool.length) * 7) % pool.length]);
  const GA = Math.PI * (3 - Math.sqrt(5)), MAXP = innerWidth < 640 ? 4 : 6;

  const drag = { on: false, moved: 0, x: 0, y: 0, t: 0 };
  const tiles = entries.map((e, i) => {
    const lat = Math.asin(1 - (2 * (i + 0.5)) / N), th = i * GA;
    const t = document.createElement("div"); t.className = "tile";
    const f = document.createElement("div"); f.className = "face";
    f.append(media(e.w.items[e.slide], e.w.title));
    t.title = e.w.title || e.w.tag;
    t.append(f); sphere.append(t);
    t.addEventListener("click", () => { if (drag.moved < 6) openViewer(e.w.id, e.slide); });
    return { t, v: f.querySelector("video"), lat, th, n: [Math.cos(lat) * Math.sin(th), -Math.sin(lat), Math.cos(lat) * Math.cos(th)], playing: false, z: 0 };
  });

  let rx = -8, ry = 0, vy = 8, tvy = 8, trx = -8, mouseIn = false;
  function layout() {
    const r = visual.getBoundingClientRect();
    const R = Math.max(130, Math.min(r.width * 0.42, r.height * 0.43, 360));
    const tw = Math.sqrt((4 * Math.PI * R * R * 0.88) / N / 1.3), th = tw * 1.3;
    tiles.forEach((o) => {
      const s = o.t.style;
      s.width = tw + "px"; s.height = th + "px"; s.marginLeft = -tw / 2 + "px"; s.marginTop = -th / 2 + "px";
      s.transform = "rotateY(" + o.th + "rad) rotateX(" + o.lat + "rad) translateZ(" + R + "px)";
    });
  }
  function rot(x, y, z, a, b) {
    const cy = Math.cos(a), sy = Math.sin(a), cx = Math.cos(b), s2 = Math.sin(b);
    const x1 = x * cy + z * sy, z1 = -x * sy + z * cy;
    return [x1, y * cx - z1 * s2, y * s2 + z1 * cx];
  }

  visual.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse" || drag.on) return;
    mouseIn = true;
    const r = visual.getBoundingClientRect(), nx = ((e.clientX - r.left) / r.width - 0.5) * 2, ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
    tvy = nx * 50; trx = -ny * 18 - 4;
  });
  visual.addEventListener("pointerleave", () => { mouseIn = false; tvy = 8; trx = -8; });
  visual.addEventListener("pointerdown", (e) => { drag.on = true; drag.moved = 0; drag.x = e.clientX; drag.y = e.clientY; drag.t = performance.now(); });
  addEventListener("pointermove", (e) => {
    if (!drag.on) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y, now = performance.now(), dt = Math.max(1, now - drag.t) / 1000;
    drag.moved += Math.abs(dx) + Math.abs(dy);
    ry += dx * 0.35; if (e.pointerType === "mouse") rx = Math.max(-40, Math.min(40, rx - dy * 0.25));
    vy = tvy = (dx * 0.35) / dt; drag.x = e.clientX; drag.y = e.clientY; drag.t = now;
  });
  const endDrag = () => { if (!drag.on) return; drag.on = false; tvy = Math.max(-100, Math.min(100, vy)); setTimeout(() => { if (!mouseIn) tvy = 8; }, 700); setTimeout(() => (drag.moved = 0), 0); };
  addEventListener("pointerup", endDrag); addEventListener("pointercancel", endDrag);

  let last = performance.now(), visible = true;
  new IntersectionObserver((es) => (visible = es[0].isIntersecting)).observe(visual);
  function frame(now) {
    requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (!visible) return;
    if (!drag.on) { vy += (tvy - vy) * Math.min(1, dt * 3); if (!reduce) ry += vy * dt; rx += (trx - rx) * Math.min(1, dt * 3); }
    const a = (ry * Math.PI) / 180, b = (rx * Math.PI) / 180;
    sphere.style.transform = "rotateX(" + rx + "deg) rotateY(" + ry + "deg)";
    tiles.forEach((o) => { o.z = rot(o.n[0], o.n[1], o.n[2], a, b)[2]; o.t.style.opacity = (0.35 + 0.65 * Math.max(0, o.z)).toFixed(2); });
    const allowed = new Set(tiles.filter((o) => o.v && o.z > 0.3).sort((p, q) => q.z - p.z).slice(0, MAXP));
    tiles.forEach((o) => {
      if (!o.v) return;
      const want = allowed.has(o) && !viewerOpen;
      if (want && !o.playing) { play(o.v); o.playing = true; } else if (!want && o.playing) { o.v.pause(); o.playing = false; }
    });
  }
  addEventListener("resize", layout);
  layout(); requestAnimationFrame(frame);
})();
