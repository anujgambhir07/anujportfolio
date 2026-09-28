// ============================================================
//  EDIT THIS FILE ONLY — everything on the page comes from here
// ============================================================
window.SITE = {
  name: "Anuj Gambhir",
  role: "Graphic Designer & Video Editor",
  tagline: "Brands, posters and reels that stop the scroll.",
  about:
    "I design and edit visual content for brands and creators. From logos and social creatives to short-form video and motion graphics, I turn ideas into work that gets noticed.",
  tools: ["Photoshop", "CorelDRAW", "Premiere Pro", "After Effects"],
  email: "anujgambhir07@gmail.com",          // <- your email
  instagram: "", // your own Instagram link (leave "" to hide)

  // Files live in assets/images/ (.mp4 files there show as looping motion tiles)
  images: [
    { src: "assets/images/i1.webp", title: "DTU but Minecraft", tool: "Reel cover" },
    { src: "assets/images/i2.webp", title: "DTU Library, in Minecraft", tool: "Reel frame" },
    { src: "assets/images/i3.webp", title: "Study Desk, in Minecraft", tool: "Reel frame" },
    { src: "assets/images/i4.webp", title: "Faculty Block, in Minecraft", tool: "Reel frame" },
    { src: "assets/images/i5.jpg", title: "R3PRSNT Passport", tool: "Concept design" },
    { src: "assets/images/i6.png", title: "R3PRESENT at Aarambh", tool: "Event story" },
    { src: "assets/images/i7.jpg", title: "Stars Align", tool: "Cover art" },
    { src: "assets/images/i8.png", title: "R3PRSNT Orientation", tool: "Poster" },
    { src: "assets/images/i9.mp4", title: "Motion piece 01", tool: "Motion" },
    { src: "assets/images/i10.mp4", title: "Motion piece 02", tool: "Motion" }
  ],

  // Each video: either a local file (src) OR a YouTube id (youtube). poster is optional. 'tool' is just the small label under the title.
  videos: [
    { src: "assets/videos/v1.mp4", title: "Reel 01", tool: "Video edit" },
    { src: "assets/videos/v2.mp4", title: "Reel 02", tool: "Video edit" },
    { src: "assets/videos/v3.mp4", title: "Reel 03", tool: "Video edit" },
    { src: "assets/videos/v4.mp4", title: "Reel 04", tool: "Video edit" },
    { src: "assets/videos/v5.mp4", title: "Reel 05", tool: "Video edit" },
    { src: "assets/videos/v6.mp4", title: "Reel 06", tool: "Video edit" },
    { src: "assets/videos/v7.mp4", title: "Reel 07", tool: "Video edit" },
    { src: "assets/videos/v8.mp4", title: "Reel 08", tool: "Video edit" },
    { src: "assets/videos/v9.mp4", title: "Reel 09", tool: "Video edit" },
    { src: "assets/videos/v10.mp4", title: "Reel 10", tool: "Video edit" }
    // YouTube example: { youtube: "dQw4w9WgXcQ", title: "Reel", tool: "Premiere Pro" }
  ],

  // Past clients' Instagram pages
  clients: [
    { name: "Ambitio Club", handle: "@ambitio.club", url: "https://www.instagram.com/ambitio.club/", note: "Social media creatives, posters and reels" },
    { name: "Engifest DTU", handle: "@engifest_dtu", url: "https://www.instagram.com/engifest_dtu/", note: "Event creatives, promo videos and motion graphics" }
  ]
};
