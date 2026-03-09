import { useState, useRef, useCallback, useEffect } from "react";


const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
// ─── CONFIG ───────────────────────────────────────────────────────────────────
const SEV_MAP = {
  none:     { label:"Healthy",  arc:"#14b714", bg:"#f0f8e6", text:"#0e8e0e", ring:"#14b714", glow:"rgba(20,183,20,0.28)"  },
  low:      { label:"Low",      arc:"#14b714", bg:"#f0f8e6", text:"#0e8e0e", ring:"#14b714", glow:"rgba(20,183,20,0.25)" },
  moderate: { label:"Moderate", arc:"#f59e0b", bg:"#fef3c7", text:"#b45309", ring:"#fcd34d", glow:"rgba(245,158,11,0.25)" },
  high:     { label:"High",     arc:"#ef4444", bg:"#fee2e2", text:"#b91c1c", ring:"#fca5a5", glow:"rgba(239,68,68,0.25)"  },
};
const SPREAD_MAP = {
  low:      { label:"Low Spread Risk",      color:"#0e8e0e", bg:"#f0f8e6", border:"#14b714" },
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
  .dd-analyze:hover:not(:disabled){ transform:translateY(-2px)!important; box-shadow:0 12px 38px rgba(20,183,20,.58)!important; }
  .dd-tab:hover   { background:#f0f8e6!important; color:#0e8e0e!important; }
  .dd-hist:hover  { background:#f0f8e6!important; border-color:#14b714!important; }
  .dd-tog:hover   { background:#f9fafb!important; }
  .dd-copy:hover  { background:#eff6ff!important; }
  .dd-prnt:hover  { background:#f0f0f0!important; }
  .dd-new:hover   { background:#f0f8e6!important; }
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
        <span className="text-xl font-extrabold text-gray-900 dark:text-white" style={{lineHeight:1}}>{pct}%</span>
        <span className="text-xs text-green-700 dark:text-green-300 uppercase tracking-wider" style={{marginTop:2}}>confidence</span>
      </div>
    </div>
  );
};

const Pill = ({children,bg,color,border}) => (
  <span style={{display:"inline-flex",alignItems:"center",gap:5,padding:"3px 11px",
    borderRadius:20,fontSize:"0.71rem",fontWeight:600,
    background:bg,color,border:`1px solid ${border||bg}`}}>{children}</span>
);

const TItem = ({icon,text,delay=0}) => (
  <li className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 transition-colors duration-200" 
    style={{animation:`fadeUp .28s ease ${delay}s both`}}>
    <span className="text-sm flex-shrink-0 mt-0.5">{icon}</span>
    <span className="text-sm text-[#111811] dark:text-gray-200 leading-relaxed">{text}</span>
  </li>
);

const TList = ({items=[],icon}) => (
  <ul className="list-none space-y-2 m-0 p-0">
    {items.map((t,i)=><TItem key={i} text={t} icon={icon} delay={i*0.065}/>)}
  </ul>
);

const HistRow = ({entry,active,onClick}) => {
  const s = SEV_MAP[entry.result?.severity]||SEV_MAP.low;
  return (
    <button className="dd-hist w-full text-left p-2 rounded-lg transition-colors duration-200 hover:bg-[#f0f8e6] dark:hover:bg-gray-700" 
      onClick={onClick} 
      style={{
        background:active?"#f0f8e6":"transparent",
        border:`1px solid ${active?"#14b714":"transparent"}`,
      }}>
      <div className="flex items-center gap-3">
        <img src={entry.thumb} alt="" className="w-10 h-10 rounded-lg object-cover border-2 border-gray-200 dark:border-gray-600 flex-shrink-0"/>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-[#111811] dark:text-white truncate">
            {entry.result.diseaseName}
          </p>
          <p className="text-xs text-[#618961] dark:text-gray-400">
            {entry.result.plantName||"Unknown"} · {entry.time}
          </p>
        </div>
        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{background:s.arc}}/>
      </div>
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

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

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

  // recall function to load previous scan results
  const recall = (entry) => {
    setActiveHist(entry.id);
    setImage(entry.thumb);
    setResult(entry.result);
    setTab(0);
    setError("");
  };

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
- confidence: Percentage (0-100) based on:
  * Image quality and clarity (higher = more confident)
  * Symptom visibility and distinctiveness (clear symptoms = higher confidence)
  * Lighting and focus (good lighting = higher confidence)
  * Disease identification certainty (common diseases = higher confidence)
  * Examples: blurry image = 45-65%, clear symptoms = 80-95%, perfect conditions = 90-98%
- If plant is healthy:
  diseaseName = "No Disease Detected"
  severity = "none"  
  spreadRisk = "low"
`;



  try {

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
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

    // Check for HTTP errors
    if (!res.ok) {
      if (res.status === 401) {
        throw new Error("API authentication failed. Please check your API key.");
      } else if (res.status === 429) {
        throw new Error("Rate limit exceeded. Please try again in a moment.");
      } else if (res.status === 500) {
        throw new Error("Server error. Please try again later.");
      } else {
        throw new Error(`API request failed with status ${res.status}`);
      }
    }

    const data = await res.json();

   const content = data?.choices?.[0]?.message?.content;

const raw =
  typeof content === "string"
    ? content
    : content?.map(c => c.text || "").join("") || "";

    if (!raw) {
      console.warn("API Response:", data);
      throw new Error("No content received from AI. Please try again.");
    }

    const clean = raw.replace(/```json|```/gi, "").trim();

    if (!clean) {
      throw new Error("Empty response after cleaning. Please try again.");
    }

    let parsed;
    try {
      parsed = JSON.parse(clean);
    } catch (parseError) {
      console.warn("Failed to parse JSON:", clean);
      throw new Error("Invalid response format from AI. Please try again.");
    }

    if (!parsed || typeof parsed !== 'object') {
      throw new Error("Invalid analysis result. Please try again.");
    }

    // Ensure confidence is within valid range (0-100)
    if (parsed.confidence) {
      if (parsed.confidence <= 1) {
        // Convert decimal to percentage if needed
        parsed.confidence = Math.round(parsed.confidence * 100);
      } else if (parsed.confidence > 100) {
        // Cap at 100% if somehow above
        parsed.confidence = 100;
      } else {
        // Round to whole number
        parsed.confidence = Math.round(parsed.confidence);
      }
    }

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

    console.error("Analysis Error:", err);

    let errorMessage = "Analysis failed. Please try again.";
    
    if (err.message?.includes("authentication")) {
      errorMessage = "Authentication failed. The API key may be invalid or expired.";
    } else if (err.message?.includes("Rate limit")) {
      errorMessage = "Too many requests. Please wait a moment and try again.";
    } else if (err.message?.includes("Server error")) {
      errorMessage = "Server temporarily unavailable. Please try again later.";
    } else if (err.message?.includes("JSON") || err.message?.includes("parse")) {
      errorMessage = "AI returned unexpected format. Please try again.";
    } else if (err.message?.includes("No content")) {
      errorMessage = "No response from AI service. Please try again.";
    } else if (err.name === "TypeError" && err.message?.includes("fetch")) {
      errorMessage = "Network error. Please check your internet connection.";
    }

    setError(errorMessage);

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
    <>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200" style={{paddingBottom:60}}>

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
            fontSize:"0.75rem",letterSpacing:"0.05em"}}>
            Press ESC or click to close
          </p>
        </div>
      )}

      {/* HEADER */}
      <div className="bg-[#14b714] dark:bg-gray-800 transition-colors duration-200" style={{borderBottom:"1px solid rgba(20,183,20,0.2)",
        padding:"22px 28px"}}>
        <div style={{maxWidth:1220,margin:"0 auto",display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
          <div style={{width:54,height:54,borderRadius:16,flexShrink:0,
            background:"linear-gradient(135deg,#0e8e0e,#14b714)",
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.75rem",
            boxShadow:"0 6px 28px rgba(20,183,20,.38)",animation:"float 3.6s ease-in-out infinite"}}>🌿</div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Plant Disease Detector
            </h1>
            <p className="text-green-100 text-sm">
              AI-powered phytopathological diagnosis · Upload any plant photo
            </p>
          </div>
          {history.length>0&&(
            <div style={{marginLeft:"auto"}}>   
              <span className="bg-green-100 dark:bg-gray-700 border border-green-200 dark:border-gray-600 rounded-full px-3 py-1 text-xs font-semibold text-green-800 dark:text-green-300 transition-colors duration-200">
                🔬 {history.length} scan{history.length>1?"s":""} this session
              </span>
            </div>
          )}
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto mt-6 px-5">

        {/* ══ LEFT COLUMN ══ */}
        <div className="space-y-5">

          {/* Upload card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-200">

            {/* header row */}
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:13}}>
              <span className="text-xs font-bold text-[#618961] dark:text-gray-400 uppercase tracking-wider transition-colors duration-200">📷 Upload Plant Photo</span>
              {fileName&&(
                <div className="flex items-center gap-2 bg-[#f0f8e6] dark:bg-gray-700 border border-[#14b714] dark:border-gray-600 rounded-full px-3 py-1 text-xs text-[#0e8e0e] dark:text-green-300 font-semibold max-w-48 overflow-hidden transition-colors duration-200">
                  <span>📁</span>
                  <span style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{fileName}</span>
                  <span className="bg-[#14b714] dark:bg-gray-600 text-white rounded-lg px-2 py-0.5 text-xs flex-shrink-0">{fileSize}</span>
                </div>
              )}
            </div>

            {/* drop zone */}
            <div
              className={`${
                dragging 
                  ? "border-green-500 bg-green-50 dark:bg-green-900/20 shadow-green-200 dark:shadow-green-800" 
                  : "border-green-200 bg-green-25 dark:bg-gray-800/50"
              } hover:border-green-300 dark:hover:border-green-600 transition-all duration-300`}
              style={{
                border: dragging ? "2.5px dashed" : "2.5px dashed",
                borderRadius: 16,
                minHeight: 272,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: image ? "default" : "pointer",
                transform: dragging ? "scale(1.012)" : "scale(1)",
                boxShadow: dragging ? "0 0 0 5px rgba(187, 247, 208, 0.3)" : "none",
                overflow: "hidden",
                position: "relative",
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
                    <p className="text-green-300 dark:text-green-400 text-xs font-bold m-0 tracking-wider">SCANNING</p>
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
                  <p className="text-green-700 dark:text-green-300 mb-1.5 text-lg font-semibold transition-colors duration-200">Drag &amp; drop a plant photo</p>
                  <p className="text-gray-600 dark:text-gray-400 mb-3.5 text-sm transition-colors duration-200">
                    or <span className="text-green-600 dark:text-green-400 font-semibold">click to browse</span>
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 transition-colors duration-200"
                    style={{borderRadius:6,padding:"4px 12px",fontFamily:"monospace"}}>
                    JPG · PNG · WEBP · GIF · up to 15 MB
                  </span>
                </div>
              )}
            </div>

            {/* analyze button */}
            {image&&(
              <button className="dd-analyze w-full mt-4 bg-[#14b714] hover:bg-[#0e8e0e] disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-3" 
                onClick={analyze} disabled={loading} 
                style={{
                  cursor:loading?"not-allowed":"pointer",
                  boxShadow:loading?"none":"0 4px 22px rgba(20,183,20,.38)",
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
              <div className="mt-4 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800 rounded-lg p-3 transition-colors duration-200">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0">⚠️</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm mb-1">Analysis Failed</p>
                    <p className="text-sm opacity-90">{error}</p>
                  </div>
                  <button onClick={()=>setError("")} className="flex-shrink-0 text-red-800 dark:text-red-300 hover:text-red-600 dark:hover:text-red-200 transition-colors">✕</button>
                </div>
              </div>
            )}
          </div>

          {/* tips */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 transition-colors duration-200">
            <p className="text-xs font-bold text-yellow-800 dark:text-yellow-300 uppercase tracking-wider mb-3">📌 Tips for Best Results</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {["Close-up of a single leaf","Sharp focus, good lighting",
                "Show visible symptoms clearly","Avoid shadows or blur"].map((t,i)=>(
                <div key={i} className="flex items-center gap-2 text-sm text-yellow-800 dark:text-yellow-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-600 dark:bg-yellow-400 flex-shrink-0"/>
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* HISTORY PANEL */}
          {history.length>0&&(
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors duration-200">
              <button className="dd-tog flex items-center justify-between w-full p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200" 
                onClick={()=>setShowHist(v=>!v)}>
                <span className="text-xs font-bold text-[#111811] dark:text-gray-300 uppercase tracking-wider">
                  🕘 Scan History ({history.length}/5)
                </span>
                <span className="text-gray-500 dark:text-gray-400 transform transition-transform duration-200" 
                  style={{transform:showHist?"rotate(180deg)":"rotate(0deg)"}}>▾</span>
              </button>
              {showHist&&(
                <div className="p-2 space-y-2" style={{animation:"fadeUp .2s ease"}}>
                  {history.map(e=>(
                    <HistRow key={e.id} entry={e} active={activeHist===e.id} onClick={()=>recall(e)}/>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ══ RIGHT COLUMN ══ */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 min-h-[520px] flex flex-col transition-colors duration-200">

          <p className="text-xs font-bold text-[#618961] dark:text-gray-400 uppercase tracking-wider mb-4">📋 Diagnosis Report</p>

          {/* empty */}
          {!result&&!loading&&(
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="text-6xl opacity-60" style={{animation:"float 4s ease-in-out infinite"}}>🌱</div>
              <h3 className="text-lg font-bold text-[#111811] dark:text-white">Awaiting Analysis</h3>
              <p className="text-sm text-[#618961] dark:text-gray-400 max-w-64 leading-relaxed">
                Upload a plant photo and click{" "}
                <strong className="text-[#14b714]">Detect Disease</strong>{" "}
                to get a full AI diagnosis.
              </p>
              <div className="flex flex-wrap gap-2 justify-center mt-2">
                {["Early Blight","Powdery Mildew","Leaf Spot","Root Rot","Rust"].map(d=>(
                  <span key={d} className="text-xs px-3 py-1 rounded-full bg-green-50 dark:bg-gray-700 text-green-700 dark:text-green-300 border border-green-300 dark:border-gray-600">{d}</span>
                ))}
              </div>
            </div>
          )}

          {/* DUAL SPINNER LOADING */}
          {loading&&(
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-5">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-4 border-gray-200 dark:border-gray-700 border-t-[#14b714] rounded-full animate-spin"/>
                <div className="absolute inset-3 border-2 border-transparent border-t-green-400 rounded-full" style={{animation:"spinR .55s linear infinite"}}/>
                <div className="absolute inset-0 flex items-center justify-center text-xl">🔬</div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#111811] dark:text-white mb-2">Analyzing Image…</h3>
                <p className="text-sm text-[#618961] dark:text-gray-400 min-h-5 transition-opacity">{LOAD_STEPS[step]}</p>
              </div>
              <div className="w-3/4 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full w-2/5 rounded-full bg-gradient-to-r from-[#14b714] via-green-400 to-[#14b714]" 
                  style={{animation:"shimmer 1.75s ease infinite"}}/>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {LOAD_STEPS.map((s,i)=>(
                  <span key={i} className={`text-xs px-2 py-1 rounded-lg transition-all ${
                    i===step 
                      ? "bg-green-50 dark:bg-gray-700 text-green-700 dark:text-green-300 border border-green-300 dark:border-gray-600 font-semibold" 
                      : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                  }`} style={{animation:i===step?"chipPulse .9s ease infinite":"none"}}>
                    {s}
                  </span>
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
                  <p className="text-xs font-semibold text-green-700 dark:text-gray-400 uppercase tracking-wide italic mb-1">
                    {result.scientificName||"Unknown species"}
                  </p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                    🌿 {result.plantName||"Plant"}
                  </p>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 leading-tight">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    {icon:"⏰",label:"Urgency",val:result.urgency,bg:"#fff7ed",border:"#fed7aa",col:"#9a3412"},
                    {icon:"📊",label:"Est. Damage",val:result.estimatedDamage,bg:"#faf5ff",border:"#e9d5ff",col:"#6d28d9"},
                  ].map(({icon,label,val,bg,border,col})=>(
                    <div key={label} className="p-3 rounded-lg border transition-colors duration-200 dark:bg-gray-700 dark:border-gray-600" 
                      style={{background:bg,borderColor:border}}>
                      <p className="text-xs font-bold uppercase tracking-wide mb-1 text-gray-800 dark:text-gray-300">
                        {icon} {label}
                      </p>
                      <p className="text-sm font-medium leading-snug text-gray-800 dark:text-gray-200">{val}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* expert note */}
              {result.notes&&(
                <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3 flex gap-3 items-start transition-colors duration-200">
                  <span className="text-base flex-shrink-0">💡</span>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed italic">{result.notes}</p>
                </div>
              )}

              {/* TABS */}
              <div>
                <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1 mb-4 transition-colors duration-200">
                  {TABS.map((t,i)=>(
                    <button key={i} className={`dd-tab flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                      tab===i 
                        ? "bg-white dark:bg-gray-600 text-green-700 dark:text-green-300 font-bold shadow-sm" 
                        : "bg-transparent text-gray-600 dark:text-gray-400 font-medium hover:bg-green-50 dark:hover:bg-gray-600"
                    }`} 
                      onClick={()=>setTab(i)}>{t.icon} {t.label}</button>
                  ))}
                </div>

                <div style={{animation:"fadeUp .22s ease"}}>
                  {tab===0&&<TList items={result.symptoms} icon="🔍"/>}
                  {tab===1&&(
                    <div className="space-y-4">
                      <p className="text-xs font-bold text-green-700 dark:text-green-400 uppercase tracking-wide">
                        🌿 Organic Treatments
                      </p>
                      <TList items={result.organicTreatments} icon="🌿"/>
                      {result.chemicalTreatments?.length>0&&(
                        <>
                          <p className="text-xs font-bold text-yellow-700 dark:text-yellow-400 uppercase tracking-wide">
                            ⚗️ Chemical Options{" "}
                            <span className="text-xs font-normal text-gray-500 dark:text-gray-400 normal-case">
                              (last resort only)
                            </span>
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
              <div className="flex flex-col md:flex-row gap-2 mt-4">
                <button className="dd-copy flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-colors duration-200" 
                  onClick={copyReport} 
                  style={{
                    background:copied?"#f0f8e6":"#eff6ff",
                    border:`1px solid ${copied?"#14b714":"#bfdbfe"}`,
                    color:copied?"#0e8e0e":"#1d4ed8",
                  }}>{copied?"✅ Copied!":"📋 Copy Report"}</button>

                <button className="dd-prnt flex-1 py-2 px-4 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200" 
                  onClick={()=>window.print()}>🖨️ Print</button>

                <button className="dd-new flex-1 py-2 px-4 bg-transparent border-2 border-[#14b714] dark:border-green-500 rounded-lg text-sm font-bold text-[#0e8e0e] dark:text-green-400 hover:bg-[#f0f8e6] dark:hover:bg-gray-800 transition-colors duration-200" 
                  onClick={reset}>↩ New Scan</button>
              </div>

            </div>
          )}
        </div>
        {/* end right */}

      </div>
      {/* end grid */}

      </div>

    </>
  );
}
