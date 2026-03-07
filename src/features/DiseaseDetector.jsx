import { useState, useRef, useCallback, useEffect } from "react";

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const SEV_MAP = {
  none:     { label:"Healthy",  arc:"#22c55e", bg:"#dcfce7", text:"#15803d", ring:"#86efac", glow:"rgba(34,197,94,0.28)"  },
  low:      { label:"Low",      arc:"#84cc16", bg:"#f7fee7", text:"#4d7c0f", ring:"#bef264", glow:"rgba(132,204,22,0.25)" },
  moderate: { label:"Moderate", arc:"#f59e0b", bg:"#fef3c7", text:"#b45309", ring:"#fcd34d", glow:"rgba(245,158,11,0.25)" },
  high:     { label:"High",     arc:"#ef4444", bg:"#fee2e2", text:"#b91c1c", ring:"#fca5a5", glow:"rgba(239,68,68,0.25)"  },
};
const SPREAD_MAP = {
  low:      { label:"Low Spread Risk",      color:"#15803d", bg:"#f0fdf4", border:"#bbf7d0" },
  moderate: { label:"Moderate Spread Risk", color:"#b45309", bg:"#fffbeb", border:"#fde68a" },
  high:     { label:"High Spread Risk",     color:"#b91c1c", bg:"#fef2f2", border:"#fecaca" },
};
const LOAD_STEPS = [
  "Identifying plant species…",
  "Scanning for pathogens…",
  "Evaluating infection severity…",
  "Building treatment plan…",
];
const TABS = [
  { label:"Symptoms",  icon:"🔍" },
  { label:"Treatment", icon:"💊" },
  { label:"Prevention",icon:"🛡️" },
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
  *,*::before,*::after{box-sizing:border-box;}
  @keyframes spin    { to{transform:rotate(360deg)} }
  @keyframes spinR   { to{transform:rotate(-360deg)} }
  @keyframes float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes scan    { 0%{top:-4px;opacity:1} 100%{top:100%;opacity:.3} }
  @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(350%)} }
  @keyframes fadeUp  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
  @keyframes popIn   { from{opacity:0;transform:scale(.93)} to{opacity:1;transform:scale(1)} }
  @keyframes chipPulse{ 0%,100%{transform:scale(1)} 50%{transform:scale(1.07)} }
  .dd-analyze:hover:not(:disabled){ transform:translateY(-2px)!important; box-shadow:0 12px 38px rgba(22,163,74,.58)!important; }
  .dd-tab:hover   { background:#f0fdf4!important; color:#15803d!important; }
  .dd-hist:hover  { background:#f0fdf4!important; border-color:#86efac!important; }
  .dd-tog:hover   { background:#f9fafb!important; }
  .dd-copy:hover  { background:#eff6ff!important; }
  .dd-prnt:hover  { background:#f0f0f0!important; }
  .dd-new:hover   { background:#f0fdf4!important; }
  @media(max-width:820px){
    .dd-grid{ grid-template-columns:1fr!important; }
    .dd-h1  { font-size:1.45rem!important; }
    .dd-act { flex-direction:column!important; }
    .dd-st  { grid-template-columns:1fr!important; }
  }
`;

// ─── TINY REUSABLE COMPONENTS ──────────────────────────────────────────────────

const Arc = ({ pct, color, glow }) => {
  const R=42, CX=54, CY=54, C=+(2*Math.PI*R).toFixed(2);
  const filled=+((pct/100)*C).toFixed(2), empty=+(C-filled).toFixed(2);
  return (
    <div style={{position:"relative",width:108,height:108,flexShrink:0}}>
      <svg width="108" height="108" style={{transform:"rotate(-90deg)",filter:`drop-shadow(0 0 8px ${glow})`}}>
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="#e5e7eb" strokeWidth="8"/>
        <circle cx={CX} cy={CY} r={R} fill="none" stroke={color} strokeWidth="8"
          strokeLinecap="round" strokeDasharray={`${filled} ${empty}`}
          style={{transition:"stroke-dasharray 1s cubic-bezier(.4,0,.2,1)"}}/>
      </svg>
      <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",
        alignItems:"center",justifyContent:"center"}}>
        <span style={{fontSize:"1.35rem",fontWeight:800,color:"#111827",fontFamily:"DM Sans,sans-serif",lineHeight:1}}>{pct}%</span>
        <span style={{fontSize:"0.54rem",color:"#9ca3af",fontFamily:"DM Sans,sans-serif",textTransform:"uppercase",letterSpacing:"0.08em",marginTop:2}}>confidence</span>
      </div>
    </div>
  );
};

const Pill = ({children,bg,color,border}) => (
  <span style={{display:"inline-flex",alignItems:"center",gap:5,padding:"3px 11px",
    borderRadius:20,fontSize:"0.71rem",fontWeight:600,fontFamily:"DM Sans,sans-serif",
    background:bg,color,border:`1px solid ${border||bg}`}}>{children}</span>
);

const TItem = ({icon,text,delay=0}) => (
  <li style={{display:"flex",alignItems:"flex-start",gap:10,padding:"10px 13px",
    borderRadius:10,background:"rgba(0,0,0,.025)",border:"1px solid rgba(0,0,0,.055)",
    animation:`fadeUp .28s ease ${delay}s both`}}>
    <span style={{fontSize:"0.82rem",flexShrink:0,marginTop:1}}>{icon}</span>
    <span style={{fontSize:"0.87rem",color:"#374151",fontFamily:"DM Sans,sans-serif",lineHeight:1.55}}>{text}</span>
  </li>
);

const TList = ({items=[],icon}) => (
  <ul style={{margin:0,padding:0,listStyle:"none",display:"flex",flexDirection:"column",gap:7}}>
    {items.map((t,i)=><TItem key={i} text={t} icon={icon} delay={i*0.065}/>)}
  </ul>
);

const HistRow = ({entry,active,onClick}) => {
  const s = SEV_MAP[entry.result?.severity]||SEV_MAP.low;
  return (
    <button className="dd-hist" onClick={onClick} style={{
      display:"flex",alignItems:"center",gap:10,padding:"9px 10px",
      borderRadius:10,width:"100%",textAlign:"left",cursor:"pointer",
      background:active?"#f0fdf4":"transparent",
      border:`1px solid ${active?"#86efac":"transparent"}`,
      transition:"all .15s ease",
    }}>
      <img src={entry.thumb} alt="" style={{width:40,height:40,borderRadius:8,objectFit:"cover",flexShrink:0,border:"1.5px solid #e5e7eb"}}/>
      <div style={{flex:1,minWidth:0}}>
        <p style={{margin:0,fontSize:"0.79rem",fontWeight:700,color:"#111827",fontFamily:"DM Sans,sans-serif",
          overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{entry.result.diseaseName}</p>
        <p style={{margin:0,fontSize:"0.68rem",color:"#6b7280",fontFamily:"DM Sans,sans-serif"}}>
          {entry.result.plantName||"Unknown"} · {entry.time}</p>
      </div>
      <span style={{width:8,height:8,borderRadius:"50%",background:s.arc,flexShrink:0}}/>
    </button>
  );
};

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function DiseaseDetector() {
  const [image,      setImage]      = useState(null);
  const [b64,        setB64]        = useState("");
  const [mime,       setMime]       = useState("image/jpeg");
  const [fileName,   setFileName]   = useState("");
  const [fileSize,   setFileSize]   = useState("");
  const [result,     setResult]     = useState(null);
  const [loading,    setLoading]    = useState(false);
  const [scanning,   setScanning]   = useState(false);
  const [step,       setStep]       = useState(0);
  const [error,      setError]      = useState("");
  const [dragging,   setDragging]   = useState(false);
  const [tab,        setTab]        = useState(0);
  const [lightbox,   setLightbox]   = useState(false);
  const [history,    setHistory]    = useState([]);
  const [activeHist, setActiveHist] = useState(null);
  const [showHist,   setShowHist]   = useState(false);
  const [copied,     setCopied]     = useState(false);
  const fileRef = useRef(null);

  // inject CSS once
  useEffect(()=>{
    if(document.getElementById("dd-css"))return;
    const s=document.createElement("style");
    s.id="dd-css"; s.textContent=CSS;
    document.head.appendChild(s);
  },[]);

  // step ticker
  useEffect(()=>{
    if(!loading){setStep(0);return;}
    let i=0;
    const t=setInterval(()=>{i=(i+1)%LOAD_STEPS.length;setStep(i);},1500);
    return()=>clearInterval(t);
  },[loading]);

  // ESC closes lightbox
  useEffect(()=>{
    const fn=(e)=>{if(e.key==="Escape")setLightbox(false);};
    window.addEventListener("keydown",fn);
    return()=>window.removeEventListener("keydown",fn);
  },[]);

  // ── file handling ────────────────────────────────────────────────────────
  const processFile = useCallback((file)=>{
    if(!file||!file.type.startsWith("image/")){
      setError("Please upload a valid image (JPG, PNG, WEBP, etc.).");return;
    }
    if(file.size>15*1024*1024){
      setError("File too large — max 15 MB.");return;
    }
    setError("");setResult(null);setTab(0);setActiveHist(null);
    const n=file.name;
    setFileName(n.length>26?n.slice(0,23)+"…":n);
    const kb=file.size/1024;
    setFileSize(kb>=1024?(kb/1024).toFixed(1)+" MB":Math.round(kb)+" KB");
    const r=new FileReader();
    r.onloadend=()=>{
      setImage(URL.createObjectURL(file));
      setB64(r.result.split(",")[1]);
      setMime(file.type);
    };
    r.readAsDataURL(file);
  },[]);

  const onFile   = (e)=>processFile(e.target.files[0]);
  const onOver   = (e)=>{e.preventDefault();setDragging(true);};
  const onLeave  = ()=>setDragging(false);
  const onDrop   = (e)=>{e.preventDefault();setDragging(false);processFile(e.dataTransfer.files[0]);};

  // ── Anthropic Vision API (no external package needed) ────────────────────
const analyze = async () => {
  if (!b64) return;

  setLoading(true);
  setScanning(true);
  setError("");
  setResult(null);

  const scanT = setTimeout(() => setScanning(false), 2500);

 const PROMPT = `
You are a professional plant disease expert.

Analyze the plant leaf image and return ONLY valid JSON.

Do NOT include explanations, markdown, or extra text.

Return exactly this JSON schema:

{
"isHealthy": boolean,
"plantName": string,
"scientificName": string,
"diseaseName": string,
"confidence": number,
"severity": "none"|"low"|"moderate"|"high",
"affectedPart": string,
"estimatedDamage": string,
"spreadRisk": "low"|"moderate"|"high",
"symptoms": [string,string,string],
"organicTreatments": [string,string,string],
"chemicalTreatments": [string,string],
"preventionTips": [string,string,string],
"urgency": string,
"notes": string
}

Rules:
- Always return valid JSON
- No text outside JSON
- If plant is healthy:
  diseaseName = "No Disease Detected"
  severity = "none"
  spreadRisk = "low"
`;

  try {

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: PROMPT
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:${mime};base64,${b64}`
                }
              }
            ]
          }
        ]
      })
    });

    const data = await res.json();

   const content = data?.choices?.[0]?.message?.content;

