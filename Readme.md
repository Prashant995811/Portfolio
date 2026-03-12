# Automation Control Center

A polished, config-driven portfolio dashboard for showcasing RPA, AI automation, reporting, and enterprise workflow projects.

## Features

- Responsive dashboard UI with a modern automation control aesthetic
- Config-based content management through `config.js`
- Dynamic stats, network nodes, projects, logs, and contact details
- Skills radar chart powered by Chart.js
- Contact form that opens a prefilled email draft

## Project Structure

```text
Portfolio/
|-- index.html
|-- styles.css
|-- app.js
|-- config.js
`-- Resume/
```

## How It Works

- `index.html` contains the layout shell
- `styles.css` contains the visual design and responsive behavior
- `app.js` renders the page dynamically from config values
- `config.js` is the single place to update content, links, metrics, and logs

## Recommended Next Step

For a production contact form, replace the current `mailto:` flow with one of these:

- Formspree or Getform for a quick no-backend form endpoint
- Netlify Forms if the site is deployed on Netlify
- A serverless function if you want validation, spam protection, and database storage

If you later want a real data file instead of `config.js`, the best approach is:

1. Move content into `config.json`
2. Serve the site through a local or hosted web server
3. Fetch the JSON in `app.js`

This is more scalable than loading JSON from `file://`, which is unreliable in browsers.
