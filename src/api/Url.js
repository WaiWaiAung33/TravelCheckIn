
export const BaseUrl = "http://128.199.79.79/Covid/public/api/";
//Login Api
export const LoginApi = BaseUrl + "sendOtp";
export const OTPCodeApi = BaseUrl +"verifyOtp";

//Get City Api
export const GetCityApi=BaseUrl + "city_nrc_mini_nType";
export const GetTownshipApi = BaseUrl + "township";

//get nrc state
export const GetNrcStateApi = BaseUrl + "getNRCstate";

//image url
export const ImguploadApi ="http://128.199.79.79/Covid/public/";
//create api
export const CreateApi = BaseUrl + "regrister";

//qr list
export const QRListApi = BaseUrl + "qrgenerate";

//cancel
// export const CancelApi = BaseUrl + "adminCheck";

//Register History Detail
export const RegisterHistoryDetailApi= BaseUrl + "historyDetail";
export const RegisterHistoryApi = BaseUrl +"getHistory";
export const EditApi = BaseUrl + "editData";

//get version
export const GetVersionApi = BaseUrl + "forceVersion";

//get QR Code Api
export const QRCodeApi = BaseUrl + "qr";

//delete api
export const DelteApi = BaseUrl + "updateformdata";


