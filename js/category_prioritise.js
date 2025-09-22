const exploreInput = document.getElementById('exploreInput');
  const categoryGrid = document.getElementById('categoryGrid');
  const cards = Array.from(categoryGrid.getElementsByClassName('category_card'));

  exploreInput.addEventListener('input', function () {
    const query = this.value.trim().toLowerCase();

    if (!query) {
      // Reset to original order
      cards.forEach(card => categoryGrid.appendChild(card));
      return;
    }

    // Split input if multiple terms typed
    const terms = query.split(',').map(term => term.trim());

    // Sort: matched terms first
    const sorted = cards.slice().sort((a, b) => {
      const aCategory = a.dataset.category.toLowerCase();
      const bCategory = b.dataset.category.toLowerCase();

      const aMatch = terms.some(term => aCategory.includes(term));
      const bMatch = terms.some(term => bCategory.includes(term));

      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return 0; // No change if both match or both don't
    });

    // Reorder in DOM
    sorted.forEach(card => categoryGrid.appendChild(card));
  });