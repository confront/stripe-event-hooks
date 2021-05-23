### Stripe Webhooks
1. Push this code to your own Heroku
2. Edit the index.ts file with your webhook and Heroku URL (Don't forget to `tsc`)
3. Once it is live on Heroku go to the [Stripe dashboard webhook setting](https://dashboard.stripe.com/webhooks)
4. Add your Heroku URL followed by `/stripe` and set the notifications to `issuing_authorization.created`
5. All done :)