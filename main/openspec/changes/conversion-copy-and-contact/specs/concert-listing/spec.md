# Spec Delta

## Purpose

Shows upcoming engagements from a static data file so visitors and presenters can see where the artist is performing next, without a backend.

## ADDED Requirements

### Requirement: Concerts come from a static file
Upcoming engagements SHALL be read from a committed JSON file containing an array of entries with `date` (ISO 8601), `city`, `venue`, optional `programme`, and optional `url`.

#### Scenario: Valid entry renders
- **WHEN** the file contains an entry with a future `date`
- **THEN** the page shows that entry's date, city, venue, and programme, and the venue is a link when `url` is present

#### Scenario: Malformed entry does not break the page
- **WHEN** an entry is missing `date`, `city`, or `venue`
- **THEN** that entry is skipped and the rest of the page renders normally

### Requirement: Only future dates are shown
The block SHALL show entries whose `date` is today or later, sorted ascending.

#### Scenario: Past dates filtered
- **WHEN** the file contains entries dated before today
- **THEN** those entries are not rendered

### Requirement: Block hides when empty
If no future entries exist, the "Upcoming" block SHALL not render at all, including its heading.

#### Scenario: Empty file
- **WHEN** the file is `[]` or every entry is in the past
- **THEN** no "Upcoming" heading or container appears in the DOM

### Requirement: Dates are readable and machine-readable
Each date SHALL be shown in a human-readable form (for example, "14 Mar 2027") inside a `time` element whose `datetime` attribute holds the ISO value.

#### Scenario: Time element
- **WHEN** a concert row is inspected
- **THEN** it contains `<time datetime="YYYY-MM-DD">` with readable text
