module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //
  // This is the name of the action displayed in the editor.
  //---------------------------------------------------------------------

  name: "Delete Message",

  //---------------------------------------------------------------------
  // Action Section
  //
  // This is the section the action will fall into.
  //---------------------------------------------------------------------

  section: "Messaging",

  //---------------------------------------------------------------------
  // Action Subtitle
  //
  // This function generates the subtitle displayed next to the name.
  //---------------------------------------------------------------------

  subtitle(data, presets) {
    return `${presets.getMessageText(data.storage, data.varName)}`;
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

  fields: ["storage", "varName", "reason"],

  //---------------------------------------------------------------------
  // Command HTML
  //
  // This function returns a string containing the HTML used for
  // editing actions.
  //---------------------------------------------------------------------

  html(isEvent, data) {
    return `
<message-input dropdownLabel="Source Message" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></message-input><br><br><br>

<div>
  <span class="dbminputlabel">Reason</span>
  <input id="reason" placeholder="Optional" class="round" type="text">
</div>`;
  },

  //---------------------------------------------------------------------
  // Action Editor Init Code
  //---------------------------------------------------------------------

  init() {},

  //---------------------------------------------------------------------
  // Action Bot Function
  //---------------------------------------------------------------------

  async action(cache) {
    const data = cache.actions[cache.index];
    const message = await this.getMessageFromData(
      data.storage,
      data.varName,
      cache
    );

    const reason = this.evalMessage(data.reason, cache);
    if (Array.isArray(message)) {
      // Usuwamy wiadomości z listy
      this.callListFunc(message, "delete", [{ reason }]).then(() =>
        this.callNextAction(cache)
      );
    } else if (message?.delete) {
      // Usuwamy pojedynczą wiadomość
      message
        .delete({ reason })
        .then(() => this.callNextAction(cache))
        .catch((err) => this.displayError(data, cache, err));
    } else {
      this.callNextAction(cache);
    }
  },

  //---------------------------------------------------------------------
  // Action Bot Mod
  //---------------------------------------------------------------------

  mod() {},
};
