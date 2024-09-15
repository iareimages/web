function verifyName() {
    const validNames =  ["rakshith", "rakesh", "prem","rohit","pavan","pardhu","vighnan","santhosh","sharma","karthik"];
    const enteredName = document.getElementById('nameInput').value.trim().toLowerCase();
    const jamesDisplay = document.getElementById("benzii");
    const input = document.getElementById('nameInput').value.trim().toLowerCase();
    if (validNames.includes(enteredName)) {
        document.querySelector('.name-container').style.display = 'none';
        document.querySelector('.main-content').style.display = 'flex';
        jamesDisplay.textContent = input.charAt(0).toUpperCase() + input.slice(1);
    } else {
        alert("Name not found. Please try again.");
    }
}

async function generateImages(startRoll, endRoll) {
    document.getElementById("imageGallery").innerHTML = "";
    document.getElementById("imageCount").textContent = "Total Images: 0";

    if (!startRoll || !endRoll) {
        alert("Please enter both startRoll and endRoll.");
        return;
    }

    if (startRoll.length !== endRoll.length) {
        alert("Start roll and end roll must have the same length.");
        return;
    }

    let prefix = startRoll.slice(0, 8);
    
    let startAlphanumeric = startRoll.slice(8);
    let endAlphanumeric = endRoll.slice(8);

    let startNum = parseInt(startAlphanumeric, 36);
    let endNum = parseInt(endAlphanumeric, 36);

    if (isNaN(startNum) || isNaN(endNum) || startNum > endNum) {
        alert("Invalid alphanumeric part of the roll numbers.");
        return;
    }

    let imagePromises = [];
    let imageCount = 0;

    for (let i = startNum; i <= endNum; i++) {
        let rollSuffix = i.toString(36).toUpperCase().padStart(startAlphanumeric.length, '0');
        let rollNumber = prefix + rollSuffix;
        const benu = document.getElementById('menu1').value;
        let img = new Image();
        switch(benu){
            case "SSC Certificate":
                img.src = "https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/"+rollNumber+"/DOCS/"+rollNumber+"_SSC.jpg";
                break;
            case "Inter Certificate":
                img.src = "https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/"+rollNumber+"/DOCS/"+rollNumber+"_INTER.jpg";
                break;
            case "Aadhar":
                img.src = "https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/"+rollNumber+"/DOCS/"+rollNumber+"_Aadhar.jpg";
                break;
            case "Caste Certificate":
                img.src = "https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/"+rollNumber+"/DOCS/"+rollNumber+"_Caste.jpg";
                break;
            case "Income Certificate":
                img.src = "https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/"+rollNumber+"/DOCS/"+rollNumber+"_Income.jpg";
                break;
            case "Photo":
                img.src = "https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/" + rollNumber + "/" + rollNumber + ".jpg";
                break;
        }
        
        img.alt = rollNumber;
    //     'SSC Certificate',
    // 'Inter Certificate',
    // 'Aadhar',
    // 'Caste Certificate',
    // 'Income Certificate',
    // 'Photo'
        let promise = new Promise((resolve, reject) => {
            img.onload = function() {
                resolve({rollNumber, img});
            };

            img.onerror = function() {
                resolve(null);
            };
        });

        imagePromises.push(promise);
    }

    for (let promise of imagePromises) {
        let result = await promise;
        if (result) {
            let {rollNumber, img} = result;
            let imageItem = document.createElement("div");
            imageItem.classList.add("imageItem");
            imageItem.appendChild(img);

            let rollNumberElement = document.createElement("p");
            rollNumberElement.classList.add("rollNumber");
            rollNumberElement.textContent = rollNumber;

            imageItem.appendChild(rollNumberElement);
            document.getElementById("imageGallery").appendChild(imageItem);

            imageCount++;
            document.getElementById("imageCount").textContent = `Total Images: ${imageCount}`;
        }
    }
}

