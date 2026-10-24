# Spec Delta

## ADDED Requirements

### Requirement: A pile of prints on the page
On the page, the gallery SHALL show a pile of three or four mounted prints at the photographs' own aspect ratio, uncropped, under the "Gallery" heading, with a short label naming the number of photographs. The top print SHALL be the photograph the visitor last viewed in the viewer, or the first photograph if the viewer has not been opened.

#### Scenario: Resting pile
- **WHEN** the gallery section is on screen and the visitor has not opened the viewer
- **THEN** three or four prints are visible as a pile, the top print is the first photograph uncropped, and a label reads "7 photographs"

#### Scenario: Top print remembers
- **WHEN** the visitor closes the viewer while the fifth photograph is shown
- **THEN** the fifth photograph is the top print of the pile

### Requirement: The pile invites a gesture
A fine pointer resting on the pile SHALL fan the prints apart slightly and lift the top print. On a device without hover, the pile SHALL shuffle once the first time it enters the viewport, then stay still.

#### Scenario: Hover
- **WHEN** a fine pointer rests on the pile
- **THEN** the prints spread apart by a few degrees and the top print rises, and they settle back when the pointer leaves

#### Scenario: Touch device
- **WHEN** the pile first scrolls into view on a device without hover
- **THEN** the pile shuffles once and does not move again on later scrolls

### Requirement: The pile opens the viewer
Activating the pile by click, tap, Enter, or Space SHALL open a photo viewer over the page, showing the top print's photograph. While the viewer is open, keyboard focus SHALL stay inside it and the page behind SHALL not respond to pointer or keyboard input.

#### Scenario: Open by click
- **WHEN** the visitor clicks the pile
- **THEN** the viewer opens showing the photograph that was on top of the pile

#### Scenario: Open by keyboard
- **WHEN** the pile has focus and the visitor presses Enter
- **THEN** the viewer opens and focus moves inside it

### Requirement: The viewer focuses on one photograph
The viewer SHALL show one photograph at a time, uncropped, on a dark warm ground, with its place line and description below it, a position counter, a close control, and a thumbnail of every photograph. No control or text SHALL overlap the photograph.

#### Scenario: Viewer contents
- **WHEN** the viewer is open on the third photograph
- **THEN** the third photograph is shown whole, its place and description are below it, the counter reads "3 / 7", seven thumbnails are shown, and the third is marked current

### Requirement: Closing the viewer
The visitor SHALL be able to close the viewer with Escape, the close control, the browser back action, or a vertical swipe down past a threshold. A shorter downward swipe SHALL return the photograph to its place. Closing SHALL leave the visitor on the page at the gallery, with focus on the pile.

#### Scenario: Back button closes
- **WHEN** the viewer is open and the visitor uses the browser back action
- **THEN** the viewer closes and the visitor stays on the page at the gallery

#### Scenario: Short swipe down
- **WHEN** the visitor drags the photograph down a short distance and releases before the threshold
- **THEN** the photograph returns to its place and the viewer stays open

#### Scenario: Focus returns
- **WHEN** the visitor closes the viewer with Escape
- **THEN** focus is on the pile

### Requirement: Photograph changes are announced
When the photograph in the viewer changes, assistive technology SHALL be told its position and its caption. Each thumbnail SHALL have an accessible name of the form "Show photo N of M", and the current thumbnail SHALL be marked current.

#### Scenario: Screen reader announcement
- **WHEN** a screen reader user moves from the second to the third photograph
- **THEN** the position "3 of 7" and the third caption are announced

## MODIFIED Requirements

### Requirement: No page veil
The gallery SHALL NOT dim the rest of the page with a fixed overlay while it is in view. The only dark ground SHALL be the viewer itself, and it SHALL appear only after the visitor opens the viewer.

#### Scenario: Scroll through the gallery
- **WHEN** the visitor scrolls the gallery through the viewport
- **THEN** no fixed black overlay changes opacity over the page

#### Scenario: Dark only on request
- **WHEN** the visitor has not opened the viewer
- **THEN** the page around the gallery stays paper coloured

### Requirement: Several ways to browse
Inside the viewer, the visitor SHALL be able to bring another photograph forward by a horizontal swipe, by activating the left or right half of the photograph, by pressing the left or right arrow key, by pressing Home or End, or by activating a thumbnail. A swipe SHALL advance at most one photograph. Moving past the last photograph SHALL show the first, and moving before the first SHALL show the last.

#### Scenario: Click a neighbour
- **WHEN** the visitor clicks the right half of the photograph in the viewer
- **THEN** the next photograph is shown and its caption replaces the previous caption

#### Scenario: Click a thumbnail
- **WHEN** the visitor activates the sixth thumbnail
- **THEN** the sixth photograph is shown and its caption replaces the previous caption

#### Scenario: Arrow key
- **WHEN** the viewer is open and the visitor presses ArrowRight
- **THEN** the next photograph is shown

#### Scenario: Wrap at the end
- **WHEN** the seventh photograph is shown and the visitor presses ArrowRight
- **THEN** the first photograph is shown

#### Scenario: Swipe follows the finger
- **WHEN** the visitor drags the photograph sideways without releasing
- **THEN** the photograph moves with the finger, and on release past the threshold the next or previous photograph slides in from the side the finger moved away from

### Requirement: Motion stays small
Opening SHALL grow the top print out of the pile into the viewer while the ground darkens, and closing SHALL shrink the shown photograph back onto the pile. Changing photographs SHALL slide in the direction of travel. The gallery SHALL NOT run a continuous animation. Under reduced motion, opening, closing, and changing photographs SHALL be plain cross-fades and the pile SHALL not shuffle.

#### Scenario: Open grows from the pile
- **WHEN** the visitor opens the viewer
- **THEN** the top print visibly grows from its place in the pile to the viewer photograph, without stretching the image

#### Scenario: Reduced motion
- **WHEN** `prefers-reduced-motion: reduce` is set and the visitor opens the viewer and chooses another photograph
- **THEN** each change is a cross-fade, nothing grows, slides, or shuffles, and nothing animates on a loop

### Requirement: Same photographs
The gallery SHALL keep the current photograph files and order. Each photograph's caption SHALL be a place and a description, both visible in the viewer, and the image's alternative text SHALL be the description followed by the place.

#### Scenario: Caption text
- **WHEN** the second photograph is shown in the viewer
- **THEN** its place reads "Budapest", its description reads "Rehearsing Ravel Trio at the Radio", and its alternative text is "Rehearsing Ravel Trio at the Radio, Budapest"

## REMOVED Requirements

### Requirement: One print forward, neighbours peek
**Reason**: The on-page strip is replaced by a pile that opens a viewer. The viewer shows one photograph at a time without peeking neighbours.
**Migration**: See "A pile of prints on the page" and "The viewer focuses on one photograph".
