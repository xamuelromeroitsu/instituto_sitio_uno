export function createModuleCard(module) {
  const article = document.createElement('article');
  article.className = 'module-card';
  article.innerHTML = `
    <h3>${module.title}</h3>
    <p>${module.description}</p>
    <a href="${module.href}">Ir al módulo</a>
  `;
  return article;
}
