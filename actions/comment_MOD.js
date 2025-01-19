module.exports = {
  name: "Comment",
  section: "Other Stuff",
  meta: {
    version: "3.2.4",
    preciseCheck: false,
    author: "Shadow",
    authorUrl: "https://github.com/Shadow64gg",
    downloadURL: null,
  },

  subtitle(data) {
    let styles = "";

    if (data.bold === "true") styles += "font-weight: bold; ";
    if (data.italic === "true") styles += "font-style: italic; ";
    if (data.underline === "true") styles += "text-decoration: underline; ";
    if (data.strikethrough === "true")
      styles += "text-decoration: line-through; ";

    return `<span style="color: ${data.color}; ${styles}">${data.comment}</span>`;
  },

  fields: ["comment", "color", "bold", "italic", "underline", "strikethrough"],

  html() {
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
    
    
    <div style="margin-bottom: 10px;">
      <span class="dbminputlabel">Comment To Show</span><br>
      <input id="comment" class="round" type="text">
    </div>

    <hr class="subtlebar" style="width: 100%; margin-top: 30px; margin-bottom: 30px;">

    <div style="margin-bottom: 10px;">
      <span class="dbminputlabel">Color</span><br>
      <input type="color" id="color" class="round">
    </div>
    <div style="clear: both;"></div>
  </div>
        <div style="display: flex; gap: 10px; margin-bottom: 10px;">
          <div style="flex: 1;">
            <span class="dbminputlabel">Bold</span><br>
            <select id="bold" class="round">
              <option value="true">True</option>
              <option value="false" selected>False</option>
            </select>
          </div>
          <div style="flex: 1;">
            <span class="dbminputlabel">Italic</span><br>
            <select id="italic" class="round">
              <option value="true">True</option>
              <option value="false" selected>False</option>
            </select>
          </div>
        </div>
        <div style="display: flex; gap: 10px;">
          <div style="flex: 1;">
            <span class="dbminputlabel">Underline</span><br>
            <select id="underline" class="round">
              <option value="true">True</option>
              <option value="false" selected>False</option>
            </select>
          </div>
          <div style="flex: 1;">
            <span class="dbminputlabel">Strikethrough</span><br>
            <select id="strikethrough" class="round">
              <option value="true">True</option>
              <option value="false" selected>False</option>
            </select>
          </div>
        </div>
      </div>
    </div>`;
  },

  init() {},

  async action(cache) {
    this.callNextAction(cache);
  },

  mod() {},
};
