import { useState } from "react";

// ─── Brand Tokens (extracted from Clotherapy logo) ───────────────────────────
const B = {
  navy:      "#1B3D7B",
  navyDark:  "#132D5C",
  blue:      "#4BA8D8",
  lightBlue: "#87CEEB",
  white:     "#FFFFFF",
  bg:        "#F0F6FF",
  surface:   "#FFFFFF",
  gray:      "#6B7280",
  lightGray: "#F9FAFB",
  border:    "#E5E7EB",
  dark:      "#111827",
  mid:       "#374151",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  { icon: "🧺", name: "Laundry",           desc: "Wash & Fold, Wash & Steam Iron, Premium with Stain Removal", from: "₹80/kg"  },
  { icon: "👔", name: "Dry Cleaning",      desc: "Professional dry cleaning for all garment types — Men & Women", from: "₹90"   },
  { icon: "♨️", name: "Steam Iron",        desc: "Crisp, wrinkle-free results for shirts, suits, kurtas & more", from: "₹30"   },
  { icon: "👟", name: "Shoe & Bag Care",   desc: "Sports, leather, suede, handbags, backpacks & suitcases",    from: "₹200"  },
];

const STEPS = [
  { n: "01", title: "Schedule Pickup",  desc: "Choose your service & preferred date through our portal" },
  { n: "02", title: "We Collect",       desc: "Our pickup agent arrives at your door — free of charge"   },
  { n: "03", title: "Expert Care",      desc: "Your garments get professionally cleaned & treated"        },
  { n: "04", title: "Delivered Fresh",  desc: "Clean clothes returned to your doorstep, on time"         },
];

const PRICING = [
  { title: "Laundry (per kg)", color: "#EFF6FF", border: "#BFDBFE", accent: "#1D4ED8",
    items: [["Wash & Fold","₹80"],["Wash & Steam Iron","₹120"],["Premium + Stain Removal","₹150"]] },
  { title: "Steam Iron", color: "#F0FDF4", border: "#BBF7D0", accent: "#15803D",
    items: [["Shirt / T-Shirt","₹30"],["Trouser / Jeans","₹30"],["Suit (2pc / 3pc)","₹80 / ₹99"],["Coat / Blazer","₹60"]] },
  { title: "Dry Cleaning", color: "#FFF7ED", border: "#FED7AA", accent: "#C2410C",
    items: [["Shirt (plain/silk)","₹100/110"],["Suit (2pc/3pc)","₹330/440"],["Saree (plain/silk)","₹200/250"],["Sherwani (light)","₹400"]] },
  { title: "Shoe & Bag Care", color: "#F5F3FF", border: "#DDD6FE", accent: "#6D28D9",
    items: [["Sports Shoes","₹200"],["Leather Shoes","₹350"],["Leather Handbag","₹350"],["Suitcase","₹400"]] },
];

const STATUS_MAP = {
  "Scheduled":         { bg:"#EFF6FF", color:"#1D4ED8", border:"#BFDBFE" },
  "Picked Up":         { bg:"#FFF7ED", color:"#C2410C", border:"#FED7AA" },
  "In Process":        { bg:"#FEFCE8", color:"#A16207", border:"#FEF08A" },
  "Ready":             { bg:"#F0FDF4", color:"#15803D", border:"#BBF7D0" },
  "Out for Delivery":  { bg:"#F5F3FF", color:"#6D28D9", border:"#DDD6FE" },
  "Delivered":         { bg:"#ECFDF5", color:"#065F46", border:"#6EE7B7" },
};
const ALL_STATUSES = Object.keys(STATUS_MAP);

