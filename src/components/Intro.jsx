import { useEffect, useRef, useState } from "react";

// Intro de video que se reproduce al entrar y hace fade al sitio.
// Solo una vez por sesión (sessionStorage). Botón "Saltar" y fallback "Entrar".
export default function Intro() {
  const seen = typeof window !== "undefined" && sessionStorage.getItem("nuusavi_intro") === "1";
  const [hidden, setHidden] = useState(seen);
  const [removed, setRemoved] = useState(seen);
  const [showEnter, setShowEnter] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (seen) return;
    document.body.classList.add("intro-lock");
    const video = videoRef.current;
    if (!video) return;

    const end = () => {
      setHidden(true);
      document.body.classList.remove("intro-lock");
      sessionStorage.setItem("nuusavi_intro", "1");
      window.setTimeout(() => setRemoved(true), 950);
    };

    const onTime = () => {
      if (video.duration) setProgress((video.currentTime / video.duration) * 100);
    };
    const onPlaying = () => {
      startedRef.current = true;
      setShowEnter(false);
    };

    const attemptPlay = () => {
      const p = video.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    video.addEventListener("timeupdate", onTime);
    video.addEventListener("playing", onPlaying);
    video.addEventListener("ended", end);
    video.addEventListener("error", end);
    video.addEventListener("canplay", attemptPlay, { once: true });
    attemptPlay();

    const fallbackTimer = window.setTimeout(() => {
      if (!startedRef.current) setShowEnter(true);
    }, 1500);
    const safety = window.setTimeout(end, 12000);

    return () => {
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("ended", end);
      video.removeEventListener("error", end);
      window.clearTimeout(fallbackTimer);
      window.clearTimeout(safety);
      document.body.classList.remove("intro-lock");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (removed) return null;

  const finish = () => {
    setHidden(true);
    document.body.classList.remove("intro-lock");
    sessionStorage.setItem("nuusavi_intro", "1");
    window.setTimeout(() => setRemoved(true), 950);
  };

  return (
    <div className={`intro${hidden ? " is-hidden" : ""}`} aria-hidden="true">
      <div className="intro__inner">
        <video ref={videoRef} className="intro__video" autoPlay muted playsInline preload="auto">
          <source src="/assets/intro.mp4" type="video/mp4" />
        </video>
      </div>

      {showEnter && (
        <button className="intro__enter" type="button" onClick={() => { setShowEnter(false); videoRef.current && videoRef.current.play().catch(() => {}); }}>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
          Entrar al sitio
        </button>
      )}

      <button className="intro__skip" type="button" onClick={finish}>
        Saltar intro
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M5 4l10 8-10 8V4zm12 0h2v16h-2V4z" fill="currentColor" /></svg>
      </button>

      <div className="intro__progress"><span style={{ width: progress + "%" }} /></div>
    </div>
  );
}
