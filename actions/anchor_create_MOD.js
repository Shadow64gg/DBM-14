module.exports = {
  name: "Create Anchor",
  section: "Other Stuff",
  meta: {
    version: "3.2.4",
    preciseCheck: false,
    author: "DBM Mods",
    authorUrl: "https://github.com/dbm-network/mods",
    downloadURL:
      "https://github.com/Shadow64gg/DBM-14/blob/DBM-v14/actions/anchor_create_MOD.js",
  },

  subtitle(data) {
    return data.description
      ? `<font color="${data.color}">${data.description}</font>`
      : `Create ${
          data.anchor_id
            ? `the "<font color="${data.color}">${data.anchor_id}</font>" anchor at the current position!`
            : "an anchor!"
        }`;
  },

  fields: ["anchor_id", "color", "description"],

  html() {
    return `
<div>
  <p>
    <u>Mod Info:</u><br>
    This mod creates an anchor point for you to jump to without<br>
    having to edit other jumps or skips.
  </p>
</div><br>
<div style="float: left; width: 74%;">
  <span class="dbminputlabel">Anchor ID</span>
  <input type="text" class="round" id="anchor_id"><br>
</div>
<div style="float: left; width: 24%;">
  <span class="dbminputlabel">Anchor Color</span>
  <input type="color" id="color"><br>
</div>
<div>
  <div style="float: left; width: 98%;">
    <span class="dbminputlabel">Description</span>
    <input type="text" class="round" id="description">
  </div>
</div>`;
  },

  init() {},

  async action(cache) {
    this.callNextAction(cache);
  },

  mod() {},
};
