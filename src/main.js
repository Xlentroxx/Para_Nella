import { wrappedData } from "./data.js";

const app = document.querySelector("#app");

if (!app) {
  throw new Error("No se encontró el contenedor #app en index.html");
}

function createFloatingBackground() {
  if (document.querySelector("#floating-bg")) return;
  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const container = document.createElement("div");
  container.id = "floating-bg";
  container.setAttribute("aria-hidden", "true");
  if (!reduceMotion) {
    const symbols = ["✦", "✧", "✶", "❀", "·"];
    const count = 16;
    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.className = "float-item";
      el.textContent = symbols[i % symbols.length];
      const left = Math.random() * 100;
      const size = 9 + Math.random() * 12; // px (slightly smaller/delicate)
      const duration = 11 + Math.random() * 14; // s
      const delay = Math.random() * 6; // s (0–6s) para que haya elementos cayendo constantemente
      el.style.left = `${left}%`;
      el.style.fontSize = `${size}px`;
      el.style.animationDuration = `${duration}s`;
      el.style.animationDelay = `-${delay}s`;
      // Colores claros/románticos visibles
      const tone = i % 4;
      if (tone === 0) el.style.color = "rgba(255,255,255,0.75)";
      else if (tone === 1) el.style.color = "rgba(255,230,240,0.8)";
      else if (tone === 2) el.style.color = "rgba(255,215,160,0.75)";
      else el.style.color = "rgba(255,230,240,0.8)";
      container.appendChild(el);
    }
  }
  document.body.prepend(container);
}

const intro = wrappedData.intro;
const durationMs = Number(intro?.simulatedLoadMs) || 3200;

createFloatingBackground();

