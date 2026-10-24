# Spec Delta

## Purpose

Lets a visitor hear the artist within the first screen through a short, user-initiated audio excerpt with clear playing and stopped states.

## ADDED Requirements

### Requirement: Excerpt plays only on user action
The hero SHALL offer a control labelled "Listen" that starts a short audio excerpt when activated. Audio SHALL NOT start without a user gesture and SHALL NOT be fetched until the control is activated.

#### Scenario: Tap to play
- **WHEN** the visitor activates the "Listen" control
- **THEN** the excerpt begins playing within one second on a normal connection, and the audio file request appears in the network panel only after the tap

#### Scenario: No autoplay
- **WHEN** the page loads
- **THEN** no audio plays and no audio file is requested

### Requirement: Playing state is visible
While audio plays, the control SHALL show a playing state (label changes to "Stop" or "Playing", and a progress indication or pulse is visible). The pulse SHALL be disabled under `prefers-reduced-motion`.

#### Scenario: Visible while playing
- **WHEN** the excerpt is playing
- **THEN** the control's accessible name reflects that activating it will stop playback, and a visible indicator distinguishes playing from idle

#### Scenario: Reduced motion
- **WHEN** `prefers-reduced-motion: reduce` is set and audio is playing
- **THEN** the playing state is still indicated (text or static mark) without a looping animation

### Requirement: Stop behaviour
Activating the control during playback SHALL stop and reset the excerpt. Playback SHALL stop at the end of the file and the control SHALL return to idle.

#### Scenario: Tap to stop
- **WHEN** the visitor activates the control while audio is playing
- **THEN** audio stops immediately and the control returns to the idle "Listen" state

#### Scenario: Natural end
- **WHEN** the excerpt reaches its end
- **THEN** audio stops and the control returns to idle without user action

### Requirement: Keyboard and screen reader access
The control SHALL be a `button`, operable with Enter and Space, with an accessible name that includes what will be heard (for example, "Listen: Ravel, 25 seconds").

#### Scenario: Keyboard
- **WHEN** the control has focus and Space is pressed
- **THEN** playback toggles exactly as with a pointer

### Requirement: Graceful absence
If the excerpt file is not available, the control SHALL not render.

#### Scenario: Missing file
- **WHEN** the configured audio source cannot be loaded (404 or decode error)
- **THEN** the control is removed or never shown, and the rest of the hero is unaffected

### Requirement: Excerpt budget
The excerpt SHALL be between 15 and 45 seconds and at most 800 KB, measured with `du -k`. The supplied Bartók sonata file is within that budget and SHALL be used as recorded.

#### Scenario: Asset audit
- **WHEN** the audio file in `public/audio/` is inspected
- **THEN** its duration and size are within the stated limits
