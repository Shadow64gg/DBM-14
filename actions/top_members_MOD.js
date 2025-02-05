module.exports = {
  name: "Top Members",
  section: "Economy",
  subtitle(data, presets) {
    return `Top ${data.topCount || 5} members (${data.dataName})`;
  },
  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: "Shadow",
    authorUrl: "https://github.com/Shadow64gg",
    downloadUrl:
      "https://github.com/Shadow64gg/DBM-14/blob/DBM-14/actions/top_members_MOD.js",
  },
  fields: [
    "dataName",
    "topCount",
    "useNumbers",
    "showValues",
    "suffix",
    "filterBots",
    "reversedOrder",
    "boldNumbers",
    "boldData",
    "boldSuffix",
    "italicNumbers",
    "italicData",
    "italicSuffix",
    "strikethroughNumbers",
    "strikethroughData",
    "strikethroughSuffix",
    "codeNumbers",
    "codeData",
    "codeSuffix",
    "usePrefix",
    "enableRankingTitle",
    "rankingTitle",
    "storage",
    "varName",
  ],
  html(isEvent, data) {
    return `
    <div class="dbmmodsbr1" style="height: 59px">
    <p>Mod Info:</p>
    <p>Created by Shadow</p>
    <p>
      Help:
      <a
        href="https://discord.gg/9HYB4n3Dz4"
        target="_blank"
        style="color: #0077ff; text-decoration: none"
        >discord</a
      >
    </p>
  </div>
  
  <div class="dbmmodsbr dbmmodsbr2">
    <p>Mod Version:</p>
    <p>
      <a
        href="https://github.com/Shadow64gg/DBM-14"
        target="_blank"
        style="color: #0077ff; text-decoration: none"
        >2.0</a
      >
    </p>
  </div>
  
  <style>
    .dbmmodsbr1,
    .dbmmodsbr2 {
      position: absolute;
      bottom: 0px;
      background: rgba(0, 0, 0, 0.7);
      color: #999;
      padding: 5px;
      font-size: 12px;
      z-index: 999999;
      cursor: pointer;
      line-height: 1.2;
      border-radius: 8px;
      transition: transform 0.3s ease, background-color 0.6s ease, color 0.6s ease;
    }
  
    .dbmmodsbr1 {
      left: 0px;
      border: 2px solid rgba(50, 50, 50, 0.7);
    }
  
    .dbmmodsbr2 {
      right: 0px;
      text-align: center;
    }
  
    .dbmmodsbr1:hover,
    .dbmmodsbr2:hover {
      transform: scale(1.01);
      background-color: rgba(29, 29, 29, 0.9);
      color: #fff;
    }
  
    .dbmmodsbr1 p,
    .dbmmodsbr2 p {
      margin: 0;
      padding: 0;
    }
  
    .dbmmodsbr1 a,
    .dbmmodsbr2 a {
      font-size: 12px;
      color: #0077ff;
      text-decoration: none;
    }
  
    .dbmmodsbr1 a:hover,
    .dbmmodsbr2 a:hover {
      text-decoration: underline;
    }
  </style>
  
    
<tab-system>
  <tab label="General" icon="cogs">
    <div style="display: flex; gap: 10px; padding: 10px;">
      <div style="flex: 1;">
        <span class="dbminputlabel">Data Name</span><br>
        <input id="dataName" class="round" type="text" placeholder="">
      </div>
      <div style="flex: 1;">
        <span class="dbminputlabel">Number of Members</span><br>
        <input id="topCount" class="round" type="number" placeholder="Default 5" min="1">
      </div>
    </div>

    <div style="display: flex; gap: 10px; padding: 10px;">
      <div style="flex: 1;">
        <span class="dbminputlabel">Number The Members</span><br>
        <select id="useNumbers" class="round">
          <option value="true" selected>Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <div style="flex: 1;">
        <span class="dbminputlabel">Show Data Value</span><br>
        <select id="showValues" class="round">
          <option value="true" selected>Yes</option>
          <option value="false">No</option>
        </select>
      </div>
    </div>

    <hr class="subtlebar" style="margin-top: 50px; margin-bottom: 50px;">

    <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
  </tab>


  <tab label="Advanced" icon="sliders">
    <div style="display: flex; gap: 10px; padding: 10px;">
      <div style="flex: 1;">
        <span class="dbminputlabel">Use Prefix "> "</span><br>
        <select id="usePrefix" class="round">
          <option value="true">Yes</option>
          <option value="false" selected>No</option>
        </select>
      </div>
    </div>

    <div style="padding: 10px;">
      <span class="dbminputlabel">Suffix</span><br>
      <input id="suffix" class="round" type="text" placeholder="Leave blank for none...">
    </div>
    
    <div style="display: flex; gap: 10px; padding: 10px;">
      <div style="flex: 1;">
         <span class="dbminputlabel">Filter Bots</span><br>
         <select id="filterBots" class="round">
            <option value="true" selected>Yes</option>
            <option value="false">No</option>
         </select>
      </div>
    </div>

    <div style="display: flex; gap: 10px; padding: 10px;">
      <div style="flex: 1;">
        <span class="dbminputlabel">Reversed Order</span><br>
        <select id="reversedOrder" class="round">
          <option value="true">Yes</option>
          <option value="false" selected>No</option>
        </select>
      </div>
    </div>

    <div style="display: flex; align-items: center; gap: 20px; padding: 10px;">
  <!-- Enable Ranking Title -->
  <div style="flex: 1;">
    <span class="dbminputlabel">Enable Ranking Title</span><br>
    <select id="enableRankingTitle" class="round">
      <option value="true">Yes</option>
      <option value="false" selected>No</option>
    </select>
  </div>

  <div style="flex: 2;">
    <span class="dbminputlabel">Ranking Title</span><br>
    <input id="rankingTitle" class="round" type="text" placeholder="Default: '🏆 Top Members 🏆'">
  </div>
</div>
  </tab>


  <tab label="Font" icon="font">
  <div style="display: flex; gap: 10px; padding: 10px;">

    <div style="flex: 1;">
      <dbm-checkbox id="boldNumbers" label="Numbers (Bold)" style="margin-bottom: 10px;"></dbm-checkbox>
      <dbm-checkbox id="italicNumbers" label="Numbers (Italic)" style="margin-bottom: 10px;"></dbm-checkbox>
      <dbm-checkbox id="strikethroughNumbers" label="Numbers (Strike)" style="margin-bottom: 10px;"></dbm-checkbox>
      <dbm-checkbox id="codeNumbers" label="Numbers (Code)"></dbm-checkbox>
    </div>

    <div style="flex: 1;">
      <dbm-checkbox id="boldData" label="Data Value (Bold)" style="margin-bottom: 10px;"></dbm-checkbox>
      <dbm-checkbox id="italicData" label="Data Value (Italic)" style="margin-bottom: 10px;"></dbm-checkbox>
      <dbm-checkbox id="strikethroughData" label="Data Value (Strike)" style="margin-bottom: 10px;"></dbm-checkbox>
      <dbm-checkbox id="codeData" label="Data Value (Code)"></dbm-checkbox>
    </div>

    <div style="flex: 1;">
      <dbm-checkbox id="boldSuffix" label="Suffix (Bold)" style="margin-bottom: 10px;"></dbm-checkbox>
      <dbm-checkbox id="italicSuffix" label="Suffix (Italic)" style="margin-bottom: 10px;"></dbm-checkbox>
      <dbm-checkbox id="strikethroughSuffix" label="Suffix (Strike)" style="margin-bottom: 10px;"></dbm-checkbox>
      <dbm-checkbox id="codeSuffix" label="Suffix (Code)"></dbm-checkbox>
    </div>
  </div>
</tab>

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
    const filePath = path.join(__dirname, "../data/players.json");

    const dataName = this.evalMessage(data.dataName, cache) || "bank";
    const topCount = parseInt(this.evalMessage(data.topCount, cache), 10) || 5;

    const useNumbers = this.evalMessage(data.useNumbers, cache) === "true";
    const showValues = this.evalMessage(data.showValues, cache) === "true";
    const filterBots = this.evalMessage(data.filterBots, cache) === "true";
    const reversedOrder =
      this.evalMessage(data.reversedOrder, cache) === "true";
    const usePrefix = this.evalMessage(data.usePrefix, cache) === "true";
    const enableRankingTitle =
      this.evalMessage(data.enableRankingTitle, cache) === "true";
    const rankingTitle = enableRankingTitle
      ? this.evalMessage(data.rankingTitle, cache) || "🏆 Top Members 🏆"
      : "";

    const suffix = this.evalMessage(data.suffix, cache) || "";

    const boldNumbers = Boolean(data.boldNumbers);
    const boldData = Boolean(data.boldData);
    const boldSuffix = Boolean(data.boldSuffix);
    const italicNumbers = Boolean(data.italicNumbers);
    const italicData = Boolean(data.italicData);
    const italicSuffix = Boolean(data.italicSuffix);
    const strikethroughNumbers = Boolean(data.strikethroughNumbers);
    const strikethroughData = Boolean(data.strikethroughData);
    const strikethroughSuffix = Boolean(data.strikethroughSuffix);
    const codeNumbers = Boolean(data.codeNumbers);
    const codeData = Boolean(data.codeData);
    const codeSuffix = Boolean(data.codeSuffix);

    let playerData;
    try {
      playerData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (err) {
      console.error("Error reading the players.json file:", err);
      return this.callNextAction(cache);
    }

    const guild = cache.interaction.guild;
    if (!guild) {
      console.error("Guild is undefined. Cannot access members.");
      return this.callNextAction(cache);
    }

    const allMembers = await guild.members.fetch();

    const validPlayers = Object.entries(playerData).filter(([userId, data]) => {
      const member = allMembers.get(userId);
      if (!member) return false;
      if (filterBots && member.user.bot) return false;
      return data[dataName] !== undefined && data[dataName] !== null;
    });

    if (validPlayers.length === 0) {
      this.storeValue(
        "No members to display in the ranking.",
        parseInt(data.storage, 10),
        this.evalMessage(data.varName, cache),
        cache
      );
      return this.callNextAction(cache);
    }

    const sortedPlayers = validPlayers.sort(([, a], [, b]) =>
      reversedOrder ? a[dataName] - b[dataName] : b[dataName] - a[dataName]
    );
    const topPlayers = sortedPlayers.slice(0, topCount);

    let response = "";

    if (enableRankingTitle) {
      response += `**${rankingTitle}**\n\n`;
    }

    topPlayers.forEach(([userId, data], index) => {
      let prefix = usePrefix ? "> " : "";
      let number = useNumbers ? `${index + 1}. ` : "";
      let value = showValues ? `${data[dataName]}` : "";
      let formattedSuffix = suffix ? ` ${suffix}` : "";

      if (boldNumbers && useNumbers) number = `**${number}**`;
      if (boldData && showValues) value = `**${value}**`;
      if (boldSuffix && suffix) formattedSuffix = ` **${suffix}**`;

      if (italicNumbers && useNumbers) number = `*${number}*`;
      if (italicData && showValues) value = `*${value}*`;
      if (italicSuffix && suffix) formattedSuffix = ` *${suffix}*`;

      if (strikethroughNumbers && useNumbers) number = `~~${number}~~`;
      if (strikethroughData && showValues) value = `~~${value}~~`;
      if (strikethroughSuffix && suffix) formattedSuffix = ` ~~${suffix}~~`;

      if (codeNumbers && useNumbers) number = `\`${number}\``;
      if (codeData && showValues) value = `\`${value}\``;
      if (codeSuffix && suffix) formattedSuffix = ` \`${suffix}\``;

      response += `${prefix}${number}<@${userId}> ${value}${formattedSuffix}\n`;
    });

    if (response === "\n") {
      response = "No members to display in the ranking.";
    }

    const storage = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    this.storeValue(response, storage, varName, cache);
    this.callNextAction(cache);
  },

  mod() {},
};
