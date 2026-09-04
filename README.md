# Chat Interface Layout

A static, front-end-only layout for a chat application — sidebar, chat window, and message input — resembling the structure of tools like ChatGPT. This is a **design/layout exercise only**: there is no working chat logic, no backend, and no JavaScript functionality wired up.

## What's included

- `chat-interface-layout.html` — the full layout, with all CSS embedded in the file

## Structure

- **Sidebar** — brand mark, a "New chat" control, and a static list of past conversations
- **Header** — shows the current conversation title
- **Message area** — example assistant/user messages to preview how the layout fills with content
- **Composer** — message input box with a send button

## Tech

- Plain HTML5 and CSS3 (no frameworks, no build step)
- Google Fonts: Inter (UI text) and Source Serif 4 (assistant messages)
- Responsive down to mobile (sidebar hides below 720px)

## How to view

Open `chat-interface-layout.html` directly in any modern browser. No server or install required.

## Status

Layout only — buttons, links, and the input box are not functional. Intended as a starting point for adding real chat behavior later.
