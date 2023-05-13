export function runScript(id, script) {
  const formData = new FormData();
  formData.append('script', script);
  formData.append('id', id);
  return fetch(`/api/console`, {
    method: 'POST',
    body: formData,
  })
    .then(res => res.json())
    .then(output => output);
}
