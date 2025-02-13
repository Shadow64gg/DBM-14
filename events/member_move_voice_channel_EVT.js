module.exports = {
  name: "Member Move Voice Channel",
  isEvent: true,

  fields: [
    "Temp Variable Name (Stores member that entered the channel):",
    `Temp Variable Name (Stores channel that the member joined):
    <div id="tempVarStore3" style="position: absolute; right: 0; top: 0; transform: translateX(0%);">
                <span class="dbminputlabel" id="tempLabel3">Temp Variable Name (Stores channel that the member left):</span>
                <input class="dbm_input" id="etemp3" style="width: 100%;" onchange="DBM.etempSaveData('etemp3')" type="text" value="channel2">
            </div>
    `,
  ],

  mod(DBM) {
    DBM.Events = DBM.Events || {};
    const { Actions, Bot } = DBM;

    DBM.Events.memberMoveVoiceChannel = function memberMoveVoiceChannel(
      oldVoiceState,
      newVoiceState
    ) {
      if (!Bot.$evts["Member Move Voice Channel"]) return;
      const oldChannel = oldVoiceState.channel;
      const newChannel = newVoiceState.channel;
      if (
        !oldChannel ||
        !newChannel ||
        !oldChannel.id ||
        !newChannel.id ||
        oldChannel.id === newChannel.id
      )
        return;
      const server = newChannel.guild;

      for (const event of Bot.$evts["Member Move Voice Channel"]) {
        const temp = {};
        if (event.temp) temp[event.temp] = newVoiceState.member;
        if (event.temp2) temp[event.temp2] = newChannel;
        if (event.temp3) temp[event.temp3] = oldChannel;
        Actions.invokeEvent(event, server, temp);
      }
    };

    const { onReady } = Bot;
    Bot.onReady = function memberMoveVoiceChannelOnReady(...params) {
      Bot.bot.on("voiceStateUpdate", DBM.Events.memberMoveVoiceChannel);
      onReady.apply(this, ...params);
    };
  },
};
