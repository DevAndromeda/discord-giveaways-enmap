# discord-giveaways/enmap
Discord Giveaways framework using Enmap for storage.

> This package supports all the functions like `reroll`, `start`, `end` of normal **discord-giveaways** packages. Refer to the documentation.

# Functions
## new GiveawayManager(client, options) 
This function instantiates the giveaway manager class.

**Example:**

```js
const GiveawayManager = require("discord-giveaways-enmap");
client.giveaways = new GiveawayManager();
```

## getAllGiveaways() 
This function returns whole giveaways data.

**Example:**

```js
const giveaways = await client.giveaways.getAllGiveaways();
console.log(giveaways);
```

## saveGiveaway(message_id, giveaway_data) 
This function saves the new giveaway data.

**Example:**

```js
await client.giveaways.saveGiveaway(messageID, GiveawayData);
console.log("Saved data!");
```

## editGiveaway(message_id, data) 
This function edits the existing giveaway.

**Example:**

```js
await client.giveaways.editGiveaway(message_id, data);
console.log("Giveaway Edited!");
```

## deleteGiveaway(message_id) 
This function deletes the giveaway.

**Example:**

```js
await client.giveaways.deleteGiveaway(message_id);
console.log("Giveaway Deleted!");
```

## filter(func) 
This function can be used to filter through the giveaways.

**Example:**

```js
const giveaways = client.giveaways.filter(g => g.messageID === message_id);
console.log(giveaways);
```

## has(message_id) 
This function can be used to check if the giveaway exists in database.

**Example:**

```js
const has = client.giveaways.has(message_id);
if (has) console.log("Giveaway found!");
```

## clear(boolean) 
This function deletes all the existing giveaways.

**Example:**

```js
client.giveaways.clear(false);
console.log("Giveaway Cleared!");
```

## exportTo(path) 
This function exports the giveaways data into json file in mentioned path.

**Example:**

```js
await client.giveaways.exportTo("./data/");
console.log("Giveaway data Exported!");
```

## importFrom(file) 
This function imports the giveaways data from json file to the database. Existing data will be cleared!

**Example:**

```js
await client.giveaways.importFrom("./data/Giveaways.json");
console.log("Giveaway data Imported!");
```