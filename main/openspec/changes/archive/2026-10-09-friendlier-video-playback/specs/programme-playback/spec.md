# Spec Delta

## Purpose

Lets a visitor leave a playing programme film, fade that film's sheet while it plays, and keep the play control clear of a bottom sheet.

## ADDED Requirements

### Requirement: Clicking away restores the section
A click outside a playing programme film SHALL end that playback. The sheet SHALL return in front of the still, the page SHALL return to its ordinary shading, and the film SHALL stop. A click on the film SHALL NOT end playback.

#### Scenario: Click the dimmed page
- **WHEN** a programme film is playing and the visitor clicks the dimmed page outside that film
- **THEN** the sheet is in front of the still, the page shading is as it was before playback, and the film is no longer playing

#### Scenario: Click the faded sheet
- **WHEN** a programme film is playing and the visitor clicks that film's sheet
- **THEN** playback ends the same way as a click on the dimmed page

#### Scenario: Click the film
- **WHEN** a programme film is playing and the visitor clicks the film
- **THEN** that film keeps playing and the sheet stays behind it

### Requirement: Escape ends playback
While a programme film is playing, Escape SHALL end that playback the same way a click away does.

#### Scenario: Escape
- **WHEN** a programme film is playing and the visitor presses Escape
- **THEN** the sheet is in front of the still, the page shading is restored, and the film is no longer playing

### Requirement: The sheet fades while its film plays
While a programme film is playing, its sheet SHALL recede to opacity 0.6 with a 4px blur. Ending playback SHALL restore full opacity and remove the blur. The change SHALL use the existing enter duration. Under reduced motion it SHALL apply immediately, with no transition.

#### Scenario: Sheet recedes
- **WHEN** the visitor starts a programme film
- **THEN** that film's sheet is faded and blurred, and the rest of the page is dimmer than before

#### Scenario: Sheet returns
- **WHEN** the visitor ends that playback
- **THEN** the sheet is fully opaque and not blurred

#### Scenario: Reduced motion fade
- **WHEN** `prefers-reduced-motion: reduce` is set and the visitor starts a film
- **THEN** the sheet is faded and blurred at once, without a fade transition

### Requirement: Starting a film still steps it forward
Starting a programme film SHALL paint that film in front of its sheet and dim the rest of the page. Under reduced motion the film SHALL still end in front of its sheet, without the travel, and the dim SHALL still apply. Ending one film SHALL NOT end another film that is still playing.

#### Scenario: Playback comes forward
- **WHEN** the visitor starts a programme film
- **THEN** that film is in front of its sheet and the rest of the page is dimmer than the playing film

#### Scenario: Another film stays
- **WHEN** two programme films are playing and the visitor ends one of them
- **THEN** the other film stays in front of its own sheet and the page stays dimmed for that film

### Requirement: Bottom play control clears the sheet
Before playback, on a bottom placement, the play control SHALL sit fully above the sheet, with at least 2rem of clear space between the control and the sheet, and SHALL remain fully visible and operable.

#### Scenario: Wide bottom sheet
- **WHEN** the viewport is at least the wide layout breakpoint and the visitor views a bottom sheet before playback
- **THEN** the play control does not intersect the sheet and the gap between them is at least 2rem

#### Scenario: Narrow bottom sheet
- **WHEN** the viewport is 390px wide and the visitor views a bottom sheet before playback
- **THEN** the play control does not intersect the sheet and the gap between them is at least 2rem
