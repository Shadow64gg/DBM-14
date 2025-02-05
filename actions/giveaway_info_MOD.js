module.exports = {
  name: "Giveaway Info",
  section: "Giveaway",
  subtitle(data) {
    let description = "Retrieve information about giveaway";

    switch (data.info) {
      case "id":
        description = `Retrieve the Giveaway ID`;
        break;
      case "guild":
        description = `Retrieve the Server ID`;
        break;
      case "channel":
        description = `Retrieve the Channel ID`;
        break;
      case "msg":
        description = `Retrieve the Message ID}`;
        break;
      case "messageObject":
        description = `Retrieve the Message Object`;
        break;
      case "host":
        description = `Retrieve the Host (Member)`;
        break;
      case "prize":
        description = `Retrieve the Prize`;
        break;
      case "numberOfWinners":
        description = `Retrieve the Number of Winners`;
        break;
      case "memberCount":
        description = `Retrieve the Number of Participants`;
        break;
      case "members":
        description = `Retrieve the Participants List`;
        break;
      case "winners":
        description = `Retrieve the Winners List`;
        break;
      case "ended":
        description = `Retrieve the Ended Status`;
        break;
      case "endRelative":
        description = `Retrieve the Time (Countdown)`;
        break;
      case "end":
        description = `Retrieve the End Timestamp`;
        break;
      default:
        description = `Retrieve information about giveaway`;
    }

    return description;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;

    let dataType = "";

    switch (data.info) {
      case "id":
        dataType = "Giveaway ID";
        break;
      case "guild":
        dataType = "Server ID";
        break;
      case "channel":
        dataType = "Channel ID";
        break;
      case "msg":
        dataType = "Message ID";
        break;
      case "messageObject":
        dataType = "Message Object";
        break;
      case "host":
        dataType = "Host";
        break;
      case "prize":
        dataType = "Prize";
        break;
      case "numberOfWinners":
        dataType = "Number Of Winners";
        break;
      case "memberCount":
        dataType = "Number of Participants";
        break;
      case "members":
        dataType = "Participants List";
        break;
      case "winners":
        dataType = "Winners List";
        break;
      case "ended":
        dataType = "Ended Status";
        break;
      case "endRelative":
        dataType = "Time Countdown";
        break;
      case "end":
        dataType = "End Timestamp";
        break;
      default:
        dataType = "Unknown";
    }

    return [data.varName, dataType];
  },

  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: "Shadow",
    authorUrl: "https://github.com/Shadow64gg",
    downloadUrl:
      "https://github.com/Shadow64gg/DBM-14/blob/DBM-14/actions/giveaway_info_MOD.js",
  },

  fields: ["giveawayId", "info", "storage", "varName"],
  html() {
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
      >1.1</a
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


      <div style="padding-top: 8px; margin-top: 20px;">
        <span class="dbminputlabel">Giveaway ID</span>
        <input id="giveawayId" class="round" type="text" placeholder="Enter Giveaway ID">
      </div>
      <div style="padding-top: 8px; margin-top: 20px;">
        <span class="dbminputlabel">Select Information</span>
        <select id="info" class="round">
          <option value="id">Giveaway ID</option>
          <option value="guild">Server ID</option>
          <option value="channel">Channel ID</option>
          <option value="msg">Message ID</option>
          <option value="messageObject">Message Object</option>
          <option value="host">Host (Member)</option>
          <option value="prize">Prize</option>
          <option value="numberOfWinners">Number Of Winners</option>
          <option value="memberCount">Number of Participants</option>
          <option value="members">Participants List</option>
          <option value="winners">Winners List</option>
          <option value="ended">Ended Status</option>
          <option value="endRelative">Time (Countdown)</option>
          <option value="end">End Timestamp</option>
        </select>
      </div>
      <div style="padding-top: 8px; margin-top: 20px;">
        <store-in-variable dropdownLabel="Store Result In" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
      </div>
    `;
  },

  init() {},

  async action(cache) {
    const fs = require("fs");
    const path = require("path");
    const data = cache.actions[cache.index];
    const giveawayId = this.evalMessage(data.giveawayId, cache);
    const info = data.info;
    const filePath = path.join(__dirname, "../data/giveaways.json");

    let giveaways = {};
    try {
      giveaways = JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (err) {
      console.error("Error reading giveaways.json:", err);
      this.callNextAction(cache);
      return;
    }

    let result;
    let guildId, channelId, messageId;

    for (const guild in giveaways) {
      const giveaway = giveaways[guild].find((g) => g.id === giveawayId);
      if (giveaway) {
        guildId = guild;
        channelId = giveaway.channel;
        messageId = giveaway.msg;

        if (info === "host") {
          result = `<@${giveaway.host}>`;
        } else if (info === "members") {
          result =
            giveaway.members.map((m) => `<@${m}>`).join(", ") ||
            "No participants";
        } else if (info === "memberCount") {
          result = giveaway.members.length;
        } else if (info === "endRelative") {
          result = `<t:${Math.floor(giveaway.end / 1000)}:R>`;
        } else if (info === "winners") {
          result = Array.isArray(giveaway.winnersList)
            ? giveaway.winnersList
                .map((w) => (w === null ? "No winners" : `<@${w}>`))
                .join(", ") || "No winners yet"
            : "No winners yet";
        } else if (info === "numberOfWinners") {
          result = giveaway.winners ? parseInt(giveaway.winners, 10) : 0;
        } else if (info === "ended") {
          result = giveaway.ended ? "🔴" : "🟢";
        } else if (info === "messageObject") {
          const guild = this.getDBM().Bot.bot.guilds.cache.get(guildId);
          if (!guild) {
            console.error("Guild not found.");
            result = null;
          } else {
            const channel = guild.channels.cache.get(channelId);
            if (!channel) {
              console.error("Channel not found.");
              result = null;
            } else {
              try {
                result = await channel.messages.fetch(messageId);
              } catch (error) {
                console.error("Error fetching message:", error);
                result = null;
              }
            }
          }
        } else {
          result = giveaway[info];
        }
        break;
      }
    }

    this.storeValue(result, parseInt(data.storage, 10), data.varName, cache);
    this.callNextAction(cache);
  },

  mod() {},
};
