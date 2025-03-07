module.exports = {
  name: "Create Category",
  section: "Channel Control",
  meta: {
    version: "3.2.4",
    preciseCheck: false,
    author: "DBM Mods",
    authorUrl: "https://github.com/dbm-network/mods",
    downloadURL:
      "https://github.com/dbm-network/mods/blob/master/actions/create_category_MOD.js",
  },

  subtitle(data) {
    return `${data.channelName}`;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName, "Channel"];
  },

  fields: ["channelName", "position", "storage", "varName"],

  html() {
    return `
  <div>
    <span class="dbminputlabel">Name</span>
    <input id="channelName" class="round" type="text"><br>
  </div>

  <div style="float: left; width: 50%;">
    <span class="dbminputlabel">Position</span>
    <input id="position" class="round" type="text" placeholder="Leave blank for default!" style="width: 90%;"><br>
  </div>
  <br><br><br><br>

  <div>
    <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
  </div>`;
  },

  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];
    const { server } = cache;
    if (!server?.channels?.create) return this.callNextAction(cache);

    const name = this.evalMessage(data.channelName, cache);
    if (!name || name.trim() === "") {
      this.displayError("Channel name is required!", data, cache);
      return;
    }

    const position = this.evalMessage(data.position, cache);
    const storage = parseInt(data.storage, 10);

    try {
      const channel = await server.channels.create({
        name: name,
        type: 4, // Odpowiada za typ kanału GUILD_CATEGORY w Discord.js 14
        position: position ? parseInt(position, 10) : undefined, // Ustawienie pozycji, jeśli podano
      });

      const varName = this.evalMessage(data.varName, cache);
      this.storeValue(channel, storage, varName, cache);
      this.callNextAction(cache);
    } catch (error) {
      console.error("Error creating category channel:", error);
      this.displayError(error, data, cache);
    }
  },

  mod() {},
};
