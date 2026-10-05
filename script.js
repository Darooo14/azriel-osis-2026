```javascript
/* =========================
   NAVBAR
========================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("open");

        menuBtn.textContent =
            navLinks.classList.contains("open")
                ? "✕"
                : "☰";

    });


    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            menuBtn.textContent = "☰";

        });

    });

}


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(".reveal");

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    observer.observe(element);

});


/* =========================
   ACTIVE NAV
========================= */

const sections =
    document.querySelectorAll(
        "section[id], header[id]"
    );

const navItems =
    document.querySelectorAll(
        ".nav-links a:not(.nav-support)"
    );


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top =
            section.offsetTop - 150;

        if (window.scrollY >= top) {

            current =
                section.getAttribute("id");

        }

    });


    navItems.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href")
            ===
            "#" + current
        ) {

            link.classList.add("active");

        }

    });

});


/* =========================
   BACK TO TOP
========================= */

const topBtn =
    document.getElementById("topBtn");


window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        topBtn.classList.add("show");

    } else {

        topBtn.classList.remove("show");

    }

});


topBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================
   TOAST
========================= */

const toast =
    document.getElementById("toast");


let toastTimer;


function showToast(message) {

    if (!toast) return;

    clearTimeout(toastTimer);

    toast.textContent = message;

    toast.classList.add("show");

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


/* =========================
   QR CODE
========================= */

const qrImage =
    document.getElementById("qrImage");


if (qrImage) {

    const websiteURL =
        "https://darooo14.github.io/WEB-AZRIEL/";

    qrImage.src =
        "https://api.qrserver.com/v1/create-qr-code/?size=500x500&margin=10&data="
        + encodeURIComponent(websiteURL);

}


/* =========================
   QR ERROR CHECK
========================= */

if (qrImage) {

    qrImage.addEventListener("error", () => {

        qrImage.alt =
            "QR Code gagal dimuat";

        showToast(
            "QR Code gagal dimuat. Cek koneksi internet."
        );

    });

}


/* =========================
   COPY WEBSITE LINK
========================= */

const copyWebBtn =
    document.getElementById("copyWebBtn");


if (copyWebBtn) {

    copyWebBtn.addEventListener(
        "click",
        async () => {

            const websiteURL =
                "https://darooo14.github.io/WEB-AZRIEL/";

            try {

                await navigator.clipboard.writeText(
                    websiteURL
                );

                showToast(
                    "Link website berhasil disalin ✓"
                );

            } catch (error) {

                showToast(
                    "Gagal menyalin link."
                );

            }

        }
    );

}


/* =========================
   FAQ
========================= */

document
    .querySelectorAll(".faq-question")
    .forEach(button => {

        button.addEventListener("click", () => {

            const item =
                button.parentElement;

            document
                .querySelectorAll(".faq-item")
                .forEach(other => {

                    if (other !== item) {

                        other.classList.remove("open");

                    }

                });

            item.classList.toggle("open");

        });

    });


/* =========================
   ASPIRASI
========================= */

const aspirationInput =
    document.getElementById(
        "aspirationInput"
    );


const charCount =
    document.getElementById(
        "charCount"
    );


if (aspirationInput) {

    aspirationInput.addEventListener(
        "input",
        () => {

            charCount.textContent =
                aspirationInput.value.length;

        }
    );

}


const savedAspiration =
    localStorage.getItem(
        "azrielAspiration"
    );


if (
    savedAspiration &&
    aspirationInput
) {

    aspirationInput.value =
        savedAspiration;

    charCount.textContent =
        savedAspiration.length;

}


const saveAspiration =
    document.getElementById(
        "saveAspiration"
    );


if (saveAspiration) {

    saveAspiration.addEventListener(
        "click",
        () => {

            const value =
                aspirationInput.value.trim();

            if (!value) {

                showToast(
                    "Tulis aspirasinya dulu 😄"
                );

                return;

            }

            localStorage.setItem(
                "azrielAspiration",
                value
            );

            showToast(
                "Aspirasi berhasil disimpan ✓"
            );

        }
    );

}


/* =========================
   SUPABASE
========================= */

const SUPABASE_URL =
    "https://flllmissujjnwecbvbtp.supabase.co";


const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_AtBpcdqmJPx0WVzZdqfKjg_bhNmK93q";


const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );


const supportBtn =
    document.getElementById(
        "supportBtn"
    );


const supportCount =
    document.getElementById(
        "supportCount"
    );


const statVotes =
    document.getElementById(
        "statVotes"
    );


const progressBar =
    document.getElementById(
        "progressBar"
    );


const progressText =
    document.getElementById(
        "progressText"
    );


/* =========================
   VOTE CHECK
========================= */

function hasVoted() {

    return (
        localStorage.getItem(
            "azrielVoted"
        ) === "true"
    );

}


/* =========================
   ALREADY VOTED
========================= */

function showAlreadyVoted() {

    if (!supportBtn) return;

    supportBtn.textContent =
        "✓ Sudah Didukung";

    supportBtn.classList.add(
        "supported"
    );

    supportBtn.disabled = true;

}


/* =========================
   UPDATE VOTE
========================= */

function updateVoteDisplay(count) {

    const number =
        Number(count) || 0;


    if (supportCount) {

        supportCount.textContent =
            number.toLocaleString("id-ID");

    }


    if (statVotes) {

        statVotes.textContent =
            number.toLocaleString("id-ID");

    }


    if (progressBar) {

        const percentage =
            Math.min(
                (number / 100) * 100,
                100
            );

        progressBar.style.width =
            percentage + "%";

    }


    if (progressText) {

        progressText.textContent =
            number.toLocaleString("id-ID")
            +
            " dukungan terkumpul";

    }

}


/* =========================
   LOAD VOTES
========================= */

async function loadVotes() {

    try {

        const {
            data,
            error
        } =
            await supabaseClient
                .from("votes")
                .select("count")
                .eq("id", 1)
                .single();


        if (error) {

            console.error(
                "Gagal mengambil vote:",
                error
            );

            return;

        }


        updateVoteDisplay(
            data.count
        );

    } catch (error) {

        console.error(
            "Supabase error:",
            error
        );

    }

}


/* =========================
   HEART ANIMATION
========================= */

function createHeartAnimation() {

    if (!supportBtn) return;


    const heart =
        document.createElement("div");


    heart.className =
        "heart-pop";


    heart.textContent =
        "❤️";


    const rect =
        supportBtn.getBoundingClientRect();


    heart.style.position =
        "fixed";


    heart.style.left =
        (
            rect.left +
            rect.width / 2
        ) + "px";


    heart.style.top =
        rect.top + "px";


    heart.style.zIndex =
        "9999";


    document.body.appendChild(
        heart
    );


    setTimeout(() => {

        heart.remove();

    }, 1000);

}


/* =========================
   SEND VOTE
========================= */

async function sendVote() {

    if (!supportBtn) return;


    if (hasVoted()) {

        showAlreadyVoted();

        return;

    }


    supportBtn.disabled = true;

    supportBtn.textContent =
        "⏳ Mengirim...";


    try {

        const {
            data,
            error
        } =
            await supabaseClient
                .rpc("increment_vote");


        if (error) {

            console.error(
                "Vote gagal:",
                error
            );

            supportBtn.disabled =
                false;

            supportBtn.textContent =
                "❤️ Dukung Azriel";

            showToast(
                "Vote gagal dikirim."
            );

            return;

        }


        updateVoteDisplay(
            data
        );


        localStorage.setItem(
            "azrielVoted",
            "true"
        );


        supportBtn.textContent =
            "✓ Terima kasih!";


        supportBtn.classList.add(
            "supported"
        );


        createHeartAnimation();


        showToast(
            "Dukungan berhasil dikirim ❤️"
        );


    } catch (error) {

        console.error(
            "Supabase error:",
            error
        );

        supportBtn.disabled =
            false;

        supportBtn.textContent =
            "❤️ Dukung Azriel";

        showToast(
            "Terjadi kesalahan."
        );

    }

}


/* =========================
   VOTE BUTTON
========================= */

if (supportBtn) {

    supportBtn.addEventListener(
        "click",
        sendVote
    );

}


/* =========================
   SHARE
========================= */

const shareBtn =
    document.getElementById(
        "shareBtn"
    );


if (shareBtn) {

    shareBtn.addEventListener(
        "click",
        async () => {

            const shareData = {

                title:
                    "Azriel For OSIS",

                text:
                    "Dukung Azriel sebagai calon Ketua OSIS 2026! #AzrielForOSIS",

                url:
                    "https://darooo14.github.io/WEB-AZRIEL/"

            };


            try {

                if (navigator.share) {

                    await navigator.share(
                        shareData
                    );

                } else {

                    await navigator.clipboard.writeText(
                        shareData.url
                    );

                    showToast(
                        "Link campaign disalin ✓"
                    );

                }

            } catch (error) {

                console.log(
                    "Share dibatalkan."
                );

            }

        }
    );

}


/* =========================
   COPY HASHTAG
========================= */

const copyBtn =
    document.getElementById(
        "copyBtn"
    );


if (copyBtn) {

    copyBtn.addEventListener(
        "click",
        async () => {

            try {

                await navigator.clipboard.writeText(
                    "#AzrielForOSIS"
                );

                showToast(
                    "#AzrielForOSIS berhasil disalin ✓"
                );

            } catch (error) {

                showToast(
                    "Gagal menyalin hashtag."
                );

            }

        }
    );

}


/* =========================
   INITIAL LOAD
========================= */

loadVotes();


if (hasVoted()) {

    showAlreadyVoted();

}


/* =========================
   AUTO REFRESH VOTE
========================= */

setInterval(() => {

    loadVotes();

}, 30000);


/* =========================
   IMAGE ERROR CHECK
========================= */

document
    .querySelectorAll("img")
    .forEach(img => {

        img.addEventListener(
            "error",
            () => {

                console.warn(
                    "Gambar tidak ditemukan:",
                    img.src
                );

            }
        );

    });
```
