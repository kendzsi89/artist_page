# Spec Delta

## Purpose

Shows each performance video as a photograph with a play mark, loading the third-party player only when a visitor chooses to watch, so the page reads as a gallery and loads without four iframes.

## ADDED Requirements

### Requirement: Poster before player
Each video SHALL initially render as a still image (poster) with a visible play affordance and SHALL NOT create an iframe or request third-party player script until activated.

#### Scenario: Initial load has no video iframes
- **WHEN** the page loads and is scrolled to the end without clicking any poster
- **THEN** no `iframe` whose `src` points at a video host exists in the DOM and no requests to that host appear in the network panel

### Requirement: Click to play
Activating a poster SHALL replace it with the embedded player for that video and start playback.

#### Scenario: Poster activated
- **WHEN** the visitor clicks or presses Enter/Space on a poster
- **THEN** within the same mount the player iframe is inserted with the correct video id and begins playing

#### Scenario: Only the activated video loads
- **WHEN** one poster is activated
- **THEN** the other posters remain images and no additional player iframes are created

### Requirement: Poster source and fallback
A poster SHALL use a local image when one exists for that video; otherwise it SHALL use the video host's highest-resolution thumbnail. Posters SHALL respect the image budget (≤ 250 KB).

#### Scenario: Local poster present
- **WHEN** a local poster file is configured for a video
- **THEN** the rendered `img` `src` is the local file

#### Scenario: Local poster missing
- **WHEN** no local poster is configured
- **THEN** the `img` `src` is the host's high-resolution thumbnail URL for that video id

### Requirement: Poster is accessible
The poster SHALL be a `button` (or contain one) with an accessible name "Play video: <title>", and the image SHALL have descriptive `alt`.

#### Scenario: Accessible name
- **WHEN** the poster control is inspected
- **THEN** its accessible name begins with "Play video" and includes the video's title

### Requirement: Layout stays fixed through the swap
The poster and the player SHALL occupy the same 16:9 box so the page does not shift when the player is inserted.

#### Scenario: No shift on activation
- **WHEN** a poster is activated
- **THEN** the mount's width and height are unchanged before and after the iframe appears

### Requirement: Design treatment applies to posters
Posters SHALL sit on the same paper mount, with the same shadow and hover lift, as the design contract specifies for video frames.

#### Scenario: Hover lift
- **WHEN** a pointer hovers a poster on a device with a fine pointer
- **THEN** the mount lifts and the shadow deepens over the hover duration, and the play mark becomes more prominent
