module.exports = {
  name: "Balance Member Money",
  section: "Economy",

  subtitle(data, presets) {
    const storage = presets.variables;
    return `${presets.getMemberText(
      data.member,
      data.varName
    )} -> ${presets.getVariableText(data.storage, data.varName2)}`;
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    return [data.varName2, "Unknown Type"];
  },

  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: "Shadow",
    authorUrl: "https://github.com/Shadow64gg",
    downloadUrl:
      "https://github.com/Shadow64gg/DBM-14/blob/DBM-14/actions/balance_member_money_MOD.js",
  },

  fields: [
    "member",
    "varName",
    "dataName",
    "defaultVal",
    "storage",
    "varName2",
  ],

  html(isEvent, data) {
    return `
      <member-input dropdownLabel="Member" selectId="member" variableContainerId="varNameContainer" variableInputId="varName"></member-input>
      
      <br><br><br>
      
      <div style="padding-top: 8px;">
          <div style="float: left; width: calc(35% - 12px);">
              <span class="dbminputlabel">Data Name</span><br>
              <input id="dataName" class="round" type="text">
          </div>
          <div style="float: right; width: calc(65% - 12px);">
              <span class="dbminputlabel">Default Value (if data doesn't exist)</span><br>
              <input id="defaultVal" class="round" type="text" value="0">
          </div>
      </div>
      
      <br><br><br>
      
      <store-in-variable style="padding-top: 8px;" dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName2"></store-in-variable>`;
  },

  init() {},

  async action(cache) {
    const fs = require("fs");
    const path = require("path");
    const data = cache.actions[cache.index];
    const member = await this.getMemberFromData(
      data.member,
      data.varName,
      cache
    );

    const economyFilePath = path.join(__dirname, "..", "data", "economy.json");

    let economyData = {};
    if (fs.existsSync(economyFilePath)) {
      economyData = JSON.parse(fs.readFileSync(economyFilePath, "utf-8"));
    } else {
      fs.writeFileSync(
        economyFilePath,
        JSON.stringify(economyData, null, 2),
        "utf-8"
      );
    }

    const memberId = member.id;
    const dataName = this.evalMessage(data.dataName, cache);
    const defVal = this.eval(this.evalMessage(data.defaultVal, cache), cache);

    let result = economyData[memberId]?.[dataName];

    if (result === undefined) {
      result = defVal;
      if (!economyData[memberId]) {
        economyData[memberId] = {
          username: member.user.username,
        };
      }
      economyData[memberId][dataName] = result;

      fs.writeFileSync(
        economyFilePath,
        JSON.stringify(economyData, null, 2),
        "utf-8"
      );
    }

    const storage = parseInt(data.storage, 10);
    const varName2 = this.evalMessage(data.varName2, cache);
    this.storeValue(result, storage, varName2, cache);

    this.callNextAction(cache);
  },

  mod() {},
};
