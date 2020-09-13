import * as Localization from "expo-localization";
import i18n from "i18n-js";

//import Services
import { getItem } from "@services/Storage";
//import consts
import { LANGUAGE } from "@consts/Const";

//English Language
const EN = {
  //Login Screen
  title: "Welcome to Naypyitaw Traveller Application",
  login: "Register",
  createform:"To Fill the Information",
  tolegatelist:"To display at checkpoint",
  travelnote:"Traveller History",
  createtitle:"Create Register",
  usertype:"Choose User Type",
  name:"Name",
  nrcno:"Citizenship Verification Card",
  phone:"Phone Number",
  vehical:"Vehicle Number",
  forino:"Passport ‌Number",
  gotostep:"Step 2",
  startcity:"Start City",
  endplace:"Where do you want to go?",
  ministray:"Ministray",
  forising:"Passport Photo",
  visa:"Visa Photo",
  support:"Letter of recommendation",
  nrcfront:"NRC Front Photo",
  nrcback:"NRC Back Photo",
  mo:"Travel Permit MO",
  religion:"Religious Verification Card Front",
  retligionback:"Religious Verification Card Back",
  qrlist:"QR Code ဖတ်ရန်",
  cancelregister:"Cancel Register",
  search:"Search",
  detail:"Detail",
  Bhikkhu:"Bhikkhu",
  religionNo:"NRC",
  edittitle:"Edit",
  save:"Save",
  createnew:"Create New",
  people:"People",
  goverment:"Goverment Employee",
  bhikkhu:"Bhikkhu",
  army:"Army",
  forigner:"Foreigner",
  all:"All",
  allow:"Allowed to come",
  tofix:"To fix",
  approve:"Approved",
  quartine:"Quarantine",
  createsuccesss:"Succesfully Created Register",
  editsuccess:"Your data is successfully updated.",
  cancelsuccess:"Your data is successfully deleted.",
 
};

//Myanmar Language
const MM = {
  //Login Screen
  title: "နေပြည်တော်ဝင်ခွင့်လျှောက်လွှာမှကြိုဆိုပါ၏",
  login: "လျှောက်လွှာတင်မည်",
  createform:"အချက်အလက်များဖြည့်ရန်",
  tolegatelist:"စစ်ဆေးရေးဂိတ်တွင်ပြရန်",
  travelnote:"ခရီးသွားမှတ်တမ်းများ",
  createtitle:"အချက်အလက်များဖြည့်ရန်",
  usertype:"အသုံးပြုသူအမျိုးအစားရွေချယ်ရန်",
  name:"အမည်",
  nrcno:"နိုင်ငံသားစိစစ်ရေးကဒ်ပြားနံပါတ်",
  phone:"ဖုန်းနံပါတ်",
  vehical:"ယာဉ်နံပါတ်",
  forino:"နိုင်ငံကူးနံပါတ်",
  gotostep:"အဆင့်(၂)သို့",
  startcity:"စတင်ထွက်ခွာသည့်မြို့",
  endplace:"သွားရောက်လိုသည့်နေရာ",
  ministray:"ဝန်ကြီးဌာန",
  forising:"နိုင်ငံကူးလက်မှတ်",
  visa:"ဗီဇာပုံ",
  support:"ထောက်ခံစာများ",
  nrcfront:"မှတ်ပုံတင်အရှေ့ဘက်",
  nrcback:"မှတ်ပုံတင်အနောက်ဘက်",
  mo:"ခရီးသွားလာခွန့်အမိန့်MO",
  religion:"သာသနာဝင်စိစစ်ရေးကဒ်ပြားအရှေ့ဘက်",
  retligionback:"သာသနာဝင်စိစစ်ရေးကဒ်ပြားအနောက်ဘက်",
  qrlist:"QR Code ဖတ်ရန်",
  cancelregister:"လျှောက်လွှာပယ်ဖျက်မည်",
  search:"ရှာမည်",
  detail:"အသေးစိတ်အချက်အလက်များ",
  Bhikkhu:"ရဟန်းရှင်",
  religionNo:"သာသနာဝင်စိစစ်ရေးကဒ်ပြားနံပါတ်",
  edittitle:"အချက်အလက်များပြင်ရန်",
  save:"သိမ်းမည်",
  createnew:"အသစ်ထည့်မည်",
  people:"ပြည်သူ",
  goverment:"နိုင်ငံဝန်ထမ်း",
  bhikkhu:"ရဟန်းရှင်",
  army:"စစ်မူ့ထမ်း",
  forigner:"နိုင်ငံခြားသား",
  all:"အားလုံး",
  allow:"လာရောက်ခွင့်ပြုသည်",
  tofix:"ပြင်ဆင်ရန်",
  approve:"လက်ခံသည်",
  quartine:"စောင့်ကြည့်ခံရမည်",
  createsuccesss:"လျှောက်လွှာတင်ခြင်းအောင်မြင်ပါသည်",
  editsuccess:"အချက်အလက်ပြင်ဆင်မူအောင်မြင်ပါသည်",
  cancelsuccess:"လျှောက်လွှာပယ်ဖျက်မူအောင်မြင်ပါသည်",
};

i18n.fallbacks = true;
i18n.translations = { EN, MM };
i18n.locale = Localization.locale;

export const t = (scope, locale) => {
  return i18n.t(scope, { locale: locale });
};

export const getLang = async () => {
  return new Promise((resolve, reject) => {
    getItem(LANGUAGE)
      .then(res => {
        if (res) {
          resolve(res);
        } else {
          resolve("MM");
        }
      })
      .catch(err => reject(err));
  });
};
