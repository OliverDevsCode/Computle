import { PublicClientApplication } from '@azure/msal-browser';

// MSAL configuration object
const msalConfig = {
    auth: {
        clientId: import.meta.env.VITE_AZURE_CLIENT_ID,
        authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID}`,
        redirectUri: import.meta.env.VITE_AZURE_REDIRECT_URI
    },
    cache: {
        cacheLocation: "sessionStorage", // Options: "sessionStorage" or "localStorage"
        storeAuthStateInCookie: false // Set to true for legacy browsers if needed
    }
};

// Create an instance of PublicClientApplication
const msalInstance = new PublicClientApplication(msalConfig);

// Define a login request
const loginRequest = {
    scopes: ["User.Read"] // Permission to read basic profile information
};

// Handle redirect login responses
msalInstance.handleRedirectPromise()
    .then(response => {
        if (response) {
            console.log("Redirect login successful:", response);
            saveUserInfo(response.account);
        } else {
            console.log("No redirect login response found.");
        }
    })
    .catch(error => {
        console.error("Error handling redirect login:", error);
    });

// Helper function to save user info
function saveUserInfo(account) {
    if (!account) return;

    console.log("User Info:", account);

    // Store the user's name in localStorage for use on other pages
    localStorage.setItem("msal_userName", account.name);
    localStorage.setItem("msal_accountId", account.localAccountId);
}

// A function to trigger login using a popup (with async/await)
export async function login() {
    try {
        const activeAccount = msalInstance.getActiveAccount();
        if (activeAccount) {
            console.log("User already logged in:", activeAccount);
            saveUserInfo(activeAccount);
            return;
        }

        const loginResponse = await msalInstance.loginPopup(loginRequest);
        console.log("Login successful!", loginResponse);
        saveUserInfo(loginResponse.account);
    } catch (error) {
        console.error("Login failed:", error);
    }
}

export { msalInstance };
