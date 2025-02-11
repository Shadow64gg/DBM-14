module.exports = {
  name: "Manage Member Level",
  section: "Economy",

  subtitle(data, presets) {
    const changeSymbol =
      data.changeType === "1" ? "+=" : data.changeType === "2" ? "-=" : "=";
    return `${presets.getMemberText(data.member, data.varName)} (${
      data.dataName
    }) ${changeSymbol} ${data.value}`;
  },

  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: "Shadow",
    authorUrl: "https://github.com/Shadow64gg",
    downloadUrl:
      "https://github.com/Shadow64gg/DBM-14/blob/DBM-14/actions/manage_member_level_MOD.js",
  },

  fields: ["member", "varName", "dataName", "changeType", "value"],

  html(isEvent, data) {
    return `
          <member-input dropdownLabel="Member" selectId="member" variableContainerId="varNameContainer" variableInputId="varName"></member-input>
          <br><br><br>
          <div style="padding-top: 8px;">
            <div style="float: left; width: calc(50% - 12px);">
              <span class="dbminputlabel">Data Name</span><br>
              <select id="dataName" class="round">
                <option value="level">Level</option>
                <option value="xp">XP</option>
              </select>
            </div>
            <div style="float: right; width: calc(50% - 12px);">
              <span class="dbminputlabel">Control Type</span><br>
              <select id="changeType" class="round">
                <option value="0" selected>Set Value</option>
                <option value="1">Add Value</option>
                <option value="2">Subtract Value</option>
              </select>
            </div>
          </div>
          <br><br><br>
          <div style="padding-top: 8px;">
            <span class="dbminputlabel">Value</span><br>
            <input id="value" class="round" type="text" name="is-eval"><br>
          </div>`;
  },

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
    const changeType = data.changeType;
    let val = this.evalMessage(data.value, cache);

    try {
      val = this.eval(val, cache);
    } catch (e) {
      this.displayError(data, cache, e);
    }

    if (val !== undefined) {
      if (!economyData[memberId]) {
        economyData[memberId] = {
          username: member.user.username,
        };
      }

      if (changeType === "1") {
        economyData[memberId][dataName] =
          (economyData[memberId][dataName] || 0) + val;
      } else if (changeType === "2") {
        economyData[memberId][dataName] =
          (economyData[memberId][dataName] || 0) - val;
      } else {
        economyData[memberId][dataName] = val;
      }

      fs.writeFileSync(
        economyFilePath,
        JSON.stringify(economyData, null, 2),
        "utf-8"
      );
    }

    this.callNextAction(cache);
  },

  mod() {},
};
