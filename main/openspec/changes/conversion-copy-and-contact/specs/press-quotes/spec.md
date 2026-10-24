# Spec Delta

## Purpose

Governs how testimonials and press quotes are shown so that every quote carries a verifiable source.

## ADDED Requirements

### Requirement: Every pull quote is attributed
A quote displayed as a pull quote SHALL show an attribution naming the source person or publication and, where known, their role or outlet.

#### Scenario: Attributed quote
- **WHEN** a pull quote with a known source is rendered
- **THEN** an attribution line beginning with an em dash follows the quote text, for example "— Name, Publication"

#### Scenario: Attribution uses the citation element
- **WHEN** the quote markup is inspected
- **THEN** the quote is a `blockquote` and the attribution is a `cite` or a `footer` inside or adjacent to it

### Requirement: Unsourced quotes are not pull quotes
Text whose source is unknown SHALL NOT be rendered in the pull-quote style. It SHALL either be omitted or shown as ordinary body text without quotation styling.

#### Scenario: Source unknown
- **WHEN** a quote entry has no source
- **THEN** the page renders it as a body paragraph (or not at all), with no large quotation mark and no sheet treatment

### Requirement: Quote source data is explicit
Each quote SHALL be defined with its text and an optional source object (`name`, `outlet`, optional `url`), so attribution is data, not hard-coded inside layout.

#### Scenario: Source with URL
- **WHEN** a source includes a URL
- **THEN** the attribution renders the outlet as a link opening in a new tab with `rel="noopener noreferrer"`
