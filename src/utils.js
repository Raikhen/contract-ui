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

export function processMentions(data) {
  // Clone data
  const res = JSON.parse(JSON.stringify(data));
  const mentions = {};

  const processNode = (node) => {
    if (node.type === 'mention') {
      mentions[node.id] = node.value;
    }

    if (node.children) {
      node.children.forEach(processNode);
    }
  }

  if (Array.isArray(res)) {
    res.forEach(processNode);
  } else {
    processNode(res);
  }

  // Update mentions throughout the data
  const updateMentions = (node) => {
    if (node.type === 'mention') {
      node.value = mentions[node.id];
    }

    if (node.children) {
      node.children.forEach(updateMentions);
    }
  }

  if (Array.isArray(res)) {
    res.forEach(updateMentions);
  } else {
    updateMentions(res);
  }

  return res;
}