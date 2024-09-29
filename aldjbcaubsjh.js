function updateSelectedValue() {
    const selectedValue = document.getElementById('menu1').value;
    document.getElementById('selectedMenuValue').textContent = `${selectedValue || 'None'}`;
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
    const menuValue = document.getElementById('menu1').value;

    for (let i = startNum; i <= endNum; i++) {
        let rollSuffix = i.toString(36).toUpperCase().padStart(startAlphanumeric.length, '0');
        let rollNumber = prefix + rollSuffix;

        let img = new Image();
        switch(menuValue) {
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


function checkName() {
    const input = document.getElementById("emmaField").value.trim().toLowerCase();
    const johnSection = document.getElementById("johnSection");
    const aliceMessage = document.getElementById("aliceMessage");
    const hide = document.getElementById("hide");
    const jamesDisplay = document.getElementById("jamesDisplay");

    if (!input) {
         alert("Name not found. Please try again.");
    } else {
        johnSection.classList.add("hidden");
        aliceMessage.classList.remove("hidden");
        jamesDisplay.textContent = input.charAt(0).toUpperCase() + input.slice(1);
        hide.classList.remove("hide");
    }
}