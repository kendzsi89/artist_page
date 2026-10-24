# Spec Delta

## Purpose

Ensures a first-time visitor can tell within the first screen who the artist is, what they do, where they trained, and what can be booked.

## ADDED Requirements

### Requirement: Descriptor on the first screen
The hero SHALL display the word "Pianist" as a descriptor directly associated with the artist's name, visible without scrolling at viewport widths from 360 px to 2560 px.

#### Scenario: Descriptor visible on load
- **WHEN** the page loads at 390×844 or 1440×900
- **THEN** the text "Pianist" is rendered inside the hero, within the initial viewport, adjacent to the name

### Requirement: Credentials row
The page SHALL present the artist's principal credentials as a short, scannable row near the top of the programme: Royal Academy of Music (London), Royal Danish Academy of Music (Copenhagen), and 2nd Prize at the International Stasys Vainiūnas Piano Competition (Vilnius).

#### Scenario: Credentials are separate from prose
- **WHEN** the first programme block is inspected
- **THEN** the three credentials appear as discrete items (list items or separated spans), not only inside the biography paragraph

### Requirement: Engagements list
The page SHALL list what the artist offers as four short items: solo recital, chamber music, masterclass, piano tuition. Each item SHALL be one line and SHALL not include prices.

#### Scenario: Engagements rendered before contact
- **WHEN** the page is scrolled from top to bottom
- **THEN** an "Engagements" block with exactly those four items appears after the teaching paragraph and before the contact section

### Requirement: Biography voice is preserved
The existing first-person biography paragraphs SHALL remain word-for-word, and new positioning copy SHALL be added around them rather than replacing them.

#### Scenario: Biography text unchanged
- **WHEN** the rendered biography paragraphs are compared with the text committed before this change
- **THEN** they are identical