const INIT_ORDERS = [
  { id:"CLO-410", customer:"Aryan (L204)",    phone:"9910392689", service:"Laundry",      items:8,  amount:300,  status:"Delivered",        pickup:"2026-05-26", delivery:"2026-05-28", address:"Signature Global, Sec-93, L204"     },
  { id:"CLO-411", customer:"Rahul Sharma",    phone:"9812345678", service:"Dry Cleaning",  items:3,  amount:450,  status:"In Process",       pickup:"2026-06-20", delivery:"2026-06-22", address:"DLF Phase 1, Gurgaon"               },
  { id:"CLO-412", customer:"Priya Singh",     phone:"9723456789", service:"Steam Iron",    items:5,  amount:150,  status:"Ready",            pickup:"2026-06-21", delivery:"2026-06-22", address:"Sector 93, Gurgaon"                 },
  { id:"CLO-413", customer:"Amit Kumar",      phone:"9634567890", service:"Dry Cleaning",  items:2,  amount:280,  status:"Picked Up",        pickup:"2026-06-22", delivery:"2026-06-24", address:"Sushant Lok, Gurgaon"               },
  { id:"CLO-414", customer:"Neha Gupta",      phone:"9545678901", service:"Laundry",       items:6,  amount:480,  status:"Scheduled",        pickup:"2026-06-23", delivery:"2026-06-25", address:"Sector 92, Gurgaon"                 },
  { id:"CLO-415", customer:"Vikram Malhotra", phone:"9456789012", service:"Shoe & Bag Care",items:2, amount:700,  status:"Out for Delivery", pickup:"2026-06-21", delivery:"2026-06-22", address:"Palam Vihar, Gurgaon"               },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
function Logo({ size = 36 }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="20" fill={B.navy}/>
        <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="13" fontWeight="800" fontFamily="Inter,sans-serif">CT</text>
      </svg>
      <div>
        <div style={{ fontWeight:900, color:B.navy, fontSize:"16px", letterSpacing:"-0.3px", lineHeight:1 }}>Clotherapy</div>
        <div style={{ fontSize:"9px", color:B.gray, letterSpacing:"0.3px" }}>Where Fabric Meets Care</div>
      </div>
    </div>
  );
}

function Badge({ status }) {
  const s = STATUS_MAP[status] || {};
  return (
    <span style={{ background:s.bg, color:s.color, border:`1px solid ${s.border}`,
      padding:"3px 10px", borderRadius:"999px", fontSize:"11px", fontWeight:700, whiteSpace:"nowrap" }}>
      {status}
    </span>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{ color:B.navy, fontSize:"11px", fontWeight:700, letterSpacing:"2.5px",
      textTransform:"uppercase", marginBottom:"12px" }}>{children}</div>
  );
}

