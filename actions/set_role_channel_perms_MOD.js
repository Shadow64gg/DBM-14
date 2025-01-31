module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //
  // This is the name of the action displayed in the editor.
  //---------------------------------------------------------------------

  name: "Set Role Channel Perms",

  //---------------------------------------------------------------------
  // Action Section
  //
  // This is the section the action will fall into.
  //---------------------------------------------------------------------

  section: "Channel Control",

  //---------------------------------------------------------------------
  // Action Subtitle
  //
  // This function generates the subtitle displayed next to the name.
  //---------------------------------------------------------------------

  subtitle(data, presets) {
    return `${presets.getRoleText(data.role, data.varName2)}`;
  },

  //---------------------------------------------------------------------
  // Action Meta Data
  //
  // Helps check for updates and provides info if a custom mod.
  // If this is a third-party mod, please set "author" and "authorUrl".
  //
  // It's highly recommended "preciseCheck" is set to false for third-party mods.
  // This will make it so the patch version (0.0.X) is not checked.
  //---------------------------------------------------------------------

  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: "Shadow",
    authorUrl: "https://github.com/Shadow64gg",
    downloadUrl:
      "https://github.com/Shadow64gg/DBM-14/blob/DBM-14/actions/set_role_channel_perms_MOD.js",
  },

  //---------------------------------------------------------------------
  // Action Fields
  //
  // These are the fields for the action. These fields are customized
  // by creating elements with corresponding IDs in the HTML. These
  // are also the names of the fields stored in the action's JSON data.
  //---------------------------------------------------------------------

  fields: [
    "channel",
    "varName",
    "role",
    "varName2",
    "permission",
    "state",
    "reason",
  ],

  //---------------------------------------------------------------------
  // Command HTML
  //
  // This function returns a string containing the HTML used for
  // editing actions.
  //
  // The "isEvent" parameter will be true if this action is being used
  // for an event. Due to their nature, events lack certain information,
  // so edit the HTML to reflect this.
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

<channel-input dropdownLabel="Source Channel" selectId="channel" variableContainerId="varNameContainer" variableInputId="varName"></channel-input>

<br><br><br>

<role-input style="padding-top: 8px;" dropdownLabel="Source Role" selectId="role" variableContainerId="varNameContainer2" variableInputId="varName2"></role-input>

<br><br><br>

<div style="padding-top: 8px;">
	<div style="float: left; width: calc(50% - 12px);">
		<span class="dbminputlabel">Permission</span><br>
		<select id="permission" class="round">
      <optgroup label="Text Channel Permissions">
        <option value="ViewChannel">View Channel</option>
        <option value="SendMessages">Send Messages</option>
        <option value="SendTTSMessages">Send TTS Messages</option>
        <option value="ManageMessages">Manage Messages</option>
        <option value="EmbedLinks">Embed Links</option>
        <option value="AttachFiles">Attach Files</option>
        <option value="ReadMessageHistory">Read Message History</option>
        <option value="MentionEveryone">Mention Everyone</option>
        <option value="UseExternalEmojis">Use External Emojis</option>
        <option value="ManageThreads">Manage Threads</option>
        <option value="CreatePublicThreads">Create Public Threads</option>
        <option value="CreatePrivateThreads">Create Private Threads</option>
        <option value="UseExternalStickers">Use External Stickers</option>
        <option value="SendMessagesInThreads">Send Messages in Threads</option>
      </optgroup>
      <optgroup label="Voice Channel Permissions">
        <option value="Connect">Connect</option>
        <option value="Speak">Speak</option>
        <option value="Stream">Stream</option>
        <option value="UseVAD">Use Voice Activity</option>
        <option value="MuteMembers">Mute Members</option>
        <option value="DeafenMembers">Deafen Members</option>
        <option value="MoveMembers">Move Members</option>
        <option value="PrioritySpeaker">Priority Speaker</option>
      </optgroup>
    </select>
	</div>
	<div style="float: right; width: calc(50% - 12px);">
		<span class="dbminputlabel">Change To</span><br>
		<select id="state" class="round">
			<option value="0" selected>Allow</option>
			<option value="1">Inherit</option>
			<option value="2">Disallow</option>
		</select>
	</div>
</div>

<br><br><br>

<div style="padding-top: 8px;">
  <span class="dbminputlabel">Reason</span>
  <input id="reason" placeholder="Optional" class="round" type="text">
</div>`;
  },

  //---------------------------------------------------------------------
  // Action Editor Init Code
  //
  // When the HTML is first applied to the action editor, this code
  // is also run. This helps add modifications or setup reactionary
  // functions for the DOM elements.
  //---------------------------------------------------------------------

  init() {},

  //---------------------------------------------------------------------
  // Action Bot Function
  //
  // This is the function for the action within the Bot's Action class.
  // Keep in mind event calls won't have access to the "msg" parameter,
  // so be sure to provide checks for variable existence.
  //---------------------------------------------------------------------

  async action(cache) {
    const data = cache.actions[cache.index];
    const channel = await this.getChannelFromData(
      data.channel,
      data.varName,
      cache
    );
    const role = await this.getRoleFromData(data.role, data.varName2, cache);
    const reason = this.evalMessage(data.reason, cache);

    const options = {
      [data.permission]: [true, null, false][parseInt(data.state, 10)],
    };

    if (role?.id) {
      if (Array.isArray(channel)) {
        this.callListFunc(channel.permissionOverwrites, "edit", [
          role,
          options,
          { reason, type: 0 },
        ]).then(() => this.callNextAction(cache));
      } else if (channel?.permissionOverwrites) {
        channel.permissionOverwrites
          .edit(role, options, { reason, type: 0 })
          .then(() => this.callNextAction(cache))
          .catch((err) => this.displayError(data, cache, err));
      } else {
        this.callNextAction(cache);
      }
    } else {
      this.callNextAction(cache);
    }
  },

  //---------------------------------------------------------------------
  // Action Bot Mod
  //
  // Upon initialization of the bot, this code is run. Using the bot's
  // DBM namespace, one can add/modify existing functions if necessary.
  // In order to reduce conflicts between mods, be sure to alias
  // functions you wish to overwrite.
  //---------------------------------------------------------------------

  mod() {},
};
