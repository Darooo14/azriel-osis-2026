// ==========================================
// AZRIEL OSIS — SCRIPT.JS
// MENU + SUPABASE ONLINE VOTE
// ==========================================


// ==========================================
// SUPABASE CONFIG
// ==========================================

const SUPABASE_URL = "https://flllmissujjnwecbvbtp.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_AtBpcdqmJPx0WVzZdqfKjg_bhNmK93q";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);


// ==========================================
// MOBILE MENU
// ==========================================

function toggleMenu() {

    const menu = document.getElementById("navMenu");

    if (!menu) return;

    if (menu.style.display === "flex") {
        menu.style.display = "none";
    } else {
        menu.style.display = "flex";
    }

}


// Tutup menu setelah link diklik

document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {

        if (window.innerWidth <= 850) {

            const menu = document.getElementById("navMenu");

            if (menu) {
                menu.style.display = "none";
            }

        }

    });

});


// Atur menu saat ukuran layar berubah

window.addEventListener("resize", () => {

    const menu = document.getElementById("navMenu");

    if (!menu) return;

    if (window.innerWidth > 850) {

        menu.style.display = "flex";

    } else {

        menu.style.display = "none";

    }

});


// ==========================================
// SUPABASE VOTE
// ==========================================

const supportBtn = document.getElementById("supportBtn");
const supportCount = document.getElementById("supportCount");


// Ambil jumlah vote dari database

async function loadVotes() {

    if (!supportCount) return;

    try {

        const { data, error } = await supabaseClient
            .from("votes")
            .select("count")
            .eq("id", 1)
            .single();

        if (error) {

            console.error("Gagal mengambil jumlah vote:", error);

            supportCount.textContent = "0";

            return;
        }

        supportCount.textContent =
            Number(data.count).toLocaleString("id-ID");

    } catch (error) {

        console.error("Supabase error:", error);

    }

}


// ==========================================
// ANIMASI HEART
// ==========================================

function createHeartAnimation() {

    if (!supportBtn) return;

    const heart = document.createElement("div");

    heart.className = "heart-pop";
    heart.textContent = "❤️";

    const rect = supportBtn.getBoundingClientRect();

    heart.style.position = "fixed";
    heart.style.left = `${rect.left + rect.width / 2}px`;
    heart.style.top = `${rect.top}px`;
    heart.style.zIndex = "9999";
    heart.style.pointerEvents = "none";

    document.body.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 1000);

}


// ==========================================
// CEK APAKAH BROWSER SUDAH VOTE
// ==========================================

function hasVoted() {

    return localStorage.getItem("azrielVoted") === "true";

}


// ==========================================
// TAMPILKAN STATUS SUDAH VOTE
// ==========================================

function setAlreadyVoted() {

    if (!supportBtn) return;

    supportBtn.textContent = "✓ Sudah Didukung";

    supportBtn.classList.add("supported");

    supportBtn.disabled = true;

}


// ==========================================
// KIRIM VOTE
// ==========================================

async function sendVote() {

    if (!supportBtn) return;


    // Cegah vote kedua dari browser yang sama

    if (hasVoted()) {

        setAlreadyVoted();

        return;

    }


    // Disable tombol sementara

    supportBtn.disabled = true;

    supportBtn.textContent = "⏳ Mengirim...";


    try {

        // Gunakan RPC Supabase.
        // Ini menambah count langsung di database
        // sehingga lebih aman daripada read → update.

        const { data, error } = await supabaseClient
            .rpc("increment_vote");


        // Kalau gagal

        if (error) {

            console.error("Vote gagal:", error);

            supportBtn.disabled = false;

            supportBtn.textContent = "❤️ Dukung Azriel";

            alert(
                "Vote gagal dikirim.\n\n" +
                "Coba lagi beberapa saat."
            );

            return;
        }


        // Ambil hasil jumlah vote terbaru

        const newCount = Number(data);


        // Update angka di halaman

        if (supportCount) {

            supportCount.textContent =
                newCount.toLocaleString("id-ID");

        }


        // Simpan status vote di browser

        localStorage.setItem(
            "azrielVoted",
            "true"
        );


        // Ubah tombol

        supportBtn.textContent =
            "✓ Terima kasih!";

        supportBtn.classList.add(
            "supported"
        );


        // Animasi hati

        createHeartAnimation();


    } catch (error) {

        console.error(
            "Terjadi kesalahan saat vote:",
            error
        );

        supportBtn.disabled = false;

        supportBtn.textContent =
            "❤️ Dukung Azriel";

        alert(
            "Terjadi kesalahan.\n\n" +
            "Silakan coba lagi."
        );

    }

}


// ==========================================
// EVENT TOMBOL VOTE
// ==========================================

if (supportBtn) {

    supportBtn.addEventListener(
        "click",
        sendVote
    );

}


// ==========================================
// LOAD VOTE SAAT WEBSITE DIBUKA
// ==========================================

loadVotes();


// ==========================================
// CEK STATUS VOTE
// ==========================================

if (hasVoted()) {

    setAlreadyVoted();

}