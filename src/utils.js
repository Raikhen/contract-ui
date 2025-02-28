const TYPES = ['ul', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];


export const containsClauses = (node) => {
  if (node.type === 'clause') {
    return true;
  }

  if (node.children) {
    return node.children.some(containsClauses);
  }

  return false;
}

export const containsProperClauses = (node) => {
  return containsClauses(node) && node.type !== 'clause';
}

export const containsListOrHeadingAsDescendant = (node) => {
  if (TYPES.includes(node.type)) {
    return true;
  }

  if (node.children) {
    return node.children.some(containsListOrHeadingAsDescendant);
  }

  return false;
}