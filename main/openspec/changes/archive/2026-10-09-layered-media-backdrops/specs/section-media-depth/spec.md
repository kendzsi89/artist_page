# Spec Delta

## Purpose

Gives each programme film a larger plane behind the quote or paragraph it accompanies, so those blocks have the same depth as the hero and the Listen room.

## ADDED Requirements

### Requirement: Media sits behind featured text
A section that contains both a video and featured text (a sourced quote or a paragraph) SHALL render the video as a block wider than that text and behind it. The text SHALL overlap the video so the photograph reads as the text's backdrop. The text SHALL stay on an opaque paper sheet.

#### Scenario: Paired section
- **WHEN** a visitor views Press, Approach, Experiment, or Teaching
- **THEN** the video block is wider than the text sheet, the sheet overlaps the video, and the sheet's shadow falls on the photograph

#### Scenario: Five paired sections
- **WHEN** the page is scrolled from the first Press block through Teaching
- **THEN** each of those five videos is a backdrop for its own text, and no two sections share one video

### Requirement: Play control stays clear
The overlap SHALL leave the play control fully visible and operable. After the visitor starts playback, the overlap SHALL leave the player's controls fully visible and operable. Starting playback SHALL NOT change the video block's width or height.

#### Scenario: Poster can be played
- **WHEN** the visitor activates the play control on a backed-up video
- **THEN** the control receives the activation, the player replaces the still inside the same block, and the sheet does not cover the player's controls

### Requirement: Overlap side alternates
The page SHALL alternate which side of the video the sheet overlaps, following the existing reverse flag on that section.

#### Scenario: Reversed section
- **WHEN** a section is marked to reverse and the viewport is wide
- **THEN** its sheet overlaps the opposite side from the previous paired section

### Requirement: Label stays on the page ground
The section label SHALL sit on the page ground, above the video and the sheet. It SHALL NOT sit on the photograph and SHALL NOT sit inside the sheet.

#### Scenario: Label contrast
- **WHEN** a paired section is shown
- **THEN** the label is outside the video block and outside the sheet, on the page ground

### Requirement: Narrow viewports keep the overlap
Below the wide layout breakpoint, a paired section SHALL keep the video behind the sheet. It SHALL NOT fall back to two stacked columns with no overlap.

#### Scenario: Narrow viewport
- **WHEN** the viewport is 390px wide
- **THEN** the video is still behind the sheet, the sheet still overlaps it, and the play control remains fully visible

### Requirement: Unpaired sections stay flat
A section with no video SHALL render its text on the page ground, with no backdrop block.

#### Scenario: Biography
- **WHEN** the visitor views Biography
- **THEN** the paragraph sits on the page ground and no video block is behind it
