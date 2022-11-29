function _fillTemplate(args) {
  const templateContent = (() => {
    if ("templateContent" in args) {
      return args.templateContent;
    } else {
      return document.getElementById(args.templateId).innerHTML;
    }
  })();

  // row_elem.content
  const row_temp = Handlebars.compile(templateContent);
  const row_text = row_temp(args.data);

  const tbody_elem = document.getElementById(args.dstId);
  tbody_elem.innerHTML += row_text;
}

function _makeHeader() {
  const content = `
    <section class="hero">
        <div class="hero-body">
            <div class="container is-max-desktop">
                <div class="columns is-centered">
                    <div class="column has-text-centered">
                        <h1 class="title is-2 publication-title">RUST: Really Unposed SRT</h1>
                        <p class="is-size-6 text-center">
                            Latent Neural Scene Representations from Unposed Imagery <br/>
                            <a target="_blank" rel="noopener noreferrer" href="https://msajjadi.com/">Mehdi S. M. Sajjadi</a><sup>*</sup>,
                            <a target="_blank" rel="noopener noreferrer" href="https://aravindhm.github.io/">Aravindh Mahendran</a>,
                            <a target="_blank" rel="noopener noreferrer" href="https://tkipf.github.io/">Thomas Kipf</a>,
                            <a target="_blank" rel="noopener noreferrer" href="https://github.com/Conchylicultor">Etienne Pot</a>,
                            <a target="_blank" rel="noopener noreferrer" href="https://www.stronglyconvex.com/about.html">Daniel Duckworth</a>,
                            <a target="_blank" rel="noopener noreferrer" href="https://lucic.ai/">Mario Lučić</a>,
                            <a target="_blank" rel="noopener noreferrer" href="https://qwlouse.github.io/">Klaus Greff</a>
                        </p>

                        <!-- Affiliation -->
                        <p class="is-size-6 text-center">Google Research, Brain Team</p>
                        <!-- Correspondence -->
                        <p class="is-size-7 text-center">
                        <sup>*</sup>Correspondence to: <a href = "mailto: rust@msajjadi.com">rust@msajjadi.com</a>
                        </p>
                        <br/>
                        <a target="_blank" rel="noopener noreferrer" href="https://arxiv.org/abs/2211.14306">
                          <button class="button is-link is-light is-responsive">Paper</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
`;
  Handlebars.registerHelper("eq", (a, b) => a == b);

  const fileName = location.href.split("/").slice(-1)[0].replace(".html", "");
  const rel_path = () => {
    if (fileName === "index") {
      return ".";
    } else {
      return "..";
    }
  };

  _fillTemplate({
    templateContent: content,
    dstId: "header",
    data: {
      sections: [
        { path: "pca_msn", name: "PCA (MSN)" },
        { path: "pca_sv", name: "PCA (SV)" },
        { path: "vids_msn", name: "Videos (MSN)" },
        { path: "vids_sv", name: "Videos (SV)" },
        { path: "vids_msn_ablation", name: "Videos - ablation (MSN)" },
        { path: "vids_gnerf", name: "Videos (GNeRF)" },
      ],
      curr_page: fileName,
      rel_path: rel_path,
    },
  });
}

function _wrapReady(fn) {
  return function (...args) {
    $(document).ready(() => fn(...args));
  };
}

const makeHeader = _wrapReady(_makeHeader);
const fillTemplate = _wrapReady(_fillTemplate);

makeHeader(); // Create the header
