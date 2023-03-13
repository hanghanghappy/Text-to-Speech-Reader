window.addEventListener('DOMContentLoaded', init);

function init() {

  let synth = window.speechSynthesis;
  let voiceSelect = document.getElementById("voice-select");
  let voices = [];

  synth.addEventListener("voiceschanged", function (e) {
    voices = synth.getVoices();
    for (let i = 0; i < voices.length; i++) {
      let option = document.createElement("option");
      option.textContent = `${voices[i].name} (${voices[i].lang})`;
      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
      voiceSelect.appendChild(option);
    }
  })

  let speechButton = document.querySelector("button");
  let speechText = document.getElementById("text-to-speak");
  let speechImage = document.querySelector("img");
  speechButton.addEventListener("click", function (e) {
    let utter = new SpeechSynthesisUtterance(speechText.value);
    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === voiceSelect.selectedOptions[0].getAttribute("data-name")) {
        utter.voice = voices[i];
      }
    }
    synth.speak(utter);
    if (synth.speaking == true) {
      speechImage.src = "assets/images/grinning.png";
    }
    utter.addEventListener("end", function (e) {
      speechImage.src = "assets/images/smiling.png";
    })
  })
}