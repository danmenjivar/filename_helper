
// TODO figure out if month is ending in trimester if so extra filename thrown in with special naming

let filenames = [
    'Account_Statement',
    'Check_Register',
    'Deposits',
    'S-24',
    'S-26',
    'S-30',
    'TO-62',
    'WF_Bank_Statement',
    'Donation_Ack'
]

document.querySelector("#generate").addEventListener("click", (event) => {
    formFileNames();
});

function setCurrentMonth() {
    let date = new Date();
    let month = `${date.getMonth()}`.padStart(2, '0');
    let year = date.getFullYear();
    document.getElementById("month").value = `${year}-${month}`
}

function getDatePrefix() {
    let [year, month] = (document.getElementById("month").value).split('-');

    return `${year}_${month}`
}

function determineIfTrimesterEnding() {
    let [year, month] = (document.getElementById("month").value).split('-');

    let startingMonth = 9; // september is the first month of the physcal year

    // generate ending months of each trimester
    let trimesterEndings = [];
    for (let i = 0; i < 4; i++) {
        trimesterEndings.push((startingMonth += 3) % 13);
    }

    console.log(trimesterEndings);

    // if month is in the list of trimester endings, return additional filename
    if (trimesterEndings.includes(parseInt(month))) {
        return `${year}_T${trimesterEndings.indexOf(parseInt(month)) + 1}_Audit`;
    }

    return null;
}

function formFileNames() {

    let datePrefix = getDatePrefix();
    let generatedFileNames = [];


    for (const filename of document.getElementById("filenames").value.split('\n')) {
        if (filename.trim() != "") {
            generatedFileNames.push(`${datePrefix}_${filename.trim()}`);
        }
    }

    let auditFileName = determineIfTrimesterEnding();
    if (auditFileName != null) {
        generatedFileNames.push(auditFileName);
    }

    document.getElementById("generated_filenames").innerHTML = generatedFileNames.join('<br>');
}   

function preloadFileNames() {
    document.getElementById("filenames").value = filenames.join('\n');
}



(function main() {
    setCurrentMonth();
    preloadFileNames();
})();