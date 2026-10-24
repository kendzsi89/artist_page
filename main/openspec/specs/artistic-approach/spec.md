# artistic-approach Specification

## Purpose

Separates the artist's way of playing from his life story, and gives the portfolio video about piano and electronics its own section.

## Requirements

### Requirement: One biography heading
The page SHALL contain exactly one section labelled "Biography", and that section SHALL be the life story that begins "Born in Hungary". The section whose text begins "Music for me is the purest form of communication" SHALL be labelled "Approach" and SHALL NOT be labelled "Biography".

#### Scenario: Heading outline
- **WHEN** headings in `main` are listed in document order
- **THEN** "Biography" appears once, "Approach" appears once, and "Approach" comes after that "Biography"

#### Scenario: Approach copy is unchanged
- **WHEN** the Approach section is read
- **THEN** it still contains the paragraph beginning "Music for me is the purest form of communication" and the paragraph beginning "I outstandingly like playing music from" with the same words as before this change

#### Scenario: Performance video stays with Approach
- **WHEN** the Approach section is inspected
- **THEN** its video id is `nEvbK84KEUI`

### Requirement: Experiment follows Approach
An "Experiment" section SHALL sit immediately after Approach and immediately before the section labelled "Listen".

#### Scenario: Order around the album
- **WHEN** section headings are listed
- **THEN** the order of these three is Approach, Experiment, Listen, with no other heading between them

### Requirement: Experiment video and text
The Experiment section SHALL show the video `ZUzsA6tV4Es` with the title "Piano and electronics", and SHALL show this paragraph and no other prose: "It's a little bit of a provocation. Why should classical music always be played in a concert hall? Why should the performance always be perfect, and the audience always one age? That is what I want to leave behind. I mixed the piano with electronics for my debut at the Royal Danish Academy of Music, because there is more than one way to play."

#### Scenario: Visible copy
- **WHEN** the Experiment section is read
- **THEN** that paragraph is present, the date "30 November" is absent, and the video id is `ZUzsA6tV4Es`

#### Scenario: Poster before player
- **WHEN** the page has loaded and the Experiment poster has not been activated
- **THEN** that video is a poster control named "Play video: Piano and electronics" and no iframe for `ZUzsA6tV4Es` exists

#### Scenario: Own words are not a press quote
- **WHEN** the Experiment paragraph is inspected
- **THEN** it is body text beside the video, not a `blockquote` attributed to a publication
