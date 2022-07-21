// Di sini kita akan import beberapa fungsi dari package firebase
import { initializeApp } from "firebase/app";
import sweetalert from 'sweetalert'
// Di sini kita akan import beberapa fungsi dari package firebase/auth
// Firebase ini sebenarnya memungkinkan kita untuk bisa login dengan banyak sekali
// Provider (Google, Github, Meta, dsb).

// Tapi pada pembelajaran ini kita akan menggunakannya via Email saja yah
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";

// Ini adalah konfigurasi yang di-copy dari halaman Firebase (SDK Setup and Configuration)
// Kita pilih yang versi "config" saja

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyClakb6uYjz-2qbix-r0iJHSwoMBa394iE",
    authDomain: "netflix-clone-35a6f.firebaseapp.com",
    projectId: "netflix-clone-35a6f",
    storageBucket: "netflix-clone-35a6f.appspot.com",
    messagingSenderId: "903263303972",
    appId: "1:903263303972:web:9bb8f521592bbe35efdbb1"
};

// Sekarang di sini kita akan membuat seluruh fungsi yang digunakan untuk melakukan Register / Login

// Inisialisasi Firebase dan menggunakan Authentcation
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ---
// DALAM PEMBELAJARAN INI NAMA FUNGSI DITULIS DALAM BAHASA INDONESIA UNTUK MEMUDAHKAN PEMBELAJARAN
// PADA REAL CASE, MOHON GUNAKAN BAHASA INGGRIS DEMI KEMUDAHAN MEMBACA SECARA UNIVERSAL
// ---

// Fungsi untuk Register
// Kita gunakan versi async / await untuk memudahkan yah
const registerDenganEmailDanPassword = async (email, password) => {
    // Dokumentasi: https://firebase.google.com/docs/auth/web/password-auth
    try {
        const response = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        // Pada aturan firebase authentication
        // Setelah user selesai registrasi, maka secara otomatis akan melakukan Sign In
        // sehingga kita bisa mengecek apakah seseorang sudah berhasil masuk atau belum

        console.log(
            "User yang teregistrasi dan berhasil login adalah",
            response.user
        );
        sweetalert("User telah terdaftar dan bisa login")
        return true
    } catch (err) {
        console.log(err);

        // Sebenarnya di dalam err dari Firebase ini (dalam bentuk Object)
        // ada 2 property yang penting:
        // - code: error code dari firebase authentication ketika terjadi error
        // - message: error message dari firebase authentication ketika terjadi error
        console.log("error code auth", err.code);
        console.log("error message auth", err.message);
        sweetalert(err.message)
        return false
    }
};

// Fungsi untuk Login
// Kita gunakan versi async / await untuk memudahkan yah
const loginDenganEmailDanPassword = async (email, password) => {
    // Dokumentasi: https://firebase.google.com/docs/auth/web/password-auth#sign_in_a_user_with_an_email_address_and_password
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        console.log("User yang berhasil login....");
        sweetalert("User berhasil Login .... ")
        return true
    } catch (err) {
        console.log(err);

        // Sama dengan register
        console.log("error code auth", err.code);
        console.log("error message auth", err.message);
        sweetalert(err.message)

        return false
    }
};

// Fungsi untuk reset Password
const resetPassword = async (email) => {
    // Dokumentasi: https://firebase.google.com/docs/reference/js/auth.md#sendpasswordresetemail
    try {
        await sendPasswordResetEmail(auth, email);

        console.log("Password reset sudah dikirimkan");
    } catch (err) {
        console.log(err);
    }
};

// Fungsi untuk sign out
const keluarDariApps = async () => {
    // Dokumentasi: https://firebase.google.com/docs/auth/web/password-auth#next_steps
    try {
        await signOut(auth);
    } catch (err) {
        console.log(err);
    }
};

// Export seluruh fungsi yang dibuat + auth
export {
    auth, // Nanti akan digunakan untuk hooks react-hooks-firebase
    registerDenganEmailDanPassword,
    loginDenganEmailDanPassword,
    resetPassword,
    keluarDariApps,
};