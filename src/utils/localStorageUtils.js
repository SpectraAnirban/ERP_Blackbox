// localStorageUtils.js

// Function to retrieve role from local storage
export const getRoleFromLocalStorage = () => {
    const role = localStorage.getItem('role');
    return role ? role : null; // Return as string, not parsed JSON
};

// Function to store role in local storage
export const storeRoleInLocalStorage = (role) => {
    localStorage.setItem('role', role);
};