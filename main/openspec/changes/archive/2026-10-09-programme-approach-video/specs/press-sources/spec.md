# Spec Delta

## Purpose

Records the sources the owner supplied for the two press lines, so each one renders as an attributed pull quote.

## ADDED Requirements

### Requirement: Gershwin quote names its source
The quote beginning "… Kendzsi played Rhapsody in Blue" SHALL keep its current words and SHALL name Adam G. Steve, Régiségeknek, with the outlet linking to `https://regisegeknek.blog.hu/2018/06/24/egy_japan-magyar_zongorista_igeretes_palyakezdese`.

#### Scenario: Hungarian review is a pull quote
- **WHEN** that quote is rendered
- **THEN** it is a `blockquote` whose attribution begins with an em dash, includes "Adam G. Steve" and "Régiségeknek", and the outlet is a link to that URL opening in a new tab with `rel="noopener noreferrer"`

#### Scenario: Tracking parameters are not in the href
- **WHEN** the outlet link is inspected
- **THEN** the `href` does not contain `utm_`

### Requirement: Chopin quote names its source
The quote beginning "The warmth and melancholy of this soulful piece" SHALL keep its current words and SHALL name PH Pianos, The Chopin Project, with the outlet linking to `https://phpianosphfurniture.com/blogs/news/the-chopin-project-part-1-of-2`.

#### Scenario: Chopin Project line is a pull quote
- **WHEN** that quote is rendered
- **THEN** it is a `blockquote` whose attribution begins with an em dash, includes "PH Pianos" and "The Chopin Project", and the outlet is a link to that URL opening in a new tab with `rel="noopener noreferrer"`
