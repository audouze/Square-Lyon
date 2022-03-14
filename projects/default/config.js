const config = {

  environment: {
    // forward informations to max patch
    // set to false if no external max patch
    osc: false,
    // hack to keep devices awake
    // `true` for creations, `false` for production
    // update home instructions accordingly
    wakeLock: true,
  },

  txt: {
    home: {
      // title: 'SQUARE MILANO',
      // subtitle: 'by Lorenzo Bianchi Hoesch',
      // useHeadphones: 'Expérience à faire au casque<br />Use headphones',
      // instructionsHeader: 'Merci de (Please):',
      instructions: {
        wakeLock: 'Disattivare il blocco automatico del telefono e la connessione wifi <br /> dopo ritornare su questa pagina e toccare lo schermo per iniziare',
        // headphones: 'brancher vos écouteurs',
        // volume: 'ajuster le volume',
      },
      touchToStart: 'disable sleep mode and wifi connection, <br /> come back to this page <br /> then touch the screen to start',
    },
    soundCheck: {
      question: 'Senti distintamente la mia voce? o ti sembra ci sia un problema ?<br>(tu entends distinctement ma voix ? ou tu crois qu’il y a un problème ?)',
      yes: 'SI',
      no: 'PROBLEMA',
      testFile: 'sounds/check/SQ-BOL-test-inizio.mp3',
    },
    restartPage: {
      restart: 'Ricominciare dall&#39;inizio <br> (Start from beginning)',
      continue: 'Continuare la visita <br> (Resume playback)',
    },
  },

  common: {
    fallbackStream: {
      id: 'streaming-loop-infinite',
      file: 'streams/streaming-loop-infinite.wav',
      loop: true,
    },
    enableSubtitles: true
  },

  states: [
    // ----------------------------------------------------------------------
    // INTRO
    // ----------------------------------------------------------------------
    {
      title: 'Intro',

      stream: {
        id: '00-discours-deborah-DEF',
        file: 'streams/00-discours-deborah-DEF.wav',
        loop: false,
      },
      // list of events
      events: [
        {
          time: 0,
          type: 'fade-out',
          placeholder: 'background-color',
          duration: 0,
        },
        {
          time: 0,
          type: 'background-color',
          placeholder: 'background-color',
          color: '#000000',
        },
        {
          time: 0,
          type: 'fade-in',
          placeholder: 'background-color',
          duration: 0.1,
        },
        {
          time: 0,
          type: 'text',
          placeholder: 'center',
          classes: ['white', 'align-center'],
          content: `
                  <span class="title">SQUARE MILANO</span> <br />
                  <span class="subtitle">by Lorenzo Bianchi Hoesch</span>
            `,
        },
        {
          time: 5.5, // 0.01
          type: 'text-subtitle',
          placeholder: 'center',
          // classes: ['color-red'],
          content: `
            <p class="use-headphones"> Esperienza da fare in cuffia </p>
            <p class="fa fa-headphones" aria-hidden="true"></p>
            <p class="use-headphones"> Use headphones </p>
          `,
        },
        {
          time: 16.8, // 17
          type: 'text-subtitle',
          placeholder: 'center',
          // classes: ['white', 'align-center'],
          content: `
            c’est maintenant mon tour de
            partir, de tout laisser, pour chercher une alternative à ce lieu sans espoir.
            Voilà les derniers souvenirs que j'ai d'ici.
            <br /><br />
            it's now my turn to go away and leave everything to seek an alternative
            to this hopeless place. These are the last memories I have from here.
          `,
        },
        {
          time: 26.8, // 27
          type: 'text-subtitle',
          placeholder: 'center',
          // classes: ['white', 'align-center'],
          content: `
            De simples photos.
            Pour suivre le fil rouge de mes souvenirs, tu devras me suivre, et littéralement
            te mettre à l'endroit d'où j'ai pris ces photos.
            <br /><br />
            A few pictures.
            To follow the thread of my memories, you'll have to follow me and literally adopt
            the viewpoint I had when I took these pictures.
          `,
        },
        {
          time: 38,
          type: 'text-subtitle',
          placeholder: 'center',
          // classes: ['white', 'align-center'],
          content: `
            Seulement une fois que tu auras trouvé le même point de vue de l’image,
            tu devras cliquer sur l’image et suivre mon parcours.
            <br /><br />
            Only once you've reach its viewpoint will you click on an image and
            follow my journey. ` ,
        },
        {
          time: 48.2,
          type: 'text-subtitle',
          placeholder: 'center',
          // classes: ['white', 'align-center'],
          content: `Une image après
            l’autre, mon histoire.
            <br /><br />
            One image after the next, my story.`,
        },

        {
          time: 52.6,
          type: 'text',
          placeholder: 'center',
          content: '',
        },
        {
          time: 52.6,
          type: 'background-image',
          placeholder: 'background-image',
          url: './images/00.jpg',
        },
        {
          time: 52.6,
          type: 'fade-out',
          placeholder: 'background-color',
          duration: 2,
        },
        {
          time: 56.6,
          type: 'text-subtitle',
          placeholder: 'top',
          classes: ['gradient'],
          content: `The first photo just showed up.`
        },
        {
          time: 60,
          type: 'text-subtitle',
          placeholder: 'top',
          classes: ['gradient'],
          content: ``
        },
        {
          time: 60,
          type: 'text',
          placeholder: 'bottom',
          classes: ['banner'],
          content: `toucher l'écran une fois la position atteinte <br> (touch the screen once you reached this place)`
        },
        {
          time: 60,
          type: 'trigger-next-state',
          placeholder: 'screen',
          triggerAudio: {
            id: 'touch-0',
            file: 'sounds/touch/00-click-image.mp3',
          }
        },
      ]
    },

    // ----------------------------------------------------------------------
    // STATE 1
    // ----------------------------------------------------------------------
    {
      title: 'Discours Lorenzo',

      stream: {
        id: '01-discours-lorenzo-DEF',
        file: 'streams/01-discours-lorenzo-DEF.wav',
        loop: false,
      },
      // list of events
      events: [
        {
          time: 0,
          type: 'background-color',
          placeholder: 'background-color',
          color: '#272727',
        },
        {
          time: 0,
          type: 'fade-in',
          placeholder: 'background-color',
          duration: 1,
        },
        {
          time: 2,
          type: 'text',
          placeholder: 'top',
          content: `Écoute (Listen)`,
        },
        {
          time: 9,
          type: 'background-image',
          placeholder: 'background-image',
          url: './images/01.jpg',
        },
        {
          time: 11,
          type: 'fade-out',
          placeholder: 'background-color',
          duration: 5,
        },
        {
          time: 12,
          type: 'text',
          placeholder: 'top',
          content: ``,
        },
        {
          time: 13,
          type: 'text-subtitle',
          classes: ['gradient'],
          placeholder: 'top',
          content: `Another photo`,
        },
          {
          time: 20,
          type: 'text-subtitle',
          placeholder: 'top',
          content: `follow me! don't listen to the people around you`,
        },
        {
          time: 40,
          type: 'text-subtitle',
          placeholder: 'top',
          content: `it's the fourth corridor on the right`,
        },
        {
          time: 93,
          type: 'text-subtitle',
          placeholder: 'center',
          content: ``

        },
        {
          time: 93,
          type: 'text',
          placeholder: 'bottom',
          classes: ['banner'],
          content: `toucher l'écran une fois la position atteinte <br> (touch the screen once you reached this place)`,
        },
        {
          time: 93,
          type: 'trigger-next-state',
          placeholder: 'screen',
          triggerAudio: {
            id: 'touch-1',
            file: 'sounds/touch/01-click-image.mp3',
          }
        },
      ]
    },

    // ----------------------------------------------------------------------
    // STATE end
    // ----------------------------------------------------------------------

    {
      title: 'end',

      stream: {
        id: 'streaming-loop-infinite',
        file: 'streams/streaming-loop-infinite.wav',
        loop: false,
      },
      // list of events
      events: [
        {
          time: 0,
          type: 'background-color',
          placeholder: 'background-color',
          color: '#272727',
        },
        {
          time: 0,
          type: 'fade-in',
          placeholder: 'background-color',
          duration: 1,
        },
        {
          time: 1.2,
          type: 'text',
          placeholder: 'top',
          classes: ['large', 'bold'],
          content: `SQUARE #2`,
        },
        {
          time: 10.5,
          type: 'text',
          placeholder: 'center',
          classes: ['white', 'align-center'],
          content: `
            <dl>
              <dt class="first">Concept et Création :</dt>
              <dd class="first">Lorenzo Bianchi Hoesch</dd>

              <dt>Développement :</dt>
              <dd>
                David Poirier-Quinot<br />
                Benjamin Matuszewski
              </dd>

              <dt>Voix principale :</dt>
              <dd>Deborah Lopatin</dd>

              <dt>Violon :</dt>
              <dd>Szuhwa Wu</dd>

              <dt>Trompette et voix :</dt>
              <dd>Amir el Saffar</dd>

            </dl>
          `,
        },
        {
          time: 20.5,
          type: 'text',
          placeholder: 'bottom',
          classes: ['banner'],
          content: `<a href="http://forumnet.ircam.fr/event/square-installation-interactive-lorenzo-bianchi-hoesch/">Plus d'informations</a>`,
        },
      ]
    },
  ],
};

module.exports = config;
