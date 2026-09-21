import React, { useEffect, useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  Menu,
  X,
  ArrowDown,
  ArrowUpRight,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "./style.css";
const A = "/images/";
const details = [
  [
    "I",
    "hull-detail.jpg",
    "MIDNIGHT TEAL",
    "Colour with consequence",
    "A mineral-rich finish gives the hull a composed depth. Champagne brightwork traces every edge, allowing the form to shift as morning light moves across it.",
  ],
  [
    "II",
    "propulsion.jpg",
    "HYDROVECTOR DRIVE",
    "Silence, shaped by speed",
    "Twin hybrid waterjets and retractable foils lift the hull cleanly above resistance, turning mechanical force into an effortless, near-silent glide.",
  ],
  [
    "III",
    "deck.jpg",
    "COMPASS DECK",
    "Geometry underfoot",
    "Quarter-sawn teak follows a radial pattern drawn from maritime charts. Every seam converges on the vessel’s centreline, laid and finished entirely by hand.",
  ],
  [
    "IV",
    "interior.jpg",
    "THE HELM",
    "Instruments, not interfaces",
    "Knurled metal controls and focused analogue dials return command to touch. Technology stays present, precise and deliberately quiet.",
  ],
  [
    "V",
    "cabin.jpg",
    "NIGHT SALON",
    "Shelter after horizon",
    "Ribbed walnut, saddle leather and woven linen create a room that is warm without excess—a private refuge shaped by the sea.",
  ],
];
const specs = [
  [
    "Range",
    "540",
    "NM",
    "Long-range confidence is delivered by a carbon-composite hull and an intelligent hybrid system calibrated for unhurried passages.",
    "profile.jpg",
  ],
  [
    "Cruise",
    "38",
    "KN",
    "Twin waterjets translate power into a smooth, immediate response while preserving quiet across the deck.",
    "propulsion.jpg",
  ],
  [
    "Peak power",
    "2,400",
    "HP",
    "A compact propulsion architecture balances sustained performance with silent electric movement in sheltered waters.",
    "deck.jpg",
  ],
  [
    "Draft",
    "0.92",
    "M",
    "A shallow profile opens coastlines, anchorages and hidden coves usually beyond the reach of a yacht of this scale.",
    "hull-detail.jpg",
  ],
  [
    "Guests",
    "8",
    "BERTHS",
    "Four private suites are composed around light, acoustic calm and uninterrupted contact with the water.",
    "cabin.jpg",
  ],
];
function App() {
  const [menu, setMenu] = useState(false),
    [sound, setSound] = useState(false),
    [loaded, setLoaded] = useState(false),
    [slide, setSlide] = useState(0);
  const audio = useRef();
  useEffect(() => {
    setTimeout(() => setLoaded(true), 1100);
    const obs = new IntersectionObserver(
      (es) =>
        es.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.16 },
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  function toggleSound() {
    if (!audio.current) {
      const C = window.AudioContext || window.webkitAudioContext,
        c = new C(),
        g = c.createGain(),
        o = c.createOscillator(),
        o2 = c.createOscillator();
      o.type = "sine";
      o.frequency.value = 55;
      o2.type = "sine";
      o2.frequency.value = 82.4;
      g.gain.value = 0.025;
      o.connect(g);
      o2.connect(g);
      g.connect(c.destination);
      o.start();
      o2.start();
      audio.current = { c, g };
    }
    setSound((v) => {
      audio.current.g.gain.setTargetAtTime(
        v ? 0 : 0.025,
        audio.current.c.currentTime,
        0.5,
      );
      return !v;
    });
  }
  return (
    <>
      <div className={"loader " + (loaded ? "done" : "")}>
        <div className="mark">A</div>
        <span>CRAFTED FOR OPEN WATER</span>
      </div>
      <div className="cursor" />
      <header>
        <a className="logo" href="#top">
          <b>A</b>
          <span>
            AURELIS
            <br />
            MARINE
          </span>
        </a>
        <div className="headRight">
          <span className="edition">A62 / ORIGIN SERIES</span>
          <button
            className="round"
            onClick={() => setMenu(true)}
            aria-label="Open menu"
          >
            <Menu />
          </button>
        </div>
      </header>
      <div className={"menu " + (menu ? "open" : "")}>
        <div className="menuTop">
          <div className="logo light">
            <b>A</b>
            <span>
              AURELIS
              <br />
              MARINE
            </span>
          </div>
          <button className="round light" onClick={() => setMenu(false)}>
            <X />
          </button>
        </div>
        <nav>
          {["Origins", "Craft", "Performance", "Interiors", "Enquire"].map(
            (x, i) => (
              <a
                key={x}
                onClick={() => setMenu(false)}
                href={"#" + x.toLowerCase()}
              >
                <small>0{i + 1}</small>
                {x}
                <ArrowUpRight />
              </a>
            ),
          )}
        </nav>
        <p>Porto Montenegro · London · Monaco</p>
      </div>
      <main id="top">
        <section className="hero">
          <img src={A + "hero.jpg"} />
          <div className="shade" />
          <div className="heroTitle">
            <p>Introducing</p>
            <h1>Aurelis 62</h1>
            <p>Origin Series</p>
          </div>
          <div className="heroFoot">
            <div>
              <b>06:20</b>
              <span>Lake Como / Morning</span>
            </div>
            <a href="#origins">
              SCROLL TO EXPLORE <ArrowDown />
            </a>
            <button onClick={toggleSound}>
              BEST WITH SOUND {sound ? <Volume2 /> : <VolumeX />}
            </button>
          </div>
        </section>
        <section id="origins" className="chapter cream reveal">
          <div className="chapterNo">01 / 03</div>
          <h2>
            The
            <br />
            <i>morning</i>
          </h2>
          <p>Where quiet water reveals every line.</p>
        </section>
        <section className="details">
          {details.slice(0, 3).map((d, i) => (
            <article className="detail reveal" key={d[2]}>
              <div className="picture">
                <img src={A + d[1]} />
                <span>{d[0]}</span>
              </div>
              <div className="copy">
                <small>{d[2]}</small>
                <h3>{d[3]}</h3>
                <p>{d[4]}</p>
              </div>
            </article>
          ))}
        </section>
        <section className="gallery reveal">
          <div
            className="track"
            style={{ transform: `translateX(-${slide * 100}%)` }}
          >
            {["profile.jpg", "hero.jpg", "evening.jpg"].map((x, i) => (
              <figure key={x}>
                <img src={A + x} />
                <figcaption>
                  {
                    [
                      "An unmistakable profile, drawn in one unbroken gesture.",
                      "The first light belongs to open water.",
                      "A private world after sunset.",
                    ][i]
                  }
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="galleryNav">
            <span>0{slide + 1} — 03</span>
            <button onClick={() => setSlide((slide + 2) % 3)}>
              <ChevronLeft />
            </button>
            <button onClick={() => setSlide((slide + 1) % 3)}>
              <ChevronRight />
            </button>
          </div>
        </section>
        <section id="craft" className="manifesto reveal">
          <p>FORM FOLLOWS WATER</p>
          <h2>
            BUILT FOR DISTANCE.
            <br />
            DRAWN FOR <i>DESIRE.</i>
          </h2>
          <div className="manifestoText">
            <span>02</span>
            <p>
              We began with the sea, not the silhouette. Every surface was
              resolved against wind, spray and horizon. What remains is a yacht
              of uncommon calm—engineered to travel farther, and designed to
              leave less behind.
            </p>
          </div>
        </section>
        <section id="performance" className="performance">
          <div className="perfHead reveal">
            <small>02 / 03 — CAPABILITY</small>
            <h2>Performance</h2>
          </div>
          {specs.map((s, i) => (
            <article className="spec reveal" key={s[0]}>
              <div className="metric">
                <small>{s[0]}</small>
                <strong>{s[1]}</strong>
                <em>{s[2]}</em>
              </div>
              <p>{s[3]}</p>
              <img src={A + s[4]} />
            </article>
          ))}
        </section>
        <section className="chapter night reveal">
          <div className="chapterNo">03 / 03</div>
          <h2>
            The
            <br />
            <i>evening</i>
          </h2>
          <p>Monaco / 21:10</p>
        </section>
        <section id="interiors" className="details dark">
          {details.slice(3).map((d) => (
            <article className="detail reveal" key={d[2]}>
              <div className="picture">
                <img src={A + d[1]} />
                <span>{d[0]}</span>
              </div>
              <div className="copy">
                <small>{d[2]}</small>
                <h3>{d[3]}</h3>
                <p>{d[4]}</p>
              </div>
            </article>
          ))}
        </section>
        <section id="enquire" className="cta">
          <img src={A + "evening.jpg"} />
          <div>
            <small>LIMITED TO TWELVE VESSELS</small>
            <h2>
              Make the horizon
              <br />
              <i>your own.</i>
            </h2>
            <p>
              Each Aurelis 62 is commissioned around its owner, from hull finish
              to the final stitch.
            </p>
            <a href="mailto:studio@example.com">
              REQUEST A PRIVATE VIEWING <ArrowUpRight />
            </a>
          </div>
        </section>
      </main>
      <footer>
        <div className="footerBrand">
          <div className="mark">A</div>
          <p>AURELIS MARINE</p>
        </div>
        <div>
          <h4>Explore</h4>
          <a href="#origins">Origins</a>
          <a href="#craft">Craft</a>
          <a href="#performance">Performance</a>
        </div>
        <div>
          <h4>Visit</h4>
          <a>Monaco</a>
          <a>Porto Montenegro</a>
          <a>London</a>
        </div>
        <div className="newsletter">
          <h4>Private correspondence</h4>
          <p>Stories from the studio, shared occasionally.</p>
          <label>
            <input placeholder="Email address" />
            <button>
              JOIN <ArrowUpRight />
            </button>
          </label>
        </div>
        <small>© 2026 AURELIS MARINE — CONCEPT TEMPLATE</small>
      </footer>
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
