/**
 * src/data.js
 * Fuente única de contenido para "Wrapped Nella & David".
 * Usa ES Modules: export const wrappedData = ...
 *
 * IMPORTANTE: revisa todos los comentarios "// EDITA AQUÍ".
 */

export const wrappedData = {
  meta: {
    coupleNames: { her: "Nella", him: "David" },
    pageTitle: "Nuestro Wrapped — Nella y David",
    pageDescription: "Un regalo de 6 meses para revivir nuestros mejores momentos.",
  },
  intro: {
    photoSrc: "assets/Inicio.jpeg",
    photoAlt: "Foto de inicio",
    loadingLines: {
      line1: "Cargando nuestros mejores momentos...",
      line2: "Preparando el Wrapped de Nella y David",
    },
    startButton: { label: "Descubrir nuestro año", icon: "play", ariaLabel: "Descubrir nuestro año" },
    simulatedLoadMs: 3200,
  },
  welcome: {
    photoSrc: "assets/Welcome.jpeg",
    photoAlt: "Foto de bienvenida",
    headline: "¡Hola, Nella! Qué tal si revivimos un poco estos 6 meses junto a David?",
    subtitle: "Seis meses de risas, aprendizajes y momentos que quiero que nunca olvides.",
  },
  stats: {
    liveCounter: {
      startDateISO: "2026-05-20T20:00:00-05:00",
      timeZoneLabel: "America/Bogota (hora Colombia)",
      title: "Nuestro tiempo juntos",
      liveLabel: "desde que empezamos esta nueva historia",
      togetherStoryTextTemplate: "Llevamos {days} días, {hours} horas, {minutes} minutos y {seconds} segundos juntos escribiendo nuestra historia.",
    },
    hugs: {
      assumptions: { encountersPerWeek: 3, hoursPerEncounter: 3, hugsPerHourTogether: 3 },
      estimateApprox: 270,
      estimateText: "Más de 270 horas de abrazos",
      uiLine: "Cronómetro de abrazos (estimado): Más de {estimate} horas de abrazos",
    },
    foodDecision: { label: "¿Qué quieres comer?", text: "Veces que dijimos “no sé o tú decide”: más de 300" },
    loveWords: { label: "Te Amo", text: "Hemos dicho “Te Amo” aprox. 947 veces (en chat) y contando" },
    picadas: {
      label: "Picadas juntos",
      count: 10,
      text: "Hemos compartido 10 picadas juntos (y cada una mejor que la anterior).",
      // Sugerencia: "assets/Numero de picadas.jpeg" (si quieres usar la foto existente)
      photoSrc: "assets/Numero de picadas.jpeg",
      photoAlt: "Foto de picadas juntos",
    },
  },
  playlist: {
    title: "Canciones con historia",
    tracks: [
      {
        title: "La playlist que me reguerda a ti",
        artist: "Spotify",
        spotifyUrl: "https://open.spotify.com/playlist/3Q2bWGS43qffMf1sy8CGl1?si=8g8sGpPuRviu6qftM83WSA&utm_source=copy-link",
        note: "Canciones con historia",
      },
    ],
  },
  photoAlbum: {
    title: "Nuestros momentos",
    subtitle: "Un álbum de recortes de nuestros recuerdos.",
    photos: [
      { src: "assets/Album 1.jpeg", alt: "Foto álbum 1", caption: "Momento especial", rotationHint: -2 },
      { src: "assets/Album 2.jpeg", alt: "Foto álbum 2", caption: "Recuerdo juntos", rotationHint: 1.5 },
      { src: "assets/Album 3.jpeg", alt: "Foto álbum 3", caption: "Risas y amor", rotationHint: -1 },
      { src: "assets/Album 4.jpeg", alt: "Foto álbum 4", caption: "Un día bonito", rotationHint: 2 },
      { src: "assets/Album 5.jpeg", alt: "Foto álbum 5", caption: "Siempre tú", rotationHint: -1.5 },
      { src: "assets/Album 6.jpeg", alt: "Foto álbum 6", caption: "Nuestro momento", rotationHint: 1 },
    ],
  },
  top3: [
    { id: "top1", rankLabel: "Tarjeta 1", title: "Primer mes juntos", photoSrc: "assets/Primer mes juntos.jpeg", photoAlt: "Foto del primer mes", dateLabel: null, text: "Nuestro primer mes fue descubrir lo bonito de elegirnos cada día: conversaciones que se alargaban, risas fáciles y la sensación de que esto apenas empezaba." },
    { id: "top2", rankLabel: "Tarjeta 2", title: "Primera picada juntos", photoSrc: "assets/Primera picada juntos.jpeg", photoAlt: "Foto de la primera picada", dateLabel: "18 de julio de 2026", text: "Nuestra primera picada juntos fue un plan simple que se volvió especial: compartir esto que tanto me encanta con una persona tan especial como tu, entre risas, antojos y la complicidad de empezar a crear nuestras tradiciones." },
    { id: "top3", rankLabel: "Tarjeta 3", title: "La mejor escapada juntos", photoSrc: "assets/La mejor escapada juntos.jpeg", photoAlt: "Foto de la mejor escapada", dateLabel: "9 de noviembre de 2026", text: "La mejor escapada juntos fue ese respiro que nos regalamos: nuevos paisajes, tiempo a solas y la certeza de que cualquier lugar se siente como hogar cuando estamos juntos." },
  ],

  finalLetter: {
    backgroundPhotoSrc: "assets/Fondo mensaje.jpeg",
    backgroundPhotoAlt: "Foto de fondo para la carta",
    heading: "Para ti, Nella",
    letterText: "Ya van 6 meses desde que estamos juntos y han sido los mejores del mundo... \nHemos tenido discusiones , enojos , risas , llantos , alegrías,  pero lo importante es que hemos sabido seguir adelante juntos , eligiendonos el uno al otro y si me preguntan , yo diría que han sido 6 meses perfectos,  esta mas decir que te amo por que creo que ya lo sabes y hago lo posible por demostrarlo cada día,  eres , fuiste y siempre mi mejor decisión,  pero cumplir muchísimo meses , años , décadas juntos... \nTe amo hermosa ♥️",
  },
  finalScreen: {
    lines: ["y esta historia aun no termina", "7mo Mes juntos"],
    ctaButton: { label: "Coming soon", disabled: true, ariaLabel: "Próximamente" },
    signature: "Con mucho amor, David (tu cachon favorito)",
  },
};

export default wrappedData;
