#!/usr/bin/env node
// Copy images from src/assets to public/storage in folders expected by images.json
import fs from 'fs'
import fsp from 'fs/promises'
import path from 'path'

const root = process.cwd()
const srcAssets = path.join(root, 'src', 'assets')
const publicStorage = path.join(root, 'public', 'storage')

async function ensureDir(dir) {
  await fsp.mkdir(dir, { recursive: true })
}

function fileExists(p) {
  try { return fs.existsSync(p) } catch (e) { return false }
}

async function copyIfExists(src, dest) {
  if (!fileExists(src)) return false
  await ensureDir(path.dirname(dest))
  await fsp.copyFile(src, dest)
  return true
}

async function main() {
  // Read manifest
  const manifestPath = path.join(root, 'src', 'data', 'images.json')
  if (!fileExists(manifestPath)) {
    console.error('Manifest not found at', manifestPath)
    process.exit(1)
  }
  const manifest = JSON.parse(await fsp.readFile(manifestPath, 'utf8'))

  // We'll look for files in src/assets matching galleryN.* or hero.* etc.
  const results = []

  // Helper to resolve candidate names in src/assets
  const candidates = (baseName) => {
    // try .jpg, .webp, .png
    return [`${baseName}.jpg`, `${baseName}.webp`, `${baseName}.png`]
  }

  // Copy gallery images
  if (Array.isArray(manifest.galleryImages)) {
    for (const p of manifest.galleryImages) {
      // p is like 'gallery/gallery1.jpg'
      const parts = p.split('/')
      const filename = parts[parts.length -1] // gallery1.jpg
      // derive base like gallery1 (strip extension)
      const base = filename.replace(/\.[^.]+$/, '')
      // try to find source file in src/assets
      let found = false
      for (const cand of candidates(base)) {
        const srcPath = path.join(srcAssets, cand)
        const destPath = path.join(publicStorage, p)
        if (fileExists(srcPath)) {
          await copyIfExists(srcPath, destPath)
          results.push({src: srcPath, dest: destPath})
          found = true
          break
        }
      }
      if (!found) {
        console.warn('Missing source for', p)
      }
    }
  }

  // Hero images
  if (Array.isArray(manifest.heroImages)) {
    for (const p of manifest.heroImages) {
      const filename = p.split('/').pop()
      const base = filename.replace(/\.[^.]+$/, '')
      let found = false
      for (const cand of candidates(base)) {
        const srcPath = path.join(srcAssets, cand)
        const destPath = path.join(publicStorage, p)
        if (fileExists(srcPath)) {
          await copyIfExists(srcPath, destPath)
          results.push({src: srcPath, dest: destPath})
          found = true
          break
        }
      }
      if (!found) console.warn('Missing hero source for', p)
    }
  }

  // Team / private images (attempt best-effort)
  for (const key of ['teamImages', 'privateImages']) {
    if (!Array.isArray(manifest[key])) continue
    for (const p of manifest[key]) {
      const filename = p.split('/').pop()
      const base = filename.replace(/\.[^.]+$/, '')
      let found = false
      for (const cand of candidates(base)) {
        const srcPath = path.join(srcAssets, cand)
        const destPath = path.join(publicStorage, p)
        if (fileExists(srcPath)) {
          await copyIfExists(srcPath, destPath)
          results.push({src: srcPath, dest: destPath})
          found = true
          break
        }
      }
      if (!found) console.warn('Missing source for', p)
    }
  }

  console.log('Copy results:')
  results.forEach(r => console.log('-', r.src, '=>', r.dest))
  console.log('Done.')
}

main().catch(e => { console.error(e); process.exit(1) })
