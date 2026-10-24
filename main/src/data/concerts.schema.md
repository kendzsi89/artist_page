# Concerts

`src/data/concerts.json` is an array of upcoming engagements. The page hides the Upcoming block when no entry is today or later. Dates are `YYYY-MM-DD` and compared as strings.

| Field | Required | Notes |
| --- | --- | --- |
| `date` | yes | ISO date, `YYYY-MM-DD` |
| `city` | yes | City name |
| `venue` | yes | Hall or presenter |
| `programme` | no | What is played |
| `url` | no | When present, the venue is a link |

Example:

```json
[
  {
    "date": "2027-03-14",
    "city": "Copenhagen",
    "venue": "Royal Danish Academy of Music",
    "programme": "Solo recital",
    "url": "https://example.com/tickets"
  }
]
```
