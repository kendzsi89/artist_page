# Spec Delta

## Purpose

Sets a sourced press testimony one step above body type, and puts a signal-red opening mark above it.

## ADDED Requirements

### Requirement: Testimony is one step above body
A sourced pull quote SHALL be italic Playfair at `text-xl` below the wide breakpoint and `lg:text-2xl` from that breakpoint up, with line-height `1.45` and colour `--ink`. Its words SHALL stay the current strings.

#### Scenario: Wide testimony
- **WHEN** the viewport is at least the wide layout breakpoint
- **THEN** each sourced quote is italic, its font size is the `text-2xl` size, and the quote string is unchanged

#### Scenario: Narrow testimony
- **WHEN** the viewport is 390px wide
- **THEN** each sourced quote's font size is the `text-xl` size

### Requirement: Opening mark is signal red
A sourced pull quote SHALL show one opening quotation mark above the words, in `--highlight`, at `text-4xl`. The mark SHALL NOT be clay, and SHALL NOT sit as an icon beside the paragraph.

#### Scenario: Mark colour and place
- **WHEN** a visitor views a Press quote
- **THEN** the mark's colour is `#db2b2b`, its font size is the `text-4xl` size, and it is above the quote text

### Requirement: The design contract matches the quote
The root design contract and the design briefs that set pull-quote type SHALL describe this size and a signal-red mark. They SHALL NOT require a clay quotation mark or `text-2xl` / `lg:text-3xl` for the testimony.

#### Scenario: Contract check
- **WHEN** `README.md`, `docs/design/README.md`, `docs/design/visual-system.md`, and `docs/design/refactor-programme.md` are read
- **THEN** each one that states a pull-quote size or mark colour agrees with this size and a signal-red mark, and none of them still require a clay mark on the testimony
