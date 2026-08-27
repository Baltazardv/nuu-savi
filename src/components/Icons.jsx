// Íconos SVG reutilizables (trazo simple, heredan currentColor).
const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };

export const Icon = ({ name, size = 24, ...props }) => {
  const paths = {
    people: <><circle cx="9" cy="8" r="3" {...S} /><circle cx="17" cy="9" r="2.3" {...S} /><path d="M3.5 19c.6-3 3-4.5 5.5-4.5S13.9 16 14.5 19M15 14.6c2 .2 3.8 1.6 4.3 4.4" {...S} /></>,
    compass: <><circle cx="12" cy="12" r="9" {...S} /><path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" {...S} /></>,
    spark: <path d="M12 3l2.1 5.3L19.5 10l-5.4 1.7L12 17l-2.1-5.3L4.5 10l5.4-1.7L12 3z" {...S} />,
    building: <><path d="M5 21V6l7-3 7 3v15" {...S} /><path d="M3 21h18M9 9h0M12 9h0M15 9h0M9 13h0M12 13h0M15 13h0M10 21v-4h4v4" {...S} /></>,
    hands: <path d="M8 13V6.5a1.5 1.5 0 013 0V12m0-1v-.5a1.5 1.5 0 013 0V12m0-.5a1.5 1.5 0 013 0V15c0 3.3-2.7 6-6 6h-1.2a5 5 0 01-3.8-1.8L6 17s-1.5-2-2-3c-.4-.9.5-2 1.5-1.5L8 14" {...S} />,
    phone: <path d="M6.6 10.8a15.5 15.5 0 006.6 6.6l2.2-2.2a1 1 0 011-.24 11.4 11.4 0 003.6.58 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.58 3.6a1 1 0 01-.24 1l-2.24 2.2z" fill="currentColor" stroke="none" />,
    search: <><circle cx="11" cy="11" r="7" {...S} /><path d="M20 20l-3.5-3.5" {...S} /></>,
    arrowRight: <path d="M5 12h14m-6-6l6 6-6 6" {...S} />,
    chevronLeft: <path d="M15 5l-7 7 7 7" {...S} />,
    chevronRight: <path d="M9 5l7 7-7 7" {...S} />,
    marker: <><path d="M12 21s7-6.3 7-11a7 7 0 10-14 0c0 4.7 7 11 7 11z" {...S} /><circle cx="12" cy="10" r="2.4" {...S} /></>,
    facebook: <path d="M14 8.5h2.2V5.6C15.8 5.5 14.9 5.4 14 5.4c-2 0-3.4 1.2-3.4 3.5v1.9H8v2.9h2.6V21h3v-7.3h2.5l.4-2.9h-2.9V9.2c0-.5.4-.7 1.4-.7z" fill="currentColor" stroke="none" />,
    youtube: <><rect x="3" y="6" width="18" height="12" rx="3.2" {...S} /><path d="M10.5 9.5v5l4-2.5-4-2.5z" fill="currentColor" stroke="none" /></>,
    doc: <><path d="M6 3h9l4 4v14a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z" {...S} /><path d="M14 3v5h5M8 13h8M8 16h6" {...S} /></>,
    download: <path d="M12 3v11m0 0l-4-4m4 4l4-4M5 19h14" {...S} />,
    check: <path d="M5 12l4 4L19 6" {...S} />,
    map: <path d="M9 4L3 6.5v13L9 17l6 2.5 6-2.5v-13L15 6.5 9 4zm0 0v13m6-10.5v13" {...S} />,
    shield: <><path d="M12 3l8 3.5V12c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6.5L12 3z" {...S} /><path d="M9 12l2 2 4-4" {...S} /></>,
    info: <><circle cx="12" cy="12" r="9" {...S} /><path d="M12 11v5M12 8h0" {...S} /></>,
  };
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...props}>
      {paths[name] || null}
    </svg>
  );
};

export default Icon;
