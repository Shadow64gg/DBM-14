module.exports = {
  name: "Parse From Stored Json",
  section: "JSON Things",
  meta: {
    version: "3.2.4",
    preciseCheck: false,
    author: "DBM Mods",
    authorUrl: "https://github.com/dbm-network/mods",
    downloadURL:
      "https://github.com/dbm-network/mods/blob/master/actions/parse_from_stored_json_MOD.js",
  },

  subtitle(data) {
    return `${data.varName}`;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    if (varType === "object") return [data.varName, "JSON Object"];
    return [data.varName, `JSON ${varType} Value`];
  },

  fields: [
    "behavior",
    "varStorage",
    "jsonObjectVarName",
    "path",
    "storage",
    "varName",
    "debugMode",
  ],

  html() {
    return `
<style>
    .debugMode {
      float: left;
      margin-left: 10px;
      width: 30%;
    }
</style>
<div style="margin: 0; overflow-y: none;">
    <div style="width: 80%;">
      <store-in-variable dropdownLabel="Source Variable" selectId="varStorage" variableContainerId="jsonObjectVarNameContainer" variableInputId="jsonObjectVarName"></store-in-variable>
      <br><br><br>
        
      <div id="pathContainer" style="padding-top: 8px">
        JSON Path: (supports the usage of <a href="http://goessner.net/articles/JsonPath/index.html#e2" target="_blank">JSON Path (Regex)</a>)<br>
        <input id="path" class="round" type="text"><br>
      </div>
    </div>
    <div style="width: 80%">
      <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
    </div>
    <div>
        <div style="float: left;">
            <br>
            <span class="dbminputlabel">End Behavior</span>
            <select id="behavior" class="round">
                <option value="0" selected>Call Next Action Automatically</option>
                <option value="1">Do Not Call Next Action</option>
            </select>
        </div>
        <div class="debugMode">
            <br>
            <span class="dbminputlabel">Debug Mode</span>
            <select id="debugMode" class="round">
                <option value="0" selected>Disabled</option>
                <option value="1">Enabled</option>
            </select>
        </div>
    </div>
</div>
`;
  },

  init() {},

  async action(cache) {
    const Mods = this.getMods();
    const data = cache.actions[cache.index];
    const varName = this.evalMessage(data.varName, cache);
    const storage = parseInt(data.storage, 10);
    const type = parseInt(data.varStorage, 10);
    const jsonObjectVarName = this.evalMessage(data.jsonObjectVarName, cache);
    const path = this.evalMessage(data.path, cache);
    const jsonRaw = this.getVariable(type, jsonObjectVarName, cache);
    const DEBUG = parseInt(data.debugMode, 10);

    let jsonData = jsonRaw;
    if (typeof jsonRaw !== "object") {
      jsonData = JSON.parse(jsonRaw);
    }

    try {
      if (path && jsonData) {
        let outData = Mods.jsonPath(jsonData, path);

        if (outData === false) {
          outData = Mods.jsonPath(jsonData, `$.${path}`);
        }

        if (outData === false) {
          outData = Mods.jsonPath(jsonData, `$..${path}`);
        }

        if (DEBUG) console.log(outData);

        try {
          JSON.parse(JSON.stringify(outData));
        } catch (error) {
          const errorJson = JSON.stringify({ error, success: false });
          this.storeValue(errorJson, storage, varName, cache);
          console.error(error.stack ? error.stack : error);
        }

        const outValue = JSON.stringify(outData);

        if (outData.success === null || outValue.success === null) {
          const errorJson = JSON.stringify({
            error: "error",
            statusCode: 0,
            success: false,
          });
          this.storeValue(errorJson, storage, varName, cache);
          console.log(
            `1: WebAPI Parser: Error Invalid JSON, is the Path set correctly? [${path}]`
          );
        } else if (!outValue || outValue.success === null) {
          const errorJson = JSON.stringify({
            error: "error",
            statusCode: 0,
            success: false,
          });
          this.storeValue(errorJson, storage, varName, cache);
          console.log(
            `2: WebAPI Parser: Error Invalid JSON, is the Path set correctly? [${path}]`
          );
        } else {
          this.storeValue(outValue, storage, varName, cache);
          if (DEBUG)
            console.log(
              `WebAPI Parser: JSON Data values starting from [${path}] stored to: [${varName}]`
            );
        }
      }
    } catch (error) {
      const errorJson = JSON.stringify({
        error,
        statusCode: 0,
        success: false,
      });
      this.storeValue(errorJson, storage, varName, cache);
      console.error(
        `WebAPI Parser: Error: ${errorJson} stored to: [${varName}]`
      );
    }

    if (data.behavior === "0") {
      this.callNextAction(cache);
    }
  },

  mod() {},
};
