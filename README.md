# HiPS Viewer

## Introduction
"HiPS Viewer" is a browser application for displaying [HiPS](http://aladin.u-strasbg.fr/hips) data.

This software is totally inspired by great [Aladin Lite](http://aladin.u-strasbg.fr/AladinLite/).

## [Working demo](https://michitaro.github.io/hips-viewer)
### Usage
1. Pick a HiPS base (such as "https://alasky.u-strasbg.fr/DSS/DSSColor") URL from [HiPS Repository](http://aladin.unistra.fr/hips/list).
1. Paste the URL to the text field at the left top the viewer window.

## Build
```sh
git clone https://github.com/michitaro/hips-viewer
cd hips-viewer
npm install
npm dev-server
```
Open http://localhost:8080/