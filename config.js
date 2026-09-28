// ============================================================
//  EDIT THIS FILE ONLY — everything on the page comes from here
// ============================================================
window.SITE = {
  name: "Anuj Gambhir",
  role: "Graphic Designer & Video Editor",
  tagline: "Explore the creative universe",
  hint: "Move your cursor to rotate · Click any tile to open",
  about:
    "I design and edit visual content for brands and creators. From posters and social creatives to short-form video and motion graphics, I turn ideas into work that gets noticed.",
  tools: ["Photoshop", "CorelDRAW", "Premiere Pro", "After Effects"],
  email: "anujgambhir07@gmail.com",
  instagram: "", // your own Instagram link (leave "" to hide)

  // Each entry is ONE post. "items" with more than one file becomes a slide-through post.
  // Files ending in .mp4 play as video. tag = Post | Motion | Reel (used for the filter chips).
  work: [
    { title: "DTU but Minecraft", tag: "Post", items: [
      "assets/images/i1.webp", "assets/images/i2.webp", "assets/images/i3.webp", "assets/images/i4.webp"
    ] },
    { title: "R3PRSNT DTU", tag: "Post", items: [
      "assets/images/i5.jpg", "assets/images/i6.png", "assets/images/i8.png"
    ] },
    { title: "Stars Align", tag: "Post", items: ["assets/images/i7.jpg"] },
    { title: "Motion 01", tag: "Motion", items: ["assets/images/i9.mp4"] },
    { title: "Motion 02", tag: "Motion", items: ["assets/images/i10.mp4"] },
    { title: "Reel 01", tag: "Reel", items: ["assets/videos/v1.mp4"] },
    { title: "Reel 02", tag: "Reel", items: ["assets/videos/v2.mp4"] },
    { title: "Reel 03", tag: "Reel", items: ["assets/videos/v3.mp4"] },
    { title: "Reel 04", tag: "Reel", items: ["assets/videos/v4.mp4"] },
    { title: "Reel 05", tag: "Reel", items: ["assets/videos/v5.mp4"] },
    { title: "Reel 06", tag: "Reel", items: ["assets/videos/v6.mp4"] },
    { title: "Reel 07", tag: "Reel", items: ["assets/videos/v7.mp4"] },
    { title: "Reel 08", tag: "Reel", items: ["assets/videos/v8.mp4"] },
    { title: "Reel 09", tag: "Reel", items: ["assets/videos/v9.mp4"] }
  ],

  // Past clients' Instagram pages
  clients: [
    { name: "Ambitio Club", handle: "@ambitio.club", url: "https://www.instagram.com/ambitio.club/", note: "Social media creatives, posters and reels" },
    { name: "Engifest DTU", handle: "@engifest_dtu", url: "https://www.instagram.com/engifest_dtu/", note: "Event creatives, promo videos and motion graphics" }
  ]
};
