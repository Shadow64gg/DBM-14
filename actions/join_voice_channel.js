module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //
  // This is the name of the action displayed in the editor.
  //---------------------------------------------------------------------

  name: "Join Voice Channel",

  //---------------------------------------------------------------------
  // Action Section
  //
  // This is the section the action will fall into.
  //---------------------------------------------------------------------

  section: "Audio Control",

  //---------------------------------------------------------------------
  // Action Subtitle
  //
  // This function generates the subtitle displayed next to the name.
  //---------------------------------------------------------------------

  subtitle(data, presets) {
    return `${presets.getVoiceChannelText(data.channel, data.varName)}`;
  },

  //---------------------------------------------------------------------
  // Action Meta Data
  //
  // Helps check for updates and provides info if a custom mod.
  //---------------------------------------------------------------------

  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: null,
    authorUrl: null,
    downloadUrl: null,
  },

  //---------------------------------------------------------------------
  // Action Fields
  //
  // These are the fields for the action.
  //---------------------------------------------------------------------

  fields: ["channel", "varName"],

  //---------------------------------------------------------------------
  // Command HTML
  //
  // This function returns a string containing the HTML used for editing actions.
  //---------------------------------------------------------------------

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
    

    <voice-channel-input dropdownLabel="Voice Channel" selectId="channel" variableContainerId="varNameContainer" variableInputId="varName" selectWidth="45%" variableInputWidth="50%"></voice-channel-input>`;
  },

  //---------------------------------------------------------------------
  // Action Editor Init Code
  //
  // When the HTML is first applied to the action editor, this code is also run.
  //---------------------------------------------------------------------

  init() {},

  //---------------------------------------------------------------------
  // Action Bot Function
  //
  // This is the function for the action within the Bot's Action class.
  //---------------------------------------------------------------------

  async action(cache) {
    const data = cache.actions[cache.index];

    // Pobranie kanału głosowego na podstawie wybranego ID
    const channel = await this.getVoiceChannelFromData(
      data.channel,
      data.varName,
      cache
    );
    if (channel) {
      // Użycie joinVoiceChannel z @discordjs/voice do połączenia
      const { joinVoiceChannel } = require("@discordjs/voice");

      joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });
    }

    this.callNextAction(cache);
  },

  //---------------------------------------------------------------------
  // Requires Audio Libraries
  //
  // If 'true', this action requires audio libraries to run.
  //---------------------------------------------------------------------

  requiresAudioLibraries: true,

  //---------------------------------------------------------------------
  // Action Bot Mod
  //
  // This code can be used to extend or modify bot functionality.
  //---------------------------------------------------------------------

  mod() {},
};
