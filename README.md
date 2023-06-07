[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/hardwareontrial/backend-js-migisapp/graphs/commit-activity)
![Maintainer](https://img.shields.io/badge/Maintainer-IT%20MIG-blue)
[![Node](https://img.shields.io/badge/Node-16.13.0-1abc9c.svg)](https://nodejs.org/en/blog/release/v16.13.0)
[![Vue](https://img.shields.io/badge/Vue-2.6-8fce00.svg)](https://v2.vuejs.org/v2/guide/)

## Frontend-Vue

Provide MIG-IS as frontend. This web based on VueJS, Bootstrap-Vue for styling and other node library to complete best perform.

### Features

- Use [Vuexy](https://demos.pixinvent.com/vuexy-vuejs-admin-template-vue2/documentation/guide/) Template,
- Support [Casl/Vue](https://casl.js.org/v6/en/package/casl-vue) library to provide permissions combined with [Spatie-Permission](https://spatie.be/docs/laravel-permission/v5/introduction)

### Installation
- Clone this project to folder root:
```bash
  mkdir -p root-project/app
  cd root-project/app
  git clone https://github.com/hardwareontrial/frontend-vue-migisapp.git frontend-vue
```
- Open Dockerfile, and change this line with active API link:
```
  ENV VUE_APP_TITLE=<TITLE>
  ENV VUE_APP_API_ENDPOINT=<API address>
  ENV VUE_APP_API2_ENDPOINT=<API address>
```
- Build dockerize image
```bash
  cd frontend-vue
  docker build -t migisapp/frontend-vue:latest .
```
- Copy nginx file to config folder:
```bash
  mkdir -p root-project/config/frontend-vue
  cp supporting_files/nginx.conf root-project/config/frontend-vue
```
- Copy compose file, place it on root folder, then adjust to internal configuration:
```bash
  cp supporting_files/docker-compose.yaml root_project/frontend-vue.yaml
```
- Run container:
```bash
  cd root-project
  docker compose -f "frontend-vue.yaml" up -d
```
- Check using browser.