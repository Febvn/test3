File: src/App.css

```css
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}
```

Penjelasan singkat:
- `#root`: pembatas lebar maksimal, center alignment, padding global.
- `.logo`: styling logo demo, efek hover dengan drop-shadow.
- `@keyframes logo-spin`: animasi rotasi untuk logo.
- Media query `prefers-reduced-motion`: menerapkan animasi hanya bila pengguna tidak meminta reduced motion.
- `.card` dan `.read-the-docs` untuk styling sample components.
