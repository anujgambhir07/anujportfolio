(function () {
  const S = window.SITE, $ = (id) => document.getElementById(id);
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const esc = (s) => String(s || "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  document.title = S.name + " — " + S.role;
  $("navName").textContent = S.name;
  $("role").textContent = S.role;
  $("tagline").textContent = S.tagline;
  $("about").textContent = S.about;
  $("tools").innerHTML = S.tools.map((t) => "<li>" + esc(t) + "</li>").join("");
  $("mail").textContent = S.email; $("mail").href = "mailto:" + S.email;
  if (S.instagram) { $("ig").textContent = "Instagram ↗"; $("ig").href = S.instagram; } else $("ig").remove();
  $("year").textContent = "© " + new Date().getFullYear(); $("foot").textContent = S.name;

  const caption = (i) => "<figcaption><b>" + esc(i.title) + "</b><span>" + esc(i.tool) + "</span></figcaption>";

  // Images (missing file -> neutral placeholder)
  const lb = $("lightbox"), lbImg = lb.querySelector("img");
  S.images.forEach((i) => {
    const f = el("figure", "card", ""); const img = new Image();
    img.loading = "lazy"; img.alt = i.title; img.src = i.src;
    img.onerror = () => f.classList.add("missing");
    f.append(img); f.insertAdjacentHTML("beforeend", caption(i));
    f.onclick = () => { if (f.classList.contains("missing")) return; lbImg.src = i.src; lb.hidden = false; };
    $("imageGrid").append(f);
  });
  lb.onclick = () => (lb.hidden = true);
  document.addEventListener("keydown", (e) => e.key === "Escape" && (lb.hidden = true));

  // Videos
  S.videos.forEach((v) => {
    const f = el("figure", "card vid", "");
    if (v.youtube) {
      f.innerHTML = '<iframe loading="lazy" src="https://www.youtube.com/embed/' + esc(v.youtube) + '" title="' + esc(v.title) + '" allowfullscreen></iframe>';
    } else {
      const vid = document.createElement("video");
      vid.src = v.src; vid.controls = true; vid.preload = "metadata"; vid.playsInline = true;
      if (v.poster) vid.poster = v.poster;
      vid.onerror = () => f.classList.add("missing");
      f.append(vid);
      // only one video plays at a time
      vid.onplay = () => document.querySelectorAll("video").forEach((o) => o !== vid && o.pause());
    }
    f.insertAdjacentHTML("beforeend", caption(v));
    $("videoGrid").append(f);
  });

  // Clients
  S.clients.forEach((c) => {
    const a = el("a", "client", "<span class='h'>" + esc(c.handle) + "</span><b>" + esc(c.name) + "</b><p>" + esc(c.note) + "</p><span class='go'>View Instagram ↗</span>");
    a.href = c.url; a.target = "_blank"; a.rel = "noopener";
    $("clientGrid").append(a);
  });
})();