function buildUI() {
  const photoSrc = intro?.photoSrc || "";
  const photoAlt = intro?.photoAlt || "Foto";
  const line1 = intro?.loadingLines?.line1 || "";
  const line2 = intro?.loadingLines?.line2 || "";
  const btnLabel = intro?.startButton?.label || "Descubrir nuestro año";
  const btnAria = intro?.startButton?.ariaLabel || btnLabel;

  const welcome = wrappedData?.welcome || {};
  const welcomePhotoSrc = welcome?.photoSrc || "";
  const welcomePhotoAlt = welcome?.photoAlt || "Foto de Nella y David";
  const welcomeHeadline = welcome?.headline || "";
  const welcomeSubtitle = welcome?.subtitle || "";

  const liveCounter = wrappedData?.stats?.liveCounter || {};
  const liveTitle = liveCounter?.title || "Nuestro tiempo juntos";
  const liveLabel = liveCounter?.liveLabel || "";

  const playlist = wrappedData?.playlist || {};
  const playlistTitle = playlist?.title || "Playlist";
  const tracks = Array.isArray(playlist?.tracks) ? playlist.tracks : [];

  const tracksHtml = tracks.map((t) => {
    const tTitle = t?.title || "";
    const tArtist = t?.artist || "";
    const tNote = t?.note || "";
    const urlRaw = typeof t?.spotifyUrl === "string" ? t.spotifyUrl.trim() : "";
    const isPending = !urlRaw || urlRaw.toUpperCase() === "PENDIENTE";
    const linkHtml = isPending
      ? `<span class="track-link-pending">Link pendiente</span>`
      : `<a class="track-link" href="${escapeHtml(urlRaw)}" target="_blank" rel="noopener noreferrer">Abrir Spotify</a>`;
    return `
      <li class="track-item">
        <div class="track-main">
          <p class="track-title">${escapeHtml(tTitle)}</p>
          <p class="track-artist">${escapeHtml(tArtist)}</p>
          ${tNote ? `<p class="track-note">${escapeHtml(tNote)}</p>` : ""}
        </div>
        <div class="track-link-wrap">${linkHtml}</div>
      </li>
    `;
  }).join("");

  // T8: photoAlbum
  const photoAlbum = wrappedData?.photoAlbum || {};
  const albumTitle = photoAlbum?.title || "Nuestros momentos";
  const albumSubtitle = photoAlbum?.subtitle || "";
  const albumPhotos = Array.isArray(photoAlbum?.photos) ? photoAlbum.photos : [];
  const albumPhotosHtml = albumPhotos.map((p, idx) => {
    const pSrc = p?.src || "";
    const pAlt = p?.alt || `Foto ${idx + 1}`;
    const rot = typeof p?.rotationHint === "number" ? p.rotationHint : 0;
    return `
      <figure class="album-item" style="--rot:${rot}deg;" aria-label="${escapeHtml(pAlt)}">
        <img class="album-photo" src="${escapeHtml(pSrc)}" alt="${escapeHtml(pAlt)}" />
      </figure>
    `;
  }).join("");

  // T9: top3
  const top3 = Array.isArray(wrappedData?.top3) ? wrappedData.top3 : [];
  const top3Count = top3.length;
  const top3InitialHtml = top3Count > 0 ? renderTop3Card(top3[0]) : '<p class="track-note">No hay momentos aún.</p>';
  const top3BtnLabel = top3Count <= 1 ? "Fin de los Top 3" : "Ver siguiente momento";
  const top3BtnDisabledAttr = top3Count <= 1 ? "disabled" : "";
  const top3BtnAria = top3Count <= 1 ? "Fin de los Top 3" : "Ver siguiente momento";

  // T11: finalLetter + finalScreen
  const finalLetter = wrappedData?.finalLetter || {};
  const finalScreen = wrappedData?.finalScreen || {};
  const letterBgSrc = finalLetter?.backgroundPhotoSrc || "";
  const letterBgAlt = finalLetter?.backgroundPhotoAlt || "Fondo carta";
  const letterHeading = finalLetter?.heading || "";
  const letterText = finalLetter?.letterText || "";
  const finalLines = Array.isArray(finalScreen?.lines) ? finalScreen.lines : [];
  const cta = finalScreen?.ctaButton || {};
  const ctaLabel = cta?.label || "Coming soon";
  const ctaAria = cta?.ariaLabel || ctaLabel;
  const signature = finalScreen?.signature || "";
  const finalLinesHtml = finalLines.map((ln) => `<p class="final-line">${escapeHtml(ln)}</p>`).join("");

  app.innerHTML = `
    <div class="wrap">
      <section class="section intro-section step-section" id="seccion-1" aria-label="Carga e inicio">
        <div class="intro-media">
          <img class="intro-photo" src="${escapeHtml(photoSrc)}" alt="${escapeHtml(photoAlt)}" />
        </div>
        <div class="intro-text">
          <p class="intro-line intro-line-1">${escapeHtml(line1)}</p>
          <p class="intro-line intro-line-2">${escapeHtml(line2)}</p>
        </div>
        <div class="loading-wrap" id="loadingWrap" aria-live="polite">
          <div class="loading-label" id="loadingLabel">Cargando… 0%</div>
          <div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" id="progressTrack">
            <div class="progress-fill" id="progressFill" style="width: 0%"></div>
          </div>
        </div>
        <div class="intro-action" id="introAction" hidden>
          <button type="button" class="btn-discover" id="btnDiscover" aria-label="${escapeHtml(btnAria)}">
            ${escapeHtml(btnLabel)} <span class="btn-icon" aria-hidden="true">▶</span>
          </button>
        </div>
      </section>

      <section class="section section-2 step-section" id="seccion-2" aria-label="La Gran Bienvenida" hidden>
        <div class="section-2-inner welcome-inner">
          <div class="welcome-media">
            <img class="welcome-photo" src="${escapeHtml(welcomePhotoSrc)}" alt="${escapeHtml(welcomePhotoAlt)}" />
          </div>
          <h2 class="section-2-title welcome-headline">${escapeHtml(welcomeHeadline)}</h2>
          <p class="section-2-text welcome-subtitle">${escapeHtml(welcomeSubtitle)}</p>
        </div>
      </section>

      <section class="section section-stats step-section" id="seccion-stats-tiempo" aria-label="Nuestro tiempo juntos" hidden>
        <div class="section-3-inner live-inner stats-card">
          <p class="section-3-kicker">Contador</p>
          <h2 class="section-3-title">${escapeHtml(liveTitle)}</h2>
          <p class="section-3-label">${escapeHtml(liveLabel)}</p>
          <div class="live-grid" aria-label="Tiempo juntos">
            <div class="live-box"><div class="live-value" id="liveDays">0</div><div class="live-unit">días</div></div>
            <div class="live-box"><div class="live-value" id="liveHours">0</div><div class="live-unit">horas</div></div>
            <div class="live-box"><div class="live-value" id="liveMinutes">0</div><div class="live-unit">minutos</div></div>
            <div class="live-box"><div class="live-value" id="liveSeconds">0</div><div class="live-unit">segundos</div></div>
          </div>
          <p class="section-3-story" id="liveStory"></p>
        </div>
      </section>

      <section class="section section-stats step-section" id="seccion-stats-abrazos" aria-label="Cronómetro de abrazos estimado" hidden>
        <div class="section-3-inner stats-card stats-single">
          <p class="section-3-kicker">Estadística</p>
          <h2 class="section-3-title">Cronómetro de abrazos (estimado)</h2>
          <p class="stats-line stats-big" id="statHugs"></p>
        </div>
      </section>

      <section class="section section-stats step-section" id="seccion-stats-comida" aria-label="¿Qué quieres comer?" hidden>
        <div class="section-3-inner stats-card stats-single">
          <p class="section-3-kicker">Estadística</p>
          <h2 class="section-3-title">El polígrafo del ¿Qué quieres comer?</h2>
          <p class="stats-line stats-big" id="statFood"></p>
        </div>
      </section>

      <section class="section section-stats step-section" id="seccion-stats-tequiero" aria-label="Te Amo en el chat" hidden>
        <div class="section-3-inner stats-card stats-single">
          <p class="section-3-kicker">Estadística</p>
          <h2 class="section-3-title">Te Amo (en el chat)</h2>
          <p class="stats-line stats-big" id="statLove"></p>
        </div>
      </section>

      <section class="section section-stats step-section" id="seccion-stats-picadas" aria-label="Picadas juntos" hidden>
        <div class="section-3-inner stats-card stats-single">
          <p class="section-3-kicker">Estadística</p>
          <h2 class="section-3-title">Picadas juntos</h2>
          <p class="stats-line stats-big" id="statPicadas"></p>
          <div class="picadas-photo-wrap" id="picadasPhotoWrap" aria-label="Foto de picadas juntos"></div>
        </div>
      </section>

      <section class="section section-4 step-section" id="seccion-4" aria-label="Playlist Canciones con historia" hidden>
        <div class="section-4-inner playlist-inner">
          <p class="section-4-kicker">Playlist</p>
          <h2 class="section-4-title">${escapeHtml(playlistTitle)}</h2>
          <ul class="playlist-list" aria-label="Lista de canciones">
            ${tracksHtml || '<li class="track-item"><p class="track-note">No hay canciones aún.</p></li>'}
          </ul>
        </div>
      </section>

      <section class="section section-5 step-section" id="seccion-5" aria-label="Mis fotos favoritas" hidden>
        <div class="section-5-inner album-inner">
          <p class="section-5-kicker">Álbum</p>
          <h2 class="section-5-title">${escapeHtml(albumTitle)}</h2>
          ${albumSubtitle ? `<p class="section-5-subtitle">${escapeHtml(albumSubtitle)}</p>` : ""}
          <div class="album-stack" aria-label="Galería de recuerdos">
            ${albumPhotosHtml || '<p class="track-note">No hay fotos aún.</p>'}
          </div>
        </div>
      </section>

      <section class="section section-6 step-section" id="seccion-6" aria-label="Top 3 momentos" hidden>
        <div class="section-6-inner top3-inner">
          <p class="section-6-kicker">Top 3</p>
          <h2 class="section-6-title">Mis momentos favoritos</h2>
          <div class="top3-single-wrap" id="top3CardArea" aria-label="Momento favorito">
            ${top3InitialHtml}
          </div>
          <div class="top3-actions">
            <button type="button" class="btn-step btn-top3-next" id="btnTop3Next" aria-label="${top3BtnAria}" ${top3BtnDisabledAttr}>${top3BtnLabel}</button>
          </div>
        </div>
      </section>

      <section class="section section-8 step-section" id="seccion-8" aria-label="Carta final y cierre" hidden>
        <div class="section-8-inner final-inner">
          <div class="final-letter" style="background-image:url('${escapeHtml(letterBgSrc)}');" role="img" aria-label="${escapeHtml(letterBgAlt)}">
            <div class="final-letter-overlay">
              <h2 class="final-letter-heading">${escapeHtml(letterHeading)}</h2>
              <p class="final-letter-text">${escapeHtml(letterText).replaceAll("\n", "<br/>")}</p>
            </div>
          </div>
          <div class="final-screen">
            <div class="final-lines">${finalLinesHtml}</div>
            <button type="button" class="btn-coming-soon" disabled aria-label="${escapeHtml(ctaAria)}">${escapeHtml(ctaLabel)}</button>
            <p class="final-signature">${escapeHtml(signature)}</p>
          </div>
        </div>
      </section>

      <nav class="step-nav" id="stepNav" aria-label="Navegación entre secciones" hidden>
        <button type="button" class="btn-step btn-step-prev" id="btnPrev">Anterior</button>
        <button type="button" class="btn-step btn-step-next" id="btnNext">Siguiente</button>
      </nav>
    </div>
  `;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderTop3Card(c) {
  const cTitle = c?.title || "";
  const cDate = c?.dateLabel ? `<p class="top3-date">${escapeHtml(c.dateLabel)}</p>` : "";
  const cText = c?.text || "";
  const cPhotoSrc = c?.photoSrc || "";
  const cPhotoAlt = c?.photoAlt || cTitle || "Foto";
  return `
    <article class="top3-card top3-card-single" aria-label="${escapeHtml(cTitle)}">
      <img class="top3-photo" src="${escapeHtml(cPhotoSrc)}" alt="${escapeHtml(cPhotoAlt)}" />
      <div class="top3-body">
        <h3 class="top3-title">${escapeHtml(cTitle)}</h3>
        ${cDate}
        <p class="top3-text">${escapeHtml(cText)}</p>
      </div>
    </article>
  `;
}

const STEP_IDS = [
  "seccion-1",
  "seccion-2",
  "seccion-stats-tiempo",
  "seccion-stats-abrazos",
  "seccion-stats-comida",
  "seccion-stats-tequiero",
  "seccion-stats-picadas",
  "seccion-4",
  "seccion-5",
  "seccion-6",
  "seccion-8",
];
let currentStep = 0;
let top3Index = 0;

function triggerAlbumAnimation() {
  const section = document.querySelector("#seccion-5");
  if (!section) return;
  const items = Array.from(section.querySelectorAll(".album-item"));
  if (items.length === 0) return;

  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Zonas fijas (ajustadas arriba para no tapar botones). Si hay más de 6, se repiten.
  const zones = [
    { left: 18, top: 8 },   // zona 1 (arriba izquierda)
    { left: 62, top: 10 },  // zona 2 (arriba derecha)
    { left: 20, top: 30 },  // zona 3 (centro izquierda)
    { left: 60, top: 32 },  // zona 4 (centro derecha)
    { left: 22, top: 42 },  // zona 5 (abajo izquierda, subida)
    { left: 58, top: 44 },  // zona 6 (abajo derecha, subida)
  ];

  // Reset previous animation classes and assign fixed-zone positions/rotations
  items.forEach((item, idx) => {
    item.classList.remove("album-animating", "album-reduced");
    item.style.animationDelay = "";
    // Random zIndex to vary stacking
    item.style.zIndex = String(10 + Math.floor(Math.random() * items.length));
    // Rotación suave entre -8° y 8°
    const rotDeg = -8 + Math.random() * 16;
    item.style.setProperty("--rot", `${rotDeg.toFixed(2)}deg`);
    // Asignar zona fija (repetir si >6), con variación ligera ±2-4%
    const zone = zones[idx % zones.length];
    const dLeft = -4 + Math.random() * 8; // ±4%
    const dTop = -4 + Math.random() * 8;  // ±4%
    const leftPct = zone.left + dLeft;
    const topPct = zone.top + dTop;
    item.style.left = `${leftPct.toFixed(2)}%`;
    item.style.top = `${topPct.toFixed(2)}%`;
  });

  if (reduceMotion) {
    items.forEach((item) => {
      item.classList.add("album-reduced");
    });
    return;
  }

  // Staggered drop-in animation: ~3.5s between each
  items.forEach((item, idx) => {
    // force reflow to restart animation if needed
    // eslint-disable-next-line no-unused-expressions
    void item.offsetWidth;
    item.style.animationDelay = `${idx * 3.5}s`;
    item.classList.add("album-animating");
  });
}

function updateTop3UI() {
  const top3 = Array.isArray(wrappedData?.top3) ? wrappedData.top3 : [];
  const area = document.querySelector("#top3CardArea");
  const btn = document.querySelector("#btnTop3Next");
  if (!area) return;
  if (top3.length === 0) {
    area.innerHTML = '<p class="track-note">No hay momentos aún.</p>';
    if (btn) btn.hidden = true;
    return;
  }
  if (top3Index < 0) top3Index = 0;
  if (top3Index >= top3.length) top3Index = top3.length - 1;
  const c = top3[top3Index];

  const existing = area.querySelector(".top3-card-single");
  const applyButtonState = () => {
    if (btn) {
      if (top3Index >= top3.length - 1) {
        btn.textContent = "Fin de los Top 3";
        btn.disabled = true;
        btn.setAttribute("aria-label", "Fin de los Top 3");
      } else {
        btn.textContent = "Ver siguiente momento";
        btn.disabled = false;
        btn.setAttribute("aria-label", "Ver siguiente momento");
      }
      btn.hidden = false;
    }
  };

  if (existing) {
    existing.classList.add("is-fading");
    window.setTimeout(() => {
      area.innerHTML = renderTop3Card(c);
      const next = area.querySelector(".top3-card-single");
      if (next) {
        next.classList.add("is-fading");
        // force reflow then remove to fade in
        void next.offsetWidth;
        next.classList.remove("is-fading");
      }
      applyButtonState();
    }, 190);
  } else {
    area.innerHTML = renderTop3Card(c);
    applyButtonState();
  }
}

function showStep(index) {
  currentStep = Math.max(0, Math.min(index, STEP_IDS.length - 1));
  STEP_IDS.forEach((id, i) => {
    const el = document.querySelector(`#${id}`);
    if (!el) return;
    el.hidden = i !== currentStep;
  });
  const stepNav = document.querySelector("#stepNav");
  const btnPrev = document.querySelector("#btnPrev");
  const btnNext = document.querySelector("#btnNext");
  if (stepNav) {
    // show nav only after leaving intro step? Or always after discover: show when currentStep >= 1
    stepNav.hidden = currentStep === 0;
  }
  if (btnPrev) {
    btnPrev.disabled = currentStep <= 0;
  }
  if (btnNext) {
    btnNext.disabled = currentStep >= STEP_IDS.length - 1;
    btnNext.textContent = currentStep >= STEP_IDS.length - 1 ? "Fin" : "Siguiente";
  }

  // Trigger album animation when showing seccion-5
  if (STEP_IDS[currentStep] === "seccion-5") {
    triggerAlbumAnimation();
  }
  // Reset/update Top 3 when showing seccion-6
  if (STEP_IDS[currentStep] === "seccion-6") {
    top3Index = 0;
    updateTop3UI();
  }
}

function startLoading() {
  const progressFill = document.querySelector("#progressFill");
  const progressTrack = document.querySelector("#progressTrack");
  const loadingLabel = document.querySelector("#loadingLabel");
  const loadingWrap = document.querySelector("#loadingWrap");
  const introAction = document.querySelector("#introAction");
  const btnDiscover = document.querySelector("#btnDiscover");
  const btnPrev = document.querySelector("#btnPrev");
  const btnNext = document.querySelector("#btnNext");

  if (!progressFill || !progressTrack || !loadingLabel || !loadingWrap || !introAction || !btnDiscover) return;

  // init steps
  showStep(0);

  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    const raw = Math.min(100, Math.floor((elapsed / durationMs) * 100));
    progressFill.style.width = `${raw}%`;
    progressTrack.setAttribute("aria-valuenow", String(raw));
    loadingLabel.textContent = `Cargando… ${raw}%`;

    if (raw >= 100) {
      progressFill.style.width = "100%";
      progressTrack.setAttribute("aria-valuenow", "100");
      loadingLabel.textContent = "Cargando… 100%";
      loadingWrap.hidden = true;
      introAction.hidden = false;
      return;
    }
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);

  btnDiscover.addEventListener("click", () => {
    showStep(1); // go to Bienvenida (seccion-2)
    const bgm = document.querySelector("#bgmAudio");
    const bgmToggle = document.querySelector("#bgmToggle");
    if (bgm) {
      bgm.volume = 0.6;
      bgm.play().then(() => {
        if (bgmToggle) {
          bgmToggle.hidden = false;
          bgmToggle.textContent = "🔊";
          bgmToggle.setAttribute("aria-label", "Pausar música");
        }
      }).catch(() => {
        // Autoplay blocked or error; show toggle anyway so user can try
        if (bgmToggle) {
          bgmToggle.hidden = false;
          bgmToggle.textContent = "🔈";
          bgmToggle.setAttribute("aria-label", "Reproducir música");
        }
      });
    }
  });

  if (btnPrev) {
    btnPrev.addEventListener("click", () => {
      if (currentStep > 0) showStep(currentStep - 1);
    });
  }
  if (btnNext) {
    btnNext.addEventListener("click", () => {
      if (currentStep < STEP_IDS.length - 1) showStep(currentStep + 1);
    });
  }

  const btnTop3Next = document.querySelector("#btnTop3Next");
  if (btnTop3Next) {
    btnTop3Next.addEventListener("click", () => {
      const top3 = Array.isArray(wrappedData?.top3) ? wrappedData.top3 : [];
      if (top3Index < top3.length - 1) {
        top3Index++;
        updateTop3UI();
      }
    });
  }

  const bgmToggle = document.querySelector("#bgmToggle");
  const bgm = document.querySelector("#bgmAudio");
  if (bgmToggle && bgm) {
    bgmToggle.addEventListener("click", () => {
      if (bgm.paused) {
        bgm.play().then(() => {
          bgmToggle.textContent = "🔊";
          bgmToggle.setAttribute("aria-label", "Pausar música");
        }).catch(() => {});
      } else {
        bgm.pause();
        bgmToggle.textContent = "🔈";
        bgmToggle.setAttribute("aria-label", "Reproducir música");
      }
    });
  }

  // T6: stats from data
  const hugs = wrappedData?.stats?.hugs || {};
  const foodDecision = wrappedData?.stats?.foodDecision || {};
  const loveWords = wrappedData?.stats?.loveWords || {};
  const picadas = wrappedData?.stats?.picadas || {};

  const hugsEstimate = hugs?.estimateText || (hugs?.estimateApprox != null ? `Más de ${hugs.estimateApprox} de abrazos` : "");

  const statHugsEl = document.querySelector("#statHugs");
  const statFoodEl = document.querySelector("#statFood");
  const statLoveEl = document.querySelector("#statLove");
  const statPicadasEl = document.querySelector("#statPicadas");
  const picadasPhotoWrap = document.querySelector("#picadasPhotoWrap");

  if (statHugsEl) statHugsEl.textContent = hugsEstimate;
  if (statFoodEl) statFoodEl.textContent = foodDecision?.text || "";
  if (statLoveEl) statLoveEl.textContent = loveWords?.text || "";
  if (statPicadasEl) statPicadasEl.textContent = picadas?.text || "";
  if (picadasPhotoWrap) {
    const picSrc = picadas?.photoSrc || "";
    const picAlt = picadas?.photoAlt || "Foto de picadas juntos";
    if (picSrc && String(picSrc).trim() !== "") {
      picadasPhotoWrap.innerHTML = `<img class="picadas-photo" src="${escapeHtml(picSrc)}" alt="${escapeHtml(picAlt)}" />`;
    } else {
      picadasPhotoWrap.innerHTML = "";
    }
  }
}

