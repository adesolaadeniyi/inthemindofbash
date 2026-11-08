const escapeHtml = value => value.replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
async function init() {
  const response = await fetch('posts.json');
  if (!response.ok) throw new Error('Could not load stories');
  const posts = await response.json();
  const article = document.querySelector('#article');
  if (article) {
    const post = posts.find(post => post.slug === new URLSearchParams(location.search).get('slug'));
    if (!post) { article.innerHTML = '<h1>Story not found.</h1><p>Head back to the journal to find something to read.</p>'; return; }
    document.title = `${post.title} — In the Mind of Bash`;
    document.querySelector('meta[name="description"]').content = post.description;
    article.innerHTML = `<div class="eyebrow">${escapeHtml(post.category)}</div><h1>${escapeHtml(post.title)}</h1><p class="post-meta">${escapeHtml(post.date)}</p><p class="article-deck">${escapeHtml(post.description)}</p><div class="article-body">${post.body.map(text => `<p>${escapeHtml(text)}</p>`).join('')}</div>`;
    return;
  }
  let category = 'All';
  const search = document.querySelector('#search');
  function render() {
    const query = search.value.trim().toLowerCase();
    const filtered = posts.filter(post => (category === 'All' || category === post.category) && `${post.title} ${post.description} ${post.category}`.toLowerCase().includes(query));
    document.querySelector('#posts').innerHTML = filtered.length ? filtered.map(post => `<a class="post-card" href="post.html?slug=${encodeURIComponent(post.slug)}"><div class="card-art art-${posts.indexOf(post) % 3}" aria-hidden="true"><span></span><i></i></div><div class="card-copy"><div class="eyebrow">${escapeHtml(post.category)}</div><h3>${escapeHtml(post.title)}</h3><p>${escapeHtml(post.description)}</p><div class="card-bottom"><span>${escapeHtml(post.date)}</span><span aria-hidden="true">→</span></div></div></a>`).join('') : '<p class="empty-state">No stories found. Try another search or category.</p>';
  }
  document.querySelectorAll('[data-category]').forEach(button => button.addEventListener('click', () => {
    category = button.dataset.category;
    document.querySelectorAll('[data-category]').forEach(item => { item.classList.toggle('active', item === button); item.setAttribute('aria-pressed', String(item === button)); });
    render();
  }));
  search.addEventListener('input', render);
  render();
}
init().catch(() => { const article = document.querySelector('#article'); if (article) article.innerHTML = '<h1>Unable to load this story.</h1><p>Please refresh and try again.</p>'; else document.querySelector('#load-error').hidden = false; });
