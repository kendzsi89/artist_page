# stage-panel-placement Specification

## Purpose

Places each programme sheet in a different part of its film, keeps the paired heading on that sheet, and brings a playing film forward of the sheet.

## Requirements

### Requirement: Wide placements differ
From the wide layout breakpoint up, each paired section SHALL place its sheet on the film as follows: the first Press sheet on the top trailing side, the second Press sheet along the left side, the Approach sheet along the right side, the Experiment sheet on the top leading side, and the Teaching sheet along the bottom. The sheet SHALL overlap the film. The film SHALL stay wider than the sheet.

#### Scenario: Five places
- **WHEN** the viewport is at least the wide layout breakpoint
- **THEN** those five sheets occupy those five places, and the Teaching sheet is not on the top edge

### Requirement: Teaching stays on the bottom
At every viewport width, the Teaching sheet SHALL sit along the bottom of its film and SHALL overlap that film.

#### Scenario: Narrow Teaching
- **WHEN** the viewport is 390px wide
- **THEN** the Teaching sheet overlaps the lower part of its film rather than the top edge

### Requirement: Experiment stays on the top left
At every viewport width, the Experiment sheet SHALL overlap the top of its film and SHALL be aligned to the leading side.

#### Scenario: Narrow Experiment
- **WHEN** the viewport is 390px wide
- **THEN** the Experiment sheet overlaps the top of its film and is aligned left, with film still visible beside it

### Requirement: Play control follows the open area
Before playback, the play control SHALL sit in the part of the film the sheet does not cover, and SHALL remain fully visible and operable. From the wide breakpoint up, before playback, the sheet SHALL NOT cover the bottom 3.5rem of the film. Starting playback SHALL NOT change the film block's layout width or height.

#### Scenario: Bottom sheet
- **WHEN** the visitor views Teaching
- **THEN** the play control is in the upper part of the film, clear of the sheet

#### Scenario: Side sheet
- **WHEN** the visitor views the second Press block or Approach on a wide viewport
- **THEN** the play control is on the opposite side from the sheet and does not intersect it

#### Scenario: Wide player bar
- **WHEN** the viewport is at least the wide breakpoint and a film has not been started
- **THEN** the sheet does not intersect the bottom 3.5rem of that film

### Requirement: Playing film steps forward
When a visitor starts a programme film, that film SHALL move in front of its sheet. The still SHALL stay behind the sheet until that start. The rest of the page SHALL dim slightly for as long as that film is playing. The step forward SHALL animate. Under reduced motion the film SHALL still end in front of its sheet, without that travel, and the dim SHALL still apply.

#### Scenario: Poster rests behind the sheet
- **WHEN** a paired section has not been played
- **THEN** the still is behind the sheet and the play control can receive a click

#### Scenario: Playback comes forward
- **WHEN** the visitor starts a programme film
- **THEN** that film is painted in front of its sheet, the rest of the page is dimmer than before, and other sections stay dimmer than the playing film

#### Scenario: Reduced motion
- **WHEN** `prefers-reduced-motion: reduce` is set and the visitor starts a film
- **THEN** the film does not travel, and it is still in front of its sheet with the page dimmed

### Requirement: Paired labels sit on the sheet
On a section that has a film, the section label SHALL sit immediately above that section's sheet, in the same panel, and SHALL NOT sit on the page ground above the whole stage. The Biography label SHALL stay in its current place on the page ground.

#### Scenario: Press label
- **WHEN** a visitor views a Press section
- **THEN** the Press heading is directly above that section's sheet, not above the film as a whole

#### Scenario: Biography label
- **WHEN** a visitor views Biography
- **THEN** the Biography heading is where it is today, with no film behind it

### Requirement: Other narrow sections keep a top overlap
Below the wide breakpoint, the first Press block, the second Press block, and Approach SHALL keep the sheet overlapping the top of the film. They SHALL NOT become a gap-separated stack.

#### Scenario: Narrow Press
- **WHEN** the viewport is 390px wide
- **THEN** the first Press sheet overlaps the top of its film and the play control remains visible
