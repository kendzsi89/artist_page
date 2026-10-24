# Spec Delta

## Purpose

Defines the landmark structure, heading hierarchy, and image alternative text of the page so assistive technology and crawlers can understand its parts.

## ADDED Requirements

### Requirement: Landmark regions
The page SHALL expose a `header` landmark for the hero, a single `main` landmark containing the programme, gallery, listening room, and closing sections, and a `footer` landmark for contact. Each major section inside `main` SHALL be a `section` element labelled by its heading.

#### Scenario: Landmark inventory
- **WHEN** the rendered page is inspected with an accessibility tree or `document.querySelectorAll('header, main, footer')`
- **THEN** exactly one `header`, one `main`, and one `footer` exist, and every `section` inside `main` has an `aria-labelledby` pointing to its visible `h2`

### Requirement: Heading hierarchy
The page SHALL have exactly one `h1` containing the artist's name. Every section SHALL begin with an `h2`. Heading levels SHALL not skip (no `h3` without a preceding `h2` in the same section).

#### Scenario: Single h1
- **WHEN** headings are listed in document order
- **THEN** the first heading is an `h1` with text "Kendzsi Tanaka" and no other `h1` exists

#### Scenario: Section labels are headings
- **WHEN** the programme, gallery, listening room, closing, and contact sections are inspected
- **THEN** each contains an `h2` whose text is its label ("Press", "Biography", "Gallery", "Listen", "Teaching", "Contact")

#### Scenario: Contact details are not headings
- **WHEN** the contact section is inspected
- **THEN** the email and phone are links or paragraphs, not `h3` elements, and the only `h2` is "Contact"

### Requirement: Meaningful alternative text
Every content image SHALL have `alt` text that describes the image. Gallery photographs SHALL use their caption as `alt`. Decorative overlays SHALL not be images or SHALL have empty `alt`.

#### Scenario: Gallery alt equals caption
- **WHEN** a gallery slide is inspected
- **THEN** its `img` `alt` equals the caption text shown for that slide, and no `img` on the page has `alt` matching `/^Slide \d+$/`

#### Scenario: Hero alt
- **WHEN** the hero image is inspected
- **THEN** its `alt` names the artist and the setting (for example, "Kendzsi Tanaka at the piano, photographed by Agnete Schlichtkrull")

### Requirement: Interactive controls are labelled
Buttons and links that have no visible text SHALL carry an `aria-label`.

#### Scenario: Gallery dots
- **WHEN** the gallery pagination buttons are inspected
- **THEN** each has an `aria-label` of the form "Show photo N of M" and the active one has `aria-current="true"`

#### Scenario: Social icon links
- **WHEN** a social icon link is inspected
- **THEN** it has an `aria-label` naming the platform (for example, "Kendzsi Tanaka on Spotify")
