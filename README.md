# Fab-Bot

## General use

Set environment variables:

1. BOT_TOKEN
2. FAB_BOT_MONGO

## For heroku

In the heroku cli run:

```
heroku ps:scale -a <app-name> web=0 worker=1
```

Then redeploy the app.  
Do this to avoid the "Error R10 (Boot timeout)" error message.
