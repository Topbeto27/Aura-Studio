// Utility to resolve Firebase Storage paths to download URLs with simple caching.
// Usage:
//  import { resolvePaths } from '../utils/storageResolver'
//  const urls = await resolvePaths(['gallery/foto1.jpg', ...])

import { ref, getDownloadURL } from 'firebase/storage'
import { storage } from '../firebase'

// In-memory cache for the session
const memoryCache = new Map()

// Optional persistent cache key (sessionStorage)
const STORAGE_KEY = 'fs_url_cache_v1'

function loadPersistentCache() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    return JSON.parse(raw)
  } catch (e) {
    return {}
  }
}

function savePersistentCache(obj) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(obj))
  } catch (e) {
    // ignore
  }
}

// Warm memory cache from sessionStorage on first import
const persistent = loadPersistentCache()
Object.keys(persistent).forEach(k => memoryCache.set(k, persistent[k]))

/**
 * resolvePaths(paths)
 * - Tries to resolve storage paths via Firebase Storage SDK.
 * - If Firebase is not configured or a path fails, it falls back to a
 *   local static path under `/storage/<path>` (so you can place files in
 *   `public/storage/...` for deployments that don't use Firebase, e.g. Render).
 * - Returns an array of URLs (or fallback URLs) in the same order as `paths`.
 */
export async function resolvePaths(paths = []) {
  const results = await Promise.all(paths.map(async (p) => {
    // Return cached value if present
    if (memoryCache.has(p)) return memoryCache.get(p)

    // Attempt to resolve via Firebase Storage
    try {
      if (storage) {
        const url = await getDownloadURL(ref(storage, p))
        memoryCache.set(p, url)
        persistent[p] = url
        savePersistentCache(persistent)
        return url
      }
    } catch (err) {
      // fall through to fallback behavior
      console.warn('Firebase Storage resolve failed for', p, err && err.message ? err.message : err)
    }

    // Fallback: serve from public/storage/<path>
    const fallback = `/storage/${p}`
    memoryCache.set(p, fallback)
    persistent[p] = fallback
    savePersistentCache(persistent)
    return fallback
  }))
  return results
}

export function clearCache() {
  memoryCache.clear()
  try { sessionStorage.removeItem(STORAGE_KEY) } catch (e) {}
}
