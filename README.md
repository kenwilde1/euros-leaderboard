# Euros 2024 Match Predictor

This is a small web app that displays a leaderboard based on [Euro 2024 Excel Spreadsheet](https://www.reddit.com/r/excel/comments/1d4xcux/euro_2024_excel_spreadsheet/). This is just a small project for my friends and I where we can track our accumulated points from predicting scores in the Euro 2024 tournament.

It's only styled for mobile but I do have plans in the future to "generalise" this app for future tournaments.

Moreover, I did not bother paying for an API that would provide live score updates and results, so there's a good bit of manual entry required. In order to avoid making new deployments based on match results, we do use [Google's Firestore](https://firebase.google.com/docs/firestore) to store results.

You can find the URL in the About section of this repository.
