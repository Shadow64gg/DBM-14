module.exports = {
  name: "Level System",
  section: "Economy",

  subtitle(data, presets) {
    return `Level and XP management`;
  },

  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: "Shadow",
    authorUrl: "https://github.com/Shadow64gg",
    downloadUrl:
      "https://github.com/Shadow64gg/DBM-14/blob/DBM-14/actions/level_system_MOD.js",
  },

  fields: ["xpPerMessage", "xpToLevelUp", "actions"],

  html(isEvent, data) {
    return `
    <tab-system style="margin-top: 20px;">
      <!-- General Tab -->
      <tab label="General" icon="cogs">
        <div style="margin-top: 12px; display: flex; gap: 20px;">
          <div style="flex: 1;">
            <span class="dbminputlabel">XP per Message</span>
            <input id="xpPerMessage" class="round" type="text">
          </div>
          <div style="flex: 1;">
            <span class="dbminputlabel">XP to Level Up</span>
            <input id="xpToLevelUp" class="round" type="text">
          </div>
        </div>
      </tab>

      <!-- Action Tab -->
      <tab label="Level UP" icon="cogs">
        <action-list-input id="actions" height="calc(100vh - 300px)"></action-list-input>
      </tab>
    </tab-system>
    `;
  },

  variableStorage(data, varType) {
    const storageType = parseInt(data.storage, 10);
    if (storageType !== varType) return;
    return [data.varName, "Text"];
  },

  async action(cache) {
    const fs = require("fs");
    const path = require("path");
    const data = cache.actions[cache.index];
    const xpPerMessage = parseInt(this.evalMessage(data.xpPerMessage, cache));
    const xpToLevelUp = parseInt(this.evalMessage(data.xpToLevelUp, cache));

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

    const member = cache.msg.guild.members.cache.get(cache.msg.author.id);
    if (!member) {
      console.error("Could not find member.");
      return this.callNextAction(cache);
    }
    const memberId = member.id;
    const currentXP = economyData[memberId]?.xp || 0;
    let newXP = currentXP + xpPerMessage;
    let currentLevel = economyData[memberId]?.level || 0;

    let levelUp = false;
    if (newXP >= xpToLevelUp) {
      newXP = 0;
      currentLevel += 1;
      levelUp = true;
    }

    if (!economyData[memberId]) {
      economyData[memberId] = {
        username: member.user.username,
        xp: newXP,
        level: currentLevel,
      };
    } else {
      economyData[memberId].username = member.user.username;
      economyData[memberId].xp = newXP;
      economyData[memberId].level = currentLevel;
    }
    fs.writeFileSync(
      economyFilePath,
      JSON.stringify(economyData, null, 2),
      "utf-8"
    );

    if (levelUp) {
      const actions = data.actions ? data.actions : [];
      if (actions.length > 0) {
        this.executeSubActionsThenNextAction(actions, cache);
        return;
      } else {
      }
    }

    this.callNextAction(cache);
  },

  mod() {},
};
