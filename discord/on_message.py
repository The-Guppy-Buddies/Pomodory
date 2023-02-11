import discord

from discord.ext import commands
import asyncio


bot_token = "MTA3MDAzMjcwMzMwODcwOTk4OA.G8tn_Z.0C01_u-bJawwepddRV6lUYffQFSMUf5J0hw4Rs"

bot = commands.Bot("%", intents = discord.Intents().all())

# reads messages from users and reacts accordingly
# using bot instead of client, so checking for who says the keyword is unnecessary
@bot.command()
async def walk(ctx):
    # use async since we are waiting on user input to proceeed
    # ctx stands for context, and it refers to how the command was executed
    # if ctx.channel.id == '580539373498531840' or '579928341029847040':
    if ctx.channel.name == "bot-commands" or "music-commands":
        # responds to keyword respond, uppercase or lowercase
        # try:
        #     if ctx.content.lower() == (bot.command_prefix + 'respond'):
        # user = str(ctx.author)
        # user = user[0,(int(len(user))-1)-4]

        await ctx.send(f'{ctx.author} is cool')
        await ctx.send(f'Message sent from {ctx.channel.name}')
    elif ctx.channel.name != 'bot-commands' or 'music-commands':
        return

# run Discord bot
bot.run(bot_token)
