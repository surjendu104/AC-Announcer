
$("#change_music_button").click(function() {
    const musicURl = $("#music__url").val();
    alert(musicURl);
    if(musicURl) {
        chrome.storage.local.set({"Ac_announcer_music_url" : musicURl}, () => alert("Set.........."));
    }
})
