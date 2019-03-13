export function removeDuplicatedDashs(url) {
  return url.replace('http://', 'http:///').replace('https://', 'https:///').replace(/\/\//g, '/');
}