function getElapsedPartsFromStart(startIso) {
  const start = new Date(startIso).getTime();
  const now = Date.now();
  let diffMs = now - start;
  if (diffMs < 0) diffMs = 0;
  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

function updateLiveCounter() {
  const liveCounter = wrappedData?.stats?.liveCounter || {};
  const startIso = liveCounter?.startDateISO || "2026-05-20T20:00:00-05:00";
  const template = liveCounter?.togetherStoryTextTemplate || "";
  const parts = getElapsedPartsFromStart(startIso);

  const elDays = document.querySelector("#liveDays");
  const elHours = document.querySelector("#liveHours");
  const elMinutes = document.querySelector("#liveMinutes");
  const elSeconds = document.querySelector("#liveSeconds");
  const elStory = document.querySelector("#liveStory");

  if (elDays) elDays.textContent = String(parts.days);
  if (elHours) elHours.textContent = String(parts.hours);
  if (elMinutes) elMinutes.textContent = String(parts.minutes);
  if (elSeconds) elSeconds.textContent = String(parts.seconds);

  if (elStory) {
    const text = template
      .replaceAll("{days}", String(parts.days))
      .replaceAll("{hours}", String(parts.hours))
      .replaceAll("{minutes}", String(parts.minutes))
      .replaceAll("{seconds}", String(parts.seconds));
    elStory.textContent = text;
  }
}

function startLiveCounter() {
  updateLiveCounter();
  setInterval(updateLiveCounter, 1000);
}

buildUI();
startLoading();
startLiveCounter();
