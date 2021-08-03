<h1 align="center">Welcome to musicord 👋</h1>
<p>
  <img alt="Version" src="https://user-images.githubusercontent.com/26196076/128060383-de8ce577-1042-4362-aeaa-be334b776ecd.png" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

**A musical discord bot**

## How all it works?

I am using [discord.js](https://discord.js.org/#/) to talk to Discord API. Currently I am using a hack to run it on Github action as a CI/CD job which gets triggered by a cron scheduler every 30 mins and to avoid parllel jobs running, I have set job timeout to 30 mins. Looks [here](https://github.com/PranjalAgni/Musicord/blob/master/.github/workflows/run-discord-bot.yml) for better understanding

## Commands supported

- !hi - Greets you
- !github - Tells your last commited message with elapsed time

## Install

```sh
npm install
```

## Usage

```sh
npm run start
```

## Run tests

```sh
npm run test
```

## Author

👤 **Pranjal Agnihotri**

- Website: https://pranjal.me
- Github: [@PranjalAgni](https://github.com/PranjalAgni)

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
