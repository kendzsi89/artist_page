# Spec Delta

## Purpose

Defines how photographs are sized, encoded, prioritised, and lazy-loaded so the page paints quickly on mobile without losing the full-bleed photography the design depends on.

## ADDED Requirements

### Requirement: Hero image is prioritised
The hero photograph SHALL be delivered as an `img` element with a `srcset` offering at least 960, 1440, 1920, and 2560 px widths, a `sizes` attribute of `100vw`, and `fetchpriority="high"`. The document SHALL preload the hero image.

#### Scenario: Hero is the first image request
- **WHEN** the page loads with the network panel open
- **THEN** the hero image is requested before any gallery or footer image, carries high priority, and the chosen candidate is no wider than 1.5× the viewport width in device pixels

#### Scenario: Hero still animates
- **WHEN** the page loads on a device without reduced motion
- **THEN** the hero `img` scales from 1.08 to 1 over the duration in the design contract, clipped by its frame, with no horizontal scrollbar

### Requirement: File size budget
Each photograph served SHALL be within budget: hero ≤ 300 KB at 1920 px wide, every gallery image ≤ 250 KB, footer and listening-room backgrounds ≤ 250 KB. Photographs SHALL be JPEG, WebP, or AVIF, not PNG.

#### Scenario: Budget audit
- **WHEN** the built `dist/` is inspected
- **THEN** no photograph exceeds its budget and no `.png` photograph exists; `du` or the network panel confirms sizes

### Requirement: Below-the-fold images are lazy
Every image not in the initial viewport (gallery, listening room background, footer portrait) SHALL have `loading="lazy"` and `decoding="async"`.

#### Scenario: Initial load requests
- **WHEN** the page is loaded and not scrolled
- **THEN** gallery images and the footer portrait are not requested until they approach the viewport

### Requirement: Layout does not shift on image load
Images SHALL declare intrinsic dimensions or an aspect ratio so space is reserved before the bytes arrive.

#### Scenario: No cumulative layout shift from photographs
- **WHEN** the page is loaded with a throttled connection
- **THEN** the hero, gallery, and footer image containers keep their size before and after each image loads, and Lighthouse reports CLS below 0.1
