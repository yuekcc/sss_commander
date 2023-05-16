export function fetchAppList() {
  return fetch(`/metadata`).then(res => res.json());
}
