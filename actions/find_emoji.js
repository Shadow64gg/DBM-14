module.exports = {
  name: "Find Custom Emoji",

  displayName: "Find Custom Emoji/Sticker",

  section: "Emoji/Sticker Control",

  subtitle(data, presets) {
    const infoTexts = ["Emoji ID", "Emoji Name", "Sticker ID", "Sticker Name"];
    const info = parseInt(data.info, 10);
    return `Find ${info >= 2 ? "Sticker" : "Emoji"} by ${infoTexts[info]} (${
      data.find
    })`;
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    const info = parseInt(data.info, 10);
    return [data.varName, info >= 2 ? "Sticker" : "Emoji"];
  },

  meta: {
    version: "3.3.0",
    preciseCheck: true,
    author: null,
    authorUrl: null,
    downloadUrl: null,
  },

  fields: ["info", "find", "storage", "varName"],

  html(isEvent, data) {
    return `
<div>
	<div style="float: left; width: calc(45% - 12px);">
		<span class="dbminputlabel">Source Field</span><br>
		<select id="info" class="round">
			<option value="0" selected>Emoji ID</option>
			<option value="1">Emoji Name</option>
      <option value="2">Sticker ID</option>
      <option value="3">Sticker Name</option>
		</select>
	</div>
	<div style="float: right; width: calc(55% - 12px);">
		<span class="dbminputlabel">Search Value</span><br>
		<input id="find" class="round" type="text">
	</div>
</div>

<br><br><br>

<store-in-variable style="padding-top: 8px;" dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName" selectWidth="40%" variableInputWidth="55%"></store-in-variable>`;
  },

  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];
    const client = this.getDBM().Bot.bot;
    const guild = cache.server;

    const info = parseInt(data.info, 10);
    const find = this.evalMessage(data.find, cache);

    let result;
    try {
      switch (info) {
        case 0:
          result = client.emojis.cache.get(find);
          break;
        case 1:
          result = client.emojis.cache.find((e) => e.name === find);
          break;
        case 2:
          if (guild) {
            result = guild.stickers.cache.get(find);
          }
          if (!result) {
            result = await client.rest.fetchSticker(find);
          }
          break;
        case 3:
          if (guild) {
            result = guild.stickers.cache.find((s) => s.name === find);
          }
          break;
        default:
          break;
      }
    } catch (err) {
      this.displayError(data, cache, err);
    }

    if (result) {
      const storage = parseInt(data.storage, 10);
      const varName = this.evalMessage(data.varName, cache);
      this.storeValue(result, storage, varName, cache);
    }
    this.callNextAction(cache);
  },

  mod() {},
};
