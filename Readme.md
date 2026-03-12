# Automation Control Center

A polished, config-driven portfolio dashboard for showcasing RPA, AI automation, reporting, and enterprise workflow projects.

## Features

- Responsive dashboard UI with a modern automation control aesthetic
- Config-based content management through `config.js`
- Dynamic stats, network nodes, projects, logs, and contact details
- Skills radar chart powered by Chart.js
- Contact form submitted through Formspree with inline feedback

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
## Form Setup

The contact form is configured to submit to Formspree using the endpoint stored in `config.js`.

If you want to change the inbox target later, update:

- `forms.endpoint` in `config.js`
