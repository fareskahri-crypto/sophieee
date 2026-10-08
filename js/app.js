/* Slay Clay — zero-dependency interaction layer */
(() => {
  "use strict";

  const WA_NUMBER = "YOUR_WHATSAPP_NUMBER"; // Replace with digits only, including country code.
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];

  // Year
  $("#year").textContent = new Date().getFullYear();

  // Scroll progress
  const progress = $("#scrollProgress");
  const updateProgress = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  };
  window.addEventListener("scroll", updateProgress, {passive:true});
  updateProgress();

  // Theme persistence
  const themeToggle = $("#themeToggle");
  const savedTheme = localStorage.getItem("slay-clay-theme");
  if (savedTheme) document.documentElement.dataset.theme = savedTheme;
  themeToggle.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    if (next === "light") delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = "dark";
    localStorage.setItem("slay-clay-theme", next);
  });

  // Mobile menu
  const menuToggle = $("#menuToggle"), mobileMenu = $("#mobileMenu");
  menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!open));
    mobileMenu.hidden = open;
  });
  $$("#mobileMenu a").forEach(a => a.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    mobileMenu.hidden = true;
  }));

  // Search
  const searchToggle = $("#searchToggle"), searchPanel = $("#searchPanel"), siteSearch = $("#siteSearch");
  searchToggle.addEventListener("click", () => {
    const open = searchToggle.getAttribute("aria-expanded") === "true";
    searchToggle.setAttribute("aria-expanded", String(!open));
    searchPanel.hidden = open;
    if (!open) setTimeout(() => siteSearch.focus(), 0);
  });
  const cards = $$(".gallery-item");
  const searchCount = $("#searchCount"), emptyState = $("#emptyState");
  siteSearch.addEventListener("input", () => {
    const q = siteSearch.value.trim().toLowerCase();
    let shown = 0;
    cards.forEach(card => {
      const match = !q || card.dataset.tags.includes(q) || card.textContent.toLowerCase().includes(q);
      card.hidden = !match;
      if (match) shown++;
    });
    searchCount.textContent = q ? `${shown} creation${shown === 1 ? "" : "s"}` : "";
    emptyState.hidden = shown !== 0;
  });

  // Category -> form selection
  $$(".category-card").forEach(card => card.addEventListener("click", () => {
    const product = card.dataset.product;
    if (product) $("#product").value = product;
  }));

  // Upload / preview
  const reference = $("#reference"), uploadTrigger = $("#uploadTrigger"), uploadBox = $("#uploadBox");
  const uploadPreview = $("#uploadPreview"), previewImage = $("#previewImage"), removeImage = $("#removeImage");
  uploadTrigger.addEventListener("click", () => reference.click());
  ["dragenter","dragover"].forEach(type => uploadBox.addEventListener(type, e => {
    e.preventDefault(); uploadBox.classList.add("is-dragging");
  }));
  ["dragleave","drop"].forEach(type => uploadBox.addEventListener(type, e => {
    e.preventDefault(); uploadBox.classList.remove("is-dragging");
  }));
  uploadBox.addEventListener("drop", e => {
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  });
  reference.addEventListener("change", () => {
    if (reference.files?.[0]) handleFile(reference.files[0]);
  });
  function handleFile(file) {
    if (!file.type.startsWith("image/")) return setStatus("Please choose an image file.");
    if (file.size > 8 * 1024 * 1024) return setStatus("Please keep the reference image under 8 MB.");
    const reader = new FileReader();
    reader.onload = () => {
      previewImage.src = reader.result;
      uploadPreview.hidden = false;
      uploadTrigger.hidden = true;
      setStatus("");
    };
    reader.readAsDataURL(file);
  }
  removeImage.addEventListener("click", () => {
    reference.value = "";
    previewImage.removeAttribute("src");
    uploadPreview.hidden = true;
    uploadTrigger.hidden = false;
  });

  // Character count
  const idea = $("#idea"), charCount = $("#charCount");
  idea.addEventListener("input", () => charCount.textContent = `${idea.value.length} / 800`);

  // WhatsApp request
  const form = $("#customForm"), status = $("#formStatus");
  function setStatus(message) { status.textContent = message; }
  form.addEventListener("submit", e => {
    e.preventDefault();
    if (WA_NUMBER.includes("YOUR_")) {
      setStatus("Replace YOUR_WHATSAPP_NUMBER in app.js before publishing.");
      return;
    }
    const product = $("#product").value;
    const name = $("#name").value.trim();
    const description = idea.value.trim();
    if (!product || !name || !description) {
      setStatus("Please complete the required fields.");
      return;
    }
    const imageNote = reference.files?.length
      ? "I have a reference image ready and will attach it in this WhatsApp chat."
      : "I do not have a reference image.";
    const message =
`Hi Slay Clay! ✦

I'd like to request a custom piece.

Name: ${name}
Product: ${product}
Idea: ${description}

${imageNote}

Thank you!`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setStatus("WhatsApp is opening. Please attach your reference image there if you selected one.");
  });

  // Small enhancement: pause hero video when tab is hidden
  const heroVideo = $(".hero-object");
  document.addEventListener("visibilitychange", () => {
    if (!heroVideo) return;
    if (document.hidden) heroVideo.pause();
    else heroVideo.play().catch(() => {});
  });
})();