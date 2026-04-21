import { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate, useParams, Navigate } from "react-router-dom";

// ─── STYLES ──────────────────────────────────────────────────────────────────
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    :root{
      --ink:#2D1F2B;--ink-soft:rgba(45,31,43,0.55);
      --pink:#F5C6D8;--pink-deep:#E8A0BE;--pink-btn:#D47FA8;--pink-btn-h:#BC6690;
      --yellow:#FAE9A0;--yellow-deep:#F5D76E;
      --blue:#B8D8F0;--blue-deep:#90C0E8;
      --white:#FFFFFF;--offwhite:#FDF8FC;--surface:#FEF5FA;
      --border:rgba(212,127,168,0.20);--border-mid:rgba(212,127,168,0.35);
      --shadow-sm:0 2px 12px rgba(212,127,168,0.15);--shadow:0 8px 40px rgba(212,127,168,0.22);
      --green:#2A9D5C;--green-bg:#D4F5E2;--red:#D44;--r:16px;
    }
    body{background:var(--offwhite);font-family:'Plus Jakarta Sans',sans-serif;color:var(--ink);}
    h1,h2,h3{font-family:'Playfair Display',serif;line-height:1.15;}
    h4{font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;}
    ::-webkit-scrollbar{width:5px;}
    ::-webkit-scrollbar-track{background:var(--pink);}
    ::-webkit-scrollbar-thumb{background:var(--pink-deep);border-radius:4px;}
    @keyframes fadeUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
    @keyframes floatOrb{0%,100%{transform:translateY(0) scale(1);}50%{transform:translateY(-14px) scale(1.04);}}
    @keyframes shimPro{0%{background-position:-300% 0;}100%{background-position:300% 0;}}
    @keyframes popIn{0%{opacity:0;transform:scale(0.88);}100%{opacity:1;transform:scale(1);}}
    @keyframes checkDraw{0%{stroke-dashoffset:60;}100%{stroke-dashoffset:0;}}
    @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(42,157,92,0.4);}50%{box-shadow:0 0 0 10px rgba(42,157,92,0);}}
    @keyframes liveDot{0%,100%{opacity:1;}50%{opacity:0.3;}}
    .fadeUp{animation:fadeUp 0.55s cubic-bezier(.22,.68,0,1.2) both;}
    .pop-in{animation:popIn 0.35s cubic-bezier(.22,.68,0,1.2) both;}
    .btn-pink{background:var(--pink-btn);color:#fff;border:none;border-radius:50px;padding:13px 30px;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:700;cursor:pointer;transition:background 0.2s,transform 0.15s,box-shadow 0.2s;box-shadow:0 4px 16px rgba(212,127,168,0.30);}
    .btn-pink:hover{background:var(--pink-btn-h);transform:translateY(-2px);}
    .btn-pink:disabled{opacity:0.5;cursor:not-allowed;transform:none;}
    .btn-yellow{background:var(--yellow-deep);color:var(--ink);border:none;border-radius:50px;padding:13px 30px;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:700;cursor:pointer;transition:background 0.2s,transform 0.15s;}
    .btn-yellow:hover{background:#ECC94B;transform:translateY(-2px);}
    .btn-green{background:var(--green);color:#fff;border:none;border-radius:50px;padding:13px 30px;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:700;cursor:pointer;transition:background 0.2s,transform 0.15s;box-shadow:0 4px 16px rgba(42,157,92,0.28);}
    .btn-green:hover{background:#228A4D;transform:translateY(-2px);}
    .btn-ghost{background:transparent;color:var(--ink);border:1.5px solid var(--border-mid);border-radius:50px;padding:12px 26px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;transition:border-color 0.2s,background 0.2s;}
    .btn-ghost:hover{border-color:var(--pink-deep);background:rgba(245,198,216,0.15);}
    .inp{width:100%;background:var(--white);border:1.5px solid var(--border-mid);border-radius:12px;padding:12px 18px;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;color:var(--ink);outline:none;transition:border-color 0.2s,box-shadow 0.2s;}
    .inp:focus{border-color:var(--pink-btn);box-shadow:0 0 0 3px rgba(212,127,168,0.15);}
    .inp::placeholder{color:rgba(45,31,43,0.35);}
    .inp.err{border-color:var(--red);}
    .card{background:var(--white);border:1px solid var(--border);border-radius:var(--r);box-shadow:var(--shadow-sm);}
    .pill{display:inline-flex;align-items:center;gap:5px;background:var(--pink);border-radius:999px;padding:4px 14px;font-size:11px;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;color:var(--pink-btn-h);}
    .bdg-green{background:#D4F5E2;color:#1A6B3C;border-radius:999px;padding:3px 11px;font-size:11px;font-weight:700;}
    .bdg-yellow{background:#FFF3CD;color:#7D5A00;border-radius:999px;padding:3px 11px;font-size:11px;font-weight:700;}
    .pro-shim{background:linear-gradient(90deg,#F5D76E 0%,#FAE9A0 25%,#F5C6D8 55%,#B8D8F0 80%,#F5D76E 100%);background-size:300% 100%;animation:shimPro 3s linear infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
    .upi-btn{display:flex;flex-direction:column;align-items:center;gap:6px;background:var(--surface);border:1.5px solid var(--border-mid);border-radius:14px;padding:12px 10px;cursor:pointer;transition:border-color 0.2s,background 0.2s,transform 0.15s;font-size:11px;font-weight:700;color:var(--ink-soft);}
    .upi-btn:hover{border-color:var(--pink-btn);background:var(--pink);color:var(--pink-btn-h);transform:translateY(-2px);}
    .upload-zone{border:2px dashed var(--border-mid);border-radius:14px;padding:28px;text-align:center;cursor:pointer;transition:border-color 0.2s,background 0.2s;}
    .upload-zone:hover,.upload-zone.drag{border-color:var(--pink-btn);background:rgba(245,198,216,0.10);}
    .noise-bg::before{content:'';position:fixed;inset:0;pointer-events:none;z-index:9999;opacity:0.4;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");}
  `}</style>
);

// ─── BLOOM SPHERE ─────────────────────────────────────────────────────────────
const BloomSphere = ({ size=36 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{display:"block",flexShrink:0}}>
    <defs>
      <radialGradient id="sg" cx="38%" cy="34%" r="68%">
        <stop offset="0%" stopColor="#FAE9A0"/><stop offset="30%" stopColor="#F5C6D8"/>
        <stop offset="65%" stopColor="#E8A0BE"/><stop offset="100%" stopColor="#B8D8F0"/>
      </radialGradient>
      <radialGradient id="ss" cx="28%" cy="25%" r="42%">
        <stop offset="0%" stopColor="#fff" stopOpacity="0.75"/><stop offset="100%" stopColor="#fff" stopOpacity="0"/>
      </radialGradient>
      <filter id="bb"><feGaussianBlur stdDeviation="6"/></filter>
      <filter id="og"><feGaussianBlur stdDeviation="5"/></filter>
      <clipPath id="sc"><circle cx="50" cy="50" r="46"/></clipPath>
    </defs>
    <circle cx="50" cy="50" r="48" fill="url(#sg)" opacity="0.28" filter="url(#og)"/>
    <circle cx="50" cy="50" r="46" fill="url(#sg)"/>
    <g clipPath="url(#sc)">
      <ellipse cx="33" cy="40" rx="28" ry="22" fill="#FAE9A0" opacity="0.6" filter="url(#bb)"/>
      <ellipse cx="67" cy="60" rx="26" ry="20" fill="#F5C6D8" opacity="0.65" filter="url(#bb)"/>
      <ellipse cx="62" cy="30" rx="20" ry="15" fill="#B8D8F0" opacity="0.5" filter="url(#bb)"/>
      <ellipse cx="40" cy="65" rx="16" ry="12" fill="#F5D76E" opacity="0.45" filter="url(#bb)"/>
    </g>
    <circle cx="50" cy="50" r="46" fill="url(#ss)"/>
    <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5"/>
  </svg>
);

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Icon = ({ n, size=18, color="currentColor" }) => {
  const d = {
    store:  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>,
    pkg:    <><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></>,
    orders: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>,
    cog:    <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
    cart:   <><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></>,
    plus:   <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    out:    <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
    trash:  <><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></>,
    img:    <><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></>,
    rupee:  <><path d="M6 3h12M6 8h12M9.5 21L6 8"/><path d="M6 8c0 4 3.5 6 6 6s6-2 6-6"/></>,
    eye:    <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    zap:    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
    upi:    <><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></>,
    copy:   <><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></>,
    check:  <polyline points="20 6 9 17 4 12"/>,
    bell:   <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>,
    upload: <><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></>,
    x:      <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    info:   <><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
    search: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    wifi:   <><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {d[n]}
    </svg>
  );
};

// ─── SUPABASE ─────────────────────────────────────────────────────────────────
const SUPA_URL = "https://fjpmovyrvuuvgdhwusec.supabase.co";
const SUPA_KEY = "sb_publishable_9LcA-mtVfk7nKRj-02Ie-Q_3YQv7suY";
// ── Backend URL — update this after Railway deploy ───────────────────────────
const BACKEND_URL = "https://bloom-backend-v55a.onrender.com";
const SH = {
  "apikey":        SUPA_KEY,
  "Authorization": `Bearer ${SUPA_KEY}`,
  "Content-Type":  "application/json",
  "Prefer":        "return=representation",
};

const supa = {
  async select(table, q="") {
    try {
      const r = await fetch(`${SUPA_URL}/rest/v1/${table}?${q}`, { headers: SH });
      if (!r.ok) return [];
      return await r.json();
    } catch { return []; }
  },
  async insert(table, data) {
    try {
      const r = await fetch(`${SUPA_URL}/rest/v1/${table}`, {
        method:"POST", headers:SH, body:JSON.stringify(data),
      });
      if (!r.ok) { console.error("Supa insert:", await r.text()); return null; }
      const rows = await r.json();
      return Array.isArray(rows) ? rows[0] : rows;
    } catch(e) { console.error(e); return null; }
  },
  async upsert(table, data) {
    try {
      const r = await fetch(`${SUPA_URL}/rest/v1/${table}`, {
        method:"POST",
        headers:{ ...SH, "Prefer":"resolution=merge-duplicates,return=representation" },
        body:JSON.stringify(data),
      });
      if (!r.ok) { console.error("Supa upsert:", await r.text()); return null; }
      const rows = await r.json();
      return Array.isArray(rows) ? rows[0] : rows;
    } catch(e) { console.error(e); return null; }
  },
  async patch(table, filter, data) {
    try {
      const r = await fetch(`${SUPA_URL}/rest/v1/${table}?${filter}`, {
        method:"PATCH", headers:SH, body:JSON.stringify(data),
      });
      if (!r.ok) { console.error("Supa patch:", await r.text()); return null; }
      return await r.json();
    } catch(e) { console.error(e); return null; }
  },
  async del(table, filter) {
    try {
      const r = await fetch(`${SUPA_URL}/rest/v1/${table}?${filter}`, {
        method:"DELETE", headers:SH,
      });
      return r.ok;
    } catch { return false; }
  },
};

// ─── SUPABASE REALTIME HOOK ───────────────────────────────────────────────────
// Subscribes to INSERT events on bloom_orders for a given store
// Calls onNewOrder(record) when a new order arrives — live, no refresh needed
function useRealtimeOrders(storeId, onNewOrder) {
  const [live, setLive] = useState(false);
  const wsRef  = useRef(null);
  const hbRef  = useRef(null);
  const refNum = useRef(1);

  useEffect(() => {
    if (!storeId || storeId === DEMO_ID) return;

    const connect = () => {
      try {
        const ws = new WebSocket(
          `wss://fjpmovyrvuuvgdhwusec.supabase.co/realtime/v1/websocket?apikey=${SUPA_KEY}&vsn=1.0.0`
        );
        wsRef.current = ws;

        ws.onopen = () => {
          // Join channel with postgres_changes filtered to this store
          ws.send(JSON.stringify({
            topic:    `realtime:public:bloom_orders:store_id=eq.${storeId}`,
            event:    "phx_join",
            payload:  {
              config: {
                broadcast:        { ack:false, self:false },
                presence:         { key:"" },
                postgres_changes: [{
                  event:"INSERT", schema:"public",
                  table:"bloom_orders",
                  filter:`store_id=eq.${storeId}`,
                }],
              },
              access_token: SUPA_KEY,
            },
            ref:      String(refNum.current++),
            join_ref: `bloom-${storeId}`,
          }));

          // Heartbeat every 25 s to keep connection alive
          hbRef.current = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({
                topic:"phoenix", event:"heartbeat",
                payload:{}, ref:String(refNum.current++),
              }));
            }
          }, 25000);

          setLive(true);
        };

        ws.onmessage = (e) => {
          try {
            const msg = JSON.parse(e.data);
            // Supabase Realtime v2 sends postgres_changes event
            if (
              msg.event === "postgres_changes" &&
              msg.payload?.data?.type === "INSERT"
            ) {
              const rec = msg.payload.data.record;
              onNewOrder({
                ...rec,
                date:  rec.order_date,
                items: rec.items || [],
              });
            }
          } catch {}
        };

        ws.onerror = () => setLive(false);
        ws.onclose = () => {
          setLive(false);
          clearInterval(hbRef.current);
        };
      } catch(e) {
        console.warn("Realtime unavailable:", e.message);
      }
    };

    connect();

    return () => {
      clearInterval(hbRef.current);
      wsRef.current?.close();
    };
  }, [storeId]);

  return live;
}

// ─── UPI HELPERS ─────────────────────────────────────────────────────────────
const buildUpiUrl = ({ upiId, name, amount, note }) => {
  const p = new URLSearchParams({ pa:upiId, pn:name, am:amount.toFixed(2), cu:"INR", tn:note||"Bloom Store" });
  return `upi://pay?${p.toString()}`;
};
const buildQrUrl   = (u) => `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(u)}&size=200x200&margin=12&color=2D1F2B&bgcolor=FFFFFF`;
const isValidUpi   = (id) => /^[\w.\-_]{2,256}@[a-zA-Z]{2,64}$/.test(id||"");
const UPI_APPS = [
  { name:"PhonePe", emoji:"🟣", url: u => u.replace("upi://","phonepe://") },
  { name:"GPay",    emoji:"🔵", url: u => u.replace("upi://pay?","tez://upi/pay?") },
  { name:"Paytm",   emoji:"🔷", url: u => u.replace("upi://","paytmmp://") },
  { name:"BHIM",    emoji:"🟠", url: u => u },
  { name:"Any UPI", emoji:"📱", url: u => u },
];

// ─── EMAIL (MailerSend) ───────────────────────────────────────────────────────
async function sendOrderEmail({ mailerKey, toEmail, toName, order, storeName }) {
  if (!mailerKey || !toEmail) return;
  const itemsList = (order.items||[]).map(i=>`• ${i.name} ×${i.qty} — ₹${(i.price*i.qty).toLocaleString()}`).join("\n");
  const text =
`Hi ${toName||"there"}, you have a new confirmed order on Bloom 🌸

Order ID : ${order.id}
Store    : ${storeName}
Date     : ${order.date}

Customer : ${order.customer_name||order.customerName}
Phone    : ${order.customer_phone||order.customerPhone||"—"}

Items:
${itemsList}

Total   : ₹${order.amount.toLocaleString()}
UPI Ref : ${order.upi_ref||order.upiRef||"—"}
Status  : ✅ Auto-Confirmed

— Bloom 🌸`;
  try {
    await fetch("https://api.mailersend.com/v1/email", {
      method:"POST",
      headers:{ "Content-Type":"application/json", "Authorization":`Bearer ${mailerKey}` },
      body:JSON.stringify({
        from:    { email:"noreply@bloom.store", name:"Bloom" },
        to:      [{ email:toEmail, name:toName||storeName }],
        subject: `🌸 New Order ${order.id} — ${storeName}`,
        text,
        html:    text.replace(/\n/g,"<br/>"),
      }),
    });
  } catch(e) { console.warn("Email error:", e); }
}

// ─── UTILS ───────────────────────────────────────────────────────────────────
const simpleHash = (s) => { let h=0; for(let i=0;i<s.length;i++) h=(Math.imul(31,h)+s.charCodeAt(i))|0; return h.toString(36); };
const today = () => new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"});

