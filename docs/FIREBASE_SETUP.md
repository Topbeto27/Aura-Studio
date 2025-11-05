# Firebase removed

This project no longer uses Firebase Storage or Firebase Hosting. All image
references have been switched to use static files from `public/storage/`, and
Firebase-related tooling (firebase-admin, firebase config files, and docs) was
removed.

To deploy on Render, make sure `public/storage/` contains your images (the
repository includes a helper `tools/copyAssetsToPublic.js` that copies images
from `src/assets/` into `public/storage/` during the build). The project is
configured to run that copy step automatically before `vite build`.

If you'd like to re-enable Firebase later, revert to an earlier commit or I can
help re-add a Firebase initialization and upload tooling.