const raw =
  typeof content === "string"
    ? content
    : content?.map(c => c.text || "").join("") || "";

    if (!raw) throw new Error("Empty response");

    const clean = raw.replace(/```json|```/gi, "").trim();

    const parsed = JSON.parse(clean);

    

    setResult(parsed);

    const entry = {
      id: Date.now(),
      thumb: image,
      result: parsed,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
    };

    setHistory(p => [entry, ...p].slice(0, 5));
    setShowHist(true);

  } catch (err) {

    console.error(err);

    setError(
      err.message?.includes("JSON")
        ? "AI returned unexpected format — please try again."
        : "Analysis failed. Please try again."
    );

  } finally {

    clearTimeout(scanT);
    setLoading(false);
    setScanning(false);

  }
};
const reset = () => {
  setImage(null);
  setB64("");
  setResult(null);
  setError("");
  setFileName("");
  setFileSize("");
  setActiveHist(null);

  if (fileRef.current) fileRef.current.value = "";
};
const copyReport = () => {

  if (!result) return;

  const report = `
Plant: ${result.plantName}
Disease: ${result.diseaseName}
Severity: ${result.severity}
Confidence: ${result.confidence}%

Symptoms:
${result.symptoms?.join("\n") || ""}

Organic Treatments:
${result.organicTreatments?.join("\n") || ""}

Prevention:
${result.preventionTips?.join("\n") || ""}
`;

  navigator.clipboard.writeText(report);

  setCopied(true);

  setTimeout(() => {
    setCopied(false);
  }, 2000);

};
const sev  = result ? (SEV_MAP[result.severity] || SEV_MAP.low) : null;
const sprd = result ? (SPREAD_MAP[result.spreadRisk] || SPREAD_MAP.low) : null;
  // ── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <div style={{minHeight:"100vh",background:"#73D498",
      fontFamily:"'DM Sans',system-ui,sans-serif",paddingBottom:60}}>

      {/* LIGHTBOX */}
      {lightbox&&image&&(
        <div onClick={()=>setLightbox(false)} style={{
          position:"fixed",inset:0,zIndex:2000,background:"rgba(0,0,0,.92)",
          display:"flex",alignItems:"center",justifyContent:"center",
          cursor:"zoom-out",animation:"fadeIn .18s ease",
        }}>
          <img src={image} alt="" style={{maxWidth:"90vw",maxHeight:"88vh",borderRadius:20,
            boxShadow:"0 40px 120px rgba(0,0,0,.8)",animation:"popIn .22s ease"}}/>
          <button onClick={()=>setLightbox(false)} style={{
            position:"absolute",top:20,right:24,
            background:"rgba(255,255,255,.14)",border:"none",
            backdropFilter:"blur(8px)",color:"#fff",borderRadius:"50%",
            width:44,height:44,fontSize:"1.1rem",cursor:"pointer",
            display:"flex",alignItems:"center",justifyContent:"center",
          }}>✕</button>
          <p style={{position:"absolute",bottom:20,color:"rgba(255,255,255,.38)",
            fontSize:"0.75rem",fontFamily:"DM Sans,sans-serif",letterSpacing:"0.05em"}}>
            Press ESC or click to close
          </p>
        </div>
      )}

      {/* HEADER */}
      <div style={{background:"rgba(43, 179, 99, 0.92)",borderBottom:"1px solid rgba(21, 141, 21, 0.12)",
        backdropFilter:"blur(16px)",padding:"22px 28px"}}>
        <div style={{maxWidth:1220,margin:"0 auto",display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
          <div style={{width:54,height:54,borderRadius:16,flexShrink:0,
            background:"linear-gradient(135deg,#16a34a,#15803d)",
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.75rem",
            boxShadow:"0 6px 28px rgba(22,163,74,.38)",animation:"float 3.6s ease-in-out infinite"}}>🌿</div>
          <div>
            <h1 className="dd-h1" style={{margin:0,fontFamily:"'Playfair Display',Georgia,serif",
              fontSize:"1.9rem",fontWeight:900,color:"#fff",letterSpacing:"-0.4px",
              textShadow:"0 2px 28px rgba(22,163,74,.38)"}}>
              Plant Disease Detector
            </h1>
            <p style={{margin:"4px 0 0",fontSize:"0.83rem",color:"#02471b",fontWeight:400,letterSpacing:"0.02em"}}>
              AI-powered phytopathological diagnosis · Upload any plant photo
            </p>
          </div>
          {history.length>0&&(
            <div style={{marginLeft:"auto"}}>   
              <span style={{background:"rgba(22,163,74,.18)",border:"1px solid rgba(134,239,172,.28)",
                borderRadius:20,padding:"5px 16px",fontSize:"0.77rem",color:"#86efac",fontWeight:600}}>
                🔬 {history.length} scan{history.length>1?"s":""} this session
              </span>
            </div>
          )}
        </div>
      </div>

      {/* GRID */}
      <div className="dd-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",
        gap:22,maxWidth:1220,margin:"26px auto 0",padding:"0 20px"}}>

        {/* ══ LEFT COLUMN ══ */}
        <div style={{display:"flex",flexDirection:"column",gap:18}}>

          {/* Upload card */}
          <div style={{background:"#fff",borderRadius:24,padding:24,
            boxShadow:"0 12px 56px rgba(0,0,0,.35)",border:"1px solid rgba(134,239,172,.15)"}}>

            {/* header row */}
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:13}}>
              <span style={{fontSize:"0.7rem",fontWeight:700,color:"#6b7280",
                textTransform:"uppercase",letterSpacing:"0.1em"}}>📷 Upload Plant Photo</span>
              {fileName&&(
                <div style={{display:"flex",alignItems:"center",gap:5,background:"#f0fdf4",
                  border:"1px solid #bbf7d0",borderRadius:20,padding:"3px 10px",
                  fontSize:"0.68rem",color:"#15803d",fontWeight:600,maxWidth:200,overflow:"hidden"}}>
                  <span>📁</span>
                  <span style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{fileName}</span>
                  <span style={{background:"#bbf7d0",borderRadius:10,padding:"1px 7px",flexShrink:0}}>{fileSize}</span>
                </div>
              )}
            </div>

            {/* drop zone */}
            <div
              style={{
                border:dragging?"2.5px dashed #16a34a":"2.5px dashed #86efac",
                borderRadius:16,minHeight:272,
                display:"flex",alignItems:"center",justifyContent:"center",
                cursor:image?"default":"pointer",
                transition:"all .22s ease",
                background:dragging?"#f0fdf4":"#fafff8",
                transform:dragging?"scale(1.012)":"scale(1)",
                boxShadow:dragging?"0 0 0 5px #bbf7d0":"none",
                overflow:"hidden",position:"relative",
              }}
              onDragOver={onOver} onDragLeave={onLeave} onDrop={onDrop}
              onClick={()=>!image&&fileRef.current?.click()}
            >
              <input ref={fileRef} type="file" accept="image/*"
                onChange={onFile} style={{display:"none"}}/>

              {/* LASER SCAN OVERLAY */}
              {scanning&&image&&(
                <div style={{position:"absolute",inset:0,zIndex:10,
                  background:"rgba(4,18,8,.48)",borderRadius:14,overflow:"hidden"}}>
                  {/* beam */}
                  <div style={{position:"absolute",left:0,right:0,height:4,
                    background:"linear-gradient(90deg,transparent 0%,#22c55e 28%,#86efac 50%,#22c55e 72%,transparent 100%)",
                    boxShadow:"0 0 20px 6px rgba(34,197,94,.7)",
                    animation:"scan 1.05s linear infinite"}}/>
                  {/* corners */}
                  {[{top:10,left:10},{top:10,right:10},{bottom:10,left:10},{bottom:10,right:10}].map((pos,i)=>{
                    const isTop=pos.top!=null, isLeft=pos.left!=null;
                    return (
                      <div key={i} style={{position:"absolute",...pos,width:20,height:20,
                        borderTop:isTop?"2.5px solid #22c55e":"none",
                        borderBottom:!isTop?"2.5px solid #22c55e":"none",
                        borderLeft:isLeft?"2.5px solid #22c55e":"none",
                        borderRight:!isLeft?"2.5px solid #22c55e":"none"}}/>
                    );
                  })}
                  {/* dual spinner */}
                  <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",
                    alignItems:"center",justifyContent:"center",gap:14}}>
                    <div style={{position:"relative",width:56,height:56}}>
                      <div style={{position:"absolute",inset:0,border:"3.5px solid rgba(134,239,172,.2)",
                        borderTop:"3.5px solid #22c55e",borderRadius:"50%",animation:"spin .8s linear infinite"}}/>
                      <div style={{position:"absolute",inset:10,border:"2.5px solid transparent",
                        borderTop:"2.5px solid #86efac",borderRadius:"50%",animation:"spinR .5s linear infinite"}}/>
                    </div>
                    <p style={{color:"#86efac",fontSize:"0.76rem",fontWeight:700,margin:0,letterSpacing:"0.12em"}}>SCANNING</p>
                  </div>
                </div>
              )}

              {image?(
                <div style={{position:"relative",width:"100%"}}>
                  <img src={image} alt="preview"
                    onClick={(e)=>{e.stopPropagation();setLightbox(true);}}
                    title="Click to expand"
                    style={{width:"100%",maxHeight:292,objectFit:"cover",borderRadius:12,display:"block",cursor:"zoom-in"}}/>
                  <div style={{position:"absolute",bottom:10,left:10,background:"rgba(0,0,0,.55)",
                    color:"#fff",fontSize:"0.66rem",padding:"3px 9px",borderRadius:6,
                    backdropFilter:"blur(4px)",pointerEvents:"none"}}>🔍 Click to expand</div>
                  <button onClick={(e)=>{e.stopPropagation();reset();}} style={{
                    position:"absolute",top:10,right:10,background:"rgba(0,0,0,.60)",color:"#fff",
                    border:"none",borderRadius:8,padding:"5px 12px",cursor:"pointer",
                    fontSize:"0.74rem",backdropFilter:"blur(4px)",fontFamily:"DM Sans,sans-serif"}}>✕ Remove</button>
                </div>
              ):(
                <div style={{textAlign:"center",padding:28,pointerEvents:"none"}}>
                  <div style={{fontSize:56,marginBottom:14,animation:"float 3.6s ease-in-out infinite"}}>🍃</div>
                  <p style={{margin:"0 0 6px",fontSize:"1.02rem",fontWeight:600,color:"#15803d"}}>Drag &amp; drop a plant photo</p>
                  <p style={{margin:"0 0 14px",fontSize:"0.85rem",color:"#6b7280"}}>
                    or <span style={{color:"#16a34a",fontWeight:600}}>click to browse</span>
                  </p>
                  <span style={{fontSize:"0.69rem",color:"#9ca3af",background:"#f3f4f6",
                    borderRadius:6,padding:"4px 12px",fontFamily:"monospace"}}>
                    JPG · PNG · WEBP · GIF · up to 15 MB
                  </span>
                </div>
              )}
            </div>

            {/* analyze button */}
            {image&&(
              <button className="dd-analyze" onClick={analyze} disabled={loading} style={{
                marginTop:13,width:"100%",
                background:loading?"#d1d5db":"linear-gradient(135deg,#16a34a 0%,#166534 100%)",
                color:"#fff",border:"none",borderRadius:14,padding:"15px 20px",
                fontSize:"1rem",fontWeight:700,cursor:loading?"not-allowed":"pointer",
                display:"flex",alignItems:"center",justifyContent:"center",gap:10,
                transition:"all .2s ease",fontFamily:"DM Sans,sans-serif",letterSpacing:"0.02em",
                boxShadow:loading?"none":"0 4px 22px rgba(22,163,74,.38)",
              }}>
                {loading?(
                  <>
                    <span style={{width:18,height:18,display:"inline-block",
                      border:"2.5px solid rgba(255,255,255,.3)",borderTop:"2.5px solid #fff",
                      borderRadius:"50%",animation:"spin .7s linear infinite"}}/>
                    Analyzing…
                  </>
                ):"🔬 Detect Disease"}
              </button>
            )}

            {/* error */}
            {error&&(
              <div style={{marginTop:11,background:"#fef2f2",color:"#b91c1c",
                border:"1px solid #fecaca",borderRadius:12,padding:"12px 14px",
                display:"flex",alignItems:"flex-start",gap:10}}>
                <span style={{flexShrink:0}}>⚠️</span>
                <div style={{flex:1}}>
                  <p style={{margin:"0 0 2px",fontWeight:700,fontSize:"0.875rem"}}>Analysis Failed</p>
                  <p style={{margin:0,fontSize:"0.8rem",opacity:.9}}>{error}</p>
                </div>
                <button onClick={()=>setError("")} style={{background:"none",border:"none",
                  cursor:"pointer",color:"#b91c1c",fontSize:"1rem",padding:0,flexShrink:0}}>✕</button>
              </div>
            )}
          </div>

          {/* tips */}
          <div style={{background:"rgba(255,251,235,.95)",borderRadius:16,padding:"14px 17px",
            border:"1px solid #fde68a",boxShadow:"0 4px 20px rgba(0,0,0,.14)"}}>
            <p style={{margin:"0 0 9px",fontSize:"0.7rem",fontWeight:700,color:"#92400e",
              textTransform:"uppercase",letterSpacing:"0.09em"}}>📌 Tips for Best Results</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px 14px"}}>
              {["Close-up of a single leaf","Sharp focus, good lighting",
                "Show visible symptoms clearly","Avoid shadows or blur"].map((t,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:6,fontSize:"0.78rem",color:"#78350f"}}>
                  <span style={{width:5,height:5,borderRadius:"50%",background:"#d97706",flexShrink:0}}/>
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* HISTORY PANEL */}
          {history.length>0&&(
            <div style={{background:"#fff",borderRadius:16,overflow:"hidden",
              border:"1px solid rgba(134,239,172,.2)",boxShadow:"0 4px 22px rgba(0,0,0,.16)"}}>
              <button className="dd-tog" onClick={()=>setShowHist(v=>!v)} style={{
                display:"flex",alignItems:"center",justifyContent:"space-between",
                width:"100%",padding:"13px 16px",background:"transparent",border:"none",
                cursor:"pointer",transition:"background .15s",fontFamily:"DM Sans,sans-serif"}}>
                <span style={{fontSize:"0.71rem",fontWeight:700,color:"#374151",
                  textTransform:"uppercase",letterSpacing:"0.09em"}}>
                  🕘 Scan History ({history.length}/5)
                </span>
                <span style={{fontSize:"0.75rem",color:"#9ca3af",display:"inline-block",
                  transition:"transform .2s",transform:showHist?"rotate(180deg)":"rotate(0deg)"}}>▾</span>
              </button>
              {showHist&&(
                <div style={{padding:"4px 10px 12px",display:"flex",flexDirection:"column",gap:4,
                  animation:"fadeUp .2s ease"}}>
                  {history.map(e=>(
                    <HistRow key={e.id} entry={e} active={activeHist===e.id} onClick={()=>recall(e)}/>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ══ RIGHT COLUMN ══ */}
        <div style={{background:"#fff",borderRadius:24,padding:24,
          boxShadow:"0 12px 56px rgba(0,0,0,.35)",border:"1px solid rgba(134,239,172,.15)",
          display:"flex",flexDirection:"column",minHeight:520}}>

          <p style={{margin:"0 0 15px",fontSize:"0.7rem",fontWeight:700,color:"#6b7280",
            textTransform:"uppercase",letterSpacing:"0.1em"}}>📋 Diagnosis Report</p>

          {/* empty */}
          {!result&&!loading&&(
            <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",
              justifyContent:"center",textAlign:"center",padding:24,gap:14}}>
              <div style={{fontSize:66,opacity:.55,animation:"float 4s ease-in-out infinite"}}>🌱</div>
              <h3 style={{margin:0,fontSize:"1.12rem",fontWeight:700,color:"#374151",
                fontFamily:"'Playfair Display',serif"}}>Awaiting Analysis</h3>
              <p style={{margin:0,fontSize:"0.87rem",color:"#9ca3af",maxWidth:260,lineHeight:1.65}}>
                Upload a plant photo and click{" "}
                <strong style={{color:"#16a34a"}}>Detect Disease</strong>{" "}
                to get a full AI diagnosis.
              </p>
              <div style={{display:"flex",gap:7,flexWrap:"wrap",justifyContent:"center",marginTop:6}}>
                {["Early Blight","Powdery Mildew","Leaf Spot","Root Rot","Rust"].map(d=>(
                  <span key={d} style={{fontSize:"0.69rem",padding:"4px 11px",borderRadius:20,
                    background:"#f0fdf4",color:"#15803d",border:"1px solid #bbf7d0"}}>{d}</span>
                ))}
              </div>
            </div>
          )}

          {/* DUAL SPINNER LOADING */}
          {loading&&(
            <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",
              justifyContent:"center",textAlign:"center",padding:24,gap:18}}>
              <div style={{position:"relative",width:90,height:90}}>
                <div style={{position:"absolute",inset:0,border:"4.5px solid #f3f4f6",
                  borderTop:"4.5px solid #16a34a",borderRadius:"50%",animation:"spin .9s linear infinite"}}/>
                <div style={{position:"absolute",inset:14,border:"3px solid transparent",
                  borderTop:"3px solid #86efac",borderRadius:"50%",animation:"spinR .55s linear infinite"}}/>
                <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",
                  justifyContent:"center",fontSize:"1.7rem"}}>🔬</div>
              </div>
              <div>
                <h3 style={{margin:"0 0 6px",fontSize:"1.08rem",fontWeight:700,color:"#374151"}}>
                  Analyzing Image…</h3>
                <p style={{margin:0,fontSize:"0.84rem",color:"#9ca3af",minHeight:20,transition:"opacity .3s"}}>
                  {LOAD_STEPS[step]}
                </p>
              </div>
              <div style={{width:"70%",height:4,background:"#f3f4f6",borderRadius:4,overflow:"hidden"}}>
                <div style={{height:"100%",width:"38%",borderRadius:4,
                  background:"linear-gradient(90deg,#16a34a,#86efac,#16a34a)",
                  animation:"shimmer 1.75s ease infinite"}}/>
              </div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center"}}>
                {LOAD_STEPS.map((s,i)=>(
                  <span key={i} style={{
                    fontSize:"0.67rem",padding:"3px 10px",borderRadius:10,
                    fontFamily:"DM Sans,sans-serif",
                    background:i===step?"#f0fdf4":"#f9fafb",
                    color:i===step?"#15803d":"#9ca3af",
                    border:`1px solid ${i===step?"#86efac":"#e5e7eb"}`,
                    fontWeight:i===step?700:400,
                    transition:"all .3s ease",
                    animation:i===step?"chipPulse .9s ease infinite":"none",
                  }}>{s}</span>
                ))}
              </div>
            </div>
          )}

          {/* RESULT */}
          {result&&sev&&(
            <div style={{display:"flex",flexDirection:"column",gap:13,animation:"popIn .38s ease"}}>

              {/* HERO with SVG ARC */}
              <div style={{borderRadius:18,padding:"16px 17px",
                display:"flex",alignItems:"center",gap:16,
                background:result.isHealthy
                  ?"linear-gradient(135deg,#f0fdf4,#dcfce7)"
                  :"linear-gradient(135deg,#fffbeb,#fef3c7)",
                border:`1px solid ${sev.ring}`,
                boxShadow:`0 4px 24px ${sev.glow}`}}>
                <Arc pct={result.confidence} color={sev.arc} glow={sev.glow}/>
                <div style={{flex:1,minWidth:0}}>
                  <p style={{margin:"0 0 2px",fontSize:"0.68rem",fontWeight:600,color:"#9ca3af",
                    textTransform:"uppercase",letterSpacing:"0.07em",fontStyle:"italic"}}>
                    {result.scientificName||"Unknown species"}
                  </p>
                  <p style={{margin:"0 0 4px",fontSize:"0.87rem",fontWeight:700,color:"#374151"}}>
                    🌿 {result.plantName||"Plant"}
                  </p>
                  <h2 style={{margin:"0 0 10px",fontFamily:"'Playfair Display',Georgia,serif",
                    fontSize:"1.15rem",fontWeight:800,color:"#111827",lineHeight:1.25}}>
                    {result.diseaseName}
                  </h2>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    <Pill bg={sev.bg} color={sev.text} border={sev.ring}>
                      <span style={{width:6,height:6,borderRadius:"50%",background:sev.arc,flexShrink:0}}/>
                      {sev.label} severity
                    </Pill>
                    {!result.isHealthy&&sprd&&(
                      <Pill bg={sprd.bg} color={sprd.color} border={sprd.border}>
                        📡 {sprd.label}
                      </Pill>
                    )}
                    <Pill bg="#f0f9ff" color="#0369a1" border="#bae6fd">
                      📍 {result.affectedPart}
                    </Pill>
                  </div>
                </div>
              </div>

              {/* stats */}
              {!result.isHealthy&&(
                <div className="dd-st" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
                  {[
                    {icon:"⏰",label:"Urgency",val:result.urgency,bg:"#fff7ed",border:"#fed7aa",col:"#9a3412"},
                    {icon:"📊",label:"Est. Damage",val:result.estimatedDamage,bg:"#faf5ff",border:"#e9d5ff",col:"#6d28d9"},
                  ].map(({icon,label,val,bg,border,col})=>(
                    <div key={label} style={{background:bg,border:`1px solid ${border}`,borderRadius:12,padding:"11px 13px"}}>
                      <p style={{margin:"0 0 3px",fontSize:"0.67rem",fontWeight:700,color:col,
                        textTransform:"uppercase",letterSpacing:"0.07em"}}>{icon} {label}</p>
                      <p style={{margin:0,fontSize:"0.83rem",color:col,fontWeight:500,lineHeight:1.4}}>{val}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* expert note */}
              {result.notes&&(
                <div style={{background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:12,
                  padding:"11px 14px",display:"flex",gap:10,alignItems:"flex-start"}}>
                  <span style={{fontSize:"1rem",flexShrink:0}}>💡</span>
                  <p style={{margin:0,fontSize:"0.83rem",color:"#475569",lineHeight:1.55,fontStyle:"italic"}}>
                    {result.notes}
                  </p>
                </div>
              )}

              {/* TABS */}
              <div>
                <div style={{display:"flex",gap:4,background:"#f9fafb",borderRadius:13,padding:4,marginBottom:11}}>
                  {TABS.map((t,i)=>(
                    <button key={i} className="dd-tab" onClick={()=>setTab(i)} style={{
                      flex:1,padding:"8px 5px",borderRadius:10,border:"none",
                      background:tab===i?"#fff":"transparent",
                      color:tab===i?"#15803d":"#6b7280",
                      fontWeight:tab===i?700:500,fontSize:"0.79rem",cursor:"pointer",
                      boxShadow:tab===i?"0 1px 6px rgba(0,0,0,.09)":"none",
                      transition:"all .15s ease",fontFamily:"DM Sans,sans-serif",whiteSpace:"nowrap",
                    }}>{t.icon} {t.label}</button>
                  ))}
                </div>

                <div style={{animation:"fadeUp .22s ease"}}>
                  {tab===0&&<TList items={result.symptoms} icon="🔍"/>}
                  {tab===1&&(
                    <div style={{display:"flex",flexDirection:"column",gap:11}}>
                      <p style={{margin:"0 0 5px",fontSize:"0.68rem",fontWeight:700,color:"#15803d",
                        textTransform:"uppercase",letterSpacing:"0.08em"}}>🌿 Organic Treatments</p>
                      <TList items={result.organicTreatments} icon="🌿"/>
                      {result.chemicalTreatments?.length>0&&(
                        <>
                          <p style={{margin:"8px 0 5px",fontSize:"0.68rem",fontWeight:700,color:"#b45309",
                            textTransform:"uppercase",letterSpacing:"0.08em"}}>
                            ⚗️ Chemical Options{" "}
                            <span style={{fontSize:"0.62rem",fontWeight:400,color:"#9ca3af",
                              textTransform:"none",letterSpacing:0}}>(last resort only)</span>
                          </p>
                          <TList items={result.chemicalTreatments} icon="⚗️"/>
                        </>
                      )}
                    </div>
                  )}
                  {tab===2&&<TList items={result.preventionTips} icon="🛡️"/>}
                </div>
              </div>

              {/* ACTION BAR */}
              <div className="dd-act" style={{display:"flex",gap:8,marginTop:4}}>
                <button className="dd-copy" onClick={copyReport} style={{
                  flex:1,padding:"10px 8px",
                  background:copied?"#f0fdf4":"#eff6ff",
                  border:`1px solid ${copied?"#86efac":"#bfdbfe"}`,
                  borderRadius:11,cursor:"pointer",fontSize:"0.78rem",fontWeight:600,
                  color:copied?"#15803d":"#1d4ed8",
                  transition:"all .15s ease",fontFamily:"DM Sans,sans-serif",
                }}>{copied?"✅ Copied!":"📋 Copy Report"}</button>

                <button className="dd-prnt" onClick={()=>window.print()} style={{
                  flex:1,padding:"10px 8px",background:"#f9fafb",
                  border:"1px solid #e5e7eb",borderRadius:11,cursor:"pointer",
                  fontSize:"0.78rem",fontWeight:600,color:"#374151",
                  transition:"all .15s ease",fontFamily:"DM Sans,sans-serif",
                }}>🖨️ Print</button>

                <button className="dd-new" onClick={reset} style={{
                  flex:1,padding:"10px 8px",background:"transparent",
                  border:"2px solid #86efac",borderRadius:11,cursor:"pointer",
                  fontSize:"0.78rem",fontWeight:700,color:"#15803d",
                  transition:"all .15s ease",fontFamily:"DM Sans,sans-serif",
                }}>↩ New Scan</button>
              </div>

            </div>
          )}
        </div>
        {/* end right */}

      </div>
      {/* end grid */}

    </div>
  );
}