function StatCard({ icon, value, label, bg, accent }) {
  return (
    <div style={{ background:bg, border:`1px solid ${accent}25`, borderRadius:"14px", padding:"20px 22px" }}>
      <div style={{ fontSize:"22px", marginBottom:"8px" }}>{icon}</div>
      <div style={{ fontSize:"28px", fontWeight:900, color:accent, letterSpacing:"-0.5px" }}>{value}</div>
      <div style={{ fontSize:"12px", color:B.gray, marginTop:"4px" }}>{label}</div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function ClotherapyDemo() {
  const [view,          setView]          = useState("landing");
  const [orders,        setOrders]        = useState(INIT_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [trackId,       setTrackId]       = useState("");
  const [trackedOrder,  setTrackedOrder]  = useState(null);
  const [trackError,    setTrackError]    = useState(false);
  const [portalTab,     setPortalTab]     = useState("place"); // place | track
  const [form,          setForm]          = useState({ name:"", phone:"", address:"", service:"Laundry", date:"", notes:"" });
  const [orderPlaced,   setOrderPlaced]   = useState(null);
  const [formError,     setFormError]     = useState(false);

  const stats = {
    total:    orders.length,
    active:   orders.filter(o => o.status !== "Delivered").length,
    revenue:  orders.reduce((a,o) => a + o.amount, 0),
    ready:    orders.filter(o => o.status === "Ready").length,
  };

  const handleTrack = () => {
    const found = orders.find(o => o.id.toLowerCase() === trackId.trim().toLowerCase());
    setTrackedOrder(found || null);
    setTrackError(!found);
  };

  const handlePlaceOrder = () => {
    if (!form.name || !form.phone || !form.address) { setFormError(true); return; }
    const newId = `CLO-${416 + orders.length - INIT_ORDERS.length}`;
    const newOrder = { id:newId, customer:form.name, phone:form.phone,
      service:form.service, items:"TBD", amount:0, status:"Scheduled",
      pickup: form.date || "2026-06-23", delivery:"2026-06-25", address:form.address };
    setOrders([...orders, newOrder]);
    setOrderPlaced(newId);
    setFormError(false);
  };

  const updateStatus = (id, status) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    if (selectedOrder?.id === id) setSelectedOrder(prev => ({ ...prev, status }));
  };

  const NAV_TABS = [["🏠  Website","landing"],["📦  Customer Portal","customer"],["⚙️  Admin Panel","admin"]];

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", minHeight:"100vh", background:B.bg }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;}
        html{scroll-behavior:smooth;}
        .scard{background:#fff;border-radius:16px;padding:28px;transition:transform .2s,box-shadow .2s;border:1px solid #E5E7EB;}
        .scard:hover{transform:translateY(-4px);box-shadow:0 14px 36px rgba(27,61,123,.1);}
        .inp{width:100%;padding:11px 14px;border:1.5px solid #E5E7EB;border-radius:8px;font-size:14px;outline:none;transition:border-color .2s;font-family:Inter,sans-serif;background:#fff;}
        .inp:focus{border-color:#1B3D7B;}
        .sel{width:100%;padding:11px 14px;border:1.5px solid #E5E7EB;border-radius:8px;font-size:14px;outline:none;background:#fff;font-family:Inter,sans-serif;cursor:pointer;}
        .btnP{background:#1B3D7B;color:#fff;padding:11px 24px;border-radius:8px;font-weight:700;border:none;cursor:pointer;font-size:14px;transition:background .2s;}
        .btnP:hover{background:#132D5C;}
        .btnO{background:transparent;color:#1B3D7B;padding:11px 24px;border-radius:8px;font-weight:700;border:2px solid #1B3D7B;cursor:pointer;font-size:14px;}
        .adminRow{display:grid;align-items:center;padding:14px 24px;border-bottom:1px solid #F3F4F6;cursor:pointer;transition:background .15s;grid-template-columns:90px 1fr 110px 60px 90px 130px;}
        .adminRow:hover{background:#F9FAFB;}
        .navBtn{padding:8px 16px;border-radius:8px;cursor:pointer;font-weight:600;font-size:13px;border:none;transition:all .2s;}
        .ptab{flex:1;padding:10px;border-radius:9px;border:none;cursor:pointer;font-weight:600;font-size:14px;transition:all .2s;font-family:Inter,sans-serif;}
      `}</style>

      {/* ── TOP NAV ─────────────────────────────────────────────────── */}
      <nav style={{ background:"#fff", borderBottom:`1px solid ${B.border}`, padding:"0 28px",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        height:"60px", position:"sticky", top:0, zIndex:200,
        boxShadow:"0 1px 10px rgba(0,0,0,.06)" }}>
        <Logo />
        <div style={{ display:"flex", gap:"6px" }}>
          {NAV_TABS.map(([label, v]) => (
            <button key={v} className="navBtn" onClick={() => { setView(v); setSelectedOrder(null); }}
              style={{ background: view===v ? B.navy : "#F3F4F6", color: view===v ? "#fff" : B.mid }}>
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════════════
          LANDING PAGE
      ══════════════════════════════════════════════════════════════ */}
      {view === "landing" && (
        <div>
          {/* HERO */}
          <div style={{ background:`linear-gradient(145deg,${B.navyDark} 0%,${B.navy} 55%,#2563EB 100%)`,
            color:"#fff", padding:"80px 40px 72px", textAlign:"center" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:"8px",
              background:"rgba(255,255,255,.12)", borderRadius:"999px",
              padding:"6px 18px", fontSize:"13px", marginBottom:"28px", fontWeight:500 }}>
              <span style={{ color:"#4ADE80", fontSize:"10px" }}>●</span>
              Free Pickup & Delivery · Sector 93, Gurgaon
            </div>
            <h1 style={{ fontSize:"clamp(38px,7vw,72px)", fontWeight:900, lineHeight:1.08,
              marginBottom:"20px", letterSpacing:"-1.5px" }}>
              Where Fabric<br />
              <span style={{ color:B.lightBlue }}>Meets Care.</span>
            </h1>
            <p style={{ fontSize:"17px", opacity:.75, maxWidth:"460px",
              margin:"0 auto 40px", lineHeight:1.7 }}>
              Professional laundry, dry cleaning &amp; garment care — delivered to your door in Gurgaon.
            </p>
            <div style={{ display:"flex", gap:"14px", justifyContent:"center", flexWrap:"wrap" }}>
              <button className="btnP" style={{ background:"#fff", color:B.navy, padding:"13px 32px", fontSize:"15px" }}
                onClick={() => setView("customer")}>Schedule Pickup</button>
              <button className="btnO" style={{ borderColor:"rgba(255,255,255,.5)", color:"#fff", padding:"13px 32px", fontSize:"15px" }}
                onClick={() => { setView("customer"); setPortalTab("track"); }}>Track My Order</button>
            </div>
            {/* Stats bar */}
            <div style={{ marginTop:"56px", display:"flex", justifyContent:"center",
              gap:"48px", flexWrap:"wrap" }}>
              {[["500+","Happy Customers"],["4.9 ★","Avg Rating"],["24 hr","Turnaround"],["Free","Pickup & Delivery"]].map(([v,l]) => (
                <div key={l} style={{ textAlign:"center" }}>
                  <div style={{ fontSize:"26px", fontWeight:900 }}>{v}</div>
                  <div style={{ fontSize:"12px", opacity:.6, marginTop:"4px" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* SERVICES */}
          <div style={{ padding:"72px 40px", maxWidth:"1100px", margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:"52px" }}>
              <SectionLabel>Our Services</SectionLabel>
              <h2 style={{ fontSize:"clamp(28px,4vw,40px)", fontWeight:900, color:B.dark, letterSpacing:"-0.5px" }}>
                Everything Your Wardrobe Needs
              </h2>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))", gap:"20px" }}>
              {SERVICES.map(s => (
                <div key={s.name} className="scard">
                  <div style={{ fontSize:"38px", marginBottom:"16px" }}>{s.icon}</div>
                  <h3 style={{ fontSize:"17px", fontWeight:800, color:B.dark, marginBottom:"8px" }}>{s.name}</h3>
                  <p style={{ fontSize:"13px", color:B.gray, lineHeight:1.65, marginBottom:"16px" }}>{s.desc}</p>
                  <div style={{ color:B.navy, fontWeight:800, fontSize:"15px" }}>{s.from}</div>
                </div>
              ))}
            </div>
          </div>

          {/* HOW IT WORKS */}
          <div style={{ background:B.navy, padding:"72px 40px", color:"#fff" }}>
            <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
              <div style={{ textAlign:"center", marginBottom:"52px" }}>
                <SectionLabel><span style={{ opacity:.55 }}>How It Works</span></SectionLabel>
                <h2 style={{ fontSize:"clamp(28px,4vw,40px)", fontWeight:900, letterSpacing:"-0.5px" }}>
                  Fresh Clothes in 4 Simple Steps
                </h2>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"36px" }}>
                {STEPS.map(s => (
                  <div key={s.n} style={{ textAlign:"center" }}>
                    <div style={{ width:"52px", height:"52px", background:"rgba(255,255,255,.12)",
                      borderRadius:"14px", display:"flex", alignItems:"center", justifyContent:"center",
                      margin:"0 auto 16px", fontSize:"18px", fontWeight:900 }}>{s.n}</div>
                    <h3 style={{ fontSize:"16px", fontWeight:700, marginBottom:"8px" }}>{s.title}</h3>
                    <p style={{ fontSize:"13px", opacity:.65, lineHeight:1.6 }}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* PRICING */}
          <div style={{ padding:"72px 40px", maxWidth:"1100px", margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:"52px" }}>
              <SectionLabel>Pricing</SectionLabel>
              <h2 style={{ fontSize:"clamp(28px,4vw,40px)", fontWeight:900, color:B.dark, letterSpacing:"-0.5px" }}>
                Transparent &amp; Affordable
              </h2>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:"20px" }}>
              {PRICING.map(cat => (
                <div key={cat.title} style={{ background:cat.color, border:`1.5px solid ${cat.border}`,
                  borderRadius:"16px", padding:"28px" }}>
                  <h3 style={{ fontSize:"16px", fontWeight:800, color:B.dark, marginBottom:"20px" }}>{cat.title}</h3>
                  {cat.items.map(([item, price]) => (
                    <div key={item} style={{ display:"flex", justifyContent:"space-between",
                      padding:"9px 0", borderBottom:"1px solid rgba(0,0,0,.06)", fontSize:"13px" }}>
                      <span style={{ color:B.mid }}>{item}</span>
                      <span style={{ fontWeight:700, color:cat.accent }}>{price}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* FOOTER CTA */}
          <div style={{ background:"#F9FAFB", borderTop:`1px solid ${B.border}`,
            padding:"56px 40px", textAlign:"center" }}>
            <h2 style={{ fontSize:"28px", fontWeight:900, color:B.dark, marginBottom:"8px" }}>
              Ready for fresh clothes?
            </h2>
            <p style={{ color:B.gray, marginBottom:"32px", fontSize:"15px" }}>
              Schedule your pickup in under 2 minutes.
            </p>
            <button className="btnP" style={{ fontSize:"15px", padding:"13px 36px" }}
              onClick={() => setView("customer")}>Schedule Pickup →</button>
            <div style={{ marginTop:"48px", display:"flex", justifyContent:"center",
              gap:"36px", flexWrap:"wrap", fontSize:"13px", color:B.gray }}>
              <span>📍 Shop No.7, Spaze Privvy, Sector-93, Gurgaon</span>
              <span>🕐 10:00 AM – 8:00 PM</span>
              <span>📞 9910392689 / 9711062236</span>
              <span>✉️ hello.clotherapy@gmail.com</span>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          CUSTOMER PORTAL
      ══════════════════════════════════════════════════════════════ */}
      {view === "customer" && (
        <div style={{ maxWidth:"620px", margin:"0 auto", padding:"44px 24px 80px" }}>
          <div style={{ textAlign:"center", marginBottom:"36px" }}>
            <h1 style={{ fontSize:"26px", fontWeight:900, color:B.dark, marginBottom:"6px" }}>Customer Portal</h1>
            <p style={{ color:B.gray, fontSize:"14px" }}>Schedule a pickup or track your order status</p>
          </div>

          {/* PORTAL TABS */}
          <div style={{ display:"flex", background:"#F3F4F6", borderRadius:"12px", padding:"4px", marginBottom:"28px" }}>
            {[["📦 Place Order","place"],["🔍 Track Order","track"]].map(([label, tab]) => (
              <button key={tab} className="ptab"
                onClick={() => { setPortalTab(tab); setOrderPlaced(null); }}
                style={{ background: portalTab===tab ? "#fff" : "transparent",
                  color: portalTab===tab ? B.dark : B.gray,
                  boxShadow: portalTab===tab ? "0 1px 4px rgba(0,0,0,.08)" : "none" }}>
                {label}
              </button>
            ))}
          </div>

          {/* PLACE ORDER */}
          {portalTab === "place" && !orderPlaced && (
            <div style={{ background:"#fff", borderRadius:"16px", padding:"32px",
              boxShadow:"0 2px 20px rgba(0,0,0,.06)", border:`1px solid ${B.border}` }}>
              <h2 style={{ fontSize:"18px", fontWeight:800, color:B.dark, marginBottom:"24px" }}>
                Schedule a Pickup
              </h2>
              <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
                {formError && (
                  <div style={{ background:"#FEF2F2", border:"1px solid #FECACA",
                    borderRadius:"8px", padding:"10px 14px", fontSize:"13px", color:"#B91C1C" }}>
                    Please fill in Name, Phone, and Address.
                  </div>
                )}
                <div>
                  <label style={{ fontSize:"12px", fontWeight:700, color:B.mid, display:"block", marginBottom:"6px" }}>Full Name *</label>
                  <input className="inp" placeholder="e.g. Rahul Sharma"
                    value={form.name} onChange={e => setForm({...form,name:e.target.value})} />
                </div>
                <div>
                  <label style={{ fontSize:"12px", fontWeight:700, color:B.mid, display:"block", marginBottom:"6px" }}>Phone Number *</label>
                  <input className="inp" placeholder="e.g. 9910392689"
                    value={form.phone} onChange={e => setForm({...form,phone:e.target.value})} />
                </div>
                <div>
                  <label style={{ fontSize:"12px", fontWeight:700, color:B.mid, display:"block", marginBottom:"6px" }}>Pickup Address *</label>
                  <input className="inp" placeholder="e.g. Flat 204, Signature Global, Sector 93"
                    value={form.address} onChange={e => setForm({...form,address:e.target.value})} />
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
                  <div>
                    <label style={{ fontSize:"12px", fontWeight:700, color:B.mid, display:"block", marginBottom:"6px" }}>Service Type</label>
                    <select className="sel" value={form.service} onChange={e => setForm({...form,service:e.target.value})}>
                      <option>Laundry</option>
                      <option>Dry Cleaning</option>
                      <option>Steam Iron</option>
                      <option>Shoe & Bag Care</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize:"12px", fontWeight:700, color:B.mid, display:"block", marginBottom:"6px" }}>Preferred Pickup Date</label>
                    <input className="inp" type="date" value={form.date}
                      onChange={e => setForm({...form,date:e.target.value})} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize:"12px", fontWeight:700, color:B.mid, display:"block", marginBottom:"6px" }}>Special Instructions</label>
                  <input className="inp" placeholder="e.g. Handle silk saree with extra care"
                    value={form.notes} onChange={e => setForm({...form,notes:e.target.value})} />
                </div>
                <button className="btnP" style={{ marginTop:"8px", padding:"13px" }}
                  onClick={handlePlaceOrder}>Confirm Pickup Request →</button>
              </div>
            </div>
          )}

          {/* ORDER CONFIRMED */}
          {portalTab === "place" && orderPlaced && (
            <div style={{ background:"#fff", borderRadius:"16px", padding:"40px 32px",
              boxShadow:"0 2px 20px rgba(0,0,0,.06)", textAlign:"center", border:`1px solid ${B.border}` }}>
              <div style={{ fontSize:"52px", marginBottom:"20px" }}>✅</div>
              <h2 style={{ fontSize:"22px", fontWeight:900, color:B.dark, marginBottom:"10px" }}>Order Confirmed!</h2>
              <p style={{ color:B.gray, marginBottom:"28px", fontSize:"14px", lineHeight:1.6 }}>
                Your pickup has been scheduled. We'll send a WhatsApp confirmation shortly.
              </p>
              <div style={{ background:"#F0F6FF", borderRadius:"12px", padding:"20px", display:"inline-block", marginBottom:"28px" }}>
                <div style={{ fontSize:"12px", color:B.gray, marginBottom:"4px" }}>Your Order ID</div>
                <div style={{ fontSize:"28px", fontWeight:900, color:B.navy, letterSpacing:"2px" }}>{orderPlaced}</div>
              </div>
              <div style={{ display:"flex", gap:"12px", justifyContent:"center" }}>
                <button className="btnP" onClick={() => { setPortalTab("track"); setTrackId(orderPlaced); }}>Track This Order</button>
                <button className="btnO" onClick={() => { setOrderPlaced(null); setForm({name:"",phone:"",address:"",service:"Laundry",date:"",notes:""}); }}>Place Another</button>
              </div>
            </div>
          )}

          {/* TRACK ORDER */}
          {portalTab === "track" && (
            <div style={{ background:"#fff", borderRadius:"16px", padding:"32px",
              boxShadow:"0 2px 20px rgba(0,0,0,.06)", border:`1px solid ${B.border}` }}>
              <h2 style={{ fontSize:"18px", fontWeight:800, color:B.dark, marginBottom:"20px" }}>Track Your Order</h2>
              <div style={{ display:"flex", gap:"10px", marginBottom:"20px" }}>
                <input className="inp" placeholder="Enter Order ID — e.g. CLO-410"
                  value={trackId} onChange={e => { setTrackId(e.target.value); setTrackError(false); }} />
                <button className="btnP" style={{ whiteSpace:"nowrap", padding:"11px 20px" }} onClick={handleTrack}>Track</button>
              </div>
              <div style={{ background:"#F0F6FF", borderRadius:"8px", padding:"10px 14px", fontSize:"12px", color:B.navy, marginBottom:"20px" }}>
                💡 Try: <strong>CLO-410</strong>, <strong>CLO-412</strong>, or <strong>CLO-415</strong>
              </div>
              {trackError && (
                <div style={{ background:"#FEF2F2", borderRadius:"8px", padding:"12px 14px", fontSize:"13px", color:"#B91C1C" }}>
                  Order not found. Please check your Order ID.
                </div>
              )}
              {trackedOrder && (
                <div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"24px" }}>
                    <div>
                      <div style={{ fontSize:"11px", color:B.gray, marginBottom:"2px" }}>Order {trackedOrder.id}</div>
                      <div style={{ fontSize:"20px", fontWeight:800, color:B.dark }}>{trackedOrder.service}</div>
                    </div>
                    <Badge status={trackedOrder.status} />
                  </div>
                  {/* Timeline */}
                  <div style={{ marginBottom:"24px" }}>
                    {ALL_STATUSES.map((status, i) => {
                      const currentIdx = ALL_STATUSES.indexOf(trackedOrder.status);
                      const done = i <= currentIdx;
                      const current = i === currentIdx;
                      return (
                        <div key={status} style={{ display:"flex", gap:"14px", alignItems:"flex-start",
                          paddingBottom: i < ALL_STATUSES.length-1 ? "18px" : "0" }}>
                          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flexShrink:0 }}>
                            <div style={{ width:"20px", height:"20px", borderRadius:"50%",
                              background: done ? B.navy : "#E5E7EB",
                              border: current ? `3px solid ${B.lightBlue}` : "none",
                              display:"flex", alignItems:"center", justifyContent:"center",
                              fontSize:"9px", color:"#fff", fontWeight:900 }}>
                              {done ? "✓" : ""}
                            </div>
                            {i < ALL_STATUSES.length-1 && (
                              <div style={{ width:"2px", height:"22px", marginTop:"2px",
                                background: i < currentIdx ? B.navy : "#E5E7EB" }} />
                            )}
                          </div>
                          <div style={{ paddingTop:"1px" }}>
                            <div style={{ fontSize:"13px", fontWeight: current ? 700 : 500,
                              color: done ? B.dark : "#9CA3AF" }}>{status}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ background:B.bg, borderRadius:"10px", padding:"16px",
                    fontSize:"13px", color:B.gray, display:"flex", flexDirection:"column", gap:"6px" }}>
                    <span>📍 {trackedOrder.address}</span>
                    <span>🗓️ Delivery by {trackedOrder.delivery}</span>
                    {trackedOrder.amount > 0 && <span>💰 Amount: ₹{trackedOrder.amount}</span>}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          ADMIN DASHBOARD
      ══════════════════════════════════════════════════════════════ */}
      {view === "admin" && (
        <div style={{ display:"flex", minHeight:"calc(100vh - 60px)" }}>
          {/* SIDEBAR */}
          <div style={{ width:"210px", background:B.navyDark, color:"#fff",
            padding:"24px 14px", flexShrink:0 }}>
            <div style={{ fontSize:"10px", fontWeight:700, opacity:.4,
              letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:"20px", paddingLeft:"10px" }}>
              Admin Panel
            </div>
            {[["📊","Overview"],["📦","All Orders"],["🚴","Today's Pickups"],["✅","Ready to Deliver"],["💰","Revenue"]].map(([icon, label]) => (
              <button key={label} style={{ display:"flex", alignItems:"center", gap:"10px",
                width:"100%", textAlign:"left", padding:"10px 12px", borderRadius:"8px",
                border:"none", background:"transparent", color:"rgba(255,255,255,.7)",
                cursor:"pointer", fontSize:"13px", fontWeight:500, marginBottom:"2px",
                transition:"background .15s" }}
                onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,.1)"}
                onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                <span>{icon}</span>{label}
              </button>
            ))}
          </div>

          {/* MAIN */}
          <div style={{ flex:1, padding:"32px 36px", overflowY:"auto" }}>
            {/* HEADER */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"32px" }}>
              <div>
                <h1 style={{ fontSize:"22px", fontWeight:900, color:B.dark }}>Dashboard</h1>
                <p style={{ color:B.gray, fontSize:"13px", marginTop:"2px" }}>Monday, 22 June 2026</p>
              </div>
              <div style={{ display:"flex", gap:"8px", fontSize:"12px" }}>
                <span style={{ background:"#F3F4F6", padding:"7px 14px", borderRadius:"8px", color:B.mid, fontWeight:500 }}>📞 9910392689</span>
                <span style={{ background:"#F0FDF4", padding:"7px 14px", borderRadius:"8px", color:"#15803D", fontWeight:600, border:"1px solid #BBF7D0" }}>
                  ● Open Now
                </span>
              </div>
            </div>

            {/* STATS */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:"16px", marginBottom:"32px" }}>
              <StatCard icon="📦" value={stats.total}      label="Total Orders"        bg="#EFF6FF" accent="#1D4ED8" />
              <StatCard icon="⏳" value={stats.active}     label="Active Orders"       bg="#FFF7ED" accent="#C2410C" />
              <StatCard icon="💰" value={`₹${stats.revenue}`} label="Total Revenue"   bg="#F0FDF4" accent="#15803D" />
              <StatCard icon="✅" value={stats.ready}      label="Ready for Delivery"  bg="#F5F3FF" accent="#6D28D9" />
            </div>

            {/* ORDERS TABLE */}
            <div style={{ background:"#fff", borderRadius:"16px",
              boxShadow:"0 1px 10px rgba(0,0,0,.06)", overflow:"hidden",
              border:`1px solid ${B.border}`, marginBottom:"20px" }}>
              <div style={{ padding:"18px 24px", borderBottom:`1px solid ${B.border}`,
                display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <h2 style={{ fontSize:"15px", fontWeight:800, color:B.dark }}>All Orders</h2>
                <span style={{ background:"#F3F4F6", padding:"3px 12px",
                  borderRadius:"999px", fontSize:"12px", color:B.gray }}>{orders.length} orders</span>
              </div>
              {/* Table header */}
              <div style={{ display:"grid", gridTemplateColumns:"90px 1fr 110px 60px 90px 130px",
                padding:"10px 24px", background:"#F9FAFB",
                fontSize:"10px", fontWeight:700, color:"#9CA3AF", letterSpacing:"0.5px", textTransform:"uppercase" }}>
                <span>Order ID</span><span>Customer</span><span>Service</span>
                <span>Items</span><span>Amount</span><span>Status</span>
              </div>
              {orders.map(o => (
                <div key={o.id} className="adminRow"
                  style={{ background: selectedOrder?.id===o.id ? "#F0F6FF" : "transparent" }}
                  onClick={() => setSelectedOrder(selectedOrder?.id===o.id ? null : o)}>
                  <span style={{ fontWeight:800, color:B.navy, fontSize:"13px" }}>{o.id}</span>
                  <div>
                    <div style={{ fontSize:"13px", fontWeight:600, color:B.dark }}>{o.customer}</div>
                    <div style={{ fontSize:"11px", color:"#9CA3AF" }}>{o.address}</div>
                  </div>
                  <span style={{ fontSize:"13px", color:B.mid }}>{o.service}</span>
                  <span style={{ fontSize:"13px", color:B.mid }}>{o.items}</span>
                  <span style={{ fontSize:"13px", fontWeight:700, color:B.dark }}>
                    {o.amount > 0 ? `₹${o.amount}` : "TBD"}
                  </span>
                  <Badge status={o.status} />
                </div>
              ))}
            </div>

            {/* ORDER DETAIL PANEL */}
            {selectedOrder && (
              <div style={{ background:"#fff", borderRadius:"16px", padding:"28px",
                boxShadow:"0 1px 10px rgba(0,0,0,.06)", border:`1px solid ${B.border}` }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"24px" }}>
                  <div>
                    <div style={{ fontSize:"12px", color:B.gray, marginBottom:"2px" }}>Order Details</div>
                    <h2 style={{ fontSize:"18px", fontWeight:900, color:B.dark }}>{selectedOrder.id}</h2>
                  </div>
                  <button onClick={() => setSelectedOrder(null)}
                    style={{ background:"#F3F4F6", border:"none", borderRadius:"8px",
                      padding:"7px 14px", cursor:"pointer", fontSize:"13px", color:B.mid }}>
                    Close ✕
                  </button>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",
                  gap:"20px", marginBottom:"28px" }}>
                  {[["Customer",selectedOrder.customer],["Phone",selectedOrder.phone],
                    ["Service",selectedOrder.service],["Items",selectedOrder.items],
                    ["Amount",selectedOrder.amount > 0 ? `₹${selectedOrder.amount}` : "TBD"],
                    ["Pickup Date",selectedOrder.pickup],["Delivery Date",selectedOrder.delivery],
                    ["Address",selectedOrder.address]].map(([label,val]) => (
                    <div key={label}>
                      <div style={{ fontSize:"10px", fontWeight:700, color:"#9CA3AF",
                        textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:"4px" }}>{label}</div>
                      <div style={{ fontSize:"14px", color:B.dark, fontWeight:500 }}>{val}</div>
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontSize:"12px", fontWeight:700, color:B.mid, marginBottom:"12px", textTransform:"uppercase", letterSpacing:"0.5px" }}>Update Order Status</div>
                  <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
                    {ALL_STATUSES.map(status => {
                      const s = STATUS_MAP[status];
                      const active = selectedOrder.status === status;
                      return (
                        <button key={status} onClick={() => updateStatus(selectedOrder.id, status)}
                          style={{ padding:"7px 14px", borderRadius:"8px", border:`1.5px solid ${s.border}`,
                            cursor:"pointer", fontSize:"12px", fontWeight:700,
                            background: active ? s.bg : "transparent",
                            color: s.color, transition:"all .15s" }}>
                          {status}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}