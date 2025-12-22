  (function(d) {
    var config = {
      kitId: 'kly5xeb',
      scriptTimeout: 3000,
      async: true
    },
    h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
  })(document);

const urlconhecimento = "https://y0jmvi7y.api.sanity.io/v2025-12-15/data/query/production?query=*%0A%5B_type+%3D%3D+%22conhecimentos%22%5D%0A%7B%22imagemUrl%22%3A+imagem.asset-%3Eurl%7D&perspective=drafts";

fetch(urlconhecimento)
  .then(res => res.json())
  .then(data => {
    const items = Array.isArray(data.result) ? data.result : [];
    const container = document.querySelector(".container-conhecimentos");

    if (!container) {
      console.error("Container de conhecimentos não encontrado!");
      return;
    }
    container.innerHTML = ""; // Limpa o conteúdo antes de renderizar

    items.forEach(item => {
      // Verifique se o item tem o campo imagemUrl
      const imagemUrl = item.imagemUrl;
      if (imagemUrl) {
        const img = document.createElement("img");
        img.src = imagemUrl; // Usa a URL da imagem retornada
        img.alt = "Conhecimento";
        container.appendChild(img);
      } else {
        console.error("Imagem não encontrada para o item:", item);
      }
    });
  })
  .catch(err => console.error("Erro ao carregar conhecimento do Sanity:", err));

const urlProjetos = "https://y0jmvi7y.api.sanity.io/v2025-12-15/data/query/production?query=*%0A%5B_type+%3D%3D+%22projetos%22%5D%0A%7Bdescricao%2C+titulo%2C+%22imagemUrl%22%3A+imagem.asset-%3Eurl%2C+link%7D&perspective=drafts";

fetch(urlProjetos)
  .then(res => res.json())
  .then(data => {
    const projetos = Array.isArray(data.result) ? data.result : [];
    const container = document.querySelector(".container-projetos");

    if (!container) {
      console.error("Container de projetos não encontrado!");
      return;
    }

    container.innerHTML = "";

    projetos.forEach(projeto => {
      const card = document.createElement("div");
      card.classList.add("projeto-card");

      // Título
      const titulo = document.createElement("h3");
      titulo.textContent = projeto.titulo || "Sem título";
      card.appendChild(titulo);

      // Imagem
      if (projeto.imagemUrl) {
        const img = document.createElement("img");
        img.src = projeto.imagemUrl;
        img.alt = projeto.titulo || "Projeto";
        card.appendChild(img);
      }

      // Descrição
      const descricao = document.createElement("p");
      descricao.textContent = projeto.descricao || "";
      card.appendChild(descricao);

      // Botão "Ver projeto"
      if (projeto.link) {
        const botao = document.createElement("button");
        botao.textContent = "Ver projeto";
        botao.classList.add("btn-projeto");

        botao.addEventListener("click", () => {
          window.open(projeto.link, "_blank");
        });

        card.appendChild(botao);
      }

      container.appendChild(card);
    });
  })
  .catch(err => console.error("Erro ao carregar projetos do Sanity:", err));


  function toggleMenu() {
    document.querySelector("nav").classList.toggle("ativo");
}

function toggleMenu() {
    const icone = document.getElementById("icone");
    const nav = document.querySelector("nav");

    icone.classList.toggle("ativo");
    nav.classList.toggle("ativo");

    if (icone.textContent.trim() === "density_medium") {
        icone.textContent = "close";
    } else {
        icone.textContent = "density_medium";
    }
}