const broccoliDiv = document.querySelector('.Broccoli');
const cloverDiv = document.querySelector('.Clover');
const radishDiv = document.querySelector('.Radish');

let isTableEmpty = true;

function createTable(divId, microgreenName) {
    const tableContainer = document.createElement('div');
    const table = document.createElement('table');

    const row1 = document.createElement('tr');
    const cell11 = document.createElement('th');
    cell11.innerText = 'Planted Date';
    row1.appendChild(cell11);

    const cell12 = document.createElement('td');
    cell12.id = `plantedDate-${divId}`;
    row1.appendChild(cell12);

    const row2 = document.createElement('tr');
    const cell21 = document.createElement('th');
    cell21.innerText = 'Germination Complete Date';
    row2.appendChild(cell21);

    const cell22 = document.createElement('td');
    cell22.id = `germinationCompleteDate-${divId}`;
    row2.appendChild(cell22);

    const row3 = document.createElement('tr');
    const cell31 = document.createElement('th');
    cell31.innerText = 'Blackout Complete Date';
    row3.appendChild(cell31);

    const cell32 = document.createElement('td');
    cell32.id = `blackoutDate-${divId}`;
    row3.appendChild(cell32);

    const row4 = document.createElement('tr');
    const cell41 = document.createElement('th');
    cell41.innerText = 'Harvest Date';
    row4.appendChild(cell41);

    const cell42 = document.createElement('td');
    cell42.id = `harvestDate-${divId}`;
    row4.appendChild(cell42);

    // Apply CSS to style the table
    table.style.margin = '0 auto'; // Center the table
    table.style.borderCollapse = 'collapse'; // Optional: Style for border-collapse
    //table.style.paddingTop = '100px';

    table.appendChild(row1);
    table.appendChild(row2);
    table.appendChild(row3);
    table.appendChild(row4);

    tableContainer.appendChild(table);

    let targetDiv;
    if (microgreenName === 'Broccoli') targetDiv = broccoliDiv;
    else if (microgreenName === 'Clover') targetDiv = cloverDiv;
    else if (microgreenName === 'Radish') targetDiv = radishDiv;

    targetDiv.appendChild(tableContainer);

    // Load data from localStorage
    const savedData = localStorage.getItem(`microgreenData-${microgreenName}`);
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        document.getElementById(`plantedDate-${divId}`).innerText = parsedData.formattedDate;
        document.getElementById(`germinationCompleteDate-${divId}`).innerText = parsedData.formattedGerminationCompleteDate;
        document.getElementById(`blackoutDate-${divId}`).innerText = parsedData.formattedBlackoutDate;
        document.getElementById(`harvestDate-${divId}`).innerText = parsedData.formattedHarvestDate;
    }

    // Event listener for the set plant date button
    const setPlantDateButton = document.getElementById(`setPlantDate-${divId}`);
    setPlantDateButton.addEventListener('click', function () {
        updatePlantedDate(microgreenName, divId);
    });

    // Event listener for the clear button
    const clearButton = document.getElementById(`clearTable-${divId}`);
    clearButton.addEventListener('click', function () {
        clearTable(microgreenName, divId);
    });
}



function updatePlantedDate(microgreen, isTableEmpty) {
    if (!isTableEmpty) {
        alert('Table is not empty. Clear the table before setting the Planted Date.');
        return;
    }

    const today = new Date();
    const formattedDate = today.toLocaleDateString();
    const dateCell = document.getElementById(`plantedDate-${microgreen}`);
    dateCell.innerText = formattedDate;

    // Store the planted date in localStorage
    localStorage.setItem(`plantedDate-${microgreen}`, formattedDate);

    // Display the planted date
    dateCell.innerText = formattedDate;

    const germinationCompleteDate = new Date(today);
    germinationCompleteDate.setDate(today.getDate() + 2);
    const formattedGerminationCompleteDate = germinationCompleteDate.toLocaleDateString();
    const germinationDateCell = document.getElementById(`germinationCompleteDate-${microgreen}`);
    germinationDateCell.innerText = formattedGerminationCompleteDate;

    const blackoutDate = new Date(germinationCompleteDate);
    blackoutDate.setDate(germinationCompleteDate.getDate() + 1);
    const formattedBlackoutDate = blackoutDate.toLocaleDateString();
    const blackoutDateCell = document.getElementById(`blackoutDate-${microgreen}`);
    blackoutDateCell.innerText = formattedBlackoutDate;

    const harvestDate = new Date(today);
    harvestDate.setDate(today.getDate() + 10);
    const formattedHarvestDate = harvestDate.toLocaleDateString();
    const harvestDateCell = document.getElementById(`harvestDate-${microgreen}`);
    harvestDateCell.innerText = formattedHarvestDate;

    isTableEmpty = false;
}




function clearTable(microgreen) {
    const confirmClear = confirm(`Are you sure you want to clear the ${microgreen} table?`);
    if (confirmClear) {
        document.getElementById(`plantedDate-${microgreen}`).innerText = 'Planted Date';
        document.getElementById(`germinationCompleteDate-${microgreen}`).innerText = '';
        document.getElementById(`blackoutDate-${microgreen}`).innerText = '';
        document.getElementById(`harvestDate-${microgreen}`).innerText = '';
        isTableEmpty = true;
    }
}


createTable('Broccoli', 'Broccoli');
createTable('Clover', 'Clover');
createTable('Radish', 'Radish');

// Event listener to retrieve and display planted dates when the page loads
window.addEventListener('load', function () {
    updatePlantedDate('Broccoli', localStorage.getItem('plantedDate-Broccoli'));
    updatePlantedDate('Clover', localStorage.getItem('plantedDate-Clover'));
    updatePlantedDate('Radish', localStorage.getItem('plantedDate-Radish'));
});
