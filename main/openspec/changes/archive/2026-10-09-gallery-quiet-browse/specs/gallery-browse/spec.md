# Spec Delta

## Purpose

Lets a visitor move through the gallery prints with a light gesture, without a black veil over the rest of the page.

## ADDED Requirements

### Requirement: One print forward, neighbours peek
The gallery SHALL show one photograph in front and the previous and next photographs peeking from the sides, smaller and dimmer than the front print. The front print SHALL be the only one with a caption, and that caption SHALL sit under the photograph.

#### Scenario: Resting gallery
- **WHEN** the gallery is on screen and the visitor has not moved it
- **THEN** one print is full size, a neighbour is visible on at least one side, and only the front print has a caption

### Requirement: No page veil
The gallery SHALL NOT dim the rest of the page with a fixed overlay while it is in view.

#### Scenario: Scroll through the gallery
- **WHEN** the visitor scrolls the gallery through the viewport
- **THEN** no fixed black overlay changes opacity over the page

### Requirement: Several ways to browse
The visitor SHALL be able to bring another print forward by clicking a peeking print, by activating its dot, by pressing the left or right arrow key while the gallery is focused, or by a horizontal swipe. A swipe SHALL advance at most one print.

#### Scenario: Click a neighbour
- **WHEN** the visitor clicks the next peeking print
- **THEN** that print becomes the front print and its caption replaces the previous caption

#### Scenario: Arrow key
- **WHEN** the gallery has focus and the visitor presses ArrowRight
- **THEN** the next print becomes the front print, unless the gallery is already on the last print

### Requirement: Motion stays small
Changing prints SHALL animate scale and opacity over the existing enter ease, and a fine pointer resting on a peeking print SHALL lift that print slightly. The gallery SHALL NOT run a continuous animation. Under reduced motion, the front print SHALL still change, without those transitions.

#### Scenario: Reduced motion
- **WHEN** `prefers-reduced-motion: reduce` is set and the visitor chooses another print
- **THEN** the new print is in front immediately and no print is translating or scaling on a loop

### Requirement: Same photographs
The gallery SHALL keep the current photograph files, caption strings, and order.

#### Scenario: Caption text
- **WHEN** the second print is in front
- **THEN** its caption is the existing second caption string