// ─── DEMO DATA (always available offline) ────────────────────────────────────
const DEMO_ID   = "bloom-demo-001";
const DEMO_USER = {
  id:"bloom-demo-001", name:"Priya Sharma", email:"demo@bloom.store",
  password_hash:simpleHash("demo123"), store_name:"Bloom by Priya",
  store_slug:"bloom-by-priya", upi_id:"priya@okicici",
  store_desc:"Handcrafted botanical goodies made with love in Mumbai.",
  mailersend_key:"", created_at:new Date().toISOString(),
};
const DEMO_PRODUCTS = [
  { id:"dp1", user_id:DEMO_ID, name:"Pressed Flower Journal",     price:799,  stock:18, category:"Stationery", img:"https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&q=80" },
  { id:"dp2", user_id:DEMO_ID, name:"Dried Botanicals Gift Set",  price:1299, stock:6,  category:"Gifting",    img:"https://images.unsplash.com/photo-1487530811015-780e79f8d672?w=500&q=80" },
  { id:"dp3", user_id:DEMO_ID, name:"Hand-poured Soy Candle",     price:549,  stock:24, category:"Home",       img:"https://images.unsplash.com/photo-1603905780500-02fb9f6d9f5c?w=500&q=80" },
  { id:"dp4", user_id:DEMO_ID, name:"Pastel Silk Scrunchie Pack", price:349,  stock:40, category:"Fashion",    img:"https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=500&q=80" },
];
const DEMO_ORDERS = [
  { id:"BL-DEMO1", store_id:DEMO_ID, customer_name:"Meera S.",  customer_phone:"9876500001", items:[{...DEMO_PRODUCTS[0],qty:1}], amount:799,  status:"confirmed", proof:"", upi_ref:"TXN111", order_date:"26 Mar 2026", date:"26 Mar 2026" },
  { id:"BL-DEMO2", store_id:DEMO_ID, customer_name:"Tanvi K.",  customer_phone:"9876500002", items:[{...DEMO_PRODUCTS[1],qty:1}], amount:1299, status:"confirmed", proof:"", upi_ref:"TXN222", order_date:"27 Mar 2026", date:"27 Mar 2026" },
  { id:"BL-DEMO3", store_id:DEMO_ID, customer_name:"Ria M.",    customer_phone:"9876500003", items:[{...DEMO_PRODUCTS[2],qty:2}], amount:1098, status:"confirmed", proof:"", upi_ref:"TXN333", order_date:"28 Mar 2026", date:"28 Mar 2026" },
];

// ─── SESSION STORAGE (localStorage — works on any browser/device) ─────────────
const Session = {
  save:  (s)  => { try { localStorage.setItem("bloom:sess", JSON.stringify(s)); } catch {} },
  load:  ()   => { try { const r = localStorage.getItem("bloom:sess"); return r ? JSON.parse(r) : null; } catch { return null; } },
  clear: ()   => { try { localStorage.removeItem("bloom:sess"); } catch {} },
};

// Customer session stored separately so business + customer logins don't clash
const CustSession = {
  save:  (s)  => { try { localStorage.setItem("bloom:cust", JSON.stringify(s)); } catch {} },
  load:  ()   => { try { const r = localStorage.getItem("bloom:cust"); return r ? JSON.parse(r) : null; } catch { return null; } },
  clear: ()   => { try { localStorage.removeItem("bloom:cust"); } catch {} },
};

// ─── PRO BANNER ──────────────────────────────────────────────────────────────
function ProBanner() {
  return (
    <div style={{background:"linear-gradient(135deg,rgba(245,199,216,0.45) 0%,rgba(184,216,240,0.35) 50%,rgba(250,233,160,0.45) 100%)",border:"1px solid var(--border-mid)",borderRadius:"var(--r)",padding:"18px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:14,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",right:16,top:-20,width:80,height:80,borderRadius:"50%",background:"var(--yellow)",opacity:0.4,filter:"blur(20px)",pointerEvents:"none"}}/>
      <div style={{display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:40,height:40,borderRadius:10,background:"linear-gradient(135deg,var(--yellow-deep),var(--pink-deep))",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <Icon n="zap" size={18} color="#fff"/>
        </div>
        <div>
          <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:2}}>
            <span style={{fontFamily:"Playfair Display",fontSize:16,fontWeight:700}}>Bloom <span className="pro-shim" style={{fontStyle:"italic"}}>Pro</span></span>
            <span style={{background:"linear-gradient(90deg,var(--yellow-deep),var(--pink-deep))",color:"#fff",borderRadius:50,padding:"2px 9px",fontSize:9,fontWeight:800,letterSpacing:"0.08em"}}>COMING SOON</span>
          </div>
          <p style={{fontSize:12,color:"var(--ink-soft)"}}>Auto payment verification · Custom domains · Analytics · Priority support</p>
        </div>
      </div>
      <button style={{background:"linear-gradient(135deg,var(--pink-btn),var(--blue-deep))",color:"#fff",border:"none",borderRadius:50,padding:"9px 20px",fontSize:12,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>
        Join Waitlist →
      </button>
    </div>
  );
}

// ─── CASHFREE CHECKOUT ────────────────────────────────────────────────────────
// Loads Cashfree JS SDK and opens their checkout
async function loadCashfreeSDK() {
  if (window.Cashfree) return window.Cashfree({ mode:"sandbox" });
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    s.onload = () => resolve(window.Cashfree({ mode:"sandbox" }));
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

async function startCashfreePayment({ amount, orderId, customerName, customerEmail, customerPhone, storeName, storeSlug, onSuccess, onFail }) {
  try {
    // 1. Create order on backend
    const res = await fetch(`${BACKEND_URL}/api/create-order`, {
      method:  "POST",
      headers: { "Content-Type":"application/json" },
      body:    JSON.stringify({ amount, orderId, customerName, customerEmail, customerPhone, storeName, storeSlug }),
    });
    const data = await res.json();
    if (!data.paymentSessionId) throw new Error(data.error || "Order creation failed");

    // 2. Open Cashfree checkout
    const cashfree = await loadCashfreeSDK();
    cashfree.checkout({
      paymentSessionId: data.paymentSessionId,
      redirectTarget:   "_modal",           // opens as popup, not full redirect
    }).then(result => {
      if (result.error)      onFail(result.error.message);
      else if (result.paymentDetails) onSuccess(result.paymentDetails);
    });
  } catch(e) {
    console.error("Cashfree error:", e);
    onFail(e.message);
  }
}

// ─── PAYMENT STATUS PAGE ──────────────────────────────────────────────────────
// Customer lands here after Cashfree redirect
function PaymentStatusPage({ allOrders, setAllOrders, users }) {
  const navigate = useNavigate();
  const params   = new URLSearchParams(window.location.search);
  const orderId  = params.get("order_id");
  const storeSlug= params.get("store");
  const [status, setStatus] = useState("checking"); // checking | paid | failed

  useEffect(() => {
    if (!orderId) { setStatus("failed"); return; }
    const check = async () => {
      try {
        const res  = await fetch(`${BACKEND_URL}/api/payment-status/${orderId}`);
        const data = await res.json();
        if (data.status === "PAID") {
          setStatus("paid");
          // Update order in Supabase
          await supa.patch("bloom_orders", `id=eq.${orderId}`, { status:"confirmed" });
        } else {
          setStatus("failed");
        }
      } catch { setStatus("failed"); }
    };
    check();
  }, [orderId]);

  return (
    <div style={{minHeight:"80vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"40px 24px"}}>
      <div className="card pop-in" style={{maxWidth:440,width:"100%",padding:48,textAlign:"center"}}>
        {status==="checking"&&<>
          <div style={{width:64,height:64,border:"4px solid var(--pink-btn)",borderTopColor:"transparent",borderRadius:"50%",animation:"spin 0.8s linear infinite",margin:"0 auto 24px"}}/>
          <h2 style={{fontSize:26}}>Checking payment…</h2>
          <p style={{color:"var(--ink-soft)",marginTop:8}}>Please wait a moment</p>
        </>}

        {status==="paid"&&<>
          <div style={{width:80,height:80,borderRadius:"50%",background:"var(--green-bg)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px",animation:"pulse 1.5s ease infinite"}}>
            <svg width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" strokeDasharray="60" strokeDashoffset="60" style={{animation:"checkDraw 0.5s ease forwards 0.1s"}}/>
            </svg>
          </div>
          <h2 style={{fontSize:30,marginBottom:8}}><em style={{color:"var(--green)"}}>Payment Successful!</em></h2>
          <p style={{color:"var(--ink-soft)",fontSize:14,lineHeight:1.7,marginBottom:24}}>
            Your order has been confirmed. The store will prepare your items shortly. 🌸
          </p>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <button className="btn-green" style={{padding:"13px 24px",borderRadius:12}} onClick={()=>navigate("/customer/orders")}>
              View My Orders
            </button>
            {storeSlug&&<button className="btn-ghost" style={{padding:"12px 24px",borderRadius:12}} onClick={()=>navigate(`/store/${storeSlug}`)}>
              Back to Store
            </button>}
          </div>
        </>}

        {status==="failed"&&<>
          <div style={{fontSize:56,marginBottom:16}}>😔</div>
          <h2 style={{fontSize:28,marginBottom:8}}>Payment Unsuccessful</h2>
          <p style={{color:"var(--ink-soft)",fontSize:14,lineHeight:1.7,marginBottom:24}}>
            Something went wrong or the payment was cancelled. Please try again.
          </p>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {storeSlug&&<button className="btn-pink" style={{padding:"13px 24px",borderRadius:12}} onClick={()=>navigate(`/store/${storeSlug}`)}>
              Try Again
            </button>}
            <button className="btn-ghost" style={{padding:"12px 24px",borderRadius:12}} onClick={()=>navigate("/")}>
              Go Home
            </button>
          </div>
        </>}
      </div>
    </div>
  );
}

// ─── UPI CHECKOUT MODAL ───────────────────────────────────────────────────────
function UpiCheckoutModal({ amount, storeName, upiId, productLabel, onClose, onSuccess, customer }) {
  const [step, setStep]   = useState("pay");
  const [proof, setProof] = useState(null);
  const [name, setName]   = useState(customer?.name||"");
  const [phone, setPhone] = useState(customer?.phone||"");
  const [upiRef, setUpiRef] = useState("");
  const [copied, setCopied] = useState(false);
  const [drag, setDrag]   = useState(false);
  const fileRef = useRef();

  const upiUrl = buildUpiUrl({ upiId, name:storeName, amount, note:productLabel });
  const qrImg  = buildQrUrl(upiUrl);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const r = new FileReader();
    r.onload = e => setProof(e.target.result);
    r.readAsDataURL(file);
  };

  const copyUpi = () => { navigator.clipboard.writeText(upiId); setCopied(true); setTimeout(()=>setCopied(false),2000); };

  const submit = () => {
    if (!name.trim()) { alert("Please enter your name"); return; }
    onSuccess({ customerName:name, customerPhone:phone, proof, upiRef });
    setStep("done");
  };

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(45,31,43,0.65)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:300,backdropFilter:"blur(6px)"}}
      onClick={()=>step!=="done"&&onClose()}>
      <div className="card pop-in" style={{width:"100%",maxWidth:480,margin:16,maxHeight:"90vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>

        {step==="pay"&&<>
          <div style={{background:"linear-gradient(135deg,var(--pink) 0%,var(--yellow) 60%,var(--blue) 100%)",padding:"24px 28px 20px",textAlign:"center"}}>
            <div style={{display:"flex",justifyContent:"center",marginBottom:8}}><BloomSphere size={44}/></div>
            <h3 style={{fontSize:20}}>Pay with UPI</h3>
            <p style={{color:"var(--ink-soft)",fontSize:13,marginTop:3}}>Paying <strong>{storeName}</strong></p>
            <div style={{fontSize:38,fontFamily:"Playfair Display",fontWeight:700,marginTop:6}}>₹{amount.toLocaleString()}</div>
          </div>
          <div style={{padding:"22px 28px 28px"}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <p style={{fontSize:11,fontWeight:700,letterSpacing:"0.07em",color:"var(--ink-soft)",marginBottom:10,textTransform:"uppercase"}}>📱 Scan with any UPI App</p>
              <div style={{display:"inline-block",padding:10,background:"#fff",borderRadius:14,border:"1.5px solid var(--border-mid)"}}>
                <img src={qrImg} alt="QR" width={190} height={190} style={{display:"block",borderRadius:8}}/>
              </div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
              <div style={{flex:1,height:1,background:"var(--border)"}}/>
              <span style={{fontSize:11,color:"var(--ink-soft)",fontWeight:600}}>OR OPEN APP</span>
              <div style={{flex:1,height:1,background:"var(--border)"}}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:7,marginBottom:18}}>
              {UPI_APPS.map(app=>(
                <button key={app.name} className="upi-btn"
                  onClick={()=>{ window.location.href=app.url(upiUrl); setTimeout(()=>setStep("proof"),1500); }}>
                  <span style={{fontSize:20}}>{app.emoji}</span><span>{app.name}</span>
                </button>
              ))}
            </div>
            <div style={{background:"var(--surface)",borderRadius:12,padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18}}>
              <div>
                <p style={{fontSize:10,fontWeight:700,letterSpacing:"0.06em",color:"var(--ink-soft)",marginBottom:2}}>UPI ID</p>
                <p style={{fontSize:14,fontWeight:700,fontFamily:"monospace"}}>{upiId}</p>
              </div>
              <button onClick={copyUpi} style={{background:"var(--pink)",border:"none",borderRadius:9,padding:"7px 13px",cursor:"pointer",display:"flex",alignItems:"center",gap:5,fontSize:12,fontWeight:700,color:"var(--pink-btn-h)"}}>
                <Icon n={copied?"check":"copy"} size={13} color="var(--pink-btn-h)"/>{copied?"Copied!":"Copy"}
              </button>
            </div>
            <button className="btn-green" style={{width:"100%",padding:13,borderRadius:12}} onClick={()=>setStep("proof")}>
              I've Paid — Upload Proof →
            </button>
            <button onClick={onClose} style={{width:"100%",background:"none",border:"none",marginTop:8,cursor:"pointer",fontSize:13,color:"var(--ink-soft)",padding:6}}>Cancel</button>
          </div>
        </>}

        {step==="proof"&&<div style={{padding:"30px 28px 28px"}}>
          <h3 style={{fontSize:22,marginBottom:6}}>Upload Payment Proof</h3>
          <p style={{color:"var(--ink-soft)",fontSize:13,marginBottom:22,lineHeight:1.6}}>
            Screenshot of the success screen in your UPI app. The store will auto-confirm your order.
          </p>
          <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:18}}>
            <div>
              <label style={{fontSize:11,fontWeight:700,letterSpacing:"0.06em",display:"block",marginBottom:5,color:"var(--ink-soft)"}}>YOUR NAME *</label>
              <input className="inp" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)}/>
            </div>
            <div>
              <label style={{fontSize:11,fontWeight:700,letterSpacing:"0.06em",display:"block",marginBottom:5,color:"var(--ink-soft)"}}>PHONE (optional)</label>
              <input className="inp" placeholder="10-digit mobile" value={phone} onChange={e=>setPhone(e.target.value)}/>
            </div>
            <div>
              <label style={{fontSize:11,fontWeight:700,letterSpacing:"0.06em",display:"block",marginBottom:5,color:"var(--ink-soft)"}}>UPI REF ID (optional)</label>
              <input className="inp" placeholder="Transaction ID from your app" value={upiRef} onChange={e=>setUpiRef(e.target.value)}/>
            </div>
          </div>
          <div className={`upload-zone${drag?" drag":""}`}
            onDragOver={e=>{e.preventDefault();setDrag(true);}} onDragLeave={()=>setDrag(false)}
            onDrop={e=>{e.preventDefault();setDrag(false);handleFile(e.dataTransfer.files[0]);}}
            onClick={()=>fileRef.current.click()}>
            <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>handleFile(e.target.files[0])}/>
            {proof ? (
              <div>
                <img src={proof} alt="proof" style={{maxHeight:150,maxWidth:"100%",borderRadius:10,margin:"0 auto",display:"block"}}/>
                <p style={{fontSize:12,color:"var(--green)",fontWeight:700,marginTop:8}}>✓ Uploaded — tap to change</p>
              </div>
            ) : (
              <div>
                <Icon n="upload" size={28} color="var(--pink-deep)"/>
                <p style={{fontSize:13,fontWeight:600,marginTop:8,color:"var(--ink)"}}>Drag & drop or tap to upload</p>
                <p style={{fontSize:12,color:"var(--ink-soft)",marginTop:4}}>Screenshot of your UPI payment success</p>
              </div>
            )}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:9,marginTop:18}}>
            <button className="btn-green" style={{padding:13,borderRadius:12}} onClick={submit}>✓ Confirm Order</button>
            <button className="btn-ghost" style={{padding:12,borderRadius:12}} onClick={()=>setStep("pay")}>← Back</button>
          </div>
        </div>}

        {step==="done"&&<div style={{padding:"44px 36px",textAlign:"center"}}>
          <div style={{width:80,height:80,borderRadius:"50%",background:"var(--green-bg)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px",animation:"pulse 1.5s ease infinite"}}>
            <svg width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" strokeDasharray="60" strokeDashoffset="60" style={{animation:"checkDraw 0.5s ease forwards 0.1s"}}/>
            </svg>
          </div>
          <h3 style={{fontSize:28,marginBottom:8}}><em style={{color:"var(--green)"}}>Order Placed!</em></h3>
          <p style={{color:"var(--ink-soft)",fontSize:14,lineHeight:1.7}}>Your order is confirmed at <strong>{storeName}</strong>. 🌸</p>
          <div style={{marginTop:18,background:"var(--green-bg)",borderRadius:12,padding:14}}>
            <p style={{fontSize:13,color:"var(--green)",fontWeight:700}}>₹{amount.toLocaleString()} · UPI · {upiId}</p>
          </div>
          <button className="btn-pink" style={{marginTop:20,padding:"12px 32px",borderRadius:12}} onClick={onClose}>Done</button>
        </div>}
      </div>
    </div>
  );
}

