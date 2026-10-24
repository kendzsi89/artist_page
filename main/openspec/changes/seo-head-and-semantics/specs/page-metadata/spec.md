# Spec Delta

## Purpose

Defines what the document head and crawler files expose so that search engines, social scrapers, and messaging apps can describe, preview, and index the artist page.

## ADDED Requirements

### Requirement: Document title and description
The served HTML SHALL include a `<title>` of the form `Kendzsi Tanaka — Pianist` and a `<meta name="description">` between 120 and 160 characters that names the artist, the instrument, and the city.

#### Scenario: Title present in HTML before scripts run
- **WHEN** the page HTML is fetched without executing JavaScript
- **THEN** the response contains `<title>Kendzsi Tanaka — Pianist</title>` and a description meta tag of 120–160 characters mentioning "pianist" and "Copenhagen"

### Requirement: Canonical URL
The served HTML SHALL include a `<link rel="canonical">` pointing to `https://kendzsi.com/`.

#### Scenario: Canonical on the root
- **WHEN** the root document is fetched
- **THEN** exactly one canonical link exists and its `href` is `https://kendzsi.com/`

### Requirement: Link preview metadata
The served HTML SHALL include Open Graph and Twitter card tags sufficient for a rich preview: `og:title`, `og:description`, `og:url`, `og:type`, `og:image` (1200×630, absolute URL), and `twitter:card` with value `summary_large_image`.

#### Scenario: Shared link preview
- **WHEN** the URL is pasted into a scraper that reads Open Graph tags (for example, the Facebook Sharing Debugger or `curl` plus tag inspection)
- **THEN** a title, description, and a 1200×630 image URL are returned, and the image URL resolves with status 200 and an `image/*` content type

### Requirement: Structured data for the artist
The served HTML SHALL include a JSON-LD `Person` object with `name`, `jobTitle`, `url`, `image`, and a `sameAs` array containing the Spotify, YouTube, Instagram, and LinkedIn profile URLs already linked on the page.

#### Scenario: Rich result validation
- **WHEN** the served HTML is submitted to a schema validator
- **THEN** one `Person` entity is detected with no errors, `jobTitle` equals `Pianist`, and `sameAs` lists four URLs matching the social links in the hero

### Requirement: Favicon set
The site SHALL serve a favicon set (`favicon.ico`, SVG or 32-px PNG, and `apple-touch-icon.png`) derived from the artist's identity, not the build tool's logo.

#### Scenario: Browser tab icon
- **WHEN** the page is opened in a browser
- **THEN** the tab shows the artist favicon and no request is made for `/vite.svg`

### Requirement: Crawler files
`robots.txt` SHALL allow all user agents and reference the sitemap; `sitemap.xml` SHALL list the root URL with a `lastmod` date. Both SHALL be served as their own content types, not the HTML fallback.

#### Scenario: Robots served as text
- **WHEN** `/robots.txt` is requested
- **THEN** the response has content type `text/plain`, contains `User-agent: *`, `Allow: /`, and `Sitemap: https://kendzsi.com/sitemap.xml`

#### Scenario: Sitemap served as XML
- **WHEN** `/sitemap.xml` is requested
- **THEN** the response has an XML content type and contains a `<url>` entry whose `<loc>` is `https://kendzsi.com/`

### Requirement: Content present without JavaScript
The served HTML SHALL contain the page's headings, biography paragraphs, and quotes as text, so indexers that do not execute scripts can read them.

#### Scenario: Fetch without a browser
- **WHEN** the root document is fetched with a plain HTTP client
- **THEN** the body contains the `h1` with the artist's name, every `h2` section label, and the first biography paragraph text