function handleGenerateImages() {
    let startRoll = document.getElementById("startRoll").value.trim();
    let endRoll = document.getElementById("endRoll").value.trim();
    generateImages(startRoll, endRoll);
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
    const menu1 = document.getElementById('menu1').value;
    const menu2 = document.getElementById('menu2').value;
    const menu3 = document.getElementById('menu3').value;
    const menu4 = document.getElementById('menu4').value;
    document.getElementById('notfound').textContent = "";
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
                                    document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                    break;             
}
            break;
            default:
            document.getElementById('notfound').textContent = "Images Cant be Found";
                break;
        case "2nd Year":
        switch(menu3){
                case "AERO":
                    switch(menu4){
                        case "Section A":
                            generateImages("23951A2101","23951A2163");
                            break;
                        case "ALL":
                            generateImages("23951A2101","23951A2163");
                            break;
                        default:
                        document.getElementById('notfound').textContent = "Images Cant be Found";
                            break;  
                    }
                    break;
                case "CE":
                    switch(menu4){
                            case "Section A":
                                generateImages("23951A0101","23951A0115");
                                break;
                            case "ALL":
                                generateImages("23951A0101","23951A0115");
                                break;
                            default:
                            document.getElementById('notfound').textContent = "Images Cant be Found";
                                break;  
                        }
                    break;
                case "CSE (AIML)":
                    switch(menu4){
                            case "Section A":
                                generateImages("23951A6601","23951A6664");
                                break;
                            case "Section B":
                                generateImages("23951A6665","23951A66C8");
                                break;
                            case "Section C":
                                generateImages("23951A66C9","23951A66K2");
                                break;
                            case "Section D":
                                generateImages("23951A66K3","23951A66R1");
                                break;
                            case "ALL":
                                generateImages("23951A6601","23951A66R1");
                                break;
                            default:
                            document.getElementById('notfound').textContent = "Images Cant be Found";
                                break;  
                        }
                    break;
                case "CSE (DS)":
                switch(menu4){
                                case "Section A":
                                    generateImages("23951A6701","23951A6764");
                                    break;
                                case "Section B":
                                    generateImages("23951A6765","23951A67C8");
                                    break;
                                case "Section C":
                                    generateImages("23951A67C9","23951A67J8");
                                    break;
                                case "ALL":
                                    generateImages("23951A6701","23951A67J8");
                                    break;
                                default:
                                document.getElementById('notfound').textContent = "Images Cant be Found";
                                    break;  
                            }
                    break;
                case "CSE":
                    switch(menu4){
                                case "Section A":
                                    generateImages("23951A0501","23951A051X");
                                    break;
                                case "Section B":
                                    generateImages("23951A051Y","23951A053V");
                                    break;
                                case "Section C":
                                    generateImages("23951A053W","23951A055T");
                                    break;
                                case "Section D":
                                    generateImages("23951A055U","23951A057R");
                                    break;
                                case "Section E":
                                    generateImages("23951A057S","23951A059P");
                                    break;
                                case "Section F":
                                    generateImages("23951A059Q","23951A05BM");
                                    break;
                                case "Section G":
                                    generateImages("23951A05BN","23951A05DA");
                                    break;
                                case "ALL":
                                    generateImages("23951A0501","23951A05DA");
                                    break;
                                default:
                                document.getElementById('notfound').textContent = "Images Cant be Found";
                                    break;  
                            }
                    break;
                case "ECE":
                    switch(menu4){
                                case "Section A":
                                    generateImages("23951A0401","23951A0464");
                                    break;
                                case "Section B":
                                    generateImages("23951A0465","23951A04C8");
                                    break;
                                case "Section C":
                                    generateImages("23951A04C9","23951A04K2");
                                    break;
                                case "Section D":
                                    generateImages("23951A04K3","23951A04R0");
                                    break;
                                case "ALL":
                                    generateImages("23951A0401","23951A04R0");
                                    break;
                                default:
                                document.getElementById('notfound').textContent = "Images Cant be Found";
                                    break;  
                            }
                    break;
                case "EEE":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("23951A0201","23951A0229");
                                        break;
                                    case "ALL":
                                        generateImages("23951A0201","23951A0229");
                                        break;
                                    default:
                                    document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                    break;
                case "IT":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("23951A1201","23951A1264");
                                        break;
                                    case "Section B":
                                        generateImages("23951A1265","23951A12C8");
                                        break;
                                    case "ALL":
                                        generateImages("23951A1201","23951A12C8");
                                        break;
                                    default:
                                    document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                    break;
                case "ME":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("23951A0301","23951A0328");
                                        break;
                                    case "ALL":
                                        generateImages("23951A0301","23951A0328");
                                        break;
                                    default:
                                    document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                    break;  
                 case "CSE (CS)":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("23951A6201","23951A6264");
                                        break;
                                    case "Section B":
                                        generateImages("23951A6265","23951A62C8");
                                        break;
                                    case "Section C":
                                        generateImages("23951A62C9","23951A62J2");
                                        break;
                                    case "ALL":
                                        generateImages("23951A6201","23951A62J2");
                                        break;
                                    default:
                                    document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                        
                    break; 
                    default:
            document.getElementById('notfound').textContent = "Images Cant be Found";          
}
            break;
            
        case "3rd Year":
        switch(menu3){
                default:
                document.getElementById('notfound').textContent = "Images Cant be Found"
                case "AERO":
                    switch(menu4){
                        case "Section A":
                            generateImages("22951A2101","22951A2156");
                            break;
                        case "ALL":
                            generateImages("22951A2101","22951A2156");
                            break;
                        default:
                        document.getElementById('notfound').textContent = "Images Cant be Found";
                            break;  
                    }
                    break;
                case "CE":
                    switch(menu4){
                            case "Section A":
                                generateImages("22951A0101","22951A0120");
                                break;
                            case "ALL":
                                generateImages("22951A0101","22951A0120");
                                break;
                            default:
                            document.getElementById('notfound').textContent = "Images Cant be Found";
                                break;  
                        }
                    break;
                case "CSE (AIML)":
                    switch(menu4){
                            case "Section A":
                                generateImages("22951A6601","22951A6664");
                                break;
                            case "Section B":
                                generateImages("22951A6665","22951A66C8");
                                break;
                            case "Section C":
                                generateImages("22951A66C9","22951A66J6");
                                break;
                            case "ALL":
                                generateImages("22951A6601","22951A66J6");
                                break;
                            default:
                            document.getElementById('notfound').textContent = "Images Cant be Found";
                                break;  
                        }
                    break;
                case "CSE (DS)":
                    switch(menu4){
                                case "Section A":
                                    generateImages("22951A6701","22951A6764");
                                    break;
                                case "Section B":
                                    generateImages("22951A6765","22951A67C7");
                                    break;
                                case "Section C":
                                    generateImages("22951A67C8","22951A67J3");
                                    break;
                                case "ALL":
                                    generateImages("22951A6701","22951A67J3");
                                    break;
                                default:
                                document.getElementById('notfound').textContent = "Images Cant be Found";
                                    break;  
                            }
                    break;
                case "CSE":
                    switch(menu4){
                                case "Section A":
                                    generateImages("22951A0501","22951A0565");
                                    break;
                                case "Section B":
                                    generateImages("22951A0566","22951A05D0");
                                    break;
                                case "Section C":
                                    generateImages("22951A05D1","22951A05K5");
                                    break;
                                case "Section D":
                                    generateImages("22951A05K6","22951A05R9");
                                    break;
                                case "ALL":
                                    generateImages("22951A0501","22951A05R9");
                                    break;
                                default:
                                document.getElementById('notfound').textContent = "Images Cant be Found";
                                    break;  
                            }
                    break;
                case "ECE":
                    switch(menu4){
                                case "Section A":
                                    generateImages("22951A0401","22951A0464");
                                    break;
                                case "Section B":
                                    generateImages("22951A0465","22951A04C8");
                                    break;
                                case "Section C":
                                    generateImages("22951A04C9","22951A04K2");
                                    break;
                                case "Section D":
                                    generateImages("22951A04K3","22951A04Q0");
                                    break;
                                case "ALL":
                                    generateImages("22951A0401","22951A04Q0");
                                    break;
                                default:
                                document.getElementById('notfound').textContent = "Images Cant be Found";
                                    break;  
                            }
                    break;
                case "EEE":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("22951A0201","22951A0240");
                                        break;
                                    case "ALL":
                                        generateImages("22951A0201","22951A0240");
                                        break;
                                    default:
                                    document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                    break;
                case "IT":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("22951A1201","22951A1264");
                                        break;
                                    case "Section B":
                                        generateImages("22951A1265","22951A12B8");
                                        break;
                                    case "ALL":
                                        generateImages("22951A1201","22951A12B8");
                                        break;
                                    default:
                                    document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                    break;
                case "ME":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("22951A0301","22951A0319");
                                        break;
                                    case "ALL":
                                        generateImages("22951A0301","22951A0319");
                                        break;
                                    default:
                                    document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                    break;  
                 case "CSE (CS)":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("22951A6201","22951A6264");
                                        break;
                                    case "Section B":
                                        generateImages("22951A6265","22951A62C2");
                                        break;
                                    case "ALL":
                                        generateImages("22951A6201","22951A62C2");
                                        break;
                                    default:
                                    document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                    break;    
                    case "CSE (IT)":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("22951A3301","22951A3364");
                                        break;
                                    case "Section B":
                                        generateImages("22951A3365","22951A33C2");
                                        break;
                                    case "ALL":
                                        generateImages("22951A3301","22951A62C2");
                                        break;
                                    default:
                                    document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                    break;           
}
            break;
        case "4th Year":
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

