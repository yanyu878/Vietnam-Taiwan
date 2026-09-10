/* =====================================================
   01. TEXT FOR AI VOICE
===================================================== */

const homeText = `
關於我在越南與台灣的生活與飲食。

分享我的家鄉越南同塔，
以及在台灣學習、生活與品嚐美食的旅程。
`;


const aboutText = `
我是阮燕玉，我十九歲，越南人。

我是南越人，我的家鄉在同塔。

我來台灣六個月了，
我是來台灣讀書的。

不上課的時候，
我常常去夜市，我覺得很開心。

來台灣以後，
我覺得天氣最不一樣。

最近有一件讓我很高興的事情，
是認識很多新朋友。
`;


const vnText = `
同塔是我的家鄉。

這裡以無邊無際的荷花池
和水鄉澤國的平靜生活步調而聞名。

同塔有很多特色美食，
例如沙瀝粿條、荷花料理、
來威酸肉和沙瀝蝦餅。
`;


const twText = `
這是我在台灣學習與體驗新文化的旅程。

包含每天上課的點滴，
以及平時探索街巷的時光。

提到台灣美食，
就不得不提珍珠奶茶、牛肉麵，
還有夜市裡的臭豆腐、大雞排和小籠包。

對我來說，
台灣的食物口味比較清淡，
油分也稍微多一點。

但不管是哪個國家的美食，
都各有特色的好吃！
`;


/* =====================================================
   02. FOOD DATA
===================================================== */

let foodCurrent = "";
let currentUtterance = null;
let isPlayingAll = false;

/* =====================================================
   03. FIND CHINESE VOICE
===================================================== */

function getChineseVoice() {

    const voices =
        speechSynthesis.getVoices();

    let voice =
        voices.find(
            v =>
            v.lang.toLowerCase() === "zh-tw"
        );

    if (!voice) {

        voice =
            voices.find(
                v =>
                v.lang.toLowerCase()
                    .includes("zh-tw")
            );

    }

    if (!voice) {

        voice =
            voices.find(
                v =>
                v.lang.toLowerCase()
                    .startsWith("zh")
            );

    }

    return voice;
}


/* =====================================================
   04. AI VOICE
===================================================== */

function speak(text){

    if(!text) return;

    // Dừng mọi giọng đang phát
    speechSynthesis.cancel();
    isPlayingAll = false;

    currentUtterance = new SpeechSynthesisUtterance(text);

    currentUtterance.lang = "zh-TW";
    currentUtterance.rate = 0.9;
    currentUtterance.pitch = 1.05;
    currentUtterance.volume = 1;

    const chineseVoice = getChineseVoice();
    if(chineseVoice){
        currentUtterance.voice = chineseVoice;
    }

    speechSynthesis.speak(currentUtterance);
}

/* =====================================================
   05. PLAY ALL
===================================================== */

function playAll(){

    speechSynthesis.cancel();
    isPlayingAll = true;

    const texts = [homeText, aboutText, vnText, twText];
    let index = 0;

    function playNext(){

        if(!isPlayingAll || index >= texts.length) return;

        currentUtterance = new SpeechSynthesisUtterance(texts[index]);

        currentUtterance.lang = "zh-TW";
        currentUtterance.rate = 0.9;
        currentUtterance.pitch = 1.05;

        const chineseVoice = getChineseVoice();
        if(chineseVoice){
            currentUtterance.voice = chineseVoice;
        }

        currentUtterance.onend = () => {
            index++;
            playNext();
        };

        speechSynthesis.speak(currentUtterance);
    }

    playNext();
}


/* =====================================================
   06. OPEN FOOD MODAL
===================================================== */

function openFood(
    title,
    description,
    image
)
{

    foodCurrent =
        `${title}。${description}`;


    document.getElementById(
        "foodTitle"
    ).innerText =
        title;


    document.getElementById(
        "foodDesc"
    ).innerText =
        description;


    document.getElementById(
        "foodImg"
    ).src =
        image;


    document.getElementById(
        "foodModal"
    ).classList.add(
        "show"
    );

}


/* =====================================================
   07. CLOSE FOOD MODAL
===================================================== */

function closeFood() {

    document.getElementById(
        "foodModal"
    ).classList.remove(
        "show"
    );


    speechSynthesis.cancel();

}


/* =====================================================
   08. CLICK OUTSIDE MODAL
===================================================== */

window.addEventListener(
    "click",
    function(event) {

        const modal =
            document.getElementById(
                "foodModal"
            );

        if (
            event.target === modal
        ) {

            closeFood();

        }

    }
);


/* =====================================================
   09. ESC KEY
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            closeFood();

        }

    }
);


/* =====================================================
   10. SCROLL REVEAL
===================================================== */

const observer =
    new IntersectionObserver(
        function(entries) {

            entries.forEach(
                function(entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add("active");

                    }

                }
            );

        },
        {
            threshold: 0.15
        }
    );


document
    .querySelectorAll(".reveal")
    .forEach(
        function(element) {

            observer.observe(
                element
            );

        }
    );


/* =====================================================
   11. CONTACT FORM
===================================================== */

const contactForm =
    document.getElementById(
        "contactForm"
    );


contactForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        alert(
            "謝謝你的訊息！我會盡快回覆你 😊"
        );

        contactForm.reset();

    }
);


/* =====================================================
   12. LOAD VOICES
===================================================== */

speechSynthesis.onvoiceschanged =
    function() {

        speechSynthesis.getVoices();

    };
    /* =====================================================
   STOP VOICE WHEN CHANGING SECTION
===================================================== */

let currentSection = "home";


function stopVoice() {

    speechSynthesis.cancel();

    currentUtterance = null;

    isPlayingAll = false;

}


/* =====================================================
   NAVIGATION CLICK
===================================================== */

document
    .querySelectorAll("nav a")
    .forEach(function(link) {

        link.addEventListener(
            "click",
            function() {

                stopVoice();

            }
        );

    });


/* =====================================================
   DETECT CURRENT SECTION
===================================================== */

const sections =
    document.querySelectorAll("section");


const sectionObserver =
    new IntersectionObserver(
        function(entries) {

            entries.forEach(function(entry) {

                if (
                    entry.isIntersecting
                ) {

                    const newSection =
                        entry.target.id;


                    if (
                        currentSection !==
                        newSection
                    ) {

                        stopVoice();

                        currentSection =
                            newSection;

                    }

                }

            });

        },
        {
            threshold: 0.6
        }
    );


sections.forEach(
    function(section) {

        sectionObserver.observe(
            section
        );

    }
);