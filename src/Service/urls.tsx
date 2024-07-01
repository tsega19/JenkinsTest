const apiBaseURL = "http://196.188.127.204:5080/api";
// const apiBaseURL = "http://192.168.0.103:5080/api";
// const apiBaseURL = "http://192.168.80.8:5080/api";

export const LoginURL = `${apiBaseURL}/auth/login`;
export const RegisterURL = `${apiBaseURL}/merchants/add_merchant`;
export const updateProfileUrl = `${apiBaseURL}/merchants/update_merchant_info`;
export const registerKycFileUrl = `${apiBaseURL}/merchants/kyc_files/register_kyc_file`;
export const fileUploadUrl = `${apiBaseURL}/file_storage/upload`;
export const updateMyKycUrl = `${apiBaseURL}/merchants/update_my_kyc`;
export const getAvailableBusinessTypesUrl = `${apiBaseURL}/merchants/get_available_business_types`;
export const passwordChangeUrl = `${apiBaseURL}/auth/changePassword`;
export const merchantProfileUrl = `${apiBaseURL}/merchants/self`;

export const generateApiKeyUrl = `${apiBaseURL}/auth/clients/create_auth_client`;
export const getApiKeyUrl = `${apiBaseURL}/auth/clients/get_my_auth_clients`;
export const removeApiKeyUrl = `${apiBaseURL}/auth/clients/remove_my_auth_client`;
export const changeApiKeyStatusUrl = `${apiBaseURL}/auth/clients/change_status`;

export const addAccountUrl = `${apiBaseURL}/merchants/bank_accounts/add_new_bank_account`;
export const getAccountsUrl = `${apiBaseURL}/merchants/bank_accounts/get_my_bank_accounts`;