// ─── NOTIF BELL ───────────────────────────────────────────────────────────────
function NotifBell({ orders, live }) {
  const [open, setOpen] = useState(false);
  const todayStr = today();
  const todayOrders = (orders||[]).filter(o=>(o.date||o.order_date)===todayStr);

  return (
    <div style={{position:"relative"}}>
      <button onClick={()=>setOpen(o=>!o)}
        style={{background:open?"var(--pink)":todayOrders.length?"rgba(245,198,216,0.4)":"transparent",border:"1.5px solid var(--border-mid)",borderRadius:50,width:40,height:40,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",position:"relative"}}>
        <Icon n="bell" size={17} color={todayOrders.length?"var(--pink-btn-h)":"var(--ink-soft)"}/>
        {todayOrders.length>0&&<span style={{position:"absolute",top:-4,right:-4,background:"var(--pink-btn)",color:"#fff",borderRadius:"50%",width:18,height:18,fontSize:10,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center"}}>{todayOrders.length}</span>}
      </button>
      {/* Live indicator dot */}
      {live&&<span style={{position:"absolute",bottom:-2,right:-2,width:8,height:8,borderRadius:"50%",background:"var(--green)",border:"1.5px solid var(--white)",animation:"liveDot 2s ease infinite"}}/>}
      {open&&(
        <div className="card" style={{position:"absolute",right:0,top:52,width:300,zIndex:200,overflow:"hidden"}}>
          <div style={{padding:"14px 18px",borderBottom:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontWeight:700,fontSize:14}}>Today's Orders</span>
            {live&&<span style={{fontSize:11,color:"var(--green)",fontWeight:700,display:"flex",alignItems:"center",gap:4}}><span style={{width:6,height:6,borderRadius:"50%",background:"var(--green)",display:"inline-block"}}/>Live</span>}
          </div>
          <div style={{maxHeight:280,overflowY:"auto"}}>
            {todayOrders.length===0
              ? <div style={{padding:"20px 18px",textAlign:"center",color:"var(--ink-soft)",fontSize:13}}>No orders today yet 🌸</div>
              : todayOrders.map(o=>(
                <div key={o.id} style={{padding:"14px 18px",borderBottom:"1px solid var(--border)",display:"flex",gap:12,alignItems:"flex-start"}}>
                  <div style={{width:36,height:36,borderRadius:10,background:"var(--green-bg)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <Icon n="pkg" size={16} color="var(--green)"/>
                  </div>
                  <div>
                    <p style={{fontSize:13,fontWeight:600}}>Order from {o.customer_name||o.customerName}</p>
                    <p style={{fontSize:12,color:"var(--ink-soft)",marginTop:2}}>₹{o.amount.toLocaleString()} · Auto-confirmed ✓</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      )}
    </div>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav({ page, setPage, session, orders, live, onLogout, cartCount, customer, onCustomerLogout }) {
  const navigate  = useNavigate();
  const isBiz     = session?.role==="business";
  const isCust    = !!customer;
  return (
    <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(255,255,255,0.88)",backdropFilter:"blur(20px)",borderBottom:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 28px",height:64}}>
      <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={()=>navigate(isBiz?"/dashboard":"/")}>
        <BloomSphere size={36}/><span style={{fontFamily:"Playfair Display",fontWeight:700,fontSize:21}}>Bloom</span>
      </div>
      {isBiz&&(
        <div style={{display:"flex",gap:2}}>
          {["dashboard","products","orders","settings"].map(p=>(
            <button key={p} onClick={()=>navigate(`/${p}`)} style={{background:page===p?"var(--pink)":"transparent",border:"none",borderRadius:50,padding:"8px 16px",fontFamily:"Plus Jakarta Sans",fontSize:13,fontWeight:600,color:page===p?"var(--pink-btn-h)":"var(--ink-soft)",cursor:"pointer",transition:"all 0.2s",textTransform:"capitalize"}}>
              {p}
            </button>
          ))}
        </div>
      )}
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        {isBiz&&<NotifBell orders={orders} live={live}/>}
        {isCust&&(
          <>
            <button className="btn-ghost" style={{padding:"8px 14px",display:"flex",alignItems:"center",gap:6}} onClick={()=>navigate("/cart")}>
              <Icon n="cart" size={15}/>Cart
              {cartCount>0&&<span style={{background:"var(--pink-btn)",color:"#fff",borderRadius:"50%",width:17,height:17,fontSize:10,fontWeight:700,display:"inline-flex",alignItems:"center",justifyContent:"center"}}>{cartCount}</span>}
            </button>
            <button className="btn-ghost" style={{padding:"8px 14px",display:"flex",alignItems:"center",gap:6}} onClick={()=>navigate("/customer/orders")}>
              🛍 My Orders
            </button>
            <button className="btn-ghost" style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px"}} onClick={onCustomerLogout}>
              <Icon n="out" size={13}/>Exit
            </button>
          </>
        )}
        {!isBiz&&!isCust&&(
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <button className="btn-ghost" style={{padding:"9px 18px"}} onClick={()=>navigate("/customer/login")}>Customer Login</button>
            <button className="btn-ghost" style={{padding:"9px 18px"}} onClick={()=>navigate("/login")}>Business Login</button>
            <button className="btn-pink" style={{padding:"9px 20px"}} onClick={()=>navigate("/signup")}>Start Free</button>
          </div>
        )}
        {isBiz&&(
          <button className="btn-ghost" style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px"}} onClick={onLogout}>
            <Icon n="out" size={13}/>Exit
          </button>
        )}
      </div>
    </nav>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  const navigate = useNavigate();
  return (
    <footer style={{background:"var(--ink)",color:"rgba(255,255,255,0.75)",padding:"48px 6vw 32px",fontFamily:"Plus Jakarta Sans,sans-serif"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{display:"flex",flexWrap:"wrap",gap:40,justifyContent:"space-between",marginBottom:40}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
              <BloomSphere size={28}/>
              <span style={{fontFamily:"Playfair Display,serif",fontWeight:700,fontSize:20,color:"#fff"}}>Bloom</span>
            </div>
            <p style={{fontSize:13,lineHeight:1.8,maxWidth:260,color:"rgba(255,255,255,0.55)"}}>
              India's simplest platform for small businesses to sell online and get paid instantly via UPI.
            </p>
          </div>
          <div style={{display:"flex",gap:60,flexWrap:"wrap"}}>
            <div>
              <p style={{fontSize:11,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"rgba(255,255,255,0.4)",marginBottom:14}}>Company</p>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                <button onClick={()=>navigate("/about")} style={{background:"none",border:"none",color:"rgba(255,255,255,0.7)",fontSize:13,cursor:"pointer",textAlign:"left",padding:0,transition:"color 0.2s"}} onMouseOver={e=>e.target.style.color="#fff"} onMouseOut={e=>e.target.style.color="rgba(255,255,255,0.7)"}>About</button>
                <button onClick={()=>navigate("/privacy")} style={{background:"none",border:"none",color:"rgba(255,255,255,0.7)",fontSize:13,cursor:"pointer",textAlign:"left",padding:0,transition:"color 0.2s"}} onMouseOver={e=>e.target.style.color="#fff"} onMouseOut={e=>e.target.style.color="rgba(255,255,255,0.7)"}>Privacy Policy</button>
              </div>
            </div>
            <div>
              <p style={{fontSize:11,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"rgba(255,255,255,0.4)",marginBottom:14}}>Contact</p>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                <a href="mailto:cntntisrighthere@gmail.com" style={{color:"rgba(255,255,255,0.7)",fontSize:13,textDecoration:"none"}} onMouseOver={e=>e.target.style.color="#fff"} onMouseOut={e=>e.target.style.color="rgba(255,255,255,0.7)"}>cntntisrighthere@gmail.com</a>
                <a href="tel:+917048945301" style={{color:"rgba(255,255,255,0.7)",fontSize:13,textDecoration:"none"}} onMouseOver={e=>e.target.style.color="#fff"} onMouseOut={e=>e.target.style.color="rgba(255,255,255,0.7)"}>+91 70489 45301</a>
              </div>
            </div>
          </div>
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,0.10)",paddingTop:24,display:"flex",flexWrap:"wrap",gap:12,justifyContent:"space-between",alignItems:"center"}}>
          <p style={{fontSize:12,color:"rgba(255,255,255,0.35)"}}>© {new Date().getFullYear()} Anurag Ranga. All rights reserved.</p>
          <p style={{fontSize:12,color:"rgba(255,255,255,0.35)"}}>Mumbai, India</p>
        </div>
      </div>
    </footer>
  );
}

// ─── PRIVACY POLICY ───────────────────────────────────────────────────────────
function PrivacyPolicy() {
  const navigate = useNavigate();
  const Section = ({title, children}) => (
    <div style={{marginBottom:36}}>
      <h3 style={{fontSize:20,marginBottom:12,color:"var(--ink)"}}>{title}</h3>
      <div style={{fontSize:15,color:"var(--ink-soft)",lineHeight:1.9}}>{children}</div>
    </div>
  );
  return (
    <div style={{minHeight:"100vh",background:"var(--offwhite)"}}>
      <div style={{maxWidth:780,margin:"0 auto",padding:"60px 6vw 80px"}}>
        <button onClick={()=>navigate("/")} style={{background:"none",border:"none",color:"var(--pink-btn)",fontSize:13,fontWeight:600,cursor:"pointer",marginBottom:32,display:"flex",alignItems:"center",gap:6,padding:0}}>← Back to Home</button>
        <span className="pill" style={{marginBottom:20,display:"inline-flex"}}>Legal</span>
        <h1 style={{fontSize:"clamp(32px,5vw,48px)",marginBottom:10}}>Privacy Policy</h1>
        <p style={{fontSize:13,color:"var(--ink-soft)",marginBottom:48}}>Effective date: April 21, 2025 &nbsp;·&nbsp; Last updated: April 21, 2025</p>

        <Section title="1. Who We Are">
          <p>Bloom is an e-commerce platform that helps Indian small businesses set up online stores and accept UPI payments. Bloom is owned and operated by <strong>Anurag Ranga</strong>, based in Mumbai, India.</p>
          <p style={{marginTop:10}}>Contact: <a href="mailto:cntntisrighthere@gmail.com" style={{color:"var(--pink-btn)"}}>cntntisrighthere@gmail.com</a> &nbsp;|&nbsp; +91 70489 45301</p>
        </Section>

        <Section title="2. Information We Collect">
          <p><strong>For Business Accounts:</strong></p>
          <ul style={{marginLeft:20,marginTop:8,display:"flex",flexDirection:"column",gap:6}}>
            <li>Full name, email address, and password (hashed)</li>
            <li>Store name and UPI ID</li>
            <li>Product listings including names, descriptions, and images</li>
          </ul>
          <p style={{marginTop:14}}><strong>For Customer Accounts:</strong></p>
          <ul style={{marginLeft:20,marginTop:8,display:"flex",flexDirection:"column",gap:6}}>
            <li>Name, email address, and password (hashed)</li>
            <li>Order history and purchase details</li>
          </ul>
          <p style={{marginTop:14}}><strong>Automatically Collected:</strong></p>
          <ul style={{marginLeft:20,marginTop:8,display:"flex",flexDirection:"column",gap:6}}>
            <li>Basic usage data (pages visited, actions taken) for improving the platform</li>
          </ul>
        </Section>

        <Section title="3. How We Use Your Information">
          <ul style={{marginLeft:20,display:"flex",flexDirection:"column",gap:8}}>
            <li>To create and manage your account and store</li>
            <li>To process and track orders</li>
            <li>To send transactional email notifications (order updates, confirmations)</li>
            <li>To improve the platform and fix issues</li>
            <li>To comply with legal obligations</li>
          </ul>
        </Section>

        <Section title="4. Payments">
          <p>Bloom facilitates two types of payments:</p>
          <ul style={{marginLeft:20,marginTop:8,display:"flex",flexDirection:"column",gap:8}}>
            <li><strong>UPI Payments:</strong> Customers pay directly to the business owner's UPI ID. Bloom does not handle, store, or process UPI transactions. The payment goes directly from customer to business.</li>
            <li><strong>Card / Wallet Payments:</strong> Processed by <strong>Cashfree Payments</strong>. Bloom does not store any card or banking details. Please refer to <a href="https://www.cashfree.com/privacy-policy/" target="_blank" rel="noreferrer" style={{color:"var(--pink-btn)"}}>Cashfree's Privacy Policy</a> for details on how they handle payment data.</li>
          </ul>
        </Section>

        <Section title="5. Third-Party Services">
          <p>We use the following third-party services to operate Bloom:</p>
          <ul style={{marginLeft:20,marginTop:8,display:"flex",flexDirection:"column",gap:8}}>
            <li><strong>Supabase</strong> — Database and file storage (images)</li>
            <li><strong>Cashfree Payments</strong> — Payment gateway for cards and wallets</li>
            <li><strong>MailerSend</strong> — Transactional email delivery</li>
            <li><strong>Vercel</strong> — Frontend hosting</li>
            <li><strong>Render</strong> — Backend hosting</li>
          </ul>
          <p style={{marginTop:12}}>Each of these services has their own privacy policy and data handling practices.</p>
        </Section>

        <Section title="6. Data Storage & Security">
          <p>Your data is stored securely on Supabase servers. Passwords are never stored in plain text — they are hashed before storage. We take reasonable precautions to protect your data, but no system is 100% secure and we cannot guarantee absolute security.</p>
        </Section>

        <Section title="7. Data Retention">
          <p>We retain your account data as long as your account is active. If you wish to delete your account and associated data, please contact us at <a href="mailto:cntntisrighthere@gmail.com" style={{color:"var(--pink-btn)"}}>cntntisrighthere@gmail.com</a> and we will process your request within 7 business days.</p>
        </Section>

        <Section title="8. Your Rights">
          <p>You have the right to:</p>
          <ul style={{marginLeft:20,marginTop:8,display:"flex",flexDirection:"column",gap:8}}>
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Withdraw consent at any time</li>
          </ul>
          <p style={{marginTop:12}}>To exercise any of these rights, email us at <a href="mailto:cntntisrighthere@gmail.com" style={{color:"var(--pink-btn)"}}>cntntisrighthere@gmail.com</a>.</p>
        </Section>

        <Section title="9. Cookies">
          <p>Bloom uses minimal cookies and local storage solely to keep you logged in and maintain your session. We do not use cookies for advertising or tracking across other websites.</p>
        </Section>

        <Section title="10. Changes to This Policy">
          <p>We may update this Privacy Policy from time to time. When we do, we will update the "Last updated" date at the top. Continued use of Bloom after changes constitutes your acceptance of the updated policy.</p>
        </Section>

        <Section title="11. Contact Us">
          <p>For any privacy-related questions or concerns, please reach out to:</p>
          <div style={{marginTop:12,padding:"20px 24px",background:"var(--white)",borderRadius:14,border:"1px solid var(--border)"}}>
            <p><strong>Anurag Ranga</strong></p>
            <p style={{marginTop:4}}>Mumbai, India</p>
            <p style={{marginTop:4}}>Email: <a href="mailto:cntntisrighthere@gmail.com" style={{color:"var(--pink-btn)"}}>cntntisrighthere@gmail.com</a></p>
            <p style={{marginTop:4}}>Phone: <a href="tel:+917048945301" style={{color:"var(--pink-btn)"}}>+91 70489 45301</a></p>
          </div>
        </Section>
      </div>
      <Footer/>
    </div>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About() {
  const navigate = useNavigate();
  return (
    <div style={{minHeight:"100vh",background:"var(--offwhite)"}}>
      <div style={{maxWidth:780,margin:"0 auto",padding:"60px 6vw 80px"}}>
        <button onClick={()=>navigate("/")} style={{background:"none",border:"none",color:"var(--pink-btn)",fontSize:13,fontWeight:600,cursor:"pointer",marginBottom:32,display:"flex",alignItems:"center",gap:6,padding:0}}>← Back to Home</button>
        <span className="pill" style={{marginBottom:20,display:"inline-flex"}}>Our Story</span>
        <h1 style={{fontSize:"clamp(32px,5vw,52px)",marginBottom:24}}>About <em style={{color:"var(--pink-btn)"}}>Bloom</em></h1>

        <div style={{fontSize:17,color:"var(--ink-soft)",lineHeight:1.9,marginBottom:48}}>
          <p>Hi, I'm <strong style={{color:"var(--ink)"}}>Anurag</strong> 👋</p>
          <p style={{marginTop:16}}>I started Bloom with one goal in mind — to help as many small businesses as possible grow and prosper online. India has millions of talented entrepreneurs, home bakers, artisans, and local shop owners who deserve a simple, powerful way to sell online without jumping through hoops or paying hefty commissions.</p>
          <p style={{marginTop:16}}>Bloom is built for them. No KYC. No commission. No complicated setup. Just a beautiful store link, UPI payments, and customers — in minutes.</p>
          <p style={{marginTop:16}}>We're just getting started. We'll keep adding new features and improving the platform based on what you tell us you need. This is your platform, and we're here to serve you.</p>
        </div>

        <div className="card" style={{padding:"32px 36px",marginBottom:48,background:"linear-gradient(135deg,rgba(245,198,216,0.25) 0%,rgba(184,216,240,0.20) 100%)"}}>
          <h2 style={{fontSize:26,marginBottom:20}}>Our mission</h2>
          <p style={{fontSize:16,color:"var(--ink-soft)",lineHeight:1.9}}>To be India's simplest and most accessible platform for small businesses — empowering every shop owner, every home baker, every local artisan to reach more customers and grow with confidence.</p>
        </div>

        <h2 style={{fontSize:26,marginBottom:24}}>Get in touch</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:16}}>
          {[
            {emoji:"📍",label:"Location",value:"Mumbai, India"},
            {emoji:"📧",label:"Email",value:"cntntisrighthere@gmail.com",href:"mailto:cntntisrighthere@gmail.com"},
            {emoji:"📞",label:"Phone",value:"+91 70489 45301",href:"tel:+917048945301"},
          ].map((item,i)=>(
            <div key={i} className="card" style={{padding:"20px 24px"}}>
              <div style={{fontSize:24,marginBottom:8}}>{item.emoji}</div>
              <p style={{fontSize:11,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"var(--ink-soft)",marginBottom:6}}>{item.label}</p>
              {item.href
                ? <a href={item.href} style={{fontSize:14,color:"var(--pink-btn)",fontWeight:600,textDecoration:"none"}}>{item.value}</a>
                : <p style={{fontSize:14,fontWeight:600}}>{item.value}</p>
              }
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

// ─── LANDING ─────────────────────────────────────────────────────────────────
function Landing({ setPage, goToDemo }) {
  return (
    <div>
      <section style={{minHeight:"90vh",display:"flex",alignItems:"center",padding:"0 6vw",background:"radial-gradient(ellipse 70% 80% at 80% 30%,rgba(245,198,216,0.38) 0%,transparent 55%),radial-gradient(ellipse 60% 60% at 10% 80%,rgba(184,216,240,0.30) 0%,transparent 55%),#fff",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:"5%",top:"10%",animation:"floatOrb 6s ease-in-out infinite",pointerEvents:"none"}}><BloomSphere size={380}/></div>
        <div style={{maxWidth:640,position:"relative",zIndex:1,animation:"fadeUp 0.7s cubic-bezier(.22,.68,0,1.2) both"}}>
          <span className="pill" style={{marginBottom:20,display:"inline-flex"}}>🌸 India's simplest small business platform</span>
          <h1 style={{fontSize:"clamp(44px,6vw,78px)",letterSpacing:"-0.025em",marginBottom:20}}>Let your store<br/><em style={{color:"var(--pink-btn)"}}>blossom.</em></h1>
          <p style={{fontSize:17,color:"var(--ink-soft)",lineHeight:1.8,marginBottom:36,maxWidth:480}}>
            Set up your beautiful store in minutes. Customers pay directly to your UPI ID — GPay, PhonePe, Paytm. Instant. Free. Zero commission.
          </p>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            <button className="btn-pink" style={{fontSize:15,padding:"15px 36px"}} onClick={()=>setPage("signup")}>Open Your Store Free 🌸</button>
            <button className="btn-ghost" onClick={goToDemo}>See a Live Store</button>
          </div>
          <p style={{marginTop:18,fontSize:13,color:"rgba(45,31,43,0.35)"}}>No KYC · No commission · No credit card · Works with any UPI app</p>
        </div>
      </section>
      <section style={{padding:"0 6vw 60px"}}><ProBanner/></section>
      <section style={{padding:"72px 6vw",background:"var(--surface)"}}>
        <div style={{textAlign:"center",marginBottom:48}}>
          <h2 style={{fontSize:"clamp(32px,5vw,48px)"}}>How it <em style={{color:"var(--pink-btn)"}}>works</em></h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:20}}>
          {[
            {step:"01",emoji:"🌸",title:"Create your store",desc:"Sign up, add products, done."},
            {step:"02",emoji:"📱",title:"Add your UPI ID",   desc:"GPay, PhonePe, Paytm — any UPI."},
            {step:"03",emoji:"🛍", title:"Share your link",  desc:"Send customers your store link or QR."},
            {step:"04",emoji:"💸",title:"Get paid instantly",desc:"Money goes direct to your account."},
          ].map((f,i)=>(
            <div key={i} className="card fadeUp" style={{padding:28,animation:`fadeUp 0.5s ease ${i*0.1}s both`}}>
              <div style={{fontSize:11,fontWeight:800,letterSpacing:"0.12em",color:"var(--pink-btn)",marginBottom:10}}>{f.step}</div>
              <div style={{fontSize:32,marginBottom:10}}>{f.emoji}</div>
              <h4 style={{fontSize:16,marginBottom:7}}>{f.title}</h4>
              <p style={{fontSize:13,color:"var(--ink-soft)",lineHeight:1.7}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section style={{background:"linear-gradient(135deg,var(--pink) 0%,var(--blue) 50%,var(--yellow) 100%)",padding:"72px 6vw",textAlign:"center"}}>
        <h2 style={{fontSize:"clamp(32px,5vw,48px)",marginBottom:14}}>Ready to <em>bloom?</em></h2>
        <p style={{fontSize:14,color:"var(--ink-soft)",marginBottom:28}}>Free forever · UPI payments · No commission</p>
        <button className="btn-pink" style={{fontSize:15,padding:"15px 44px"}} onClick={()=>setPage("signup")}>Create My Store</button>
      </section>
      <Footer/>
    </div>
  );
}

// ─── AUTH ─────────────────────────────────────────────────────────────────────
function Auth({ mode, setPage, setSessionAndLoad }) {
  const [form, setForm]   = useState({name:"",email:"",store:"",pass:"",pass2:""});
  const [errs, setErrs]   = useState({});
  const [loading, setLoading] = useState(false);
  const h = e => setForm(f=>({...f,[e.target.name]:e.target.value}));
  const Err = ({k})=>errs[k]?<p style={{fontSize:11,color:"var(--red)",marginTop:4}}>{errs[k]}</p>:null;

  const submit = async () => {
    const e = {};
    if (mode==="signup") {
      if (!form.name.trim())  e.name  = "Name is required";
      if (!form.store.trim()) e.store = "Store name is required";
      if (form.pass!==form.pass2) e.pass2 = "Passwords don't match";
    }
    if (!form.email.includes("@")) e.email = "Enter a valid email";
    if (form.pass.length<6) e.pass = "Password must be 6+ characters";
    if (Object.keys(e).length) { setErrs(e); return; }

    setLoading(true);
    try {
      if (mode==="signup") {
        // Check email not taken
        const existing = await supa.select("bloom_users",`email=eq.${encodeURIComponent(form.email.toLowerCase())}`);
        if (existing.length>0) { setErrs({email:"Email already registered"}); setLoading(false); return; }
        const slug = form.store.toLowerCase().replace(/[^a-z0-9]/g,"-").replace(/-+/g,"-");
        const newUser = {
          id:`u-${Date.now()}`, name:form.name, email:form.email.toLowerCase(),
          password_hash:simpleHash(form.pass), store_name:form.store,
          store_slug:slug, upi_id:"", store_desc:"", mailersend_key:"",
        };
        const saved = await supa.insert("bloom_users", newUser);
        if (!saved) { setErrs({email:"Sign up failed. Please try again."}); setLoading(false); return; }
        await setSessionAndLoad({ userId:saved.id||newUser.id, role:"business" });
      } else {
        // Login
        const rows = await supa.select("bloom_users",`email=eq.${encodeURIComponent(form.email.toLowerCase())}`);
        if (rows.length===0) { setErrs({email:"No account with this email"}); setLoading(false); return; }
        const user = rows[0];
        if (user.password_hash!==simpleHash(form.pass)) { setErrs({pass:"Wrong password"}); setLoading(false); return; }
        await setSessionAndLoad({ userId:user.id, role:"business" });
      }
    } catch(err) {
      setErrs({email:"Something went wrong. Check your connection."}); setLoading(false);
    }
  };

  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"radial-gradient(ellipse 70% 70% at 50% 0%,rgba(245,198,216,0.25) 0%,transparent 60%),var(--offwhite)",padding:"40px 16px"}}>
      <div className="card fadeUp" style={{width:"100%",maxWidth:440,padding:44}}>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{display:"flex",justifyContent:"center",marginBottom:12}}><BloomSphere size={54}/></div>
          <h2 style={{fontSize:28}}>{mode==="login"?"Welcome back":"Start for free"}</h2>
          <p style={{color:"var(--ink-soft)",marginTop:6,fontSize:13}}>{mode==="login"?"Log in to your Bloom dashboard":"No credit card. No KYC. Ever."}</p>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:13}}>
          {mode==="signup"&&<div><input className={`inp${errs.name?" err":""}`} name="name" placeholder="Full name" value={form.name} onChange={h}/><Err k="name"/></div>}
          <div><input className={`inp${errs.email?" err":""}`} name="email" type="email" placeholder="Email address" value={form.email} onChange={h}/><Err k="email"/></div>
          {mode==="signup"&&<div><input className={`inp${errs.store?" err":""}`} name="store" placeholder="Store name (e.g. Bloom by Priya)" value={form.store} onChange={h}/><Err k="store"/></div>}
          <div><input className={`inp${errs.pass?" err":""}`} name="pass" type="password" placeholder="Password (6+ characters)" value={form.pass} onChange={h}/><Err k="pass"/></div>
          {mode==="signup"&&<div><input className={`inp${errs.pass2?" err":""}`} name="pass2" type="password" placeholder="Confirm password" value={form.pass2} onChange={h}/><Err k="pass2"/></div>}
          <button className="btn-pink" style={{marginTop:4,padding:14,fontSize:14,borderRadius:12}} onClick={submit} disabled={loading}>
            {loading?(mode==="login"?"Logging in…":"Creating your store…"):mode==="login"?"Log In":"Create My Store 🌸"}
          </button>
        </div>
        <p style={{textAlign:"center",marginTop:18,fontSize:13,color:"var(--ink-soft)"}}>
          {mode==="login"?"New here? ":"Already have a store? "}
          <span style={{color:"var(--pink-btn)",cursor:"pointer",fontWeight:600}} onClick={()=>{setErrs({});setPage(mode==="login"?"signup":"login");}}>
            {mode==="login"?"Create free store":"Log in"}
          </span>
        </p>
        <div style={{marginTop:20,padding:14,background:"var(--surface)",borderRadius:12,textAlign:"center"}}>
          <p style={{fontSize:10,fontWeight:700,letterSpacing:"0.06em",color:"var(--ink-soft)",marginBottom:8}}>⚡ INSTANT DEMO</p>
          <p style={{fontSize:11,color:"var(--ink-soft)",marginBottom:10}}>demo@bloom.store / demo123</p>
          <div style={{display:"flex",gap:8,justifyContent:"center"}}>
            <button className="btn-ghost" style={{padding:"8px 14px",fontSize:12}}
              onClick={()=>setSessionAndLoad({userId:DEMO_ID,role:"business"})}>Business Demo</button>
            <button className="btn-ghost" style={{padding:"8px 14px",fontSize:12}}
              onClick={()=>setSessionAndLoad({role:"customer"})}>Shop as Customer</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ user, products, orders, live }) {
  const totalRev   = orders.filter(o=>o.status==="confirmed").reduce((s,o)=>s+o.amount,0);
  const todayStr   = today();
  const todayCount = orders.filter(o=>(o.date||o.order_date)===todayStr).length;
  const stats = [
    {label:"Confirmed Revenue",val:`₹${totalRev.toLocaleString()}`,n:"rupee",  bg:"var(--pink)"},
    {label:"Total Orders",     val:orders.length,                  n:"orders", bg:"var(--blue)"},
    {label:"Orders Today",     val:todayCount,                     n:"bell",   bg:"var(--yellow)"},
    {label:"Products Listed",  val:products.length,                n:"pkg",    bg:"var(--pink-deep)"},
  ];
  return (
    <div style={{padding:"36px 28px"}}>
      <div style={{marginBottom:28,display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:10}}>
        <div>
          <span className="pill">Dashboard</span>
          <h2 style={{fontSize:38,marginTop:8}}>Hello, <em style={{color:"var(--pink-btn)"}}>{user?.store_name} 🌸</em></h2>
          <p style={{color:"var(--ink-soft)",marginTop:5,fontSize:13}}>
            Store URL: <strong>bloom-store-ochre.vercel.app/store/{user?.store_slug}</strong>
            <button onClick={()=>{navigator.clipboard.writeText(`https://bloom-store-ochre.vercel.app/store/${user?.store_slug}`);alert("Store link copied! 🌸");}}
              style={{marginLeft:10,background:"var(--pink)",border:"none",borderRadius:6,padding:"3px 10px",fontSize:11,fontWeight:700,color:"var(--pink-btn-h)",cursor:"pointer"}}>
              Copy Link
            </button>
          </p>
        </div>
        {live&&<div style={{display:"flex",alignItems:"center",gap:6,background:"var(--green-bg)",borderRadius:50,padding:"6px 14px"}}>
          <span style={{width:7,height:7,borderRadius:"50%",background:"var(--green)",animation:"liveDot 2s ease infinite",display:"inline-block"}}/>
          <span style={{fontSize:12,fontWeight:700,color:"var(--green)"}}>Live — orders update instantly</span>
        </div>}
      </div>
      <div style={{marginBottom:28}}><ProBanner/></div>
      {!user?.upi_id&&(
        <div style={{background:"#FFF3CD",border:"1px solid var(--yellow-deep)",borderRadius:12,padding:"14px 20px",marginBottom:20,display:"flex",gap:10,alignItems:"center"}}>
          <Icon n="info" size={18} color="#7D5A00"/>
          <p style={{fontSize:13,color:"#7D5A00",fontWeight:600}}>Add your UPI ID in Settings so customers can pay you.</p>
        </div>
      )}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:18,marginBottom:28}}>
        {stats.map((s,i)=>(
          <div key={i} className="card fadeUp" style={{padding:26,animation:`fadeUp 0.4s ease ${i*0.08}s both`}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
              <div style={{width:36,height:36,borderRadius:10,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Icon n={s.n} size={17} color="var(--ink)"/>
              </div>
              {i===2&&s.val>0&&<span className="bdg-green" style={{fontSize:10}}>🌸 Today</span>}
            </div>
            <div style={{fontSize:30,fontFamily:"Playfair Display",fontWeight:700,marginBottom:3}}>{s.val}</div>
            <div style={{fontSize:11,color:"var(--ink-soft)",fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase"}}>{s.label}</div>
          </div>
        ))}
      </div>
      <div className="card" style={{padding:24}}>
        <h3 style={{fontSize:22,marginBottom:20}}>Recent Orders</h3>
        {orders.length===0
          ? <p style={{color:"var(--ink-soft)",fontSize:14,textAlign:"center",padding:"24px 0"}}>No orders yet. Share your store link! 🌸</p>
          : <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead><tr style={{borderBottom:"1px solid var(--border)"}}>
                  {["Order","Customer","Amount","Status","Date"].map(h=><th key={h} style={{textAlign:"left",padding:"8px 10px",fontSize:10,fontWeight:700,color:"var(--ink-soft)",letterSpacing:"0.06em",textTransform:"uppercase"}}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {orders.slice(0,6).map(o=>(
                    <tr key={o.id} style={{borderBottom:"1px solid var(--border)"}}>
                      <td style={{padding:"12px 10px",fontSize:12,fontWeight:700}}>{o.id}</td>
                      <td style={{padding:"12px 10px",fontSize:13}}>{o.customer_name||o.customerName}</td>
                      <td style={{padding:"12px 10px",fontSize:14,fontWeight:700}}>₹{o.amount.toLocaleString()}</td>
                      <td style={{padding:"12px 10px"}}><span className="bdg-green">✓ confirmed</span></td>
                      <td style={{padding:"12px 10px",fontSize:12,color:"var(--ink-soft)"}}>{o.date||o.order_date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        }
      </div>
    </div>
  );
}

// ─── IMAGE UPLOAD TO SUPABASE STORAGE ────────────────────────────────────────
async function uploadImageToSupabase(file, userId) {
  const ext      = file.name.split(".").pop() || "jpg";
  const filename = `${userId}/${Date.now()}.${ext}`;
  const res = await fetch(
    `${SUPA_URL}/storage/v1/object/bloom-images/${filename}`,
    {
      method:  "POST",
      headers: {
        "apikey":        SUPA_KEY,
        "Authorization": `Bearer ${SUPA_KEY}`,
        "Content-Type":  file.type,
        "x-upsert":      "true",
      },
      body: file,
    }
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Upload failed: ${err}`);
  }
  // Return the public URL
  return `${SUPA_URL}/storage/v1/object/public/bloom-images/${filename}`;
}

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────
function Products({ userId, products, setProducts }) {
  const [showAdd,    setShowAdd]    = useState(false);
  const [form,       setForm]       = useState({name:"",price:"",stock:"",cat:""});
  const [imgFile,    setImgFile]    = useState(null);   // raw File object
  const [imgPreview, setImgPreview] = useState(null);   // base64 preview
  const [uploading,  setUploading]  = useState(false);
  const [saving,     setSaving]     = useState(false);
  const [drag,       setDrag]       = useState(false);
  const fileRef = useRef();
  const h = e => setForm(f=>({...f,[e.target.name]:e.target.value}));

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setImgFile(file);
    const r = new FileReader();
    r.onload = e => setImgPreview(e.target.result);
    r.readAsDataURL(file);
  };

  const resetForm = () => {
    setForm({name:"",price:"",stock:"",cat:""});
    setImgFile(null); setImgPreview(null); setShowAdd(false);
  };

  const add = async () => {
    if (!form.name.trim() || !form.price) return;
    setSaving(true);
    let imgUrl = "https://images.unsplash.com/photo-1487530811015-780e79f8d672?w=500&q=80";

    // Upload image to Supabase Storage if a file was selected
    if (imgFile && userId !== DEMO_ID) {
      try {
        setUploading(true);
        imgUrl = await uploadImageToSupabase(imgFile, userId);
        setUploading(false);
      } catch(e) {
        setUploading(false);
        alert("Image upload failed. Check your Supabase storage bucket is set to public.");
        setSaving(false); return;
      }
    } else if (imgPreview && userId === DEMO_ID) {
      // Demo mode — just use the preview as base64
      imgUrl = imgPreview;
    }

    const np = {
      id:`p-${Date.now()}`, user_id:userId,
      name:form.name, price:parseInt(form.price),
      stock:parseInt(form.stock)||10, category:form.cat||"General",
      img:imgUrl,
    };

    const saved = userId!==DEMO_ID ? await supa.insert("bloom_products",np) : np;
    if (saved) {
      setProducts(prev=>[...prev,{...np,...saved}]);
      resetForm();
    }
    setSaving(false);
  };

  const remove = async (id) => {
    if (userId!==DEMO_ID) await supa.del("bloom_products",`id=eq.${id}`);
    setProducts(prev=>prev.filter(p=>p.id!==id));
  };

  return (
    <div style={{padding:"36px 28px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:32}}>
        <div><span className="pill">Inventory</span><h2 style={{fontSize:38,marginTop:8}}>Your <em style={{color:"var(--pink-btn)"}}>Products</em></h2></div>
        <button className="btn-pink" style={{display:"flex",alignItems:"center",gap:7,borderRadius:12}} onClick={()=>setShowAdd(true)}>
          <Icon n="plus" size={15} color="#fff"/> Add Product
        </button>
      </div>

      {showAdd&&(
        <div style={{position:"fixed",inset:0,background:"rgba(45,31,43,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200}}
          onClick={resetForm}>
          <div className="card pop-in" style={{width:"100%",maxWidth:480,padding:36,margin:16,maxHeight:"90vh",overflowY:"auto"}}
            onClick={e=>e.stopPropagation()}>
            <h3 style={{fontSize:26,marginBottom:24}}>Add New Product</h3>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>

              <input className="inp" name="name" placeholder="Product name *" value={form.name} onChange={h}/>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                <input className="inp" name="price" type="number" placeholder="Price (₹) *" value={form.price} onChange={h}/>
                <input className="inp" name="stock" type="number" placeholder="Stock qty" value={form.stock} onChange={h}/>
              </div>
              <input className="inp" name="cat" placeholder="Category (Fashion, Home, Food…)" value={form.cat} onChange={h}/>

              {/* ── Image Upload Zone ── */}
              <div>
                <label style={{fontSize:11,fontWeight:700,letterSpacing:"0.06em",display:"block",marginBottom:8,color:"var(--ink-soft)"}}>
                  PRODUCT PHOTO
                </label>

                {/* Hidden file input — opens gallery on phone, explorer on PC */}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  capture={false}
                  style={{display:"none"}}
                  onChange={e => handleFile(e.target.files[0])}
                />

                {imgPreview ? (
                  /* Preview with change button */
                  <div style={{position:"relative",borderRadius:14,overflow:"hidden",border:"1.5px solid var(--border-mid)"}}>
                    <img src={imgPreview} alt="preview"
                      style={{width:"100%",height:200,objectFit:"cover",display:"block"}}/>
                    <div style={{position:"absolute",inset:0,background:"rgba(45,31,43,0.45)",display:"flex",alignItems:"center",justifyContent:"center",opacity:0,transition:"opacity 0.2s"}}
                      onMouseEnter={e=>e.currentTarget.style.opacity=1}
                      onMouseLeave={e=>e.currentTarget.style.opacity=0}>
                      <button onClick={()=>fileRef.current.click()}
                        style={{background:"#fff",border:"none",borderRadius:50,padding:"10px 22px",fontWeight:700,fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
                        <Icon n="img" size={14}/> Change Photo
                      </button>
                    </div>
                    {/* Mobile — always show change button */}
                    <button onClick={()=>fileRef.current.click()}
                      style={{position:"absolute",bottom:10,right:10,background:"rgba(255,255,255,0.92)",border:"none",borderRadius:50,padding:"8px 16px",fontWeight:700,fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
                      <Icon n="img" size={13}/> Change
                    </button>
                  </div>
                ) : (
                  /* Upload drop zone */
                  <div
                    className={`upload-zone${drag?" drag":""}`}
                    onDragOver={e=>{e.preventDefault();setDrag(true);}}
                    onDragLeave={()=>setDrag(false)}
                    onDrop={e=>{e.preventDefault();setDrag(false);handleFile(e.dataTransfer.files[0]);}}
                    onClick={()=>fileRef.current.click()}
                    style={{padding:32}}>
                    <Icon n="upload" size={32} color="var(--pink-deep)"/>
                    <p style={{fontSize:14,fontWeight:700,marginTop:12,color:"var(--ink)"}}>
                      Tap to choose a photo
                    </p>
                    <p style={{fontSize:12,color:"var(--ink-soft)",marginTop:5}}>
                      📱 Opens your gallery on phone<br/>
                      💻 Opens file explorer on PC
                    </p>
                    <p style={{fontSize:11,color:"var(--mist,#ccc)",marginTop:8}}>
                      JPG, PNG, WEBP · Max 5MB
                    </p>
                  </div>
                )}
              </div>

              {/* Status messages */}
              {uploading&&(
                <div style={{background:"var(--surface)",borderRadius:10,padding:"12px 16px",display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:16,height:16,border:"2px solid var(--pink-btn)",borderTopColor:"transparent",borderRadius:"50%",animation:"spin 0.8s linear infinite",flexShrink:0}}/>
                  <span style={{fontSize:13,color:"var(--ink-soft)"}}>Uploading photo to Supabase…</span>
                </div>
              )}

              <div style={{display:"flex",gap:9,marginTop:4}}>
                <button className="btn-pink" style={{flex:1,padding:13,borderRadius:12}}
                  onClick={add} disabled={saving||uploading}>
                  {uploading?"Uploading…":saving?"Saving…":"Add Product"}
                </button>
                <button className="btn-ghost" style={{flex:1,padding:13,borderRadius:12}} onClick={resetForm}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {products.length===0
        ? <div style={{textAlign:"center",padding:"60px 0",color:"var(--ink-soft)"}}><div style={{fontSize:48,marginBottom:12}}>📦</div><p style={{fontSize:14}}>Add your first product to start selling!</p></div>
        : <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:22}}>
            {products.map((p,i)=>(
              <div key={p.id} className="card fadeUp" style={{overflow:"hidden",animation:`fadeUp 0.4s ease ${i*0.05}s both`}}>
                <div style={{position:"relative"}}>
                  <img src={p.img} alt={p.name} style={{width:"100%",height:200,objectFit:"cover",display:"block"}}/>
                  <span className="pill" style={{position:"absolute",top:10,left:10,background:"rgba(255,255,255,0.92)",color:"var(--pink-btn-h)"}}>{p.category||p.cat}</span>
                  <button onClick={()=>remove(p.id)} style={{position:"absolute",top:10,right:10,background:"rgba(255,255,255,0.9)",border:"none",borderRadius:8,width:30,height:30,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <Icon n="trash" size={13} color="#C05"/>
                  </button>
                </div>
                <div style={{padding:"16px 18px 22px"}}>
                  <h4 style={{fontSize:15,marginBottom:9}}>{p.name}</h4>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontSize:22,fontFamily:"Playfair Display",fontWeight:700,color:"var(--pink-btn)"}}>₹{p.price.toLocaleString()}</span>
                    <span className={p.stock<10?"bdg-yellow":"bdg-green"}>{p.stock} in stock</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
      }
    </div>
  );
}

// ─── ORDERS ───────────────────────────────────────────────────────────────────
function Orders({ orders }) {
  const [viewProof, setViewProof] = useState(null);
  const totalRev = orders.reduce((s,o)=>s+o.amount,0);
  return (
    <div style={{padding:"36px 28px"}}>
      <span className="pill">Fulfilment</span>
      <h2 style={{fontSize:38,marginTop:8,marginBottom:6}}>Order <em style={{color:"var(--pink-btn)"}}>History</em></h2>
      <p style={{color:"var(--ink-soft)",fontSize:13,marginBottom:28}}>
        All orders auto-confirmed · Total earned: <strong style={{color:"var(--green)"}}>₹{totalRev.toLocaleString()}</strong>
      </p>
      {orders.length===0
        ? <div style={{textAlign:"center",padding:"60px 0",color:"var(--ink-soft)"}}><div style={{fontSize:48,marginBottom:12}}>🧾</div><p style={{fontSize:14}}>No orders yet. Share your store link!</p></div>
        : <div style={{display:"flex",flexDirection:"column",gap:14}}>
            {orders.map(o=>(
              <div key={o.id} className="card" style={{padding:22}}>
                <div style={{display:"flex",alignItems:"flex-start",gap:16,flexWrap:"wrap"}}>
                  <div style={{width:44,height:44,borderRadius:12,background:"var(--green-bg)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <Icon n="pkg" size={18} color="var(--green)"/>
                  </div>
                  <div style={{flex:1,minWidth:200}}>
                    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:5,flexWrap:"wrap"}}>
                      <span style={{fontWeight:700,fontSize:14}}>{o.id}</span>
                      <span className="bdg-green">✓ Confirmed</span>
                      {(o.upi_ref||o.upiRef)&&<span style={{fontFamily:"monospace",fontSize:11,color:"var(--ink-soft)",background:"var(--surface)",borderRadius:6,padding:"2px 8px"}}>Ref: {o.upi_ref||o.upiRef}</span>}
                    </div>
                    <p style={{fontSize:14,marginBottom:3}}>
                      {(o.items||[]).map(i=>`${i.name} ×${i.qty}`).join(", ")||o.productLabel||"Order"}
                    </p>
                    <p style={{fontSize:12,color:"var(--ink-soft)"}}>
                      {o.customer_name||o.customerName}{(o.customer_phone||o.customerPhone)&&` · ${o.customer_phone||o.customerPhone}`} · {o.date||o.order_date}
                    </p>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:8}}>
                    <div style={{fontFamily:"Playfair Display",fontSize:22,fontWeight:700,color:"var(--pink-btn)"}}>₹{o.amount.toLocaleString()}</div>
                    {(o.proof)&&<button onClick={()=>setViewProof(o)} style={{background:"var(--blue)",color:"var(--ink)",border:"none",borderRadius:9,padding:"6px 12px",fontSize:12,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
                      <Icon n="eye" size={13}/>View Proof
                    </button>}
                  </div>
                </div>
              </div>
            ))}
          </div>
      }
      {viewProof&&(
        <div style={{position:"fixed",inset:0,background:"rgba(45,31,43,0.7)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:300}} onClick={()=>setViewProof(null)}>
          <div className="card pop-in" style={{width:"100%",maxWidth:480,margin:16,padding:28}} onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
              <h3 style={{fontSize:20}}>Payment Proof — {viewProof.id}</h3>
              <button onClick={()=>setViewProof(null)} style={{background:"none",border:"none",cursor:"pointer"}}><Icon n="x" size={20}/></button>
            </div>
            {viewProof.proof
              ? <img src={viewProof.proof} alt="proof" style={{width:"100%",maxHeight:360,objectFit:"contain",borderRadius:12,border:"1px solid var(--border)"}}/>
              : <p style={{color:"var(--ink-soft)",textAlign:"center",padding:"30px 0"}}>No screenshot uploaded for this order.</p>
            }
            <div style={{marginTop:18,background:"var(--green-bg)",borderRadius:10,padding:"12px 16px",display:"flex",justifyContent:"space-between"}}>
              <span style={{fontSize:13,color:"var(--green)",fontWeight:700}}>✓ Auto-Confirmed</span>
              <span style={{fontSize:13,fontWeight:700}}>₹{viewProof.amount.toLocaleString()}</span>
            </div>
            <button className="btn-ghost" style={{width:"100%",padding:12,borderRadius:12,marginTop:12}} onClick={()=>setViewProof(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SETTINGS ─────────────────────────────────────────────────────────────────
function Settings({ user, onUserUpdated }) {
  const [upi,   setUpi]   = useState(user?.upi_id||"");
  const [sName, setSName] = useState(user?.store_name||"");
  const [sDesc, setSDesc] = useState(user?.store_desc||"");
  const [msKey, setMsKey] = useState(user?.mailersend_key||"");
  const [saving, setSaving] = useState(false);
  const [saved,  setSaved]  = useState(false);

  const save = async () => {
    setSaving(true);
    const slug = sName.toLowerCase().replace(/[^a-z0-9]/g,"-").replace(/-+/g,"-");
    const updated = { ...user, store_name:sName, store_slug:slug, upi_id:upi, store_desc:sDesc, mailersend_key:msKey };
    if (user.id!==DEMO_ID) {
      await supa.upsert("bloom_users", updated);
    }
    onUserUpdated(updated);
    setSaving(false); setSaved(true); setTimeout(()=>setSaved(false),2000);
  };

  return (
    <div style={{padding:"36px 28px",maxWidth:660}}>
      <span className="pill">Configuration</span>
      <h2 style={{fontSize:38,marginTop:8,marginBottom:24}}>Store <em style={{color:"var(--pink-btn)"}}>Settings</em></h2>
      <div style={{marginBottom:24}}><ProBanner/></div>
      <div style={{display:"flex",flexDirection:"column",gap:22}}>

        {/* Store info */}
        <div className="card" style={{padding:28}}>
          <h3 style={{fontSize:20,marginBottom:20}}>Store Information</h3>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            <div>
              <label style={{fontSize:11,fontWeight:700,letterSpacing:"0.06em",display:"block",marginBottom:5,color:"var(--ink-soft)"}}>STORE NAME</label>
              <input className="inp" value={sName} onChange={e=>setSName(e.target.value)}/>
            </div>
            <div>
              <label style={{fontSize:11,fontWeight:700,letterSpacing:"0.06em",display:"block",marginBottom:5,color:"var(--ink-soft)"}}>PUBLIC URL</label>
              <input className="inp" value={`bloom.store/${sName.toLowerCase().replace(/[^a-z0-9]/g,"-").replace(/-+/g,"-")}`} readOnly style={{opacity:0.5,fontFamily:"monospace",fontSize:13}}/>
            </div>
            <div>
              <label style={{fontSize:11,fontWeight:700,letterSpacing:"0.06em",display:"block",marginBottom:5,color:"var(--ink-soft)"}}>STORE DESCRIPTION</label>
              <textarea className="inp" value={sDesc} onChange={e=>setSDesc(e.target.value)} style={{height:72,resize:"vertical"}} placeholder="Tell customers what you sell…"/>
            </div>
          </div>
        </div>

        {/* UPI */}
        <div className="card" style={{padding:28}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
            <div style={{width:38,height:38,borderRadius:10,background:"var(--yellow)",display:"flex",alignItems:"center",justifyContent:"center"}}><Icon n="upi" size={18} color="var(--ink)"/></div>
            <h3 style={{fontSize:20}}>UPI Payments</h3>
          </div>
          <p style={{fontSize:13,color:"var(--ink-soft)",marginBottom:18,lineHeight:1.7}}>Customers pay directly to this UPI ID. No middleman, no fees.</p>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            <div>
              <label style={{fontSize:11,fontWeight:700,letterSpacing:"0.06em",display:"block",marginBottom:5,color:"var(--ink-soft)"}}>YOUR UPI ID</label>
              <div style={{position:"relative"}}>
                <input className="inp" value={upi} onChange={e=>setUpi(e.target.value)} placeholder="yourname@gpay  ·  9876543210@paytm" style={{paddingRight:44}}/>
                {upi&&<div style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",fontSize:16}}>{isValidUpi(upi)?"✅":"❌"}</div>}
              </div>
            </div>
            {upi&&isValidUpi(upi)&&(
              <div style={{border:"1.5px solid var(--border-mid)",borderRadius:12,padding:14,display:"flex",gap:14,alignItems:"center"}}>
                <img src={buildQrUrl(buildUpiUrl({upiId:upi,name:sName,amount:0,note:"Bloom Store"}))} alt="QR" width={80} height={80} style={{borderRadius:8,border:"1px solid var(--border)",flexShrink:0}}/>
                <div>
                  <p style={{fontSize:13,fontWeight:700,marginBottom:3}}>Your store QR code</p>
                  <p style={{fontSize:12,color:"var(--ink-soft)",fontFamily:"monospace"}}>{upi}</p>
                  <p style={{fontSize:11,color:"var(--ink-soft)",marginTop:3}}>Customers scan this to pay you directly</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="card" style={{padding:28}}>
          <h3 style={{fontSize:20,marginBottom:8}}>📧 Email Notifications</h3>
          <p style={{fontSize:13,color:"var(--ink-soft)",marginBottom:16,lineHeight:1.7}}>
            Get emailed instantly when a new order arrives. Uses <strong>MailerSend</strong> — paste your API key below.
          </p>
          <div>
            <label style={{fontSize:11,fontWeight:700,letterSpacing:"0.06em",display:"block",marginBottom:5,color:"var(--ink-soft)"}}>MAILERSEND API KEY</label>
            <input className="inp" type="password" value={msKey} onChange={e=>setMsKey(e.target.value)} placeholder="mlsn.xxxxxxxxxxxxxxxx"/>
            <p style={{fontSize:11,color:"var(--ink-soft)",marginTop:5}}>Get your key at mailersend.com → API Tokens. Emails send to your registered store email.</p>
          </div>
        </div>

        <button className="btn-pink" style={{padding:14,fontSize:14,borderRadius:12}} onClick={save} disabled={saving}>
          {saving?"Saving…":saved?"✓ Saved!":"Save All Settings"}
        </button>
      </div>
    </div>
  );
}

// ─── STORE DIRECTORY ──────────────────────────────────────────────────────────
function StoreDirectory({ users, allProducts, setCurrentStore, setPage, setSession }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const filtered = users.filter(u=>u.store_name?.toLowerCase().includes(search.toLowerCase()));
  return (
    <div style={{padding:"48px 6vw"}}>
      <div style={{textAlign:"center",marginBottom:40}}>
        <h2 style={{fontSize:"clamp(32px,5vw,52px)"}}>Browse <em style={{color:"var(--pink-btn)"}}>Stores</em></h2>
        <p style={{color:"var(--ink-soft)",marginTop:10,fontSize:15}}>Discover beautiful handcrafted stores on Bloom</p>
        <div style={{maxWidth:400,margin:"20px auto 0",position:"relative"}}>
          <input className="inp" placeholder="Search stores…" value={search} onChange={e=>setSearch(e.target.value)} style={{paddingLeft:44}}/>
          <div style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)"}}><Icon n="search" size={16} color="var(--ink-soft)"/></div>
        </div>
      </div>
      {filtered.length===0
        ? <p style={{textAlign:"center",color:"var(--ink-soft)"}}>No stores found.</p>
        : <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:24}}>
            {filtered.map((u,i)=>{
              const prods = allProducts[u.id]||[];
              const slug  = u.store_slug || u.storeSlug;
              return (
                <div key={u.id} className="card fadeUp" style={{overflow:"hidden",cursor:"pointer",transition:"transform 0.2s,box-shadow 0.2s",animation:`fadeUp 0.4s ease ${i*0.07}s both`}}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="var(--shadow)";}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="var(--shadow-sm)";}}
                  onClick={()=> navigate(`/store/${slug}`)}>
                  <div style={{background:"linear-gradient(135deg,var(--pink),var(--yellow))",padding:"28px 24px 22px",position:"relative"}}>
                    <BloomSphere size={56}/>
                    {u.upi_id&&<span className="bdg-green" style={{position:"absolute",top:14,right:14}}>UPI Ready</span>}
                  </div>
                  <div style={{padding:"18px 22px 24px"}}>
                    <h4 style={{fontSize:18,marginBottom:6}}>{u.store_name}</h4>
                    <p style={{fontSize:13,color:"var(--ink-soft)",marginBottom:14,lineHeight:1.6,height:38,overflow:"hidden"}}>{u.store_desc||"Handcrafted with love."}</p>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <span style={{fontSize:12,color:"var(--ink-soft)"}}>{prods.length} product{prods.length!==1?"s":""}</span>
                      <span style={{color:"var(--pink-btn)",fontSize:13,fontWeight:700}}>Visit Store →</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
      }
    </div>
  );
}

// ─── STOREFRONT PAGE — reads /store/:slug from URL ───────────────────────────
// This is what customers land on when they visit a store link directly
function StorefrontPage({ users, allProducts, allOrders, setAllOrders, cart, setCart }) {
  const { slug }  = useParams();
  const navigate  = useNavigate();
  const [storeUser,   setStoreUser]   = useState(null);
  const [products,    setProducts]    = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [notFound,    setNotFound]    = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      // First check in-memory users (covers demo store)
      let user = users.find(u => u.store_slug === slug || u.storeSlug === slug);
      let prods = user ? (allProducts[user.id] || []) : [];

      // If not found in memory, fetch from Supabase
      if (!user) {
        const rows = await supa.select("bloom_users", `store_slug=eq.${slug}`);
        if (rows.length === 0) { setNotFound(true); setLoading(false); return; }
        user  = rows[0];
        prods = await supa.select("bloom_products", `user_id=eq.${user.id}&order=created_at.asc`);
      }

      setStoreUser(user);
      setProducts(prods);
      setLoading(false);
    };
    load();
  }, [slug]);

  const handleOrderPlaced = async (storeId, order) => {
    setAllOrders(prev => ({ ...prev, [storeId]: [order, ...(prev[storeId]||[])] }));
  };

  if (loading) return (
    <div style={{minHeight:"80vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16}}>
      <BloomSphere size={56}/>
      <p style={{fontFamily:"Playfair Display",fontSize:18,color:"var(--pink-btn)"}}>Loading store…</p>
    </div>
  );

  if (notFound) return (
    <div style={{minHeight:"80vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,textAlign:"center",padding:"0 24px"}}>
      <div style={{fontSize:56}}>🌸</div>
      <h2 style={{fontSize:32}}>Store not found</h2>
      <p style={{color:"var(--ink-soft)",fontSize:15}}>The store <strong>{slug}</strong> doesn't exist yet.</p>
      <button className="btn-pink" style={{marginTop:8,borderRadius:12,padding:"12px 28px"}} onClick={()=>navigate("/")}>
        Back to Bloom
      </button>
    </div>
  );

  return (
    <Storefront
      storeUser={storeUser}
      products={products}
      onOrderPlaced={handleOrderPlaced}
      cart={cart}
      setCart={setCart}
      setPage={()=>{}}
    />
  );
}

// ─── STOREFRONT ───────────────────────────────────────────────────────────────
function Storefront({ storeUser, products, onOrderPlaced, cart, setCart, setPage, customer }) {
  const navigate = useNavigate();
  const [sel,    setSel]    = useState(null);  // selected product for detail modal
  const [qty,    setQty]    = useState(1);
  const [qrPay,  setQrPay]  = useState(null);  // { product, qty, amount } for QR modal
  const [qrDone, setQrDone] = useState(false); // success screen

  const addCart = (p) => {
    setCart(c=>{ const e=c.find(x=>x.id===p.id); return e?c.map(x=>x.id===p.id?{...x,qty:x.qty+qty}:x):[...c,{...p,qty}]; });
    setSel(null);
  };

  // ── Open UPI QR modal ─────────────────────────────────────────────────────
  const openQR = (p, q=1) => {
    if (!storeUser?.upi_id) { alert("This store hasn't set up UPI payments yet."); return; }
    setQrPay({ product:p, qty:q, amount:p.price*q });
    setSel(null);
  };

  // ── After customer confirms they've paid ──────────────────────────────────
  const confirmQrPaid = async () => {
    const orderId = `BL-${Date.now().toString(36).toUpperCase()}`;
    const newOrder = {
      id:orderId, store_id:storeUser.id,
      customer_name:customer?.name||"Customer",
      customer_phone:customer?.phone||"",
      customer_id:customer?.id||null,
      items:[{...qrPay.product, qty:qrPay.qty}],
      amount:qrPay.amount,
      status:"confirmed", proof:"",
      upi_ref:"", order_date:today(),
    };
    if (storeUser.id!==DEMO_ID) await supa.insert("bloom_orders", newOrder);
    onOrderPlaced(storeUser.id, {...newOrder, date:today()});
    if (storeUser.mailersend_key&&storeUser.email) {
      await sendOrderEmail({ mailerKey:storeUser.mailersend_key, toEmail:storeUser.email, toName:storeUser.name, order:{...newOrder,date:today()}, storeName:storeUser.store_name });
    }
    setQrDone(true);
    setTimeout(() => { setQrPay(null); setQrDone(false); }, 3500);
  };

  // ── Cashfree for card/wallet ───────────────────────────────────────────────
  const payWithCard = async (p, q=1) => {
    const orderId = `BL-${Date.now().toString(36).toUpperCase()}`;
    await startCashfreePayment({
      amount:p.price*q, orderId,
      customerName:customer?.name||"Customer",
      customerEmail:customer?.email||"customer@bloom.store",
      customerPhone:customer?.phone||"9999999999",
      storeName:storeUser.store_name, storeSlug:storeUser.store_slug,
      onSuccess: async (pd) => {
        const newOrder = {
          id:orderId, store_id:storeUser.id,
          customer_name:customer?.name||"Customer",
          customer_phone:customer?.phone||"",
          customer_id:customer?.id||null,
          items:[{...p,qty:q}], amount:p.price*q,
          status:"confirmed", proof:"",
          upi_ref:String(pd?.paymentAmount||""), order_date:today(),
        };
        if (storeUser.id!==DEMO_ID) await supa.insert("bloom_orders", newOrder);
        onOrderPlaced(storeUser.id, {...newOrder, date:today()});
        if (storeUser.mailersend_key&&storeUser.email) {
          await sendOrderEmail({ mailerKey:storeUser.mailersend_key, toEmail:storeUser.email, toName:storeUser.name, order:{...newOrder,date:today()}, storeName:storeUser.store_name });
        }
        setSel(null);
      },
      onFail:(msg)=>alert(`Payment failed: ${msg}`),
    });
  };

  if (!storeUser) return <div style={{padding:60,textAlign:"center",color:"var(--ink-soft)"}}>Store not found.</div>;

  // Build UPI url + QR for current qrPay
  const upiUrl = qrPay && storeUser.upi_id
    ? buildUpiUrl({ upiId:storeUser.upi_id, name:storeUser.store_name, amount:qrPay.amount, note:qrPay.product.name })
    : null;
  const qrImgUrl = upiUrl ? buildQrUrl(upiUrl) : null;

  return (
    <div style={{minHeight:"100vh"}}>
      {/* Store hero */}
      <div style={{background:"linear-gradient(135deg,var(--pink) 0%,var(--yellow) 50%,var(--blue) 100%)",padding:"56px 6vw",display:"flex",alignItems:"center",gap:32,flexWrap:"wrap",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:30,top:-30,width:160,height:160,borderRadius:"50%",background:"rgba(255,255,255,0.25)",filter:"blur(35px)",pointerEvents:"none"}}/>
        <BloomSphere size={84}/>
        <div>
          <h1 style={{fontSize:"clamp(32px,6vw,58px)"}}>{storeUser.store_name}</h1>
          <p style={{color:"var(--ink-soft)",fontSize:14,marginTop:6}}>{storeUser.store_desc||"Handpicked with love · Ships across India"}</p>
          <div style={{display:"flex",gap:10,marginTop:12,flexWrap:"wrap"}}>
            <span className="bdg-green">✓ Verified Seller</span>
            {storeUser.upi_id&&<span style={{background:"#D4F5E2",color:"#1A6B3C",borderRadius:999,padding:"3px 11px",fontSize:11,fontWeight:700}}>📱 UPI Payments</span>}
          </div>
        </div>
      </div>

      {!storeUser.upi_id&&<div style={{margin:"20px 6vw 0",background:"#FFF3CD",border:"1px solid var(--yellow-deep)",borderRadius:12,padding:"12px 18px",fontSize:13,color:"#7D5A00",fontWeight:600}}>⚠️ Store is not accepting payments yet.</div>}

      {/* Products grid */}
      <div style={{padding:"44px 6vw"}}>
        <h2 style={{fontSize:38,marginBottom:28}}>Shop the <em style={{color:"var(--pink-btn)"}}>Collection</em></h2>
        {products.length===0
          ? <p style={{color:"var(--ink-soft)",textAlign:"center",padding:"40px 0"}}>No products listed yet.</p>
          : <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:26}}>
              {products.map((p,i)=>(
                <div key={p.id} className="card fadeUp"
                  style={{overflow:"hidden",cursor:"pointer",transition:"transform 0.22s,box-shadow 0.22s",animation:`fadeUp 0.4s ease ${i*0.07}s both`}}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow="var(--shadow)";}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="var(--shadow-sm)";}}
                  onClick={()=>{setSel(p);setQty(1);}}>
                  <div style={{position:"relative"}}>
                    <img src={p.img} alt={p.name} style={{width:"100%",height:240,objectFit:"cover",display:"block"}}/>
                    <span className="pill" style={{position:"absolute",bottom:10,left:10,background:"rgba(255,255,255,0.92)",color:"var(--pink-btn-h)"}}>{p.category||p.cat}</span>
                  </div>
                  <div style={{padding:"18px 22px 24px"}}>
                    <h4 style={{fontSize:16,marginBottom:11}}>{p.name}</h4>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <span style={{fontSize:24,fontFamily:"Playfair Display",fontWeight:700,color:"var(--pink-btn)"}}>₹{p.price.toLocaleString()}</span>
                      <div style={{display:"flex",gap:8}} onClick={e=>e.stopPropagation()}>
                        <button className="btn-pink" style={{padding:"9px 14px",fontSize:12,borderRadius:10}} onClick={()=>addCart(p)}>+ Cart</button>
                        <button className="btn-green" style={{padding:"9px 14px",fontSize:12,borderRadius:10}} onClick={()=>openQR(p,1)}>📱 Pay</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        }
      </div>

      {/* ── Product Detail Modal ── */}
      {sel&&(
        <div style={{position:"fixed",inset:0,background:"rgba(45,31,43,0.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200}} onClick={()=>setSel(null)}>
          <div className="card pop-in" style={{width:"100%",maxWidth:700,margin:16,overflow:"hidden",maxHeight:"92vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>
              <img src={sel.img} alt={sel.name} style={{width:"100%",minHeight:300,objectFit:"cover",display:"block"}}/>
              <div style={{padding:32,display:"flex",flexDirection:"column",gap:18}}>
                <div>
                  <span className="pill">{sel.category||sel.cat}</span>
                  <h2 style={{fontSize:24,marginTop:10}}>{sel.name}</h2>
                  <div style={{fontSize:34,fontFamily:"Playfair Display",fontWeight:700,color:"var(--pink-btn)",marginTop:8}}>₹{sel.price.toLocaleString()}</div>
                </div>
                <p style={{fontSize:13,color:"var(--ink-soft)",lineHeight:1.75}}>Handcrafted with care. Ships in 3–5 business days across India.</p>
                <div>
                  <label style={{fontSize:10,fontWeight:700,letterSpacing:"0.06em",display:"block",marginBottom:7,color:"var(--ink-soft)"}}>QUANTITY</label>
                  <div style={{display:"flex",alignItems:"center",gap:14}}>
                    <button onClick={()=>setQty(q=>Math.max(1,q-1))} style={{background:"var(--pink)",border:"none",width:34,height:34,borderRadius:9,fontSize:18,cursor:"pointer",color:"var(--pink-btn-h)"}}>−</button>
                    <span style={{fontWeight:700,fontSize:17}}>{qty}</span>
                    <button onClick={()=>setQty(q=>q+1)} style={{background:"var(--pink)",border:"none",width:34,height:34,borderRadius:9,fontSize:18,cursor:"pointer",color:"var(--pink-btn-h)"}}>+</button>
                  </div>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:9}}>
                  <button className="btn-pink" style={{padding:13,borderRadius:12}} onClick={()=>addCart(sel)}>
                    🛍 Add to Cart · ₹{(sel.price*qty).toLocaleString()}
                  </button>
                  {/* QR / UPI pay */}
                  {storeUser.upi_id&&(
                    <button className="btn-green" style={{padding:13,borderRadius:12}} onClick={()=>openQR(sel,qty)}>
                      📱 Pay with UPI · ₹{(sel.price*qty).toLocaleString()}
                    </button>
                  )}
                  {/* Card / wallet via Cashfree */}
                  <button className="btn-yellow" style={{padding:13,borderRadius:12,fontSize:13}} onClick={()=>payWithCard(sel,qty)}>
                    💳 Pay with Card / Wallet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── UPI QR Modal ── */}
      {qrPay&&upiUrl&&(
        <div style={{position:"fixed",inset:0,background:"rgba(45,31,43,0.65)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:300,backdropFilter:"blur(6px)"}}
          onClick={()=>{if(!qrDone){setQrPay(null);}}}>
          <div className="card pop-in" style={{width:"100%",maxWidth:420,margin:16,overflow:"hidden"}} onClick={e=>e.stopPropagation()}>

            {!qrDone ? (
              <>
                {/* Header */}
                <div style={{background:"linear-gradient(135deg,var(--pink) 0%,var(--yellow) 60%,var(--blue) 100%)",padding:"24px 28px 20px",textAlign:"center"}}>
                  <div style={{display:"flex",justifyContent:"center",marginBottom:8}}><BloomSphere size={44}/></div>
                  <p style={{fontSize:13,color:"var(--ink-soft)"}}>Pay <strong>{storeUser.store_name}</strong></p>
                  <div style={{fontSize:38,fontFamily:"Playfair Display",fontWeight:700}}>₹{qrPay.amount.toLocaleString()}</div>
                  <p style={{fontSize:12,color:"var(--ink-soft)",marginTop:4}}>{qrPay.product.name} × {qrPay.qty}</p>
                </div>

                <div style={{padding:"24px 28px 28px",textAlign:"center"}}>
                  {/* Big scannable QR */}
                  <p style={{fontSize:11,fontWeight:700,letterSpacing:"0.07em",color:"var(--ink-soft)",marginBottom:12,textTransform:"uppercase"}}>
                    📱 Scan with GPay · PhonePe · Paytm · Any UPI
                  </p>
                  <div style={{display:"inline-block",padding:14,background:"#fff",borderRadius:18,border:"2px solid var(--border-mid)",boxShadow:"var(--shadow)"}}>
                    <img src={qrImgUrl} alt="UPI QR" width={220} height={220} style={{display:"block",borderRadius:8}}/>
                  </div>

                  {/* UPI deep link buttons */}
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,margin:"20px 0"}}>
                    {UPI_APPS.slice(0,3).map(app=>(
                      <a key={app.name} href={app.url(upiUrl)}
                        style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5,background:"var(--surface)",border:"1.5px solid var(--border-mid)",borderRadius:12,padding:"12px 8px",textDecoration:"none",color:"var(--ink-soft)",fontSize:11,fontWeight:700,transition:"all 0.2s"}}
                        onMouseEnter={e=>{e.currentTarget.style.background="var(--pink)";e.currentTarget.style.color="var(--pink-btn-h)";}}
                        onMouseLeave={e=>{e.currentTarget.style.background="var(--surface)";e.currentTarget.style.color="var(--ink-soft)";}}>
                        <span style={{fontSize:24}}>{app.emoji}</span>
                        {app.name}
                      </a>
                    ))}
                  </div>

                  {/* UPI ID copy */}
                  <div style={{background:"var(--surface)",borderRadius:12,padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
                    <div style={{textAlign:"left"}}>
                      <p style={{fontSize:10,fontWeight:700,color:"var(--ink-soft)",letterSpacing:"0.06em",marginBottom:2}}>UPI ID</p>
                      <p style={{fontSize:14,fontWeight:700,fontFamily:"monospace"}}>{storeUser.upi_id}</p>
                    </div>
                    <button onClick={()=>navigator.clipboard.writeText(storeUser.upi_id)}
                      style={{background:"var(--pink)",border:"none",borderRadius:9,padding:"7px 13px",cursor:"pointer",fontSize:12,fontWeight:700,color:"var(--pink-btn-h)"}}>
                      Copy
                    </button>
                  </div>

                  {/* Confirm paid button */}
                  <button className="btn-green" style={{width:"100%",padding:14,borderRadius:12,fontSize:15}} onClick={confirmQrPaid}>
                    ✓ I've Paid — Confirm Order
                  </button>
                  <button onClick={()=>setQrPay(null)} style={{width:"100%",background:"none",border:"none",marginTop:8,cursor:"pointer",fontSize:13,color:"var(--ink-soft)",padding:6}}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              /* Success */
              <div style={{padding:"44px 36px",textAlign:"center"}}>
                <div style={{width:80,height:80,borderRadius:"50%",background:"var(--green-bg)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px",animation:"pulse 1.5s ease infinite"}}>
                  <svg width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" strokeDasharray="60" strokeDashoffset="60" style={{animation:"checkDraw 0.5s ease forwards 0.1s"}}/>
                  </svg>
                </div>
                <h3 style={{fontSize:28,marginBottom:8}}><em style={{color:"var(--green)"}}>Order Confirmed!</em></h3>
                <p style={{color:"var(--ink-soft)",fontSize:14,lineHeight:1.7}}>
                  Thank you! Your order is confirmed at <strong>{storeUser.store_name}</strong> 🌸
                </p>
                <div style={{marginTop:18,background:"var(--green-bg)",borderRadius:12,padding:14}}>
                  <p style={{fontSize:13,color:"var(--green)",fontWeight:700}}>₹{qrPay.amount.toLocaleString()} · {storeUser.upi_id}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── CART ─────────────────────────────────────────────────────────────────────
function Cart({ cart, setCart, storeUser, onOrderPlaced, customer }) {
  const [paying, setPaying] = useState(false);
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const remove = id => setCart(c=>c.filter(x=>x.id!==id));
  const updQ   = (id,qty) => setCart(c=>c.map(x=>x.id===id?{...x,qty:Math.max(1,qty)}:x));

  const handlePay = async () => {
    if (!storeUser) { alert("Store not found"); return; }
    setPaying(true);
    const orderId = `BL-${Date.now().toString(36).toUpperCase()}`;
    await startCashfreePayment({
      amount:        total,
      orderId,
      customerName:  customer?.name  || "Customer",
      customerEmail: customer?.email || "customer@bloom.store",
      customerPhone: customer?.phone || "9999999999",
      storeName:     storeUser.store_name,
      storeSlug:     storeUser.store_slug,
      onSuccess: async (paymentDetails) => {
        const newOrder = {
          id:orderId, store_id:storeUser?.id,
          customer_name:customer?.name||"Customer",
          customer_phone:customer?.phone||"",
          customer_id:customer?.id||null,
          items:cart, amount:total,
          status:"confirmed",
          proof:"", upi_ref:String(paymentDetails?.paymentAmount||""),
          order_date:today(),
        };
        if (storeUser?.id&&storeUser.id!==DEMO_ID) await supa.insert("bloom_orders",newOrder);
        onOrderPlaced(storeUser?.id, {...newOrder,date:today()});
        if (storeUser?.mailersend_key&&storeUser?.email) {
          await sendOrderEmail({ mailerKey:storeUser.mailersend_key, toEmail:storeUser.email, toName:storeUser.name, order:{...newOrder,date:today()}, storeName:storeUser.store_name });
        }
        setCart([]);
        setPaying(false);
      },
      onFail: (msg) => { alert(`Payment failed: ${msg}`); setPaying(false); },
    });
  };

  if (!cart.length) return (
    <div style={{padding:"72px 6vw",textAlign:"center"}}>
      <div style={{fontSize:56}}>🌸</div>
      <h2 style={{fontSize:32,marginTop:16}}>Your cart is empty</h2>
      <p style={{color:"var(--ink-soft)",marginTop:8}}>Browse stores and add something lovely.</p>
    </div>
  );

  return (
    <div style={{padding:"44px 6vw",maxWidth:960,margin:"0 auto"}}>
      <h2 style={{fontSize:40,marginBottom:36}}>Your <em style={{color:"var(--pink-btn)"}}>Cart</em></h2>
      {/* Customer info bar */}
      {customer&&(
        <div style={{background:"var(--green-bg)",borderRadius:12,padding:"12px 18px",marginBottom:20,display:"flex",alignItems:"center",gap:10,fontSize:13}}>
          <span style={{fontSize:18}}>🌸</span>
          <span>Logged in as <strong>{customer.name}</strong> — your order will be saved to your account</span>
        </div>
      )}
      <div style={{display:"grid",gridTemplateColumns:"1fr 340px",gap:28,alignItems:"start"}}>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {cart.map(item=>(
            <div key={item.id} className="card" style={{padding:18,display:"flex",gap:16,alignItems:"center"}}>
              <img src={item.img} alt={item.name} style={{width:76,height:76,objectFit:"cover",borderRadius:10,flexShrink:0}}/>
              <div style={{flex:1}}>
                <div style={{fontWeight:600,fontSize:15}}>{item.name}</div>
                <div style={{color:"var(--pink-btn)",fontFamily:"Playfair Display",fontSize:18,fontWeight:700,marginTop:3}}>₹{item.price.toLocaleString()}</div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:9}}>
                <button onClick={()=>updQ(item.id,item.qty-1)} style={{background:"var(--pink)",border:"none",width:28,height:28,borderRadius:7,cursor:"pointer",color:"var(--pink-btn-h)",fontWeight:700}}>−</button>
                <span style={{fontWeight:700,fontSize:14}}>{item.qty}</span>
                <button onClick={()=>updQ(item.id,item.qty+1)} style={{background:"var(--pink)",border:"none",width:28,height:28,borderRadius:7,cursor:"pointer",color:"var(--pink-btn-h)",fontWeight:700}}>+</button>
              </div>
              <div style={{fontWeight:700,fontSize:14,minWidth:66,textAlign:"right"}}>₹{(item.price*item.qty).toLocaleString()}</div>
              <button onClick={()=>remove(item.id)} style={{background:"none",border:"none",cursor:"pointer",padding:4}}><Icon n="trash" size={15} color="#C05"/></button>
            </div>
          ))}
        </div>
        <div className="card" style={{padding:28,position:"sticky",top:80}}>
          <h3 style={{fontSize:22,marginBottom:20}}>Order Summary</h3>
          {cart.map(i=>(
            <div key={i.id} style={{display:"flex",justifyContent:"space-between",marginBottom:9,fontSize:13,color:"var(--ink-soft)"}}>
              <span>{i.name} × {i.qty}</span>
              <span style={{color:"var(--ink)",fontWeight:600}}>₹{(i.price*i.qty).toLocaleString()}</span>
            </div>
          ))}
          <div style={{borderTop:"1px solid var(--border)",paddingTop:14,marginTop:14,display:"flex",justifyContent:"space-between"}}>
            <span style={{fontWeight:700,fontSize:17}}>Total</span>
            <span style={{color:"var(--pink-btn)",fontFamily:"Playfair Display",fontSize:26,fontWeight:700}}>₹{total.toLocaleString()}</span>
          </div>
          <div style={{marginTop:20}}>
            <button className="btn-green" style={{width:"100%",padding:15,fontSize:14,borderRadius:12}}
              onClick={handlePay} disabled={paying}>
              {paying?"Opening payment…":`💳 Pay ₹${total.toLocaleString()}`}
            </button>
            <p style={{fontSize:11,color:"var(--ink-soft)",textAlign:"center",marginTop:9}}>UPI · Cards · Wallets · Secured by Cashfree</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CUSTOMER AUTH ────────────────────────────────────────────────────────────
function CustomerAuth({ mode, setPage, onCustomerLogin }) {
  const navigate = useNavigate();
  const [form, setForm]   = useState({name:"",email:"",phone:"",pass:"",pass2:""});
  const [errs, setErrs]   = useState({});
  const [loading, setLoading] = useState(false);
  const h = e => setForm(f=>({...f,[e.target.name]:e.target.value}));
  const Err = ({k})=>errs[k]?<p style={{fontSize:11,color:"var(--red)",marginTop:4}}>{errs[k]}</p>:null;

  const submit = async () => {
    const e = {};
    if (mode==="signup") {
      if (!form.name.trim()) e.name = "Name is required";
      if (form.pass!==form.pass2) e.pass2 = "Passwords don't match";
    }
    if (!form.email.includes("@")) e.email = "Enter a valid email";
    if (form.pass.length<6) e.pass = "Password must be 6+ characters";
    if (Object.keys(e).length) { setErrs(e); return; }
    setLoading(true);
    try {
      if (mode==="signup") {
        const existing = await supa.select("bloom_customers",`email=eq.${encodeURIComponent(form.email.toLowerCase())}`);
        if (existing.length>0) { setErrs({email:"Email already registered"}); setLoading(false); return; }
        const nc = { id:`c-${Date.now()}`, name:form.name, email:form.email.toLowerCase(), password_hash:simpleHash(form.pass), phone:form.phone };
        const saved = await supa.insert("bloom_customers", nc);
        if (!saved) { setErrs({email:"Sign up failed. Try again."}); setLoading(false); return; }
        CustSession.save({ customerId:saved.id||nc.id });
        onCustomerLogin(saved||nc);
      } else {
        const rows = await supa.select("bloom_customers",`email=eq.${encodeURIComponent(form.email.toLowerCase())}`);
        if (rows.length===0) { setErrs({email:"No account with this email"}); setLoading(false); return; }
        const c = rows[0];
        if (c.password_hash!==simpleHash(form.pass)) { setErrs({pass:"Wrong password"}); setLoading(false); return; }
        CustSession.save({ customerId:c.id });
        onCustomerLogin(c);
      }
    } catch { setErrs({email:"Something went wrong. Check your connection."}); setLoading(false); }
  };

  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"radial-gradient(ellipse 70% 70% at 50% 0%,rgba(184,216,240,0.25) 0%,transparent 60%),var(--offwhite)",padding:"40px 16px"}}>
      <div className="card fadeUp" style={{width:"100%",maxWidth:420,padding:44}}>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{display:"flex",justifyContent:"center",marginBottom:12}}><BloomSphere size={54}/></div>
          <h2 style={{fontSize:26}}>{mode==="login"?"Welcome back":"Create your account"}</h2>
          <p style={{color:"var(--ink-soft)",marginTop:6,fontSize:13}}>
            {mode==="login"?"Log in to track your orders":"Shop across all Bloom stores with one account"}
          </p>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:13}}>
          {mode==="signup"&&<div><input className={`inp${errs.name?" err":""}`} name="name" placeholder="Your full name" value={form.name} onChange={h}/><Err k="name"/></div>}
          <div><input className={`inp${errs.email?" err":""}`} name="email" type="email" placeholder="Email address" value={form.email} onChange={h}/><Err k="email"/></div>
          {mode==="signup"&&<input className="inp" name="phone" placeholder="Phone number (optional)" value={form.phone} onChange={h}/>}
          <div><input className={`inp${errs.pass?" err":""}`} name="pass" type="password" placeholder="Password (6+ characters)" value={form.pass} onChange={h}/><Err k="pass"/></div>
          {mode==="signup"&&<div><input className={`inp${errs.pass2?" err":""}`} name="pass2" type="password" placeholder="Confirm password" value={form.pass2} onChange={h}/><Err k="pass2"/></div>}
          <button className="btn-pink" style={{marginTop:4,padding:14,fontSize:14,borderRadius:12}} onClick={submit} disabled={loading}>
            {loading?(mode==="login"?"Logging in…":"Creating account…"):mode==="login"?"Log In":"Create Account 🌸"}
          </button>
        </div>
        <p style={{textAlign:"center",marginTop:18,fontSize:13,color:"var(--ink-soft)"}}>
          {mode==="login"?"New here? ":"Already have an account? "}
          <span style={{color:"var(--pink-btn)",cursor:"pointer",fontWeight:600}} onClick={()=>{setErrs({});navigate(mode==="login"?"/customer/signup":"/customer/login");}}>
            {mode==="login"?"Create account":"Log in"}
          </span>
        </p>
        <p style={{textAlign:"center",marginTop:12,fontSize:12,color:"var(--ink-soft)"}}>
          Are you a business? <span style={{color:"var(--pink-btn)",cursor:"pointer",fontWeight:600}} onClick={()=>navigate("/login")}>Business Login →</span>
        </p>
      </div>
    </div>
  );
}

// ─── CUSTOMER DASHBOARD ───────────────────────────────────────────────────────
function CustomerDashboard({ customer, onLogout }) {
  const navigate = useNavigate();
  const [orders,  setOrders]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [users,   setUsers]   = useState([]);

  useEffect(() => {
    const load = async () => {
      // Load all orders for this customer
      const rows = await supa.select("bloom_orders", `customer_id=eq.${customer.id}&order=created_at.desc`);
      setOrders(rows.map(o=>({...o, date:o.order_date})));
      // Load store names
      const storeIds = [...new Set(rows.map(o=>o.store_id))];
      if (storeIds.length>0) {
        const stores = await supa.select("bloom_users", `id=in.(${storeIds.join(",")})`);
        setUsers(stores);
      }
      setLoading(false);
    };
    if (customer?.id) load();
  }, [customer]);

  const getStore = (storeId) => users.find(u=>u.id===storeId);

  const reorder = (order) => {
    const store = getStore(order.store_id);
    if (store) navigate(`/store/${store.store_slug}`);
  };

  const totalSpent = orders.reduce((s,o)=>s+o.amount,0);

  return (
    <div style={{minHeight:"100vh",background:"var(--offwhite)"}}>
      {/* Header */}
      <div style={{background:"linear-gradient(135deg,var(--blue) 0%,var(--pink) 50%,var(--yellow) 100%)",padding:"48px 6vw 40px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:40,top:-40,width:180,height:180,borderRadius:"50%",background:"rgba(255,255,255,0.2)",filter:"blur(40px)",pointerEvents:"none"}}/>
        <div style={{display:"flex",alignItems:"center",gap:20,flexWrap:"wrap"}}>
          <div style={{width:72,height:72,borderRadius:"50%",background:"rgba(255,255,255,0.9)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0}}>
            {customer.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 style={{fontSize:"clamp(24px,5vw,40px)"}}>Hey, {customer.name} 🌸</h1>
            <p style={{color:"var(--ink-soft)",fontSize:14,marginTop:4}}>{customer.email}</p>
          </div>
        </div>
        {/* Stats */}
        <div style={{display:"flex",gap:24,marginTop:28,flexWrap:"wrap"}}>
          {[
            {label:"Orders Placed",  val:orders.length},
            {label:"Total Spent",    val:`₹${totalSpent.toLocaleString()}`},
            {label:"Stores Shopped", val:new Set(orders.map(o=>o.store_id)).size},
          ].map((s,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,0.85)",borderRadius:14,padding:"14px 22px",minWidth:120}}>
              <div style={{fontSize:24,fontFamily:"Playfair Display",fontWeight:700}}>{s.val}</div>
              <div style={{fontSize:11,fontWeight:700,letterSpacing:"0.06em",color:"var(--ink-soft)",textTransform:"uppercase",marginTop:3}}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Orders */}
      <div style={{padding:"40px 6vw",maxWidth:860,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:28}}>
          <h2 style={{fontSize:32}}>Your <em style={{color:"var(--pink-btn)"}}>Orders</em></h2>
          <button className="btn-ghost" style={{display:"flex",alignItems:"center",gap:6,padding:"9px 18px"}} onClick={()=>navigate("/directory")}>
            <Icon n="store" size={14}/> Browse Stores
          </button>
        </div>

        {loading ? (
          <div style={{textAlign:"center",padding:"60px 0",color:"var(--ink-soft)"}}>
            <div style={{width:36,height:36,border:"3px solid var(--pink-btn)",borderTopColor:"transparent",borderRadius:"50%",animation:"spin 0.8s linear infinite",margin:"0 auto 16px"}}/>
            <p>Loading your orders…</p>
          </div>
        ) : orders.length===0 ? (
          <div style={{textAlign:"center",padding:"60px 0"}}>
            <div style={{fontSize:56,marginBottom:16}}>🛍</div>
            <h3 style={{fontSize:24,marginBottom:8}}>No orders yet</h3>
            <p style={{color:"var(--ink-soft)",marginBottom:24}}>Browse stores and make your first purchase!</p>
            <button className="btn-pink" style={{borderRadius:12,padding:"12px 28px"}} onClick={()=>navigate("/directory")}>
              Browse Stores 🌸
            </button>
          </div>
        ) : (
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            {orders.map(o=>{
              const store = getStore(o.store_id);
              return (
                <div key={o.id} className="card" style={{padding:24}}>
                  <div style={{display:"flex",gap:16,alignItems:"flex-start",flexWrap:"wrap"}}>
                    {/* Store avatar */}
                    <div style={{width:48,height:48,borderRadius:14,background:"linear-gradient(135deg,var(--pink),var(--yellow))",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <BloomSphere size={48}/>
                    </div>
                    <div style={{flex:1,minWidth:200}}>
                      {/* Store + order ID */}
                      <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap",marginBottom:5}}>
                        <span style={{fontWeight:700,fontSize:14}}>{store?.store_name||"Bloom Store"}</span>
                        <span style={{fontSize:11,color:"var(--ink-soft)",fontFamily:"monospace"}}>{o.id}</span>
                        <span className="bdg-green">✓ Confirmed</span>
                      </div>
                      {/* Items */}
                      <p style={{fontSize:14,color:"var(--ink)",marginBottom:5}}>
                        {(o.items||[]).map(i=>`${i.name} ×${i.qty}`).join(", ")||"Order"}
                      </p>
                      {/* Date + UPI ref */}
                      <p style={{fontSize:12,color:"var(--ink-soft)"}}>
                        {o.date||o.order_date}
                        {o.upi_ref&&<span style={{marginLeft:8,fontFamily:"monospace",fontSize:11,background:"var(--surface)",padding:"1px 6px",borderRadius:4}}>Ref: {o.upi_ref}</span>}
                      </p>
                    </div>
                    {/* Right: amount + actions */}
                    <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:10}}>
                      <div style={{fontFamily:"Playfair Display",fontSize:24,fontWeight:700,color:"var(--pink-btn)"}}>
                        ₹{o.amount.toLocaleString()}
                      </div>
                      <div style={{display:"flex",gap:8}}>
                        {o.proof&&(
                          <a href={o.proof} target="_blank" rel="noreferrer"
                            style={{background:"var(--blue)",color:"var(--ink)",border:"none",borderRadius:9,padding:"6px 12px",fontSize:12,fontWeight:700,cursor:"pointer",textDecoration:"none",display:"flex",alignItems:"center",gap:5}}>
                            <Icon n="eye" size={13}/>Receipt
                          </a>
                        )}
                        <button onClick={()=>reorder(o)}
                          style={{background:"var(--pink)",color:"var(--pink-btn-h)",border:"none",borderRadius:9,padding:"6px 12px",fontSize:12,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
                          🔁 Reorder
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const navigate = useNavigate();
  // ── Business session state ─────────────────────────────────────────────────
  const [session, setSession]         = useState(null);
  const [users, setUsers]             = useState([DEMO_USER]);
  const [allProducts, setAllProducts] = useState({ [DEMO_ID]: DEMO_PRODUCTS });
  const [allOrders, setAllOrders]     = useState({ [DEMO_ID]: DEMO_ORDERS });
  const [currentStore, setCurrentStore] = useState(DEMO_ID);
  const [cart, setCart]               = useState([]);

  // ── Customer session state ─────────────────────────────────────────────────
  const [customer, setCustomer] = useState(null); // logged-in customer account

  // ── Realtime: subscribes to new orders for logged-in business owner ───────
  const liveConnected = useRealtimeOrders(
    session?.role==="business"&&session?.userId!==DEMO_ID ? session.userId : null,
    (newOrder) => {
      // Fires automatically when Supabase pushes a new order — no refresh needed
      setAllOrders(prev => ({
        ...prev,
        [newOrder.store_id]: [newOrder, ...(prev[newOrder.store_id]||[])],
      }));
    }
  );

  // ── Load Supabase data on mount ───────────────────────────────────────────
  useEffect(() => {
    const boot = async () => {
      try {
        // Restore business session
        const savedSess = Session.load();
        if (savedSess?.userId) {
          await loadUserData(savedSess);
        }
        // Restore customer session
        const savedCust = CustSession.load();
        if (savedCust?.customerId) {
          const rows = await supa.select("bloom_customers", `id=eq.${savedCust.customerId}`);
          if (rows.length>0) setCustomer(rows[0]);
        }
        // Load all store users for directory
        const supaUsers = await supa.select("bloom_users","order=created_at.asc");
        if (supaUsers.length>0) {
          setUsers([DEMO_USER, ...supaUsers]);
          const prods = { [DEMO_ID]: DEMO_PRODUCTS };
          for (const u of supaUsers) {
            const p = await supa.select("bloom_products",`user_id=eq.${u.id}&order=created_at.asc`);
            if (p.length>0) prods[u.id] = p;
          }
          setAllProducts(prods);
        }
      } catch(e) {
        console.info("Supabase load error (demo mode):", e.message);
      }
    };
    boot();
  }, []);

  // ── Load a specific user's data from Supabase ─────────────────────────────
  const loadUserData = async (sess) => {
    if (!sess?.userId || sess.userId===DEMO_ID) {
      setSession(sess||{role:"business",userId:DEMO_ID});
      navigate("/dashboard"); return;
    }
    const rows = await supa.select("bloom_users",`id=eq.${sess.userId}`);
    if (rows.length===0) { Session.clear(); return; }

    const u = rows[0];
    setUsers(prev => prev.find(x=>x.id===u.id) ? prev.map(x=>x.id===u.id?u:x) : [DEMO_USER,u,...prev.filter(x=>x.id!==DEMO_ID&&x.id!==u.id)]);

    const prods  = await supa.select("bloom_products",`user_id=eq.${u.id}&order=created_at.asc`);
    const orders = await supa.select("bloom_orders",`store_id=eq.${u.id}&order=created_at.desc`);
    setAllProducts(prev=>({...prev,[u.id]:prods}));
    setAllOrders(prev=>({...prev,[u.id]:orders.map(o=>({...o,date:o.order_date}))}));
    setSession(sess);
    navigate("/dashboard");
  };

  // ── Called on login/signup — saves session and loads data ────────────────
  const setSessionAndLoad = async (sess) => {
    Session.save(sess);
    if (sess.role==="customer") { setSession(sess); navigate("/directory"); return; }
    await loadUserData(sess);
  };

  // ── Update user in state (from Settings save) ─────────────────────────────
  const handleUserUpdated = (updated) => {
    setUsers(prev=>prev.map(u=>u.id===updated.id?updated:u));
  };

  // ── New order placed (from Storefront or Cart) ────────────────────────────
  const handleOrderPlaced = (storeId, order) => {
    setAllOrders(prev=>({
      ...prev,
      [storeId]: [order, ...(prev[storeId]||[])],
    }));
  };

  // ── Customer login handler ─────────────────────────────────────────────────
  const handleCustomerLogin = (c) => {
    setCustomer(c);
    navigate("/customer/orders");
  };

  const handleCustomerLogout = () => {
    CustSession.clear();
    setCustomer(null);
    navigate("/");
  };

  const logout = async () => {
    Session.clear();
    setSession(null); navigate("/"); setCart([]);
  };

  // ── Derived state ─────────────────────────────────────────────────────────
  const currentUser   = users.find(u=>u.id===session?.userId);
  const myProducts    = allProducts[currentUser?.id] || [];
  const myOrders      = allOrders[currentUser?.id]   || [];
  const cartCount     = cart.reduce((s,i)=>s+i.qty,0);

  const setMyProducts = async (prods) => {
    setAllProducts(prev=>({...prev,[currentUser?.id]:prods}));
  };

  const goToDemo = () => {
    setSession(s=>s||{role:"customer"});
    navigate("/store/bloom-by-priya");
  };

  // ── Nav page name from URL ────────────────────────────────────────────────
  // Used just for active nav highlight
  const location = window.location.pathname.replace("/","") || "home";

  return (
    <div className="noise-bg">
      <FontLoader/>
      <Nav
        page={location}
        setPage={(p) => {
          if (p==="dashboard"||p==="products"||p==="orders"||p==="settings") navigate(`/${p}`);
          else if (p==="login")     navigate("/login");
          else if (p==="signup")    navigate("/signup");
          else if (p==="directory") navigate("/directory");
          else if (p==="cart")      navigate("/cart");
          else                      navigate("/");
        }}
        session={session}
        orders={myOrders}
        live={liveConnected}
        onLogout={logout}
        cartCount={cartCount}
        customer={customer}
        onCustomerLogout={handleCustomerLogout}
      />
      <Routes>
        {/* ── Payment status (Cashfree redirect) ── */}
        <Route path="/payment-status" element={<PaymentStatusPage allOrders={allOrders} setAllOrders={setAllOrders} users={users}/>}/>

        {/* ── Public routes ── */}
        <Route path="/"          element={<Landing setPage={p=>navigate(`/${p}`)} goToDemo={goToDemo}/>}/>
        <Route path="/login"     element={<Auth mode="login"  setPage={p=>navigate(`/${p}`)} setSessionAndLoad={setSessionAndLoad}/>}/>
        <Route path="/signup"    element={<Auth mode="signup" setPage={p=>navigate(`/${p}`)} setSessionAndLoad={setSessionAndLoad}/>}/>
        <Route path="/directory" element={
          <StoreDirectory
            users={users} allProducts={allProducts}
            setCurrentStore={setCurrentStore}
            setPage={p=>navigate(`/${p}`)}
            setSession={setSession}
          />
        }/>
        <Route path="/cart" element={
          customer
            ? <Cart cart={cart} setCart={setCart} storeUser={users.find(u=>u.id===currentStore)||DEMO_USER} onOrderPlaced={handleOrderPlaced} customer={customer}/>
            : <Navigate to="/customer/login" replace/>
        }/>

        {/* ── Customer account routes ── */}
        <Route path="/customer/login"  element={<CustomerAuth mode="login"  setPage={p=>navigate(p)} onCustomerLogin={handleCustomerLogin}/>}/>
        <Route path="/customer/signup" element={<CustomerAuth mode="signup" setPage={p=>navigate(p)} onCustomerLogin={handleCustomerLogin}/>}/>
        <Route path="/customer/orders" element={
          customer
            ? <CustomerDashboard customer={customer} onLogout={handleCustomerLogout}/>
            : <Navigate to="/customer/login" replace/>
        }/>

        {/* ── Each store gets its own public URL: /store/:slug ── */}
        <Route path="/store/:slug" element={
          customer
            ? <StorefrontPage users={users} allProducts={allProducts} allOrders={allOrders} setAllOrders={setAllOrders} cart={cart} setCart={setCart} customer={customer}/>
            : <Navigate to="/customer/login" replace/>
        }/>

        {/* ── Business dashboard routes (require login) ── */}
        <Route path="/dashboard" element={
          session?.role==="business"&&currentUser
            ? <Dashboard user={currentUser} products={myProducts} orders={myOrders} live={liveConnected}/>
            : <Navigate to="/login" replace/>
        }/>
        <Route path="/products" element={
          session?.role==="business"&&currentUser
            ? <Products userId={currentUser.id} products={myProducts} setProducts={setMyProducts}/>
            : <Navigate to="/login" replace/>
        }/>
        <Route path="/orders" element={
          session?.role==="business"&&currentUser
            ? <Orders orders={myOrders}/>
            : <Navigate to="/login" replace/>
        }/>
        <Route path="/settings" element={
          session?.role==="business"&&currentUser
            ? <Settings user={currentUser} onUserUpdated={handleUserUpdated}/>
            : <Navigate to="/login" replace/>
        }/>

        {/* ── Legal & info pages ── */}
        <Route path="/privacy" element={<PrivacyPolicy/>}/>
        <Route path="/about"   element={<About/>}/>

        {/* ── Catch-all ── */}
        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
    </div>
  );
}
