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
    // Categorías del mapa
    health: <><path d="M10 4h4v6h6v4h-6v6h-4v-6H4v-4h6z" {...S} /></>,
    school: <><path d="M12 4L2 9l10 5 10-5-10-5z" {...S} /><path d="M6 11.5V16c0 1.2 2.7 2.5 6 2.5s6-1.3 6-2.5v-4.5" {...S} /><path d="M22 9.2v5" {...S} /></>,
    culture: <><path d="M5 5h14v6a7 7 0 01-14 0V5z" {...S} /><path d="M9.5 9h0M14.5 9h0" {...S} /><path d="M9 13c1.2 1 4.8 1 6 0" {...S} /></>,
    landmark: <><path d="M3 9l9-5 9 5" {...S} /><path d="M5 9.5v8.5M9.5 9.5v8.5M14.5 9.5v8.5M19 9.5v8.5" {...S} /><path d="M3 21h18" {...S} /></>,
    mountain: <><path d="M3 19l6-10 4 6 2.5-4L21 19H3z" {...S} /><circle cx="17" cy="6.5" r="1.6" {...S} /></>,
    cloudRain: <><path d="M7 15a4 4 0 01.5-8 5 5 0 019.7 1.3A3.4 3.4 0 0117 15H7z" {...S} /><path d="M8 18l-1 2M12 18l-1 2M16 18l-1 2" {...S} /></>,
    leaf: <><path d="M4 20C3 12 8 5 20 4c1 12-6 17-14 15z" {...S} /><path d="M4 20c4-6 8-9 13-11" {...S} /></>,
    book: <><path d="M12 6.5C10 5 6.5 5 4.5 5.6v12.2c2-.6 5.5-.6 7.5.9 2-1.5 5.5-1.5 7.5-.9V5.6C17.5 5 14 5 12 6.5z" {...S} /><path d="M12 6.5v13" {...S} /></>,
    tree: <><path d="M12 3l4.5 6.5h-2.5l4 5.5H6l4-5.5H7.5z" {...S} /><path d="M12 15.5V21" {...S} /></>,
    flag: <><path d="M5 21V4" {...S} /><path d="M5 4.5h12l-2.2 3.5L17 11.5H5" {...S} /></>,
    calendar: <><rect x="4" y="5" width="16" height="15" rx="2" {...S} /><path d="M8 3v4M16 3v4M4 10h16" {...S} /></>,
    idCard: <><rect x="3" y="5" width="18" height="14" rx="2.2" {...S} /><circle cx="8.5" cy="11" r="2.2" {...S} /><path d="M5.2 16c.6-1.5 2-2.3 3.3-2.3s2.7.8 3.3 2.3" {...S} /><path d="M14.5 9.5h3.5M14.5 12.5h3.5M14.5 15.5h2.2" {...S} /></>,
    external: <><path d="M14 4h6v6" {...S} /><path d="M20 4l-8 8" {...S} /><path d="M19 14v4.5A1.5 1.5 0 0117.5 20h-11A1.5 1.5 0 015 18.5v-11A1.5 1.5 0 016.5 6H11" {...S} /></>,
    megaphone: <><path d="M3 10.5v3a1 1 0 001 1h2.5l6 4V5.5l-6 4H4a1 1 0 00-1 1z" {...S} /><path d="M16.5 9.5a4 4 0 010 5" {...S} /><path d="M8.5 15v3.5a1.5 1.5 0 003 0V15" {...S} /></>,
    send: <><path d="M21 4L3 11l7 2 2 7 9-16z" {...S} /><path d="M10 13l4-4" {...S} /></>,
    bell: <><path d="M6 9a6 6 0 1112 0c0 4.5 2 5.5 2 5.5H4S6 13.5 6 9z" {...S} /><path d="M10 19a2 2 0 004 0" {...S} /></>,
    thumbsUp: <><path d="M7 10.5V20H4.5a.5.5 0 01-.5-.5v-9a.5.5 0 01.5-.5H7z" {...S} /><path d="M7 10.5l3.5-6.2a1.8 1.8 0 013.4 1.2L13 9h5.2a1.8 1.8 0 011.77 2.13l-1.1 6A1.8 1.8 0 0117.1 20H7" {...S} /></>,
    comment: <path d="M21 11.5a7.5 7.5 0 01-10.7 6.8L4 20l1.7-5.3A7.5 7.5 0 1121 11.5z" {...S} />,
    share: <><circle cx="6" cy="12" r="2.2" {...S} /><circle cx="17" cy="6" r="2.2" {...S} /><circle cx="17" cy="18" r="2.2" {...S} /><path d="M8 11l7-4M8 13l7 4" {...S} /></>,
  };
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...props}>
      {paths[name] || null}
    </svg>
  );
};

export default Icon;
