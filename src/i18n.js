import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      footer: {
        questions: "Questions? Call",
        faq: "FAQ",
        investorRelations: "Investor Relations",
        waysToWatch: "Ways to Watch",
        corporateInfo: "Corporate Information",
        onlyOnNetflix: "Only on Netflix",
        helpCenter: "Help Center",
        jobs: "Jobs",
        termsOfUse: "Terms of Use",
        contactUs: "Contact Us",
        account: "Account",
        redeemGiftCards: "Redeem Gift Cards",
        privacy: "Privacy",
        speedTest: "Speed Test",
        mediaCenter: "Media Center",
        buyGiftCards: "Buy Gift Cards",
        cookiePreferences: "Cookie Preferences",
        legalNotices: "Legal Notices",
        netflix: "Netflix Indonesia",
        languageSelector: "Change Language",
      },
    },
  },
  id: {
    translation: {
      footer: {
        questions: "Pertanyaan? Hubungi",
        faq: "FAQ",
        investorRelations: "Hubungan Investor",
        waysToWatch: "Cara Menonton",
        corporateInfo: "Informasi Perusahaan",
        onlyOnNetflix: "Hanya di Netflix",
        helpCenter: "Pusat Bantuan",
        jobs: "Pekerjaan",
        termsOfUse: "Ketentuan Penggunaan",
        contactUs: "Hubungi Kami",
        account: "Akun",
        redeemGiftCards: "Tukar Kartu Hadiah",
        privacy: "Privasi",
        speedTest: "Uji Kecepatan",
        mediaCenter: "Pusat Media",
        buyGiftCards: "Beli Kartu Hadiah",
        cookiePreferences: "Preferensi Cookie",
        legalNotices: "Pemberitahuan Hukum",
        netflix: "Netflix Indonesia",
        languageSelector: "Pilih Bahasa",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "en", // Default language from localStorage
  detection: {
    order: ["localStorage", "navigator"],
    caches: ["localStorage"],
  },
  interpolation: {
    escapeValue: false, // React already safes from xss
  },
});

export default i18n;
