const revealedSections = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) {
        continue;
      }

      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  },
  {
    threshold: 0.18,
  }
);

for (const section of revealedSections) {
  revealObserver.observe(section);
}
