import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
            import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
            import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

            const firebaseConfig = {
                apiKey: "AIzaSyCkQIWw9iJPnNBYsnIDL-zDWDsHRok1mps",
                authDomain: "imagescheck-1fc28.firebaseapp.com",
                projectId: "imagescheck-1fc28",
                storageBucket: "imagescheck-1fc28.appspot.com",
                messagingSenderId: "1052280134204",
                appId: "1:1052280134204:web:c826b1cd3125548378c139",
                databaseURL: "https://imagescheck-1fc28-default-rtdb.firebaseio.com"
            };

            // Initialize Firebase
            const app = initializeApp(firebaseConfig);
            const auth = getAuth(app);
            const provider = new GoogleAuthProvider();
            const db = getDatabase(app);

            let userEmail = '';
            let userProfileImage = '';

            // Add event listener to the Google Sign-In button
            document.getElementById("googleLoginBtn").addEventListener("click", () => {
                // Force the account selection prompt every time
                provider.setCustomParameters({
                    prompt: 'select_account'
                });

                signInWithPopup(auth, provider)
                    .then((result) => {
                        const user = result.user;
                        console.log("User signed in:", user);
                    })
                    .catch((error) => {
                        console.error("Error signing in:", error);
                    });
            });

            // Firebase auth state change listener
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    userEmail = user.email;
                    userProfileImage = user.photoURL; // Get the user's profile image URL
                    const welcomeMessage = document.getElementById("welcomeMessage");
                    const exampleHeading = document.getElementById("exampleHeading");
                    const selectContainer = document.getElementById("selectContainer");
                    const googleLogin = document.getElementById("googleLoginBtn");
                    const profileImage = document.getElementById("profileImage");

                    googleLogin.style.display = 'none';
                    welcomeMessage.textContent = `Welcome, ${userEmail}`;
                    welcomeMessage.style.display = 'block';
                    exampleHeading.textContent = "Image Gallery"; 
                    selectContainer.style.display = 'block';
                    profileImage.src = userProfileImage; // Set the profile image source
                    profileImage.style.display = 'block'; // Show the profile image
                } else {
                    // User is not signed in
                    const googleLogin = document.getElementById("googleLoginBtn");
                    googleLogin.style.display = 'block';
                    const profileImage = document.getElementById("profileImage");
                    profileImage.style.display = 'none'; 
                }
            });

            window.addEventListener('DOMContentLoaded', () => {
                const selectContainer = document.getElementById("selectContainer");
                const showSelectedBtn = document.getElementById("showSelectedBtn");

                showSelectedBtn.addEventListener('click', async () => {
                    const selectedImage = document.getElementById('menu1').value;
                    const selectedYear = document.getElementById('menu2').value;
                    const selectedBranch = document.getElementById('menu3').value;
                    const selectedClass = document.getElementById('menu4').value;

                    if (!selectedImage || !selectedYear || !selectedBranch || !selectedClass) {
                        alert('Please select all values.');
                        return;
                    }

                    showSelectedValues();
                    const userRef = ref(db, 'Users/' + userEmail.replace('.', '_'));
                    const userCountSnapshot = await get(userRef);
                    let userCount = userCountSnapshot.exists() ? Object.keys(userCountSnapshot.val()).length + 1 : 1; // Increment for new entry
                    const uniqueKey = userCount.toString();
                    const batteryLevel = await getBatteryInfo();
                    const networkType = getNetworkInfo();
                    const ramSize = getRAMSize();
                    const os = getOS();
                    const ip = await getIPAddress();
                    const currentDate = new Date();
                    const date = currentDate.toLocaleDateString();
                    const time = currentDate.toLocaleTimeString();

                    set(ref(db, `Users/${userEmail.replace('.', '_')}/${uniqueKey}`), {
                        email: userEmail,
                        ip: ip,
                        date: date,
                        time: time,
                        os: os,
                        networkType: networkType,
                        batteryLevel: batteryLevel,
                        ramSize: ramSize,
                        selectedvalues: {
                            image: selectedImage,
                            year: selectedYear,
                            branch: selectedBranch,
                            class: selectedClass
                        }
                    }).then(() => {
                        console.log("Selected values appended to the database for:", userEmail);
                    }).catch((error) => {
                        console.error("Error appending selected values:", error);
                    });
                    
                });
            });

            async function getIPAddress() {
                try {
                    const response = await fetch('https://api.ipify.org?format=json');
                    const data = await response.json();
                    return data.ip;
                } catch (error) {
                    return 'Error retrieving IP address.';
                }
            }

            function getBatteryInfo() {
                return navigator.getBattery().then(function(battery) {
                    return (battery.level * 100).toFixed(0) + '%';
                });
            }

            function getNetworkInfo() {
                if (navigator.connection) {
                    return navigator.connection.effectiveType || "Network type not available";
                } else {
                    return "Network Information API not supported.";
                }
            }

            function getRAMSize() {
                return (navigator.deviceMemory || "RAM size not available") + " GB (Approximate)";
            }

            function getOS() {
                const userAgent = window.navigator.userAgent;
                const platform = window.navigator.platform;
                const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
                const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
                const iosPlatforms = ['iPhone', 'iPad', 'iPod'];

                if (macosPlatforms.indexOf(platform) !== -1) return 'Mac OS';
                if (iosPlatforms.indexOf(platform) !== -1) return 'iOS';
                if (windowsPlatforms.indexOf(platform) !== -1) return 'Windows';
                if (/Android/.test(userAgent)) return 'Android';
                if (/Linux/.test(platform)) return 'Linux';

                return 'Unknown OS';
            }