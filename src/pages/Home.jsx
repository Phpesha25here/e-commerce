import { useState, useEffect, useRef } from "react";

// ── Inline styles as JS objects ─────────────────────────────────────────────
const fonts = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Poppins:wght@300;400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Poppins', sans-serif; background: #fff; color: #1a0a00; overflow-x: hidden; }

  .ss-nav-link:hover { color: #F4621A !important; background: #FFF3EB !important; }
  .ss-nav-link.active { color: #F4621A !important; background: #FFF3EB !important; }

  .ss-btn-login {
    background: transparent;
    color: #F4621A;
    border: 2px solid #F4621A;
    padding: 9px 24px;
    border-radius: 50px;
    font-family: 'Poppins', sans-serif;
    font-size: 13.5px;
    font-weight: 700;
    cursor: pointer;
    transition: all .25s ease;
    letter-spacing: .03em;
  }
  .ss-btn-login:hover { background: #F4621A; color: #fff; transform: translateY(-1px); box-shadow: 0 6px 18px rgba(244,98,26,.35); }

  .ss-btn-register {
    background: #F4621A;
    color: #fff;
    border: 2px solid #F4621A;
    padding: 9px 24px;
    border-radius: 50px;
    font-family: 'Poppins', sans-serif;
    font-size: 13.5px;
    font-weight: 700;
    cursor: pointer;
    transition: all .25s ease;
    letter-spacing: .03em;
  }
  .ss-btn-register:hover { background: #D94E10; border-color: #D94E10; transform: translateY(-1px); box-shadow: 0 6px 18px rgba(244,98,26,.4); }

  .hamburger-line { display: block; width: 24px; height: 2.5px; background: #F4621A; border-radius: 3px; transition: all .3s ease; }

  .hero-card { transition: transform .35s ease, box-shadow .35s ease; }
  .hero-card:hover { transform: translateY(-8px) !important; box-shadow: 0 28px 64px rgba(244,98,26,.28) !important; }

  .bestseller-card { transition: transform .3s ease, box-shadow .3s ease; cursor: pointer; }
  .bestseller-card:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(0,0,0,.12) !important; }
  .bestseller-card:hover .bs-add-btn { background: #D94E10 !important; transform: scale(1.1); }

  .bs-add-btn { transition: all .25s ease; }

  .mobile-drawer { transition: transform .35s cubic-bezier(.4,0,.2,1); }

  .about-stat { transition: transform .3s ease; }
  .about-stat:hover { transform: scale(1.05); }

  @keyframes floatUp { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-10px);} }
  @keyframes fadeSlideUp { from{opacity:0;transform:translateY(30px);} to{opacity:1;transform:translateY(0);} }
  @keyframes scaleIn { from{opacity:0;transform:scale(.92);} to{opacity:1;transform:scale(1);} }

  .animate-float { animation: floatUp 4s ease-in-out infinite; }
  .anim-1 { animation: fadeSlideUp .7s ease forwards; }
  .anim-2 { animation: fadeSlideUp .7s .15s ease both; }
  .anim-3 { animation: fadeSlideUp .7s .3s ease both; }
  .anim-4 { animation: scaleIn .8s .1s ease both; }
  .anim-5 { animation: scaleIn .8s .25s ease both; }

  @media(max-width:768px) {
    .hero-cards-row { flex-direction: column !important; }
    .about-grid { flex-direction: column !important; }
    .bs-grid { grid-template-columns: repeat(2,1fr) !important; }
    .visit-grid { flex-direction: column !important; text-align: center; }
    .visit-grid > div { align-items: center !important; }
  }
  @media(max-width:480px) {
    .bs-grid { grid-template-columns: 1fr !important; }
  }
`;

// ── DATA ───────────────────────────────────────────────────────────────────
const NAV_LINKS = ["Menu", "Specials", "About Us"];

const BESTSELLERS = [
  { id: 1, emoji: "🍦", name: "Classic Vanilla Cone", desc: "Hand-churned Madagascar vanilla with a crispy waffle cone.", price: "₹120", tag: "Bestseller", tagColor: "#F4621A" },
  { id: 2, emoji: "🍓", name: "Strawberry Swirl Gelato", desc: "Fresh Mahabaleshwar strawberries in silky Italian-style gelato.", price: "₹160", tag: "New", tagColor: "#2E1A0E" },
  { id: 3, emoji: "🧇", name: "Belgian Waffle Sundae", desc: "Golden waffle, 2 scoops, warm caramel & whipped cream.", price: "₹280", tag: "Popular", tagColor: "#F4621A" },
  { id: 4, emoji: "🥤", name: "Thick Mango Milkshake", desc: "Alphonso mango blended with our premium vanilla ice cream.", price: "₹200", tag: "Summer Pick", tagColor: "#c45d08" },
];

// ── COMPONENT ──────────────────────────────────────────────────────────────
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAdd = (id) => {
    setCartCount((c) => c + 1);
    setAddedId(id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <>
      {/* inject fonts + global css */}
      <style>{fonts}</style>

      {/* ══════════════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(255,255,255,.97)" : "#fff",
        boxShadow: scrolled ? "0 2px 20px rgba(244,98,26,.1)" : "0 1px 0 #FFE8D8",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        transition: "all .3s ease",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>

          {/* LEFT — Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "8px 6px", display: "flex", flexDirection: "column", gap: 6, zIndex: 1001 }}
            aria-label="Menu"
          >
            <span className="hamburger-line" style={{ transform: menuOpen ? "rotate(45deg) translate(6px,6px)" : "none" }} />
            <span className="hamburger-line" style={{ opacity: menuOpen ? 0 : 1, transform: menuOpen ? "scaleX(0)" : "none" }} />
            <span className="hamburger-line" style={{ transform: menuOpen ? "rotate(-45deg) translate(6px,-6px)" : "none" }} />
          </button>

          {/* CENTER — Logo */}
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
            <div style={{ width: 42, height: 42, background: "#F4621A", borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, boxShadow: "0 4px 14px rgba(244,98,26,.4)" }}>
              🍦
            </div>
            <div style={{ lineHeight: 1.15 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 18, color: "#1a0a00" }}>CREAMANTRA</div>
              <div style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#A0724E" }}>Premium Ice Cream & Eatery Shop</div>
            </div>
          </a>

          {/* RIGHT — Auth buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Cart badge — small helper */}
            {cartCount > 0 && (
              <div style={{ position: "relative", marginRight: 6 }}>
                <span style={{ fontSize: 20 }}>🛒</span>
                <span style={{ position: "absolute", top: -6, right: -6, background: "#F4621A", color: "#fff", fontSize: 9, fontWeight: 800, width: 16, height: 16, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #fff" }}>{cartCount}</span>
              </div>
            )}
            <button className="ss-btn-login">Login</button>
            <button className="ss-btn-register">Register</button>
          </div>
        </div>

        {/* ── Mobile Drawer ── */}
        <div
          className="mobile-drawer"
          style={{
            position: "fixed", top: 70, left: 0, right: 0,
            background: "#fff", borderBottom: "2px solid #FFE8D8",
            padding: menuOpen ? "16px 24px 28px" : "0 24px",
            maxHeight: menuOpen ? 400 : 0,
            overflow: "hidden",
            transition: "all .35s cubic-bezier(.4,0,.2,1)",
            boxShadow: menuOpen ? "0 12px 40px rgba(244,98,26,.12)" : "none",
            zIndex: 999,
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{ display: "block", padding: "14px 0", fontSize: 15, fontWeight: 600, color: "#6B3F24", textDecoration: "none", borderBottom: "1px solid #FFE8D8" }}
            >
              {link}
            </a>
          ))}
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button className="ss-btn-login" style={{ flex: 1 }}>Logout </button>
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════
          HERO BANNER CARDS
          Two orange rectangles side by side
          Left: image on LEFT + text on right
          Right: text on left + image on RIGHT
      ══════════════════════════════════════════════ */}
      <section style={{ paddingTop: 94, background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 64px", display: "flex", flexDirection: "column", gap: 24 }} className="hero-cards-row" id="menu">

          {/* ── CARD 1: Image LEFT, Text RIGHT ── */}
          <div
            className="hero-card anim-4"
            style={{
              background: "linear-gradient(135deg, #F4621A 0%, #FF8547 100%)",
              borderRadius: 24,
              overflow: "hidden",
              display: "flex",
              flexDirection: "row",
              minHeight: 300,
              boxShadow: "0 16px 48px rgba(244,98,26,.25)",
            }}
          >
            {/* Image area left */}
            <div style={{
              flex: "0 0 42%",
              background: "rgba(0,0,0,.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
              minHeight: 280,
            }}>
              {/* decorative circles */}
              <div style={{ position: "absolute", width: 240, height: 240, borderRadius: "50%", background: "rgba(255,255,255,.07)", top: -60, left: -60 }} />
              <div style={{ position: "absolute", width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,.06)", bottom: -40, right: -30 }} />
              {/* Emoji illustration */}
              <div className="animate-float" style={{ fontSize: 110, filter: "drop-shadow(0 16px 32px rgba(0,0,0,.2))", position: "relative", zIndex: 1 }}>
                🍨
              </div>
            </div>

            {/* Text right */}
            <div style={{ flex: 1, padding: "44px 44px 44px 36px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 18 }}>
              <span style={{ background: "rgba(255,255,255,.2)", color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", padding: "5px 14px", borderRadius: 100, width: "fit-content", backdropFilter: "blur(8px)" }}>
                🌟 Handcrafted Daily
              </span>
              
              <h2  style={{ fontStyle: "italic", color: "rgba(255,255,255,.85)" }}>Where Every Scoop is a Story </h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,.85)", lineHeight: 1.75, fontWeight: 400, maxWidth: 380 }}>
                Over 24 rotating flavours churned fresh every morning using locally sourced A2 milk, seasonal fruits, and zero preservatives.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="#menu" style={{ background: "#fff", color: "#F4621A", fontWeight: 800, fontSize: 13.5, padding: "12px 28px", borderRadius: 50, textDecoration: "none", boxShadow: "0 6px 20px rgba(0,0,0,.15)", display: "inline-flex", alignItems: "center", gap: 6 }}>
                  Explore Menu 🍦
                </a>
                
              </div>
              {/* mini stats */}
              <div style={{ display: "flex", gap: 28, marginTop: 6 }}>
                {[["4.9★", "Rating"], ["24+", "Flavours"], ["Collabration", "& Influencers Friendly"]].map(([val, lbl]) => (
                  <div key={lbl}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 900, color: "#fff" }}>{val}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,.65)", fontWeight: 500, letterSpacing: ".05em" }}>{lbl}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── CARD 2: Text LEFT, Image RIGHT ── */}
          <div
            className="hero-card anim-5"
            style={{
              background: "linear-gradient(135deg, #FF8547 0%, #F4621A 100%)",
              borderRadius: 24,
              overflow: "hidden",
              display: "flex",
              flexDirection: "row",
              minHeight: 300,
              boxShadow: "0 16px 48px rgba(244,98,26,.22)",
            }}
          >
            {/* Text LEFT */}
            <div style={{ flex: 1, padding: "44px 36px 44px 44px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 18 }}>
              <span style={{ background: "rgba(255,255,255,.2)", color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", padding: "5px 14px", borderRadius: 100, width: "fit-content", backdropFilter: "blur(8px)" }}>
                Eatery
              </span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3.5vw, 44px)", fontWeight: 900, color: "#fff", lineHeight: 1.1, letterSpacing: "-.02em" }}>
                Cheesy , Hot <br/>
                <em style={{ fontStyle: "italic", color: "rgba(255,255,255,.85)" }}>& Freshly Baked</em>
              </h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,.85)", lineHeight: 1.75, fontWeight: 400, maxWidth: 380 }}>
                Our delicious Pav bhaji, Tawa pulao, Pizzas & Pasta are made to order using fresh, locally sourced ingredients and bursting with flavor in every bite.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="#bestseller" style={{ background: "#fff", color: "#F4621A", fontWeight: 800, fontSize: 13.5, padding: "12px 28px", borderRadius: 50, textDecoration: "none", boxShadow: "0 6px 20px rgba(0,0,0,.15)", display: "inline-flex", alignItems: "center", gap: 6 }}>
                  See Bestsellers 🏆
                </a>
                <a href="#visit" style={{ background: "rgba(255,255,255,.18)", color: "#fff", fontWeight: 700, fontSize: 13.5, padding: "12px 28px", borderRadius: 50, textDecoration: "none", border: "2px solid rgba(255,255,255,.35)", display: "inline-flex", alignItems: "center", gap: 6, backdropFilter: "blur(8px)" }}>
                  Visit Us 📍
                </a>
              </div>
              {/* tags */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Pav Bhaji", "Tawa Pulao", "Waffles", "Sizzling Brownie Ice-cream Sundae"].map(f => (
                  <span key={f} style={{ background: "rgba(255,255,255,.18)", color: "#fff", fontSize: 12, fontWeight: 600, padding: "5px 13px", borderRadius: 100, border: "1px solid rgba(255,255,255,.3)" }}>{f}</span>
                ))}
              </div>
            </div>

            {/* Image area RIGHT */}
            <div style={{
              flex: "0 0 42%",
              background: "rgba(0,0,0,.07)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
              minHeight: 280,
            }}>
              <div style={{ position: "absolute", width: 220, height: 220, borderRadius: "50%", background: "rgba(255,255,255,.07)", bottom: -50, right: -50 }} />
              <div style={{ position: "absolute", width: 140, height: 140, borderRadius: "50%", background: "rgba(255,255,255,.06)", top: -30, left: -20 }} />
              <div className="animate-float" style={{ fontSize: 110, filter: "drop-shadow(0 16px 32px rgba(0,0,0,.2))", position: "relative", zIndex: 1, animationDelay: "1.2s" }}>
                🧇
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════
          ABOUT US
      ══════════════════════════════════════════════ */}
      <section id="about" style={{ padding: "90px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* Section label */}
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ background: "#FFF3EB", color: "#F4621A", fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", padding: "6px 18px", borderRadius: 100, border: "1.5px solid #FFE0CC" }}>About Us</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, color: "#1a0a00", marginTop: 18, marginBottom: 14, lineHeight: 1.1 }}>
              About <span style={{ color: "#F4621A" }}>Scoop & Eatery </span>
            </h2>
            <p style={{ fontSize: 16, color: "#A0724E", lineHeight: 1.8, maxWidth: 560, margin: "0 auto" }}>
              Born out of a love for honest food and joyful moments — we've been scooping happiness since 2024.
            </p>
          </div>

          {/* About grid */}
          <div className="about-grid" style={{ display: "flex", gap: 56, alignItems: "center" }}>


            {/* Text — right */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 22,alignItems:"center" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 900, color: "#1a0a00", lineHeight: 1.2 }}>
                Handcrafted with love,<br/>served with pride.
              </h3>
              <p style={{ fontSize: 15.5, color: "#6B3F24", lineHeight: 1.85, fontWeight: 400 }}>
                Creamantra started as a tiny parlour in Nerul. Today, we're Navi Mumbai's favourite artisan ice cream destination — but our recipe for happiness has never changed.
              </p>

              {/* Feature list */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  ["🌿", "100% natural ingredients — no artificial flavours or colours"],
                  ["♻️", "Fully biodegradable packaging, zero plastic"],
                  ["👨‍🍳", "Open kitchen — watch your scoop being made"],
                ].map(([icon, text]) => (
                  <div key={text} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: "#FFF3EB", border: "1.5px solid #FFD4B5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>{icon}</div>
                    <div style={{ fontSize: 14.5, color: "#6B3F24", lineHeight: 1.6, paddingTop: 8, fontWeight: 400 }}>{text}</div>
                  </div>
                ))}
              </div>

              <a href="#visit" style={{ background: "#F4621A", color: "#fff", fontWeight: 700, fontSize: 14, padding: "13px 30px", borderRadius: 50, textDecoration: "none", boxShadow: "0 6px 20px rgba(244,98,26,.35)", display: "inline-flex", alignItems: "center", gap: 8, width: "fit-content", marginTop: 4 }}>
                Visit Our Store 📍
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          BESTSELLERS
      ══════════════════════════════════════════════ */}
      <section id="bestseller" style={{ padding: "90px 24px", background: "#FDF8F3" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ background: "#FFF3EB", color: "#F4621A", fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", padding: "6px 18px", borderRadius: 100, border: "1.5px solid #FFE0CC" }}>Customer Favourites</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, color: "#1a0a00", marginTop: 18, marginBottom: 14, lineHeight: 1.1 }}>
              Our <span style={{ color: "#F4621A" }}>Bestsellers</span>
            </h2>
            <p style={{ fontSize: 16, color: "#A0724E", lineHeight: 1.8, maxWidth: 480, margin: "0 auto" }}>
              The scoops our customers order again and again — each one a little story of joy.
            </p>
          </div>

          <div className="bs-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22 }}>
            {BESTSELLERS.map((item) => (
              <div key={item.id} className="bestseller-card" style={{ background: "#fff", borderRadius: 22, overflow: "hidden", border: "1.5px solid #FFE8D8", boxShadow: "0 4px 16px rgba(244,98,26,.07)" }}>

                {/* image area */}
                <div style={{ height: 160, background: "linear-gradient(135deg, #FFF3EB, #FFD4B5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72, position: "relative" }}>
                  {item.emoji}
                  {/* tag */}
                  <span style={{ position: "absolute", top: 12, right: 12, background: item.tagColor, color: "#fff", fontSize: 10, fontWeight: 800, letterSpacing: ".07em", textTransform: "uppercase", padding: "4px 11px", borderRadius: 100 }}>
                    {item.tag}
                  </span>
                </div>

                {/* body */}
                <div style={{ padding: "18px 20px 22px" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: "#1a0a00", marginBottom: 6 }}>{item.name}</div>
                  <div style={{ fontSize: 13, color: "#A0724E", lineHeight: 1.65, marginBottom: 18 }}>{item.desc}</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#F4621A" }}>{item.price}</span>
                    <button
                      className="bs-add-btn"
                      onClick={() => handleAdd(item.id)}
                      style={{ width: 38, height: 38, borderRadius: "50%", background: addedId === item.id ? "#2D6A4F" : "#F4621A", border: "none", color: "#fff", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 14px rgba(244,98,26,.35)" }}
                    >
                      {addedId === item.id ? "✓" : "+"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 44 }}>
            <a href="#menu" style={{ background: "#F4621A", color: "#fff", fontWeight: 700, fontSize: 14.5, padding: "14px 38px", borderRadius: 50, textDecoration: "none", boxShadow: "0 6px 24px rgba(244,98,26,.35)", display: "inline-flex", alignItems: "center", gap: 8 }}>
              View Full Menu 🍨
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          VISIT US  — orange background
      ══════════════════════════════════════════════ */}
      <section id="visit" style={{ padding: "90px 24px", background: "linear-gradient(135deg, #F4621A 0%, #FF8547 60%, #F4621A 100%)", position: "relative", overflow: "hidden" }}>

        {/* decorative blobs */}
        <div style={{ position: "absolute", top: -120, right: -80, width: 500, height: 500, borderRadius: "50%", background: "rgba(255,255,255,.06)" }} />
        <div style={{ position: "absolute", bottom: -100, left: -60, width: 380, height: 380, borderRadius: "50%", background: "rgba(0,0,0,.05)" }} />
        <div style={{ position: "absolute", top: "30%", left: "40%", width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,.04)" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>

          {/* header */}
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ background: "rgba(255,255,255,.2)", color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", padding: "6px 18px", borderRadius: 100, border: "1.5px solid rgba(255,255,255,.3)", backdropFilter: "blur(8px)" }}>📍 Find Us</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4.5vw, 54px)", fontWeight: 900, color: "#fff", marginTop: 18, marginBottom: 14, lineHeight: 1.1 }}>
              Come in,<br/>stay a while.
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,.8)", lineHeight: 1.8, maxWidth: 480, margin: "0 auto" }}>
              Our cozy parlour is designed for long afternoons, good company, and always one scoop too many.
            </p>
          </div>

          {/* grid */}
          <div className="visit-grid" style={{ display: "flex", gap: 32, alignItems: "stretch", flexWrap: "wrap" }}>

            {/* Map placeholder */}
            <div style={{ flex: "0 0 44%", minWidth: 280 }}>
              <div style={{ background: "rgba(255,255,255,.12)", border: "2px solid rgba(255,255,255,.2)", borderRadius: 24, backdropFilter: "blur(12px)", aspectRatio: "4/3", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, position: "relative", overflow: "hidden" }}>
                {/* grid lines */}
                <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
                <div style={{ fontSize: 52, animation: "floatUp 2.5s ease-in-out infinite", position: "relative", filter: "drop-shadow(0 8px 20px rgba(0,0,0,.3))" }}>📍</div>
                <div style={{ background: "rgba(255,255,255,.95)", borderRadius: 100, padding: "10px 22px", fontWeight: 700, fontSize: 14, color: "#F4621A", boxShadow: "0 8px 28px rgba(0,0,0,.15)", position: "relative" }}>
                  🍦 Scoop & Spoon — Bandra West
                </div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,.7)", position: "relative", fontWeight: 500 }}>Carter Road, Mumbai 400050</div>
              </div>
            </div>

            {/* Info cards */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, minWidth: 260 }}>

              {[
                { icon: "🕐", label: "Opening Hours", lines: ["Mon – Thu: 12:00 PM – 10:00 PM", "Fri – Sun: 11:00 AM – 11:00 PM"] },
                { icon: "📍", label: "Address", lines: ["42, Carter Road, Bandra West", "Mumbai, Maharashtra 400050"] },
                { icon: "📞", label: "Reservations & Orders", lines: ["+91 98765 43210", "hello@scoopandspoon.in"] },
              ].map(({ icon, label, lines }) => (
                <div key={label} style={{ background: "rgba(255,255,255,.12)", border: "1.5px solid rgba(255,255,255,.2)", borderRadius: 18, padding: "20px 24px", backdropFilter: "blur(10px)", display: "flex", gap: 16, alignItems: "flex-start", transition: "all .3s ease" }}>
                  <div style={{ width: 46, height: 46, borderRadius: 13, background: "rgba(255,255,255,.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{icon}</div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.6)", marginBottom: 6 }}>{label}</div>
                    {lines.map(l => <div key={l} style={{ fontSize: 14.5, fontWeight: 600, color: "#fff", lineHeight: 1.6 }}>{l}</div>)}
                  </div>
                </div>
              ))}

              {/* CTA buttons */}
              <div style={{ display: "flex", gap: 12, marginTop: 4, flexWrap: "wrap" }}>
                <a href="tel:+919876543210" style={{ flex: 1, minWidth: 140, background: "#fff", color: "#F4621A", fontWeight: 800, fontSize: 14, padding: "13px 20px", borderRadius: 50, textDecoration: "none", boxShadow: "0 6px 20px rgba(0,0,0,.15)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  🚴 Order Delivery
                </a>
                <a href="tel:+919876543210" style={{ flex: 1, minWidth: 140, background: "rgba(255,255,255,.15)", color: "#fff", fontWeight: 700, fontSize: 14, padding: "13px 20px", borderRadius: 50, textDecoration: "none", border: "2px solid rgba(255,255,255,.35)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, backdropFilter: "blur(8px)" }}>
                  📞 Call to Reserve
                </a>
              </div>
            </div>
          </div>

          {/* bottom strip */}
          <div style={{ marginTop: 60, borderTop: "1.5px solid rgba(255,255,255,.2)", paddingTop: 36, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 42, height: 42, background: "#fff", borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🍦</div>
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 18, color: "#fff" }}>Scoop & Spoon</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,.6)", letterSpacing: ".08em", textTransform: "uppercase" }}>Artisan Ice Cream & Eatery</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              {["Instagram 📸", "Zomato 🍱", "Swiggy 🛵", "Google Maps 📍"].map(s => (
                <a key={s} href="#" style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,.75)", textDecoration: "none", background: "rgba(255,255,255,.12)", padding: "6px 14px", borderRadius: 100, border: "1px solid rgba(255,255,255,.2)", transition: "all .25s ease" }}>{s}</a>
              ))}
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,.5)" }}>© 2026 Scoop & Spoon · Made with 🧡 in Mumbai</div>
          </div>
        </div>
      </section>
    </>
  );
}
