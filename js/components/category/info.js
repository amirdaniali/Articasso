
// Component to show the data about a category
export function categoryInformation(category) {
  const card = document.createElement('div');
  card.className = 'category-info'; // Styling will be in styles.css
  
  // Add title
  const title = document.createElement('p');
  title.className = 'category-title';
  title.textContent = category.data.title || 'Unknown Category';
  card.appendChild(title);


  // Add Info Wrapper
  const infoWrapper = document.createElement('div');
  infoWrapper.className = 'category-info';

  // Add subtype

  const subtype = document.createElement('h3');
  subtype.className = 'category-subtype';
  subtype.textContent = `Subtype: ` + (category.data.title || 'Unknown Subtype');
  card.appendChild(subtype);

  // Add id

  const id = document.createElement('a');
  id.title = `Category ID: ${category.data.id}`;
  id.className = 'category-id SPA-link'; // all links with SPA-link class will be handled by routes.js file
  id.href = `/category/${category.data.id}`;
  id.appendChild(document.createTextNode(`Category ID: ${category.data.id}`));
  infoWrapper.appendChild(id);

  card.appendChild(infoWrapper);

  return card
}

