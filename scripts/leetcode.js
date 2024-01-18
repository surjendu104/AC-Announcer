function LeetCode() { }

LeetCode.prototype.getSubmissionResult = () => {
    const successMessageTag = document.querySelectorAll('[data-e2e-locator="submission-result"]');
    if (successMessageTag && successMessageTag.length > 0) {
        return true;
    }
    return false;
}

const loader = (leetcode) => {
    let iteration = 0;
    const intervalId = setInterval(async () => {
        try {
            isAccepted = leetcode.getSubmissionResult();

            if (isAccepted && iteration >= 9) {
                clearInterval(intervalId);
                playMusic(); // Call playMusic only if isAccepted is true
            } else {
                iteration++;
                if (iteration > 15) {
                    clearInterval(intervalId);
                    return;
                }
            }
        } catch (error) {
            console.log(error);
            clearInterval(intervalId);
        }
        return;
    }, 1000);
}
// https://nzt6ku-a.akamaihd.net/downloads/ringtones/files/mp3/ringtone-1-1674469076676-61515.mp3  
const playMusic = async () => {
    try {
        const result = await chrome.storage.local.get(["Ac_announcer_music_url"]);

        // Now you can perform the audio playback here
        let audio = new Audio(result.Ac_announcer_music_url);
        audio.play();
    } catch (error) {
        // console.log("Error in playing music");
        return;
    }
}



const observer = new MutationObserver((_mutations, observer) => {
    const V2SubmitButton = document.querySelector('[data-e2e-locator="console-submit-button"]');
    const textareaList = document.getElementsByTagName('textarea');
    const textarea = textareaList.length === 4 ? textareaList[2] : (textareaList.length === 2 ? textareaList[0] : textareaList[1]);

    if (V2SubmitButton && textarea) {
        observer.disconnect();

        const leetcode = new LeetCode();
        V2SubmitButton.addEventListener('click', () => loader(leetcode))
    }
});

setTimeout(() => {
    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
}, 2000);

