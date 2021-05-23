import express from 'express';
import request from 'request';
import { Webhook, MessageBuilder } from 'discord-webhook-node';
const hook: Webhook = new Webhook(
	'insert webhook here'
);
const poorhook: Webhook = new Webhook(
	'insert webhook here'
);

const app = express();
const port: any = process.env.PORT || 3000;

app.use(express.json());

setInterval(() => request.get('insert heroku url to prevent sleep'), 600000);

app.post('/stripe', (req, res) => {
	const event = req.body.data.object;

	if (event.status == 'pending') {
		const embed: MessageBuilder = new MessageBuilder()
			.setTitle('Successful Authorization')
			.setThumbnail('https://pbs.twimg.com/profile_images/1280236709825835008/HmeYTwai.png')
			.setColor(2025549)
			.addField('Site', event.merchant_data.name)
			.addField(
				'Amount',
				String((event.amount / 100).toFixed(2)) + ` ${event.card.currency.toUpperCase()}`
			)
			.addField(
				'Card Details',
				`||${event.card.exp_month}/${event.card.exp_year} > ${event.card.last4}||`
			)
			.addField(
				'Time',
				new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }) + " PST"
			);

		hook.send(embed);
	} else {
		const embed: MessageBuilder = new MessageBuilder()
			.setTitle('Authorization Failed')
			.setThumbnail('https://pbs.twimg.com/profile_images/1280236709825835008/HmeYTwai.png')
			.setColor(15870249)
			.addField('Site', event.merchant_data.name)
			.addField(
				'Amount',
				String((event.amount / 100).toFixed(2)) + ` ${event.card.currency.toUpperCase()}`
			)
			.addField(
				'Card Details',
				`||${event.card.exp_month}/${event.card.exp_year} > ${event.card.last4}||`
			)
			.addField(
				'Time',
				new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }) + " PST"
			);

		poorhook.send(embed);
	}

	res.json({
		success: true,
	});
});

app.get('*', (_, res) => res.send('nima is a monkey'));

app.listen(port, () => {
	console.log(`Stripe webhook listening at http://localhost:${port}`);
});
