module.exports = {
  name: "Show Modal",

  section: "Messaging",

  subtitle(data, presets) {
    return `"${data.title}" with ${data.textInputs.length} Text Inputs`;
  },

  variableStorage(data, varType) {
    if (varType !== 1) return;
    if (!data.textInputs) return;
    const result = [];
    for (let i = 0; i < data.textInputs.length; i++) {
      if (data.textInputs[i].id) {
        result.push(data.textInputs[i].id);
        result.push("Text from Input");
      }
    }
    return result;
  },

  meta: {
    version: "3.2.4",
    preciseCheck: true,
    author: "Shadow",
    authorUrl: null,
    downloadUrl:
      "https://github.com/Gotowka/mydbm/blob/v3/actions/show_modal.js",
  },

  fields: ["title", "textInputs"],

  html(isEvent, data) {
    return `
<span class="dbminputlabel">Modal Title</span><br>
<input id="title" class="round" type="text" value="My Modal">

<br><br>

<dialog-list id="textInputs" fields='["name", "placeholder", "minLength", "maxLength", "id", "row", "style", "required"]' dialogTitle="Text Input Info" dialogWidth="600" dialogHeight="370" listLabel="Text Inputs" listStyle="height: calc(100vh - 300px);" itemName="Text Input" itemCols="1" itemHeight="40px;" itemTextFunction="data.name + ' (' + (data.style === 'PARAGRAPH' ? 'Paragraph)' : 'One-Line)')" itemStyle="line-height: 40px;">
  <div style="padding: 16px;">
    <div style="width: calc(50% - 12px); float: left;">
      <span class="dbminputlabel">Name</span>
      <input id="name" class="round" type="text">

      <br>

      <span class="dbminputlabel">Placeholder</span><br>
      <input id="placeholder" class="round" type="text">

      <br>

      <span class="dbminputlabel">Minimum Length</span>
      <input id="minLength" placeholder="0" class="round" type="text" value="0">

      <br>

      <span class="dbminputlabel">Maximum Length</span>
      <input id="maxLength" placeholder="1000" class="round" type="text" value="1000">

      <br>
    </div>
    <div style="width: calc(50% - 12px); float: right;">
      <span class="dbminputlabel">Temp Var ID</span>
      <input id="id" placeholder="Leave blank to disallow..." class="round" type="text">

      <br>

      <span class="dbminputlabel">Style</span>
      <select id="style" class="round">
        <option value="SHORT">One Line</option>
        <option value="PARAGRAPH">Paragraph</option>
      </select>

      <br>

      <span class="dbminputlabel">Required?</span>
      <select id="required" class="round">
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    </div>

  </div>
</dialog-list>`;
  },

  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];
    const {
      TextInputBuilder,
      ModalBuilder,
      ActionRowBuilder,
    } = require("discord.js");

    const tempVariableNames = [];
    const componentsArr = [];

    if (Array.isArray(data.textInputs)) {
      for (const textInput of data.textInputs) {
        const input = new TextInputBuilder()
          .setCustomId(
            textInput.id ||
              `input_${Math.random().toString(36).substring(2, 8)}`
          )
          .setLabel(textInput.name)
          .setPlaceholder(textInput.placeholder)
          .setRequired(textInput.required === "true")
          .setStyle(textInput.style === "SHORT" ? 1 : 2)
          .setMinLength(Number(textInput.minLength) || 0)
          .setMaxLength(Number(textInput.maxLength) || 1000);

        componentsArr.push(new ActionRowBuilder().addComponents(input));
        if (textInput.id) tempVariableNames.push(textInput.id);
      }
    }

    if (cache.interaction?.showModal) {
      const modalData = new ModalBuilder()
        .setCustomId(`modal_${cache.interaction.id}`)
        .setTitle(this.evalMessage(data.title, cache))
        .addComponents(componentsArr);

      await cache.interaction.showModal(modalData);

      try {
        const modalInteraction = await cache.interaction.awaitModalSubmit({
          filter: (i) => i.customId === `modal_${cache.interaction.id}`,
          time: 60000,
        });

        for (const name of tempVariableNames) {
          const val = modalInteraction.fields.getTextInputValue(name);
          if (typeof val === "string") {
            this.storeValue(val, 1, name, cache);
          }
        }

        await modalInteraction.deferUpdate();
      } catch (error) {
        console.error("Modal submission error:", error);
      }
    }

    this.callNextAction(cache);
  },

  mod() {},
};
