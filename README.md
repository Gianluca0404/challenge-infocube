### Data Model

* **Input (Agenda):** An array of JSON objects with `start` and `end` properties in the standard ISO 8601 format.

* **Processing:** Conversion of timestamps using Luxon to calculate time differences in minutes.

* **Output (Slots):** A dynamic mapping of free intervals that exceed the user-defined duration threshold.

### Assumptions Made

* **Time Window:** The operation is limited to a standard working day (08:00 - 18:00).

* **Input Integrity:** Existing appointments in the system are assumed to be correctly sorted and non-overlapping.

* **Localization:** Calculations assume the user's local timezone for a better UX.

### Trade-offs Chosen

* **Reliability vs. Weight (Luxon):** I chose to include an external library for date management instead of using the native `Date` object. This ensures accurate calculations and avoids common timezone bugs, with the trade-off of a minimal additional dependency.

* **Simplicity vs. Scalability (In-memory):** I used a global variable in the server to store data. This simplifies test setup without external databases, though I’m aware that in production, a real persistence layer (e.g., PostgreSQL) should be used.

* **Control vs. Speed (Vanilla JS):** I chose plain JavaScript for the frontend instead of a framework. This demonstrates mastery of the language and guarantees instant interface loading.
