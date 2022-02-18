Open project in VSCode (for example)
Run command npm i in terminal (console) for installing all required packages (Node.js is required: https://nodejs.org/en/)
For builing project you can use the following commands:
npm run build-prod - building production version (minimized and optimized). The project will be builded into build folder. You can change destination in webpack.common.js (line 19)
npm run build-dev - building development version
