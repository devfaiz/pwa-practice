function createImageTags(payload) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < payload.length; i++) {
    const block = document.createElement("div");
    block.style.backgroundImage = `url(${payload[i].urls.full})`;
    fragment.appendChild(block);
  }

  document.getElementById("image-grid").append(fragment);
}

axios
  .get("https://api.unsplash.com/photos", {
    headers: {
      Authorization: "Client-ID JOH19bdub-5skEo6N8HWqlU9UoL8ctE4ZZ-vMiF-Mk4",
    },
  })
  .then(function (response) {
    createImageTags(response.data);
  });

async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    await navigator.serviceWorker.register("./sw.js");
    try {
    } catch (error) {
      console.log("Service worker registration failed", error);
    }
  }
}

registerServiceWorker();
