module.exports = {
  name: "Base Convert MOD",
  displayName: "Base Convert",
  section: "Other Stuff",
  meta: {
    version: "3.2.4",
    preciseCheck: false,
    author: "DBM Mods",
    authorUrl: "https://github.com/dbm-network/mods",
    downloadURL:
      "https://github.com/Shadow64gg/DBM-14/blob/DBM-v14/actions/base_convert_MOD.js",
  },

  subtitle(data) {
    return `Base ${data.basef} to Base ${data.baset}`;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName, "Number"];
  },

  fields: ["num", "basef", "baset", "storage", "varName"],

  html() {
    return `
<div style="float: left; width: 100%;">
  <span class="dbminputlabel">Number</span>
  <input id="num" class="round" type="text">
</div><br><br><br>

<div>
  <div style="float: left; width: 40%;">
    <span class="dbminputlabel">Base From (2-36)</span>
    <input id="basef" class="round" type="number" min="2" max="36">
  </div>
  <div style="padding-left: 3%; float: left; width: 50%;">
    <span class="dbminputlabel">Base To (2-36)</span>
    <input id="baset" class="round" type="number" min="2" max="36">
  </div>
</div>
<br><br><br>

<store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
`;
  },

  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];
    const num = this.evalMessage(data.num, cache);
    const basef = parseInt(data.basef, 10);
    const baset = parseInt(data.baset, 10);
    let result;
    if (basef > 1 && basef <= 36 && baset > 1 && baset <= 36) {
      const base = parseInt(num, basef, 10);
      if (!Number.isNaN(base)) {
        result = base.toString(baset).toUpperCase();
      } else {
        console.log(`Invalid input, ${num} not Base-${basef}`);
      }
    }
    if (result !== undefined) {
      const storage = parseInt(data.storage, 10);
      const varName = this.evalMessage(data.varName, cache);
      this.storeValue(result, storage, varName, cache);
    }
    this.callNextAction(cache);
  },

  mod() {},
};
