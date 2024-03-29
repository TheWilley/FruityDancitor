<h1 align="center">
  <br>
  <a href="https://thewilley.github.io/FruityDancitor/"><img src="https://github.com/TheWilley/FruityDancitor/assets/89783791/d139e8bb-9124-495c-88da-cf76706e204a" alt="FruityDancitor" width="200"></a>
  <br>
  FruityDancitor
  <br>
</h1>

<h4 align="center">A tool to easily edit and export sprite sheets compatible
with <a href='https://www.image-line.com/fl-studio-learning/fl-studio-online-manual/html/plugins/Fruity%20Dance.htm' alt='Fruity Dance'> Fruity Dance</a>.
</h4>

<p align="center">
<a href='https://github.com/TheWilley/FruityDancitor/releases/latest'><img alt="GitHub release (with filter)" src="https://img.shields.io/github/v/release/TheWilley/FruityDancitor"></a>
<a href='https://github.com/TheWilley/FruityDancitor/blob/main/LICENSE'><img src="https://img.shields.io/badge/license-MIT-blue" alt='license MIT' /></a>
<a href='https://github.com/TheWilley/FruityDancitor/issues'> <img src='https://img.shields.io/github/issues/TheWilley/FruityDancitor.svg' alt='Github Issues'></a>
<a href='https://www.image-line.com/fl-studio-learning/fl-studio-online-manual/html/plugins/Fruity%20Dance.htm'> <img src="https://img.shields.io/badge/plugin_page-🌷-blue" alt='' /> </a>
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#credits">Credits</a> •
  <a href="#disclamer">Disclamer</a> •
  <a href="#license">License</a>
</p>

![image](https://github.com/TheWilley/FruityDancitor/assets/89783791/77a63d7a-fa8e-4b28-b261-a4b195c8d95b)

## Key Features

- Uploading frames from a GIF file
- Editing induvidual frames
- Rearranging sequences and frames
- Live Preview
- Save and Load
- One-click export
- Keyboard Shortcuts (press `h` for list)
- Custom background image
- Custom background darkness
- Preview FPS
- And More!

## How To Use

Simply go to the [official webpage](https://thewilley.github.io/FruityDancitor/) to get started, or run the app yourself by following these steps:

```bash
# Clone this repository
$ git clone https://github.com/TheWilley/FruityDancitor

# Go into the repository
$ cd FruityDancitor

# Install dependencies
$ npm install

# Build app
$ npm run build

# If you want to start the app
$ npm run preview

# If you want to develop the app
$ npm run dev
```

## Docker

You can also use docker to run the app by using the following command:

```
docker compose up --build -d
```

Your application will be available at http://localhost:3000.

## Credits

This project would not be possible without these open source packages:

- [React](https://react.dev/) — The core of the app
- [Redux](https://redux.js.org/) — State management
- [react-movable](https://www.npmjs.com/package/react-movable) — Reordering sequences and frames
- [file-saver](https://www.npmjs.com/package/file-saver) — Saving sprite sheets and project files
- [omggif](https://www.npmjs.com/package/omggif) — Extracting gif frames
- This README is heavily influenced
  by [electron-markdownify](https://github.com/amitmerchant1990/electron-markdownify/tree/master), initially found
  at [awesome-readme](https://github.com/matiassingers/awesome-readme)

## Disclamer

FruityDancitor is an independent project and is not affiliated with, endorsed by, or connected to Image-Line® or FL
Studio®.

Any references made to FL Studio, Image-Line, or related trademarks are for informational purposes only. This tool is
not endorsed, sponsored, or approved by Image-Line or FL Studio.

The use of the term "Fruity" in the context of this tool does not imply any association with FL Studio or Image-Line.

The names Image-Line and FL Studio as well as related names, marks, emblems and images are registered trademarks of
their respective owners.

The sprites, animations, and any related content created or generated using this web application are the sole
responsibility of the users. I do not claim ownership or rights over the content produced through this tool.

## License

[MIT](https://github.com/TheWilley/FruityDancitor/blob/main/LICENSE)
