# Fab-Bot

## General use

Set environment variables:

1. FAB_BOT_TOKEN

## For vercel

```
POST https://api.telegram.org/bot<FAB_BOT_TOKEN>/setWebhook?url=<DEPLOYED_URL>/api
```

## Other userful links

```
POST https://api.telegram.org/bot<FAB_BOT_TOKEN>/deleteWebhook
POST https://api.telegram.org/bot<FAB_BOT_TOKEN>/getWebhookInfo
POST https://api.telegram.org/bot<FAB_BOT_TOKEN>/getUpdates
GET https://api.telegram.org/bot<FAB_BOT_TOKEN>/getUpdates?timeout=10
```

## Useful tutorials

```
https://akhromieiev.com/building-telegram-bot-with-firebase-cloud-functions-and-telegrafjs/
https://frontend-devops.com/blog/build-deploy-a-vercel-api
https://github.com/king-11/Jarvis11
```
