document.addEventListener("DOMContentLoaded", () => {
  const divObservada = document.querySelector("#div-observada");

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  };

  let visualized = false;

  if (visualized == false) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let segundos = 0;
          const contador = setInterval(() => {
            segundos++;
            if (segundos >= 5) {
              clearInterval(contador);
              if (entry.intersectionRatio >= 0.5) {
                console.log(
                  "Div visualizada por 5 segundos. Fazendo a requisição..."
                );
                
                const data = { nome: "Testando Post" };
                const response = fetch("http://localhost:3300/configs", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
                });
                const json = response.json();
                console.log(json);

                visualized = true;
              }
            }
          }, 1000);
        }
      });
    }, options);

    observer.observe(divObservada);
  }
});

window.addEventListener('beforeunload', function (event) {
    // Enviar requisição para o servidor
    /* fetch('/caminho-da-requisicao', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ mensagem: 'Usuário saiu da página' })
    }); */
    console.log('fechou');
  });
  
