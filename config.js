// ============================================================
//  EDIT THIS FILE ONLY — everything on the page comes from here
// ============================================================
window.SITE = {
  name: "Anuj Gambhir",
  role: "Graphic Designer & Video Editor",
  // wrap a word in *stars* to set it in italics
  tagline: "Design and edits that make brands *remembered*.",
  lede: "Posters, social creatives, reels and motion graphics for clubs, events and creators.",
  about:
    "I design and edit visual content for brands, clubs and creators. From posters and social creatives to short-form video, VFX and motion graphics, I turn ideas into work that gets noticed.",
  tools: ["Photoshop", "CorelDRAW", "Premiere Pro", "After Effects"],
  email: "anujgambhir07@gmail.com",
  instagram: "", // your own Instagram link (leave "" to hide)

  // Each entry is ONE post. "items" with more than one file becomes a slide-through post.
  // Files ending in .mp4 play as video; "poster" is the still shown before a video plays.
  // tag = Post | Motion | Reel (used for the filter chips). title may be "" to show no heading.
  work: [
    { title: "DTU but Minecraft", tag: "Post",
      desc: "A carousel reimagining the DTU campus as Minecraft scenes: the lawns, the library, a study desk and the faculty block.",
      items: ["assets/images/i1.webp", "assets/images/i2.webp", "assets/images/i3.webp", "assets/images/i4.webp"] },
    { title: "R3PRSNT, DTU Hip-Hop Society", tag: "Post",
      desc: "Identity and event creatives for R3PRSNT: a passport-style member card, the Aarambh event story and the orientation poster.",
      items: ["assets/images/i5.jpg", "assets/images/i6.png", "assets/images/i8.png"] },
    { title: "Stars Align", tag: "Post",
      desc: "Cover art with chrome lettering and hand-painted neon bursts behind the artists.",
      items: ["assets/images/i7.jpg"] },
    { title: "Floating Screens", tag: "Motion",
      desc: "Motion-tracked 3D screens orbiting a figure, composited in After Effects.",
      items: [{ src: "assets/images/i9.mp4", poster: "assets/posters/i9.jpg" }] },
    { title: "Light Trails", tag: "Motion",
      desc: "Street footage turned into flowing long-exposure light trails.",
      items: [{ src: "assets/images/i10.mp4", poster: "assets/posters/i10.jpg" }] },
    { title: "Campus Walk", tag: "Reel",
      desc: "A short campus walk edit, cut to the beat with a branded end card.",
      items: [{ src: "assets/videos/v1.mp4", poster: "assets/posters/v1.jpg" }] },
    { title: "Red Circle", tag: "Reel",
      desc: "A music edit with a rotoscoped cut-out against a bold red circle and kinetic lyric type.",
      items: [{ src: "assets/videos/v4.mp4", poster: "assets/posters/v4.jpg" }] },
    { title: "Tracked", tag: "Reel",
      desc: "A VFX edit built on face and object tracking, with a HUD overlay and graphics locked to motion.",
      items: [{ src: "assets/videos/v5.mp4", poster: "assets/posters/v5.jpg" }] },
    { title: "Glitch Collage", tag: "Reel",
      desc: "A fast collage edit with cut-out portraits, colour washes and glitch transitions.",
      items: [{ src: "assets/videos/v6.mp4", poster: "assets/posters/v6.jpg" }] },
    { title: "Fisheye", tag: "Reel",
      desc: "A black-and-white fisheye performance piece with split-frame sequencing.",
      items: [{ src: "assets/videos/v7.mp4", poster: "assets/posters/v7.jpg" }] },
    { title: "They Don't End", tag: "Reel",
      desc: "A moody monochrome short about late-night code and empty classrooms.",
      items: [{ src: "assets/videos/v8.mp4", poster: "assets/posters/v8.jpg" }] },
    { title: "Red Posterize", tag: "Reel",
      desc: "A two-tone posterized performance edit in red and white, with shape-mask transitions.",
      items: [{ src: "assets/videos/v9.mp4", poster: "assets/posters/v9.jpg" }] }
  ],

  // Past clients' Instagram pages
  clients: [
    { name: "Ambitio Club", handle: "@ambitio.club", url: "https://www.instagram.com/ambitio.club/", note: "Social media creatives, posters and reels" },
    { name: "Engifest DTU", handle: "@engifest_dtu", url: "https://www.instagram.com/engifest_dtu/", note: "Event creatives, promo videos and motion graphics" }
  ]
};
