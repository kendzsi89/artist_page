# Spec Delta

## Purpose

Makes the contact details reachable from the top of the page and usable with one tap on any device.

## ADDED Requirements

### Requirement: Email is a link
The email address SHALL be rendered as an anchor with an `href` of `mailto:akendzsi@gmail.com` and visible text equal to the real address.

#### Scenario: Tap email on a phone
- **WHEN** a visitor taps the email in the contact section
- **THEN** the device opens its mail client addressed to `akendzsi@gmail.com`

### Requirement: Phone is a link
The phone number SHALL be rendered as an anchor with an `href` of `tel:+4550394351` and visible text formatted for reading, `+45 50 39 43 51`.

#### Scenario: Tap phone on a phone
- **WHEN** a visitor taps the phone number
- **THEN** the dialler opens with `+45 50 39 43 51`

#### Scenario: Visible string contains only digits, spaces and plus
- **WHEN** the phone text is inspected
- **THEN** it matches `^\+[\d ]+$` (no letters standing in for digits)

### Requirement: Contact is reachable from the hero
The hero SHALL contain a link whose visible text is "Get in touch" and whose target is the contact section, so a visitor can reach contact without scrolling the whole page.

#### Scenario: Jump to contact
- **WHEN** the "Get in touch" link in the hero is activated
- **THEN** the view scrolls to the contact section, the URL fragment is `#contact`, and focus moves to the contact heading

#### Scenario: Smooth scroll respects reduced motion
- **WHEN** `prefers-reduced-motion: reduce` is set and the link is activated
- **THEN** the page jumps to the contact section without animated scrolling

### Requirement: Contact section has a stable anchor
The contact section SHALL have `id="contact"` so external links and the hero link can target it.

#### Scenario: Direct link
- **WHEN** `https://kendzsi.com/#contact` is opened
- **THEN** the contact section is in view on load
