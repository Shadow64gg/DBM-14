module.exports = {
  name: "Giveaway Create",

  section: "Giveaway",

  subtitle(data, presets) {
    return `I create the giveaway for ${data.prize}!`;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    const dataType = "Giveaway ID";
    return [data.varName, dataType];
  },

  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: "Shadow",
    authorUrl: "https://github.com/Shadow64gg",
    downloadUrl:
      "https://github.com/Shadow64gg/DBM-14/blob/DBM-14/actions/giveaway_create_MOD.js",
  },

  fields: ["time", "winners", "prize", "msgid", "storage", "varName"],

  html(isEvent, data) {
    return `
    <div class="dbmmodsbr1" style="height: 59px;">
  <p>Mod Info:</p>
  <p>Created by Shadow</p>
  <p>Help: <a href="https://discord.gg/9HYB4n3Dz4" target="_blank" style="color: #00aaff; text-decoration: none;">discord</a></p>
</div>

<style>
.dbmmodsbr1 {
  position: absolute;
  bottom: 0px;
  border: 2px solid rgba(50, 50, 50, 0.7);
  background: rgba(0, 0, 0, 0.7);
  color: #999;
  padding: 5px;
  font-size: 12px;
  left: 0px;
  z-index: 999999;
  cursor: default;
  line-height: 1.2;
  border-radius: 8px;
  height: 59px;
  width: auto;
  transition: transform 0.3s ease, background-color 0.6s ease, color 0.6s ease;
}
.dbmmodsbr1:hover {
  transform: scale(1.01);
  background-color: rgba(29, 29, 29, 0.9);
  color: #fff;
}
.dbmmodsbr1 p {
  margin: 0;
  padding: 0;
}
.dbmmodsbr1 a {
  font-size: 12px;
  color: #00aaff;
  text-decoration: none;
}
.dbmmodsbr1 a:hover {
  text-decoration: underline;
}
</style>



<div
  class="dbmmodsbr2"
  data-url="https://github.com/Shadow64gg/DBM"
  onclick="openExternalLink(event, 'https://github.com/Shadow64gg/DBM')"
>
  <p>Mod Version:</p>
  <p>1.0</p>
</div>

<style>
.dbmmodsbr2 {
  position: absolute;
  bottom: 0px;
  right: 0px;
  border: 0px solid rgba(50, 50, 50, 0.7);
  background: rgba(0, 0, 0, 0.7);
  color: #999;
  padding: 5px;
  font-size: 12px;
  z-index: 999999;
  cursor: pointer;
  line-height: 1.2;
  border-radius: 8px;
  text-align: center;
  height: auto;
  transition: transform 0.3s ease, background-color 0.6s ease, color 0.6s ease;
}

.dbmmodsbr2:hover {
  transform: scale(1.01);
  background-color: rgba(29, 29, 29, 0.9);
  color: #fff;
}

.dbmmodsbr2 p {
  margin: 0;
  padding: 0;
}
</style>

<script>
function openExternalLink(event, url) {
  event.preventDefault();
  window.open(url, "_blank");
}
</script>
    
    <br>
    
    <div style="float: left; width: calc(50% - 12px);">
      <span class="dbminputlabel">Time</span>
      <input id="time" class="round" placeholder="1s / 1m / 1h / 1d / 1M / 1Y" type="text">
      <br>
      <span class="dbminputlabel">Winners</span>
      <input id="winners" class="round" type="text" placeholder="1 / 2 / 3 / ...">
    </div>
    <div style="float: right; width: calc(50% - 12px);">
      <span class="dbminputlabel">Prize</span>
      <input id="prize" class="round" type="text" placeholder="Prize Name">
      <br>
      <span class="dbminputlabel">Msg ID</span>
      <input id="msgid" class="round" type="text" placeholder="Message ID (Optional)">
    </div>
    <div style="float: left; width: calc(100% - 12px);">
      <br>
      <store-in-variable dropdownLabel="Store Giveaway ID In" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
    </div>
      `;
  },

  init() {},

  async action(cache) {
    const { interaction, msg } = cache;
    const fs = require("fs");
    const path = require("path");
    const data = cache.actions[cache.index];
    const mess = interaction ?? msg;
    const guildId = mess.guild.id;

    const filePath = path.join(__dirname, "../data/giveaways.json");

    if (!fs.existsSync(filePath)) {
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(filePath, JSON.stringify({}));
    }

    let giveaways = {};
    try {
      giveaways = JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (err) {
      console.error("Error reading giveaways.json:", err);
      giveaways = {};
    }

    if (!giveaways[guildId]) {
      giveaways[guildId] = [];
    }

    let durationInput = this.evalMessage(data.time, cache);
    let duration;
    if (durationInput.includes("s")) {
      duration = parseFloat(durationInput.split("s")[0]) * 1000;
    } else if (durationInput.includes("m")) {
      duration = parseFloat(durationInput.split("m")[0]) * 60000;
    } else if (durationInput.includes("h")) {
      duration = parseFloat(durationInput.split("h")[0]) * 3600000;
    } else if (durationInput.includes("d")) {
      duration = parseFloat(durationInput.split("d")[0]) * 86400000;
    } else if (durationInput.includes("M")) {
      duration = parseFloat(durationInput.split("M")[0]) * 2592000000;
    } else if (durationInput.includes("Y")) {
      duration = parseFloat(durationInput.split("Y")[0]) * 31536000000;
    } else {
      duration = parseFloat(durationInput) * 1000;
    }
    const endTimeTimestamp = new Date().getTime() + duration;

    const giveawayId = `${Date.now()}${Math.floor(Math.random() * 10000)}`;

    const gData = {
      id: giveawayId,
      guild: guildId,
      channel: mess.channel.id,
      host: mess.member.id,
      winners: this.evalMessage(data.winners, cache),
      prize: this.evalMessage(data.prize, cache),
      end: endTimeTimestamp,
      msg: this.evalMessage(data.msgid, cache),
      members: [],
      ended: false,
    };

    giveaways[guildId].push(gData);

    try {
      fs.writeFileSync(filePath, JSON.stringify(giveaways, null, 4));
    } catch (err) {
      console.error("Error writing to giveaways.json:", err);
    }

    this.storeValue(
      giveawayId,
      parseInt(data.storage, 10),
      data.varName,
      cache
    );
    this.callNextAction(cache);
  },

  mod() {},
};
