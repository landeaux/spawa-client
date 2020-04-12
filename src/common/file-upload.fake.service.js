function upload (formData) {
  const pitchDeck = formData.get('pitchdeck');
  return Promise.resolve(
    {
      id: 'pitchdeck',
      originalName: pitchDeck.name,
      fileName: pitchDeck.name,
      url: 'pitchdeck',
    });
}

export { upload };
