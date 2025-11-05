import imagesData from './images.json'

export const galleryImages = imagesData.galleryImages || []
export const heroImages = imagesData.heroImages || []
export const teamImages = imagesData.teamImages || []
export const privateImages = imagesData.privateImages || []

/*
  Note: `images.json` is the canonical manifest referenced by the
  validation script `tools/validateStoragePaths.js`.

  To add/remove images update `src/data/images.json` and then upload the
  corresponding files to your Firebase Storage bucket.
*/
