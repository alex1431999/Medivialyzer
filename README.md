# Medivialyzer
![medivialyzer-preview](https://github.com/alex1431999/Medivialyzer/blob/main/docs/assets/medivialyzer-preview.PNG)

## Getting started
### Install the client
- Download the client [here](https://github.com/alex1431999/Medivialyzer/releases/download/1.4.0/medivialyzer-1.4.0.zip).
- Unzip the archive
- Run `Medivialyzer Setup <version>.exe`

The client should open right after the install.

If you want to open the application in the future you can simply search for "Medivialyzer" in your windows search.

### Configure Medivia
1. Open the settings menu in game
2. Navigate to `Console`
3. Check the box next to: `automatically save loot messages to text file`

### Start hunting!
After killing your first monsters, Medivia will eventually write a loot file which will feed the data
to Medivialyzer. You should see your first results within 30 minutes or you can always force a refresh
by logging out and in.

## Roadmap
You can see the features that are currently being worked on [here](https://github.com/alex1431999/Medivialyzer/milestone/3).

Feel free to participate by suggesting new features or filing bug reports!

## FAQ
### Why is Windows warning me about the install?
Windows can't identify the publisher (me) of the project. That is because the application needs to be
signed and the identity needs to be verified by a central authority. But that's pretty expansive for an open source
dev (about 40€/month).

I am currently looking into getting a free certificate for open source development, but until then
please take my word for the application being safe, or if you don't trust me and are technically
savvy you can also clone the repo and make a build yourself.

### Why isn't my loot updating?
The loot file updates about every 25-50 mob kills. It will only update once the loot
window overflows. That means you will always be behind a certain amount of kills.

To force an update you need to log out of the game. Doing that is recommended after every hunt
since it's the only way to make sure all you loot has been counted.

There is an [open ticket](https://discord.com/channels/433936691431211009/1322161666527334411/1322161666527334411) with the Medivia team to update the behaviour to be better
suited for Medivialyzer.

If relogging does not fix it, make sure you have enabled the `automatically save loot messages to text file` 
in your Medivia settings under `Console`

**Please note:** do **not** use the `Save Messages` button on your loot window. It will duplicate the loot
and not just update the loot file.

### Does Medivia allow the use of Medivialyzer?
Yes they do. It has been confirmed by their staff that you are allowed to use Medivialyzer and you will
not get banned for using it.

## Support Medivialyzer
If you enjoy using Medivialyzer and you feel like giving back, feel free to donate to me in game. 
You can find me on Legacy, my name is `Dust Raiven`.

I will not accept real money.